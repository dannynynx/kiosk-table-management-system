import sqlite3

# GOT INFO FROM: https://dev.mysql.com/doc/connector-python/en/connector-python-api-mysqlcursor-executemany.html

# Initialise Table Views
def initialise_db(DB_PATH):
    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()

    # CATEGORIES
    sql1 = """
    CREATE TABLE IF NOT EXISTS CATEGORIES (
        category_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        position INTEGER 
    )"""
    cursor.execute(sql1)

    categories = [('Brekkie',0), ('Lunch',1), ('Dinner',2), ('Dessert',3)]
    cursor.executemany("INSERT OR IGNORE INTO CATEGORIES (name, position) VALUES (?,?)", categories)

    # INGREDIENTS
    sql2 = """
    CREATE TABLE IF NOT EXISTS INGREDIENTS (
        ingredient_id INTEGER PRIMARY KEY,
        ingredient_name TEXT NOT NULL UNIQUE
    )"""
    cursor.execute(sql2)

    ingredients = [('Bread',),('Avocado',),('Egg',),('Onion',),('Garlic',),('Beef',),('Tomato',),('Beef Stock',),
                    ('Flour',),('Milk',),('Cheese',),('Lasagna Sheets',),('Mozzarella',),('Basil',),
                    ('Cocoa Powder',),('Sugar',),('Baking Powder',),('Steak',),('Lettuce',),
                    ('Fish',),('Potato',),('Matcha',),('Spaghetti',), ('Beef Mince',),('Chicken',),('Pork',),
                    ('Rice', ),('Salmon',),('Tuna',),('Scallop',),('Squid',),('Crab',),('Uni',),('Butter',),
                    ('Maple Syrup',),('Acai Puree',),('Kiwi',),('Banana',),('Strawberry',),('Tortilla',),
                    ('Chorizo',),('Prawns',),('Mussels',),('Saffron',),('Seaweed',),('Pancetta',),('Pepper',),
                    ('Pastry',),('Mushroom',),('Lamb',),('Rosemary',),('Mushroom',),('Olive Oil',),('Duck',),
                    ('Turkey',),('Stuffing',),('Lemon',),('Seasoning',),('Lady Fingers',),('Expresso',),
                    ('Mascarpone',),('Cream',),('Vanilla Bean',)]
    cursor.executemany("INSERT OR IGNORE INTO INGREDIENTS (ingredient_name) VALUES (?)", ingredients)

    # ITEMS
    sql3 = """
    CREATE TABLE IF NOT EXISTS ITEMS (
        item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        category_id INTEGER,
        cost NUMERIC,
        image TEXT NOT NULL,
        position INTEGER,
        FOREIGN KEY (category_id) REFERENCES CATEGORIES(category_id)
    )"""
    cursor.execute(sql3)

    items = [
        ('Avo Toast', 'A delicious and simple breakfast', 1, 6.99, 'Avocado_Toast.png', 0),
        ('Lasagna', 'A rich and cheesy pasta stockful of beef mince', 2, 16.00, 'Lasagna.png', 1),
        ('Margherita Pizza', 'Authentic italian pizza', 3, 24.00, 'Margherita_Pizza.png', 2),
        ('Chocolate Cake', 'A delicious chocolate dessert', 4, 10.99, 'Chocolate_Cake.png', 3),
        ('Scrambled Eggs', 'An eggscellent breakfast', 1, 5.99, 'Scrambled_Eggs.png', 4),
        ('Fish and Chips', 'Fresh fish with crispy chips', 2, 14.99, 'Fish_and_Chips.png', 5),
        ('Steak and Salad', 'Wagyu steak with fresh caesar salad', 3, 50.00, 'Steak_and_Salad.png', 6),
        ('Matcha Ice Cream', 'Refreshing sweet treat for a hot day', 4, 3.99, 'Matcha_Ice_Cream.png', 7),
        ('Spaghetti Bolognese', 'One of the most popular Italian dishes', 3, 17.99, 'Spaghetti_Bolognese.png', 8),
        ('Korean BBQ', 'Why Not?', 3, 60.99, 'Korean_BBQ.png', 9),
        ('Omakase', 'For the ballers', 3, 200.00, 'Omakase.png', 10),
        ('Belgium Waffles', 'Waffles from Belgium topped with maple syrup and butter', 1, 10.99, 'Belgium_Waffles.png', 11),
        ('Pancakes', 'Pancakes topped with butter and maple syrup', 1, 8.99, 'Pancakes.png', 12),
        ('French Toast', 'Fried sliced bread soaked in beaten eggs and milk', 1, 9.99, 'French_Toast.png', 13),
        ('Acai Bowl', 'Acai with kiwi, banana, strawberry', 1, 12.99, 'Acai_Bowl.png', 14),
        ('Chicken Tacos', 'Small hand-sized corn-based tortilla topped with chicken, avocado, onion, and tomato', 2, 13.99, 'Chicken_Tacos.png', 15),
        ('Spanish Paella', 'Saffron infused rice with chicken, chorizo, prawns, and mussels', 2, 14.99, 'Spanish_Paella.png', 16),
        ('Korean Fried Chicken', 'Not Kentucky Fried Chicken', 2, 24.99, 'Korean_Fried_Chicken.png', 17),
        ('Cheese Toastie', 'Hot cheese sandwich with mozzarella and cheddar cheese', 2, 6.99, 'Cheese_Toastie.png', 18),
        ('Chicken Caesar Salad', 'Romaine lettuce and croutons dressed with parmesan cheese, chicken, and Caesar dressing', 2, 12.99, 'Chicken_Caesar_Salad.png', 19),
        ('Salmon Avocado Sushi Roll', 'Sushi roll with salmon, avocado, and cucumber', 2, 13.99, 'Salmon_Avocado_Sushi_Roll.png', 20),
        ('Carbonara', 'Classic Italian pasta dish with eggs, hard cheese, pancetta, and pepper', 3, 15.99, 'Carbonara.png', 21),
        ('Beef Wellington', 'Tender beef fillet wrapped in puff pastry with mushroom duxelle', 3, 29.99, 'Beef_Wellington.png', 22),
        ('Roast Lamb Leg', 'Slow-roasted lamb leg with rosemary and garlic', 3, 25.99, 'Roast_Lamb_Leg.png', 23),
        ('Turducken', 'A deboned chicken stuffed into a deboned duck, further stuffed into a deboned turkey', 3, 34.99, 'Turducken.png', 24),
        ('Snow Crab Legs', 'Steamed snow crab legs served with butter and lemon wedges', 3, 22.99, 'Snow_Crab_Legs.png', 25),
        ('Charcoal Chicken', 'Chicken roasted over charcoal for a smoky flavour', 3, 19.99, 'Charcoal_Chicken.png', 26),
        ('Tiramisu', 'Coffee-flavoured Italian dessert made of lady fingers dipped in coffee, layered with a whipped mixture of eggs, sugar, and mascarpone cheese, flavoured with cocoa', 4, 7.99, 'Tiramisu.png', 27),
        ('Creme Brulee', 'Rich custard base topped with a layer of hardened caramelised sugar', 4, 6.99, 'Creme_Brulee.png', 28),
        ('Japanese Cheese Cake', 'Light and fluffy cheesecake with a smooth, creamy texture', 4, 8.99, 'Japanese_Cheese_Cake.png', 29)
    ]
    cursor.executemany("INSERT OR IGNORE INTO ITEMS (name, description, category_id, cost, image, position) VALUES (?, ?, ?, ?, ?, ?)", items)

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
        (1, 1),   # Avo toast = bread, avo, egg 
        (1, 2),
        (1, 3),
        (2, 4),   # Lasagna = onion, garlic, beef, beef stock, milk, cheese, lasagna sheets.
        (2, 5),
        (2, 6),
        (2, 8),
        (2, 10),
        (2, 11),
        (2, 12),
        (3, 7),   # Margherita pizza = tomato, flour, mozzarella, basil
        (3, 9),
        (3, 13),
        (3, 14),
        (4, 9),   # Chocolate cake = flour, cocoa powder, sugar, baking powder
        (4, 15),
        (4, 16),
        (4, 17),
        (5, 3),   # Scrambled eggs = egg
        (6, 20),  # Fish and Chips = fish, potato
        (6, 21),
        (7, 18),  # Steak and salad = steak, lettuce, tomato, avocado
        (7, 19),
        (7, 7),
        (7, 2),
        (8, 10),  # Matcha ice cream = milk, sugar, matcha, egg
        (8, 16),
        (8, 22),
        (8, 3),
        (9, 23),  # Spaghetti Bolognese = spaghetti, mince, tomato, onion
        (9, 24),
        (9, 7),
        (9, 4),
        (10, 6),  # Korean BBQ = beef, chicken, pork
        (10, 25),
        (10, 26),
        (11, 27), # Omakase = rice, salmon, tuna, scallop, squid, crab, uni
        (11, 28),
        (11, 29),
        (11, 30),
        (11, 31),
        (11, 32),
        (11, 33),
        (12, 9),  # Belgium Waffles = Flour, egg, milk, butter, maple syrup
        (12, 3),
        (12, 10),
        (12, 34),
        (12, 35),
        (13, 9),  # Pancakes = flour, egg, milk, butter, maple syrup
        (13, 3),
        (13, 10),
        (13, 34),
        (13, 35),
        (14, 1),  # French Toast = bread, egg, milk, butter
        (14, 3),
        (14, 10),
        (14, 35),
        (15, 36), # Acai Bowl = Acai Puree, kiwi, banana, strawberry,
        (15, 37),
        (15, 38),
        (15, 39),
        (16, 40), # Chicken Tacos = Tortilla, Chicken, Avocado, Onion, Tomato
        (16, 25),
        (16, 2),
        (16, 4),
        (16, 7),
        (17, 27), # Spanish Paella = Rice, chicken, chorizo, prawns, mussels, saffron
        (17, 25),
        (17, 41),
        (17, 42),
        (17, 43),
        (17, 44),
        (18, 25), # Korean Fried Chicken = Chicken, Flour, eggs
        (18, 9), 
        (18, 3),
        (19, 1), # Cheese Toastie = Bread, cheese, butter
        (19, 11),
        (19, 35),
        (20, 25), # Chicken Caesar Salad = chicken, tomato, lettuce, cheese
        (20, 7),
        (20, 19),
        (20, 11),
        (21, 27), # Salmon Avocado Sushi Roll = rice, seaweed, avocado, salmon
        (21, 45),
        (21, 2),
        (21, 28),
        (22, 23), # Carbonara = Spaghetti, cheese, pancetta, pepper
        (22, 11),
        (22, 46),
        (22, 47),
        (23, 6), # Beef Wellington = Beef, Pastry, Mushroom, Egg
        (23, 48),
        (23, 49),
        (23, 3),
        (24, 50), # Roast Lamb Leg = lamb, rosemary, garlic, olive oil
        (24, 51),
        (24, 52),
        (24, 53),
        (25, 25), # Turducken = chicken, duck, turkey, stuffing
        (25, 54),
        (25, 55),
        (25, 56),
        (26, 32), # Snow crab legs = crab, butter, lemon
        (26, 35),
        (26, 57),
        (27, 25), # Charcoal chicken = chicken, olive oil, seasoning
        (27, 53),
        (27, 58),
        (28, 59), # Tiramisu = lady fingers, expresso, mascarpone, egg, sugar, cocoa powder
        (28, 60),
        (28, 61),
        (28, 3),
        (28, 15),
        (28, 16),
        (29, 62), # Creme Brulee = cream, vanilla bean, egg, sugar
        (29, 63),
        (29, 3),
        (29, 15),
        (30, 11), # Japanese Cheese cake = cheese, egg, sugar, cream, flour
        (30, 3),
        (30, 15),
        (30, 62),
        (30, 9)
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
        is_occupied BOOLEAN NOT NULL DEFAULT FALSE,
        size INTEGER NOT NULL DEFAULT 1
    )"""
    cursor.execute(sql6)

    tables = [
        ('NULL', 0, False, 1),  
        ('NULL', 0, False, 1),
        ('NULL', 0, False, 2),  
        ('NULL', 0, False, 3),
        ('NULL', 0, False, 3),  
        ('NULL', 0, False, 1),
        ('NULL', 0, False, 1),  
        ('NULL', 0, False, 1),
        ('NULL', 0, False, 3),  
        ('NULL', 0, False, 2),
        ('NULL', 0, False, 2),  
        ('NULL', 0, False, 2),
        ('NULL', 0, False, 1),  
        ('NULL', 0, False, 1),
    ]
    cursor.executemany("INSERT INTO TABLES (code, session_id, is_occupied, size) VALUES (?, ?, ?, ?)", tables)

    # ORDERS
    sql7 = """
    CREATE TABLE IF NOT EXISTS ORDERS ( 
        order_id INTEGER PRIMARY KEY,
        table_id INTEGER,
        session_id INTEGER,
        FOREIGN KEY (table_id) REFERENCES TABLES(table_id)
    )"""
    cursor.execute(sql7)

    # ORDER DETAILS
    sql8 = """
    CREATE TABLE IF NOT EXISTS IN_ORDER (
        order_id INTEGER,
        item_id INTEGER,
        quantity INTEGER,
        status TEXT,
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
        role TEXT NOT NULL,
        in_use TEXT NOT NULL,
        logout_code TEXT NOT NULL
    )"""
    cursor.execute(sql9)
    # tables numbers are 0 for all staff
    staff_logins = [
        ('table1_login', 'table1_password', '1', '0', "1234"),
        ('table2_login', 'table2_password', '2', '0', "1234"),
        ('wait', 'wait_password', 'wait', '0', "1234"),
        ('kitchen', 'kitchen_password', 'kitchen', '0', "1234"),
        ('manager', 'manager_password', 'manager', '0', "1234")
    ]
    cursor.executemany("INSERT INTO STAFF (username, password, role, in_use, logout_code) VALUES (?, ?, ?, ?, ?)", staff_logins)

    # NOTIFICATIONS
    sql10 = """
    CREATE TABLE IF NOT EXISTS NOTIFICATIONS (
        notification_id INTEGER PRIMARY KEY AUTOINCREMENT,
        table_id INTEGER,
        notification_type TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (table_id) REFERENCES TABLES(table_id)
    )"""
    cursor.execute(sql10)

    # CUSTOMISATION
    sql11 = """
    CREATE TABLE IF NOT EXISTS CUSTOMISATION (
        customisation_id INTEGER PRIMARY KEY AUTOINCREMENT,
        logo_image TEXT NOT NULL,
        primary_hex_code TEXT NOT NULL,
        secondary_hex_code TEXT NOT NULL
    )"""

    cursor.execute(sql11)
    customisation_settings = [
        ('zebra.svg', '#222A5C', '#222A4C')
    ]

    cursor.executemany("INSERT INTO CUSTOMISATION (logo_image, primary_hex_code, secondary_hex_code) VALUES (?, ?, ?)", customisation_settings)

    # STATS
    # stats = '[{"item_id":?, "quantity":?, "name":?, "price":?}]'
    sql12 = """
    CREATE TABLE IF NOT EXISTS STATS (
        stats_id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id INTEGER,
        date DATE,
        stats TEXT
    )"""

    cursor.execute(sql12)

    connection.commit()
    connection.close()