import base64
import sqlite3
import time
from datetime import datetime
import os

# Only generate and add code to set once customer confirms table
# remove code from set once customer requests bill
generated_codes = set()


def generate_unique_code():
    """
    Generate a unique 4-digit code based on the current timestamp.

    Returns:
        str: A unique 4-digit code.
    """
    # Your code here...
    while True:
        timestamp = int(time.time())
        code = str(timestamp)[-4:]  # Extract last 4 digits of the timestamp
        if code not in generated_codes:
            generated_codes.add(code)
            return code


def confirm_table(db, table_id):
    """
    Confirm a table in the database and generate a unique code for it.

    Args:
        db (str): The database path.
        table_id (int): The id of the table to confirm.

    Returns:
        dict: An empty dictionary.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("SELECT MAX(session_id) FROM TABLES")

    max_session_id = cursor.fetchone()[0]
    new_session_id = max_session_id + 1 if max_session_id is not None else 1

    code = generate_unique_code()

    # Store the generated code and seesion_id
    sql = """
    UPDATE TABLES 
    SET code = :c, session_id = :sid, is_occupied = True
    WHERE table_id = :tid
    """

    cursor.execute(sql, {"c": code, "sid": new_session_id, "tid": table_id})

    connection.commit()

    connection.close()

    return {}


def get_table_code(db, table_id):
    """
    Retrieve the code of a specific table from the database.

    Args:
        db (str): The database path.
        table_id (int): The id of the table.

    Returns:
        str: The code of the table.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    SELECT code 
    FROM TABLES 
    WHERE table_id = :tid
    """

    cursor.execute(sql, {"tid": table_id})

    code = cursor.fetchone()[0]

    connection.commit()

    connection.close()

    return code


def authenticate_table(db, table_id, entered_code):
    """
    Authenticate a table in the database using a provided code.

    Args:
        db (str): The database path.
        table_id (int): The id of the table to authenticate.
        entered_code (str): The code to authenticate the table with.

    Returns:
        bool: True if authentication is successful, False otherwise.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    # Retrieve stored code for the table
    sql = """
    SELECT code 
    FROM TABLES 
    WHERE is_occupied = 1 AND table_id = :tid
    """

    cursor.execute(sql, {"tid": table_id})

    stored_codes = cursor.fetchall()

    for stored in stored_codes:
        if stored[0] == entered_code:
            return True  # successfull authentication

    connection.close()

    return False


def send_order_to_database(db, table_id, order_items):
    """
    Send an order to the database.

    Args:
        db (str): The database path.
        table_id (int): The id of the table placing the order.
        order_items (list): A list of dictionaries containing the order items.

    Returns:
        dict: An empty dictionary.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    session_id = get_table_session_id(db, table_id)

    sql1 = """
    INSERT OR IGNORE INTO ORDERS (table_id, session_id)
    VALUES (:t, :s)
    """

    cursor.execute(sql1, {"t": table_id, "s": session_id})

    connection.commit()

    sql2 = """
    SELECT MAX(order_id) FROM ORDERS
    WHERE table_id = :t AND session_id = :s
    """

    cursor.execute(sql2, {"t": table_id, "s": session_id})

    order_id = cursor.fetchone()[0]

    for i in order_items:
        add_item_to_order(db, order_id, i["item_id"], i["quantity"])

    connection.close()

    return {}


def show_table(db):
    """
    Retrieve all the tables from the database.

    Args:
        db (str): The database path.

    Returns:
        list: A list of dictionaries containing the table data.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("SELECT table_id, is_occupied, size FROM TABLES")

    table_list = []
    tables = cursor.fetchall()

    for table in tables:
        table_dict = {
            "id": table[0], 
            "avail": table[1], 
            "size": table[2]}
        table_list.append(table_dict)

    connection.close()

    return table_list


def show_menu(db):
    """
    Retrieve all the menu items from the database.

    Args:
        db (str): The database path.

    Returns:
        list: A list of dictionaries containing the menu item data.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    showMenu = """
    SELECT DISTINCT i.item_id, i.name, i.description, c.name, i.cost, i.image, 
        (SELECT group_concat(C.ingredient_name, ', ') 
         FROM ITEMS AS A 
         JOIN ITEM_INGREDIENTS AS B ON B.item_id = A.item_id 
         JOIN INGREDIENTS AS C ON C.ingredient_id = B.ingredient_id 
         WHERE A.item_id = i.item_id)
    FROM ITEMS AS i
    JOIN CATEGORIES AS c ON i.category_id = c.category_id 
    JOIN ITEM_INGREDIENTS AS it ON i.item_id = it.item_id 
    JOIN INGREDIENTS AS ig ON it.ingredient_id = ig.ingredient_id
    """
    cursor.execute(showMenu)

    items = cursor.fetchall()

    items_list = []

    for item in items:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        with open(f"{base_dir}/ItemImages/{item[5]}", "rb") as image_file:
            # Encode the image as base64 string
            encoded_image = base64.b64encode(image_file.read()).decode("utf-8")
        item_dict = {
            "id": item[0],
            "name": item[1],
            "price": item[4],
            "description": item[2],
            "category": item[3],
            "image": encoded_image,
            "ingredients": item[6].split(", "),
        }
        items_list.append(item_dict)

    connection.close()

    return items_list


def get_all_categories(db):
    """
    Retrieve all the categories from the database.

    Args:
        db (str): The database path.

    Returns:
        list: A list of dictionaries containing the category data.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    SELECT *
    FROM CATEGORIES
    ORDER BY position
    """

    cursor.execute(sql)

    categories = cursor.fetchall()
    
    category_list = []

    for category in categories:
        category_dict = {
            "category_id": category[0], 
            "name": category[1]
        }
        category_list.append(category_dict)

    connection.close()

    return category_list


def get_customer_past_orders(db, table_id):
    """
    Retrieve all the past orders of a specific table from the database.

    Args:
        db (str): The database path.
        table_id (int): The id of the table.

    Returns:
        list: A list of dictionaries containing the past order data.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    session_id = get_table_session_id(db, table_id)

    sql = """
    SELECT i.item_id, SUM(io.quantity), i.name, i.cost
    FROM ORDERS AS o
    JOIN IN_ORDER AS io ON io.order_id = o.order_id
    JOIN ITEMS AS i ON i.item_id = io.item_id
    WHERE o.session_id = :a AND o.table_id = :b
    GROUP BY i.item_id
    """

    cursor.execute(sql, {"a": session_id, "b": table_id})

    past_items = cursor.fetchall()

    past_list = []

    for items in past_items:
        items_dict = {
            "id": items[0],
            "quantity": items[1],
            "name": items[2],
            "price": items[3],
        }
        past_list.append(items_dict)

    connection.close()

    return past_list


