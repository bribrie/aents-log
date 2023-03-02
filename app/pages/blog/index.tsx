import { NextPage } from 'next';
import Link from 'next/link';
import Nav from '@/components/blog/Nav';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { PostCard } from '@/components/blog/PostCard';
import { request_get_posts } from '@/_requests/getPost';
import useSWR from 'swr';
import Loading from '@/components/common/Loading';

const BlogMainPage: NextPage = () => {
  const { data, isLoading } = useSWR('ALL', request_get_posts);

  if (data?.success === false) return <div>error</div>;

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
              <Link
                href={`/blog/${data.result[0].category.toLowerCase()}/${
                  data.result[0]._id
                }`}
              >
                <PostCard.Image
                  imageSrc={data.result[0].main_image_url}
                  alt='title'
                  style={{ maxWidth: '100%', maxHeight: '350' }}
                ></PostCard.Image>
              </Link>
              <PostCard>
                <PostCard.Category>{data.result[0].category}</PostCard.Category>
                <Link
                  href={`/blog/${data.result[0].category.toLowerCase()}/${
                    data.result[0]._id
                  }`}
                >
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
                <Box display='flex' flexDirection='column' key={post._id}>
                  <Link
                    href={`/blog/${post.category.toLowerCase()}/${post._id}`}
                  >
                    <PostCard.Image
                      imageSrc={post.main_image_url}
                      alt='title'
                      style={{ maxWidth: '100%', maxHeight: '300' }}
                    ></PostCard.Image>
                  </Link>
                  <PostCard>
                    <PostCard.Category>{post.category}</PostCard.Category>
                    <Link
                      href={`/blog/${data.result[0].category.toLowerCase()}/${
                        data.result[0]._id
                      }`}
                    >
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
          <div>등록된 포스트가 없습니다.</div>
        )}
      </Box>
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
    </>
  );
};

export default BlogMainPage;
