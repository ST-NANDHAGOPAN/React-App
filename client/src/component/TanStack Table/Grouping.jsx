import React, { useMemo, useReducer, useState } from "react";
import {
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";

import studentsJson from "./students.json";

function GroupingData() {
  const rerender = useReducer(() => ({}), {})[1];

  const columns = useMemo(
    () => [
      {
        header: "id",
        accessorKey: "id",
      },
      {
        header: "Name",
        columns: [
          {
            accessorKey: "firstname",
            header: "Firstname",
            cell: (info) => info.getValue(),
            getGroupingValue: (row) => `${row.firstName} ${row.lastName}`,
          },
          {
            accessorFn: (row) => row.lastname,
            id: "lastname",
            header: () => <span>LastName</span>,
            cell: (info) => info.getValue(),
          },
        ],
      },
      {
        header: "Info",
        columns: [
          {
            accessorKey: "age",
            header: () => "Age",
            aggregatedCell: ({ getValue }) =>
              Math.round(getValue() * 100) / 100,
            aggregationFn: "median",
          },
          {
            header: "Gender",
            accessorKey: "gender",
          },
          {
            header: "Grade",
            accessorKey: "grade",
          },
        ],
      },
      {
        header: "Contact Info",
        columns: [
          {
            header: "Email",
            accessorKey: "email",
          },
          {
            header: "Phone",
            accessorKey: "contact_number",
          },
          {
            header: "Address",
            accessorKey: "address",
          },
        ],
      },
    ],
    []
  );
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [data, setData] = useState(() => studentsJson);
  const refreshData = () => {
    setIsLoading(true); // Set loading state to true
    // Simulate loading with a delay (you can replace this with your actual data fetching)
    setTimeout(() => {
      setData(studentsJson);
      setIsLoading(false); // Set loading state to false when data is loaded
    }, 2000); // Adjust the delay as needed
  };

  const [grouping, setGrouping] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
  });
  return (
    <div className="body3 text-center">
      <br />
      <h1>Using Grouping</h1>
      <br />
      <div className="container">
        {isLoading ? (
          <table>           
            <tbody className="m-5">
              <tr>
                <td colSpan={columns.length} className="text-center">
                  <div className="spinner"></div>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table className="table table-hover table-responsive">
            <thead className="text-center">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div>
                            {header.column.getCanGroup() ? (
                              <button
                                onClick={header.column.getToggleGroupingHandler()}
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                {header.column.getIsGrouped()
                                  ? `🛑(${header.column.getGroupedIndex()}) `
                                  : `👊 `}
                              </button>
                            ) : null}{" "}
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
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
            <tfoot>
              <tr>
                <td colSpan={12}>
                  <div className="d-flex justify-content-between align-items-center ">
                    <button
                      className="btn btn-primary "
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                    >
                      {"First Page"}
                    </button>
                    <div>
                      <button
                        className="btn btn-primary "
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                      >
                        {"Previous"}
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                      >
                        {"Next"}
                      </button>
                    </div>

                    <button
                      className="btn btn-primary "
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                      disabled={!table.getCanNextPage()}
                    >
                      {"Last page"}
                    </button>
                    <span className="flex items-center gap-1">
                      <div>Page</div>
                      <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                      </strong>
                    </span>
                    <span className="flex items-center gap-1">
                      | Go to page:
                      <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                          const page = e.target.value
                            ? Number(e.target.value) - 1
                            : 0;
                          table.setPageIndex(page);
                        }}
                        className="border p-1 rounded w-16"
                      />
                    </span>
                    <select
                      value={table.getState().pagination.pageSize}
                      onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                      }}
                    >
                      {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          Show {pageSize}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        )}
        <br />
        <div>{table.getRowModel().rows.length} Rows</div>
        <div>
          <button onClick={() => rerender()}>Force Rerender</button>
        </div>
        <br />
        <div>
          <button onClick={() => refreshData()}>Refresh Data</button>
        </div>
        <br />
      </div>
      <br />
      <br />
    </div>
  );
}

export default GroupingData;
