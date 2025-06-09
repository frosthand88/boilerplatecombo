import { MongoClient, Db, Collection, Document, WithId } from "mongodb";
import {Researcher} from "../entity/Researcher";

export class MongoResearcherService {
    static async getResearchersAsync(
        page: number,
        pageSize: number,
        filter?: string
    ): Promise<{ researchers: Researcher[]; totalCount: number }> {
        const client = new MongoClient(
            `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`
        );
        const db = client.db(process.env.MONGO_DATABASE);
        const col = db.collection("researchers");

        const query: Document = filter
            ? { name: { $regex: filter, $options: "i" } }
            : {};

        const totalCount = await col.countDocuments(query);

        const cursor = col
            .find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const researchers = (await cursor.toArray()) as unknown as Researcher[];

        return { researchers, totalCount };
    }
}
