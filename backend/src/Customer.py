import sqlite3
import random

def staff_tablet_authentication(db, username, password):
    pass

def generate_table_code(db, table_id):
    pass

def table_authentication(db, table_id, entered_code):
    pass

# Customer sees the available tables
# no arguments required
def customer_show_table():
    pass

# Customer is able to select a table
# requires the table id as argument
def customer_select_table(id):
    pass

def customer_go_back_table():
    pass

# Customer sees the menu
# no arguments needed
def customer_show_menu():
    pass

def select_item_quantity():
    pass

def add_order_item_menu(order_id, item_name):
    pass

def increase_order_item_cart(order_id, item_name):
    pass

def decrease_order_item(order_id, item_name):
    pass

### Helper functions ###
def get_item_quantity(order_id, item_name):
    pass

def check_item_exists_order(order_id, item_name):
    pass