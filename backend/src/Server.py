# GOT INFO FROM: https://www.digitalocean.com/community/tutorials/processing-incoming-request-data-in-flask
#                https://www.geeksforgeeks.org/use-jsonify-instead-of-json-dumps-in-flask/ 
#                and 1531 server files/ lectures

from flask import Flask, request, jsonify
import os
import sqlite3
import shutil
from InitDB import initialise_db
from Customer import get_table_code, confirm_table, authenticate_table, show_table, show_menu, send_order_to_database, get_all_categories, get_role, get_customer_past_orders, add_notification, clear_order
from flask_cors import CORS
from Staff import staff_tablet_authentication, staff_tablet_logout, show_all_orders, get_status, change_order_status
from WaitingStaff import get_notifications, update_notification
from Manager import create_account, edit_account, delete_account, edit_logo, get_stats, get_customisation
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
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
    
    if token is not None:
        return jsonify({'token': token, 'role': role}), 200
    else:
        return jsonify({'authentication': 'Failed - incorrect username and/or password'}), 401

@app.route('/staff/tablet_logout', methods=['POST'])
def tablet_logout():
    data = request.get_json()
    logout_code = data.get('logout_code')
    token = data.get('token')

    if not logout_code or not token:
        return jsonify({'error': 'Missing logout_code or token'}), 400
    
    user_info = staff_tablet_logout(DB_PATH, logout_code, token)

    # Call staff_tablet_logout function with the provided data
    result = staff_tablet_logout(DB_PATH, logout_code, token)

    # Check the result and return appropriate response
    if result == "Logout successful":
        return jsonify({'message': 'Logout successful'}), 200
    elif result == "Invalid username or logout code":
        return jsonify({'error': 'Invalid username or logout code'}), 401
    elif result == "Invalid staff ID":
        return jsonify({'error': 'Invalid staff ID'}), 401
    elif result == "Session ID is 0. Cannot logout.":
        return jsonify({'error': 'Session ID is 0. Cannot logout.'}), 401
    else:
        return jsonify({'error': 'Unknown error occurred'}), 500

@app.route('/customer/table_confirmation', methods=['POST'])
def table_confirmation():
    data = request.get_json()
    table_id = data.get('table_id')
    return_data = confirm_table(DB_PATH, table_id)
    return jsonify(return_data), 200

@app.route('/customer/table_code', methods=['GET'])
def table_code():
    table_id = request.args.get('table_id')

    return_data = get_table_code(DB_PATH, table_id)
    return jsonify(return_data), 200


@app.route('/customer/table_authentication', methods=['POST'])
def table_authentication():
    data = request.get_json()
    table_id = data.get('table_id')
    entered_code = data.get('code')
    token = data.get('token')

    if authenticate_table(DB_PATH, table_id, entered_code, token):
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

    if add_notification(DB_PATH, table_id, notification_type, token):
        # Assuming add_notification returns True if successful
        return jsonify({'message': 'Notification added successfully'}), 200
    else:
        # If add_notification returns False, indicating failure
        return jsonify({'error': 'Could not send notification'}), 500 

@app.route('/waitstaff/get_notification_status', methods=['GET'])
def fetch_notifications():
    token = request.headers.get('Authorization')
    notifications = get_notifications(DB_PATH, token)
    
    return jsonify(notifications), 200

@app.route('/waitstaff/update_notification_status', methods=['PUT'])
def update_notifications():
    data = request.get_json()
    token = data.get('token')
    notification_id = data.get('notification_id')
    new_status = data.get('new_status')

    if not token or not notification_id or not new_status:
        return jsonify({'error': 'Missing token, notification_id, or new_status'}), 400

    success, updated_notification = update_notification(DB_PATH, notification_id, new_status, token)

    if updated_notification:
        return jsonify({'notification': updated_notification}), 200
    else:
        return jsonify({'error': 'Failed to update notification'}), 500

@socketio.on('send_order')
def handle_send_order(data):
    table_id = data.get('table_id')
    order_items = data.get('order_items')
    token = data.get('token')

    send_order_to_database(DB_PATH, table_id, order_items, token)
    return_data = show_all_orders(DB_PATH)
    emit('updated_order_status', return_data, broadcast=True)

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

@app.route("/customer/get_past_orders", methods=['GET'])
def get_past_orders():
    table_id = request.args.get('table_id')

    return_data = get_customer_past_orders(DB_PATH, table_id)
    return jsonify(return_data), 200

@app.route("/staff/show_orders", methods=['GET'])
def show_orders():
    return_data = show_all_orders(DB_PATH)
    return jsonify(return_data), 200

@app.route("/staff/get_order_status", methods=['GET'])
def get_order_status():
    order_id = request.args.get('order_id')
    item_id = request.args.get('item_id')
    quantity = request.args.get('quantity')

    return_data = get_status(DB_PATH, order_id, item_id, quantity)
    return jsonify(return_data), 200

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    
@socketio.on('update_order_status')
def handle_update_order_status(data):
    status = data.get('status')
    order_id = data.get('order_id')
    item_id = data.get('item_id')
    quantity = data.get('quantity')

    return_data = change_order_status(DB_PATH, status, order_id, item_id, quantity)
    return jsonify(return_data), 200




if __name__ == '__main__':
    socketio.run(app, debug=True)
