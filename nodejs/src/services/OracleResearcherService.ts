import {ResearcherSchema3} from '../entity/Researcher3';
import {getOracleSource} from "../data-source/oracle";

export class OracleResearcherService {
    public static async getResearchers(
        page: number = 1,
        pageSize: number = 10,
        name?: string
    ): Promise<any> {
        const source = await getOracleSource();

        if (!source.isInitialized) await source.initialize();
        console.log('Selected DB source:', source?.isInitialized);

        const repo = source.getRepository(ResearcherSchema3); // <--- Use Schema here

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
