import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios"
const Query = () => {
  const [PageIndex, setPageIndex] = useState(1);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [editedRow, setEditedRow] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const columns = [
    {
      header: "ID",
      accessorKey: "_id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Age",
      accessorKey: "age",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Address",
      accessorKey: "address",
    }
  ];
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: () =>
      axios.get(
        `http://localhost:5000/api/user-register`
      ).then((response) => {
        console.log("response",response.data);
        return response.data
      }
      ),
  });
 
  const table = useReactTable({
    data:data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      pagination: {
        pageIndex: PageIndex,
        pageSize: 10,
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const totalPage = 10; // Replace with actual total page count
  const openEditModal = (row) => {
    setEditedRow(row);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedRow(null);
    setIsEditModalOpen(false);
  };

  const handleUpdate = async (updatedData) => {
    console.log("updatedData",updatedData);
    try {
      const response = await fetch(
        `http://localhost:5000/api/user-register/${updatedData._id}`,
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
        const tocheck = data?.data
        const editedRowIndex = tocheck.findIndex(
          (row) => row.id === updatedData._id
        );
        console.log("editedRowIndex",editedRowIndex,"updatedData",updatedData._id ,"tocheck",tocheck.findIndex(
          (row) => row.id
        ));
        if (editedRowIndex !== -1) {
          console.log("Hiii editedRowIndex");
          const newData = [...data];
          newData[editedRowIndex] =  updatedData;
          refetch(newData);
        
        }
      } else {
        console.error("Failed to update data on the server");
        
      }
   
    } catch (error) {
      console.error("An error occurred while updating data:", error);
     
    }
    closeEditModal();
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
        // Remove the deleted row from tableData
        const newData = data.filter((row) => row.id !== id);
        refetch(newData);
      } else {
        console.error("Failed to delete data on the server");
      }
    } catch (error) {
      console.error("An error occurred while deleting data:", error);
    }
  };

  return (
    <div className="body3"><br />
      <h1 className="text-center">CRUD</h1><br />
      <div className="container">
        {isLoading ? (
          <div className="text-center spinner"></div>
        ) : (
          <>
            
            <div className="mb-3 d-flex">
            <button className="btn btn-success me-3">ADD User</button>
              <input
                placeholder="Search by Name..."
                className="form-control w-25 shadow border  border-2"
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
              />
            </div>
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
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                    <td className="text-center">
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
                            value={editedRow._id}
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
                              setEditedRow({
                                ...editedRow,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="age">Age</label>
                          <input
                            type="text"
                            className="form-control"
                            id="age"
                            value={editedRow.age}
                            onChange={(e) =>
                              setEditedRow({
                                ...editedRow,
                                age: e.target.value,
                              })
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
                              setEditedRow({
                                ...editedRow,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="address">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            value={editedRow.address || ""}
                            onChange={(e) =>
                              setEditedRow({
                                ...editedRow,
                                address: e.target.value,
                              })
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
            <div className="button-container">
              <button
                className="btn btn-primary m-1"
                disabled={PageIndex === 1}
                onClick={() => setPageIndex(1)}
              >
                First page
              </button>
              <button
                className="btn btn-primary m-1"
                disabled={PageIndex === 1}
                onClick={() => setPageIndex((prev) => prev - 1)}
              >
                Previous page
              </button>
              <button
                className="btn btn-primary m-1"
                disabled={PageIndex === totalPage} // You need to define `totalPage`
                onClick={() => setPageIndex((prev) => prev + 1)}
              >
                Next page
              </button>
              <button
                className="btn btn-primary m-1"
                disabled={PageIndex === totalPage}
                onClick={() => setPageIndex(totalPage)}
              >
                Last page
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Query;
