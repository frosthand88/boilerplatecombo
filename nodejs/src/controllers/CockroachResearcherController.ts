import {
    Controller,
    Get,
    Route,
    Query,
    Path,
    Tags,
} from "tsoa";
import { CockroachResearcherService } from "../services/CockroachResearcherService";

@Route("cockroach/researchers")
export class CockroachResearcherController extends Controller {
    /**
     * Get paginated researchers by DB type
     */
    @Get()
    public async getResearchers(
        @Query() page?: number,
        @Query() limit?: number,
        @Query() name?: string
    ): Promise<any> {
        return await CockroachResearcherService.getResearchers(page, limit, name);
    }
}
