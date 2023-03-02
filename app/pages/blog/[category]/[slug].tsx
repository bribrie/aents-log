import { Container, Box, Typography, Skeleton, Button } from '@mui/material';
import Icon from '@/assets/CI_Dark.png';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { PostCard } from '@/components/blog/PostCard';
import { useState } from 'react';
import { request_delete_post } from '@/_requests/deletePost';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { request_get_post } from '@/_requests/getPost';
import Loading from '@/components/common/Loading';

const TextViewer = dynamic(() => import('@/components/blog/TextViewer'), {
  ssr: false,
  loading: () => <Skeleton variant='rectangular' width='100%' height={550} />,
});

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error, isLoading } = useSWR(slug, request_get_post);

  if (data?.success === false) return <div>{data.message}</div>;
  if (isLoading) return <Loading />;

  const handleDelete = async () => {
    if (data) {
      const response = await request_delete_post(data.result._id);
      if (response.success) {
        router.push('/blog');
      }
    }
  };

  return (
    <Container maxWidth='lg' sx={{ marginY: '2rem' }}>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        gap='5rem'
      >
        <Box display='flex' flexDirection='column' flex='5' gap='0.3rem'>
          <PostCard.Category>{data?.result.category}</PostCard.Category>
          <PostCard.Title>{data?.result.title}</PostCard.Title>
          <PostCard.Summary>{data?.result.summary}</PostCard.Summary>
          <PostCard.Date>{data?.result.created_at}</PostCard.Date>
        </Box>
        <Box flex='5'>
          <Image
            src={data?.result.main_image_url || ''}
            width='200'
            height='300'
            alt='main image'
            style={{ width: '100%', maxHeight: '350px' }}
          />
        </Box>
      </Box>
      <Box mt='8rem'>
        <TextViewer content={data?.result.content || ''} />
      </Box>
      <Box display='flex' justifyContent='center' marginY='3rem'>
        <Button onClick={handleDelete}>삭제</Button>
      </Box>
    </Container>
  );
};

export default PostPage;
