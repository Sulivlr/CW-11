import {NavLink, useParams} from 'react-router-dom';
import { Grid, List, ListItemText, Typography, Paper, ListItemButton } from '@mui/material';
import { CATEGORIES } from '../../constants';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectItems} from './itemsSlice';
import ProductItem from './components/ProductItem';
import {useEffect} from 'react';
import {fetchItems} from './itemsThunks';

const Items = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const {categoryId} = useParams();
  let pageTitle = "All Items";
  if (categoryId !== undefined) {
    const currentCategory = CATEGORIES.find(category => category._id === categoryId);
    if (currentCategory) {
      pageTitle = currentCategory.title;
    } else {
      pageTitle = "Does not exist!";
    }
  }

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <List component="nav" sx={{ backgroundColor: 'background.paper', borderRadius: 1 }}>
            <ListItemButton
              component={NavLink}
              to="/"
              sx={{
                borderRadius: 1,
                padding: '8px 16px',
                '&.active': {
                  backgroundColor: '#1976d2',
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor: '#f1f1f1',
                },
              }}
            >
              <ListItemText primary="All Items" />
            </ListItemButton>
            {CATEGORIES.map((category) => (
              <ListItemButton
                key={category._id}
                component={NavLink}
                to={`/category/${category._id}`}
                sx={{
                  borderRadius: 1,
                  padding: '8px 16px',
                  '&.active': {
                    backgroundColor: '#1976d2',
                    color: 'white',
                  },
                  '&:hover': {
                    backgroundColor: '#f1f1f1',
                  },
                }}
              >
                <ListItemText primary={category.title} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {pageTitle}
        </Typography>
        <Grid item container spacing={2}>
          {items.map((item) => (
            <ProductItem
              key={item._id}
              items={item}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Items;
