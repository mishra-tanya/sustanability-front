import { useState, useEffect } from "react";
import { fetchOverallData } from "../../../services/apiService";
import LoadingSpinner from "../../common/LoadingSpinner";
import { Box, Grid, Typography, TextField, Button, InputAdornment } from "@mui/material";
import { Gauge } from "@mui/x-charts";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Search, Visibility } from "@mui/icons-material";
import CircularGauge from "../../common/GaugeChart";

type ClassResult = {
  total_score: number;
  results: Array<{
    id: number;
    user_id: number;
    score: number;
    goal_id: string;
    class_id: string;
    goal_name:string;
    test_name:string;
    test_id: string;
    answers: string;
    created_at: string;
    updated_at: string;
  }>;
};
type ResultRow = ClassResult["results"][number];

type Data = {
  user_id: number;
  class_results: Record<string, ClassResult>;
};

type DashProps = {
  classId: string;
};

const Dash = ({ classId }: DashProps) => {
  const [data, setData] = useState<Data | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<ClassResult["results"]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await fetchOverallData();
      // console.log(apiResponse);
      setData(apiResponse);
    };
    fetchData();
  }, []);

  const classResults = data?.class_results[classId];

  useEffect(() => {
    if (!classResults) {
      setFilteredResults([]);
      return;
    }

    const filtered = classResults.results.filter((result) =>
      [result.class_id, result.goal_id, result.test_id, result.goal_name, result.test_name]
        .some((field) => field && typeof field === 'string' && field.toLowerCase().includes(searchQuery.toLowerCase())) 
    );
    setFilteredResults(filtered);
  }, [searchQuery, classResults]);

  console.log(classResults)
  if (!data) {
    return <LoadingSpinner size={33} />;
  }

  if (!classResults) {
    return <p>No results available for class {classId}</p>;
  }

  const res = classResults.total_score;
  const uniqueTestsGiven = new Set(classResults.results.map((result) => result.test_id)).size;
  const uniqueGoalsCompleted = new Set(classResults.results.map((result) => result.goal_id)).size;
  const handleButtonClick = (class_id: string, goal_id: string, test_id: string) => {
    navigate(`/results/${class_id}/${goal_id}/${test_id}`);
  };

  const columns : TableColumn<ResultRow>[] = [
    {
      name: "S.No",
      cell: (_, index) => <span>{index !== undefined ? index + 1 : "-"}</span>, 
      sortable: false,

    },
    {
      name: "Grade",
      selector: (row: any) => row.class_id,
      sortable: true,
    },
    {
      name: "Goal Name",
      selector: (row: any) => row.goal_name,
      sortable: true,
      wrap:true,
    },
    {
      name: "Test Name",
      selector: (row: any) => row.test_name,
      sortable: true,
      wrap:true,

    },
    {
      name: "Score",
      selector: (row: any) => row.score,
      sortable: true,
      wrap:true,

    },
    {
      name: "View Results",
      cell: (row: any) => (
        <Button
       
          onClick={() => handleButtonClick(row.class_id, row.goal_id, row.test_id)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "blue" }}
        >
          <Visibility   color="primary" />
        </Button>
        
      ),
      sortable: false,
    },
  ];
  const percentage = (res ?? 0) / 1700 * 100;

  return (
    <div>
      <Grid container spacing={0} justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            border: "1px solid lightgrey",
          }}
        >
          <Box sx={{padding:"10px"}}><CircularGauge percentage={percentage??0} size={130} /></Box>

          <Typography sx={{ textAlign: "center", marginTop: 1 }}>Overall Percentage</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            border: "1px solid lightgrey",
          }}
        >
          <Gauge width={150} height={150} value={uniqueTestsGiven} valueMax={170} />
          <Typography sx={{ textAlign: "center", marginTop: 1 }}>Total Tests Given</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            border: "1px solid lightgrey",
          }}
        >
          <Gauge width={150} height={150} value={uniqueGoalsCompleted} valueMax={17} />
          <Typography sx={{ textAlign: "center", marginTop: 1 }}>Total Goals Attempted/Completed</Typography>
        </Grid>
      </Grid>

      <Typography variant="h5" align="center" sx={{ mt: 5, bgcolor: "#eeeeee", p: 1 }}>
        Results for Grade {classId}
      </Typography>

      <Box sx={{ mt: 4, mb: 2 }}>
        <TextField
        size="small"
          fullWidth
          label="Search by Class ID, Goal ID, or Test ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />

      </Box>

      <DataTable
        columns={columns}
        data={filteredResults}
        pagination
        responsive
        highlightOnHover
      />
    </div>
  );
};

export default Dash;
