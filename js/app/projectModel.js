var BTD;

BTD = BTD || {};

BTD.ProjectModel = Backbone.Model.extend({
  defaults: {
    title: 'Your first todo list',
    todos: [],
    incompleteCount: 0
  },
  todosCollection: [],
  localStorage: new Store('BTD_Projects'),
  initialize: function() {
    _.bindAll(this, 'addTodo', 'saveProject');
    this.todosCollection = new BTD.TodosCollection(this.get('todos'));
    this.todosCollection.on('remove', this.saveProject);
    this.todosCollection.on('change:complete', this.saveProject);
    return this.on('sync', function() {
      return console.log('sync');
    });
  },
  /*
    Checks to see if a project contains any todo items
  */
  isEmpty: function() {
    return this.todosCollection.length === 0;
  },
  /*
    Checks for a truthy and non-blank title attribute
    @param obj attrs
  */
  validate: function(attrs) {
    if (!attrs.title || attrs.title === "") return 'Projects must have a title';
  },
  /*
    Add a new todo item to the project.
  
    @param {Object} attrs. A hash of todo model attributes.
    @param {Function} success Success callback function.
    @param {Function} error Error callback function.
  */
  addTodo: function(attrs, success, error) {
    var todo,
      _this = this;
    todo = new BTD.TodoModel;
    todo.on('change', function() {
      _this.todosCollection.add(todo);
      return _this.saveProject(success, error);
    });
    return todo.set(attrs, {
      'error': function(model, error) {
        return console.log('New todo error', model, error);
      }
    });
  },
  /*
    Save the project.
    
    @param {Function} success Success callback function.
    @param {Function} error Error callback function.
  */
  saveProject: function(success, error) {
    var _this = this;
    return this.save({
      title: this.get('title'),
      todos: this.todosCollection.toJSON()
    }, {
      'success': function(model, resp) {
        if (_.isFunction(success)) success(model, resp);
        return BTD.Mediator.publish('project:updated');
      },
      'error': function(model, resp) {
        console.log('projectModel.updateProject save error', model, resp);
        if (_.isFunction(error)) return error(model, resp);
      }
    });
  }
});
