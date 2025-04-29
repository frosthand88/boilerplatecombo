export interface Researcher {
    id: number;
    name: string;
    created_at: string; // ISO string
    age: number;
}

export interface ResearcherFilter {
    filter?: string;
}

export interface PagedResult<T> {
    data: T[];
    totalCount: number;
}
