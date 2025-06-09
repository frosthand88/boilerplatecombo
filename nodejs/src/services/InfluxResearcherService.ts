import { InfluxDB, Point } from '@influxdata/influxdb-client'
import {Researcher} from "../entity/Researcher";

export class InfluxResearcherService {
    static async getResearchersAsync(page: number, pageSize: number, filter?: string): Promise<{ researchers: Researcher[]; totalCount: number }> {
        const offset = (page - 1) * pageSize
        let fluxQuery = `from(bucket:"${process.env.INFLUX_BUCKET!}") |> range(start: -1w) |> limit(n:${pageSize}, offset:${offset})`

        // Apply basic filter (stub)
        if (filter) {
            // Apply string match logic as needed
        }

        const influx = new InfluxDB({
            url: process.env.INFLUX_URL!,
            token: process.env.INFLUX_TOKEN!
        })
        // Sorting is a no-op in Flux unless you index data specifically
        const queryApi = influx.getQueryApi(process.env.INFLUX_ORG!)
        const researchers: Researcher[] = []

        const raw = await queryApi.collectRows<Researcher>(fluxQuery)
        for (const record of raw) {
            researchers.push(record)
        }

        return { researchers, totalCount: researchers.length }
    }
}
