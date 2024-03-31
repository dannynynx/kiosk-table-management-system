import sqlite3
from Helper import valid_user, valid_user_specific

def kitchen_show_orders(db, token):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    # Check if the token is valid
    if not valid_user_specific(db, token, "kitchen"):
        connection.close()
        return None

    cursor.execute("SELECT * FROM IN_ORDER")
    orders = cursor.fetchall()

    connection.close()

    return orders