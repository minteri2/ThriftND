import * as React from 'react';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating
} from '@mui/material';

export default function ProductList(props) {
  const itemData = props.products;

  

  return (
    <ImageList 
      cols={3}
      gap={30}
    >
      {props.products.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        {props.type === 'sold' ?
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <Rating name="half-rating-read" defaultValue={3.54} precision={0.1} readOnly size="small"/>
            }
          />
          :
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
          />
        }
        </ImageListItem>
      ))}
    </ImageList>
  );
}