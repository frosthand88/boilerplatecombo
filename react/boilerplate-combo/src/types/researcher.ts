export interface Researcher {
    id: number;
    name: string;
    created_at: string; // ISO string
}

export interface ResearcherFilter {
    filter?: string;
}

export interface PagedResult<T> {
    data: T[];
    totalCount: number;
}
