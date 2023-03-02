import { Box, Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import React, { CSSProperties, ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

interface TitleProps extends MainProps {
  fontSize?: string;
}

interface ImageProps {
  imageSrc: StaticImageData | string;
  alt: string;
  style?: CSSProperties;
}

interface SummaryProps extends MainProps {
  fontStyle?: string;
}

const PostTitle = ({ children, fontSize }: TitleProps) => {
  return (
    <Typography variant='h3' fontSize={fontSize || undefined} mb='1rem'>
      {children}
    </Typography>
  );
};

const PostImage = ({ imageSrc, alt, style }: ImageProps) => {
  return (
    <Box maxWidth='600'>
      <Image
        width='600'
        height='350'
        src={imageSrc}
        alt={alt}
        style={style || undefined}
      />
    </Box>
  );
};

const PostSummary = ({ children, fontStyle }: SummaryProps) => {
  return (
    <Typography
      variant='body1'
      color='gray'
      fontStyle={fontStyle || 'inherit'}
      marginY='1rem'
      maxHeight='6rem'
      overflow='hidden'
    >
      {children}
    </Typography>
  );
};

const PostCategory = ({ children }: MainProps) => {
  return (
    <Typography variant='subtitle1' color='primary.main' mt='0.5rem'>
      {children}
    </Typography>
  );
};

const PostDate = ({ children }: MainProps) => {
  return <Typography variant='body1'>{children}</Typography>;
};

const PostCardMain = ({ children }: MainProps) => {
  return (
    <Box display='flex' flexDirection='column'>
      {children}
    </Box>
  );
};

export const PostCard = Object.assign(PostCardMain, {
  Title: PostTitle,
  Image: PostImage,
  Summary: PostSummary,
  Date: PostDate,
  Category: PostCategory,
});
