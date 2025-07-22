import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Typography
} from '@mui/material';
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
  const [isGoalCertificateEligible, setIsGoalCertificateEligible] = useState<number[] | false>(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loadingButton, setLoadingButton] = useState<'goal' | 'class' | 'participation' | null>(null);

  const [completedGoals, setCompletedGoals] = useState<string[]>([]);
  const [showGoalsModal, setShowGoalsModal] = useState(false);

  const { className: classId, goal: goalId } = useParams<{ className: string; goal?: string }>();
  const navigate = useNavigate();

  const fetchCompletedGoals = async () => {
    try {
      setLoadingButton('goal'); // Use loading for fetching modal goals as well
      const res = await api.get('/getAllUserGoalsCompleted', {
        params: { classId },
        withCredentials: true,
      });
      const goals = res.data?.goals || [];
      setCompletedGoals(goals);
      setShowGoalsModal(true);
    } catch (error) {
      console.error('Failed to fetch completed goals:', error);
      setCompletedGoals([]);
      setShowGoalsModal(true);
    } finally {
      setLoadingButton(null);
    }
  };

  useEffect(() => {
    const checkEligibility = async () => {
      try {
        const res = await api.get(
          goalId ? '/getAllUserGoalsCompleted' : '/check-class-completion',
          {
            params: { classId },
            withCredentials: true,
          }
        );

        if (goalId) {
          // Normalize goal IDs to 1–17 range
          const normalizedGoalIds: number[] = res.data.goals.map((id: number) => ((id - 1) % 17) + 1);
          setIsGoalCertificateEligible(normalizedGoalIds);
        } else {
          setIsClassCertificateEligible(res.data.completed);
        }
      } catch (err) {
        console.error('Error checking certificate eligibility:', err);
        setIsClassCertificateEligible(false);
        setIsGoalCertificateEligible(false);
      }
    };

    checkEligibility();
  }, [classId, goalId]);

  const handleGoalCertificateFromModal = async (goalIdForCert: number) => {
    try {
      setLoadingButton('goal');
      const paymentCheck = await api.get('/check-class-payment', {
          params: { classId },
          withCredentials: true,
        });

        if (!paymentCheck.data.paid) {
          navigate('/payment-details', {
            state: {
              message: 'Certificate For Class ' + classId,
              amount: 100,
            },
          });
          return;
        }
      const response = await api.post('/generate-certificate', {
        type: `Goal ${goalIdForCert}`,
        classGr: classGroupProp,
      }, { withCredentials: true });

      const { certificateNumber, date, username, userSchool, userId } = response.data;

      await generateGoalCertificatePDF({
        certificateNumber,
        username,
        userSchool,
        classId: Number(classId),
        date,
        baseUrl,
        goalId: goalIdForCert,
        userId
      });
    } catch (error) {
      console.error(`Error generating goal certificate for goal ${goalIdForCert}:`, error);
      alert(`Failed to generate certificate for goal ${goalIdForCert}. Please try again.`);
    } finally {
      setLoadingButton(null);
      setShowGoalsModal(false);
    }
  };

  const handleCertificateClick = async (type: 'goal' | 'class') => {
    try {
      setLoadingButton(type);

      if (type === 'goal') {
        if (!isGoalCertificateEligible || !goalId || !isGoalCertificateEligible.includes(Number(goalId))) {
          setModalMessage('Complete the tests in this goal to unlock your Goal Completion Certificate.');
          setOpenModal(true);
          return;
        }

        const response = await api.post('/generate-certificate', {
          type: `Goal ${goalId}`,
          classGr: classGroupProp,
        }, { withCredentials: true });

        const { certificateNumber, date, username, userSchool, userId } = response.data;

        await generateGoalCertificatePDF({
          certificateNumber,
          username,
          userSchool,
          classId: Number(classId),
          date,
          baseUrl,
          goalId: Number(goalId),
          userId
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

        if (!paymentCheck.data.paid) {
          navigate('/payment-details', {
            state: {
              message: 'Certificate For Class ' + classId,
              amount: 100,
            },
          });
          return;
        }

        const response = await api.post('/generate-certificate', {
          type: 'Completion',
          classGr: classGroupProp,
        }, { withCredentials: true });

        const { certificateNumber, date, username, userSchool, userId } = response.data;

        await CompleteGoals({
          certificateNumber,
          username,
          userSchool,
          classGroup: Number(classId),
          date,
          baseUrl,
          userId
        });
      }
    } catch (error) {
      console.error(`Error generating ${type} certificate:`, error);
      alert(`Failed to generate ${type} certificate. Please try again.`);
    } finally {
      setLoadingButton(null);
    }
  };

  const generateParticipationCertificate = async () => {
    try {
      setLoadingButton('participation');

      const paymentCheck = await api.get('/check-class-payment', {
          params: { classId },
          withCredentials: true,
        });

        if (!paymentCheck.data.paid) {
          navigate('/payment-details', {
            state: {
              message: 'Certificate For Class ' + classId,
              amount: 100,
            },
          });
          return;
        }
      const response = await api.post(
        '/generate-certificate',
        {
          type: "Participation",
          classGr: classGroupProp,
        },
        { withCredentials: true }
      );

      const { certificateNumber, date, username, userSchool, classGroup, userId } = response.data;

      await generateCertificatePDFs({
        certificateNumber,
        username,
        userSchool,
        classGroup,
        date,
        baseUrl,
        userId
      });
    } catch (error) {
      console.error('Error generating participation certificate:', error);
      alert('Failed to generate participation certificate. Please try again.');
    } finally {
      setLoadingButton(null);
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
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onLeaderboardClick}
            disabled={!!loadingButton}
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
              disabled={!!loadingButton}
            >
              {loadingButton === 'class' ? <CircularProgress size={24} color="inherit" /> : 'Get Completion Certificate'}
            </Button>
          )}

          {/* {goalId && (
            <Button
              variant="contained"
              color="primary"
              sx={{ margin: 2 }}
              onClick={() => handleCertificateClick('goal')}
              disabled={!!loadingButton}
            >
              {loadingButton === 'goal' ? <CircularProgress size={24} color="inherit" /> : 'Get Goal Completion Certificate'}
            </Button>
          )} */}

          {!goalId && (
            <Button
              variant="contained"
              color="primary"
              sx={{ margin: 2 }}
              onClick={fetchCompletedGoals}
              disabled={!!loadingButton}
            >
              {loadingButton === 'goal' ? <CircularProgress size={24} color="inherit" /> : 'Get Goal Completion Certificate'}
            </Button>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={generateParticipationCertificate}
            sx={{ margin: 2 }}
            disabled={!!loadingButton}
          >
            {loadingButton === 'participation' ? <CircularProgress size={24} color="inherit" /> : 'Get Participation Certificate'}
          </Button>
        </Box>
      </Box>

      {/* Modal for certificate not available message */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Certificate Not Yet Available</DialogTitle>
        <DialogContent>
          <Typography>{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal to show completed goals */}
      <Dialog open={showGoalsModal} onClose={() => setShowGoalsModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Completed Goals</DialogTitle>
        <DialogContent dividers>
          {completedGoals.length > 0 ? (
            completedGoals.map((goalIdStr, index) => {
              const normalizedGoal = ((Number(goalIdStr) - 1) % 17) + 1;
              return (
                <Box key={index} sx={{ mb: 2, pb: 1,display:'flex',justifyContent:'center' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleGoalCertificateFromModal(normalizedGoal)}
                    disabled={loadingButton === 'goal'}
                  >
                     Get Goal Completion Certificate For &nbsp;<strong> Goal {normalizedGoal}</strong>
                  </Button>
                </Box>
              );
            })
          ) : (
            <Typography>No goals completed.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowGoalsModal(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionButtons;
