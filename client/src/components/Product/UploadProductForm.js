import React from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

export default function UploadProductForm({ onChange, onClick }) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      rowSpacing={2}
    >
      <h1>Upload Product Below:</h1>
      <Grid container justifyContent='space-around' sx={{marginBottom: '20px'}}>
        <input
          type="file"
          id="file-input"
          accept="image/png, image/jpeg"
          onChange={onChange}
          required
          name="photo"
        />
        </Grid>
        <Grid container justifyContent='space-around' sx={{marginBottom: '20px'}}>
          <Grid item xs={4}  md={3} lg={2}> 
          <FormControl fullWidth>       
            <TextField
              required
              id="prod_name-input"
              label="Product Name"
              placeholder="Product Name"
              name="prodName"
              onChange={onChange}
            />
            </FormControl>
          </Grid>
      </Grid>
      <Grid container justifyContent='space-around' sx={{marginBottom: '20px'}}>
        <Grid item xs={4}  md={3} lg={2}>
        <FormControl fullWidth>
          <TextField
              id="prod_desc-input"
              label="Product Description"
              multiline
              placeholder="Product Description"
              name="prodDesc"
              onChange={onChange}
            />
            </FormControl>
        </Grid> 
      </Grid>
      <Grid container justifyContent='space-around' sx={{marginBottom: '20px'}}>
        <Grid item xs={4}  md={3} lg={2} >
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              label="Category"
              onChange={onChange}
              name="category"
            >
              <MenuItem value='clothing'>Clothing</MenuItem>
              <MenuItem value='books'>Books</MenuItem>
              <MenuItem value='sports'>Sports</MenuItem>
              <MenuItem value='furniture'>Furniture</MenuItem>
              <MenuItem value='other'>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      
      </Grid>
      <Grid container justifyContent='space-around' sx={{marginBottom: '20px'}}>
      <Grid item xs={4}  md={3} lg={2}>
      <FormControl fullWidth>
      <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            onChange={onChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            name="price"
          />
        </FormControl>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-around' sx={{marginBottom: '20px'}}>
      <Grid item xs={4}  md={3} lg={2}>
      <FormControl fullWidth>
        <TextField
          id="age-input"
          label="Age (years)"
          name="age"
          onChange={onChange}
          defaultValue="0"
        />
        </FormControl>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-around' >
        <Button variant="contained" onClick={onClick}>Upload</Button>         
      </Grid>
    </Grid>
       
  );
}