import {
    Controller,
    Get,
    Route,
    Query,
    Path,
    Tags,
} from "tsoa";
import { MysqlResearcherService } from "../services/MysqlResearcherService";

@Route("mysql/researchers")
export class MysqlResearcherController extends Controller {
    /**
     * Get paginated researchers by DB type
     */
    @Get()
    public async getResearchers(
        @Query() page?: number,
        @Query() pageSize?: number,
        @Query() name?: string
    ): Promise<any> {
        return await MysqlResearcherService.getResearchers(page, pageSize, name);
    }
}
