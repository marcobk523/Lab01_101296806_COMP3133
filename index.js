const fs = require('fs');
const csvParser = require('csv-parser');

const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

// Delete canada.txt and usa.txt if they exist
if (fs.existsSync(canadaFile)) {
    fs.unlinkSync(canadaFile);
}
if (fs.existsSync(usaFile)) {
    fs.unlinkSync(usaFile);
}

// Function to write data to file
const writeDataToFile = (filename, data) => {
    const stream = fs.createWriteStream(filename, { flags: 'a' });
    stream.write(data + '\n');
};

// Read the CSV file and filter data
fs.createReadStream(inputFile)
    .pipe(csvParser())
    .on('data', (row) => {
        if (row.country === 'Canada') {
            writeDataToFile(canadaFile, `${row.country},${row.year},${row.population}`);
        } else if (row.country === 'United States') {
            writeDataToFile(usaFile, `${row.country},${row.year},${row.population}`);
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });