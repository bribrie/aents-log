import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <Box
      sx={{ zIndex: 100 }}
      display='flex'
      alignItems='center'
      justifyContent='center'
      height='100vh'
    >
      <CircularProgress size={100} />
    </Box>
  );
};

export default Loading;
