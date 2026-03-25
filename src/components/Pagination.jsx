export function Pagination({page, setPage, totalPages}) {
    return (
        <div className="pagination">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                className='pagination-button'
            >
                Previous
            </button>

            <span className='page'>Page {page + 1}</span>

            <button onClick={() => setPage(page + 1)}
                disabled={page >= totalPages - 1}
                className='pagination-button'
            >
                Next
            </button>
        </div>
    )
}