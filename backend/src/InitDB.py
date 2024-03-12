import sqlite3

# GOT INFO FROM: https://dev.mysql.com/doc/connector-python/en/connector-python-api-mysqlcursor-executemany.html

# Initialise Table Views
def initialise_db():
    connection = sqlite3.connect("BlueZebra.db")
    cursor = connection.cursor()

    # CATEGORIES
    sql1 = """
    CREATE TABLE IF NOT EXISTS CATEGORIES (
        category_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    )"""
    cursor.execute(sql1)

    categories = [('BREKKIE',), ('LUNCH',), ('DINNER',), ('DESSERT',)]
    cursor.executemany("INSERT OR IGNORE INTO CATEGORIES (name) VALUES (?)", categories)

    # INGREDIENTS
    sql2 = """
    CREATE TABLE IF NOT EXISTS INGREDIENTS (
        ingredient_id INTEGER PRIMARY KEY AUTOINCREMENT,
        ingredient_name TEXT NOT NULL UNIQUE
    )"""
    cursor.execute(sql2)

    ingredients = [('Bread',),('Avocado',),('Egg',),('Onion',),('Garlic',),('Beef',),('Tomato',),('Beef Stock',),
                    ('Flour',),('Milk',),('Cheese',),('Lasagna Sheets',),('Mozzarella',),('Basil',),
                    ('Cocoa Powder',),('Sugar',),('Baking Powder',)]
    cursor.executemany("INSERT OR IGNORE INTO INGREDIENTS (ingredient_name) VALUES (?)", ingredients)

    # ITEMS
    sql3 = """
    CREATE TABLE IF NOT EXISTS ITEMS (
        item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        category_id INTEGER,
        cost NUMERIC,
        FOREIGN KEY (category_id) REFERENCES CATEGORIES(category_id)
    )"""
    cursor.execute(sql3)

    items = [
        ('Avo Toast', 'A delicious and simple breakfast', 1, 6.99),
        ('Lasagna', 'A rich and cheesy pasta stockful of beef mince', 2, 16.00),
        ('Margherita Pizza', 'Authentic italian pizza', 3, 24.00),
        ('Chocolate Cake', 'A delicious chocolate dessert', 4, 10.99),
        ('Scrambled Eggs', 'An eggscellent breakfast', 1, 5.99),
        ('Fish and Chips', 'Fresh fish with crispy chips', 2, 14.99),
        ('Steak and Salad', 'Wagyu steak with fresh caesar salad', 3, 50.00),
        ('Matcha Ice Cream', 'Refreshing sweet treat for a hot day', 4, 3.99),
        ('Spaghetti Bolognese', 'One of the most popular Italian dishes', 4, 17.99),
        ('Korean BBQ', 'Why Not?', 4, 60.99),
        ('Omakase', 'For the rich', 4, 200.00)
    ]
    cursor.executemany("INSERT OR IGNORE INTO ITEMS (name, description, category_id, cost) VALUES (?, ?, ?, ?)", items)

    # LINKED ITEMS AND INGREDIENTS
    sql4 = """
    CREATE TABLE IF NOT EXISTS ITEM_INGREDIENTS (
        item_id INTEGER,
        ingredient_id INTEGER,
        FOREIGN KEY (item_id) REFERENCES ITEMS(item_id),
        FOREIGN KEY (ingredient_id) REFERENCES INGREDIENTS(ingredient_id),
        PRIMARY KEY (item_id, ingredient_id)
    )"""
    cursor.execute(sql4)

    item_ingredients = [
        (1, 1),  # Avo toast = bread, avo, egg 
        (1, 2),
        (1, 3),
        (2, 4),  # Lasagna = onion, garlic, beef, beef stock, milk, cheese, lasagna sheets.
        (2, 5),
        (2, 6),
        (2, 8),
        (2, 10),
        (2, 11),
        (2, 12),
        (3, 7),  # Margherita pizza = tomato, flour, mozzarella, basil
        (3, 9),
        (3, 13),
        (3, 14),
        (4, 9),  # Chocolate cake = flour, cocoa powder, sugar, baking powder
        (4, 15),
        (4, 16),
        (4, 17),
    ]
    cursor.executemany("INSERT OR IGNORE INTO ITEM_INGREDIENTS (item_id, ingredient_id) VALUES (?, ?)", item_ingredients)

    # MENU
    sql5 = """
    CREATE TABLE IF NOT EXISTS MENU (
        menu_id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_id INTEGER,
        FOREIGN KEY (item_id) REFERENCES ITEMS(item_id)
    )"""
    cursor.execute(sql5)

    # TABLES
    sql6 = """
    CREATE TABLE IF NOT EXISTS TABLES (
        table_id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL,
        session_id INTEGER NOT NULL DEFAULT 0,
        is_occupied BOOLEAN NOT NULL DEFAULT FALSE
    )"""
    cursor.execute(sql6)

    tables = [
        ('0000', 0, False),  
        ('0000', 0, False)
    ]
    cursor.executemany("INSERT INTO TABLES (code, session_id, is_occupied) VALUES (?, ?, ?)", tables)

    # ORDERS
    sql7 = """
    CREATE TABLE IF NOT EXISTS ORDERS ( 
        order_id INTEGER PRIMARY KEY,
        table_id INTEGER,
        session_id INTEGER
    )"""
    cursor.execute(sql7)

    sql8 = """
    CREATE TABLE IF NOT EXISTS IN_ORDER (
        order_id INTEGER,
        item_id INTEGER,
        quantity INTEGER,
        FOREIGN KEY (order_id) REFERENCES ORDERS(order_id)
        FOREIGN KEY (item_id) REFERENCES ITEMS(item_id)
    )"""
    cursor.execute(sql8)

    # STAFF
    sql9 = """
    CREATE TABLE IF NOT EXISTS STAFF (
        staff_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    )"""
    cursor.execute(sql9)
    # tables numbers are 0 for all staff
    staff_logins = [
        ('table1_login', 'table1_password', '1'),
        ('table2_login', 'table2_password', '2'),
        ('wait', 'wait_password', 'wait'),
        ('kitchen', 'kitchen_password', 'kitchen'),
        ('manager', 'manager_password', 'manager')
    ]
    cursor.executemany("INSERT INTO STAFF (username, password, role) VALUES (?, ?, ?)", staff_logins)

    connection.commit()
    connection.close()
