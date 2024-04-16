# GOT INFO FROM: https://www.digitalocean.com/community/tutorials/processing-incoming-request-data-in-flask
#                https://www.geeksforgeeks.org/use-jsonify-instead-of-json-dumps-in-flask/ 
#                and 1531 server files/ lectures

from flask import Flask, request, jsonify
import os
from InitDB import initialise_db
from Customer import get_table_code, confirm_table, authenticate_table, show_table, show_menu, send_order_to_database, get_all_categories, get_role, get_customer_past_orders, add_notification, clear_order
from flask_cors import CORS
from Staff import staff_tablet_authentication, staff_tablet_logout, show_all_orders, get_status, change_order_status
from WaitingStaff import get_notifications, update_notification
from Manager import create_account, edit_account, delete_account, edit_logo, get_stats, get_customisation, add_category, edit_category, delete_category, add_menu_item, edit_menu_item, delete_menu_item, reorder_categories, reorder_menu_items,show_accounts
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

@app.route("/customer/show_table", methods=['GET'])
def showTable():
    return_data = show_table(DB_PATH)
    return jsonify(return_data), 200


@socketio.on('table_confirmation')
def handle_table_confirmation(table_id):
    confirm_table(DB_PATH, table_id)
    emit('table_code', get_table_code(DB_PATH, table_id))
    emit('updated_table_status', show_table(DB_PATH), broadcast=True)

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
    
    if notifications:
        return jsonify(notifications), 200
    else:
        return jsonify({'error': 'Failed to retrieve notifications'}), 500

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

@app.route('/customer/send_order', methods=['POST'])
def send_order():
    data = request.get_json()
    table_id = data.get('table_id')
    order_items = data.get('order_items')
    token = data.get('token')

    return_data = send_order_to_database(DB_PATH, table_id, order_items, token)
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

@app.route("/staff/update_order_status", methods=['PUT'])
def update_order_status():
    data = request.get_json()
    status = data.get('status')
    order_id = data.get('order_id')
    item_id = data.get('item_id')
    quantity = data.get('quantity')

    return_data = change_order_status(DB_PATH, status, order_id, item_id, quantity)
    return jsonify(return_data), 200

@app.route("/manager/create_account", methods=['POST'])
def manager_create_account():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')
    logout_code = data.get('logout_code')

    return_data = create_account(DB_PATH, username, password, role, logout_code)
    return jsonify(return_data), 200

@app.route("/manager/edit_account", methods=['PUT'])
def manager_edit_account():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')
    id = data.get('staff_id')
    logout_code = data.get('logout_code')

    return_data = edit_account(DB_PATH, id, username, password, role, logout_code)
    return jsonify(return_data), 200

@app.route("/manager/delete_account", methods=['DELETE'])
def manager_delete_account():
    data = request.get_json()
    id = data.get('staff_id')

    return_data = delete_account(DB_PATH, id)
    return jsonify(return_data), 200

@app.route("/manager/edit_logo", methods=['PUT'])
def manager_edit_logo():
    data = request.get_json()
    logo = data.get('image')

    return_data = edit_logo(DB_PATH, logo)
    return jsonify(return_data), 200

@app.route("/customer/clear_order", methods=['DELETE'])
def customer_clear_order():
    data = request.get_json()
    table_id = data.get('table_id')

    return_data = clear_order(DB_PATH, table_id)
    return jsonify(return_data), 200

@app.route("/manager/get_stats", methods=['GET'])
def manager_get_stats():
    data = request.get_json()
    start_date = data.get('start_date')
    end_date = data.get('end_date')

    return_data = get_stats(DB_PATH, start_date, end_date)
    return jsonify(return_data), 200

@app.route("/manager/get_customisations", methods=['GET'])
def get_customisations():

    return_data = get_customisation(DB_PATH)
    return jsonify(return_data), 200

@app.route("/manager/add_category", methods=['POST'])
def manager_add_category():
    data = request.get_json()
    category_name = data.get('category_name')

    return_data = add_category(DB_PATH, category_name)
    return jsonify(return_data), 200

@app.route("/manager/edit_category", methods=['PUT'])
def manager_edit_category():
    data = request.get_json()
    category_id = data.get('category_id')
    new_name = data.get('new_name')

    return_data = edit_category(DB_PATH, category_id, new_name)
    return jsonify(return_data), 200

@app.route("/manager/delete_category", methods=['DELETE'])
def manager_delete_category():
    data = request.get_json()
    category_id = data.get('category_id')
    
    return_data = delete_category(DB_PATH, category_id)
    return jsonify(return_data), 200

@app.route("/manager/add_menu_item", methods=['POST'])
def manager_add_menu_item():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    ingredients = data.get('ingredients')
    category = data.get('category')
    cost = data.get('cost')
    image = data.get('image')

    return_data = add_menu_item(DB_PATH, name, description, ingredients, category, cost, image)
    return jsonify(return_data), 200

@app.route("/manager/edit_menu_item", methods=['PUT'])
def manager_edit_menu_item():
    data = request.get_json()
    id = data.get('id')
    name = data.get('name')
    description = data.get('description')
    ingredients = data.get('ingredients')
    category = data.get('category')
    cost = data.get('cost')
    image = data.get('image')

    return_data = edit_menu_item(DB_PATH, id, name, description, ingredients, category, cost, image)
    return jsonify(return_data), 200

@app.route("/manager/delete_menu_item", methods=['DELETE'])
def manager_delete_menu_item():
    data = request.get_json()
    id = data.get('id')

    return_data = delete_menu_item(DB_PATH, id)
    return jsonify(return_data), 200

@app.route("/manager/reorder_categories", methods=['PUT'])
def manager_reorder_categories():
    data = request.get_json()
    categories = data.get('categories')

    return_data = reorder_categories(DB_PATH, categories)
    return jsonify(return_data), 200

@app.route("/manager/reorder_menu_items", methods=['PUT'])
def manager_reorder_menu_items():
    data = request.get_json()
    menu_items = data.get('menu_items')

    return_data = reorder_menu_items(DB_PATH, menu_items)
@app.route("/manager/show_accounts", methods=['GET'])
def get_accounts():

    return_data = show_accounts(DB_PATH)
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
    
    change_order_status(DB_PATH, status, order_id, item_id, quantity)
    return_data = show_all_orders(DB_PATH)
    emit('updated_order_status', return_data, broadcast=True)

@socketio.on('update_notification_status')
def handle_update_notification_status(data):
    notification_id = data.get('notification_id')
    new_status = data.get('new_status')
    token = data.get('token')

    update_notification(DB_PATH, notification_id, new_status, token)
    return_data = get_notifications(DB_PATH, token)
    emit('updated_notification_status', return_data, broadcast=True)
    
@socketio.on('add_notification')
def handle_add_notification(data):
    table_id = data.get('table_id')
    notification_type = data.get('notification_type')
    token = data.get('token')
    add_notification(DB_PATH, table_id, notification_type, token)
    return_data = get_notifications(DB_PATH, token)
    emit('updated_notification_status', return_data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', allow_unsafe_werkzeug=True, debug=True)
