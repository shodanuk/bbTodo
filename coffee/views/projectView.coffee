BTD = BTD or {}

BTD.ProjectView = Backbone.View.extend
  tagName: 'section'
  className: 'project'

  # Precompile and cache view templates
  todoTemplate: dust.compileFn $("#tmpl-todo").html(), 'todo'
  template: dust.compileFn $("#tmpl-project").html(), 'projectView'

  events:
    'click .update' : 'clickUpdate'

  initialize: ->
    _.bindAll @, 'render', 'insertTodo'
    @model.on 'todos:new', @insertTodo
    @model.view = @
    @model.todosCollection.on 'add remove', @render

  render: ->
    hasModel = @model?
    
    viewData =
      id:    if hasModel then @model.get 'id' else 0
      title: if hasModel then @model.get 'title' else false
      todos: if hasModel then @model.todosCollection.toJSON else []

    onTemplateRender = (err, out) =>
      onReady = =>
        # Fire when the view has finished rendering
        BTD.Mediator.publish 'ui:ready', @

      @$el.html out

      # If the project has a view attached, render all it's todo views
      if hasModel
        @$todoList = @$('.todo-list')
        @insertAllTodos onReady
      else
        onReady()

      return @

    @template viewData, onTemplateRender

  ###
  Insert a single todo view into the DOM.
  
  @param {Object} todoModel
  ###
  insertTodo: (todoModel) ->
    view = new BTD.TodoView 'model': todoModel
    @$todoList.append view.render().el

  ###
  Insert all todo views into the DOM
  
  @param {Function} callback Callback function to execute after inserting all todo items
  ###
  insertAllTodos: (callback) ->
    @model.todosCollection.each @insertTodo
    callback() if _.isFunction callback
      

  ###
  Click event handler for the update button.
  
  @param {Object} evt DOM event
  ###
  clickUpdate: (evt) ->
    evt.preventDefault()

    # TODO make this work!
