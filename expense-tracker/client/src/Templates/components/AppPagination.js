import React from "react";

const AppPagination = ({ items, setPage }) => {
  const arr = Array.from(Array(items).keys());
  return (
    <nav aria-label="...">
      <ul className="pagination">
        {arr?.map(num => (
          <>
            <li className="page-item">
              <button
                onClick={e => setPage(e.target.textContent)}
                className="page-link"
              >
                {++num}
              </button>
            </li>
          </>
        ))}
      </ul>
    </nav>
  );
};

export default AppPagination;
