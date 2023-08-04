import {Request, Response} from 'express'
import axios from 'axios'

const PROMETHEUS_ADDR = 'http://prometheus-kube-prometheus-prometheus.prometheus.svc.cluster.local:9090'
export default function appList(req: Request, res: Response) {
    const currentTime = new Date();
    currentTime.setUTCMinutes(currentTime.getUTCMinutes() - 1);
    const query = `count+by+%28name%29+%28argocd_app_info%7Bdest_namespace%3D%22alpa%22%7D%29&time=${currentTime.toISOString()}`
    axios.get(`${PROMETHEUS_ADDR}/api/v1/query?query=${query}`)
        .then((data) => {
            res.send(data.data.data.result.map((item: any) => {
                return item.metric.name
            }).filter((item: string) => {
                return item.startsWith("frontera-alpa-")
            }))
        }).catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
}