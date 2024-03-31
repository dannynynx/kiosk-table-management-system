import sqlite3
import random
import time
from Helper import valid_user, valid_user_specific

def staff_tablet_authentication(db, username, password):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM STAFF WHERE username=? AND password=?", (username, password))
    table_info = cursor.fetchone()

    connection.close()

    return table_info is not None
    
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

# Only generate and add code to set once customer confirms table
# remove code from set once customer requests bill
generated_codes = set()
def generate_unique_code():
    while True:
        timestamp = int(time.time())
        code = str(timestamp)[-4:]  # Extract last 4 digits of the timestamp
        if code not in generated_codes:
            generated_codes.add(code)
            return code

def confirm_table(db, table_id):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("SELECT MAX(session_id) FROM TABLES")
    max_session_id = cursor.fetchone()[0]
    new_session_id = max_session_id + 1 if max_session_id is not None else 1

    code = generate_unique_code()

    # Store the generated code and seesion_id
    cursor.execute("UPDATE TABLES SET code=?, session_id=?, is_occupied=? WHERE table_id=?", (code, new_session_id, True, table_id))

    connection.commit()

    connection.close()

    return code

def authenticate_table(db, entered_code):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    # Retrieve stored code for the table
    cursor.execute("SELECT code FROM TABLES WHERE is_occupied=1")
    
    stored_codes = cursor.fetchall()

    connection.close()

    for stored in stored_codes:
        if stored[0] == entered_code:
            return True #successfull authentication
    return False 

def send_order_to_database(db, table_id, order_items):
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
        add_item_to_order(db, order_id, i['item_id'], i['quantity'])

    connection.close()
    return {}

def add_item_to_order(db, order_id, item_id, quantity):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    INSERT OR IGNORE INTO IN_ORDER (order_id, item_id, quantity, status)
    VALUES (:o, :i, :q, :s)
    """

    cursor.execute(sql, {"o": order_id, "i": item_id, "q": quantity, "s": "ordered"})
    connection.commit()
    connection.close()

def show_table(db):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    showTable = '''
    select
        table_id, is_occupied
    from
        tables
    '''
    cursor.execute(showTable)

    table_list = []
    tables = cursor.fetchall()
    
    for table in tables:
        table_dict = {
            "id": table[0],
            "avail": table[1]
        }
        table_list.append(table_dict)
    connection.close()

    return table_list


def show_menu(db):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    
    showMenu = '''
    SELECT DISTINCT i.name, i.description, c.name, i.cost, (SELECT group_concat(C.ingredient_name, ', ') 
                                                            FROM ITEMS AS A 
                                                            JOIN ITEM_INGREDIENTS as B on B.item_id = A.item_id 
                                                            JOIN INGREDIENTS as C on C.ingredient_id = B.ingredient_id 
                                                            WHERE A.item_id = i.item_id)
    FROM ITEMS AS i
    JOIN CATEGORIES AS c ON i.category_id = c.category_id 
    JOIN ITEM_INGREDIENTS as it on i.item_id = it.item_id 
    JOIN INGREDIENTS as ig on it.ingredient_id = ig.ingredient_id
    '''
    cursor.execute(showMenu)
    items = cursor.fetchall()
    items_list = []

    for item in items:
        item_dict = {
           "name": item[0],
           "price": item[3],
           "description": item[1],
           "category": item[2],
           "ingredients": item[4].split(', ')
        }
        items_list.append(item_dict)

    connection.close()

    return items_list

def get_all_categories(db):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    SELECT *
    FROM CATEGORIES
    """

    cursor.execute(sql)

    categories = cursor.fetchall()
    category_list = []

    for category in categories:
        category_dict = {
            'category_id': category[0],
            'name': category[1]
        }
        category_list.append(category_dict)

    connection.close()
    
    return category_list

def get_customer_past_orders(db, table_id):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    session_id = get_table_session_id(db, table_id)

    sql = """
    SELECT io.quantity, i.name, i.cost
    FROM ORDERS AS o
    JOIN IN_ORDER AS io on io.order_id = o.order_id
    JOIN ITEMS AS i on i.item_id = io.item_id
    WHERE o.session_id = :a AND o.table_id = :b
    """

    cursor.execute(sql, {"a": session_id, "b": table_id})
    
    past_items = cursor.fetchall()
    past_list = []

    for items in past_items:
        items_dict = {
            'quantity': items[0],
            'name': items[1],
            'price': items[2]
        }
        past_list.append(items_dict)
    
    connection.close()

    return past_list

def get_table_session_id(db, table_id):
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

def add_notification(db, table_id, notification_type, token):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    # Check if the token is valid
    if not valid_user_specific(token):
        connection.close()
        return None
        
    sql = "INSERT INTO NOTIFICATIONS (table_id, notification_type, status) VALUES (?, ?, ?)"
    try:
        cursor.execute(sql, (table_id, notification_type, "new"))
        connection.commit()
        print("Notification added successfully")
    except sqlite3.Error as e:
        print(f"Error adding notification: {e}")
        connection.rollback()
    finally:
        connection.close()