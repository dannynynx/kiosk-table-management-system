import sqlite3

def initialise_db():
    connection = sqlite3.connect("BlueZebra.db")
    cursor = connection.cursor()


    # Added in databse already upon database creation
    # sql1 = """
    # CREATE TABLE IF NOT EXISTS CATEGORY (
    #     id INTEGER PRIMARY KEY AUTOINCREMENT,
    #     name TEXT NOT NULL
    # )"""

    sql2 = """
    CREATE TABLE IF NOT EXISTS INGREDIENTS (
        ingredient_id INTEGER PRIMARY KEY AUTOINCREMENT,
        ingredient_name TEXT NOT NULL
    )"""

    sql3 = """
    CREATE TABLE IF NOT EXISTS ITEMS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        ingredient_id INTEGER NOT NULL,
        description TEXT NOT NULL,
        category_id INTEGER,
        cost MONEY,
        FOREIGN KEY (category_id) REFERENCES CATEGORY(category_id),
        FOREIGN KEY (ingredient_id) REFERENCES INGREDIENTS(ingredient_id)
    )"""

    sql4 = """
    CREATE TABLE IF NOT EXISTS MENU (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        FOREIGN KEY (item) REFERENCES ITEMS(item),
    )"""

    sql5 = """
    CREATE TABLE IF NOT EXISTS ORDERS ( 
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        table_id INTEGER,
        item_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (menu_items) REFERENCES ITEMS (name)
    )"""

    sql6 = """
    CREATE TABLE IF NOT EXISTS STAFF (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )"""

    sql7 = """
    CREATE TABLE IF NOT EXISTS sessions (
        session_id INTEGER PRIMARY KEY AUTOINCREMENT,
        table_id INTEGER NOT NULL,
        four_digit_code TEXT NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT 1,
        FOREIGN KEY (table_id) REFERENCES tables(table_id)
    )"""

    sql8 = """
    CREATE TABLE IF NOT EXISTS tables (
        table_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        is_occupied BOOLEAN NOT NULL DEFAULT 0,
        current_session_id INTEGER,
        FOREIGN KEY (current_session_id) REFERENCES sessions(session_id)
    )"""

    cursor.execute(sql1)
    cursor.execute(sql2)
    cursor.execute(sql3)
    cursor.execute(sql4)
    cursor.execute(sql5)
    cursor.execute(sql6)
    cursor.execute(sql7)
    cursor.execute(sql8)

    connection.close()