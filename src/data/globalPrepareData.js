const fs = require('fs')
const d3 = require('d3')
const csv = fs.readFileSync('src/data/global-plastics.csv', 'utf-8')

const csvToJson = d3.csvParse;
const data = csvToJson(csv);

const data2 = data.map(d => ({
    year: parseInt(d.Year, 10),
    tonnes: parseInt(d.Tonnes, 10)
}));

console.log(JSON.stringify(data2));