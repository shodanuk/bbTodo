###
Main namespace
###
BTD = BTD or {}

BTD.TodoModel = Backbone.Model.extend(
  defaults:
    body: ''
    complete: false
    date: null

  localStorage: new Store 'BTD_Projects'

  ###
  Toggle the 'complete' state of the todo.
  ###
  toggle: ->
    @set
      "complete": not @get 'complete'

  ###
  Validate the todo model. Todos must have a non-blank body attribute.
  
  @param {Object} attrs
  ###
  validate: (attrs) ->
    'Todo items must cannot be blank' if not attrs.body || attrs.body == ''

  ###
  Remove the todo from db and remove it's view element from the DOM
  ###
  clearTodo: ->
    if not _.isUndefined @collection 
      @collection.on 'remove', =>
        @view.remove()

      @collection.remove @ 
    else
      @view.remove()
)