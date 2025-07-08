import { useState, useEffect } from "react";
import { fetchOverallDashData } from "../../../services/apiService";
import LoadingSpinner from "../../common/LoadingSpinner";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Gauge } from "@mui/x-charts";
import Footer from "../../Footer";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircularGauge from "../../common/GaugeChart";

type ClassResult = {
  id: number;
  user_id: number;
  score: number;
  goal_id: string;
  class_id: string;
  test_id: string;
  answers: string;
  created_at: string;
  updated_at: string;
};

type Data = {
  user_id: number;
  total_score: number;
  results: ClassResult[];
};

const Overall = () => {
  const [data, setData] = useState<Data | null>(null);
  // const [filterText, setFilterText] = useState("");  
  const [filteredData, setFilteredData] = useState<ClassResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchOverallDashData();
      //   console.log("Fetched Data:", res);
      setData(res);
      setFilteredData(res.results);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     const filtered = data.results.filter((row) =>
  //       Object.values(row).some((value) => {
  //       // console.log(row);

  //         if (typeof value === "string") {
  //           return value.toLowerCase().includes(filterText.toLowerCase());
  //         } else if (typeof value === "number") {
  //           return value.toString().includes(filterText);
  //         }
  //         return false;
  //       })
  //     );
  //     setFilteredData(filtered);
  //   }
  // }, [filterText, data]);


  if (!data) {
    return <LoadingSpinner size={33} />;
  }

  const handleButtonClick = (class_id: string, goal_id: string, test_id: string) => {
    navigate(`/results/${class_id}/${goal_id}/${test_id}`);
  };

  const totalScore = data.total_score;
  const uniqueTestsGiven = new Set(data.results.map((result) => result.test_id)).size;
  const uniqueGoalsCompleted = new Set(data.results.map((result) => result.goal_id)).size;
  const columns = [
    {
      name: "S.No",
      cell: (_row: ClassResult, index: number) => <span>{index + 1}</span>,
      selector: (row: ClassResult) => row.id,
      //   ignoreRowClick: true,
      //   allowOverflow: true,
      button: true,
      sortable: true,
    },
    {
      name: "Class No",
      selector: (row: ClassResult) => row.class_id,
      sortable: true,
    },
    {
      name: "Goal No",
      selector: (row: ClassResult) => row.goal_id,
      sortable: true,
    },
    {
      name: "Test No",
      selector: (row: ClassResult) => row.test_id,
      sortable: true,
    },
    {
      name: "Score",
      selector: (row: ClassResult) => row.score,
      sortable: true,
    },
    {
      name: "View Results",
      cell: (row: ClassResult) => (
        <Button
          color="primary"
          sx={{ m: 1 }}
          onClick={() => handleButtonClick(row.class_id, row.goal_id, row.test_id)}
        >
          <VisibilityIcon />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const percentage = (totalScore ?? 0) / 510 * 100;

  return (
    <div>
      <Stack
        direction={{ xs: "column", md: "row" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          flexWrap: "wrap",
          gap: { xs: 2, md: 0 },
          width: "100%",
        }}
      >
        <Box
          sx={{
            flex: "1 1 100%",
            maxWidth: { xs: "100%", md: "33%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid lightgrey",
            p: 3,
          }}
        >
                    <Box sx={{padding:"10px"}}><CircularGauge percentage={percentage??0} size={130} /></Box>
          
          <Typography sx={{ textAlign: "center", marginTop: 1 }}>
            Overall Percentage
          </Typography>
        </Box>

        <Box
          sx={{
            flex: "1 1 100%",
            maxWidth: { xs: "100%", md: "33%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid lightgrey",
            p: 3,
          }}
        >
          <Gauge width={150} height={150} value={uniqueTestsGiven} valueMax={510} />
          <Typography sx={{ textAlign: "center", marginTop: 1 }}>
            Total Tests Given
          </Typography>
        </Box>

        <Box
          sx={{
            flex: "1 1 100%",
            maxWidth: { xs: "100%", md: "33%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid lightgrey",
            p: 3,
          }}
        >
          <Gauge width={150} height={150} value={uniqueGoalsCompleted} valueMax={51} />
          <Typography sx={{ textAlign: "center", marginTop: 1 }}>
            Total Goals Attempted
          </Typography>
        </Box>
      </Stack>

      <Typography variant="h4" align="center" sx={{ mt: 5, bgcolor: "#eeeeee", p: 1 }}>
        Overall Results
      </Typography>
      {/* <Box sx={{ textAlign: "right", mt: 3 }}>
        <TextField
          label="Search"
          variant="outlined"
           size="small"
           
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          sx={{ width: "30%", mb: 3 }}
        />
      </Box> */}
      <br /><br />
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
        striped
        noHeader
      />

      <Footer />
    </div>
  );
};

export default Overall;
