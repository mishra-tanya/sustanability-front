import { useState, useEffect } from "react";
import { fetchOverallData } from "../../../services/apiService";
import LoadingSpinner from "../../common/LoadingSpinner";
import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Gauge } from "@mui/x-charts";
import Footer from "../../Footer";
import { useNavigate } from "react-router-dom";

type ClassResult = {
  total_score: number;
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
  class_results: Record<string, ClassResult>;
};
type DashProps = {
  classId: string;  
};

const Dash = ({ classId }: DashProps) => {
  const [data, setData] = useState<Data | null>(null);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await fetchOverallData();
      // console.log("Fetched Data:", apiResponse);
      setData(apiResponse);
    };
    fetchData();
  }, []);

  if (!data ) {
    return <>
    <LoadingSpinner size={33}/>
    </>;
  }

  const handleButtonClick = (class_id:string, goal_id: string, test_id: string) => {
    navigate(`/results/${class_id}/${goal_id}/${test_id}`);
  };
  // console.log("ergewg"+data.class_results );
  const classResults = data.class_results[classId];

  const uniqueTestsGiven = new Set(classResults.results.map((result) => result.test_id)).size;
  
  const uniqueGoalsCompleted = new Set(classResults.results.map((result) => result.goal_id)).size;

// console.log(uniqueGoalsCompleted);
  if (!classResults) {
    return <p>No results available for class {classId}</p>;
  }

  const res=classResults.total_score;
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
            alignItems: 'center' ,
            border:'1px solid lightgrey',
            p:3
          }}
        >
          <Gauge width={150} height={150} value={res?? 0} />
          <Typography sx={{ textAlign: 'center', marginTop: 1 }}>Overall Percentage</Typography>
        </Box>

        <Box 
          sx={{ 
            flex: '1 1 100%', 
            maxWidth: { xs: '100%', md: '33%' }, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center' ,
            border:'1px solid lightgrey',
            p:3
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
            border:'1px solid lightgrey',
            p:3
          }}
        >
          <Gauge width={150} height={150} value={uniqueGoalsCompleted} valueMax={17} />
          <Typography sx={{ textAlign: 'center', marginTop: 1 }}>Total Goals Completed</Typography>
        </Box>
        </Stack>
      <div>
        <Typography variant="h4" align="center" sx={{mt:5}}> Results Table for Class {classId}</Typography>
        <ul>
        {classResults.results.length > 0 ? (
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
            {classResults.results.map((result, index) => (
              <TableRow key={result.id}>
                <TableCell>{index + 1}</TableCell> 
                <TableCell>{result.class_id}</TableCell> 
                <TableCell>{result.goal_id}</TableCell> 
                <TableCell>{result.test_id}</TableCell> 
                <TableCell>{result.score}</TableCell> 
                <TableCell>
        <button onClick={() => handleButtonClick(result.class_id,result.goal_id, result.test_id)}>
                    View Results
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No results available for this class.</p>
      )}
       
        </ul>
      </div>
      <Footer/>
    </div>
  );
};

export default Dash;