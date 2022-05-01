from flask import Flask
from flask import request
import cx_Oracle

# cx_Oracle.init_oracle_client(lib_dir=r"C:\Users\maint\Documents\AdvDb\instantclient-basic-windows.x64-21.3.0.0.0\instantclient_21_3")
cx_Oracle.init_oracle_client(lib_dir=r"C:\Users\erome\Downloads\instantclient-basic-windows.x64-21.3.0.0.0\instantclient_21_3")

conn = cx_Oracle.connect('minteri2/minteri2@18.205.219.249/xe') # if needed, place an 'r' before any parameter in order to address special characters such as '\'. For example, if your user name contains '\', you'll need to place 'r' before the user name: user=r'User Name'
c = conn.cursor()


app = Flask(__name__)
# class DataStore():
#     user = None

# data = DataStore()

######################## AUTHENTICATION SERVICES ########################

@app.route("/login")
def login():
  username = request.args.get('username')
  password = request.args.get('password')
  query =  """
        SELECT login('""" + str(username) + "','" + str(password) + """')
        FROM dual"""
  c.execute(query)
  
  obj, = c.fetchone()
  user = {}
  attrs = []
  for attr in obj.type.attributes:
    attrs.append(getattr(obj, attr.name))

  user['isAuthenticated'] = attrs[0]
  user['username'] = attrs[1]
  return user
  

@app.route("/register")
def register():
  username = request.args.get('username')
  fname = request.args.get('fname')
  lname = request.args.get('lname')
  email = request.args.get('email')
  phone = ''
  password = request.args.get('password')
  if request.args.get('phone'):
    phone = str(request.args.get('phone'))
    numeric_filter = filter(str.isdigit, phone)
    phone = "".join(numeric_filter)

  query =  """
        INSERT INTO user_table
        VALUES('""" + str(username) + "','" + str(fname) + "','" + str(lname) + "','" + str(email) + "','" + phone + "','" + str(password) + "',0)"

  try:
    c.execute(query)
    conn.commit()
    return {'success': 'success'}
  except cx_Oracle.IntegrityError as e:
    err, = e.args
    if err.code == 1:
      if 'SYS_C0013353' in err.message:
        return {'error': 'Username already exists.'}
      elif 'EMAIL' in err.message:
        return {'error': 'Email has already been used.'}
    elif err.code == 2290:
      if 'EMAIL_ND' in err.message:
        return {'error': 'Email has to be an nd email (i.e. ramzi@nd.edu).'}
      elif 'PASSWORD_LEN' in err.message:
        return {'error': 'Password has to be at least 8 characters.'}
      elif 'USERNAME_LEN' in err.message:
        return {'error': 'Username has to be at least 3 characters.'}
      elif 'PHONE_US' in err.message:
        return {'error': 'Phone has to be a valid US phone (10 digits)'}
    elif err.code == 1400:
      if 'USERNAME' in err.message:
        return {'error': 'Username is required.'}
      elif 'FIRST_NAME' in err.message:
        return {'error': 'First name is required.'}
      elif 'LAST_NAME' in err.message:
        return {'error': 'Last name is required.'}
      elif 'EMAIL' in err.message:
        return {'error': 'Email is required.'}
      elif 'USER_PASS' in err.message:
        return {'error': 'Password is required.'}
      
    return {'error': err.message}
  
######################## CART: GET, INSERT ########################

