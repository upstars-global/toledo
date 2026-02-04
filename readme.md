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
