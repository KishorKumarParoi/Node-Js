/*
 * Title : Weather App
 * Description : A simple weather app that shows the current weather of a city
 * Author : Kishor Paroi
 * Date : 2023/09/25
 * Time : 10:40:13
 */

// Dependencies
import fs from 'fs';
import http from 'http';
// App object
const app = {};
const port = 3000;

// Create server
app.server = http
    .createServer((req, res) => {
        const ourReadStream = fs.createReadStream('./lib/fetch/fetch.txt');
        const writeStream = fs.createWriteStream('./lib/fetch/write.txt', 'utf8');
        ourReadStream.pipe(res);
        ourReadStream.pipe(writeStream);
        const body = [];
        ourReadStream.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        ourReadStream.on('end', () => {
            console.log('finished');
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
        });
    })
    .listen(port);

console.log(`Server is running on port ${port}`);
console.log(app);
