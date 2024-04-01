import sqlite3
from Helper import valid_user, valid_user_specific

def kitchen_show_orders(db, token):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    # Check if the token is valid
    if not valid_user_specific(token):
        connection.close()
        return None

    cursor.execute("SELECT * FROM IN_ORDER")
    orders = cursor.fetchall()

    connection.close()

    return orders

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