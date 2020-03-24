const fs = require('fs');
const db = require('./db');
const json = require("express").json;
let collection ='tasks';
let addTodo = (name) => {
    let todos = [];
    let todo = {
        title: name,
        id: 1
    };

    try {
        let todosString = fs.readFileSync('todos-data.json');
        todos = JSON.parse(`${todosString}`);
        todo.id = todos.length;
    } catch (e) {
    }

    let duplicated = todos.filter((todo) => todo.title === name);

    if (duplicated.length === 0) {
        todos.push(todo);
        fs.writeFileSync('todos-data.json', JSON.stringify(todos));
        db.getDB().collection(collection).insertOne(todo,(err,result,next)=>{
            if(err){
                const error = new Error("Failed to insert Todo Document");
                error.status = 400;
                next(error);
            }
            else
                json({result : result, document : result.ops[0],msg : "Successfully inserted Todo!!!",error : null});
        });
    }
    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     let dbo = db.db("tasksDetails");
    //     console.log(myObj)
    //     // var myObj = { title: 'dada', id: 37 };
    //     dbo.collection("tasks").insertOne(myObj, function(err, res) {
    //         if (err) throw err;
    //         console.log("1 document inserted");
    //         db.close();
    //     });
    // });
};
// usuwanie //
let deleteTodo = (id) => {
    let todos = extractTodos();
    let filteredtodos = todos.filter((todo) => todo.id !== id);
    saveTodos(filteredtodos);
    db.getDB().collection(collection).deleteOne({id:id})
    return todos.length !== filteredtodos.length;
};

let extractTodos = () => {
    try {
        let todosString = fs.readFileSync('todos-data.json');
        return JSON.parse(`${todosString}`);
    } catch (e) {
        return [];
    }
};

let saveTodos = (todos) => {
    fs.writeFileSync('todos-data.json', JSON.stringify(todos));
};
let readTodo = (title) => {
    let todos = extractTodos();
    let filteredTodos = todos.filter((todo) => todo.title === title);
    return filteredTodos[0];
};
let logTodo = (todo) => {
    console.log(`tytuł: ${todo.title}`);
};
let updateTodo = (id, title) => {
    console.log(id)
    console.log(title)
    let todos = extractTodos();
    console.log(todos)
    let i;
    for (i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos[i].title = `${title}`;
            console.log(todos);
            fs.writeFileSync('todos-data.json', JSON.stringify(todos));
            db.getDB().collection(collection).updateOne({id:id},{$set:{title}})
            break;

        }
    }
};


//exports
module.exports = {
    addTodo,
    deleteTodo,
    readTodo,
    logTodo,
    updateTodo
};

