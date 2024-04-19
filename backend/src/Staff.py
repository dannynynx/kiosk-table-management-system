import sqlite3


def staff_tablet_authentication(db, username, password):
    """
    Authenticate a staff member's tablet.

    Args:
        db (str): The database path.
        username (str): The username of the staff member.
        password (str): The password of the staff member.

    Returns:
        str: The role of the staff member if authentication is successful, None otherwise.
    """
    connection = None
    try:
        connection = sqlite3.connect(db)
        cursor = connection.cursor()

        sql = """
        SELECT * 
        FROM STAFF 
        WHERE username = :u AND password = :p
        """

        cursor.execute(sql, {"u": username, "p": password})
        
        table_info = cursor.fetchone()

        if table_info is not None:
            # If the user exists, generate a token
            table_id = get_role(db, username, password)

            cursor.execute("UPDATE STAFF SET in_use = 1 WHERE role = :r", {"r": table_id})
            
            connection.commit()

            return table_id
        else:
            return None
    except Exception as e:
        print(f"An error occurred in staff_tablet_authentication: {e}")
        return None


def staff_tablet_logout(db, logout_code, username):
    """
    Log out a staff member's tablet.

    Args:
        db (str): The database path.
        logout_code (str): The logout code of the staff member.
        username (str): The username of the staff member.

    Returns:
        str: A message indicating the result of the logout operation.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    # Check if the staff_id exists in the database
    cursor.execute("SELECT * FROM STAFF WHERE username = :u", {"u": username})
    
    staff_info = cursor.fetchone()
    
    if staff_info is None:
        connection.close()
        return "Invalid staff ID"

    # Check if the provided logout_code matches the staff_id
    sql = """
    SELECT * 
    FROM STAFF 
    WHERE username = :u AND logout_code = :l
    """

    cursor.execute(sql, {"u": username, "l": logout_code})
    
    user_info = cursor.fetchone()

    if user_info is None:
        connection.close()
        return "Invalid username or logout code"

    # Check if the session_id is not 0
    cursor.execute("SELECT in_use FROM STAFF WHERE username = :u", {"u": username})
    
    session_id = cursor.fetchone()[0]

    if session_id == 0:
        connection.close()
        return "Session ID is 0. Cannot logout."

    cursor.execute("UPDATE STAFF SET in_use = 0 WHERE username = :u", {"u": username})
    
    connection.commit()

    connection.close()
    
    return "Logout successful"


def get_role(db, username, password):
    """
    Get the role of a staff member.

    Args:
        db (str): The database path.
        username (str): The username of the staff member.
        password (str): The password of the staff member.

    Returns:
        str: The role of the staff member if found, None otherwise.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    # Check if the username-password combination exists in the database
    sql = """
    SELECT role 
    FROM STAFF 
    WHERE username = :u AND password = :p
    """

    cursor.execute(sql, {"u": username, "p": password})
    
    result = cursor.fetchone()

    if result:
        role = result[0]
    else:
        role = None

    connection.close()

    return role


def get_logout_code(db, username, password):
    """
    Get the logout code of a staff member.

    Args:
        db (str): The database path.
        username (str): The username of the staff member.
        password (str): The password of the staff member.

    Returns:
        str: The logout code of the staff member if found, None otherwise.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    # Check if the username-password combination exists in the database
    sql = """
    SELECT logout_code 
    FROM STAFF 
    WHERE username = :u AND password = :p
    """

    cursor.execute(sql, {"u": username, "p": password})
    
    result = cursor.fetchone()

    if result:
        logout_code = result[0]
    else:
        logout_code = None

    connection.close()

    return logout_code


def show_all_orders(db):
    """
    Get all orders from the database.

    Args:
        db (str): The database path.

    Returns:
        list: A list of dictionaries, each representing an order.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    SELECT o.order_id, o.table_id, io.item_id, i.name, io.quantity, io.status
    FROM ORDERS AS o
    JOIN IN_ORDER AS io ON io.order_id = o.order_id
    JOIN ITEMS AS i ON i.item_id = io.item_id
    """

    cursor.execute(sql)
    
    order_items = cursor.fetchall()
    
    order_list = []

    for item in order_items:
        item_dict = {
            "order_id": item[0],
            "table_number": item[1],
            "item_id": item[2],
            "name": item[3],
            "quantity": item[4],
            "status": item[5]
        }
        order_list.append(item_dict)

    connection.close()

    return order_list


def get_status(db, order_id, item_id, quantity):
    """
    Get the status of an order.

    Args:
        db (str): The database path.
        order_id (int): The ID of the order.
        item_id (int): The ID of the item.
        quantity (int): The quantity of the item.

    Returns:
        str: The status of the order.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    SELECT status
    FROM IN_ORDER
    WHERE order_id = :o AND item_id = :i AND quantity = :q
    """

    cursor.execute(sql, {"o": order_id, "i": item_id, "q": quantity})
    
    status = cursor.fetchall()[0][0]

    connection.close()

    return status


def change_order_status(db, status, order_id, item_id, quantity):
    """
    Change the status of an order.

    Args:
        db (str): The database path.
        status (str): The new status.
        order_id (int): The ID of the order.
        item_id (int): The ID of the item.
        quantity (int): The quantity of the item.

    Returns:
        dict: An empty dictionary. The function performs an update operation and does not return any value.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    UPDATE IN_ORDER
    SET status = :s
    WHERE order_id = :o AND item_id = :i AND quantity = :q
    """

    cursor.execute(sql, {"s": status, "o": order_id, "i": item_id, "q": quantity})
    
    connection.commit()
    
    connection.close()

    return {}
