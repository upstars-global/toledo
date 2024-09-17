import { Request, Response } from 'express';
import axios from 'axios';
import { IS_AWS } from '@config';

const PROMETHEUS_ADDR = 'http://prometheus-kube-prometheus-prometheus.prometheus.svc.cluster.local:9090';
export default function appList(req: Request, res: Response) {
    const {
        project,
    } = req.query;
    let nameSpace = project;
    if (project === 'thor' && IS_AWS) {
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
