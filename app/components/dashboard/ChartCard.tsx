import { Box, Chip, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
  alignItems?: string;
}

interface ContentProps {
  children: ReactNode;
}

interface HeaderProps {
  title: string;
  emission?: number;
}

interface LabelProps {
  children: ReactNode;
  color?: string;
}
interface EmissionProps {
  emission: number;
}

const ChartHeader = ({ title, emission }: HeaderProps) => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      mb='1rem'
    >
      <Typography variant='h6' fontWeight='600'>
        {title}
      </Typography>
      {emission && (
        <Typography variant='body1' fontWeight='600'>
          {emission.toLocaleString()}tCO2e
        </Typography>
      )}
    </Box>
  );
};

const ChartContent = ({ children }: ContentProps) => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      paddingY='1rem'
    >
      {children}
    </Box>
  );
};

const ChartText = ({ children, color }: LabelProps) => {
  return (
    <Box display='flex' gap='0.5rem' alignItems='center'>
      {color ? (
        <Chip
          sx={{ backgroundColor: color, borderRadius: '5px', height: '1.2rem' }}
        ></Chip>
      ) : null}
      <Typography variant='body1'>{children}</Typography>
    </Box>
  );
};

const ChartEmission = ({ emission }: EmissionProps) => {
  return (
    <Typography variant='body1'>{emission.toLocaleString()}tCO2e</Typography>
  );
};

const ChartLabel = ({ color }: LabelProps) => {
  return <Chip sx={{ backgroundColor: color, borderRadius: '10px' }}></Chip>;
};
const ChartMain = ({ children, alignItems }: MainProps) => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        position: 'relative',
        borderRadius: '10px',
        border: '4px solid #F9FAFC',
        boxShadow: '4px 5px 9px 0px #f7f8fa',
      }}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems={alignItems || 'flexStart'}
      padding='1.5rem'
    >
      {children}
    </Box>
  );
};

export const ChartCard = Object.assign(ChartMain, {
  header: ChartHeader,
  emission: ChartEmission,
  content: ChartContent,
  label: ChartLabel,
  text: ChartText,
});
