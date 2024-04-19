# GOT INFO FROM: https://www.digitalocean.com/community/tutorials/processing-incoming-request-data-in-flask
#                https://www.geeksforgeeks.org/use-jsonify-instead-of-json-dumps-in-flask/ 
#                and 1531 server files/ lectures

from flask import Flask, request, jsonify
import os
from InitDB import initialise_db
from Customer import get_table_code, confirm_table, authenticate_table, show_table, show_menu, send_order_to_database, \
    get_all_categories, get_customer_past_orders, add_notification, clear_order
from flask_cors import CORS
from Staff import staff_tablet_authentication, staff_tablet_logout, show_all_orders, get_status, change_order_status, \
    get_role, get_logout_code
from WaitingStaff import get_notifications, update_notification
from Manager import create_account, edit_account, delete_account, edit_logo, get_stats, get_customisation, add_category, \
    edit_category, delete_category, add_menu_item, edit_menu_item, delete_menu_item, reorder_categories, \
    reorder_menu_items, show_accounts, edit_customisation
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
initialise_db(DB_PATH)


@app.route('/staff/staff_authentication', methods=['POST'])
def staff_authentication():
    """
    Authenticate a staff member.

    Args:
        None

    Returns:
        JSON: A JSON response containing the table_id, role, and logout_code if authentication is successful,
        or an error message if authentication fails.
    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Ensure input has been provided
    if not username or not password:
        return jsonify({'error': 'Ensure both username and password fields have been filled'}), 400

    role = get_role(DB_PATH, username, password)
    logout_code = get_logout_code(DB_PATH, username, password)
    table_id = staff_tablet_authentication(DB_PATH, username, password)

    if table_id is not None:
        return jsonify({'table_id': table_id, 'role': role, 'logout_code': logout_code}), 200
    else:
        return jsonify({'authentication': 'Failed - incorrect username and/or password'}), 401


@app.route('/staff/tablet_logout', methods=['POST'])
def tablet_logout():
    """
    Log out a staff member's tablet.

    Args:
        None

    Returns:
        JSON: A JSON response containing a success message if logout is successful,
        or an error message if logout fails.
    """
    data = request.get_json()
    logout_code = data.get('logout_code')
    username = data.get('username')

    if not logout_code or not username:
        return jsonify({'error': 'Missing logout_code or username'}), 400

    # Call staff_tablet_logout function with the provided data
    result = staff_tablet_logout(DB_PATH, logout_code, username)

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
    """
    Show the table status.

    Args:
        None

    Returns:
        JSON: A JSON response containing the table status.
    """
    return_data = show_table(DB_PATH)
    return jsonify(return_data), 200

@app.route('/customer/table_code', methods=['GET'])
def table_code():
    table_id = request.args.get('table_id')

    return_data = get_table_code(DB_PATH, table_id)
    return jsonify(return_data), 200


@socketio.on('table_confirmation')
def handle_table_confirmation(table_id):
    """
    Handle the confirmation of a table. This function confirms the table, emits the table code,
    and broadcasts the updated table status.

    Args:
        table_id (int): The id of the table to confirm.

    Returns:
        None
    """
    confirm_table(DB_PATH, table_id)
    emit('table_code', get_table_code(DB_PATH, table_id))
    emit('updated_table_status', show_table(DB_PATH), broadcast=True)


@app.route('/customer/table_authentication', methods=['POST'])
def table_authentication():
    """
    Authenticate a table.

    Args:
        None

    Returns:
        JSON: A JSON response containing a success message if authentication is successful,
        or an error message if authentication fails.
    """
    data = request.get_json()
    table_id = data.get('table_id')
    entered_code = data.get('code')

    if authenticate_table(DB_PATH, table_id, entered_code):
        return jsonify({'authentication': 'Successful'}), 200
    else:
        return jsonify(
            {'authentication': 'Failed - ensure you are at the correct table and have entered the right code'}), 401


@app.route('/customer/notifications/add', methods=['POST'])
def create_notification():
    """
    Create a new notification.

    Args:
        None

    Returns:
        JSON: A JSON response containing a success message if the notification is successfully created,
        or an error message if the creation fails.
    """
    data = request.get_json()
    table_id = data.get('table_id')
    notification_type = data.get('notification_type')

    if not table_id or not notification_type:
        return jsonify({'error': 'Missing table_id or notification_type'}), 400

    if notification_type not in ['assistance', 'bill']:
        return jsonify({'error': 'Invalid notification_type'}), 400

    if add_notification(DB_PATH, table_id, notification_type):
        # Assuming add_notification returns True if successful
        return jsonify({'message': 'Notification added successfully'}), 200
    else:
        # If add_notification returns False, indicating failure
        return jsonify({'error': 'Could not send notification'}), 500


@app.route('/waitstaff/get_notification_status', methods=['GET'])
def fetch_notifications():
    """
    Fetch all notifications.

    Args:
        None

    Returns:
        JSON: A JSON response containing all notifications,
        or an error message if the fetch operation fails.
    """
    notifications = get_notifications(DB_PATH)

    if notifications:
        return jsonify(notifications), 200
    else:
        return jsonify({'error': 'Failed to retrieve notifications'}), 500


@app.route('/waitstaff/update_notification_status', methods=['PUT'])
def update_notifications():
    """
    Update the status of a specific notification.

    Args:
        None

    Returns:
        JSON: A JSON response containing the updated notification,
        or an error message if the update operation fails.
    """
    data = request.get_json()
    notification_id = data.get('notification_id')
    new_status = data.get('new_status')

    if not notification_id or not new_status:
        return jsonify({'error': 'Missing notification_id or new_status'}), 400

    success, updated_notification = update_notification(DB_PATH, notification_id, new_status)

    if updated_notification:
        return jsonify({'notification': updated_notification}), 200
    else:
        return jsonify({'error': 'Failed to update notification'}), 500


@app.route('/customer/send_order', methods=['POST'])
def send_order():
    """
    Send an order to the database.

    Args:
        None

    Returns:
        JSON: A JSON response containing the result of the operation.
    """
    data = request.get_json()
    table_id = data.get('table_id')
    order_items = data.get('order_items')

    return_data = send_order_to_database(DB_PATH, table_id, order_items)
    return jsonify(return_data), 200


@app.route("/customer/showMenu", methods=['GET'])
def showMenu():
    """
    Show the menu.

    Args:
        None

    Returns:
        JSON: A JSON response containing the menu.
    """
    return_data = show_menu(DB_PATH)
    return jsonify(return_data), 200


@app.route("/customer/get_all_categories", methods=['GET'])
def get_categories():
    """
    Get all categories.

    Args:
        None

    Returns:
        JSON: A JSON response containing all categories.
    """
    return_data = get_all_categories(DB_PATH)
    return jsonify(return_data), 200


@app.route("/customer/get_past_orders", methods=['GET'])
def get_past_orders():
    """
    Get past orders of a customer.

    Args:
        None

    Returns:
        JSON: A JSON response containing the past orders of a customer.
    """
    table_id = request.args.get('table_id')

    return_data = get_customer_past_orders(DB_PATH, table_id)
    return jsonify(return_data), 200


@app.route("/staff/show_orders", methods=['GET'])
def show_orders():
    """
    Show all orders.

    Args:
        None

    Returns:
        JSON: A JSON response containing all orders.
    """
    return_data = show_all_orders(DB_PATH)
    return jsonify(return_data), 200


@app.route("/staff/get_order_status", methods=['GET'])
def get_order_status():
    """
    Get the status of an order.

    Args:
        None

    Returns:
        JSON: A JSON response containing the status of an order.
    """
    order_id = request.args.get('order_id')
    item_id = request.args.get('item_id')
    quantity = request.args.get('quantity')

    return_data = get_status(DB_PATH, order_id, item_id, quantity)
    return jsonify(return_data), 200


@app.route("/staff/update_order_status", methods=['PUT'])
def update_order_status():
    """
    Update the status of an order.

    Args:
        None

    Returns:
        JSON: A JSON response containing the result of the operation.
    """
    data = request.get_json()
    status = data.get('status')
    order_id = data.get('order_id')
    item_id = data.get('item_id')
    quantity = data.get('quantity')

    return_data = change_order_status(DB_PATH, status, order_id, item_id, quantity)
    return jsonify(return_data), 200


@app.route("/manager/create_account", methods=['POST'])
def manager_create_account():
    """
    Create a new account.

    Args:
        None

    Returns:
        JSON: A JSON response containing the result of the operation.
    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')
    logout_code = data.get('logout_code')

    return_data = create_account(DB_PATH, username, password, role, logout_code)
    if return_data == None:
        return jsonify({'error': 'Username already taken'}), 400
    else:
        return jsonify(return_data), 200


