import React, { ChangeEvent } from 'react';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

interface TestQuestionProps {
  i: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  selectedAnswer: string;
  onAnswerChange: (answer: string) => void;
}

const TestQuestion: React.FC<TestQuestionProps> = ({
  i,
  question,
  optionA,
  optionB,
  optionC,
  optionD,
  selectedAnswer,
  onAnswerChange,
}) => (
  <Box sx={{ marginBottom: 3 }}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 2,
        marginBottom: 2,
        border: '1px solid #ccc',
        borderRadius: 1,
        backgroundColor: '#f9f9f9',
        boxSizing: 'border-box',
        mt: 4,
      }}
    >
      <Typography variant="h6">
        <b>Question {i + 1}.</b> &nbsp;
        {question}
      </Typography>
    </Box>

    <FormControl component="fieldset" sx={{ mt: 1, width: '100%' }}>
      <RadioGroup
        value={selectedAnswer}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onAnswerChange(e.target.value)}
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width:{md: '49%',xs:"100%"}, 
            padding: 2,
            marginBottom: 2,
            border: '1px solid #ccc',
            borderRadius: 1,
            backgroundColor: '#f9f9f9',
            boxSizing: 'border-box',
          }}
        >
          <FormControlLabel
            value="A"
            control={<Radio />}
            label={optionA}
            sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width:{md: '49%',xs:"100%"}, 
            padding: 2,
            marginBottom: 2,
            border: '1px solid #ccc',
            borderRadius: 1,
            backgroundColor: '#f9f9f9',
            boxSizing: 'border-box',
          }}
        >
          <FormControlLabel
            value="B"
            control={<Radio />}
            label={optionB}
            sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width:{md: '49%',xs:"100%"}, 
            padding: 2,
            marginBottom: 2,
            border: '1px solid #ccc',
            borderRadius: 1,
            backgroundColor: '#f9f9f9',
            boxSizing: 'border-box',
          }}
        >
          <FormControlLabel
            value="C"
            control={<Radio />}
            label={optionC}
            sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width:{md: '49%',xs:"100%"}, 
            padding: 2,
            marginBottom: 2,
            border: '1px solid #ccc',
            borderRadius: 1,
            backgroundColor: '#f9f9f9',
            boxSizing: 'border-box',
          }}
        >
          <FormControlLabel
            value="D"
            control={<Radio />}
            label={optionD}
            sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}
          />
        </Box>
      </RadioGroup>
    </FormControl>
  </Box>
);

export default TestQuestion;
