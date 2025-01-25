import {Typography} from '@mui/material';
import ItemForm from '../ItemForm';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {createItem} from '../itemsThunks';
import {ItemMutation} from '../../../types';
import {selectItemCreating} from '../itemsSlice';

const NewItem = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectItemCreating);

  const onFormSubmit = async (itemMutation: ItemMutation) => {
    console.log(itemMutation);
    await dispatch(createItem(itemMutation)).unwrap();
    navigate('/')
  }

  return (
    <>
      <Typography variant="h6" sx={{mb: 2}}>New Item</Typography>
      <ItemForm onSubmit={onFormSubmit} isLoading={isCreating} />
    </>
  );
};

export default NewItem;