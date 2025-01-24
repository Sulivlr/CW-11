import {Route, Routes} from 'react-router-dom';
import AppToolBar from './UI/AppBar/AppToolBar';
import {Container, Typography} from '@mui/material';
import Register from './feauters/users/Register';
import Login from './feauters/users/Login';

const App = () => {
  return (
    <>
      <header>
        <AppToolBar/>
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<Typography variant="h1">Page Doesn't Exist</Typography>}/>
        </Routes>
      </Container>
    </>

  );
};

export default App;
