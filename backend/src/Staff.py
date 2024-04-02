import sqlite3
import jwt
from Helper import generate_token, valid_user, decode_token, valid_user_specific

def staff_tablet_authentication(db, username, password):
    connection = None
    try:
        connection = sqlite3.connect(db)
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM STAFF WHERE username=? AND password=?", (username, password))
        table_info = cursor.fetchone()

        if table_info is not None:
            # If the user exists, generate a token
            staff_id = table_info[0] 
            token = generate_token(staff_id)
            table_id = get_role(db, username, password)

            cursor.execute("UPDATE STAFF SET in_use = ? WHERE role = ?", (1, table_id))
            connection.commit()
            
            return token
        else:
            return None
    except Exception as e:
        print(f"An error occurred in staff_tablet_authentication: {e}")
        return None

def staff_tablet_logout(db, logout_code, token):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    # Check valid token
    if not valid_user(token):
        connection.close()
        return None
    
    decoded_token = decode_token(token)
    staff_id = decoded_token.get('staff_id')

    # Check if the staff_id exists in the database
    cursor.execute("SELECT * FROM STAFF WHERE staff_id=?", (staff_id,))
    staff_info = cursor.fetchone()
    if staff_info is None:
        connection.close()
        return "Invalid staff ID"

    # Check if the provided logout_code matches the staff_id
    cursor.execute("SELECT * FROM STAFF WHERE staff_id=? AND logout_code=?", (staff_id, logout_code))
    user_info = cursor.fetchone()

    if user_info is None:
        connection.close()
        return "Invalid username or logout code"

    # Check if the session_id is not 0
    cursor.execute("SELECT in_use FROM STAFF WHERE staff_id=?", (staff_id,))
    session_id = cursor.fetchone()[0]
   
    if session_id == 0:
        connection.close()
        return "Session ID is 0. Cannot logout."
    print(staff_id)
    cursor.execute("UPDATE STAFF SET in_use = ? WHERE staff_id = ?", (0, staff_id))
    connection.commit()

    connection.close()
    return "Logout successful"

    
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

def show_all_orders(db):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    
    sql = """
    SELECT o.order_id, o.table_id, io.item_id, io.quantity, io.status
    FROM ORDERS AS o
    JOIN IN_ORDER AS io on io.order_id = o.order_id
    """

    cursor.execute(sql)
    order_items = cursor.fetchall()
    order_list = []

    for item in order_items:
        item_dict = {
            "order_id": item[0],
            "table_number": item[1],
            "item_id": item[2],
            "quantity": item[3],
            "status": item[4]
        }
        order_list.append(item_dict)
    
    connection.close()

    return order_list

def get_status(db, order_id, item_id, quantity, token):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

     # Check if the token is valid
    if not valid_user_specific(db, token):
        connection.close()
        return None
    
    sql = """
    SELECT status
    FROM IN_ORDER
    WHERE order_id = :o AND item_id = :i AND quantity = :q
    """
    cursor.execute(sql, {"o": order_id, "i": item_id, "q": quantity})
    status = cursor.fetchall()[0][0]

    connection.close()

    return status 

def change_order_status(db, status, order_id, item_id, quantity, token):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

     # Check if the token is valid
    if not valid_user_specific(db, token):
        connection.close()
        return None
    
    sql = """
    UPDATE IN_ORDER
    SET status = :s
    WHERE order_id = :o AND item_id = :i AND quantity = :q
    """

    cursor.execute(sql, {"s": status, "o": order_id, "i": item_id, "q": quantity})
    connection.commit()
    connection.close()

    return {}