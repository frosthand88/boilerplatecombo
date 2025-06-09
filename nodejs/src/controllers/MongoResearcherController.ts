import {
    Controller,
    Get,
    Route,
    Query,
    Path,
    Tags,
} from "tsoa";
import { MongoResearcherService } from "../services/MongoResearcherService";

@Route("mongo/researchers")
export class MongoResearcherController extends Controller {
    /**
     * Get paginated researchers by DB type
     */
    @Get()
    public async getResearchers(
        @Query() page: number,
        @Query() pageSize: number,
        @Query() name?: string
    ): Promise<any> {
        return await MongoResearcherService.getResearchersAsync(page, pageSize, name);
    }
}
