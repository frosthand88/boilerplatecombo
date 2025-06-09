import {
    Controller,
    Get,
    Route,
    Query,
    Path,
    Tags,
} from "tsoa";
import { CassandraResearcherService } from "../services/CassandraResearcherService";

@Route("cassandra/researchers")
export class CassandraResearcherController extends Controller {
    /**
     * Get paginated researchers by DB type
     */
    @Get()
    public async getResearchers(
        @Query() page?: number,
        @Query() pageSize?: number,
        @Query() name?: string
    ): Promise<any> {
        return await CassandraResearcherService.getResearchers();
    }
}
