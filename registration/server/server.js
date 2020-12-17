const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {
    PythonShell
} = require('python-shell');
const app = express();
const port = 3000 || process.env.port;

// Handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "*",

    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({
            status: true,
            message: "request granted",
        });
    }
    next();
});

// Middlewares
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
    console.log('requesting python script');
    let options = {
        mode: "text",
        args: ["../../python/haarcascades/haarcascade_frontalface_default.xml", "../../python/training-images/"]
    };

    let pyshell = new PythonShell('../../python/attendance/registration.py', options);

    pyshell.end(function(err) {
        if (err)
            console.log(err);

        res.status(201).json({
            status: true,
            message: 'Training complete'
        });
    });

    python_process = pyshell.childProcess;
    console.log('ended python script')
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