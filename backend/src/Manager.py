import base64
import sqlite3
import random
import time
from Helper import valid_user, valid_user_specific

def create_account(db, username, password, role, logout_code):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    
    cursor.execute("SELECT username from STAFF")
    staffs = cursor.fetchall()

    for staff in staffs:
       if username in staff[0]:
          connection.close()
          return None
       
    sql = '''
    INSERT INTO STAFF (username, password, role, in_use, logout_code) 
    VALUES (:u, :p, :r, :t, :l)
    '''
       
    cursor.execute(sql, {"u": username, "p": password, "r": role, "t": "0", "l": logout_code})
    data = cursor.fetchall()
    connection.commit()
    connection.close()
    return data


def edit_account(db, id, username, password, role, logout_code):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("SELECT username from STAFF")
    staffs = cursor.fetchall()

    for staff in staffs:
       if username in staff[0]:
          connection.close()
          return None

    cursor.execute("UPDATE STAFF SET username=?, password=?, role=?, logout_code=? WHERE staff_id=?", (username, password, role, logout_code, id))
    connection.commit()
    connection.close()

def delete_account(db, id):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("DELETE FROM STAFF WHERE staff_id=?", [id])
    connection.commit()
    connection.close()

