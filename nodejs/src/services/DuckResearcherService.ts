import duckdb from 'duckdb';
import dotenv from 'dotenv';

dotenv.config();

export class DuckResearcherService {
    public static async getResearchers(
        page: number = 1,
        pageSize: number = 10,
        name?: string

    ): Promise<any> {
        const offset = (page - 1) * pageSize;
        const db = new duckdb.Database(process.env.DUCK_URL || ':memory:') as any;
        const connection = db.connect();

        // Optional: add filtering if name is passed
        let filterClause = '';
        if (name) {
            filterClause = `WHERE name LIKE '%${name.replace(/'/g, "''")}%'`;
        }

        const sql = `
        SELECT * FROM research_activity
        ${filterClause}
        LIMIT ${pageSize} OFFSET ${offset}`;

        // Helper to promisify connection.all()
        function runAll(sql: string): Promise<any[]> {
            return new Promise((resolve, reject) => {
                connection.all(sql, (err: any, rows: any) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
        }

        function convertBigIntToString(obj: any): any {
            if (typeof obj === 'bigint') {
                return obj.toString();
            } else if (Array.isArray(obj)) {
                return obj.map(convertBigIntToString);
            } else if (obj && typeof obj === 'object') {
                const newObj: any = {};
                for (const key in obj) {
                    newObj[key] = convertBigIntToString(obj[key]);
                }
                return newObj;
            }
            return obj;
        }

        const researchers = await runAll(sql);
        const countResult = await runAll(`SELECT COUNT(*) as count FROM research_activity ${filterClause}`);
        const totalCount = countResult[0]?.count || 0;

        return {
            researchers: convertBigIntToString(researchers),
            totalCount: totalCount.toString() // or convertBigIntToString(totalCount)
        };
    }
}