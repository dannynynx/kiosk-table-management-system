import jwt
from jwt.exceptions import DecodeError

SECRET = "BLUEZEBRA"

def generate_token(staff_id):
    global SECRET

    payload = {
        'staff_id': staff_id
    }
    token = jwt.encode(payload, SECRET, algorithm='HS256')
    return token

def decode_token(token):
    global SECRET
    if token is None:
        return None
    if not isinstance(token, bytes):
        token = token.encode()  # Encode to bytes if not already
    decoded = jwt.decode(token, SECRET, algorithms=['HS256'])
    return decoded

def valid_user(token):
    decoded_token = decode_token(token)
    if decoded_token is None:
        return False

    staff_id = decoded_token.get('staff_id')
    if staff_id is None:
        return False

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