@app.route("/cart")
def products():
  username = request.args.get('username')
  query =  """
        SELECT prod_id
        FROM cart_item
        WHERE username='""" + str(username) + "'"
  c.execute(query)
  prod_list = list(c)

  query =  """
        SELECT prod_id
        FROM reservation
        WHERE username='""" + str(username) + "'"
  c.execute(query)
  reserv_list = list(c)
  data = {}
  products = []
  reservations = []
  

  for i in prod_list:
    query =  """
        SELECT prod_id, prod_name, price, png_file, status
        FROM product
        WHERE prod_id=""" + str(i[0])
    
    c.execute(query)
    for j in c:
      curr_prod = {}
      curr_prod['prod_id'] = j[0]
      curr_prod['prod_name'] = j[1]
      curr_prod['price'] = j[2]
      curr_prod['png_file'] = j[3]
      curr_prod['status'] = j[4]
      curr_prod['inCart'] = 0
      products.append(curr_prod)
      if i in reserv_list:
        producto = curr_prod.copy()
        producto['inCart'] = 1
        reservations.append(producto)


  for i in reserv_list:
    if i not in prod_list:

      query =  """
          SELECT prod_id, prod_name, price, png_file, status
          FROM product
          WHERE prod_id=""" + str(i[0])
      
      c.execute(query)
      for j in c:
        curr_prod = {}
        curr_prod['prod_id'] = j[0]
        curr_prod['prod_name'] = j[1]
        curr_prod['price'] = j[2]
        curr_prod['png_file'] = j[3]
        curr_prod['status'] = j[4]
        curr_prod['inCart'] = 0
        reservations.append(curr_prod)

  data['products'] = products
  data['reservations'] = reservations
  return data

@app.route("/addCart")
def addCart():
  username = request.args.get('username')
  prod_id = request.args.get('prod_id')
  query =  """
        INSERT INTO cart_item
        VALUES ('""" + str(username) + "'," + str(prod_id) + ")"
  try:
    c.execute(query)
    conn.commit()
    return {'success': 'success'}
  except cx_Oracle.IntegrityError as e:
    err, = e.args
    if err.code == 1:
      return {'error': 'This item is already in your cart.'}
    return {'error': err.message}

@app.route("/removeCart")
def removeCart():
  username = request.args.get('username')
  prod_id = request.args.get('prod_id')
  query =  """
        DELETE FROM cart_item
        WHERE username='""" + str(username) + "' AND prod_id=" + str(prod_id)
  try:
    c.execute(query)
    conn.commit()
    return {'removed': int(prod_id)}
  except cx_Oracle.IntegrityError as e:
    err, = e.args
    if err.code == 1:
      return {'error': 'This item is already in your cart.'}
    return {'error': err.message}

@app.route("/reserve")
def reserve():
  username = request.args.get('username')
  prod_id = request.args.get('prod_id')
  query =  """
        INSERT INTO reservation
        VALUES (""" + str(prod_id) + ",'" + str(username) + "',sysdate)"
  try:
    c.execute(query)
    conn.commit()
    return {'success': 'success'}
  except cx_Oracle.IntegrityError as e:
    err, = e.args
    if err.code == 1:
      return {'error': 'This item is already reserved.'}
    return {'error': err.message}

@app.route("/unreserve")
def unreserve():
  prod_id = request.args.get('prod_id')
  query =  """
        DELETE FROM reservation
        WHERE prod_id=""" + str(prod_id)
  try:
    c.execute(query)
    conn.commit()
    return {'success': 'success'}
  except cx_Oracle.IntegrityError as e:
    err, = e.args
    if err.code == 1:
      return {'error': 'This item does not exist.'}
    return {'error': err.message}

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

# CHATS
@app.route("/chats")
def chats():
  username_input = request.args.get('username')

  query =  """
        SELECT get_chats('""" + str(username_input) + """')
        FROM dual"""
  c.execute(query)

  cursor, = c.fetchone()
  data = {}
  for x in cursor:
    print(x)
    if x[1] not in data:
      data[x[1]] = []
    data[x[1]].append([x[2], x[3], x[4], x[5]])
  print(data)

    
  return ';a;a;'



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
        WHERE (lower(prod_name) like '%""" + q.lower() + """%' 
        OR lower(prod_desc) like '%""" + q.lower() + """%')
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
        WHERE lower(username) like '%""" + q.lower() + """%' 
        OR lower(concat(first_name, concat(' ', last_name))) like '%""" + q.lower() + """%'"""
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