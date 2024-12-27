import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Box, Tooltip, Typography } from "@mui/material";
import api from "../services/axios";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SearchData from "./Search";

interface User {
  name: string;
  email: string;
}

interface CertificateData {
  id:number;
  certificate_content: string;
  certificate_id: string;
  certificate_type: string;
  created_at: string;
  user_id: number;
  user: User;
}

const Certifications: React.FC = () => {
  const [data, setData] = useState<CertificateData[]>([]);
  const [filteredData, setFilteredData] = useState<CertificateData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/getAllCertificate", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setData(response.data.certificates);
        setFilteredData(response.data.certificates)
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleSearch = (filtered: CertificateData[]) => {
    setFilteredData(filtered);
  };

  if (loading) {
    return <><LoadingSpinner size={33} /></>;
  }

  if (!data.length) {
    return <Typography>Error loading certification data.</Typography>;
  }

  const columns = [
    {
        name: " ID",
        selector: (row: CertificateData) => row.id,
        sortable: true,
      },
    {
      name: "Certificate ID",
      selector: (row: CertificateData) => row.certificate_id,
      sortable: true,
        wrap: true,  
            cell: (row: CertificateData) => (
              <Tooltip title={row.certificate_id} arrow>
                <span>{row.certificate_id}</span>
              </Tooltip>
            ),
    },
    {
      name: "Certificate Type",
      selector: (row: CertificateData) => row.certificate_type,
      sortable: true,
      wrap:true
    },
    {
      name: "User Name",
      selector: (row: CertificateData) => row.user.name,
      sortable: true,
      wrap:true
    },
    {
      name: "User Email",
      selector: (row: CertificateData) => row.user.email,
      sortable: true,
      wrap: true,  
      cell: (row: CertificateData) => (
        <Tooltip title={row.user.email} arrow>
          <span>{row.user.email}</span>
        </Tooltip>
      ),
    },
    {
      name: "Certification Date",
      selector: (row: CertificateData) => new Date(row.created_at).toLocaleDateString(),
      sortable: true,
      wrap:true
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
       <SearchData
        data={data}
        searchKeys={["certificate_id", "certificate_type", "user.email", "user.name", "created_at"]}
        onSearch={handleSearch}
      />
      <DataTable
        title="Certifications"
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

export default Certifications;
