import sqlite3
import json
import os

# GOT INFO FROM: https://www.bacancytechnology.com/qanda/python/return-sql-data-in-json-format-python 

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'BlueZebra.db')

def export_table_to_json(table_name, file_name):
    connection = sqlite3.connect("BlueZebra.db")
    cursor = connection.cursor()

    # Query the data from the table
    cursor.execute(f"SELECT * FROM {table_name}")
    data = cursor.fetchall()

    # Convert the data into a JSON-compatible format
    json_data = []
    column_names = [description[0] for description in cursor.description]
    for row in data:
        json_data.append(dict(zip(column_names, row)))

    json_folder = "JsonFiles"

    if not os.path.exists(json_folder):
        os.makedirs(json_folder)

    file_path = os.path.join(json_folder, file_name)
    with open(file_path, 'w') as json_file:
        json.dump(json_data, json_file, indent=4)

    connection.close()


tables_to_export = {
    'CATEGORIES': 'categories.json',
    'INGREDIENTS': 'ingredients.json',
    'ITEMS': 'items.json',
    'ITEM_INGREDIENTS': 'item_ingredients.json',
    'MENU': 'menu.json',
    'TABLES': 'tables.json',
    'ORDERS': 'orders.json',
    'STAFF': 'staff.json',
    'NOTIFICATIONS': 'notifications.json'
}


for table_name, file_name in tables_to_export.items():
    export_table_to_json(table_name, file_name)
