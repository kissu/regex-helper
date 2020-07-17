const fs = require('fs');
const csv = require('csv-parser');

const interestingFields = ["uboard_leader", "uboard_member", "Donor", "tesserato", "Volontario", "Collaboratore", "IVP", "IVC", "IVMC", "IVZ", "IVE", "[a-z]*_cantiere"]
const regex = new RegExp(`\\d*;|\\b(?<![\\w\\d])(${interestingFields.join('|')})(?![\\w\\d])`, 'gi')

fs.writeFileSync('output.csv', 'ID contact,Tags\n')
fs.createReadStream('input.csv').pipe(csv())
  .on('data', (row) => {
    const wholeString = Object.values(row).join(' ')

    // console.log(wholeString);
    const matchedString = wholeString.match(regex)
    if (/[A-Za-z]/.test(matchedString)) {
      const result = matchedString.join(',').replace(';,', ';').concat('\n')
      console.log(result)
      fs.appendFileSync('output.csv', result)
    }
  })
// .on('end', () => {
//   console.log('CSV file successfully processed');
// });
