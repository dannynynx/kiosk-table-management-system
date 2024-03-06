import sqlite3

# Initialise Table Views
# https://dev.mysql.com/doc/connector-python/en/connector-python-api-mysqlcursor-executemany.html 
def initialise_db():
    connection = sqlite3.connect("BlueZebra.db")
    cursor = connection.cursor()

    # CATEGORIES
    sql1 = """
    CREATE TABLE IF NOT EXISTS CATEGORY (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    )"""    
    cursor.execute(sql1)

    categories = [('BREKKIE',), ('LUNCH',), ('DINNER',), ('DESSERT',)]
    cursor.executemany("INSERT OR IGNORE INTO CATEGORY (name) VALUES (?)", categories)

#-----------------------------------------------------------------------------------------------------------------
    # INGREDIENTS
    sql2 = """
    CREATE TABLE IF NOT EXISTS INGREDIENTS (
        ingredient_id INTEGER PRIMARY KEY AUTOINCREMENT,
        ingredient_name TEXT NOT NULL UNIQUE
    )"""
    cursor.execute(sql2)
    ingredients = [('Bread',),('Avocado',),('Egg',),('Onion',),('Garlic',),('Beef',),('Tomato',),('Beef Stock',),('Onion',),
                    ('Flour,'),('Milk',),('Cheese',),('Onion',),('Lasagna Sheets',),('Mozzarella',),('Basil',),
                    ('Cocoa Powder',),('Sugar',),('Onion',),('Baking Powder',)]
    cursor.executemany("INSERT OR IGNORE INTO INGREDIENTS (ingredient_name) VALUES (?)", ingredients)
#-----------------------------------------------------------------------------------------------------------------
    # ITEMS
    sql3 = """
    CREATE TABLE IF NOT EXISTS ITEMS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        category_id INTEGER,
        cost MONEY,
        FOREIGN KEY (category_id) REFERENCES CATEGORY(category_id),
    )"""
    cursor.execute(sql3)
    items = [
        ('Avo Toast', 'A delicious and simple breakfast', 1, 6.99),
        ('Lasagna', 'A rich and cheesy pasta stockful of beef mince', 2, 16.00),
        ('Margherita Pizza', 'Authentic italian pizza', 3, 24.00),
        ('Chocolate Cake', 'A delicious chocolate dessert', 4, 10.99), 
    ]
    cursor.executemany("INSERT OR IGNORE INTO ITEMS (name, description, category_id, cost) VALUES (?, ?, ?, ?)", items)
#-----------------------------------------------------------------------------------------------------------------
    # LINKED ITEMS AND INGREDIENTS
    sql4 = """
    CREATE TABLE IF NOT EXISTS ITEM_INGREDIENTS (
        item_id INTEGER,
        ingredient_id INTEGER,
        FOREIGN KEY (item_id) REFERENCES ITEMS(id),
        FOREIGN KEY (ingredient_id) REFERENCES INGREDIENTS(ingredient_id),
        PRIMARY KEY (item_id, ingredient_id)
    )"""
    cursor.execute(sql4)
#-----------------------------------------------------------------------------------------------------------------
    # MENU
    sql5 = """
    CREATE TABLE IF NOT EXISTS MENU (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        FOREIGN KEY (item) REFERENCES ITEMS(item),
    )"""
    cursor.execute(sql5)
#-----------------------------------------------------------------------------------------------------------------
    # ORDERS
    sql6 = """
    CREATE TABLE IF NOT EXISTS ORDERS ( 
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        table_id INTEGER,
        item_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (menu_items) REFERENCES ITEMS (name)
    )"""
    cursor.execute(sql6)
#-----------------------------------------------------------------------------------------------------------------
    # STAFF
    sql7 = """
    CREATE TABLE IF NOT EXISTS STAFF (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )"""
    cursor.execute(sql7)
#-----------------------------------------------------------------------------------------------------------------
    # SESSIONS
    sql8 = """
    CREATE TABLE IF NOT EXISTS SESSIONS (
        session_id INTEGER PRIMARY KEY AUTOINCREMENT,
        table_id INTEGER NOT NULL,
        four_digit_code TEXT NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT 1,
        FOREIGN KEY (table_id) REFERENCES TABLES(table_id)
    )"""
    cursor.execute(sql8)
#-----------------------------------------------------------------------------------------------------------------
    # TABLES
    sql9 = """
    CREATE TABLE IF NOT EXISTS TABLES (
        table_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        is_occupied BOOLEAN NOT NULL DEFAULT 0,
        current_session_id INTEGER,
        FOREIGN KEY (current_session_id) REFERENCES SESSIONS(session_id)
    )"""
    cursor.execute(sql9)

    connection.close()