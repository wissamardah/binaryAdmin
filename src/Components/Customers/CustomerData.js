import React, { useState, useEffect } from "react";
import { Typography, Container, Box, Dialog, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import MaterialReactTable from "material-react-table";
import axios from "axios";
import toastr from "toastr";

const CustomerData  = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
      axios
      .get("https://api.binary.yachts/api/getCustomers", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        setData(result.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
    }
  useEffect(() => {
  

    fetchData()
  
  }, []);

  const columns = [
    {
      id: "id",
      header: "رقم ",
      accessorKey: "id",
      Cell: ({ row }) => (
       
        <div className="text-end me-3 ">
      
          {row.original.id}
        
        </div>
      ),
    },
    {
      id: "name",
      header: "الاسم",
      accessorKey: "name",
      Cell: ({ row }) => (
        <div className="text-end ">
       
          {row.original.name}
    
        </div>
      ),
    },
    {
      id: "mobile",
      header: "رقم الهاتف",
      accessorKey: "mobile",
      Cell: ({ row }) => (
        <div className="text-end ">
                      <Link target="_blank" className="text-decoration-none" to={"https://admin.binary.yachts/whatsapp?mobile="+row.original.mobile}>

          {row.original.mobile}
     </Link>
        </div>
      ),
    },
    {
      id: "address",
      header: "عنوان الزبون",
      accessorKey: "address",
      Cell: ({ row }) => (
        <div className="text-end  ">
        {row.original.address}
        </div>
      ),
    },
    {
      id: "gender",
      header: <div className="k">  الجنس </div>,
      accessorKey: "gender",
      Cell: ({ row }) => (
        <div className="text-end ">
      
          {row.original.gender}
      
        </div>
      ),
    },{
        id: "email",
        header: <div className="me-5">  البريد الالكتروني </div>,
        accessorKey: "email",
        Cell: ({ row }) => (
          <div className="text-end  ms-5 ">
        
            {row.original.email}
        
          </div>
        ),
      },
      {
        id: "dob",
        header: <div className="k"> تاريخ الميلاد </div>,
        accessorKey: "dob",
        Cell: ({ row }) => (
          <div className="text-end ">
        
            {row.original.dob}
        
          </div>
        ),
      },
      {
        id: "isSale",
        header: <div className="k">زبون حقيقي؟</div>,
        accessorKey: "isSale",
        Cell: ({ row }) => {
       
        
          return (
            <div className="text-end fw-bolder">
              <input
                type="checkbox"
                checked={row.original.isSale}
               
                disabled
              />
             
            </div>
          );},
      },
  ];

  

  return (
    <Container className="text-center mt-5">
      <Box py={2} bgcolor="primary.main" color="primary.contrastText" textAlign="center">
        <Typography variant="h4"  gutterBottom>
          قائمة الزبائن
        </Typography>
      </Box>
      <Paper className="table-container ">
        <div   >
          <MaterialReactTable columns={columns} data={data} enableColumnFilterModes />
        </div>
      </Paper>
    </Container>
  );
};

export default CustomerData ;
