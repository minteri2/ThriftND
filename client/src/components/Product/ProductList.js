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
  
  const reviews = props.reviews;
  // console.log(reviews);
  const prod_reviews = [];
  if (reviews !== undefined){
    products.map(item => {
      reviews.map(review => {
        if (review.prod_id = item.prod_id) {
          item.rating=review.rating;
        }
      })
    })
  }


  return (
    <ImageList 
      cols={3}
      gap={30}
    >
      {products.map((item, i) => (
        <Link to={`/product/${item.prod_id}`}>
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.prod_name}
              loading="lazy"
            />
          {props.reviews ?
            <ImageListItemBar
              title={item.prod_name}
              subtitle={`$${item.prod_price.toFixed(2)}`}
              actionIcon={
                <Rating name="half-rating-read" defaultValue={item.rating} precision={0.1} readOnly size="small"/>
              }
            />
            :
            <ImageListItemBar
              title={item.prod_name}
              subtitle={`$${item.prod_price.toFixed(2)}`}
            />
          }
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
}