import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";
import LoadingSpinner from "../components/common/LoadingSpinner";
import api from "../services/axios";

interface Test {
  id: number;
  test_name: string;
  description: string;
  created_at: string;
  goal:Goal;
}
interface Goal{
    goal_name:string;
}

const TestsData: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalTests, setTotalTests] = useState(0);

  const fetchTests = async (page: number) => {
    try {
      const response = await api.get(`getTests?page=${page + 1}`);
      setTests(response.data.test.data);  
      // console.log(response.data.goal.data);
      setTotalTests(response.data.test.total);  
      console.log(response.data.test);
    } catch (error) {
      console.error("Error fetching test:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests(page);
  }, [page]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  
  };

  if (loading) {
    return <LoadingSpinner size={33} />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Tests
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Goal</TableCell>
              <TableCell>Test Name</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.id}</TableCell>
                <TableCell>{test.goal.goal_name}</TableCell>
                <TableCell>{test.test_name}</TableCell>
                <TableCell>{test.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalTests}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[]} 
      />
    </Box>
  );
};

export default TestsData;
