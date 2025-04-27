import React, { useEffect, useState } from 'react';
import { Researcher, ResearcherFilter } from '../types/researcher';
import { fetchResearchers, createResearcher, updateResearcher, deleteResearcher } from '../api/researcherApi';

const pageSize = 25;

function ResearcherTable() {
    const [researchers, setResearchers] = useState<Researcher[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortField, setSortField] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [filters, setFilters] = useState<ResearcherFilter>({});
    const [selectedResearcher, setSelectedResearcher] = useState<Researcher | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        loadData();
    }, [page, sortField, sortOrder, filters]);

    async function loadData() {
        setLoading(true);
        const data = await fetchResearchers(page, pageSize, sortField, sortOrder, filters);
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
        const csv = researchers.map(r => `${r.id},${r.name},${r.created_at}`).join('\n');
        const blob = new Blob([`ID,Name,Created At\n${csv}`], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'researchers.csv');
        link.click();
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Researchers</h2>
            <button onClick={() => { setSelectedResearcher(null); setShowModal(true); }}>Add Researcher</button>
            <button onClick={exportCSV}>Export CSV</button>

            <table border={1} cellPadding={5}>
                <thead>
                <tr>
                    <th onClick={() => handleSort('id')}>ID</th>
                    <th>
                        <div onClick={() => handleSort('name')}>Name</div>
                        <input
                            type="text"
                            onChange={e => handleFilterChange('name', e.target.value)}
                            placeholder="Filter Name"
                        />
                    </th>
                    <th onClick={() => handleSort('created_at')}>Created At</th>
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
                            <td>
                                <button onClick={() => { setSelectedResearcher(r); setShowModal(true); }}>Edit</button>
                                <button onClick={() => handleDelete(r.id)}>Delete</button>
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
            <div>
                {Array.from({ length: totalPages }, (_, idx) => (
                    <button key={idx} disabled={page === idx + 1} onClick={() => setPage(idx + 1)}>
                        {idx + 1}
                    </button>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <Modal
                    onClose={() => { setShowModal(false); setSelectedResearcher(null); }}
                    onSave={handleSave}
                    researcher={selectedResearcher}
                />
            )}
        </div>
    );
}

interface ModalProps {
    onClose: () => void;
    onSave: (data: Partial<Researcher>) => void;
    researcher: Researcher | null;
}

function Modal({ onClose, onSave, researcher }: ModalProps) {
    const [name, setName] = useState<string>(researcher ? researcher.name : '');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSave({ name });
    }

    return (
        <div style={{
            position: 'fixed', top: '30%', left: '30%', padding: '20px', backgroundColor: 'white', border: '1px solid black'
        }}>
            <h3>{researcher ? 'Edit Researcher' : 'Add Researcher'}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <button type="submit">Save</button>
                <button onClick={onClose} type="button">Cancel</button>
            </form>
        </div>
    );
}

export default ResearcherTable;
