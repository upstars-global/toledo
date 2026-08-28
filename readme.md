## Локальная разработка

убрать `"executablePath": "/usr/bin/chromium-browser",` в конфиге `server/backstop/config/defaultConfig.json`

```bash
cd server
yarn
```
запуск приложения
```bash
cd server
yarn server
```
добавлять сценарии тут
server/backstop/config/scenarios/index.json

перенести сценарии в
https://gitlab.upstr.to/whitelabel/toledo-thor/-/blob/main/charts/scenarios/thor.json

дока по запуску Toledo локально
https://upstars.atlassian.net/wiki/spaces/FRONT/pages/446300163/Thor+Toledo

## Создание новой приложения на базе toledo

toledo — это базовый Helm-чарт, который используется как зависимость для конкретных приложений (например, toledo-alpa, toledo-thor и т.д.).

### Структура проекта приложения

```
toledo-{app-name}/
├── charts/
│   ├── Chart.yaml              # Описание чарта с зависимостью от toledo
│   ├── values.yaml             # Переопределение параметров toledo
│   ├── scenarios/              # Сценарии тестирования для вашего приложения
│   │   └── {app-name}.json
│   ├── engine_scripts/         # Кастомные скрипты Puppeteer (опционально)
│   │   ├── onBefore.js
│   │   ├── onReady.js
│   │   └── ...
│   └── templates/
│       ├── cm.scenarios.yaml   # ConfigMap для сценариев
│       └── cm.engine-scripts.yaml  # ConfigMap для engine_scripts (если используются)
```

### Подключение кастомных engine_scripts

Engine scripts — это скрипты Puppeteer, которые выполняются на различных этапах тестирования (onBefore, onReady, и т.д.).

#### 1. Создайте директорию engine_scripts

В вашем проекте `toledo-{app-name}/charts/` создайте папку `engine_scripts/` и добавьте необходимые `.js` файлы:

```bash
mkdir -p charts/engine_scripts
```

Доступные скрипты:
- `onBefore.js` — выполняется перед загрузкой страницы
- `onReady.js` — выполняется после загрузки страницы
- `disableImgLazy.js` — отключает ленивую загрузку изображений
- `injectCSS.js` — инжектирует CSS
- `injectLocalStorage.js` — устанавливает localStorage
- `settingScenarioCookies.js` — устанавливает cookies
- `waitImgLoad.js` — ожидает загрузки изображений

#### 2. Создайте шаблон ConfigMap

Создайте файл `charts/templates/cm.engine-scripts.yaml`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ $.Release.Name }}-engine-scripts
data:
{{- range $path, $_ := .Files.Glob "engine_scripts/*.js" }}
  {{ base $path }}: |
{{ $.Files.Get $path | indent 4 }}
{{- end }}
```

#### 3. Отключите базовый ConfigMap в values.yaml

В файле `charts/values.yaml` добавьте параметр для отключения создания ConfigMap из базового чарта toledo:

```yaml
toledo:
  componentId: '{app-name}'
  scenarios: '{app-name}.json'
  createEngineScriptsConfigMap: false  # Отключаем базовый ConfigMap
  # ... остальные параметры
```

Теперь ваши кастомные `engine_scripts` будут использоваться вместо базовых.

### Пример: toledo-alpa

См. репозиторий [toledo-alpa](https://gitlab.upstr.to/whitelabel/toledo-alpa) для примера реализации.

## Релиз

CI/CD (`.github/workflows/ci-cd.yml`) собирает и публикует Docker-образ и Helm-чарт **только**
по запушенному тегу `vX.Y.Z` (мерж в `master` сам по себе ничего не триггерит — это осознанно).
Тег должен быть именно запушен в `origin`, локального `git tag` недостаточно.

Шаги релиза:

```bash
scripts/release.sh 1.10.12
```

Скрипт бампает `version` и `appVersion` в `charts/Chart.yaml` одновременно (значение
`appVersion` всегда равно тегу `vX.Y.Z`), коммитит и создаёт локальный тег — но ничего не
пушит. В конце он печатает команды для пуша, которые нужно выполнить осознанно:

```bash
git push origin <branch>
git push origin v1.10.12
```

После пуша тега дождитесь завершения обоих джобов в GitHub Actions (`build-and-push`,
`publish-helm`) и убедитесь, что образ `ghcr.io/upstars-global/toledo:v1.10.12` и чарт
`1.10.12` реально появились в GHCR.

Чтобы новый релиз дошёл до конкретного приложения (например, `toledo-alpa`), нужно **отдельно**
обновить зависимость в этом приложении — см. раздел ниже.

### Обновление приложения (например, toledo-alpa) на новую версию toledo

1. В `charts/Chart.yaml` приложения поднять `dependencies[0].version` до нового номера чарта.
2. Выполнить `helm dependency update`, чтобы обновились `Chart.lock` и вендоренный `.tgz`.
3. **Не** переопределяйте `image.tag` в `values.yaml` приложения — оставьте его
   неустановленным, тогда образ подтягивается автоматически из `appVersion` чарта toledo
   (см. `charts/templates/deployment.yaml`: `.Values.image.tag | default .Chart.AppVersion`).
   Если `image.tag` всё же прописан вручную — он не обновится сам при бампе версии чарта, и
   под продолжит работать на старом образе, даже если шаблоны чарта уже новые.
4. Закоммитить и запушить/смержить в ветку, которая триггерит деплой (см. `.gitlab-ci.yml`
   приложения).
