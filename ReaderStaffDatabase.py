import sqlite3
import csv

conn = sqlite3.connect('StaffDatabase.db')
cursor = conn.cursor()

# Fetch all Info
cursor.execute("SELECT * FROM Staff")

# Fetch Data
results = cursor.fetchall()

conn.close()

# Write the fetched data into a file
with open('StaffData.csv', 'w', newline='') as csvfile:
    # Create a CSV writer object
    csvwriter = csv.writer(csvfile, delimiter='|')
    
    # Create headers
    csvwriter.writerow(['id', 'username', 'password', 'role'])
    
    # Write all data into the file
    for row in results:
        formatted_row = [str(item).strip().ljust(2) for item in row]
        csvwriter.writerow(formatted_row)