import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import "./Ck.css";

function CardSkeleton() {
  const theme = useTheme();

  return (
    <div className='Card-skeleton'>
      <div className='left-col'>
        {/* Customized Skeleton components for text */}
        <Skeleton animation="wave" variant="text" width={'80%'} height={30} sx={{ marginBottom: 1, backgroundColor: theme.palette.mode === 'dark' ? 'rgba(51, 51, 51, 0.1)' : '#f0f0f0' }} />
        <Skeleton animation="wave" variant="text" width={'80%'} height={30} sx={{ marginBottom: 1, backgroundColor: theme.palette.mode === 'dark' ? 'rgba(51, 51, 51, 0.1)' : '#f0f0f0' }} />
        <br />
        <Skeleton animation="wave" variant="text" width={'70%'} sx={{ marginBottom: 1, backgroundColor: theme.palette.mode === 'dark' ? 'rgba(51, 51, 51, 0.1)' : '#f0f0f0' }} />
        <Skeleton animation="wave" variant="text" width={'70%'} sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'rgba(51, 51, 51, 0.1)' : '#f0f0f0' }} />
      </div>
      <div className='right-col'>
        {/* Customized Skeleton component for rectangular shape */}
        <Skeleton className='tik' animation="wave" variant="rectangular" width={"10vmax"}  height={"17vh"} sx={{ borderRadius: 2, marginBottom: 1, backgroundColor: theme.palette.mode === 'dark' ? 'rgba(51, 51, 51, 0.1)' : '#f0f0f0' }} />
      </div>
    </div>
  );
}

export default CardSkeleton;


