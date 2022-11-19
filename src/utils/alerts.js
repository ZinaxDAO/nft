import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Stack from '@mui/material/Stack';

export function SuccessAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
        }}
      >
        Transaction Successful! 
      </Alert>
    </Stack>
  );
}

export function FailedAlerts() {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert
          iconMapping={{
            success: <CancelOutlinedIcon fontSize="inherit" />,
          }}
        >
          Transaction Failed!
        </Alert>
      </Stack>
    );
}