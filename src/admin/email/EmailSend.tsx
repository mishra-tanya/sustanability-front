import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  OutlinedInput,
  Chip,
  CircularProgress,
} from '@mui/material';
import api from '../../services/axios';

const EmailSender: React.FC = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    api.get('/users/emails').then(res => {
      const mailList = res.data.map((user: any) => user.email);
      setEmails(mailList);
    });
  }, []);

  const handleSend = async () => {
    setLoading(true);
    const data = {
      emails: selectedEmails.includes('ALL') ? emails : selectedEmails,
      subject,
      message,
    };

    try {
      await api.post('/send-email', data);
      alert('Emails sent!');
    } catch (err) {
      alert('Failed to send emails.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Email Users</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Select Users</InputLabel>
        <Select
          multiple
          value={selectedEmails}
          onChange={(e) => setSelectedEmails(e.target.value as string[])}
          input={<OutlinedInput label="Select Users" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value === 'ALL' ? 'All Users' : value} />
              ))}
            </Box>
          )}
        >
          <MenuItem value="ALL">All Users</MenuItem>
          {emails.map((email) => (
            <MenuItem key={email} value={email}>
              {email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Subject"
        fullWidth
        margin="normal"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <TextField
        label="Message"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button
        variant="contained"
        onClick={handleSend}
        disabled={loading}
        startIcon={loading && <CircularProgress size={20} />}
      >
        {loading ? 'Sending...' : 'Send Email'}
      </Button>
    </Box>
  );
};

export default EmailSender;
