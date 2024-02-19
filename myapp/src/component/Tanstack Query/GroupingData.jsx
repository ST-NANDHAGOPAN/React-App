import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
  useReactTable,
} from "@tanstack/react-table";

function GroupingData() {
  // State variables
  const [filtering, setFiltering] = useState("");
  const [grouping, setGrouping] = useState([]);
  const [columnfilter, setColumnFilter] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  // Define columns
  const columns = useMemo(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Post_Id", accessorKey: "postId" },
      { header: "name", accessorKey: "name" },
      { header: "Email", accessorKey: "email" },
      { header: "Body", accessorKey: "body" },
    ],
    []
  );

  // Fetch data using useQuery
  const { data, isLoading } = useQuery({
    queryKey: [
      "comments",
      pagination.pageIndex + 1,
      pagination.pageSize,
      filtering,
      columnfilter,
    ],
    queryFn: () =>
      fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${
          pagination.pageIndex + 1
        }&_limit=${pagination.pageSize}${filtering ? "&q=" + filtering : ""}${
          columnfilter.length !== 0
            ? columnfilter
                .map(({ id, value }) => `&${id}_like=${value}`)
                .join("")
            : ""
        }`
      ).then((response) => {
        setTotalRecords(response.headers.get("X-Total-Count"));
        console.log("Total records", totalRecords);
        return response.json();
      }),
  });

  // Initialize the table using useReactTable
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    pageCount: Math.ceil(totalRecords / pagination.pageSize),
    state: {
      grouping,
      globalFilter: filtering,
      pagination: pagination,
      columnFilters: columnfilter,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    onGroupingChange: setGrouping,
    onGlobalFilterChange: setFiltering,
    onColumnFiltersChange: setColumnFilter,
  });

  return (
    <div className="body3 ffw">
      <br />
      <h1 className="text-center">TanStack Table & Query</h1>
      <br />
      <div className="container">
        <div className="mb-3">
          <br />
          <input
            placeholder="Search by Name..."
            className="form-control w-25 shadow border border-2"
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div>
        <select
          value={pagination.pageSize}
          onChange={(e) => {
            const newPageSize = Number(e.target.value);
            table.setPageSize(newPageSize);
            console.log("newPageSize", newPageSize);
            console.log("OnCHANGE", pagination.pageSize);
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <div className="table-responsive">
          {/* Render the table body when data is not loading */}
          <table className="table table-hover">
            <thead className="text-center">
              {table.getHeaderGroups().map((headerGroup, columnIndex) => (
                <tr  key={headerGroup.id} >
                  {headerGroup.headers.map((header) => {
                    return (
                      <th  className="bg-warning-subtle" key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div >
                            {header.column.getCanGroup() ? (
                              <span
                                onClick={header.column.getToggleGroupingHandler()}
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                {header.column.getIsGrouped()
                                  ? `🛑(${header.column.getGroupedIndex()}) `
                                  : `👊 `}
                              </span>
                            ) : null}
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanFilter() && (
                              <input
                                placeholder="Search"
                                type="text"
                                className="form-control w-100"
                                onChange={(e) =>
                                  header.column.setFilterValue(e.target.value)
                                }
                              />
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            {isLoading ? (
              <tbody className="m-5">
                <tr>
                  <td colSpan={columns.length} className="text-center">
                    <div className="spinner"></div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            style={{
                              background: cell.getIsGrouped()
                                ? "#0aff0082"
                                : cell.getIsAggregated()
                                ? "#ffa50078"
                                : cell.getIsPlaceholder()
                                ? "#ff000042"
                                : "white",
                            }}
                          >
                            {cell.getIsGrouped() ? (
                              <>
                                <button
                                  onClick={row.getToggleExpandedHandler()}
                                  style={{
                                    cursor: row.getCanExpand()
                                      ? "pointer"
                                      : "normal",
                                  }}
                                  className="btn btn-success"
                                >
                                  {row.getIsExpanded() ? "👇" : "👉"}{" "}
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}{" "}
                                  ({row.subRows.length})
                                </button>
                              </>
                            ) : cell.getIsAggregated() ? (
                              flexRender(
                                cell.column.columnDef.aggregatedCell ??
                                  cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            ) : cell.getIsPlaceholder() ? null : (
                              flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
        <div className="button-container d-flex justify-content-center">
          <button
            className="btn btn-primary m-1"
            onClick={() => table.setPageIndex(0)}
            disabled={pagination.pageIndex + 1 === 1}
          >
            {"First Page"}
          </button>
          <button
            className="btn btn-primary m-1"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            {"Previous Page"}
          </button>
          <button className="btn btn-danger m-1">
            Page ({table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()})
          </button>
          <button
            className="btn btn-primary m-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {"Next Page"}
          </button>

          <button
            className="btn btn-primary m-1"
            disabled={
              pagination.pageIndex + 1 === totalRecords / pagination.pageSize
            }
            onClick={() => table.setPageIndex(table.getPageCount())}
          >
            {"Last Page"}
          </button>
        </div>
        {/* <div className="text-center fw-bold fs-4">
          ({table.getRowModel().rows.length} Rows)
        </div> */}
      </div>
    </div>
  );
}

export default GroupingData;
