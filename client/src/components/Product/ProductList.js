import * as React from 'react';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating
} from '@mui/material';
import { Link } from 'react-router-dom';


export default function ProductList({ products, user, cartItems }) {

  return (
    <ImageList 
      cols={3}
      gap={30}
    >
      {products.map((prod, i) => (
        <Link to={{
          pathname: `/product/${prod.prod_id}`,
          state: {
            user: user,
            cartItems: cartItems
          }}}>
          <ImageListItem key={i}>
            <img
              src={`${prod.png_file}`}
              srcSet={`${prod.png_file}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={prod.prod_name}
              loading="lazy"
            />
          {prod.hasOwnProperty("rating") ?
            <ImageListItemBar
              title={prod.prod_name}
              subtitle={`$${prod.price.toFixed(2)}`}
              actionIcon={
                <Rating name="half-rating-read" defaultValue={prod.rating} precision={0.1} readOnly size="small"/>
              }
            />
            :
            <ImageListItemBar
              title={prod.prod_name}
              subtitle={`$${prod.price.toFixed(2)}`}
            />
          }
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
}