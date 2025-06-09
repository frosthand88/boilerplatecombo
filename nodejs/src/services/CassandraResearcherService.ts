import { Client, types } from "cassandra-driver";
import * as dotenv from "dotenv";
import {Researcher} from "../entity/Researcher";

dotenv.config();

export class CassandraResearcherService {
    static async getResearchers(): Promise<Researcher[]> {
        const client = new Client({
            contactPoints: [process.env.CASSANDRA_CONTACT_POINT || "localhost"],
            localDataCenter: "datacenter1",  // Adjust if needed
            protocolOptions: { port: parseInt(process.env.CASSANDRA_PORT || "9042") },
            credentials: { username: "cassandra", password: process.env.CASSANDRA_PASSWORD || "" }
        });
        await client.connect();
        const result = await client.execute('SELECT * FROM benchmark_keyspace.researchers');
        return result.rows as unknown as Researcher[];
    }
}
