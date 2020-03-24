let page, modelObject;

class App {
    constructor(htmlElement) {
        modelObject = new Model();
        page = new Page(htmlElement);
        document.getElementById('submit').addEventListener('click', function () {
            modelObject.submitTasks();

        });

    }
}
