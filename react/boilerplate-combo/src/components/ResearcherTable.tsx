import React, { useEffect, useState } from 'react';
import { Researcher, ResearcherFilter } from '../types/researcher';
import { fetchResearchers, createResearcher, updateResearcher, deleteResearcher } from '../api/researcherApi';
import PaginationBar from './PaginationBar';
import './ResearcherTable.css';
import ResearcherCharts from "./ResearcherCharts";
import useDebounce from './useDebounce';
import MediaPlayer from "./MediaPlayer";
import TreeComponent from "./TreeExample";
import ResearcherModal from "./ResearcherModal";

const pageSize = 15;

function ResearcherTable() {
    const [researchers, setResearchers] = useState<Researcher[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortField, setSortField] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [filters, setFilters] = useState<ResearcherFilter>({filter: ''});
    const [selectedResearcher, setSelectedResearcher] = useState<Researcher | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    // Debounced value for the name filter
    const debouncedName = useDebounce(filters.filter, 500);  // Delay of 500ms

    useEffect(() => {
        loadData();
    }, [page, sortField, sortOrder, debouncedName]);

    async function loadData() {
        setLoading(true);
        const data = await fetchResearchers(page, pageSize, sortField, sortOrder, { filter: debouncedName });
        setResearchers(data.data);
        setTotalPages(Math.ceil(data.totalCount / pageSize));
        setLoading(false);
    }

    function handleSort(field: keyof Researcher) {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    }

    function renderSortArrow(field: string) {
        if (sortField === field) {
            return sortOrder === 'asc' ? '↑' : '↓';
        }
        return '';  // No arrow if the field is not the sorted one
    }

    function handleFilterChange(field: keyof ResearcherFilter, value: string) {
        setFilters(prev => ({ ...prev, [field]: value }));
        setPage(1);
    }

    async function handleDelete(id: number) {
        if (window.confirm('Are you sure you want to delete this researcher?')) {
            await deleteResearcher(id);
            loadData();
        }
    }

    async function handleSave(data: Partial<Researcher>) {
        if (selectedResearcher) {
            await updateResearcher(selectedResearcher.id, data);
        } else {
            await createResearcher(data);
        }
        setShowModal(false);
        setSelectedResearcher(null);
        loadData();
    }

    function exportCSV() {
        const csv = researchers.map(r => `${r.id},${r.name},${r.created_at},${r.age}`).join('\n');
        const blob = new Blob([`ID,Name,Created At\n${csv}`], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'researchers.csv');
        link.click();
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className="researcher-table-container">
            <ResearcherCharts fullResearchers={researchers} pageResearchers={researchers} />
            <TreeComponent></TreeComponent>

            {/* On-Premise Video */}
            <MediaPlayer
                type="video"
                src="/react/media/MiNiDianYing.mp4"
                title="Local Hosted Video"
                loop={false}
                autoPlay={false}
            />

            {/* On-Premise Audio */}
            <MediaPlayer
                type="audio"
                src="/react/media/Final_Fantasy_Unlimited__Over_the_Fantasy.mp3"
                title="Local Hosted Audio"
                loop={true}
                autoPlay={true}
            />

            <div className="button-container">
                <button className="action-button" onClick={() => { setSelectedResearcher(null); setShowModal(true); }}>Add Researcher</button>
                <button className="action-button" onClick={exportCSV}>Export CSV</button>
            </div>

            {/* Pagination */}
            <PaginationBar
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage: any) => setPage(newPage)}
            />

            <table className="researcher-table">
                <thead>
                <tr>
                    <th onClick={() => handleSort('id')}>ID {renderSortArrow('id')}</th>
                    <th>
                        <div onClick={() => handleSort('name')}>Name {renderSortArrow('name')}</div>
                        <input
                            type="text"
                            className="filter-input"
                            value={filters.filter || ''}  // Bind the filter state correctly
                            onChange={e => handleFilterChange('filter', e.target.value)}
                            placeholder="Filter Name"
                        />
                    </th>
                    <th onClick={() => handleSort('created_at')}>Created At {renderSortArrow('created_at')}</th>
                    <th onClick={() => handleSort('age')}>Age {renderSortArrow('age')}</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(researchers) && researchers.length > 0 ? (
                    researchers.map((r) => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.name}</td>
                            <td>{new Date(r.created_at).toLocaleString()}</td>
                            <td>{r.age}</td>
                            <td>
                                <button className="action-button" onClick={() => { setSelectedResearcher(r); setShowModal(true); }}>Edit</button>
                                <button className="action-button" onClick={() => handleDelete(r.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={4}>No researchers available</td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Pagination */}
            <PaginationBar
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage: any) => setPage(newPage)}
            />

            {/* Modal */}
            {showModal && (
                <ResearcherModal
                    onClose={() => { setShowModal(false); setSelectedResearcher(null); }}
                    onSave={handleSave}
                    researcher={selectedResearcher}
                />
            )}
        </div>
    );
}

export default ResearcherTable;
