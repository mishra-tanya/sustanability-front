import { Alert } from '@mui/material';

interface MessageProps {
  message: string;
}

export const MessageAlert: React.FC<MessageProps> = ({ message }) => (
  message ? (
    <Alert severity={message.includes('successful') ? 'success' : 'error'} sx={{ mt: 2, mb: 2 }}>
      {message}
    </Alert>
  ) : null
);
