import {
    Controller,
    Get,
    Route,
    Query,
    Path,
    Tags,
} from "tsoa";
import { TimescaleResearcherService } from "../services/TimescaleResearcherService";

@Route("timescale/researchers")
export class TimescaleResearcherController extends Controller {
    /**
     * Get paginated researchers by DB type
     */
    @Get()
    public async getResearchers(
        @Query() page?: number,
        @Query() limit?: number,
        @Query() name?: string
    ): Promise<any> {
        return await TimescaleResearcherService.getResearchers(page, limit, name);
    }
}
