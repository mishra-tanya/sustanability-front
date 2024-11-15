import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/axios';
import { fetchAuthenticatedUser } from '../../../services/apiService';
import TestQuestion from './TestQuestions';
import QNavigation from './QNavigations';
import LoadingSpinner from '../../common/LoadingSpinner';
import { Box, Button, Card, Typography } from '@mui/material';
import Navbar from '../../Navbar';
import Footer from '../../Footer';

interface Question {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correctAnswer: string;
}

const QTest: React.FC = () => {
  const { className, goal, test } = useParams<{ className: string; goal: string; test: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

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
    setAnswers((prev) => ({
      ...prev,
      [questions[currentIndex].id]: answer,
    }));
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

    try {
      await api.post('/submitAnswers', userData);
      alert('Answers submitted successfully!');
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner size={44}/>;
  }

  return (
    <div>
        <Navbar/>
     <Box sx={{p:4}}>
       <Typography sx={{textAlign:"center",mb:3}} variant="h4"> Class {className} Goal {goal}</Typography>
        <Card sx={{p:4}}>
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
        selectedAnswer={answers[questions[currentIndex].id] || ''}
        onAnswerChange={handleAnswerChange}
      />
      <QNavigation
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        onPrevious={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
        onNext={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
        onJumpTo={setCurrentIndex}
      />
       </Card>
     </Box>
     <Footer/>
    </div>
  );
};

export default QTest;
