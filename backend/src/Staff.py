import sqlite3
import jwt
from Helper import generate_token

def staff_tablet_authentication(db, username, password):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM STAFF WHERE username=? AND password=?", (username, password))
    table_info = cursor.fetchone()

    if table_info is not None:
        # If the user exists, generate a token
        role = table_info[3]  
        token = generate_token(username, password, role)

        cursor.execute("UPDATE STAFF SET token=? WHERE username=? AND password=?", (token, username, password))
        connection.commit() 

        connection.close()

        return token
    else:
        connection.close()
        return None
    
def get_role(db, username, password):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    # Check if the username-password combination exists in the database
    cursor.execute("SELECT role FROM STAFF WHERE username = ? AND password = ?", (username, password))
    result = cursor.fetchone()

    if result:
        role = result[0]
    else:
        role = None

    connection.close()

    return role