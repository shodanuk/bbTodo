var todoListData = [{
    "title":  "List A",
    "todos": [
        {
            "body": "List A item 1",
            "complete": "false",
            "date": "11-01-2011 08:36:30"
        },
        {
            "body": "List A item 2",
            "complete": "false",
            "date": "11-01-2011 08:38:30"
        },
        {
            "body": "List A item 3",
            "complete": "true",
            "date": "12-01-2011 08:32:30"
        },
        {
            "body": "List A item 4",
            "complete": "true",
            "date": "11-02-2011 08:36:30"
        }
    ]
}, {
    "title": "List B",
    "todos": [
        {
            "body": "List B item 1",
            "complete": "false",
            "date": "11-01-2011 08:36:30"
        },
        {
            "body": "List B item 2",
            "complete": "true",
            "date": "11-01-2011 08:38:30"
        },
        {
            "body": "List B item 3",
            "complete": "true",
            "date": "12-01-2011 09:36:30"
        },
        {
            "body": "List B item 4",
            "complete": "true",
            "date": "11-02-2011 20:36:30"
        }
    ]
}];

//describe("List of Todo Lists", function() {
//
//    beforeEach(function () {
//        this.todoList = new Project(todoListData[0]);
//    });
//
//});

describe("Todo List", function () {

    beforeEach(function () {
        this.project = new BTD.models.Project();
        this.project.set(todoListData[0]);
    });

    it("creates from data", function () {
        expect(this.project.get('todos').length).toEqual(4);
    });

    it("is empty", function () {
        expect(this.project.isEmpty()).toBeTruthy();
    });

//    it("has incomplete todos", function () {
//        expect(this.todoList.isEmpty()).toBeTruthy();
//    });

});

describe("Todo", function() {
  
    beforeEach(function() {
        this.todo = new BTD.models.Todo();
        this.todo.set(todoListData[0].todos[2]);
    });

    it("has a body", function () {
        expect(this.todo.get('body')).not.toBeNull();
    });

    it("has a date", function () {
        expect(this.todo.get('date')).not.toBeNull();
    });

    it("has a completion status", function () {
        expect(this.todo.get('complete')).not.toBeNull();
    });

    it("is complete", function () {
        expect(this.todo.get('complete')).toBeTruthy();
    });

    it("is incomplete", function() {
        this.todo.set({'complete': false});
        expect(this.todo.get('complete')).toBeFalsy();
    });

});