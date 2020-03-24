// ---------------Modules------------------- //
const fs = require('fs');
const todos = require('./todo');
const db = require('./db');
let command;
let title;
let id;

// ---------------JS files------------------- //
const cssFile = fs.readFileSync(`${__dirname}/public/css/style.css`);
const mainJsFile = fs.readFileSync(`${__dirname}/main.js`);
const appObjFile = fs.readFileSync(`${__dirname}/public/js/Controller.js`);
const pageObjFile = fs.readFileSync(`${__dirname}/public/js/View.js`);
const modelObjFile = fs.readFileSync(`${__dirname}/public/js/Model.js`);
const svgObjFile = fs.readFileSync(`${__dirname}/public/js/components/svgIcon.js`);

// ---------------Response Handler------------------- //
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/' && method === 'GET') {
        db.getDB().collection('tasks').find({}).toArray((err,documents)=>{
            if(err)
                console.log(err);
        });
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.readFile('./index.html', null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write('Whoops! File not found!');
            } else {
                res.write(data);
            }
            return res.end();
        });
    } else if (url === '/' && method === 'POST') {
        req.on('data', (chunk) => {
            let data = chunk.toString();
            title = JSON.parse(data);
            let name = title.title;
            command = 'addTodo';

            if (command === 'addTodo') {
                todos.addTodo(name);
            }
            command = 'readTodo';
            if (command === 'readTodo') {
                let todo = todos.readTodo(name);
                if (todo) {
                    todos.logTodo(todo);
                } else {
                }
            }
            res.writeHead(200);
            return res.end();
        })
    } else if (url === '/list' && method === 'GET') {
        fs.readFile('./todos-data.json', handleFile);

        function handleFile(err, data) {
            if (err) throw err
            res.writeHead(200, {
                'Content-Type': 'application/json',
            });
            res.write(data);
            res.end();
        }
    } else if (url === '/list' && method === 'DELETE') {
        req.on('data', chunk => {
            let data = chunk.toString();
            id = JSON.parse(data);
            command = 'deleteTodo';
            if (command === 'deleteTodo') {
                todos.deleteTodo(id);
            }
        });
        res.writeHead(200);
        return res.end();

    }
    else if (url === '/list' && method === 'PUT') {
        req.on('data', chunk => {
            let data = chunk.toString();
            console.log(data)
            let task = JSON.parse(data);
            console.log(task)
            id=task.id
            title= task.title
            command = 'editTodo';
            if (command === 'editTodo') {
                todos.updateTodo(id,title);
            }
        });
        res.writeHead(200);
        return res.end();

    }else if (url.match(/.css$/)) {
        res.writeHead(200, {
            'Content-type': 'text/css',
        });
        res.write(cssFile);
        return res.end();
    } else if (url.match(/.js$/)) {
        res.writeHead(200, {
            'Content-type': 'text/javascript',
        });
        res.write(mainJsFile);
        res.write(appObjFile);
        res.write(pageObjFile);
        res.write(modelObjFile);
        res.write(svgObjFile);
        return res.end();

    }

}

module.exports = {
    handler: requestHandler,
};
// module.exports.handler = requestHandler;
// module.exports.someText ='SomeText';