@app.route("/manager/edit_account", methods=['PUT'])
def manager_edit_account():
    """
    Edit an account.

    Args:
        None

    Returns:
        JSON: A JSON response containing the result of the operation.
    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')
    id = data.get('id')
    logout_code = data.get('logout_code')

    return_data = edit_account(DB_PATH, id, username, password, role, logout_code)
    if return_data == None:
        return jsonify({'error': 'Username already taken'}), 400
    else:
        return jsonify(return_data), 200


@app.route("/manager/delete_account", methods=['DELETE'])
def manager_delete_account():
    """
    Delete an account.

    Args:
        None

    Returns:
        JSON: A JSON response containing the result of the operation.
    """
    data = request.get_json()
    id = data.get('staff_id')

    return_data = delete_account(DB_PATH, id)
    return jsonify(return_data), 200


@app.route("/manager/edit_logo", methods=['PUT'])
def manager_edit_logo():
    """
    Edit the logo.

    Args:
        None

    Returns:
        JSON: A JSON response containing the result of the operation.
    """
    data = request.get_json()
    logo = data.get('image')

    return_data = edit_logo(DB_PATH, logo)
    return jsonify(return_data), 200


@app.route("/customer/clear_order", methods=['DELETE'])
def customer_clear_order():
    """
    Clear an order.

    Args:
        None

    Returns:
        JSON: A JSON response containing the result of the operation.
    """
    data = request.get_json()
    table_id = data.get('table_id')

    return_data = clear_order(DB_PATH, table_id)
    return jsonify(return_data), 200


@app.route("/manager/get_stats", methods=['GET'])
def manager_get_stats():
    """
    Get statistics.

    Args:
        None

    Returns:
        JSON: A JSON response containing the statistics.
    """
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    return_data = get_stats(DB_PATH, start_date, end_date)
    return jsonify(return_data), 200


@app.route("/manager/get_customisations", methods=['GET'])
def get_customisations():
    """
    Get customisations.

    Args:
        None

    Returns:
        JSON: A JSON response containing the customisations.
    """
    return_data = get_customisation(DB_PATH)
    return jsonify(return_data), 200


@app.route("/manager/add_category", methods=['POST'])
def manager_add_category():
    """
    Add a new category.

    Args:
        None

    Returns:
        JSON: A JSON response containing the result of the operation.
    """
    data = request.get_json()
    category_name = data.get('category_name')

    return_data = add_category(DB_PATH, category_name)
    return jsonify(return_data), 200


@app.route("/manager/edit_category", methods=['PUT'])
def manager_edit_category():
    """
    Edit a category.

    Args:
        None

    Returns:
        JSON: A JSON response containing the result of the operation.
    """
    data = request.get_json()
    category_id = data.get('category_id')
    new_name = data.get('new_name')

    return_data = edit_category(DB_PATH, category_id, new_name)
    return jsonify(return_data), 200


@app.route("/manager/delete_category", methods=['DELETE'])
def manager_delete_category():
    """
    Delete a category.

    Args:
        None

    Returns:
        JSON: A JSON response containing the result of the operation.
    """
    data = request.get_json()
    category_id = data.get('category_id')

    return_data = delete_category(DB_PATH, category_id)
    return jsonify(return_data), 200


@app.route("/manager/add_menu_item", methods=['POST'])
def manager_add_menu_item():
    """
    Add a new menu item.

    Args:
        None

    Returns:
        JSON: A JSON response containing the result of the operation.
    """
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    ingredients = data.get('ingredients')
    category = data.get('category')
    cost = data.get('cost')
    image = data.get('image')

    return_data = add_menu_item(DB_PATH, name, description, ingredients, category, cost, image)
    return jsonify(return_data), 200


@app.route('/manager/upload_image', methods=['POST'])
def upload_file():
    """
    Upload an image.

    Args:
        None

    Returns:
        JSON: A JSON response containing a success message if the upload is successful,
        or an error message if the upload fails.
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        filename = file.filename
        file.save(os.path.join(BASE_DIR, 'itemimages', filename))
        return jsonify({'success': 'File uploaded successfully'})


