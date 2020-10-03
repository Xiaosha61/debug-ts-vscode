import * as http from 'http';

// Server has a 5 seconds keep-alive timeout by default
http.createServer((_req, res) => {
    res.write('hello\n');
    res.end();
}).listen(3000);

setInterval(() => {
    // Adapting a keep-alive agent
    http.get('http://localhost:3000', (res) => {
        res.on('data', (data) => {
            // Do nothing
            console.log({ data: process.env['MY_NAME'] + data.toString() });
        });
    });
}, 1000); // Sending request on 5s interval so it's easy to hit idle timeout
  