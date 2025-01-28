import { Request, Response } from 'express';
import { CoreV1Api, KubeConfig } from '@kubernetes/client-node';
import axios from 'axios';
import { PROJECT } from "@config";

const PROMETHEUS_ADDR = 'http://prometheus-kube-prometheus-prometheus.prometheus.svc.cluster.local:9090';

/**
 * @swagger
 *
 * /api/app-list:
 *   get:
 *     summary: Получение перечня активных окружений
 *     description: Get application list
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved list
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               property1:
 *                 type: string
 *               property2:
 *                 type: integer
 *
 * @param {Object} req - Express.js request object. The query parameters should include 'field1' and/or 'field2'.
 * @param {Object} res - Express.js response object for sending back the generated results.
 */
export default function appList(req: Request, res: Response) {
    let nameSpace = PROJECT;

    // TODO Решить вопрос с не совпадением проекта и неймспейса
    if (PROJECT === 'thor') {
        nameSpace = 'thor-frontera';
    }

    const currentTime = new Date();
    currentTime.setUTCMinutes(currentTime.getUTCMinutes() - 1);

    const query = `count+by+%28name%29+%28argocd_app_info%7Bdest_namespace%3D%22${nameSpace}%22%7D%29&time=${currentTime.toISOString()}`;

    axios.get(`${PROMETHEUS_ADDR}/api/v1/query?query=${query}`)
        .then((data) => {
            res.send(data.data.data.result.map((item: Record<string, unknown>) => {
                return (item.metric as Record<string, string>).name;
            }).filter((item: string) => {
                return (/[0-9]/).test(item);
            }));
        }).catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
            res.status(500).send(error);
        });

    listServices()
}



async function listServices(namespace: string = String(PROJECT)) {
    // TODO Решить вопрос с не совпадением проекта и неймспейса
    if (PROJECT === 'thor') {
        namespace = 'thor-frontera';
    }

    try {
        // Создаём конфигурацию
        const kc = new KubeConfig();
        kc.loadFromDefault(); // Загружает конфигурацию из окружения или ~/.kube/config

        // Создаём API-клиент для работы с сервисами
        const k8sApi = kc.makeApiClient(CoreV1Api);

        // Получаем список сервисов в указанном неймспейсе
        // @ts-ignore
        const res = await k8sApi.listNamespacedService(namespace);
        console.log('Services in namespace:', namespace);
        res.items.forEach((service: any) => {
            console.log(`- ${service.metadata?.name}`)
            if (service.metadata?.labels?.['app.kubernetes.io/name'] === 'frontera-mock') {
                console.log(`- mock`);
            }
        });
    } catch (err) {
        console.error('Error fetching services:', err);
    }
}
