# import cx_Oracle
# cx_Oracle.init_oracle_client(lib_dir=r"C:\Users\maint\Documents\AdvDb\instantclient-basic-windows.x64-21.3.0.0.0\instantclient_21_3")
# user = "oracle"
# userpwd = "oracleoracle" # Obtain password string from a user prompt or environment variable
# dsn = """(DESCRIPTION =
#     (ADDRESS = (PROTOCOL = TCP)(HOST = i-0bba575020b4e67fc)(PORT = 1521))
#     (CONNECT_DATA =
#       (SERVER = DEDICATED)
#       (SERVICE_NAME = XE)
#     )
#   )"""

# connection = cx_Oracle.connect(user=user, password=userpwd,
#   dsn=dsn,
#   encoding="UTF-8")

# cursor = connection.cursor()
# cursor.execute("""
#         SELECT user
#         FROM dual""")
# for fname in cursor:
#     print("Values:", fname)

import cx_Oracle

cx_Oracle.init_oracle_client(lib_dir=r"C:\Users\maint\Documents\AdvDb\instantclient-basic-windows.x64-21.3.0.0.0\instantclient_21_3")
conn = cx_Oracle.connect('minteri2/minteri2@18.205.219.249/xe') # if needed, place an 'r' before any parameter in order to address special characters such as '\'. For example, if your user name contains '\', you'll need to place 'r' before the user name: user=r'User Name'

c = conn.cursor()

c.execute("""
        SELECT first_name
        FROM user_table""")
for fname in c:
    print("Values:", fname)
