import {
    Controller,
    Get,
    Route,
    Query,
    Path,
    Tags,
} from "tsoa";
import { NeoResearcherService } from "../services/NeoResearcherService";

@Route("neo/researchers")
export class NeoResearcherController extends Controller {
    /**
     * Get paginated researchers by DB type
     */
    @Get()
    public async getResearchers(
        @Query() page: number,
        @Query() pageSize: number,
        @Query() name?: string
    ): Promise<any> {
        return await NeoResearcherService.getCitiesWithCountries(page, pageSize);
    }
}
