//Первая задача - попроще

function getRow(firstRow, secondRow, char) {
    if (char.length !== 1) {
        throw 'char не может быть длиннее 1 символа';
    }

    const firstRowCharCount = getCharCount(char, firstRow)
    const secondRowCharCount = getCharCount(char, secondRow)

    if (firstRowCharCount > secondRowCharCount) {
        return firstRow
    } else if (secondRowCharCount > firstRowCharCount) {
        return secondRow
    } else {
        return 'Строки не отличаются по количеству вхождений char: ' + char
    }
}

function getCharCount(char, row) {
    let counter = 0

    for (let i = 0; i < row.length; i++) {
        if (row.charAt(i) === char) {
            counter++
        }
    }

    return counter
}

const firstRow = prompt("Введите первое предложение для сравнения")
const secondRow = prompt("Введите второе предложение для сравнения")
const char = prompt("Введите символ для сравнения")


try {
    const result = getRow(firstRow, secondRow, char)
    alert(result)
} catch (e) {
    console.error(e);
    alert(e)
}