import Parse from "parse";
import axios from 'axios';

export const uploadPic = (file) => {
  const prod_object = new Parse.Object.extend("Products")
  const new_prod = new prod_object();

  const name = "file.PNG";
  const parseFile = new Parse.File(name, file);
  new_prod.set("photo",parseFile);


  return new_prod.save()
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const uploadProduct = (prod, username) => {
  return axios.get(`http://18.205.219.249:5000/addProduct?prod_id=0&username=${username}&prod_name=${prod.prodName}&prod_desc=${prod.prodDesc}&category=${prod.category}&price=${prod.price}&age=${prod.age}&photo=${prod.photo}`).then(
    res => {return res.data;});
}
