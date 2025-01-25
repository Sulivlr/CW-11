import React from 'react';
import { Item } from '../../../types';
import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import imageNotFound from '../../../assets/images/imagenotfound.jpg';

interface Props {
  items: Item;
}

const ProductItem: React.FC<Props> = ({ items }) => {
  let cardImage = imageNotFound;

  if (items.image) {
    cardImage = `http://localhost:8000/${items.image}`;
  }

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card
        sx={{
          minWidth: '250px',
          maxWidth: '100%',
          margin: 'auto',
          backgroundColor: '#f5f5f5',
          borderRadius: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <CardHeader
          title={items.title}
          titleTypographyProps={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#333',
          }}
          sx={{
            textAlign: 'center',
            borderBottom: '1px solid #ddd',
          }}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '16px',
          }}
        >
          {/* Show image */}
          <Box sx={{ width: '100%', height: 'auto', mb: 2 }}>
            <img
              src={cardImage}
              alt={items.title}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: '#555',
              fontWeight: 500,
            }}
          >
            <strong>Price:</strong> {items.price} $
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'center',
            paddingBottom: '16px',
          }}
        >
          <IconButton
            component={Link}
            to={`/items/${items._id}`}
            sx={{
              backgroundColor: '#1976d2',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#115293',
              },
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
