var BTD;

BTD = BTD || {};

BTD.ProjectView = Backbone.View.extend({
  tagName: 'section',
  className: 'project',
  todoTemplate: dust.compileFn($("#tmpl-todo").html(), 'todo'),
  template: dust.compileFn($("#tmpl-project").html(), 'projectView'),
  events: {
    'click .update': 'clickUpdate'
  },
  initialize: function() {
    _.bindAll(this, 'render', 'insertTodo');
    this.model.on('todos:new', this.insertTodo);
    this.model.view = this;
    return this.model.todosCollection.on('add remove', this.render);
  },
  render: function() {
    var hasModel, onTemplateRender, viewData,
      _this = this;
    hasModel = this.model != null;
    viewData = {
      id: hasModel ? this.model.get('id') : 0,
      title: hasModel ? this.model.get('title') : false,
      todos: hasModel ? this.model.todosCollection.toJSON : []
    };
    onTemplateRender = function(err, out) {
      var onReady;
      onReady = function() {
        return BTD.Mediator.publish('ui:ready', _this);
      };
      _this.$el.html(out);
      if (hasModel) {
        _this.$todoList = _this.$('.todo-list');
        _this.insertAllTodos(onReady);
      } else {
        onReady();
      }
      return _this;
    };
    return this.template(viewData, onTemplateRender);
  },
  /*
    Insert a single todo view into the DOM.
    
    @param {Object} todoModel
  */
  insertTodo: function(todoModel) {
    var view;
    view = new BTD.TodoView({
      'model': todoModel
    });
    return this.$todoList.append(view.render().el);
  },
  /*
    Insert all todo views into the DOM
    
    @param {Function} callback Callback function to execute after inserting all todo items
  */
  insertAllTodos: function(callback) {
    this.model.todosCollection.each(this.insertTodo);
    if (_.isFunction(callback)) return callback();
  },
  /*
    Click event handler for the update button.
    
    @param {Object} evt DOM event
  */
  clickUpdate: function(evt) {
    return evt.preventDefault();
  }
});