@app.route("/manager/edit_menu_item", methods=['PUT'])
def manager_edit_menu_item():
    """
    Edit a menu item.

    Args:
        None

    Returns:
        JSON: A JSON response containing the result of the operation.
    """
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
    """
    Delete a menu item.

    Args:
        None

    Returns:
        JSON: A JSON response containing the result of the operation.
    """
    data = request.get_json()
    id = data.get('id')

    return_data = delete_menu_item(DB_PATH, id)
    return jsonify(return_data), 200


@app.route("/manager/reorder_categories", methods=['PUT'])
def manager_reorder_categories():
    """
    Reorder categories.

    Args:
        None

    Returns:
        JSON: A JSON response containing the result of the operation.
    """
    data = request.get_json()
    categories = data.get('categories')

    return_data = reorder_categories(DB_PATH, categories)
    return jsonify(return_data), 200


@app.route("/manager/reorder_menu_items", methods=['PUT'])
def manager_reorder_menu_items():
    """
    Reorder the menu items.

    Args:
        None

    Returns:
        JSON: A JSON response containing the result of the operation.
    """
    data = request.get_json()
    menu_items = data.get('menu_items')

    return_data = reorder_menu_items(DB_PATH, menu_items)


@app.route("/manager/show_accounts", methods=['GET'])
def get_accounts():
    """
    Fetch all accounts.

    Args:
        None

    Returns:
        JSON: A JSON response containing all accounts.
    """
    return_data = show_accounts(DB_PATH)
    return jsonify(return_data), 200


