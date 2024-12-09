import { useState, useEffect } from "react";
import { fetchOverallDashData } from "../../../services/apiService";
import LoadingSpinner from "../../common/LoadingSpinner";
import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Gauge } from "@mui/x-charts";
import Footer from "../../Footer";
import { useNavigate } from "react-router-dom";

type ClassResult = {
  results: Array<{
    id: number;
    user_id: number;
    score: number;
    goal_id: string;
    class_id: string;
    test_id: string;
    answers: string;
    created_at: string;
    updated_at: string;
  }>;
};

type Data = {
  user_id: number;
  total_score: number;
  results: ClassResult[];
};

const Overall = () => {
  const [data, setData] = useState<Data | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchOverallDashData();
      console.log("Fetched Data:", res);
      setData(res);
    };
    fetchData();
  }, []);

  if (!data) {
    return <LoadingSpinner size={33} />;
  }

  const handleButtonClick = (class_id: string, goal_id: string, test_id: string) => {
    navigate(`/results/${class_id}/${goal_id}/${test_id}`);
  };

  const totalScore = data.total_score;
  const uniqueTestsGiven = new Set(data.results.map((result) => result.test_id)).size;
  const uniqueGoalsCompleted = new Set(data.results.map((result) => result.goal_id)).size;

  return (
    <div>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          flexWrap: 'wrap',
          gap: { xs: 2, md: 0 },
          width: '100%',
        }}
      >
        <Box
          sx={{
            flex: '1 1 100%',
            maxWidth: { xs: '100%', md: '33%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid lightgrey',
            p: 3
          }}
        >
          <Gauge width={150} height={150} value={totalScore ?? 0} />
          <Typography sx={{ textAlign: 'center', marginTop: 1 }}>Overall Percentage</Typography>
        </Box>

        <Box
          sx={{
            flex: '1 1 100%',
            maxWidth: { xs: '100%', md: '33%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid lightgrey',
            p: 3
          }}
        >
          <Gauge width={150} height={150} value={uniqueTestsGiven} valueMax={10} />
          <Typography sx={{ textAlign: 'center', marginTop: 1 }}>Total Tests Given</Typography>
        </Box>

        <Box
          sx={{
            flex: '1 1 100%',
            maxWidth: { xs: '100%', md: '33%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid lightgrey',
            p: 3
          }}
        >
          <Gauge width={150} height={150} value={uniqueGoalsCompleted} valueMax={17} />
          <Typography sx={{ textAlign: 'center', marginTop: 1 }}>Total Goals Completed</Typography>
        </Box>
      </Stack>

      <div>
        <Typography variant="h4" align="center" sx={{ mt: 5 }}>
          Results Table
        </Typography>

        {data.results.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Class No</TableCell>
                <TableCell>Goal No</TableCell>
                <TableCell>Test No</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.results.map((result, index) => (
                <TableRow key={result.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{result.class_id}</TableCell>
                  <TableCell>{result.goal_id}</TableCell>
                  <TableCell>{result.test_id}</TableCell>
                  <TableCell>{result.score}</TableCell>
                  <TableCell>
                    <button onClick={() => handleButtonClick(result.class_id, result.goal_id, result.test_id)}>
                      View Results
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="caption" align="center">No results available for this user.</Typography>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Overall;
