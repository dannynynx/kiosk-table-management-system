import sqlite3
from Helper import valid_user, valid_user_specific

def get_notifications(db, token):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    
    # Check if the token is valid
    if not valid_user_specific(db, token):
        connection.close()
        return None

    # If u want reversed order change DESC to ASC
    sql = "SELECT notification_id, table_id, notification_type, status FROM NOTIFICATIONS ORDER BY notification_id DESC"
    cursor.execute(sql)
    
    notifications = cursor.fetchall()
    categorized_notifications = []

    for notification in notifications:
        notification_id, table_id, notification_type, status = notification
        entry ={'notification_id': notification_id, 'notification_type': notification_type, 'table_id': table_id, 'status': status}
        categorized_notifications.append(entry)
    return categorized_notifications

    connection.close()

def update_notification(db, notification_id, new_status, token):
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    # Check if the token is valid
    if not valid_user(token):
        connection.close()
        return False

    sql = "UPDATE NOTIFICATIONS SET status = ? WHERE notification_id = ?"
    cursor.execute(sql, (new_status, notification_id))
    connection.commit()
    print("Notification updated successfully")
    
    sql_select = "SELECT table_id, notification_type, status FROM NOTIFICATIONS WHERE notification_id = ?"
    cursor.execute(sql_select, (notification_id,))
    updated_notification = cursor.fetchone()

    if updated_notification:
        table_id, notification_type, status = updated_notification
        updated_entry = {'notification_type': notification_type, 'table_id': table_id, 'status': status}
        connection.close()
        return True, updated_entry
    else:
        print("Failed to retrieve updated notification")
        connection.close()
        return False, None