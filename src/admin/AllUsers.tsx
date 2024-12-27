import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  Box,
  Button,
  Modal,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from "@mui/material";
import api from "../services/axios";
import { RemoveRedEye } from "@mui/icons-material";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SearchData from "./Search";

interface User {
  id: number;
  name: string;
  email: string;
  class: string;
  address: string;
  country: string;
  created_at: string;
}

interface Result {
  id: number;
  test_name: string;
  class_id: string;
  score: number;
  created_at: string;
  test: Test;
  goal: Goal;
}

interface Goal {
  goal_name: string;
}

interface Test {
  test_name: string;
}

interface Certificate {
  id: number;
  certificate_id: string;
  created_at: string;
  user: {
    name: string;
    email: string;
  };
}

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Result[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [openResults, setOpenResults] = useState(false);
  const [openCertifications, setOpenCertifications] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/getUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setUsers(response.data.user);
      setFilteredData(response.data.user)
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (filtered: User[]) => {
    setFilteredData(filtered);
  };

  const handleViewResults = async (userId: number) => {
    try {
      const response = await api.get(`getResults/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setResults(response.data.result);
      setSelectedUser(userId.toString());
      setOpenResults(true);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const handleViewCertifications = async (userId: number) => {
    try {
      const response = await api.get(`getCertificateUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setCertificates(response.data.userCertificates);
      setSelectedUser(userId.toString());
      setOpenCertifications(true);
    } catch (error) {
      console.error("Error fetching certifications:", error);
    }
  };

  const columns: TableColumn<User>[] = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true, wrap: true,   },
    { name: "Class", selector: (row) => row.class, sortable: true ,wrap:true},
    { name: "Email", selector: (row) => row.email, sortable: true,
      wrap: true,  
      cell: (row: User) => (
        <Tooltip title={row.email} arrow>
          <span>{row.email}</span>
        </Tooltip>
      ),
     },
    { name: "Address", selector: (row) => row.address, sortable: true, wrap: true,   },
    { name: "Country", selector: (row) => row.country, sortable: true, wrap: true,   },
    {
      name: "Created At",
      selector: (row) => new Date(row.created_at).toLocaleDateString(),
      sortable: true,
      wrap:true
    },
    {
      name: "View Results",
      cell: (row) => (
        <Button onClick={() => handleViewResults(row.id)}>
          <RemoveRedEye />
        </Button>
      ),
    },
    {
      name: "View Certifications",
      cell: (row) => (
        <Button onClick={() => handleViewCertifications(row.id)}>
          <RemoveRedEye />
        </Button>
      ),
    },
  ];

  if(loading){
    return <>
    <LoadingSpinner size={33}/>
    </>
  }
  return (
    <div>
      <SearchData
        data={users}
        searchKeys={["name", "class", "email", "address", "country","created_at"]}
        onSearch={handleSearch}
      />
      <DataTable
        title="Users Table"
        columns={columns}
        data={filteredData}
        progressPending={loading}
        pagination
        paginationPerPage={10}
        highlightOnHover
        responsive
        persistTableHead
      />
      {/* Results Modal */}
      <Modal open={openResults} onClose={() => setOpenResults(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxHeight: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" align="center">
            <b>All Results for User ID: {selectedUser}</b>
          </Typography>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Goal Name</TableCell>
                  <TableCell>Test Name</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.id}</TableCell>
                    <TableCell>{result.class_id}</TableCell>
                    <TableCell>{result.goal.goal_name}</TableCell>
                    <TableCell>{result.test.test_name}</TableCell>
                    <TableCell>{result.score}</TableCell>
                    <TableCell>
                      {new Date(result.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>

      {/* Certifications Modal */}
      <Modal open={openCertifications} onClose={() => setOpenCertifications(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxHeight: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" align="center">
            <b>All Certifications for User ID: {selectedUser}</b>
          </Typography>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Certificate Id</TableCell>
                  <TableCell>Issued Date</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>User Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certificates.map((cert,index) => (
                  <TableRow key={cert.id}>
                    <TableCell>{index}</TableCell>
                    <TableCell>{cert.certificate_id}</TableCell>
                    <TableCell>
                      {new Date(cert.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{cert.user.name}</TableCell>
                    <TableCell>{cert.user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default AllUsers;
