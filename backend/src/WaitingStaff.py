import sqlite3
from Helper import valid_user

def get_notifications(db, token):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    
    # Check if the token is valid
    if not valid_user(token):
        connection.close()
        return None

    sql = "SELECT table_id, notification_type, status FROM NOTIFICATIONS ORDER BY notification_id DESC"
    cursor.execute(sql)
    
    notifications = cursor.fetchall()
    categorized_notifications = {'Assistance': [], 'Bill': []}
   
    for notification in notifications:
        table_id, notification_type, status = notification
        entry = {'table_id': table_id, 'status': status}
        categorized_notifications[notification_type].append(entry)
    return categorized_notifications

    connection.close()