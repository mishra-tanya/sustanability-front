import React, { useState, useMemo } from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button,
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';

interface LeaderboardEntry {
    user_id: number;
    total_score: string;
    rank: number;
    name: string;
    goal_id: number;
    school: string;
}

interface LeaderboardDialogProps {
    open: boolean;
    onClose: () => void;
    leaderboardData: LeaderboardEntry[];
    currentUserId: number;
    goals: Goal[];
}

interface Goal {
    goal_id: number;
    goal_name: string;
    id: number;
}

const LeaderboardDialog: React.FC<LeaderboardDialogProps> = ({ open, onClose, leaderboardData, currentUserId, goals }) => {
    const [filteredLeaderboard, setFilteredLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

    const overallLeaderboard = useMemo(() => {
        const combinedData: { [userId: number]: LeaderboardEntry } = {};
        leaderboardData.forEach((entry) => {
            if (!combinedData[entry.user_id]) {
                combinedData[entry.user_id] = { ...entry, total_score: "0" };
            }
            combinedData[entry.user_id].total_score = (
                parseFloat(combinedData[entry.user_id].total_score) +
                parseFloat(entry.total_score)
            ).toString();
        });
        const sortedData = Object.values(combinedData).sort((a, b) => parseFloat(b.total_score) - parseFloat(a.total_score));
        return sortedData.map((entry, index) => ({ ...entry, rank: index + 1 }));
    }, [leaderboardData]);

    const handleFilterLeader = (goal_id: number) => {
        const filteredData = leaderboardData.filter(entry => entry.goal_id === goal_id);
        setFilteredLeaderboard(filteredData);
        setSelectedGoalId(goal_id);
    };

    const handleReset = () => {
        setFilteredLeaderboard([]);
        setSelectedGoalId(null);
    };

    const currentUserEntry = (selectedGoalId ? filteredLeaderboard : overallLeaderboard).find(entry => String(entry.user_id) === String(currentUserId));

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ backgroundColor: "#e29114" }}>
                <Typography variant="h5" gutterBottom sx={{ textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', color: "white" }}>
                    <EmojiEvents sx={{ marginRight: 1, fontSize: 30, color: "white" }} />
                    Leaderboard
                </Typography>
                <Typography sx={{ textAlign: "center", color: "white" }}>
                    {selectedGoalId ? `Goal-wise Ranking` : `Overall Ranking`}
                </Typography>
            </DialogTitle>
            <hr />
            <DialogContent>
              {goals?(
                 <>
                 {goals.map((goal) => (
                      <Button
                          key={goal.id}
                          variant={selectedGoalId === goal.id ? "contained" : "outlined"}
                          onClick={() => handleFilterLeader(goal.id)}
                          sx={{ margin: 1, borderRadius: 39 }}
                      >
                          {goal.goal_name}
                      </Button>
                  ))}
                  <Button variant="contained" onClick={handleReset} sx={{ margin: 1, borderRadius: 39 }}>
                     Overall Ranking
                  </Button>
                 </>

              )
              :(
                <>
                </>
              )
            }

                <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#4caf50", color: "white" }}>
                                <TableCell></TableCell>
                                <TableCell sx={{ color: 'white' }}>Rank</TableCell>
                                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                                <TableCell sx={{ color: 'white' }}>School</TableCell>
                                <TableCell sx={{ color: 'white' }}>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentUserEntry && (
                                <TableRow sx={{ backgroundColor: "#e5eab68c", color: "black", textTransform: "capitalize" }}>
                                    <TableCell>You</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>#{selectedGoalId ? "#":currentUserEntry.rank}</TableCell>
                                    <TableCell>{currentUserEntry.name}</TableCell>
                                    <TableCell>{currentUserEntry.school}</TableCell>
                                    <TableCell>{currentUserEntry.total_score}</TableCell>
                                </TableRow>
                            )}
                            {(selectedGoalId ? filteredLeaderboard : overallLeaderboard).map((entry,index) => (
                                <TableRow key={entry.user_id} sx={{ textTransform: "capitalize" }}>
                                    <TableCell><EmojiEvents /></TableCell>
                                    <TableCell sx={{ color: '#4caf50', fontWeight: "bold" }}>#{index+1}</TableCell>
                                    <TableCell>{entry.name}</TableCell>
                                    <TableCell>{entry.school}</TableCell>
                                    <TableCell>{entry.total_score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LeaderboardDialog;
