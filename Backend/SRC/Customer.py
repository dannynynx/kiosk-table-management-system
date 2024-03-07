

def staff_tablet_authentication(db, username, password):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    
    cursor.execute("SELECT * FROM tables WHERE username=? AND password=?", (username, password))
    table_info = cursor.fetchone()
    
    connection.close()
    
    return table_info is not None

def generate_table_code(db, table_id):
    # 4 digit code
    four_digit_code = ''.join([str(random.randint(0, 9)) for _ in range(4)])
    
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    
    # update table status to occupied
    cursor.execute("UPDATE TABLES SET is_occupied=1 WHERE table_id=?", (table_id,))
    
    # create a new session with the customer code
    cursor.execute("INSERT INTO SESSIONS (table_id, four_digit_code) VALUES (?, ?)", (table_id, four_digit_code))
    session_id = cursor.lastrowid
    
    # Link the session to the table
    cursor.execute("UPDATE TABLES SET current_session_id=? WHERE table_id=?", (session_id, table_id))
    
    connection.commit()
    connection.close()
    
    return four_digit_code

def table_authentication(db, table_id, entered_code):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    
    # check if table has been selected by a customer yet
    cursor.execute("""
        SELECT * FROM SESSIONS
        WHERE table_id=? AND four_digit_code=? AND is_active=1
    """, (table_id, entered_code))
    
    session = cursor.fetchone()
    
    connection.close()
    
    if session:
        # session is active and code is matching
        return True
    else:
        return False