from flask import Flask
from flask import request
import cx_Oracle

cx_Oracle.init_oracle_client(lib_dir=r"C:\Users\maint\Documents\AdvDb\instantclient-basic-windows.x64-21.3.0.0.0\instantclient_21_3")
conn = cx_Oracle.connect('minteri2/minteri2@18.205.219.249/xe') # if needed, place an 'r' before any parameter in order to address special characters such as '\'. For example, if your user name contains '\', you'll need to place 'r' before the user name: user=r'User Name'

c = conn.cursor()

app = Flask(__name__)

@app.route("/products")
def products():
  return {"products": [
    {
      "prod_id": 1,
      "seller_id": 0,
      "prod_timestamp": 0,
      "prod_name": 'Football Ticket vs. Clemson',
      "prod_desc": 'Clarks Golden Suede Wooden Heeled Loafers. A fun shade of a golden mustard yellow suede with a nice thick wooden sole, tan laces, and a great rubberized sole. In great condition with some signs of wear. These are from 2016. The heel measures 2 in height. Insoles measure 9.5. Tagged a US Womens size 8.5.',
      "prod_category": "Sports",
      "prod_status": 0,
      "prod_price": 150.00,
      "img": 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
    },
    {
      "prod_id": 2,
      "seller_id": 0,
      "prod_timestamp": 0,
      "prod_name": 'Burger',
      "prod_desc": 'Clarks Golden Suede Wooden Heeled Loafers. A fun shade of a golden mustard yellow suede with a nice thick wooden sole, tan laces, and a great rubberized sole. In great condition with some signs of wear. These are from 2016. The heel measures 2 in height. Insoles measure 9.5. Tagged a US Womens size 8.5.',
      "prod_category": "Food",
      "prod_status": 1,
      "prod_price": 10.00,
      "img": 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'
      },
    {
      "prod_id": 3,
      "seller_id": 1,
      "prod_timestamp": 0,
      "prod_name": 'Camera',
      "prod_desc": 'Clarks Golden Suede Wooden Heeled Loafers. A fun shade of a golden mustard yellow suede with a nice thick wooden sole, tan laces, and a great rubberized sole. In great condition with some signs of wear. These are from 2016. The heel measures 2 in height. Insoles measure 9.5. Tagged a US Womens size 8.5.',
      "prod_category": "Technology",
      "prod_status": 0,
      "prod_price": 50.00,
      "img": 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'
    },
    {
      "prod_id": 4,
      "seller_id": 0,
      "prod_timestamp": 0,
      "prod_name": 'Coffee',
      "prod_desc": 'Clarks Golden Suede Wooden Heeled Loafers. A fun shade of a golden mustard yellow suede with a nice thick wooden sole, tan laces, and a great rubberized sole. In great condition with some signs of wear. These are from 2016. The heel measures 2 in height. Insoles measure 9.5. Tagged a US Womens size 8.5.',
      "prod_category": "Food",
      "prod_status": 1,
      "prod_price": 5.50,
      "img": 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c'
    },
    {
      "prod_id": 5,
      "seller_id": 1,
      "prod_timestamp": 0,
      "prod_name": 'Hats',
      "prod_desc": 'Clarks Golden Suede Wooden Heeled Loafers. A fun shade of a golden mustard yellow suede with a nice thick wooden sole, tan laces, and a great rubberized sole. In great condition with some signs of wear. These are from 2016. The heel measures 2 in height. Insoles measure 9.5. Tagged a US Womens size 8.5.',
      "prod_category": "Clothing",
      "prod_status": 0,
      "prod_price": 25.50,
      "img": 'https://images.unsplash.com/photo-1533827432537-70133748f5c8'
    }
  ],
  "users": [
    {
      "user_id": 0,
      "username": 'minteri2',
      "first_name": 'Mauricio',
      "last_name": 'Interiano',
      "email": 'minteri2@nd.edu',
      "phone": '+1 713-502-9151',
      "user_addr": "blabla",
      "user_pass": "password",
      "user_timestamp": 0,
      "img": 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'
    },
    {
      "user_id": 1,
      "username": 'eromero4',
      "first_name": 'Estefania',
      "last_name": 'Romero',
      "email": 'eromero4@nd.edu',
      "phone": '+1 574-855-6243',
      "user_addr": "blabla",
      "user_pass": "password",
      "user_timestamp": 0,
      "img": 'https://images.unsplash.com/photo-1533827432537-70133748f5c8'
    }
  ],
  "cart_items": [
    {
      "user_id": 0,
      "prod_id": 5
    },
    {
      "user_id": 0,
      "prod_id": 3
    },
    {
      "user_id": 1,
      "prod_id": 1
    }
  ],
  "reviews": [
    {
      "prod_id": 2,
      "rating": 4.5,
      "review_desc": "Great glasses, I'm sure, but I returned them because they claimed these are polarized. The ones I received were definitely not polarized. If they are truly Ray Bans and Polarized, it will say Ray Ban P in the corner of the lens instead of just Ray Ban."
    },
    {
      "prod_id": 4,
      "rating": 2,
      "review_desc": "Great glasses, I'm sure, but I returned them because they claimed these are polarized. The ones I received were definitely not polarized. If they are truly Ray Bans and Polarized, it will say Ray Ban P in the corner of the lens instead of just Ray Ban."
    }
  ]}

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


if __name__ == "__main__":
  app.run()