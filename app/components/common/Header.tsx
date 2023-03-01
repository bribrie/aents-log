import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Icon from '../../assets/CI_Dark.png';
import Image from 'next/image';
import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useRouter } from 'next/router';

const linkStyle = {
  '&:hover': {
    color: 'primary.main',
  },
};

interface LinkType {
  title: string;
  link: string;
  target?: boolean;
}

const navLink: LinkType[] = [
  { title: 'blog', link: '/blog' },
  { title: 'dashboard', link: '/dashboard' },
  { title: 'company', link: 'https://aents.co', target: true },
];

const Header = () => {
  const router = useRouter();

  return (
    <Box
      component='header'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      height='5rem'
      paddingY='1rem'
    >
      <Link href='/'>
        <Image src={Icon} alt='logo' height='28' priority />
      </Link>
      <List
        sx={{
          display: 'flex',
          gap: '0.2rem',
        }}
      >
        {navLink.map((item) => (
          <ListItem key={item.title}>
            <MuiLink
              underline='none'
              color={
                router.pathname.includes(item.title) ? 'primary.main' : 'black'
              }
              sx={linkStyle}
              component={Link}
              href={item.link}
              fontSize='1.2rem'
              target={item.target ? '_blank' : undefined}
            >
              {item.title}
            </MuiLink>
          </ListItem>
        ))}
        <ListItem>
          <AccountCircleIcon />
        </ListItem>
      </List>
    </Box>
  );
};

export default Header;
