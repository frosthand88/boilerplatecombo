import { Researcher, ResearcherFilter, PagedResult } from '../types/researcher';

const API_BASE_URL = 'https://host.docker.internal:64010/researcher'; // Adjust your backend URL

export async function fetchResearchers(
    page: number,
    pageSize: number,
    sortField: string,
    sortOrder: string,
    filters: ResearcherFilter
): Promise<PagedResult<Researcher>> {
    const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        sortField,
        sortOrder,
        ...filters
    });

    const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
    const data = await response.json();
    return data;
}

export async function createResearcher(data: Partial<Researcher>): Promise<Researcher> {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export async function updateResearcher(id: number, data: Partial<Researcher>): Promise<Researcher> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export async function deleteResearcher(id: number): Promise<void> {
    await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
}
