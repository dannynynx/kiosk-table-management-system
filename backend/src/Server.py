# GOT INFO FROM: https://www.digitalocean.com/community/tutorials/processing-incoming-request-data-in-flask
#                https://www.geeksforgeeks.org/use-jsonify-instead-of-json-dumps-in-flask/ 
#                and 1531 server files/ lectures

from flask import Flask, request, jsonify
import os
from customer import staff_tablet_authentication, confirm_table, authenticate_table

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'database.db')

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

    if not entered_code:
        return jsonify({'error': 'Ensure a 4 digit code has been entered'}), 400

    if authenticate_table(DB_PATH, entered_code):
        return jsonify({'authentication': 'Successful'}), 200
    else:
        return jsonify({'authentication': 'Failed - ensure you are at the correct table and have entered the right code'}), 401

if __name__ == '__main__':
    app.run(debug=True)