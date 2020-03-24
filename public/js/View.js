class Page {
    constructor(htmlElement) {
        this.createMainPage(htmlElement);
    }

    createMainPage(htmlElement) {
        let head = document.createElement('header');
        htmlElement.appendChild(head);
        let header = document.createElement('h1');
        header.classList.add('header-primary');
        head.appendChild(header);
        header.textContent = "Submit To-Do List";
        let formContainer = document.createElement('div');
        formContainer.classList.add('container__form');
        htmlElement.appendChild(formContainer);
        let pageForm = document.createElement('div');
        pageForm.classList.add('form-control');
        formContainer.appendChild(pageForm);
        let nameLabel = document.createElement('label');
        nameLabel.htmlFor = 'name';
        nameLabel.textContent = "Task name:";
        nameLabel.classList.add('form-label');
        pageForm.appendChild(nameLabel);
        let nameInp = document.createElement('input');
        nameInp.classList.add('form-input');
        nameInp.type = 'text';
        nameInp.id = 'name';
        nameInp.name = 'name';
        nameInp.placeholder = 'Add task name ....';
        nameInp.name = 'name';
        pageForm.appendChild(nameInp);
        let submitButton = document.createElement('button');
        submitButton.classList.add('submitBtn');
        submitButton.textContent = "Add task";
        submitButton.type = 'submit';
        pageForm.appendChild(submitButton);
        submitButton.title = 'submit';
        submitButton.id = 'submit';
        modelObject.readTask();
        let list = document.createElement('div');
        list.classList.add('list');
        list.id = 'todos';
        pageForm.appendChild(list);


    }

    createTaskList(data) {
        while(document.getElementById('todos').firstChild){
            document.getElementById('todos').firstChild.remove()
        }
        if (data.length === 0) {
            document.getElementById('todos').textContent = 'no tasks pls submit :)';
        } else {
            let listEl;
            let holder;
            let btnDelete;
            let btnEdit;
            for (let i = 0; i < data.length; i++) {
                holder = document.createElement('div');
                holder.classList.add('task-holder');
                document.getElementById('todos').appendChild(holder);
                new TaskIcon({
                    id: 'taskIcon',

                }, holder);
                listEl = document.createElement('input');
                listEl.type = 'text';
                listEl.classList.add('list-element');
                listEl.id='task-'+i;
                listEl.value = data[i].title;
                btnDelete = document.createElement('button');
                btnDelete.classList.add('deleteBtn');
                btnDelete.textContent = 'Remove';
                holder.appendChild(listEl);
                holder.appendChild(btnDelete);
                btnDelete.name = data[i].id;
                btnEdit = document.createElement('button');
                btnEdit.classList.add('editBtn');
                btnEdit.textContent = 'Edit';
                holder.appendChild(btnEdit);
                btnEdit.name = data[i].id;
            }
        }
        let deleteBtns = document.querySelectorAll('.deleteBtn');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                let id = parseInt(e.target.name);
                modelObject.deleteTodo(id)

            })
        });
        let editBtns = document.querySelectorAll('.editBtn');
        editBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                let id = parseInt(e.target.name);
                modelObject.editTodo(id)
            })
        });

    }
    displayTasks(data) {
        console.log(data)
        while(document.getElementById('todos').firstChild){
            document.getElementById('todos').firstChild.remove()
        }
    }

}