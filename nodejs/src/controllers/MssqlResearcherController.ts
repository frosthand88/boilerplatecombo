import {
    Controller,
    Get,
    Route,
    Query,
    Path,
    Tags,
} from "tsoa";
import { MssqlResearcherService } from "../services/MssqlResearcherService";

@Route("mssql/researchers")
export class MssqlResearcherController extends Controller {
    /**
     * Get paginated researchers by DB type
     */
    @Get()
    public async getResearchers(
        @Query() page?: number,
        @Query() pageSize?: number,
        @Query() name?: string
    ): Promise<any> {
        return await MssqlResearcherService.getResearchers(page, pageSize, name);
    }
}
