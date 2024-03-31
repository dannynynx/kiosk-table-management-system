import jwt
from jwt.exceptions import DecodeError

SECRET = "BLUEZEBRA"

def generate_token(username, password, role):
    global SECRET

    payload = {
        'username': username,
        'password': password,
        'role': role
    }
    token = jwt.encode(payload, SECRET, algorithm='HS256')
    return token

def decode_token(token):
    global SECRET
    if token is None:
        raise ValueError("Token cannot be None")
    if not isinstance(token, bytes):
        token = token.encode()  # Encode to bytes if not already
    try:
        decode = jwt.decode(token, SECRET, algorithms=['HS256'])
        return decode
    except jwt.DecodeError as e:
        raise DecodeError(f"Invalid token: {e}")

def decode_token_get_role(token):
    decoded = decode_token(token)
    return decoded.get('role')

def valid_user(token):
    decoded_token = decode_token(token)
    return decoded_token is not None

def valid_user_specific(db, token, required_role):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    query = "SELECT role FROM STAFF WHERE token = ?"
    cursor.execute(query, (token,))
    result = cursor.fetchone()

    connection.close()

    if result and result[0].lower() == required_role.lower():
        return True
    return False