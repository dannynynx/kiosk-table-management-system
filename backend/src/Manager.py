import base64
import sqlite3
import random
import time
import ast
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

    cursor.execute("SELECT username from STAFF WHERE NOT staff_id=?", (id,))
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

    cursor.execute("DELETE FROM STAFF WHERE staff_id=? and in_use=?", (id, 0))
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
    SELECT DISTINCT date
    FROM STATS
    WHERE date >= ?
    AND date <= ?
    """

    cursor.execute(sql, (str(start_date), str(end_date)))

    numDates = cursor.fetchall()[0]
    print(numDates)

    totalItems = 0
    totalCustomers = 0
    totalRevenue = 0
    total_dict = {}
    data_set = []

    for i in range(len(numDates)):
        print("loop")
        print(i)
        print(numDates[i])
        sql = """
        SELECT count(session_id)
        FROM STATS 
        WHERE date=?
        """

        cursor.execute(sql, (str(numDates[i]),))

        numCustomerDaily = cursor.fetchone()[0]
        print(numCustomerDaily)

        totalCustomers += numCustomerDaily

        sql = """
        SELECT stats
        FROM STATS
        WHERE date=?
        """

        cursor.execute(sql, (str(numDates[i]),))

        statsDaily = cursor.fetchall()
        
        numItemsDaily = 0
        revenueDaily = 0

        daily_dict = {}
        for stat in statsDaily:
            stats_list = ast.literal_eval(stat[0])
            print(stats_list)
            for order in stats_list:
                print(order)
                numItemsDaily += int(order['quantity'])
                revenueDaily += int(order['quantity'])*round(order['price'], 2)
                if order['name'] not in daily_dict:
                    daily_dict[order['name']] = int(order['quantity'])
                else:
                    daily_dict[order['name']] += int(order['quantity'])
                if order['name'] not in total_dict:
                    total_dict[order['name']] = int(order['quantity'])
                else:
                    total_dict[order['name']] += int(order['quantity'])

        totalRevenue += revenueDaily
        totalItems += numItemsDaily
        print(daily_dict)
        print(max(daily_dict, key = daily_dict.get))
        data_dict = {
            "date": str(numDates[i]),
            "number_customers": numCustomerDaily,
            "number_items": numItemsDaily,
            "gross_revenue": revenueDaily,
            "popular_item": max(daily_dict, key = daily_dict.get)
        }   
            
        data_set.append(data_dict)
    data_dict = {
        "date": "Total",
        "number_customers": totalCustomers,
        "number_items": totalItems,
        "gross_revenue": totalRevenue,
        "popular_item": max(total_dict, key = total_dict.get)
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

def show_accounts(db):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    SELECT * FROM STAFF
    """

    cursor.execute(sql)

    staff = cursor.fetchall()
    staff_dict = []

    for account in staff:
        account_dict = {
            "username": account[1],
            "password": account[2],
            "role": account[3],
            "logout_code": account[5]
        }
        staff_dict.append(account_dict)

    connection.close()

    return staff_dict