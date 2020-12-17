const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {
    PythonShell
} = require('python-shell');
const app = express();
const port = 3000 || process.env.port;

// Middlewares
app.options('*', cors())
app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('Server is running')
})

var python_process;
app.post('/start', function(req, res) {
    let pyshell = new PythonShell('../../python/attendance/registration.py');

    pyshell.end(function(err) {
        if (err)
            console.log(err);

        res.status(201).json({
            status: true,
            message: 'Training complete'
        });
    });

    python_process = pyshell.childProcess;
});

app.post('/stop', function(req, res) {
    python_process.kill('SIGINT');
    res.status(201).json({
        status: true,
        message: 'Process killed'
    });
});

// Throw 404 error if the request does not match an existing route
app.use((req, res, next) => {
    const error = new Error();
    error.status = 404;
    error.message = "404 route not found";
    next(error);
});

//  Return the error thrown by any part of the project.
app.use((err, req, res, next) => {
    res.status(err.status || 404).json({
        status: false,
        error: err.message,
    });
});

app.listen(port, () => {
    console.log(`Registration-server is running at http://localhost:${port}`);
})