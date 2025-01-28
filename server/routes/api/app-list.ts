import { Request, Response } from 'express';
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
 *         description: Имя проекта, для которого запускается тест (только `alpa` или `thor`)
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
}
