import {
    Controller,
    Get,
    Route,
    Query,
    Path,
    Tags,
} from "tsoa";
import { PostgresResearcherService } from "../services/PostgresResearcherService";

@Route("postgres/researchers")
export class PostgresResearcherController extends Controller {
    /**
     * Get paginated researchers by DB type
     */
    @Get()
    public async getResearchers(
        @Query() page?: number,
        @Query() limit?: number,
        @Query() name?: string
    ): Promise<any> {
        return await PostgresResearcherService.getResearchers(page, limit, name);
    }
}
