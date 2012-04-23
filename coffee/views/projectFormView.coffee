BTD = BTD or {}

BTD.ProjectFormView = Backbone.View.extend
  projectFormTmpl: dust.compileFn $('#tmpl-project-form').html(), 'projectForm'

  events:
    'submit form'   : 'saveProject'
    'click .close'  : 'hide'

  initialize: ->
    _.bindAll @, 'saveProject', 'render', 'show', 'hide'
    BTD.Mediator.subscribe 'projectForm:show', @show

  ###
  Render the view. We cache references to some key dom elements for later use.
  ###
  render: ->
    # Default to a blank title
    title = ''
    form  = ''

    title = @model.get 'title' unless typeof @model == 'undefined'

    @projectFormTmpl 'title' : title, (err, out) =>
      @$el.html out

      # Cache key DOM elements
      @$projectTitle  = @$ "#project-title"
      @$controlGroup  = @$projectTitle.closest '.control-group'
      @$inlineHelp    = @$ ".help-inline"

      BTD.Mediator.publish 'ui:ready', @

    return @

  ###
  Save a new project

  @param obj evt DOM Event object
  ###
  saveProject: (evt) ->
    # Prevent event default event action
    evt.preventDefault()

    # Reset the title form field, removing any outstanding error messages and styling
    @resetTitle()

    if @options.collection?
      attrs = 'title': @$projectTitle.val()
      success = =>
      error   = (model, msg) =>
        @onError model, msg

      @options.collection.addProject attrs, success, error

  ###
  Reset the title form field to it's original state. Remove any feedback, messages,
  styling etc.
  ###
  resetTitle: ->
    @$controlGroup.removeClass 'error'
    @$projectTitle.removeClass 'error'
    @$inlineHelp.text ""

  ###
  Display error message and add error styling

  @param obj model
  @param string error Error message text
  ###
  onError: (model, error) ->
    @$controlGroup.addClass 'error'
    @$projectTitle.addClass 'error'
    @$inlineHelp.text error

  show: ->
      @$el.fadeIn 'fast'

    hide: ->
      @$el.fadeOut 'fast'