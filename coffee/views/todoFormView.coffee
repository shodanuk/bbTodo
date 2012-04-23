BTD = BTD or {}

BTD.TodoFormView = Backbone.View.extend
  template: dust.compileFn $("#tmpl-todo-form").html(), 'todoFormView'

  events:
    'submit form' : 'onSubmit'

  initialize: ->
    _.bindAll @, 'render', 'onSubmit'

  render: ->
    @template 
      body : '', date : ''
      (err, out) =>
        @$el.html out

        # Cache references to DOM elements.
        @$bodyInput     = @$ "#todo-body"
        @$inlineHelp    = @$ ".help-block"
        @$inputWrapper  = @$bodyInput.closest '.control-group'

        BTD.Mediator.publish 'ui:ready', @

    return @

  ###
  Submit event handler for the todo form.
  
  @param {Object} evt DOM event
  ###
  onSubmit: (evt) ->
    evt.preventDefault()

    @options.project.addTodo
      # New todo model attributes
      'body': @$bodyInput.val(),

      # Success callback function
      =>
        @$bodyInput.val '', # Clear the body form field

      # Error callback function
      =>
        @onError null, 'Set a proper error message here'
  
  ###
  Reset the form to it's original state. Remove any feedback, messages,
  styling etc.
  ###
  resetForm: ->
    @$inputWrapper.removeClass 'error'
    @$bodyInput.removeClass 'error'
    @$inlineHelp.text ""

  ###
  Display error message and add error styling.

  @param {Object} model
  @param {String} error Error message text
  ###
  onError: (model, error) ->
    @$inputWrapper.addClass 'error'
    @$bodyInput.addClass 'error'
    @$inlineHelp.text error