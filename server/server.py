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

@app.route("/send")
def send():
  username = request.args.get('username')
  chat_id = request.args.get('chat_id')
  mess = request.args.get('message')

  # query =  """exec send_message("""+str(chat_id)+""",'"""+str(mess)+"""', '"""+str(username)+"""')"""
  # proc =  """begin
  #               send_message(47,'holaaaa', 'hlove');
  #             end"""
  
  try:
    c.callproc('send_message',[chat_id,mess,username])
    conn.commit()
    timestamp = c.callfunc('get_time', str)
    return {'message': 
    {
      'message_desc': str(mess),
      'alignment': 'right',
      'timestamp': timestamp
    }}
  except cx_Oracle.IntegrityError as e:
    err, = e.args
    if err.code == 1:
      return {'error': 'Failed to send message.'}
    return {'error': err.message}

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

###############GROUPS####################
@app.route("/groups")
def groups():
  username_input = request.args.get('username')

  query =  """
        SELECT get_memberships('"""+str(username_input)+"""') from dual"""
  c.execute(query)

  cursor, = c.fetchone()
  data = {}
  data['groups'] = []
  for x in cursor:
    curr_group = {}
    curr_group['group_id'] = x[0]
    curr_group['group_name'] = x[1]
    curr_group['new_posts'] = x[2]
    data['groups'].append(curr_group)
 
  return data

@app.route("/grouppost")
def grouppost():
  group_id = request.args.get('group_id')
  username_input = request.args.get('username')
  query =  """
        select get_group_posts("""+str(group_id)+""",'"""+str(username_input)+"""') from dual"""
  c.execute(query)

  cursor, = c.fetchone()
  data = {}
  data['posts'] = []
  for x in cursor:
    curr_post = {}
    curr_post['poster'] = x[0]
    curr_post['post_desc'] = x[1]
    curr_post['timestamp'] = x[2]
    curr_post['seen'] = x[3]
    data['posts'].append(curr_post)

  return data


@app.route("/addpost")
def addpost():
  username_input = request.args.get('username')
  group_id = request.args.get('group_id')
  post_desc = request.args.get('post_desc')
  try:
    c.callproc('add_post',[username_input,post_desc,group_id])
    conn.commit()
    timestamp = c.callfunc('get_time', str)
    return {'post': 
    {
      'post_desc': str(post_desc),
      'poster': str(username_input),
      'timestamp': timestamp,
      'seen' : 0
    }}

  except cx_Oracle.IntegrityError as e:
    err, = e.args
    if err.code == 1:
      return {'error': 'Failed to add post.'}
    return {'error': err.message}

@app.route("/creategroup")
def creategroup():
  groupname_input = request.args.get('groupname')
  groupdesc_input = request.args.get('groupdesc')
  groupcreator_input = request.args.get('username')
  try:
    c.callproc('insert_group',[groupname_input, groupdesc_input])
    conn.commit()
  except cx_Oracle.IntegrityError as e:
    err, = e.args
    if err.code == 1:
      return {'error': 'Failed to create group.'}
    return {'error': err.message}
  query =  """
        select get_curr_groupid from dual"""
  c.execute(query)

  cursor, = c.fetchone()
  try:
    c.callproc('insert_membership',[groupcreator_input, cursor])
    conn.commit()
  except cx_Oracle.IntegrityError as e:
    err, = e.args
    if err.code == 1:
      return {'error': 'Failed to insert membership.'}
    return {'error': err.message}
  try:
    c.callproc('add_post',[groupcreator_input,str(str(groupcreator_input)+" created this group"),cursor])
    conn.commit()
    return {'success': 'success'}
  except cx_Oracle.IntegrityError as e:
    err, = e.args
    if err.code == 1:
      return {'error': 'Failed to add post.'}
    return {'error': err.message}
  return {'message': 'Successfully created group!'}


###############CHATS################
@app.route("/chats")
def chats():
  username_input = request.args.get('username')

  query =  """
        SELECT get_chats('""" + str(username_input) + """')
        FROM dual"""
  c.execute(query)

  cursor, = c.fetchone()
  data = {}
  data['chats'] = []
  for x in cursor:
    chat = {}
    chat['chat_id'] = x[0]
    chat['name'] = x[2]
    # chat['unread'] = x[3]
    data['chats'].append(chat)
    
   
  return data
