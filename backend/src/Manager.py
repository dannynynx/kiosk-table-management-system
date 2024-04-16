import sqlite3

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

def add_category(db, name):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    INSERT INTO CATEGORIES (name, position)
    VALUES (:n, (SELECT MAX(position) + 1 FROM CATEGORIES))
    """

    cursor.execute(sql, {"n": name})

    connection.commit()
    connection.close()

def edit_category(db, id, name):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("UPDATE CATEGORIES SET name = :n WHERE category_id = :ci", 
                   {"n": name, "ci": id})

    connection.commit()
    connection.close()

def delete_category(db, id):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("DELETE FROM CATEGORIES WHERE category_id=:ci", {"ci": id})
    connection.commit()

    cursor.execute("UPDATE ITEMS SET category_id = 0 WHERE category_id=:ci", {"ci": id})
    connection.commit()

    connection.close()

def add_menu_item(db, name, description, ingredients, category, cost, image):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql1 = """
    INSERT INTO ITEMS (name, description, category_id, cost, image, position)
    VALUES (:n, :d, :ci, :c, :i, (SELECT MAX(position) + 1 FROM ITEMS))
    """

    cursor.execute(sql1, {"n": name, "d": description, "ci": category, "c": cost, "i": image})
    connection.commit()

    sql2 = """
    SELECT item_id
    FROM ITEMS
    WHERE name = :n AND description = :d AND category_id = :ci AND cost = :c
    """

    cursor.execute(sql2, {"n": name, "d": description, "ci": category, "c": cost})
    connection.commit()

    item_id = cursor.fetchone()[0]

    change_item_ingredients(db, item_id, ingredients)

    connection.commit()
    connection.close()

def edit_menu_item(db, id, name, description, ingredients, category, cost, image):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    UPDATE ITEMS
    SET name = :n, description = :d, category_id = :ci, cost = :c, image = :im
    WHERE item_id = :i
    """

    cursor.execute(sql, {"n": name, "d": description, "ci": category, "c": cost,
                         "im": image, "i": id})
    connection.commit()

    change_item_ingredients(db, id, ingredients)

    connection.close()

def delete_menu_item(db, id):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("DELETE FROM ITEMS WHERE item_id = :i", {"i": id})

    cursor.execute("DELETE FROM ITEM_INGREDIENTS WHERE item_id = :i", {"i": id})

    connection.commit()
    connection.close()

# Helper
def change_item_ingredients(db, item_id, ingredients):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("DELETE FROM ITEM_INGREDIENTS WHERE item_id = :i", {"i": item_id})

    for ingredient in ingredients:

        ingredient = ingredient.capitalize()
    
        cursor.execute("INSERT OR IGNORE INTO INGREDIENTS (ingredient_name) VALUES (:in)", 
                       {"in": ingredient})

        sql2 = """
        SELECT ingredient_id
        FROM INGREDIENTS
        WHERE ingredient_name = :i
        """

        cursor.execute(sql2, {"i": ingredient})

        ingredient_id = cursor.fetchone()[0]

        sql3 = """
        INSERT INTO ITEM_INGREDIENTS (item_id, ingredient_id)
        VALUES (:it, :ig)
        """

        cursor.execute(sql3, {"it": item_id, "ig": ingredient_id})
        connection.commit()
    
    connection.commit()
    connection.close()

def reorder_categories(db, categories):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    for category in categories:
        name = category.get('name')
        position = category.get('order')

        sql = """
        UPDATE CATEGORIES
        SET position = :p
        WHERE name = :n
        """

        cursor.execute(sql, {"n": name, "p": position})
        connection.commit()
    
    connection.close()

def reorder_menu_items(db, items):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    for item in items:
        name = item.get('name')
        position = item.get('order')

        sql = """
        UPDATE ITEMS
        SET position = :p
        WHERE name = :n
        """

        cursor.execute(sql, {"n": name, "p": position})
        connection.commit()
    
    connection.close()

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