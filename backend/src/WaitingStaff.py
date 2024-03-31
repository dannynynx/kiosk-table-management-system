import sqlite3
from Helper import valid_user

def get_notifications(db, token):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    
    # Check if the token is valid
    if not valid_user(token):
        connection.close()
        return None

    # If u want reversed order change DESC to ASC
    sql = "SELECT table_id, notification_type, status FROM NOTIFICATIONS ORDER BY notification_id DESC"
    cursor.execute(sql)
    
    notifications = cursor.fetchall()
    categorized_notifications = []

    for notification in notifications:
        table_id, notification_type, status = notification
        entry ={'notification_type': notification_type, 'table_id': table_id, 'status': status}
        categorized_notifications.append(entry)
    return categorized_notifications

    connection.close()