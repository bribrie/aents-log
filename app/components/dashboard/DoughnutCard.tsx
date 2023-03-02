import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface DoughnutProps {
  children: ReactNode;
  title: string;
  totalData: number;
}

const DoughnutCard = ({ children, title, totalData }: DoughnutProps) => {
  return (
    <Box
      sx={{
        border: '4px solid #F9FAFC',
        boxShadow: '4px 5px 9px 0px #f7f8fa',
        backgroundColor: '#fff',
        position: 'relative',
        borderRadius: '10px',
      }}
      padding='1rem'
    >
      {children}
      <Box
        style={{
          position: 'absolute',
          width: '100%',
          top: '50%',
          left: 0,
          textAlign: 'center',
          marginTop: '-30px',
          lineHeight: '20px',
        }}
      >
        <Box fontWeight='500'>{title}</Box>
        <Box fontSize='1.5rem' fontWeight='600' marginY='0.5rem'>
          {totalData.toLocaleString()}
        </Box>
        <Box color='#738195' fontSize='0.8rem'>
          tCO2e
        </Box>
      </Box>
    </Box>
  );
};

export default DoughnutCard;
