from flask import Flask
from flask import request
import cx_Oracle

cx_Oracle.init_oracle_client(lib_dir=r"C:\Users\maint\Documents\AdvDb\instantclient-basic-windows.x64-21.3.0.0.0\instantclient_21_3")
# cx_Oracle.init_oracle_client(lib_dir=r"C:\Users\erome\Downloads\instantclient-basic-windows.x64-21.3.0.0.0\instantclient_21_3")

conn = cx_Oracle.connect('minteri2/minteri2@18.205.219.249/xe') # if needed, place an 'r' before any parameter in order to address special characters such as '\'. For example, if your user name contains '\', you'll need to place 'r' before the user name: user=r'User Name'

c = conn.cursor()

app = Flask(__name__)

@app.route("/cart")
def products():
  username = request.args.get('username')
  query =  """
        SELECT *
        FROM cart_item
        WHERE username='""" + str(username) + "'"
  c.execute(query)
  prod_list = []
  data = {}
  products = []
  for p in c:
    prod_list.append(p[1])

  for i in prod_list:
    query =  """
        SELECT prod_name, price, png_file
        FROM product
        WHERE prod_id=""" + str(i)
    
    c.execute(query)
    for j in c:
      curr_prod = {}
      curr_prod['prod_name'] = j[0]
      curr_prod['price'] = j[1]
      curr_prod['png_file'] = j[2]
      products.append(curr_prod)
      data['products'] = products
  print(data)
  print("lala")
  return data

@app.route("/user")
def user():
  data = {}
  username = request.args.get('user')
  query = """
        SELECT *
        FROM user_table
        WHERE username='""" + str(username) + "'"
  c.execute(query)
  for y in c:
    user = {}
    user["username"] = y[0]
    user["first_name"] = y[1]
    user["last_name"] = y[2]
    user["email"] = y[3]
    user["phone"] = y[4]
    user["balance"] = y[6]
  data['user'] = user


  query = """
        SELECT prod_id, prod_name, price, png_file, status
        FROM product
        WHERE username='""" + str(username) + "'"
  c.execute(query)
  products = []
  for y in c:
    product = {}
    product["prod_id"] = y[0]
    product["prod_name"] = y[1]
    product["price"] = y[2]
    product["png_file"] = y[3]
    product["status"] = y[4]
    products.append(product)


  for p in products:
    query = """
        SELECT rating
        FROM review
        WHERE prod_id=""" + str(p['prod_id'])
    c.execute(query)
    for y in c:
      p['rating'] = y[0]
  data['products'] = products
  
  return data


@app.route("/product")
def product():
  prod_id = request.args.get('prod_id')
  query = """
        SELECT *
        FROM product
        WHERE prod_id=""" + str(prod_id)
  c.execute(query)
  for y in c:
    product = {}
    product["prod_id"] = y[0]
    product["seller"] = y[1]
    product["prod_name"] = y[2]
    product["prod_desc"] = y[3]
    product["status"] = y [5]
    product["price"] = y[6]
    product["age"] = y[7]
    product["png_file"] = y[8]
  query = """
        SELECT username, first_name, last_name
        FROM user_table
        WHERE username='""" + str(y[1]) +"'"
  c.execute(query)
  for i in c:
    seller = {}
    seller["username"] = i[0]
    seller['first_name'] = i[1]
    seller["last_name"] = i[2]
  query = """
        SELECT reviewer_username, rating, review_desc
        FROM review
        WHERE prod_id=""" + str(prod_id)
  c.execute(query)
  review = {}
  for f in c:
    review["reviewer_username"] = f[0]
    review["rating"] = f[1]
    review["review_desc"] = f[2]
  data = {}
  data["product"] = product
  data["seller"] = seller
  if review:
    data["review"] = review
  return data


@app.route("/search")
def search():
  data = {}
  q = str(request.args.get('q'))
  q = q.replace("_", " ")
  query = """
        SELECT prod_id, prod_name, price, png_file, status
        FROM product
        WHERE lower(prod_name) like '%""" + q + """%' 
        OR lower(prod_desc) like '%""" + q + """%'
        AND status < 2"""
  c.execute(query)
  products = []
  for y in c:
    product = {}
    product["prod_id"] = y[0]
    product["prod_name"] = y[1]
    product["price"] = y[2]
    product["png_file"] = y[3]
    product["status"] = y[4]
    products.append(product)
  data['products'] = products


  query = """
        SELECT username, first_name, last_name
        FROM user_table
        WHERE lower(username) like '%""" + q + """%' 
        OR lower(concat(first_name, concat(' ', last_name))) like '%""" + q + """%'"""
  c.execute(query)

  users = []
  for y in c:
    user = {}
    user["username"] = y[0]
    user["first_name"] = y[1]
    user["last_name"] = y[2]
    users.append(user)
  data['users'] = users
  
  return data

if __name__ == "__main__":
  app.run()