import {
    Controller,
    Get,
    Route,
    Query,
    Path,
    Tags,
} from "tsoa";
import { DuckResearcherService } from "../services/DuckResearcherService";

@Route("duck/researchers")
export class DuckResearcherController extends Controller {
    /**
     * Get paginated researchers by DB type
     */
    @Get()
    public async getResearchers(
        @Query() page?: number,
        @Query() pageSize?: number,
        @Query() name?: string
    ): Promise<any> {
        return await DuckResearcherService.getResearchers(page, pageSize, name);
    }
}
