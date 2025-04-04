import { Request, Response } from 'express';
import { CoreV1Api, KubeConfig } from '@kubernetes/client-node';

/**
 * @swagger
 *
 * /api/app-list:
 *   get:
 *     summary: Получение перечня активных окружений
 *     tags:
 *       - Основные API
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
export default async function appList(req: Request, res: Response) {
    const list = await listServices();
    res.send(list)
}

async function listServices() {
    try {
        const kc = new KubeConfig();
        kc.loadFromDefault();
        const k8sApi = kc.makeApiClient(CoreV1Api);

        const currentContext = kc.getContextObject(kc.currentContext);
        const namespace = currentContext?.namespace || 'default';

        const res = await k8sApi.listNamespacedService({namespace});
        const filteredServices = res.items.filter((service: any) =>
            service.metadata?.labels?.['app.kubernetes.io/name'] === 'frontera-mock'
        ).map((service: any) => service.metadata?.name);

        console.log('Mock services in namespace:', namespace);
        console.log(filteredServices)

        return filteredServices;
    } catch (err) {
        console.error('Error fetching services:', err);
    }
}
