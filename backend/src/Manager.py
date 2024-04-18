import sqlite3
import random
import time
import ast


def create_account(db, username, password, role, logout_code):
    """
    Create a new account in the database.

    Args:
        db (str): The database path.
        username (str): The username for the new account.
        password (str): The password for the new account.
        role (str): The role for the new account.
        logout_code (str): The logout code for the new account.

    Returns:
        list: The data of the new account.
    """
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
    """
    Edit an existing account in the database.

    Args:
        db (str): The database path.
        id (int): The id of the account to edit.
        username (str): The new username for the account.
        password (str): The new password for the account.
        role (str): The new role for the account.
        logout_code (str): The new logout code for the account.

    Returns:
        list: The data of the edited account.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("SELECT username from STAFF WHERE NOT staff_id=?", (id,))
    staffs = cursor.fetchall()

    for staff in staffs:
        if username in staff[0]:
            connection.close()
            return None

    cursor.execute("UPDATE STAFF SET username=?, password=?, role=?, logout_code=? WHERE staff_id=?",
                   (username, password, role, logout_code, id))
    data = cursor.fetchall()
    connection.commit()
    connection.close()
    return data


def delete_account(db, id):
    """
    Delete an account from the database.

    Args:
        db (str): The database path.
        id (int): The id of the account to delete.

    Returns:
        None
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("DELETE FROM STAFF WHERE staff_id=? and in_use=?", (id, 0))
    connection.commit()
    connection.close()


def edit_logo(db, logo):
    """
    Edit the logo in the database.

    Args:
        db (str): The database path.
        logo (str): The new logo.

    Returns:
        None
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("UPDATE CUSTOMISATION SET logo_image=?", (logo,))
    connection.commit()
    connection.close()


def get_stats(db, start_date, end_date):
    """
    Get the statistics from the database within a date range.

    Args:
        db (str): The database path.
        start_date (str): The start date of the range.
        end_date (str): The end date of the range.

    Returns:
        list: The statistics data.
    """
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
                revenueDaily += int(order['quantity']) * round(order['price'], 2)
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
        print(max(daily_dict, key=daily_dict.get))
        data_dict = {
            "date": str(numDates[i]),
            "number_customers": numCustomerDaily,
            "number_items": numItemsDaily,
            "gross_revenue": revenueDaily,
            "popular_item": max(daily_dict, key=daily_dict.get)
        }

        data_set.append(data_dict)
    data_dict = {
        "date": "Total",
        "number_customers": totalCustomers,
        "number_items": totalItems,
        "gross_revenue": totalRevenue,
        "popular_item": max(total_dict, key=total_dict.get)
    }
    data_set.append(data_dict)

    connection.close()

    return data_set


def get_customisation(db):
    """
    Retrieve the customisation settings from the database.

    Args:
        db (str): The database path.

    Returns:
        dict: A dictionary containing the customisation settings.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    SELECT * FROM CUSTOMISATION
    """

    cursor.execute(sql)

    customisations = cursor.fetchone()
    customisation_dict = {
        "id": customisations[0],
        "logo": customisations[1],
        "primary_colour": customisations[2],
        "secondary_colour": customisations[3]
    }
    connection.close()

    return customisation_dict


def add_category(db, name):
    """
    Add a new category to the database.

    Args:
        db (str): The database path.
        name (str): The name of the new category.

    Returns:
        None
    """
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
    """
    Edit an existing category in the database.

    Args:
        db (str): The database path.
        id (int): The id of the category to edit.
        name (str): The new name for the category.

    Returns:
        None
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("UPDATE CATEGORIES SET name = :n WHERE category_id = :ci",
                   {"n": name, "ci": id})

    connection.commit()
    connection.close()


def delete_category(db, id):
    """
    Delete a category from the database.

    Args:
        db (str): The database path.
        id (int): The id of the category to delete.

    Returns:
        None
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("DELETE FROM CATEGORIES WHERE category_id=:ci", {"ci": id})
    connection.commit()

    cursor.execute("UPDATE ITEMS SET category_id = 0 WHERE category_id=:ci", {"ci": id})
    connection.commit()

    connection.close()


def add_menu_item(db, name, description, ingredients, category, cost, image):
    """
    Add a new menu item to the database.

    Args:
        db (str): The database path.
        name (str): The name of the new menu item.
        description (str): The description of the new menu item.
        ingredients (list): The ingredients of the new menu item.
        category (int): The category id of the new menu item.
        cost (float): The cost of the new menu item.
        image (str): The image of the new menu item.

    Returns:
        None
    """
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
    """
    Edit an existing menu item in the database.

    Args:
        db (str): The database path.
        id (int): The id of the menu item to edit.
        name (str): The new name for the menu item.
        description (str): The new description for the menu item.
        ingredients (list): The new ingredients for the menu item.
        category (int): The new category id for the menu item.
        cost (float): The new cost for the menu item.
        image (str): The new image for the menu item.

    Returns:
        None
    """
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
    """
    Delete a menu item from the database.

    Args:
        db (str): The database path.
        id (int): The id of the menu item to delete.

    Returns:
        None
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("DELETE FROM ITEMS WHERE item_id = :i", {"i": id})

    cursor.execute("DELETE FROM ITEM_INGREDIENTS WHERE item_id = :i", {"i": id})

    connection.commit()
    connection.close()


# Helper
def change_item_ingredients(db, item_id, ingredients):
    """
    Change the ingredients of a specific item in the database.

    Args:
        db (str): The database path.
        item_id (int): The id of the item to change.
        ingredients (list): The new list of ingredients.

    Returns:
        None
    """
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
    """
    Reorder the categories in the database.

    Args:
        db (str): The database path.
        categories (list): A list of dictionaries containing the new order of categories.

    Returns:
        None
    """
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
    """
    Reorder the menu items in the database.

    Args:
        db (str): The database path.
        items (list): A list of dictionaries containing the new order of menu items.

    Returns:
        None
    """
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
    """
    Retrieve all the accounts from the database.

    Args:
        db (str): The database path.

    Returns:
        list: A list of dictionaries containing the account data.
    """
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
            "id": account[0],
            "username": account[1],
            "password": account[2],
            "role": account[3],
            "logout_code": account[5]
        }
        staff_dict.append(account_dict)

    connection.close()

    return staff_dict

def edit_customisation(db, id, logo, primary_colour, secondary_colour):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    UPDATE CUSTOMISATION 
    SET logo_image = :l, primary_hex_code = :p, secondary_hex_code = :s
    WHERE customisation_id = :i
    """

    cursor.execute(sql, {"l": logo, "p": primary_colour, "s": secondary_colour, "i": id})
    connection.commit()

    connection.close()