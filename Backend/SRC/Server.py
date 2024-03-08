# GOT INFO FROM: https://www.digitalocean.com/community/tutorials/processing-incoming-request-data-in-flask
#                https://www.geeksforgeeks.org/use-jsonify-instead-of-json-dumps-in-flask/ 
#                and 1531 server files/ lectures

@app.route('/staff_tablet_authentication', methods=['POST'])
def staff_tablet_authentication():
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

@app.route('/confirm_table', methods=['POST'])
def confirm_table():
    data = request.get_json()
    table_id = data.get('table_id')

    # Don't think this check is needed
    # if not table_id:
    #     return jsonify({'error': 'Invalid table_id'}), 400

    code = confirm_table(DB_PATH, table_id)
    return jsonify({'code': code}), 200

@app.route('/authenticate_table', methods=['POST'])
def authenticate_table():
    data = request.get_json()
    entered_code = data.get('entered_code')

    if not entered_code:
        return jsonify({'error': 'Ensure a 4 digit code has been entered'}), 400

    if authenticate_table(DB_PATH, entered_code):
        return jsonify({'authentication': 'Successful'}), 200
    else:
        return jsonify({'authentication': 'Failed - ensure you are at the correct table and have entered the right code'}), 401