import sqlite3
import random

def staff_tablet_authentication(db, username, password):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM STAFF WHERE username=? AND password=?", (username, password))
    table_info = cursor.fetchone()

    connection.close()

    return table_info is not None


# Only generate and add code to set once customer confirms table
# remove code from set once customer requests bill
generated_codes = set()
def generate_unique_code():
    while True:
        code = ''.join([str(random.randint(0, 9)) for _ in range(4)])
        if code not in generated_codes:
            generated_codes.add(code)
            return code

def confirm_table(db, table_id):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    code = generate_unique_code()

    # Store the generated code
    cursor.execute("UPDATE TABLES SET code=? WHERE table_id=?", (code, table_id))

    connection.commit()
    connection.close()

    return code

# def get_table_id(username, password):
#     connection = sqlite3.connect("BlueZebra.db")
#     cursor = connection.cursor()

#     # Query the STAFF table to retrieve the table ID associated with the provided username and password
#     cursor.execute("SELECT role FROM STAFF WHERE username=? AND password=?", (username, password))
#     result = cursor.fetchone()

#     connection.close()

#     if result:
#         # If a matching staff member is found, return the associated table ID
#         return result[0]
#     else:
#         # If no matching staff member is found, return None
#         return None

def authenticate_table(db, entered_code):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    # Retrieve stored code for the table
    cursor.execute("SELECT code FROM TABLES WHERE is_occupied=1")
    stored_codes = cursor.fetchone()

    connection.close()

    for stored in stored_codes:
        if stored == entered_code:
            return True #successfull authentication

    return False 