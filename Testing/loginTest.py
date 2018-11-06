#! /usr/bin/env python3

import os
import requests
import random
import string
import json

chars = string.ascii_letters + string.digits + '!@#$%^&*()'
random.seed = (os.urandom(1024))

url = 'http://192.168.228.192:8080/login'
names = json.loads(open('names.json').read())

for name in names:
    name_extra = ''.join(random.choice(string.digits))
    username = name.lower() + name_extra + '@yahoo.com'
    password = ''.join(random.choice(chars) for i in range(8))

    r = requests.post(url, allow_redirects=False, data={
        'email': username,
        'password': password
    })

    print(r.text)
