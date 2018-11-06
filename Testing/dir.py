#!/usr/bin/env python3
from __future__ import print_function
import os
import sys

path = '.'

if len(sys.argv) == 2:
    path = sys.argv[1]


files = os.listdir(path)
for name in files:
    print(name)
