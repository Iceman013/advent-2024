from collections import Counter

data = "4 4841539 66 5279 49207 134 609568 0"


test_data ='''125 17'''


def solve1(data: str) -> int:
    stones = [int(x) for x in data.split(' ')]

    stones = Counter(stones)

    for _ in range(75):
        new_stones = Counter()

        for stone, count in stones.items():
            stone_str = str(stone)
            if stone == 0:
                new_stones[1] += count
            elif len(stone_str) % 2 == 0:
                new_stones[int(stone_str[:len(stone_str) // 2])] += count
                new_stones[int(stone_str[len(stone_str) // 2:])] += count

            else:
                new_stones[stone * 2024] += count

        stones = new_stones

    return sum(stones.values())


def solve2(data: str) -> int:
    ans = 0


    return ans


print(solve1(test_data))
print(solve1(data))
print(solve2(test_data))
print(solve2(data))