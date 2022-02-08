import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

//1.colums: Table header
//2.rows: Table body

const cols = [
  { field: "name", headerName: "name", width: 200 },
  { field: "email", headerName: "email", width: 200 },
  { field: "phone", headerName: "phone", width: 200 },
  { field: "company", headerName: "company", width: 200 },
  { field: "website", headerName: "website", width: 200 },
];

const DataGridMUI = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  //trim the data and grab what we want

  const rowData = users?.map(user => {
    return {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      id: user?.id,
      website: user?.website,
      phone: user?.phone,
      company: user?.company?.name,
    };
  });

  console.log(rowData);
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        checkboxSelection
        autoHeight
        pageSize={5}
        rows={rowData}
        columns={cols}
        arial-label="student table"
      />
    </div>
  );
};

export default DataGridMUI;
