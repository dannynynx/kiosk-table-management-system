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

def edit_logo(db, logo):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("UPDATE CUSTOMISATION SET logo_image=?", (logo,))
    connection.commit()
    connection.close()

def get_stats(db, start_date, end_date):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    SELECT session_id, date, stats 
    FROM STATS
    WHERE date >= ?
    AND date <= ?
    """

    cursor.execute(sql, (str(start_date), str(end_date)))

    stats = cursor.fetchall()

    data_set = []
    for stat in stats:
        data_dict = {
            "session_id": stat[0],
            "date": stat[1],
            "stats": stat[2]
        }
        data_set.append(data_dict)

    connection.close()
    
    return data_set

def get_customisation(db):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    SELECT * FROM CUSTOMISATION
    """

    cursor.execute(sql)

    customisations = cursor.fetchone()
    customisation_dict = {
        "logo": customisations[1],
        "primary_colour": customisations[2],
        "secondary_colour": customisations[3]
    }
    connection.close()

    return customisation_dict