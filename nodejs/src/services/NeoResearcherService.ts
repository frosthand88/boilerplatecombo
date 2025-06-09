import neo4j, { Driver, RecordShape } from 'neo4j-driver';

export class NeoResearcherService {
    static async getCitiesWithCountries(
        page: number = 1,
        pageSize: number = 10
    ): Promise<Array<{
        city_name: string;
        population: number;
        country: {
            code: string;
            name: string;
            continent: string;
        };
    }>> {
        const uri = process.env.NEO4J_URL!;
        const user = process.env.NEO4J_USER!;
        const password = process.env.NEO4J_PASSWORD!;

        const driver: Driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

        const skip = (page - 1) * pageSize;
        const limit = pageSize;

        const session = driver.session();

        try {
            const query = `
        MATCH (city:City)-[:IN_COUNTRY]->(country:Country)
        RETURN city, country
        ORDER BY city.name ASC
        SKIP $skip
        LIMIT $limit
      `;

            const result = await session.run(query, {
                skip: neo4j.int(skip),
                limit: neo4j.int(limit)
            });

            return result.records.map((record: RecordShape) => {
                const cityProps = record.get('city').properties;
                const countryProps = record.get('country').properties;

                return {
                    city_name: cityProps.name,
                    population: cityProps.population?.toNumber?.() ?? 0,
                    country: {
                        code: countryProps.code,
                        name: countryProps.name,
                        continent: countryProps.continent
                    }
                };
            });
        } finally {
            await session.close();
        }
    }
}
