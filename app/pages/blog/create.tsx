import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Skeleton,
} from '@mui/material';
import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { FormEvent, forwardRef, useRef, useState } from 'react';
import { CATEGORIES } from '@/_consts/Categories';
import { Editor } from '@toast-ui/react-editor';
import { request_create_post } from '@/_requests/createPost';
import Alert from '@/components/common/Alert';
import { EditorProps } from '@/components/blog/TextEditor';
import { useRouter } from 'next/router';

// 서버사이드 렌더링에 포함하지 않음
const TextEditor = dynamic(() => import('@/components/blog/TextEditor'), {
  ssr: false,
  loading: () => <Skeleton variant='rectangular' width='100%' height={550} />,
});

const ForwardRefEditor = forwardRef<Editor, EditorProps>((props, ref) => (
  <TextEditor {...props} forwardedRef={ref} />
));

const BlogCreate: NextPage = () => {
  const TODAY = `${new Date().getFullYear()}년 ${
    new Date().getMonth() + 1
  }월 ${new Date().getDate()}일`;
  const router = useRouter();

  const [category, setCategory] = useState<string>(CATEGORIES[1].title);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<Editor>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLInputElement>(null);
  const [mainImageUrl, setMainImageUrl] = useState({ order: 1, url: '' });

  const handleUrl = (imageUrl: string) => {
    if (mainImageUrl.order === 1) {
      setMainImageUrl({ order: mainImageUrl.order + 1, url: imageUrl });
    }
    return;
  };
  const getContent = () => {
    if (contentRef.current !== null) {
      const editorInstance = contentRef.current.getInstance();
      const markdownContent = editorInstance.getMarkdown();
      if (markdownContent.trim().length < 1) {
        setError('포스트 내용을 입력해주세요.');
      }
      return markdownContent;
    }
    return;
  };

  const resetError = () => {
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (mainImageUrl.url === '') {
      setError('메인 이미지를 등록해주세요.');
      return;
    }
    const content = getContent() as string;
    const response = await request_create_post({
      category,
      content,
      main_image_url: mainImageUrl.url,
      title: titleRef.current?.value as string,
      summary: summaryRef.current?.value as string,
      created_at: TODAY,
    });

    if (response.success) {
      router.push('/blog');
    } else {
      console.log('err');
    }
  };

  return (
    <>
      {error !== null ? (
        <Alert alertMessage={error} resetError={resetError} />
      ) : null}
      <Container maxWidth='lg' sx={{ marginTop: '2rem' }}>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          mb='3rem'
          gap='1.5rem'
        >
          <FormControl variant='standard' sx={{ width: '15rem' }}>
            <InputLabel id='demo-simple-select-label'>카테고리</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              value={category}
              required
              onChange={(e: SelectChangeEvent) => setCategory(e.target.value)}
            >
              {CATEGORIES.slice(1, CATEGORIES.length).map((el) => (
                <MenuItem key={el.title} value={el.title}>
                  {el.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            id='title-input'
            label='제목'
            size='medium'
            sx={{ width: '70%' }}
            defaultValue=''
            variant='standard'
            inputRef={titleRef}
          />
          <TextField
            required
            id='summary-input'
            label='요약'
            size='medium'
            defaultValue=''
            variant='standard'
            sx={{ width: '70%' }}
            inputRef={summaryRef}
          />
        </Box>
        <ForwardRefEditor ref={contentRef} handleUrl={handleUrl} />
        <Box textAlign='right' marginY='2rem'>
          <Button
            variant='outlined'
            sx={{ fontWeight: '600', paddingX: '1.5rem' }}
            onClick={handleSubmit}
          >
            등록
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default BlogCreate;