def get_table_session_id(db, table_id):
    """
    Retrieve the session id of a specific table from the database.

    Args:
        db (str): The database path.
        table_id (int): The id of the table.

    Returns:
        int: The session id of the table.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    SELECT session_id
    FROM TABLES
    WHERE table_id = :t
    """

    cursor.execute(sql, {"t": table_id})

    session_id = cursor.fetchone()[0]

    connection.close()

    return session_id


def add_notification(db, table_id, notification_type):
    """
    Add a notification to the database for a specific table.

    Args:
        db (str): The database path.
        table_id (int): The id of the table.
        notification_type (str): The type of the notification.

    Returns:
        bool: True if the notification was added successfully, False otherwise.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    SELECT is_occupied 
    FROM TABLES 
    WHERE table_id = :tid
    """

    cursor.execute(sql, {"tid": table_id})

    is_occupied = cursor.fetchone()[0]

    # Only send notifs through if that table is in session
    if is_occupied != 0:
        try:
            # Add the notification to the database
            sql = """
            INSERT INTO NOTIFICATIONS (table_id, notification_type, status) 
            VALUES (:tid, :nt, "new")
            """

            cursor.execute(sql, {"tid": table_id, "nt": notification_type})

            connection.commit()

            #print("Notification added successfully")

            return True
        except sqlite3.Error as e:
            print(f"Error adding notification: {e}")

            connection.rollback()


    connection.close()

    return False


def clear_order(db, table_id):
    """
    Clear an order from a specific table in the database.

    Args:
        db (str): The database path.
        table_id (int): The id of the table.

    Returns:
        None
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    session_id = get_table_session_id(db, table_id)

    orders = get_customer_past_orders(db, table_id)

    date = datetime.today().strftime("%Y-%m-%d")

    sql1 = """
    INSERT OR IGNORE INTO STATS (session_id, date, stats)
    VALUES (:sid, :d, :s)
    """

    cursor.execute(sql1, {"sid": session_id, "d": date, "s": str(orders)})

    sql2 = """
    DELETE FROM IN_ORDER 
    WHERE order_id IN (SELECT io.order_id
                        FROM IN_ORDER AS io
                        JOIN ORDERS AS o ON o.order_id = io.order_id
                        WHERE o.session_id = :sid)
    """

    cursor.execute(sql2, {"sid": session_id})

    sql3 = """
    DELETE FROM NOTIFICATIONS
    WHERE table_id IN (SELECT NOTIFICATIONS.table_id
                    FROM NOTIFICATIONS
                    JOIN TABLES ON TABLES.table_id = NOTIFICATIONS.table_id
                    WHERE session_id=?)
    """

    cursor.execute(sql3, (session_id,))

    sql3 = """
    DELETE FROM NOTIFICATIONS
    WHERE table_id IN (SELECT n.table_id
                        FROM NOTIFICATIONS AS n
                        JOIN TABLES AS t ON t.table_id = n.table_id
                        WHERE t.session_id = :sid)
    """

    cursor.execute(sql3, {"sid": session_id})

    sql5 = """
    UPDATE TABLES 
    SET code = :c, is_occupied = False 
    WHERE table_id = :tid
    """

    cursor.execute(sql5, {"c": "NULL", "tid": table_id})

    connection.commit()

    connection.close()


# Helper Functions
def add_item_to_order(db, order_id, item_id, quantity):
    """
    Add an item to an order in the database.

    Args:
        db (str): The database path.
        order_id (int): The id of the order.
        item_id (int): The id of the item to add.
        quantity (int): The quantity of the item to add.

    Returns:
        None
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    INSERT OR IGNORE INTO IN_ORDER (order_id, item_id, quantity, status)
    VALUES (:o, :i, :q, "ordered")
    """

    cursor.execute(sql, {"o": order_id, "i": item_id, "q": quantity})

    connection.commit()

    connection.close()
