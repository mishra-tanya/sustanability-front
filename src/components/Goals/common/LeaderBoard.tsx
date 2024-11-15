import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
}

const leaderboardData: LeaderboardEntry[] = [
  { id: 1, name: 'Alice', score: 120 },
  { id: 2, name: 'Bob', score: 110 },
  { id: 3, name: 'Charlie', score: 105 },
  { id: 1, name: 'Alice', score: 120 },
  { id: 2, name: 'Bob', score: 110 },
  { id: 3, name: 'Charlie', score: 105 },
];

interface LeaderboardDialogProps {
  open: boolean;
  onClose: () => void;
}

const LeaderboardDialog: React.FC<LeaderboardDialogProps> = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle sx={{ backgroundColor: "#e29114" }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', color: "white" }}>
        <EmojiEvents sx={{ marginRight: 1, fontSize: 30, color: "white" }} />
        Leadership Board
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
            <TableRow sx={{ backgroundColor: "#4caf50", color: "white" }}>
              <TableCell></TableCell>
              <TableCell sx={{ color: 'white' }}>Rank</TableCell>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((entry, index) => (
              <TableRow key={entry.id}>
                <TableCell><EmojiEvents /></TableCell>
                <TableCell sx={{ color: '#4caf50', fontWeight: "bold" }}>#{index + 1}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.score}</TableCell>
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

export default LeaderboardDialog;
