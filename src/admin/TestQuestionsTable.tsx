import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";
import LoadingSpinner from "../components/common/LoadingSpinner";
import api from "../services/axios";

interface TestQuestion {
  id: number;
  class_id: number;
  goal_name: string;
  test_name: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  reason: string;
  correct_answer: string;
}

const TestQuestionsTable: React.FC = () => {
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const fetchTestQuestions = async (page: number) => {
    try {
      const response = await api.get(`/getTestQuestions?page=${page + 1}`);
      setTestQuestions(response.data.testQuestions);  
      setTotalQuestions(response.data.testQuestions.total);  
      console.log(response);
    } catch (error) {
      console.error("Error fetching test questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestQuestions(page );
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
        Test Questions
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Class ID</TableCell>
              <TableCell>Goal Name</TableCell>
              <TableCell>Test Name</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Option A</TableCell>
              <TableCell>Option B</TableCell>
              <TableCell>Option C</TableCell>
              <TableCell>Option D</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Correct Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testQuestions.map((question) => (
              <TableRow key={question.id}>
                <TableCell>{question.id}</TableCell>
                <TableCell>{question.class_id}</TableCell>
                <TableCell>{question.goal_name}</TableCell>
                <TableCell>{question.test_name}</TableCell>
                <TableCell>{question.question}</TableCell>
                <TableCell>{question.option_a}</TableCell>
                <TableCell>{question.option_b}</TableCell>
                <TableCell>{question.option_c}</TableCell>
                <TableCell>{question.option_d}</TableCell>
                <TableCell>{question.reason}</TableCell>
                <TableCell>{question.correct_answer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalQuestions}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[]}  
      />
    </Box>
  );
};

export default TestQuestionsTable;
