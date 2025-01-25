import { useEffect } from 'react';
import { CircularProgress, Grid, Typography, Box, Paper, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { selectOneItem, selectOneItemFetching } from '../itemsSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchOneItem } from '../itemsThunks';
import imageNotFound from '../../../assets/images/imagenotfound.jpg';

const OneItem = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const item = useAppSelector(selectOneItem);
  const isFetching = useAppSelector(selectOneItemFetching);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneItem(id));
    }
  }, [dispatch, id]);

  let cardImage = imageNotFound;
  if (item?.image) {
    cardImage = `http://localhost:8000/${item.image}`;
  }

  return (
    <Grid container direction="column" spacing={4} justifyContent="center" alignItems="center">
      {isFetching ? (
        <CircularProgress sx={{ marginTop: 5 }} />
      ) : item ? (
        <Grid item xs={12} sm={8} md={6}>
          <Paper
            sx={{
              padding: 4,
              borderRadius: 3,
              boxShadow: 5,
              backgroundColor: '#fff',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              {item.title}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <img
                src={cardImage}
                alt={item.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
            </Box>

            <Typography variant="body1" sx={{ color: 'text.secondary', marginBottom: 3 }}>
              {item.description}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 2 }}>
              ${item.price}
            </Typography>

            <Divider sx={{ marginBottom: 2 }} />

            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#555', marginBottom: 1 }}>
              User Information:
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
              <strong>Username:</strong> {item.user.username}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
              <strong>Display Name:</strong> {item.user.displayName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 3 }}>
              <strong>Phone Number:</strong> {item.user.phoneNumber}
            </Typography>
          </Paper>
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Item not found.
        </Typography>
      )}
    </Grid>
  );
};

export default OneItem;
