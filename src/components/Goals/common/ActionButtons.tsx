import React, { useEffect, useState } from 'react';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/axios';
import { generateCertificatePDFs } from './generateParticipationCertificate';
import { generateGoalCertificatePDF } from './GeneraterGoalCertificate';
import { CompleteGoals } from './completeGoal';

interface ActionButtonsProps {
  onLeaderboardClick: () => void;
  classGroupProp: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onLeaderboardClick, classGroupProp }) => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const [isClassCertificateEligible, setIsClassCertificateEligible] = useState(false);
  const [isGoalCertificateEligible, setIsGoalCertificateEligible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { className: classId, goal: goalId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkEligibility = async () => {
      try {
        if (goalId) {
          const res = await api.get(`/check-goal-completion`, {
            params: { classId, goalId },
            withCredentials: true,
          });
          setIsGoalCertificateEligible(res.data.completed);
        } else {
          const res = await api.get(`/check-class-completion`, {
            params: { classId },
            withCredentials: true,
          });
          setIsClassCertificateEligible(res.data.completed);
        }
      } catch (err) {
        console.error('Error checking certificate eligibility:', err);
      }
    };

    checkEligibility();
  }, [classId, goalId]);

  const handleCertificateClick = async (type: 'goal' | 'class') => {
    try {
      if (type === 'goal') {
        if (!isGoalCertificateEligible) {
          setModalMessage('Complete the tests in this goal to unlock your Goal Completion Certificate.');
          setOpenModal(true);
          return;
        }

        const response = await api.post('/generate-certificate', {
          type: `Goal ${goalId}`,
          classGr: classGroupProp,
        }, { withCredentials: true });

        const { certificateNumber, date, username, userSchool } = response.data;

        await generateGoalCertificatePDF({
          certificateNumber,
          username,
          userSchool,
          classId: Number(classId),
          date,
          baseUrl,
          goalId: Number(goalId),
        });

      } else if (type === 'class') {
        if (!isClassCertificateEligible) {
          setModalMessage('Complete all goals in this class to unlock your Class Completion Certificate.');
          setOpenModal(true);
          return;
        }

        const paymentCheck = await api.get('/check-class-payment', {
          params: { classId },
          withCredentials: true,
        });

        console.log(paymentCheck.data);
        console.log(paymentCheck.data.paid);

        if (!paymentCheck.data.paid) {
           navigate('/payment-details', {
                state: {
                  message: 'Certificate For Class '+classId,
                  amount: 100,
                },
              })
          return;
        }

        const response = await api.post('/generate-certificate', {
          type: 'Completion',
          classGr: classGroupProp,
        }, { withCredentials: true });

        const { certificateNumber, date, username, userSchool } = response.data;

        await CompleteGoals({
          certificateNumber,
          username,
          userSchool,
          classGroup: Number(classId),
          date,
          baseUrl,
        });
      }
    } catch (error) {
      console.error(`Error generating ${type} certificate:`, error);
      alert(`Failed to generate ${type} certificate. Please try again.`);
    }
  };

  const generateParticipationCertificate = async () => {
    try {
      const response = await api.post(
        '/generate-certificate',
        {
          type: "Participation",
          classGr: classGroupProp,
        },
        { withCredentials: true }
      );

      const { certificateNumber, date, username, userSchool, classGroup } = response.data;

      await generateCertificatePDFs({
        certificateNumber,
        username,
        userSchool,
        classGroup,
        date,
        baseUrl,
      });
    } catch (error) {
      console.error('Error generating participation certificate:', error);
      alert('Failed to generate participation certificate. Please try again.');
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: '10px',
          marginBottom: '10px',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onLeaderboardClick}
          sx={{ margin: 2 }}
        >
          See Leadership Board
        </Button>

        {!goalId && (
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: 2 }}
            onClick={() => handleCertificateClick('class')}
          >
            Get Completion Certificate
          </Button>
        )}

        {goalId && (
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: 2 }}
            onClick={() => handleCertificateClick('goal')}
          >
            Get Goal Completion Certificate
          </Button>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={generateParticipationCertificate}
          sx={{ margin: 2 }}
        >
          Get Participation Certificate
        </Button>
      </Box>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Certificate Not Yet Available</DialogTitle>
        <DialogContent>
          <p>{modalMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionButtons;
