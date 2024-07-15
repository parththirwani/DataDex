
    import sys

    ##USER_CODE_HERE##

    def main():
        input = sys.stdin.read().split()
        size_arr = int(input.pop(0))
arr = [int(x) for x in input[:size_arr]]
        result = maxElement(arr)
        print(result)

    if __name__ == "__main__":
        main()

        