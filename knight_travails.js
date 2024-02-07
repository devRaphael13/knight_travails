function ShortestPath(source, destination) {
    const queue = [];
    const result = [];
    source = [source, null];
    queue.push(source);

    while (queue.length) {
        let point = queue.shift();
        result.push(JSON.stringify(point));

        if (point[0].toString() === destination.toString()) break;

        for (cord of getPossibleMoves(point[0])) {
            cord = [cord, point[0]];
            if (result.includes(cord.toString())) continue;
            else queue.push(cord);
        }
    }
    return findRoutes(result).reverse()
}

function getPossibleMoves(cordinate, reverse = false) {
    const [col, row] = reverse ? [7 - cordinate[0], cordinate[1]] : cordinate;

    const top = () => {
        return [
            [col - 1, row + 2],
            [col + 1, row + 2],
        ];
    };

    const bottom = () => {
        return [
            [col - 1, row - 2],
            [col + 1, row - 2],
        ];
    };

    const left = () => {
        return [
            [col - 2, row + 1],
            [col - 2, row - 1],
        ];
    };

    const right = () => {
        return [
            [col + 2, row + 1],
            [col + 2, row - 1],
        ];
    };

    const check = (col, row) => 0 <= col && col <= 7 && 0 <= row && row <= 7;

    return [...top(), ...bottom(), ...left(), ...right()].filter(([col, row]) => check(col, row));
}

function findRoutes(array) {
    const destination = JSON.parse(array[array.length - 1]);
    const route = [destination];
    let query = destination[1];

    while (query) {
        let result = JSON.parse(array.filter((x) => x.startsWith(`[${JSON.stringify(query)}`))[0]);
        route.push(result);
        query = result[1];
    }
    return route;
}

const path = ShortestPath([3, 3], [4, 3]);
console.dir(path, { maxArrayLength: null });

