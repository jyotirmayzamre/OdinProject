import { createServer }from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs/promises';

//getting the path of the current directory
const filename = url.fileURLToPath(import.meta.url)
const dir = path.dirname(filename);

const server = createServer();


//server
//based on req.url, update the filepath of the HTML page to fetch data from
//read the appropriate HTML file
server.on('request', async (req, res) => {

    let file = '';
    
    switch(req.url) {
        case '/':
            file = path.join(dir, 'views', 'index.html');
            res.statusCode = 200;
            break;
        case '/about':
            file = path.join(dir, 'views', 'about.html')
            res.statusCode = 200;
            break;

        case '/contact-me':
            file = path.join(dir, 'views', 'contact-me.html')
            res.statusCode = 200;
            break;
        
        default:
            file = path.join(dir, 'views', '404.html');
            res.statusCode = 404;
            break;
    }

    res.setHeader('Content-Type', 'text/html');
    const data = await fs.readFile(file);
    res.write(data);
    res.end();


})

server.listen(8000, () => {
    console.log('Server running at localhost:8000');
});