import Redis from "ioredis";
import dotenv from "dotenv";
import {Researcher} from "../entity/Researcher";

dotenv.config();

export class RedisResearcherService {
    static async getResearchersAsync(
        page?: number,
        pageSize?: number,
        filter?: string
    ): Promise<{ researchers: Researcher[]; totalCount: number }> {
        // Example: fetch all fields of hash "researcher:1"
        const redis = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD,
        });
        const content = await redis.hgetall("researcher:1");
        console.log("Content:", content);

        // NOTE: This is just a stub. You'll want to adapt for paging/filtering/sorting with Redis structures.
        return { researchers: [], totalCount: 0 };
    }
}
