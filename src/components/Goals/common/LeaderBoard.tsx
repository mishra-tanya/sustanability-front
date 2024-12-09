import React from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';

interface LeaderboardEntry {
    user_id: number;
    total_score: string;
    rank: number;
    name: string;
    school: string;
}

interface LeaderboardDialogProps {
    open: boolean;
    onClose: () => void;
    leaderboardData: LeaderboardEntry[];
    currentUserId: number; 
}

const LeaderboardDialog: React.FC<LeaderboardDialogProps> = ({ open, onClose, leaderboardData, currentUserId }) => {

  const currentUserEntry = leaderboardData.find(entry => String(entry.user_id) === String(currentUserId));

console.log(currentUserEntry);
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ backgroundColor: "#e29114" }}>
                <Typography variant="h5" gutterBottom sx={{ textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', color: "white" }}>
                    <EmojiEvents sx={{ marginRight: 1, fontSize: 30, color: "white" }} />
                    Leaderboard
                </Typography>
                <Typography sx={{ textAlign: "center", color: "white" }}>
                    Overall Ranking
                </Typography>
            </DialogTitle>
            <hr />
            <DialogContent>
                <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
                    <Table>
                        <TableHead>
                            
                            {/* Regular header row */}
                            <TableRow sx={{ backgroundColor: "#4caf50", color: "white" }}>
                                <TableCell></TableCell>
                                <TableCell sx={{ color: 'white' }}>Rank</TableCell>
                                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                                <TableCell sx={{ color: 'white' }}>School</TableCell>
                                <TableCell sx={{ color: 'white' }}>Score</TableCell>
                            </TableRow>
                            {currentUserEntry && (
                                <TableRow sx={{ backgroundColor: "#e5eab68c", color: "black" ,textTransform: "capitalize"}}>
                                    <TableCell>You</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}> #{currentUserEntry.rank}</TableCell>
                                    <TableCell>{currentUserEntry.name}</TableCell>
                                    <TableCell>{currentUserEntry.school}</TableCell>
                                    <TableCell>{currentUserEntry.total_score}</TableCell>
                                </TableRow>
                            )}
                        </TableHead>
                        <TableBody>
                            {leaderboardData.map((entry) => (
                                <TableRow key={entry.user_id} sx={{ textTransform: "capitalize" }}>
                                    <TableCell><EmojiEvents /></TableCell>
                                    <TableCell sx={{ color: '#4caf50', fontWeight: "bold"}}>#{entry.rank}</TableCell>
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
