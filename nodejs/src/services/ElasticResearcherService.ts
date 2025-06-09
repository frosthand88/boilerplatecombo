import { Client } from '@elastic/elasticsearch';
import {Researcher} from "../entity/Researcher";

const index = 'researchers';

export class ElasticResearcherService {
    static async getResearchersAsync(page: number, pageSize: number, filter?: string): Promise<{ researchers: Researcher[]; totalCount: number }> {
        let url = `http://${process.env.ELASTIC_USER}:${process.env.ELASTIC_PASSWORD}@${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`;
        console.log(url);
        const client = new Client({ node: url });
        const from = (page - 1) * pageSize;

        const body: any = {
            from,
            size: pageSize,
        };

        if (filter) {
            body.query = {
                multi_match: {
                    query: filter,
                    fields: ['name', 'age'],
                },
            };
        }

        const result = await client.search<Researcher>({
            index,
            body,
        });

        const researchers = result.hits.hits.map(hit => hit._source!) as Researcher[];
        const totalCount = result.hits.total as number;

        return { researchers, totalCount };
    }
}
