##USER_CODE_HERE##

input = input().split()
size_arr = int(input.pop(0))
arr = [int(x) for x in input[:size_arr]]
result = maxElement(arr)
print(result)
    