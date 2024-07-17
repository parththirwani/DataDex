
import sys
  
##USER_CODE_HERE##

def sum(num1, num2):
    return num1 + num2
def main():
    input = sys.stdin.read().split()
    num1 = int(input.pop(0))
    num2 = int(input.pop(0))
    result = sum(num1, num2)
    print(result)
  
if __name__ == "__main__":
    main()
  