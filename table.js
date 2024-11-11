// øve litt på tables i programmering med arrays

const createSumTable = (m, n) => {
    // oppretter en 2D-tabell
    const table = Array(m).fill().map(() => Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            table[i][j] = i + j;
            console.log(table);
        }
    }
    return table;
}

console.log(createSumTable(5, 5));