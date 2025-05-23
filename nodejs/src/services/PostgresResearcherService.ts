import {ResearcherSchema} from '../entity/Researcher';
import {PostgresSource} from "../data-source/postgres";

export class PostgresResearcherService {
    public static async getResearchers(
        page: number = 1,
        pageSize: number = 10,
        name?: string
    ): Promise<any> {
        const source = PostgresSource;

        if (!source.isInitialized) await source.initialize();
        console.log('Selected DB source:', source?.isInitialized);

        const repo = source.getRepository(ResearcherSchema); // <--- Use Schema here

        const where: any = {};
        if (name) where.name = name;

        const [data, total] = await repo.findAndCount({
            where,
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            order: { created_at: 'DESC' },
        });
        return { data, total, page: Number(page), limit: Number(pageSize) };
    }
}
