import {
    Controller,
    Get,
    Route,
    Query,
    Path,
    Tags,
} from "tsoa";
import { MariaResearcherService } from "../services/MariaResearcherService";

@Route("maria/researchers")
export class MariaResearcherController extends Controller {
    /**
     * Get paginated researchers by DB type
     */
    @Get()
    public async getResearchers(
        @Query() page?: number,
        @Query() pageSize?: number,
        @Query() name?: string
    ): Promise<any> {
        return await MariaResearcherService.getResearchers(page, pageSize, name);
    }
}
