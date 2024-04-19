import sqlite3


def get_notifications(db):
    """
    Fetch all notifications from the database.

    Args:
        db (str): The database path.

    Returns:
        list: A list of dictionaries, each representing a notification.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql = """
    SELECT notification_id, table_id, notification_type, status 
    FROM NOTIFICATIONS 
    ORDER BY notification_id DESC    
    """

    cursor.execute(sql)

    notifications = cursor.fetchall()
    
    categorized_notifications = []

    for notification in notifications:
        entry = {
            "notification_id": notification[0], 
            "notification_type": notification[2], 
            "table_id": notification[1],
            "status": notification[3]
        }
        categorized_notifications.append(entry)

    connection.close()

    return categorized_notifications


def update_notification(db, notification_id, new_status):
    """
    Update the status of a specific notification.

    Args:
        db (str): The database path.
        notification_id (int): The ID of the notification to update.
        new_status (str): The new status to set for the notification.

    Returns:
        dict: A dictionary representing the updated notification, or None if the update failed.
    """
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    sql1 = """
    UPDATE NOTIFICATIONS 
    SET status = :s
    WHERE notification_id = :n
    """
    
    cursor.execute(sql1, {"s": new_status, "n": notification_id})
    
    connection.commit()

    sql2 = """
    SELECT table_id, notification_type, status 
    FROM NOTIFICATIONS 
    WHERE notification_id = :n
    """
    
    cursor.execute(sql2, {"n": notification_id})
    
    updated_notification = cursor.fetchone()

    if updated_notification:
        updated_entry = {
            'notification_type': updated_notification[1], 
            'table_id': updated_notification[0], 
            'status': updated_notification[2]
        }
        connection.close()
        
        return updated_entry
    else:
        connection.close()
        
        return None
