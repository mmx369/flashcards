import { useState } from 'react';
import classes from './Pagination.module.css';

type TProps = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (int: number) => void;
};

function PaginationComponent({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}: TProps) {
  const maxVisibleButtons = 2;
  const [current, setCurrent] = useState(currentPage);
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrent(page);
    onPageChange(page);
  };

  const generatePagination = () => {
    const buttons = [];
    let startPage = Math.max(1, current - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(pageCount, startPage + maxVisibleButtons - 1);

    if (endPage - startPage < maxVisibleButtons - 1) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <button key={1} onClick={() => handlePageChange(1)}>
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key='left-ellipsis'>...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={current === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    if (endPage < pageCount) {
      if (endPage < pageCount - 1) {
        buttons.push(<span key='right-ellipsis'>...</span>);
      }
      buttons.push(
        <button key={pageCount} onClick={() => handlePageChange(pageCount)}>
          {pageCount}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className={classes.pagination}>
      {current > 1 && (
        <button onClick={() => handlePageChange(current - 1)}>Prev</button>
      )}
      {generatePagination()}
      {current < pageCount && (
        <button onClick={() => handlePageChange(current + 1)}>Next</button>
      )}
    </div>
  );
}

export default PaginationComponent;
