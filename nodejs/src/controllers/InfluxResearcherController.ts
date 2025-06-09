import {
    Controller,
    Get,
    Route,
    Query,
    Path,
    Tags,
} from "tsoa";
import { InfluxResearcherService } from "../services/InfluxResearcherService";

@Route("influx/researchers")
export class InfluxResearcherController extends Controller {
    /**
     * Get paginated researchers by DB type
     */
    @Get()
    public async getResearchers(
        @Query() page: number,
        @Query() pageSize: number,
        @Query() name?: string
    ): Promise<any> {
        return await InfluxResearcherService.getResearchersAsync(page, pageSize, name);
    }
}
