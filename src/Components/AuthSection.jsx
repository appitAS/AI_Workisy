import { Card, CardContent, Button, Stack, Box } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Google SVG Logo
const GoogleLogo = (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <g>
      <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.6 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l6.4-6.4C34.1 6.4 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
      <path fill="#34A853" d="M6.3 14.7l7 5.1C14.9 17 19 14 24 14c3 0 5.7 1.1 7.8 2.9l6.4-6.4C34.1 6.4 29.3 4 24 4c-7.3 0-13.4 4.5-16.1 10.7z"/>
      <path fill="#FBBC05" d="M24 44c5.8 0 10.6-1.9 14.1-5.1l-6.5-5.3C29.6 35.2 27 36 24 36c-5.8 0-10.7-3.9-12.5-9.2l-7.1 5.5C6.6 39.5 14.1 44 24 44z"/>
      <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.3 3.4-4.6 7.5-11.7 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l6.4-6.4C34.1 6.4 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
    </g>
  </svg>
);

export default function SocialLoginCard() {
  return (
    <Card sx={{ maxWidth: 350, mx: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Stack spacing={2}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={GoogleLogo}
            sx={{ textTransform: 'none', fontWeight: 500, color: '#444', borderColor: '#ddd' }}
          >
            Sign in with Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LinkedInIcon sx={{ color: '#0A66C2' }} />}
            sx={{ textTransform: 'none', fontWeight: 500, color: '#0A66C2', borderColor: '#0A66C2' }}
          >
            Sign in with LinkedIn
          </Button>
        </Stack>
        <Box mt={3}>
          <Button variant="contained" color="primary" fullWidth>
           Confirm Apply
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
