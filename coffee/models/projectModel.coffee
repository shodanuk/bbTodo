BTD = BTD or {}

BTD.ProjectModel = Backbone.Model.extend
  defaults:
    title: 'Your first todo list'
    todos: []
    incompleteCount: 0

  todosCollection: []
  localStorage: new Store 'BTD_Projects'

  initialize: ->
    _.bindAll @, 'addTodo', 'saveProject' 

    @todosCollection = new BTD.TodosCollection @get('todos')
    @todosCollection.on 'remove', @saveProject
    @todosCollection.on 'change:complete', @saveProject
    @on 'sync', ->
      console.log 'sync'
    
  ###
  Checks to see if a project contains any todo items
  ###
  isEmpty: ->
    @todosCollection.length == 0

  ###
  Checks for a truthy and non-blank title attribute
  @param obj attrs
  ###
  validate: (attrs) ->
    'Projects must have a title' if not attrs.title or attrs.title == ""

  ###
  Add a new todo item to the project.

  @param {Object} attrs. A hash of todo model attributes.
  @param {Function} success Success callback function.
  @param {Function} error Error callback function.
  ###
  addTodo: (attrs, success,  error) ->
    todo = new BTD.TodoModel

    todo.on 'change', =>
      @todosCollection.add todo
      @saveProject success,  error
    
    todo.set attrs,
      'error': (model, error) =>
        console.log 'New todo error', model, error

  ###
  Save the project.
  
  @param {Function} success Success callback function.
  @param {Function} error Error callback function.
  ###
  saveProject: (success, error) ->
    @save title: @get('title'), todos: @todosCollection.toJSON(), # Convert todos collection to JSON and set the todos attribute to it's value.
    
      # Wait for the server to finish saving before firing the change event.
      # 'wait'      : true

      # Success callback function.
      'success': (model, resp) =>
        success model, resp if _.isFunction success
        BTD.Mediator.publish 'project:updated'

      # Error callback function.
      'error': (model, resp) =>
        console.log 'projectModel.updateProject save error', model, resp
        error model, resp if _.isFunction error        