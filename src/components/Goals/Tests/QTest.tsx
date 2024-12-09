import React, { useEffect, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import api from '../../../services/axios';
import { fetchAuthenticatedUser } from '../../../services/apiService';
import TestQuestion from './TestQuestions';
import QNavigation from './QNavigations';
import LoadingSpinner from '../../common/LoadingSpinner';
import { Box, Button, Typography } from '@mui/material';
import Navbar from '../../Navbar';
import Footer from '../../Footer';

interface Question {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
}
interface Answer {
  question_id: number;
  correct_answer: string;
  user_answer: string;
}
const QTest: React.FC = () => {
  const { className, goal, test } = useParams<{ className: string; goal: string; test: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const getUserId = async () => {
      try {
        const user = await fetchAuthenticatedUser();
        setUserId(user.id);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await api.get(`/class/${className}/goal/${goal}/${test}`);
        // console.log(response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserId();
    fetchQuestions();
  }, [className, goal, test]);

  const handleAnswerChange = (answer: string) => {
    const question = questions[currentIndex];
    if (!question) return;
  
    const updatedAnswers = [...answers];
    const questionId = question.id;
  
    const existingAnswerIndex = updatedAnswers.findIndex((ans) => ans.question_id === questionId);
    if (existingAnswerIndex !== -1) {
      updatedAnswers[existingAnswerIndex].user_answer = answer;
    } else {
      updatedAnswers.push({
        question_id: questionId,
        correct_answer: question.correct_answer || '', 
        user_answer: answer,
      });
    }
  
    setAnswers(updatedAnswers);
  };
  

  const handleSubmit = async () => {
    if (!userId) {
      console.error('User ID not available');
      return;
    }

    const userData = {
      userId,
      testId: test,
      goalId: goal,
      classId: className,
      answers,
    };
    // console.log('Payload:', userData);

    try {
      await api.post('/results', userData);
      navigate(`/results/${className}/${goal}/${test}`); 
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
    finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size={44}/>;
  }

  const answeredQuestionIds = answers.map((answer) => answer.question_id);

  return (
    <div>
        <Navbar/>
     {/* <Box sx={{p:4}}> */}
      <Box sx={{bgcolor:"#0f2b3c",p:1,textAlign:"center"}}>
      <Typography sx={{color:"white"}} variant="caption"><b> Class :</b> {className} </Typography>
      <Typography sx={{textAlign:"center",mb:3,color:"white"}} variant="caption"> <b>Goal :</b> {goal}  <b>Test : </b> {test}</Typography>

      </Box>
        <Box sx={{p:4}}>
        <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: 3 }}>
    <Button onClick={handleSubmit} variant="contained" color="primary">
      Submit Test
    </Button>
  </Box>
        <TestQuestion
        i={currentIndex}
        question={questions[currentIndex].question}
        optionA={questions[currentIndex].option_a}
        optionB={questions[currentIndex].option_b}
        optionC={questions[currentIndex].option_c}
        optionD={questions[currentIndex].option_d}
        selectedAnswer={
          answers.find((ans) => ans.question_id === questions[currentIndex].id)?.user_answer || ''
        }
        onAnswerChange={handleAnswerChange}
      />
      <QNavigation
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        onPrevious={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
        onNext={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
        onJumpTo={setCurrentIndex}
        answeredQuestions={answeredQuestionIds}
      />
       </Box>
     {/* </Box> */}
     <Footer/>
    </div>
  );
};

export default QTest;
