import { CATEGORIES } from '../../_consts/Categories';
import { useRouter } from 'next/router';
import {
  Box,
  List,
  ListItem,
  Link as MuiLink,
  Button,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

const Nav = () => {
  const router = useRouter();
  const { category } = router.query;
  const query = category?.toString().toLocaleUpperCase() || 'ALL';

  return (
    <Box
      component='nav'
      display='flex'
      marginY='1rem'
      justifyContent='space-between'
      alignItems='center'
    >
      <List
        sx={{
          display: 'flex',
          fontSize: '14px',
          gap: '1rem',
        }}
      >
        {CATEGORIES.map((item) => (
          <ListItem
            sx={{
              textAlign: 'center',
              width: 'max-content',
              borderRadius: '10px',
              border: '1px dashed',
              borderColor: 'primary.main',
              backgroundColor: `${
                query === item.title ? 'primary.light' : 'white'
              }`,
              '&:hover': {
                backgroundColor: 'primary.light',
              },
            }}
            key={item.title}
          >
            <MuiLink
              underline='none'
              color='black'
              component={Link}
              href={item.path}
            >
              {item.title}
            </MuiLink>
          </ListItem>
        ))}
      </List>
      <Button>
        <Link href='/blog/create'>
          <Box display='flex' alignItems='center'>
            <AddIcon fontSize='small' />
            <Typography>포스트 추가하기</Typography>
          </Box>
        </Link>
      </Button>
    </Box>
  );
};

export default Nav;
