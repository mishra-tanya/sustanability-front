import React, { ChangeEvent } from 'react';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface TestQuestionProps {
    i:number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  selectedAnswer: string;
  onAnswerChange: (answer: string) => void;
}

const TestQuestion: React.FC<TestQuestionProps> = ({ i,question, optionA, optionB, optionC, optionD, selectedAnswer, onAnswerChange }) => (
  <Box sx={{ marginBottom: 3 }}>
    <h3>Question {i+1}. {question}</h3>
    <FormControl component="fieldset">
      <RadioGroup
        value={selectedAnswer}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onAnswerChange(e.target.value)}
      >
        <FormControlLabel value="A" control={<Radio />} label={optionA} />
        <FormControlLabel value="B" control={<Radio />} label={optionB} />
        <FormControlLabel value="C" control={<Radio />} label={optionC} />
        <FormControlLabel value="D" control={<Radio />} label={optionD} />
      </RadioGroup>
    </FormControl>
  </Box>
);

export default TestQuestion;
