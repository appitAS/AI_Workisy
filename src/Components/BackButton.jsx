import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Tooltip, Box } from '@mui/material';
import { motion } from 'framer-motion';

const FixedModernBackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '16px',      // Adjust based on navbar height
        left: '25px',
        zIndex: 1300,     // Higher than navbar
      }}
    >
      <Tooltip title="Go Back" arrow>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <IconButton
            onClick={handleBack}
            sx={{
              backgroundColor: '#ffffff',
              color: '#1976d2',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: '#e3f2fd',
                boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
              },
              width:32,
              height:32,
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </motion.div>
      </Tooltip>
    </Box>
  );
};

export default FixedModernBackButton;
