import Nav from '@/components/blog/Nav';
import Link from 'next/link';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { request_get_posts } from '@/_requests/getPost';
import { Box, Button, Typography } from '@mui/material';
import { PostCard } from '@/components/blog/PostCard';
import Loading from '@/components/common/Loading';

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const query = category?.toString().toLocaleUpperCase() || '';

  const { data, error, isLoading } = useSWR(query, request_get_posts);

  if (data?.success === false) return <div>{data.message}</div>;
  if (isLoading) return <Loading />;

  return (
    <>
      <Nav />
      <Box component='main'>
        {data && data.result.length !== 0 ? (
          <>
            <Box
              component='section'
              display='grid'
              gap='2rem'
              gridTemplateColumns='7fr 5fr'
              mt='1.5rem'
              mb='5rem'
            >
              <Link href={`/blog/${category}/${data.result[0]._id}`}>
                <PostCard.Image
                  imageSrc={data.result[0].main_image_url}
                  alt='title'
                  style={{ maxWidth: '100%', maxHeight: '300' }}
                ></PostCard.Image>
              </Link>
              <PostCard>
                <PostCard.Category>{data.result[0].category}</PostCard.Category>
                <Link href={`/blog/${category}/${data.result[0]._id}`}>
                  <PostCard.Title>{data.result[0].title}</PostCard.Title>
                </Link>
                <PostCard.Date>{data.result[0].created_at}</PostCard.Date>
                <PostCard.Summary>{data.result[0].summary}</PostCard.Summary>
              </PostCard>
            </Box>
            <Box
              component='section'
              display='grid'
              gridTemplateColumns='repeat(2, 1fr)'
              gap='2rem'
            >
              {data.result.slice(1, data.result.length).map((post) => (
                <Box display='flex' flexDirection='column' key={post.title}>
                  <Link href={`/blog/${category}/${post.title}`}>
                    <PostCard.Image
                      imageSrc={post.main_image_url}
                      alt='title'
                      style={{ maxWidth: '100%', maxHeight: '350px' }}
                    ></PostCard.Image>
                  </Link>
                  <PostCard>
                    <PostCard.Category>{post.category}</PostCard.Category>
                    <Link href={`/blog/${category}/${post.title}`}>
                      <PostCard.Title fontSize='2.2rem'>
                        {post.title}
                      </PostCard.Title>
                    </Link>
                    <PostCard.Date>{post.created_at}</PostCard.Date>
                  </PostCard>
                </Box>
              ))}
            </Box>
          </>
        ) : (
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            marginY='3rem'
            gap='1rem'
          >
            <Typography variant='h6'>등록된 포스트가 없습니다.</Typography>
            <Button variant='outlined' size='small'>
              <Link href='/blog/create'>새로운 포스트 등록하기</Link>
            </Button>
          </Box>
        )}
      </Box>
      {data && data.result.length !== 0 ? (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          marginY='3rem'
        >
          <Button variant='outlined' size='large'>
            LOAD MORE
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default CategoryPage;
