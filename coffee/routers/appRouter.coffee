BTD = BTD or {}

BTD.appRouter = Backbone.Router.extend
  routes:
    ''                      : 'home'
    'project/create'        : 'createProject'
    'project/show/:id'      : 'showProject'
    'project/delete/:id'    : 'deleteProject'
    'project/update/:id'    : 'updateProject'
    '404'                   : 'pageNotFound'
    '*other'                : 'pageNotFound'

  ###
  A list of all UI components. If you add a new one, add a reference to it here or the
  appReady event will never fire.
  ###
  uiComponents: [
    'appView'
    'projectListView'
    'projectView'
    'projectFormView'
    'todoFormView'
  ]

  ###
  The number of UI components that are rendered and in a 'ready' state. The count is incremented
  each time a ui:ready event is received from a UI component. When the count matches the number of
  items in the uiComponents array, the application is deemed 'ready' and the app:ready event is fired
  ###
  componentsReady: 0

  initialize: ->

    _.bindAll @, 'uiComponentReady', 'appError'

    BTD.Mediator.subscribe 'ui:ready', @uiComponentReady
    BTD.Mediator.subscribe 'app:error', @appError

    @projectsCollection = new BTD.ProjectsCollection
    
    #Fetch the project data from localStorage
    @projectsCollection.fetch()

    @appView = new BTD.AppView

    @projectListView = new BTD.ProjectListView
      'collection'    : @projectsCollection
      'el'            : "#project-list"

    @projectFormView = new BTD.ProjectFormView
      'collection'    : @projectsCollection
      'el'            : '#new-project-form'

    @todoFormView = new BTD.TodoFormView
      'el'            : "#new-todo-form"

    @projectListView.render()
    @projectFormView.render()
    @todoFormView.render()

  ###
  Display the main home page.
  ###
  home: ->
    if @projectsCollection.length
      projectModel = @projectsCollection.first()
    else
      projectModel = new BTD.ProjectModel
      @projectsCollection.add projectModel

    @projectView = new BTD.ProjectView
      el          : "#current-project"
      model       : projectModel
      collection  : @projectsCollection

    @todoFormView.options.project = projectModel
    @projectView.render()

  ###
  View a project.
  
  @param {String} id The ID of the project to display.
  ###
  showProject: (id) ->
    try
      projectModel = @projectsCollection.get id
    catch ex
      @navigate '404', { 'trigger' : true }
      return

    @projectsCollection.makeActive id
    @todoFormView.options.project = projectModel
    @projectView = new BTD.ProjectView
      el          : "#current-project"
      model       : projectModel
      collection  : @projectsCollection
    @projectView.render()

  ###
  Display the add new project form
  ###
  createProject: ->
    @home()
    @projectFormView.show()

  ###
  Delete a project.
  
  @param {String} id The ID of the project to be deleted.
  ###
  deleteProject: (id) ->
    try
      projectModel = @projectsCollection.get id
    catch ex
      console.log ex
      BTD.Mediator.publish 'app:error', 'Project delete failed, project not found.'
      return

    projectModel.destroy
      'success'   : (model, response) =>
        @projectsCollection.remove model # remove the model from the collection
        BTD.Mediator.publish 'project:deleted'
        @navigate '', { 'trigger': true }
      'error'     : (model, response) =>
        console.log 'Delete failed', model, response
        @navigate '', { 'trigger': true }

  ###
  Update a project.
  
  @param {String} id The Id of the project to update.
  ###
  updateProject: (id) ->
    try
      projectModel = @projectsCollection.get id
    catch ex
      BTD.Mediator.publish 'app:error', 'Project update failed, project not found.'
      return

  ###
  Default page if a request cannot be fulfilled
  
  TODO Implement a proper 404 page
  ###
  pageNotFound: ->
    @appView.$el.html '<h1>Sorry, the page you were looking for could not be found.</h1>' 

  ###
  Log a optional error message to the console and redirect to the '404 page'.
  
  @param {String} msg A message to be logged to teh console.
  ###
  appError: (msg) ->
    console.error msg if msg?
    @navigate '404', { 'trigger' : true }

  ###
  Increment the componentsReady count. If all components are ready, fire
  the app:ready event.
  ###
  uiComponentReady: ->
    @componentsReady++
    BTD.Mediator.publish 'app:ready' if @componentsReady == @uiComponents.length