import base64
import sqlite3
import random
import time
from Helper import valid_user, valid_user_specific

def create_account(db, username, password, role):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("INSERT OR IGNORE INTO STAFF WHERE username=? AND password=? AND role=? AND in_use=0", (username, password, role))
    connection.commit()
    connection.close()

def edit_account(db, id, username, password, role):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("UPDATE STAFF SET username=? AND password=? AND role=? WHERE staff_id=?", (username, password, role, id))
    connection.commit()
    connection.close()

def delete_account(db, id):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("DELETE FROM STAFF WHERE staff_id=?", [id])
    connection.commit()
    connection.close()

