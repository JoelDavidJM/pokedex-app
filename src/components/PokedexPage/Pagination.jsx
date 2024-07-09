import './styles/Pagination.css'

const Pagination = ({ pokemonForPage, currentPage, setCurrentPage, pokemons, currentSuperPageIndex, setCurrentSuperPageIndex }) => {
  const totalPages = Math.ceil(pokemons.length / pokemonForPage);
  const pageNumbers = [];
  const superPages = [[]];

  let superPagesCount = 0;
  let superPagesIndex = 0;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
    if (superPagesCount === 5) { 
      superPages.push([]);
      superPagesIndex++;
      superPagesCount = 0;
    }
    superPages[superPagesIndex].push(i);
    superPagesCount++;
  }

  const handleStartPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      const newSuperPageIndex = superPages.findIndex(group => group.includes(newPage));
      setCurrentSuperPageIndex(newSuperPageIndex);
      setCurrentPage(newPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      const newSuperPageIndex = superPages.findIndex(group => group.includes(newPage));
      setCurrentSuperPageIndex(newSuperPageIndex);
      setCurrentPage(newPage);
    }
  };

  const handleChangePage = (newNumberPage) => {
    const newSuperPageIndex = superPages.findIndex(group => group.includes(newNumberPage));
    setCurrentSuperPageIndex(newSuperPageIndex);
    setCurrentPage(newNumberPage);
  };

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button 
        className={`pagination__button__previous ${currentPage <= 1 ? 'is-disabled' : ''}`}
        onClick={handleStartPage}
        disabled={currentPage <= 1}>
        <i className="pagination__button__icon bx bx-chevrons-left"></i>
      </button>
      <ul className="pagination__ul">
        <div className="pagination__ul__container">
          {
            superPages[currentSuperPageIndex]?.map((pageNumber) => (
              <li key={pageNumber} className="pagination__li">
                <button
                  className={`pagination__ul__li__button ${pageNumber === currentPage ? 'is-current' : ''}`} 
                  onClick={() => handleChangePage(pageNumber)}>
                  {pageNumber}
                </button>
              </li>
            ))
          }
        </div>
      </ul>
      <button
        className={`pagination__button__next ${currentPage >= totalPages ? 'is-disabled' : ''}`}
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}>
        <i className="pagination__button__icon bx bx-chevrons-right"></i>
      </button>
    </nav>
  );
}

export default Pagination;
