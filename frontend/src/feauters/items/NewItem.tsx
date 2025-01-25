import React, {useState} from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import FileInput from '../../UI/FileInput/FileInput';
import {CATEGORIES} from '../../constants';
import {ItemMutation} from '../../types';

const NewItem = () => {
  const [state, setState] = useState<ItemMutation>({
    title: '',
    description: '',
    price: 0,
    image: null,
    category: ''
  });

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <Grid container spacing={3} sx={{mx: 'auto', width: '60%', mt: 5, mb: 5}}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{
              fontSize: '32px',
              color: 'rgba(41, 43, 42, 0.82)',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Create New Item
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            value={state.title}
            onChange={onFieldChange}
            variant="outlined"
            label="Title"
            id="title"
            name="title"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            multiline
            required
            value={state.description}
            onChange={onFieldChange}
            variant="outlined"
            placeholder="description"
            minRows={3}
            label="Description"
            id="description"
            name="description"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            value={state.price}
            onChange={onFieldChange}
            variant="outlined"
            type="number"
            label="Price"
            id="price"
            name="price"
            inputProps={{
              min: 0,
              step: 0.01,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="category">Category</InputLabel>
            <Select
              required
              id="category"
              value={state.category}
              onChange={onFieldChange}
              name="category"
              label="Category"
              sx={{textAlign: 'left'}}
            >
              <MenuItem value="">Select Category</MenuItem>
              {CATEGORIES.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{textAlign: 'center'}}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              padding: '10px 30px',
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          >
            Create Item
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewItem;
