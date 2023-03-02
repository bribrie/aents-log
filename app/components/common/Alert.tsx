import Box from '@mui/material/Box';
import { Alert as MuiAlert } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface AlertProps {
  alertMessage: string;
  resetError?: () => void;
}

const Alert = ({ alertMessage, resetError }: AlertProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    if (resetError) resetError();
    setOpen((open) => !open);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <MuiAlert
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={handleClose}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alertMessage}
        </MuiAlert>
      </Collapse>
    </Box>
  );
};

export default Alert;
