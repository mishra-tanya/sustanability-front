import React, { useEffect, useState } from 'react';
import {
  Avatar, Box, Button, Chip, CircularProgress, FormControl, InputLabel,
  MenuItem, OutlinedInput, Select, Stack, TextField, Typography, useTheme, useMediaQuery, Checkbox, FormControlLabel
} from '@mui/material';
import api from '../../services/axios';

interface User {
  name: string;
  email: string;
  average_score: string;
  school?: string;
}

const EmailSender: React.FC = () => {
  const [emails, setEmails] = useState<User[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [fetching, setFetching] = useState(false);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchEmails = async (filterType = '') => {
    setFetching(true);
    try {
      const res = await api.get('/users/emails', {
        params: { filter: filterType }
      });
      setEmails(res.data);
    } catch (err) {
      console.error('Error fetching emails:', err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleSend = async () => {
    setLoading(true);
    const data = {
      emails: selectedEmails,
      subject,
      message,
    };

    try {
      await api.post('/send-email', data);
      alert('Emails sent!');
    } catch (err) {
      alert('Failed to send emails.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
    setSelectedEmails([]);
    setSearchTerm('');
    fetchEmails(value);
  };

  const filterOptions = [
    { label: 'All', value: '' },
    { label: 'Top Performers', value: 'top_performers' },
    { label: 'Inactive (1W)', value: 'inactive_1w' },
    { label: 'Inactive (2W)', value: 'inactive_2w' },
    { label: 'Inactive (1M)', value: 'inactive_1m' },
    { label: 'Paid Users', value: 'paid_users' },
  ];

  const filteredList = emails.filter(e =>
    e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allEmails = filteredList.map(user => user.email);
  const isAllSelected = selectedEmails.length === allEmails.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(allEmails);
    }
  };

  const handleIndividualToggle = (email: string) => {
    if (selectedEmails.includes(email)) {
      setSelectedEmails(prev => prev.filter(e => e !== email));
    } else {
      setSelectedEmails(prev => [...prev, email]);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Email Users</Typography>

      <Box mb={3} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {filterOptions.map(opt => (
          <Button
            key={opt.value}
            onClick={() => handleFilterChange(opt.value)}
            variant={filter === opt.value ? 'contained' : 'outlined'}
            sx={{
              borderRadius: '50px',
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              py: 0.7
            }}
          >
            {opt.label}
          </Button>
        ))}
      </Box>

      {fetching ? (
        <Box display="flex" justifyContent="center" alignItems="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Users</InputLabel>
            <Select
              multiple
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              value={selectedEmails}
              input={<OutlinedInput label="Select Users" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 400,
                    paddingTop: 0,
                  },
                },
              }}
            >
              {/* Search and Select All */}
              <Box px={2} py={1} sx={{ backgroundColor: '#f5f5f5' }}>
                <TextField
                  placeholder="Search user"
                  fullWidth
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                    />
                  }
                  label="Select All Users"
                />
              </Box>

              {/* User List */}
              {filteredList.length > 0 ? (
                filteredList.map((user) => (
                  <MenuItem
                    key={user.email}
                    value={user.email}
                    onClick={() => handleIndividualToggle(user.email)}
                    selected={selectedEmails.includes(user.email)}
                    sx={{ alignItems: 'flex-start' }}
                  >
                    <Stack
                      direction={isMobile ? 'column' : 'row'}
                      spacing={2}
                      alignItems={isMobile ? 'flex-start' : 'center'}
                      width="100%"
                    >
                      <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>

                      <Box flex={1}>
                        <Typography fontWeight="bold" color="primary">
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.school || 'School Name'}
                        </Typography>
                        {isMobile && (
                          <>
                            <Typography variant="body2" color="text.secondary">
                              {user.email}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'green', fontWeight: 600 }}>
                              Score: {Number(user.average_score || 0).toFixed(1)}
                            </Typography>
                          </>
                        )}
                      </Box>

                      {!isMobile && (
                        <Box textAlign="right">
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'green', fontWeight: 600 }}>
                            Score: {Number(user.average_score || 0).toFixed(1)}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No users found</MenuItem>
              )}
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
        </>
      )}
    </Box>
  );
};

export default EmailSender;
