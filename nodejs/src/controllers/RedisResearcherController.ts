import {
    Controller,
    Get,
    Route,
    Query,
    Path,
    Tags,
} from "tsoa";
import { RedisResearcherService } from "../services/RedisResearcherService";

@Route("redis/researchers")
export class RedisResearcherController extends Controller {
    /**
     * Get paginated researchers by DB type
     */
    @Get()
    public async getResearchers(
        @Query() page?: number,
        @Query() pageSize?: number,
        @Query() name?: string
    ): Promise<any> {
        return await RedisResearcherService.getResearchersAsync(page, pageSize, name);
    }
}
