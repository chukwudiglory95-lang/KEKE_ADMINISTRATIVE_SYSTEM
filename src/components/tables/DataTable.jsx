import { useMemo, useState } from "react";
import { FaSearch, FaSort, FaSortUp, FaSortDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useDebounce from "../../hooks/useDebounce";
import "./dataTable.css";

export default function DataTable({ columns, data, searchKeys = [], searchPlaceholder = "Search...", actions, pageSize = 5 }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 250);

  const filtered = useMemo(() => {
    if (!debouncedSearch || searchKeys.length === 0) return data;
    const q = debouncedSearch.toLowerCase();
    return data.filter((row) => searchKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(q)));
  }, [data, debouncedSearch, searchKeys]);

  const sorted = useMemo(() => {
    if (!sort.key) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sort.key], bVal = b[sort.key];
      if (aVal === bVal) return 0;
      const result = aVal > bVal ? 1 : -1;
      return sort.direction === "asc" ? result : -result;
    });
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSort = (key) => {
    setSort((prev) => {
      if (prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return { key: null, direction: "asc" };
    });
  };

  const sortIcon = (key) => {
    if (sort.key !== key) return <FaSort className="sort-icon idle" />;
    return sort.direction === "asc" ? <FaSortUp className="sort-icon active" /> : <FaSortDown className="sort-icon active" />;
  };

  return (
    <div className="card">
      <div className="module-toolbar">
        {searchKeys.length > 0 ? (
          <div className="module-search">
            <FaSearch className="search-icon" />
            <input type="text" placeholder={searchPlaceholder} value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
        ) : <div />}
        {actions}
      </div>

      <div className="table-scroll">
        <table className="payments-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>
                  {col.sortable === false ? col.label : (
                    <button className="sort-btn" onClick={() => toggleSort(col.key)}>
                      {col.label} {sortIcon(col.key)}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 && (
              <tr><td colSpan={columns.length} className="empty-cell">No records match your search.</td></tr>
            )}
            {pageRows.map((row, i) => (
              <tr key={row.id ?? i}>
                {columns.map((col) => <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="table-pagination">
          <span>Page {currentPage} of {totalPages} · {sorted.length} record{sorted.length === 1 ? "" : "s"}</span>
          <div className="table-pagination-controls">
            <button disabled={currentPage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}><FaChevronLeft /></button>
            <button disabled={currentPage === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}><FaChevronRight /></button>
          </div>
        </div>
      )}
    </div>
  );
}