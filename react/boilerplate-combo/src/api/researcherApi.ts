import { Researcher, ResearcherFilter, PagedResult } from '../types/researcher';

const API_BASE_URL = 'https://api.frosthand.com'; // Adjust your backend URL

export async function fetchResearchers(
    framework: string,
    page: number,
    pageSize: number,
    sortField: string,
    sortOrder: string,
    filters: ResearcherFilter
): Promise<PagedResult<Researcher>> {
    const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        sortBy: sortField,
        ascending: sortOrder === 'asc' ? 'true' : 'false',
        ...filters
    });

    const response = await fetch(`${API_BASE_URL}/${framework}/postgres/researcher?${params.toString()}`);
    const data = await response.json();
    return data;
}

export async function createResearcher(framework: string, data: Partial<Researcher>): Promise<Researcher> {
    const response = await fetch(`${API_BASE_URL}/${framework}/postgres/researcher`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export async function updateResearcher(framework: string, id: number, data: Partial<Researcher>): Promise<Researcher> {
    const response = await fetch(`${API_BASE_URL}/${framework}/postgres/researcher${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export async function deleteResearcher(framework: string, id: number): Promise<void> {
    await fetch(`${API_BASE_URL}/${framework}/postgres/researcher${id}`, {
        method: 'DELETE',
    });
}