@app.route("/newchat")
def newchat():
  username_1 = request.args.get('username_1')
  username_2 = request.args.get('username_2')
  try:
    c.callproc('insert_chat',[username_1,username_2])
    conn.commit()
    chatid = c.callfunc('get_chat',int)
    print(chatid)
    return {'success': str(chatid)}
  except cx_Oracle.IntegrityError as e:
    err, = e.args
    if err.code == 1:
      return {'error': 'Failed to add chat.'}
    return {'error': err.message}
  return 'lal'

@app.route("/chat")
def chat():
  username_input = request.args.get('username')
  chat_id = request.args.get('chat_id')
  data = {}
  
  query =  """
      SELECT get_messages(""" + str(chat_id) + """,'""" +str(username_input)+"""')
      FROM dual"""
  c.execute(query)
  cursor, = c.fetchone()
  data['messages'] = []
  for i in cursor:
    curr_mess = {}
    curr_mess['message_desc'] = i[0]
    curr_mess['timestamp'] = i[1]
    curr_mess['alignment'] = i[2]
    data['messages'].append(curr_mess)
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

@app.route("/addProduct")
def addProd():
  username = request.args.get('username')
  pname = request.args.get('prod_name')
  pdesc = request.args.get('prod_desc')
  category = request.args.get('category')
  price = request.args.get('price')
  age = request.args.get('age')
  photo = request.args.get('photo')


  try:
    return_val = c.callfunc("upload_prod", str, [username, pname, pdesc, category, price, age, photo])
    conn.commit()
    if return_val =='success':
      return {'success': 'success'}
    else:
      
      if '02290' in return_val:
        if 'AGE' in returv_val:
          return {'error': 'Age has to be >= 0'}
        elif 'PRICE' in err.message:
          return {'error': 'Price has to be > 0'}
      elif '01400' in return_val:
        if 'PROD_NAME' in err.message:
          return {'error': 'Product name is required.'}
        elif 'CATEGORY' in err.message:
          return {'error': 'Category is required.'}
        elif 'PRICE' in err.message:
          return {'error': 'Price is required.'}
      
    return {'error': err.message}
  except:
    return {'error':'error'}

#############CHECHOUT################
@app.route("/getpayments")
def getpayments():
  data = {}
  username = request.args.get('username')
  query = """SELECT pay_method_id, card_number, TO_CHAR(expiration_date, 'MM/YY') FROM payment_method where username = '"""+str(username)+"""'"""
  c.execute(query)
  data['payment_methods'] = []
  for i in c:
    curr_payment = {}
    curr_payment['payment_method_id'] = i[0]
    curr_payment['card_number'] = str(i[1])
    curr_payment['exp_date'] = str(i[2])
    data['payment_methods'].append(curr_payment)
  print(data)

  return data



@app.route("/checkout")
def checkout():
  data = {}
  username = request.args.get('username')
  pay_method = request.args.get('pay')
 

  query = """
  SELECT get_total_checkout('""" + str(username) + """') from dual"""
  c.execute(query)
  total = 0
  for i in c:
    total = i[0]
  query =  """
        SELECT prod_id
        FROM cart_item
        WHERE username='""" + str(username) + "'"
  
  c.execute(query)
  products = []
  for i in c:
    products.append(i[0])

  c.callproc('add_order',[username,total])
  conn.commit()
  order_id = c.callfunc("get_curr_order_id", int)
  c.callproc('add_ct', [order_id, pay_method, total, username])
  conn.commit()
  for prod in products:
    c.callproc('add_order_item',[order_id,prod])
    conn.commit()
  
  return {'success': "success"}

@app.route("/search")
def search():
  data = {}
  q = str(request.args.get('q'))
  query = """
        SELECT prod_id, prod_name, price, png_file, status
        FROM product
        WHERE (lower(prod_name) like '%""" + q.lower() + """%' 
        OR lower(prod_desc) like '%""" + q.lower() + """%')
        AND status = 0
        AND rownum <= 20"""
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