const fs = require('fs')
const d3 = require('d3')
const csv = fs.readFileSync('src/data/population.csv', 'utf-8')

const csvToJson = d3.dsvFormat(';').parse;
const data = csvToJson(csv)[0];
const years = Object.keys(data)
    .filter(key => key !== 'Year')
    .map(Number)

const list = years.map(year => ({
    year,
    population: Number(data[year])
}));

console.log(JSON.stringify(list));
