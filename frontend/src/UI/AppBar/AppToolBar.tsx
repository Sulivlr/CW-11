import { AppBar, Box, styled, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectUser } from '../../feauters/users/UsersSlice';
import { useAppSelector } from '../../app/hooks';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: '#FFFFFF',
  fontWeight: 600,
  fontSize: '1.5rem',
  '&:hover': {
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    color: '#B0BEC5',
  },
});

const AppToolBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar
      position="sticky"
      sx={{
        mb: 2,
        backgroundColor: '#121212',
        boxShadow: 'none',
        borderBottom: '1px solid #2C2C2C',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        {/* Left Section: Title */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.5rem',
              color: '#FFFFFF',
            }}
          >
            <StyledLink to="/">Flea Market</StyledLink>
          </Typography>
        </Box>
        <Box>
          {user ? <UserMenu /> : <AnonymousMenu />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolBar;
