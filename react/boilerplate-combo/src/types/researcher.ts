export interface Researcher {
    id: number;
    name: string;
    created_at: string; // ISO string
}

export interface ResearcherFilter {
    name?: string;
}

export interface PagedResult<T> {
    data: T[];
    totalCount: number;
}
