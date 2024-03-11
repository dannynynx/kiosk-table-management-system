import sqlite3
import random
from ReadingDB import export_table_to_json
import time

def staff_tablet_authentication(db, username, password):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM STAFF WHERE username=? AND password=?", (username, password))
    table_info = cursor.fetchone()

    connection.close()

    return table_info is not None


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

    code = generate_unique_code(}

    # Store the generated code and seesion_id
    cursor.execute("UPDATE TABLES SET code=?, session_id=? WHERE table_id=?", (code, new_session_id, table_id))

    connection.commit()

    connection.close()

    return code

# def get_table_id(username, password):
#     connection = sqlite3.connect("BlueZebra.db")
#     cursor = connection.cursor()

#     # Query the STAFF table to retrieve the table ID associated with the provided username and password
#     cursor.execute("SELECT role FROM STAFF WHERE username=? AND password=?", (username, password))
#     result = cursor.fetchone()

#     connection.close()

#     if result:
#         # If a matching staff member is found, return the associated table ID
#         return result[0]
#     else:
#         # If no matching staff member is found, return None
#         return None

# NEED TO WORK ON THIS!!
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

def send_order_to_database(db, order_id, table_id, session_id, order_items):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    INSERT OR IGNORE INTO ORDERS (order_id, table_id, session_id)
    VALUES (:o, :t, :s)
    """

    for i in order_items:
        add_item_to_order(db, order_id, i['item_id'], i['quantity'])

    cursor.execute(sql, {"o": order_id, "t": table_id, "s": session_id})

    connection.commit()
    connection.close()
    return {}

def add_item_to_order(db, order_id, item_id, quantity):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    INSERT OR IGNORE INTO IN_ORDER (order_id, item_id, quantity)
    VALUES (:o, :i, :q)
    """

    cursor.execute(sql, {"o": order_id, "i": item_id, "q": quantity})
    connection.commit()
    connection.close()

def show_table(db):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    
    showTable = '''
    select
        table_id,
        is_occupied
    from
        tables
    where
        is_occupied = 0
    '''
    cursor.execute(showTable)
    val = cursor.fetchall()
    
    connection.close()

    return val

def select_table(db, table_id):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    
    selectTable = '''
    UPDATE tables 
    SET is_occupied = 1 
    WHERE table_id = :o and
    is_occupied = 0
    '''

    cursor.execute(selectTable, {"o": table_id})
    connection.commit()
    connection.close()

def go_back_table(db, table_id):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    
    goBackTable = '''
    UPDATE tables 
    SET is_occupied = 0 
    WHERE table_id = :o and
    is_occupied = 1
    '''

    cursor.execute(goBackTable, {"o": table_id})
    connection.commit()
    connection.close()

def show_menu(db):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    
    showMenu = '''
    select
        items.name,
        items.picture,
        items.cost
    from
        menu join items on items.item_id = menu.item_id
    '''
    cursor.execute(showMenu)
    connection.commit()
    connection.close()
