import React from 'react';
import {Item} from '../../../types';
import {Card, CardActions, CardContent, CardHeader, Grid, IconButton} from '@mui/material';
import {Link} from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

  interface Props {
    items: Item;
  }

const ProductItem: React.FC<Props> = ({items}) => {

  return (
    <Grid item>
      <Card>
        <CardHeader title={items.title} />
        <CardContent>
          <strong>
            Price: {items.price} $
          </strong>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={`/items/${items._id}`}>
            <ArrowForwardIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;