@socketio.on('connect')
def handle_connect():
    """
    Handle a client connection.

    Args:
        None

    Returns:
        None
    """
    print('Client connected')


@socketio.on('update_order_status')
def handle_update_order_status(data):
    """
    Handle an order status update.

    Args:
        data (dict): A dictionary containing the order status update data.

    Returns:
        None
    """
    status = data.get('status')
    order_id = data.get('order_id')
    item_id = data.get('item_id')
    quantity = data.get('quantity')

    change_order_status(DB_PATH, status, order_id, item_id, quantity)
    return_data = show_all_orders(DB_PATH)
    emit('updated_order_status', return_data, broadcast=True)


@socketio.on('update_notification_status')
def handle_update_notification_status(data):
    """
    Handle a notification status update.

    Args:
        data (dict): A dictionary containing the notification status update data.

    Returns:
        None
    """
    notification_id = data.get('notification_id')
    new_status = data.get('new_status')

    update_notification(DB_PATH, notification_id, new_status)
    return_data = get_notifications(DB_PATH)
    emit('updated_notification_status', return_data, broadcast=True)


@socketio.on('add_notification')
def handle_add_notification(data):
    """
    Handle a new notification.

    Args:
        data (dict): A dictionary containing the new notification data.

    Returns:
        None
    """
    table_id = data.get('table_id')
    notification_type = data.get('notification_type')
    add_notification(DB_PATH, table_id, notification_type)
    return_data = get_notifications(DB_PATH)
    emit('updated_notification_status', return_data, broadcast=True)


@socketio.on('send_order')
def handle_send_order(data):
    """
    Handle a new order.

    Args:
        data (dict): A dictionary containing the new order data.

    Returns:
        None
    """
    table_id = data.get('table_id')
    order_items = data.get('order_items')

    send_order_to_database(DB_PATH, table_id, order_items)
    return_data = get_customer_past_orders(DB_PATH, table_id)
    emit('sent_orders', return_data)
    return_data = show_all_orders(DB_PATH)
    emit('updated_order_status', return_data, broadcast=True)

@app.route('/manager/edit_customisation', methods=['PUT'])
def manager_edit_customisation():
    data = request.get_json()
    id = data.get('customisation_id')
    logo = data.get('logo_image')
    primary_colour = data.get('primary_hex_code')
    secondary_colour = data.get('secondary_hex_code')

    return_data = edit_customisation(DB_PATH, id, logo, primary_colour, secondary_colour)
    return jsonify(return_data), 200

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', allow_unsafe_werkzeug=True, debug=True)
