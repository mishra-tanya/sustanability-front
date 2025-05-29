import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/axios';
import Navbar from '../../Navbar';
import Footer from '../../Footer';
import { fetchAuthenticatedUser } from '../../../services/apiService';
import LoadingSpinner from '../../common/LoadingSpinner';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { Gauge } from '@mui/x-charts';
interface Options {
  a: string;
  b: string;
  c: string;
  d: string;
}

interface DetailedResult {
  question_id: number;
  question: string;
  options: Options;
  correct_answer: string;
  user_answer: string;
  is_correct: boolean;
  reason: string;
}

interface ResultData {
  score: number;
  total_questions: number;
  detailed_results: DetailedResult[];
  testN: { test_name: string };
  goalN: { goal_name: string, description:string };
}


const Results: React.FC = () => {
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { classId, goalId, testId } = useParams<{ classId: string; goalId: string; testId: string }>();
  const [userId, setUserId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [goalName, setGoalName] = useState<string | null>(null);
  const [testName, setTestName] = useState<string | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const user = await fetchAuthenticatedUser();
        setUserId(user.id);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (!userId) return;
      try {
        const response = await api.get<ResultData>(`results/${userId}/${classId}/${goalId}/${testId}`);
        setResultData(response.data);
        // console.log(response.data.testN.test_name);
        setTestName(response.data.testN.test_name);
        setGoalName(response.data.goalN.description);
        // console.log(response)
      } catch (error) {
        console.error('No results found:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [userId, classId, goalId, testId]);

  const handleNext = () => {
    if (currentQuestionIndex < (resultData?.total_questions || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) return <LoadingSpinner size={44} />;

  if (!resultData || resultData.total_questions === 0) {
    return (
      <div>
        <Navbar />
        <h1>Test Results</h1>
        <Typography variant="h6">No results found for this test.</Typography>
        <Footer />
      </div>
    );
  }

  const currentResult = resultData?.detailed_results[currentQuestionIndex];

  // console.log(resultData)
  return (
    <div>
      <Navbar />

      <Box sx={{ textAlign: 'center', p: 5 }}>
        <Typography variant="h5"><b>Test Results - 
          Grade: {classId} <br />
          Goal: {goalName} <br />
           {testName}</b></Typography>

      </Box>
      {resultData && (
        <div>
          {/* <Gauge width={100} height={100} value= {/> %}  /> */}

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card sx={{ p: 6, pl: 6, width: "50%" }}>
              <CardContent >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Gauge width={180} height={180} value={resultData.score * 10} valueMin={0} valueMax={100} />

                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    <b>Total Percentage : </b> {resultData.score * 10}% <br />
                    <b> Correct Answers : </b>  {resultData.score} <br />
                    <b> Incorrect Answers : </b>  {10 - resultData.score} <br />

                    <b>Total Questions :</b> 10

                  </Typography></Box>

              </CardContent>
            </Card>
          </div>

          {/* <p>Score: {resultData.score} / {resultData.total_questions}</p> */}
          <Box sx={{ padding: { xs: 2, md: 10 } }}>

            {currentResult && (
              <div style={{ padding: '10px', marginBottom: '10px' }}>
                <h2>Detailed Results:</h2>

                <Typography variant="h6">
                  <Box sx={{
                    border: '1px solid lightgrey',
                    padding: 2,
                    borderRadius: 1,
                    marginBottom: 1,
                    background:'#f9f9f9'
                  }}>
                    <strong>Question {currentQuestionIndex + 1}: <br /></strong> {currentResult.question}
                  </Box>
                </Typography>

                <Box sx={{ marginBottom: 2 }}>
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
  {Object.entries(currentResult.options).map(([key, value]) => {
    const upperKey = key.toUpperCase();
    const userAnswer = currentResult.user_answer;
    const correctAnswer = currentResult.correct_answer;
    const isUserAnswer = upperKey === userAnswer;
    const isCorrectAnswer = upperKey === correctAnswer;
    const isEmptyAnswer = userAnswer === "";

    return (
      <li key={key}>
        <Box
          sx={{
            backgroundColor: isUserAnswer
              ? isCorrectAnswer
                ? '#dff0d8' // green for correct user answer
                : '#ffe4e4' // red for wrong user answer
              : !isEmptyAnswer && isCorrectAnswer
                ? '#dff0d8' // highlight correct answer only if user answered
                : 'white',
            color: 'black',
            border: '1px solid lightgrey',
            padding: 2,
            borderRadius: 1,
            marginBottom: 1,
            position: 'relative',
          }}
        >
          <strong>{upperKey}:</strong> {value}
          
          {/* Show tags */}
          {!isEmptyAnswer && (
            <>
              {isUserAnswer && !isCorrectAnswer && (
                <span style={{ 
                  color: 'red', 
                  fontSize: '0.75rem', 
                  position: 'absolute', 
                  right: 10, 
                  top: '50%', 
                  transform: 'translateY(-50%)' 
                }}>
                  Your Answer
                </span>
              )}
              {isCorrectAnswer && (
                <span style={{ 
                  color: 'green', 
                  fontSize: '0.75rem', 
                  position: 'absolute', 
                  right: isUserAnswer && !isCorrectAnswer ? 90 : 10, 
                  top: '50%', 
                  transform: 'translateY(-50%)' 
                }}>
                  Correct Answer
                </span>
              )}
            </>
          )}
        </Box>
      </li>
    );
  })}
</ul>


                </Box>



                <Grid container spacing={1}>
                  <Grid item xs={12} md={3}>
                    <Box sx={{
                      backgroundColor: currentResult.is_correct ? 'green' : 'red',
                      color: 'white',
                      padding: 1,
                      paddingInline: 2,
                      borderRadius: 1,
                    }}>
                      <strong>Your Answer:</strong>  {currentResult.user_answer}
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Box sx={{
                      backgroundColor: 'green',
                      color: 'white',
                      padding: 1,
                      paddingInline: 2,
                      borderRadius: 1,
                    }}>
                      <strong>Correct Answer:</strong> {currentResult.correct_answer}
                    </Box>
                  </Grid>
                </Grid>
                <br />
                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="body1"><strong>Explanation:</strong></Typography>
                  <Typography variant="body2">{currentResult.reason}</Typography>
                </Box>
              </div>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={currentQuestionIndex === (resultData.total_questions - 1)}
              >
                Next
              </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3, flexWrap: 'wrap' }}>
              {resultData.detailed_results.map((result, index) => (
                <Button
                  key={result.question_id}
                  variant="outlined"
                  onClick={() => setCurrentQuestionIndex(index)}
                  sx={{
                    backgroundColor: currentQuestionIndex === index ? '#1976d2' : 'transparent',
                    color: currentQuestionIndex === index ? 'white' : 'black',
                    border: result.user_answer
                      ? result.user_answer === result.correct_answer
                        ? '4px solid green'
                        : '4px solid red'
                      : '1px solid gray',
                    margin: '2px',
                    minWidth: '40px',
                    maxWidth: '40px',
                    fontSize: { xs: '10px', sm: '12px', md: '14px' },
                  }}
                >
                  {index + 1}
                </Button>
              ))}
            </Box>

          </Box>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Results;
