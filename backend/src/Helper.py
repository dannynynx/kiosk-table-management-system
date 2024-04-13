import jwt
import sqlite3

SECRET = "BLUEZEBRA"

def generate_token(staff_id):
    try:
        global SECRET
        payload = {'staff_id': staff_id}
        token = jwt.encode(payload, SECRET, algorithm='HS256')
        # print(f"Generated token: {token}, type: {type(token)}")
        return token
    except Exception as e:
        print(f"An error occurred while generating the token: {e}")
        return None


def decode_token(token):
    global SECRET
    if token is None:
        return None
    try:
        decoded = jwt.decode(token, SECRET, algorithms=['HS256'])
        return decoded
    except jwt.InvalidTokenError:
        print("Invalid token.")
        return None

def valid_user(token):
    decoded_token = decode_token(token)
    if decoded_token is None:
        return False

    staff_id = decoded_token.get('staff_id')
    if staff_id is None:
        return False 

    return True

def valid_user_specific(db, token):
    decoded_token = decode_token(token)
    if decoded_token is None:
        return False

    staff_id = decoded_token.get('staff_id')
    if staff_id is None:
        return False

    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    query = "SELECT role FROM STAFF WHERE staff_id = ?"
    cursor.execute(query, (staff_id,))

    result = cursor.fetchone()
    connection.close()
    
    if result:
        return result[0]  # Return the role
    else:
        return None