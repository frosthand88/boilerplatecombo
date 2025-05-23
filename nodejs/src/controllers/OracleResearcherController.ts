import {
    Controller,
    Get,
    Route,
    Query,
    Path,
    Tags,
} from "tsoa";
import { OracleResearcherService } from "../services/OracleResearcherService";

@Route("oracle/researchers")
export class OracleResearcherController extends Controller {
    /**
     * Get paginated researchers by DB type
     */
    @Get()
    public async getResearchers(
        @Query() page?: number,
        @Query() pageSize?: number,
        @Query() name?: string
    ): Promise<any> {
        return await OracleResearcherService.getResearchers(page, pageSize, name);
    }
}
