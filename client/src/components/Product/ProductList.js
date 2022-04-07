import * as React from 'react';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating
} from '@mui/material';
import { Link } from 'react-router-dom';


export default function ProductList(props) {
  const products = props.products; 

  return (
    <ImageList 
      cols={3}
      gap={30}
    >
      {products.map((item) => (
        <Link to={`/product/${item.prod_id}`}>
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.prod_name}
              loading="lazy"
            />
          {props.type === 'sold' ?
            <ImageListItemBar
              title={item.prod_name}
              subtitle={item.prod_price}
              actionIcon={
                <Rating name="half-rating-read" defaultValue={3.54} precision={0.1} readOnly size="small"/>
              }
            />
            :
            <ImageListItemBar
              title={item.prod_name}
              subtitle={item.prod_price}
            />
          }
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
}