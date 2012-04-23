BTD = BTD or {}

BTD.TodoView = Backbone.View.extend
  template: dust.compileFn $("#tmpl-todo").html()
  tagName: 'li'
  className: 'todo'
  events:
    'click .status' : 'statusClick',
    'click .delete' : 'deleteClick'

  initialize: ->
    _.bindAll @, 'render', 'statusClick', 'deleteClick'
    @model.on 'change', @render
    @model.view = @
    @$el.addClass 'complete' if @model.get 'complete' 
      
  render: ->
    @template @model.toJSON(), (err, out) =>
      @$el.html out
    return @
    
  ###
  Click event handler for the todo status toggle.
  
  @param {Object} evt DOM event
  ###
  statusClick: (evt) ->
    evt.preventDefault()
    @model.toggle()
    @$el.toggleClass 'complete'

  ###
  Click event handler for the delete todo button.
  
  @param {Object} evt DOM event
  ###
  deleteClick: (evt) ->
    evt.preventDefault()
    @model.clearTodo()