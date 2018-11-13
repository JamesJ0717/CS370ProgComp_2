
import random

if __name__ == "__main__":
    L = random.randint(1, 10)
    print(L)
    sm = 0
    for i in range(L):
        n = random.randint(1, 10)
        sm += n
        print("_")
        print(n)
    
    for i in range(L):
        n = random.randint(1, 10)
        n = min(sm, n)
        sm -= n
        print("_")
        print(n)
    

