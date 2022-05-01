import Parse from "parse";
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
  return fetch(`/addProduct?prod_id=0&username=${username}&prod_name=${prod.prodName}&prod_desc=${prod.prodDesc}&category=${prod.category}&price=${prod.price}&age=${prod.age}&photo=${prod.photo}`).then(
    res => res.json()
  ).then(
    data => {return data}
  );
}
