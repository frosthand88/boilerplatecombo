import {
    Controller,
    Get,
    Route,
    Query,
    Path,
    Tags,
} from "tsoa";
import { ElasticResearcherService } from "../services/ElasticResearcherService";

@Route("elastic/researchers")
export class ElasticResearcherController extends Controller {
    /**
     * Get paginated researchers by DB type
     */
    @Get()
    public async getResearchers(
        @Query() page: number,
        @Query() pageSize: number,
        @Query() name?: string
    ): Promise<any> {
        return await ElasticResearcherService.getResearchersAsync(page, pageSize, name);
    }
}
