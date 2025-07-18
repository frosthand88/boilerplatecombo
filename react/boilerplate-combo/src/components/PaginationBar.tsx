﻿import React from "react";
import './PaginationBar.css';

interface PaginationBarProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({ currentPage, totalPages, onPageChange }) => {
    const maxPageNumbers = 30;

    const getPageNumbers = () => {
        let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
        let endPage = startPage + maxPageNumbers - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxPageNumbers + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const handleFirst = () => {
        if (currentPage !== 1) onPageChange(1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const handleLast = () => {
        if (currentPage !== totalPages) onPageChange(totalPages);
    };

    return (
        <div className="pagination-bar">
            <button className="pagination-button" onClick={handleFirst} disabled={currentPage === 1}>
                &laquo; {/* << */}
            </button>
            <button className="pagination-button" onClick={handlePrevious} disabled={currentPage === 1}>
                &lsaquo; {/* < */}
            </button>

            {getPageNumbers().map((page) => (
                <button
                    className={`pagination-button ${currentPage === totalPages + 1 ? 'active' : ''}`}
                    key={page}
                    onClick={() => onPageChange(page)}
                    style={{
                        fontWeight: page === currentPage ? "bold" : "normal",
                        backgroundColor: page === currentPage ? "#007bff" : "",
                        color: page === currentPage ? "white" : "",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        border: "1px solid lightgray",
                        minWidth: "32px",
                    }}
                >
                    {page}
                </button>
            ))}

            <button className="pagination-button" onClick={handleNext} disabled={currentPage === totalPages}>
                &rsaquo; {/* > */}
            </button>
            <button className="pagination-button" onClick={handleLast} disabled={currentPage === totalPages}>
                &raquo; {/* >> */}
            </button>
        </div>
    );
};

export default PaginationBar;
