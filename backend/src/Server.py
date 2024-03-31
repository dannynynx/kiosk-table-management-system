# GOT INFO FROM: https://www.digitalocean.com/community/tutorials/processing-incoming-request-data-in-flask
#                https://www.geeksforgeeks.org/use-jsonify-instead-of-json-dumps-in-flask/ 
#                and 1531 server files/ lectures

from flask import Flask, request, jsonify
import os
import sqlite3
import shutil
from InitDB import initialise_db
from Customer import staff_tablet_authentication, confirm_table, authenticate_table, show_table, show_menu, send_order_to_database, get_all_categories, get_role, get_customer_past_orders
from flask_cors import CORS
from WaitingStaff import get_notifications, update_notification
from KitchenStaff import kitchen_show_orders
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.json.sort_keys = False

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

    role = get_role(DB_PATH, username, password)
    token = staff_tablet_authentication(DB_PATH, username, password)
    
    if token: 
        return jsonify({'token': token, 'role': role}), 200
    else:
        return jsonify({'authentication': 'Failed - incorrect username and/or password'}), 401

@app.route('/customer/table_confirmation', methods=['POST'])
def table_confirmation():
    data = request.get_json()
    table_id = data.get('table_id')

    code = confirm_table(DB_PATH, table_id)
    return jsonify({'code': code}), 200

@app.route('/customer/table_authentication', methods=['POST'])
def table_authentication():
    data = request.get_json()
    entered_code = data.get('code')

    # if not entered_code:
    #     return jsonify({'error': 'Ensure a 4 digit code has been entered'}), 400

    if authenticate_table(DB_PATH, entered_code):
        return jsonify({'authentication': 'Successful'}), 200
    else:
        return jsonify({'authentication': 'Failed - ensure you are at the correct table and have entered the right code'}), 401

@app.route('/customer/notifications/add', methods=['POST'])
def create_notification():
    data = request.get_json()
    table_id = data.get('table_id')
    notification_type = data.get('notification_type')
    token = data.get('token')
    
    if not table_id or not notification_type:
        return jsonify({'error': 'Missing table_id or notification_type'}), 400

    if notification_type not in ['assistance', 'bill']:
        return jsonify({'error': 'Invalid notification_type'}), 400

    add_notification(DB_PATH, table_id, notification_type, token)
    return jsonify({'message': 'Notification added successfully'}), 200

@app.route('/waitstaff/notifications/get', methods=['GET'])
def fetch_notifications():
    token = request.headers.get('Authorization')
    notifications = get_notifications(DB_PATH, token)
    
    if notifications:
        return jsonify(notifications), 200
    else:
        return jsonify({'error': 'Failed to retrieve notifications'}), 500

@app.route('/waitstaff/notifications/update', methods=['PUT'])
def update_notifications():
    data = request.get_json()
    token = data.get('token')
    notification_id = data.get('notification_id')
    new_status = data.get('new_status')

    if not token or not notification_id or not new_status:
        return jsonify({'error': 'Missing token, notification_id, or new_status'}), 400

    success, updated_notification = update_notification(DB_PATH, token, notification_id, new_status)

    if success:
        return jsonify({'notification': updated_notification}), 200
    else:
        return jsonify({'error': 'Failed to update notification'}), 500

@app.route('/customer/send_order', methods=['POST'])
def send_order():
    data = request.get_json()
    table_id = data.get('table_id')
    order_items = data.get('order_items')

    return_data = send_order_to_database(DB_PATH, table_id, order_items)
    return jsonify(return_data), 200

@app.route("/customer/showTable", methods=['GET'])
def showTable():
    return_data = show_table(DB_PATH)
    return jsonify(return_data), 200

@app.route("/customer/showMenu", methods=['GET'])
def showMenu():
    return_data = show_menu(DB_PATH)
    return jsonify(return_data), 200

@app.route("/customer/get_all_categories", methods=['GET'])
def get_categories():
    return_data = get_all_categories(DB_PATH)
    return jsonify(return_data), 200

@app.route("/customer/get_past_orders", methods=['POST'])
def get_past_orders():
    data = request.get_json()
    table_id = data.get('table_id')

    return_data = get_customer_past_orders(DB_PATH, table_id)
    return jsonify(return_data), 200

@app.route("/kitchen/showOrders", methods=['GET'])
def show_orders():
    data = request.get_json()
    token = data.get('token')

    return_data = kitchen_show_orders(DB_PATH, token)
    return jsonify(return_data), 200

if __name__ == '__main__':
    app.run(debug=True)
