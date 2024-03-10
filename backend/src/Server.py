# GOT INFO FROM: https://www.digitalocean.com/community/tutorials/processing-incoming-request-data-in-flask
#                https://www.geeksforgeeks.org/use-jsonify-instead-of-json-dumps-in-flask/ 
#                and 1531 server files/ lectures

from flask import Flask, request, jsonify
import os
import sqlite3
import shutil
from InitDB import initialise_db
from Customer import staff_tablet_authentication, confirm_table, authenticate_table, add_menu_item_to_cart, increase_menu_item_in_cart, decrease_menu_item_in_cart

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'BlueZebra.db')

def remove_existing_database():
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)

remove_existing_database()
initialise_db()


@app.route('/staff/staff_authentication', methods=['POST'])
def staff_authentication():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Ensure input has been provided
    if not username or not password:
        return jsonify({'error': 'Ensure both username and password fields have been filled'}), 400

    if staff_tablet_authentication(DB_PATH, username, password):
        return jsonify({'authentication': 'Successful'}), 200
    else:
        return jsonify({'authentication': 'Failed - incorrect username and/or password'}), 401

@app.route('/customer/table_confirmation', methods=['POST'])
def table_confirmation():
    data = request.get_json()
    table_id = data.get('table_id')

    # Don't think this check is needed
    # if not table_id:
    #     return jsonify({'error': 'Invalid table_id'}), 400

    code = confirm_table(DB_PATH, table_id)
    return jsonify({'code': code}), 200

@app.route('/customer/table_authentication', methods=['POST'])
def table_authentication():
    data = request.get_json()
    entered_code = data.get('entered_code')

    # if not entered_code:
    #     return jsonify({'error': 'Ensure a 4 digit code has been entered'}), 400

    if authenticate_table(DB_PATH, entered_code):
        return jsonify({'authentication': 'Successful'}), 200
    else:
        return jsonify({'authentication': 'Failed - ensure you are at the correct table and have entered the right code'}), 401

@app.route('/customer/add_menu_item_to_cart', methods=['POST'])
def add_item_to_cart():
    data = request.get_json()
    order_id = data.get('order_id')
    table_id = data.get('table_id')
    item_id = data.get('item_id')
    quantity = data.get('quantity')

    return_data = add_menu_item_to_cart(DB_PATH, order_id, table_id, item_id, quantity)
    return jsonify(return_data), 200

@app.route('/customer/increase_item_in_cart', methods=['POST'])
def increase_item_in_cart():
    data = request.get_json()
    order_id = data.get('order_id')
    table_id = data.get('table_id')
    item_id = data.get('item_id')

    return_data = increase_menu_item_in_cart(DB_PATH, order_id, table_id, item_id)
    return jsonify(return_data), 200

@app.route('/customer/decrease_item_in_cart', methods=['POST'])
def decrease_item_in_cart():
    data = request.get_json()
    order_id = data.get('order_id')
    table_id = data.get('table_id')
    item_id = data.get('item_id')

    return_data = decrease_menu_item_in_cart(DB_PATH, order_id, table_id, item_id)
    return jsonify(return_data), 200

if __name__ == '__main__':
    app.run(debug=True)