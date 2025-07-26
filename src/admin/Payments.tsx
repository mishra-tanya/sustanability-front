import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
} from "@mui/material";
import LoadingSpinner from "../components/common/LoadingSpinner";
import api from "../services/axios";


interface User{
    name:string;
    email:string;
    school:string;
}
interface Payment {
  id: number;
  user_id: number;
  amount: number;
  payment_id: string;
  status: string;
  created_at: string;
    payment_type:string;
    razorpay_order_id:string;
    razorpay_payment_id:string;
    razorpay_signature:string;
    user: User;
}

const PaymentsTable: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPayments, setTotalPayments] = useState(0);

  const fetchPayments = async (page: number, rowsPerPage: number) => {
    try {
      const response = await api.get(`/get-payments?page=${page + 1}&per_page=${rowsPerPage}`);
      setPayments(response.data.payments.data);
      setTotalPayments(response.data.payments.total);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(page, rowsPerPage);
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
        Payments
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell>S No.</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>User School</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Payment For</TableCell>
              <TableCell>Payment Order ID</TableCell>
              <TableCell>Payment ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment,index) => (
              <TableRow key={payment.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{payment.user.name}</TableCell>
                <TableCell>{payment.user.school}</TableCell>
                <TableCell>{payment.user.email}</TableCell>
                 <TableCell>
                  <Chip
                    label={payment.status}
                    color={payment.status === "completed" ? "success" : "error"}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{payment.payment_type}</TableCell>
                <TableCell>{payment.razorpay_order_id}</TableCell>
                <TableCell>{payment.razorpay_payment_id}</TableCell>
                <TableCell>₹{payment.amount}</TableCell>
               
                <TableCell>{new Date(payment.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalPayments}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[]}
      />
    </Box>
  );
};

export default PaymentsTable;
