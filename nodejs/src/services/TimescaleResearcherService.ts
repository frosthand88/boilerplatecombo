import {ResearchActivitySchema} from '../entity/ResearchActivity';
import {getTimescaleSource} from "../data-source/timescale";

export class TimescaleResearcherService {
    public static async getResearchers(
        page: number = 1,
        pageSize: number = 10,
        name?: string

    ): Promise<any> {
        const source = await getTimescaleSource();

        if (!source.isInitialized) await source.initialize();
        console.log('Selected DB source:', source?.isInitialized);

        const repo = source.getRepository(ResearchActivitySchema); // <--- Use Schema here

        const where: any = {};
        if (name) where.researcher = name;

        const [data, total] = await repo.findAndCount({
            where,
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            order: { researcher: 'DESC' },
        });
        return { data, total, page: Number(page), limit: Number(pageSize) };
    }
}
