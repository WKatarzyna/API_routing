class Model {
    constructor() {
    }

    submitTasks() {
        let textField = document.querySelector("#name");
        let newItem = textField.value;
        let todo = {
            title: newItem
        };
        fetch("http://localhost:3000/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title:`${newItem}`})
        })
            .then((res) => res.json())
            .then((data) => page.displayTasks(data)

            )
            .catch((err) => console.log(err))
    }

    readTask() {
        fetch("http://localhost:3000/list")
            .then((res) => res.json())
            .then((data) => page.createTaskList(data))
            .catch((err) => console.log(err))

    }

    deleteTodo(id) {
        console.log(id)
        console.log('in delete');
        fetch('http://localhost:3000/list', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id),
        }).then(() => {
            console.log('removed');
        }).then((data) => console.log(data)) //metoda usunięcia dodać
            .catch(err => {
            console.error(err)
        });
    }

    editTodo(id) {
        console.log('in edit mode');
        console.log(id);
        let textField = document.querySelector("#task-" + id);
        let newItem = textField.value;
        const someData = {
            title: newItem,
            id: id
        }
        console.log(newItem)
        fetch('http://localhost:3000/list', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(someData),

        }).then(() => {
            console.log('updated');
        }).then((data) => console.log(data)).catch(err => { //metoda edycji
            console.error(err)
        });

    }

}