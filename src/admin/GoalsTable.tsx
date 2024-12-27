import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";
import LoadingSpinner from "../components/common/LoadingSpinner";
import api from "../services/axios";

interface Goal {
  id: number;
  goal_name: string;
  description: string;
  created_at: string;
}

const GoalsTable: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalGoals, setTotalGoals] = useState(0);

  const fetchGoals = async (page: number, rowsPerPage: number) => {
    try {
      const response = await api.get(`getGoals?page=${page + 1}&per_page=${rowsPerPage}`);
      setGoals(response.data.goal.data);  
      // console.log(response.data.goal.data);
      setTotalGoals(response.data.goal.total);  
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (_: unknown, newPage: number) => {
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
        Goals
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal) => (
              <TableRow key={goal.id}>
                <TableCell>{goal.id}</TableCell>
                <TableCell>{goal.goal_name}</TableCell>
                <TableCell>{goal.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalGoals}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[]} 
      />
    </Box>
  );
};

export default GoalsTable;
