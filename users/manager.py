#!/usr/bin/env python3
# Generate users

import os, sys, random

def load_users():
    filename = './users.txt'
    users = {}
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            for line in f:
                parts = line.replace('\n', '').split(' ')
                users[parts[0] + parts[1]] = parts
    return users

def save_users(users):
    filename = './users.txt'
    with open(filename, 'w') as f:
        for uid in users:
            f.write(' '.join(users[uid]) + '\n')

def export_cred(users):
    filename = './cred.txt'
    with open(filename, 'w') as f:
        # f.write('Torque Scout 3 Account Login Information\n\n')
        for uid in users:
            user = users[uid]
            #[first, last, id, password, email]
            f.write(user[2].ljust(8) + ' ' + user[3] + ' (' + user[0] + ' ' + user[1] + ')\n')
            
def export_admin(users):
    filename = './admin.txt'
    with open(filename, 'w') as f:
        # f.write('Torque Scout 3 Admin Database Account Entries\n\n')
        for uid in users:
            user = users[uid]
            #[first, last, id, password, email]
            f.write(user[-1].ljust(8 + len('@scout.texastorque.org')) + ' ' + user[3] + '\n')

def get_id(first, last):
    if len(first) > 3:
        first = first[0:3]
    if len(last) > 5:
        last = last[0:5]
    return last + first

def get_random_password():
    return ('%030x' % random.randrange(16**30))[0:6]

def add_user(users, name):
    first = name[0]
    last = name[-1]
    id = get_id(first, last).lower()
    password = get_random_password()
    email = id + '@scout.texastorque.org'
    users[first + last] = [first, last, id, password, email]
    return users

def user_present(users, name):
    return name[0] + name[-1] in users

def load_names():
    filename = './names.txt'
    names = []
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            for line in f:
                parts = line.replace('\n', '').split(' ')
                names.append(parts)
    return names

if __name__ == '__main__':
    names =  load_names()
    users = load_users()
    for name in names:
        if not user_present(users, name):
            users = add_user(users, name)
    save_users(users)
    export_cred(users)
    export_admin(users)

