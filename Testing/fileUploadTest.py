#! /usr/bin/env python3

import os
import requests
import json
import time

url = 'http://192.168.228.192:8080/fileupload'
files = json.loads(open('fileNames.json').read())

for i in files:
    upload = {'filetoupload': open(i, 'r')}
    values = {'author': 'James'}

    r = requests.post(url, allow_redirects=False, files=upload, data=values)

    print(r.text)
    time.sleep(5)
