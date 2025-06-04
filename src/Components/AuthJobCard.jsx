import { Box, Typography, Chip, Stack, Avatar, Paper } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';

export default function JobCard() {
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar sx={{ bgcolor: 'white', width: 56, height: 56 }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" width={40} />
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Sr Ui/Ux Designer And Developer
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            ₹8,00,000-12,00,000 Lpa
          </Typography>
          <Stack direction="row" spacing={1} mt={1}>
            <Chip label="FULL TIME" size="small" />
            <Chip label="REMOTE" size="small" />
            <Chip label="2yr+ Exp" size="small" />
          </Stack>
          <Stack direction="row" spacing={2} mt={1}>
            <Typography variant="body2">Hyderabad</Typography>
            <Typography variant="body2">Any Graduate</Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
