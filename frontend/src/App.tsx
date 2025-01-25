import {Route, Routes, useNavigate} from 'react-router-dom';
import AppToolBar from './UI/AppBar/AppToolBar';
import {Container, Typography} from '@mui/material';
import Register from './feauters/users/Register';
import Login from './feauters/users/Login';
import ItemForm from './feauters/items/ItemForm';
import Items from './feauters/items/Items';
import {useAppDispatch, useAppSelector} from './app/hooks';
import { selectItemCreating } from './feauters/items/itemsSlice';
import {ItemMutation} from './types';
import {createItem} from './feauters/items/itemsThunks';

const App = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectItemCreating);

  const onFormSubmit = async (itemMutation: ItemMutation) => {
    console.log("onFormSubmit called with:", itemMutation);
    await dispatch(createItem(itemMutation));
    navigate('/');
  };

  return (
    <>
      <header>
        <AppToolBar/>
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Items/>} />
          <Route path="/category/:categoryId" element={<Items/>} />
          <Route path="/new-item" element={<ItemForm onSubmit={onFormSubmit} isLoading={isCreating} />} />
          <Route path="*" element={<Typography variant="h1">Page Doesn't Exist</Typography>}/>
        </Routes>
      </Container>
    </>

  );
};

export default App;
