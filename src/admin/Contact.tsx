import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Box, Tooltip, Typography } from "@mui/material";
import api from "../services/axios";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SearchData from "./Search";

interface Contact {
  id: number;
  name: string;
  contact_no: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const Contact: React.FC = () => {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<Contact[]>([]);
 

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await api.get("/contact", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setData(response.data.contact);
        setFilteredData(response.data.contact);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const handleSearch = (filtered: Contact[]) => {
    setFilteredData(filtered);
  };

  if (loading) {
    return <LoadingSpinner size={33} />;
  }

  if (!data.length) {
    return <Typography>Error loading contact data.</Typography>;
  }

  const columns = [
    {
      name: "ID",
      selector: (row: Contact) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: Contact) => row.name,
      sortable: true,
      wrap: true, 

    },
    {
      name: "Contact No",
      selector: (row: Contact) => row.contact_no,
      sortable: true,
       wrap: true,  
            cell: (row: Contact) => (
              <Tooltip title={row.contact_no} arrow>
                <span>{row.contact_no}</span>
              </Tooltip>
            ),

    },
    {
      name: "Email",
      selector: (row: Contact) => row.email,
      sortable: true,
      wrap: true,  
      cell: (row: Contact) => (
        <Tooltip title={row.email} arrow>
          <span>{row.email}</span>
        </Tooltip>
      ),

    },
    {
      name: "Subject",
      selector: (row: Contact) => row.subject,
      sortable: true,
      wrap: true, 

    },
    {
      name: "Message",
      selector: (row: Contact) => row.message,
      sortable: true,
      wrap: true, 
    },
    {
      name: "Created At",
      selector: (row: Contact) => new Date(row.created_at).toLocaleDateString(),
      sortable: true,
      wrap:true
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
         <SearchData
        data={data}
        searchKeys={["name", "contact_no", "email", "subject", "message"]}
        onSearch={handleSearch}
      />
      <DataTable
        title="Contact Data"
        columns={columns}
        progressPending={loading}
        pagination
        data={filteredData}
        paginationPerPage={10}
        highlightOnHover
        responsive
        persistTableHead
      />
    </Box>
  );
};

export default Contact;
