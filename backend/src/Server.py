# GOT INFO FROM: https://www.digitalocean.com/community/tutorials/processing-incoming-request-data-in-flask
#                https://www.geeksforgeeks.org/use-jsonify-instead-of-json-dumps-in-flask/ 
#                and 1531 server files/ lectures

from flask import Flask, request, jsonify
import os
import sqlite3
import shutil
from InitDB import initialise_db
from Staff import staff_tablet_authentication
from Customer import confirm_table, authenticate_table, show_table, show_menu, send_order_to_database, get_all_categories
from flask_cors import CORS
from Helper import decode_token, decode_token_get_role

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

    token = staff_tablet_authentication(DB_PATH, username, password)
    
    if token:
        decode_token_role = decode_token_get_role(token)
        return jsonify({'authentication': 'Successful', 'role': decode_token_role, 'token': token}), 200
    else:
        return jsonify({'authentication': 'Failed - incorrect username and/or password'}), 401

@app.route('/staff/staff_logout', methods=['POST'])
def staff_logout():
    data = request.get_json()
    logout_code = data.get('logout_code')
    token = data.get('token')

    if not logout_code or not token:
        return jsonify({'error': 'Ensure logout_code and token fields have been filled'}), 400

    result = staff_tablet_logout(DB_PATH, logout_code, token)

    if result == "Logout successful":
        return jsonify({'message': 'Logout successful'}), 200
    else:
        return jsonify({'error': 'Invalid logout code'}), 401

@app.route('/customer/table_confirmation', methods=['POST'])
def table_confirmation():
    data = request.get_json()
    table_id = data.get('table_id')
    token = data.get('token')

    # Don't think this check is needed
    # if not table_id:
    #     return jsonify({'error': 'Invalid table_id'}), 400

    code = confirm_table(DB_PATH, table_id, token)
    return jsonify({'code': code}), 200

@app.route('/customer/table_authentication', methods=['POST'])
def table_authentication():
    data = request.get_json()
    entered_code = data.get('code')
    token = data.get('token')

    # if not entered_code:
    #     return jsonify({'error': 'Ensure a 4 digit code has been entered'}), 400

    if authenticate_table(DB_PATH, entered_code, token):
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

    add_notification(DB_PATH, table_id, notification_type, token)
    return jsonify({'message': 'Notification added successfully'}), 200

@app.route('waitstaff/notifications/get', methods=['GET'])
def fetch_notifications():
    data = request.get_json()
    token = data.get('token')
    notifications = get_notifications(DB_PATH, token)
    
    if notifications:
        return jsonify(notifications), 200
    else:
        return jsonify({'error': 'Failed to retrieve notifications'}), 500

@app.route('/customer/send_order', methods=['POST'])
def send_order():
    data = request.get_json()
    order_id = data.get('order_id')
    table_id = data.get('table_id')
    session_id = data.get('session_id')
    order_items = data.get('order_items')
    token = data.get('token')

    return_data = send_order_to_database(DB_PATH, order_id, table_id, session_id, order_items, token)
    return jsonify(return_data), 200

@app.route("/customer/showTable", methods=['GET'])
def showTable():
    data = request.get_json()
    token = data.get('token')
    
    return_data = show_table(DB_PATH, token)
    return jsonify(return_data), 200

# @app.route("/customer/selectTable", methods=['POST'])
# def selectTable():
#     data = request.get_json()
#     table_id = data.get('table_id')
#     return_data = select_table(DB_PATH, table_id)
#     return jsonify(return_data), 200

# @app.route("/customer/goBackTable", methods=['POST'])
# def goBackTable():
#     data = request.get_json()
#     table_id = data.get('table_id')
#     return_data = go_back_table(DB_PATH, table_id)
#     return jsonify(return_data), 200

@app.route("/customer/showMenu", methods=['GET'])
def showMenu():
    data = request.get_json()
    token = data.get('token')

    return_data = show_menu(DB_PATH, token)
    return jsonify(return_data), 200

@app.route("/customer/get_all_categories", methods=['GET'])
def get_categories():
    data = request.get_json()
    token = data.get('token')

    return_data = get_all_categories(DB_PATH, token)
    return jsonify(return_data), 200

if __name__ == '__main__':
    app.run(debug=True, port=3457)
