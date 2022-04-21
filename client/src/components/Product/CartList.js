import * as React from 'react';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating
} from '@mui/material';

export default function CartList(props) {
  const itemData = props.products;

  

  return (
    <ImageList 
      cols={1}
      gap={30}
    >
      {props.products.map((item) => (
        <ImageListItem key={item.img}>
        <img
          src={`${item.img}?w=248&fit=crop&auto=format`}
          srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={item.title}
          loading="lazy"
        />
        <ImageListItemBar
          title={item.title}
          subtitle={<span>by: {item.author}</span>}
          position="below"
        />
      </ImageListItem>
      ))}
    </ImageList>
  );
}