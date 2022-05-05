import React, { useState, useEffect } from "react";
import { Redirect, useParams, useLocation, useHistory } from "react-router-dom";
import { 
  Grid,
  Typography ,
  Box,
  Button,
  Rating
} from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { addToCart, reserveItem } from "../Cart/CartService";
import { uploadPic, uploadProduct } from "./UploadService";
import UploadProductForm from "./UploadProductForm";

export default function UploadProductPage() {
  const location = useLocation();


  const history = useHistory();

  // const [prod, setProd] = useState([{}]);
  const [pic, setPic] = useState(false)
  const [add, setAdd] = useState(false);
  const [prod, setProd] = useState({
    prodName: "",
    prodDesc: "",
    category: "",
    price: "",
    age: 0
  });

  useEffect(() => {
  //   if (!fetched) {
  //     fetch(`/product?prod_id=${product_id}`).then(
  //       res => res.json()
  //     ).then(
  //       data => {
  //         setProd(data)
  //         setFetched(true);
  //         console.log(data);
  //       }
  //     )
  //   }

    if (pic) {
      if (prod.photo) {
        uploadPic(prod.photo).then(
          data => {
            const file = data.get("photo");
            const url = file.url();
            setProd({
              ...prod,
              "photo_url": url
            })
            setPic(false);
          });
      }
      else {
        alert('Missing image file');
        setPic(false);
      }
    }

    if (add && !pic && prod.photo) {
      uploadProduct(prod, location.state.user).then(
        data => {
          if(data.hasOwnProperty("error")) {
            alert(data.error);
          }
          else {
            alert(`New product succesfully uploaded`);
            history.push({
              pathname: `/user/${location.state.user}`,
              state: {
                user: location.state.user
              }});;
          }
        })
      setAdd(false);
  //   }
  
  // )
}

  }, [add, pic])

  if (typeof location.state === 'undefined') {
    alert('You are not logged in');
    return <Redirect to='/login'/>
  }

  const onClickHandler = () => {
    setAdd(true);
    setPic(true);
  }

  const onChangeHandler = (e) => {
    e.preventDefault();

    if (e.target.name !== 'photo'){
      setProd({
        ...prod,
        [e.target.name]: e.target.value
      })
    }
    else {
      setProd({
        ...prod,
        [e.target.name]: e.target.files[0]
      })
    }

    
    
  }

  
  return (
    <div>
      <Navbar user={location.state.user} />
      <UploadProductForm onClick={onClickHandler} onChange={onChangeHandler}/>
      
    </div>
  );
}

