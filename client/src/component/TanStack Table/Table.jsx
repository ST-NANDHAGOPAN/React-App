import React, { useState, useEffect, useCallback } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

function Table() {
  const itemsPerPage = 10;
  const totalItems = 100;
  const lastPageIndex = Math.ceil(totalItems / itemsPerPage);

  const [lastPageData, setLastPageData] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [sorting, setSorting] = useState([]);
  const [editedRow, setEditedRow] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => []);

  const fetchData = useCallback(
    async (pageIndex) => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(
          `https://64d08349ff953154bb78f9e5.mockapi.io/api/as/Employees?page=${pageIndex}&limit=${itemsPerPage}`
        );

        if (response.ok) {
          const data = await response.json();
          setLastPageData(data);
          setIsLastPage(pageIndex === lastPageIndex);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    },
    [itemsPerPage, lastPageIndex]
  );

  useEffect(() => {
    fetchData(pageIndex);
  }, [fetchData, pageIndex]);

  useEffect(() => {
    // Filter the data based on the search input
    const filteredData = lastPageData.filter((row) =>
      row.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setTableData(filteredData);
  }, [lastPageData, searchInput]);

  const openEditModal = (row) => {
    setEditedRow(row);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedRow(null);
    setIsEditModalOpen(false);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(
        `https://64d08349ff953154bb78f9e5.mockapi.io/api/as/Employees/${updatedData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        // Update tableData using the current state
        const editedRowIndex = lastPageData.findIndex(
          (row) => row.id === updatedData.id
        );
        if (editedRowIndex !== -1) {
          const newData = [...lastPageData];
          newData[editedRowIndex] = updatedData;
          setLastPageData(newData);
        }
      } else {
        console.error("Failed to update data on the server");
      }
      // Close the modal
      closeEditModal();
    } catch (error) {
      console.error("An error occurred while updating data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://64d08349ff953154bb78f9e5.mockapi.io/api/as/Employees/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the deleted row from lastPageData
        const newData = lastPageData.filter((row) => row.id !== id);
        setLastPageData(newData);
      } else {
        console.error("Failed to delete data on the server");
      }
    } catch (error) {
      console.error("An error occurred while deleting data:", error);
    }
  };

  const table = useReactTable({
    data: tableData,
    columns: Columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: searchInput,
    },
    onSortingChange: (newSorting) => {
      setSorting(newSorting);
    },
  });

  const handlePreviousPage = () => {
    const newPageIndex = pageIndex - 1;

    if (newPageIndex >= 1) {
      setPageIndex(newPageIndex);
      setIsLastPage(false);
      fetchData(newPageIndex);
    }
  };

  const goToLastPage = () => {
    setPageIndex(lastPageIndex);
    setIsLastPage(true);
    fetchData(lastPageIndex);
  };

  const GoToNextPage = () => {
    const nextPageIndex = pageIndex + 1;

    if (nextPageIndex <= lastPageIndex) {
      setPageIndex(nextPageIndex);
      setIsLastPage(nextPageIndex === lastPageIndex);
      fetchData(nextPageIndex);
    }
  };

  const currentPageData = isLastPage
    ? lastPageData.slice(-itemsPerPage)
    : lastPageData;

  return (
    <div className="body3 text-center"><br />
      <h1 >Using TanStack Table</h1><br />
      <div className="container">
        <div className="mb-3">
          <input
            type="text"
            className="form-control w-25 shadow border border-2"
            placeholder="Search by Name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        {isLoading ? (
          <div className="text-center spinner"></div>
        ) : isError ? (
          <div className="text-center error">Error loading data</div>
        ) : (
          <table className="table text-center">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={
                        header.id === "id"
                          ? header.column.getToggleSortingHandler()
                          : null
                      }
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getIsSorted() ? (
                            <span>
                              {header.column.isSortedDesc ? "🔽" : "🔼"}
                            </span>
                          ) : null}
                        </div>
                      )}
                    </th>
                  ))}
                  <th>Action</th>
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  <td  className="text-center">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => openEditModal(row.original)}
                    >
                      Edit
                    </button>
                    &nbsp; &nbsp; &nbsp;
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(row.original.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {(isLastPage || currentPageData.length > 0) && (
          <div className="button-container">
            <button
              className="btn btn-primary m-1"
              disabled={pageIndex === 1}
              onClick={() => {
                setPageIndex(1);
                setIsLastPage(false);
              }}
            >
              First page
            </button>
            <button
              className="btn btn-primary m-1"
              disabled={pageIndex === 1}
              onClick={() => handlePreviousPage()}
            >
              Previous page
            </button>
            <button
              className="btn btn-primary m-1"
              disabled={isLastPage}
              onClick={() => GoToNextPage()}
            >
              Next page
            </button>
            <button
              className="btn btn-primary m-1"
              disabled={isLastPage}
              onClick={() => goToLastPage()}
            >
              Last page
            </button>
          </div>
        )}
        {isEditModalOpen && (
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Row</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={closeEditModal}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="id">Id</label>
                      <input
                        type="text"
                        className="form-control"
                        id="id"
                        value={editedRow.id}
                        disabled // Make the field non-editable
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={editedRow.name || ""}
                        onChange={(e) =>
                          setEditedRow({ ...editedRow, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={editedRow.email || ""}
                        onChange={(e) =>
                          setEditedRow({ ...editedRow, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={editedRow.phone || ""}
                        onChange={(e) =>
                          setEditedRow({ ...editedRow, phone: e.target.value })
                        }
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeEditModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleUpdate(editedRow)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Columns = [
{
    header: "Id",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  ];

export default Table;
