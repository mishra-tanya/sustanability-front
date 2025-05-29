import React, {  useState } from 'react';
import {
  Button,
  Container,
  Typography,
  Stack,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { APP_BASE_URL } from '../../../services/config';

const CertificateView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const certificateUrl = searchParams.get('url') || '';
  const previewUrl = searchParams.get('preview') || '';

  const username = searchParams.get('username') || 'Participant';
  const urlUserId = searchParams.get('userId');
  const localUserId = localStorage.getItem('user_id');
  const isAuthorizedUser = urlUserId && localUserId && urlUserId === localUserId;

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (!certificateUrl) return;
    navigator.clipboard.writeText(certificateUrl);
    setCopied(true);
  };

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const baseUrl = APP_BASE_URL;

  return (
    <>
      <Helmet>
        <title>Certificate for {username}</title>
        <meta property="og:title" content={`Certificate for ${username}`} />
        <meta property="og:description" content={`Certificate of participation for ${username}`} />
        <meta property="og:image" content={`${previewUrl}`} />
        <meta property="og:url" content={`${baseUrl}/certificate-view?url=${encodeURIComponent(certificateUrl)}&username=${encodeURIComponent(username)}`} />
      </Helmet>

      <Container maxWidth="md" sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          🎉 Congratulations, {username}!
        </Typography>
        {isAuthorizedUser ? (
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Your certificate is ready to download and share. You can preview it below.
          <br />
          <i>Share your achievement with #SustainabilityChampion #SDG</i>
        </Typography>
        ):(
          <>
            Verified Certificate          
          </>
        )}

 {isAuthorizedUser ? (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            mt={4}
            justifyContent="center"
          >
            <Button
              component="a"
              variant="contained"
              color="primary"
              href={certificateUrl}
              download={`certificate_${username}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📥 Download
            </Button>

            <Button
              variant="outlined"
              color="primary"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                previewUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Share on LinkedIn
            </Button>
          <Button
            variant="outlined"
            color="primary"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              previewUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on Facebook
          </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            alert(
              'Instagram sharing is only supported via the app.\n\nTo share your certificate:\n1. Download it\n2. Open Instagram\n3. Create a new post and upload your certificate.'
            );
          }}
        >
          Share on Instagram
        </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleCopyLink}
            >
              📋 Copy Link
            </Button>
          </Stack>
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 4, fontStyle: 'italic', maxWidth: 600, mx: 'auto' }}
          >
            This certificate is professionally verified and belongs to <b>{username}</b>. For verification or inquiries, please contact the issuing organization.
          </Typography>
        )}
        <br />
        {certificateUrl ? (
          isMobile ? (
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <>
              <img src={previewUrl}  alt='Certificate' style={{width:'95%'}}/>
              </>
            </Box>
          ) : (
            <object
              data={certificateUrl}
              type="application/pdf"
              width="100%"
              height="500"
            >
              <p>
                Unable to display PDF. <a href={certificateUrl}>Download instead</a>.
              </p>
            </object>
          )
        ) : (
          <Typography variant="body1" color="error" sx={{ mt: 4 }}>
            Sorry, no certificate URL found.
          </Typography>
        )}

       

        <Snackbar
          open={copied}
          autoHideDuration={3000}
          onClose={() => setCopied(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setCopied(false)} severity="success" sx={{ width: '100%' }}>
            Link copied to clipboard!
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default CertificateView;
