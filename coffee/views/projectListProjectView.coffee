BTD = BTD or {}

BTD.ProjectListProjectView = Backbone.View.extend
  template: dust.compileFn $("#tmpl-project-list-project").html()
  tagName: 'li'
  className: 'clearfix'
  events:
    'click .delete': 'delete'

  initialize: ->
    _.bindAll @, 'render', 'delete'
    console.log @model

#    @collection.on 'add remove', @render
#    BTD.Mediator.subscribe 'project:updated', @render

  render: ->
    @template 'projects' : @model.toJSON(),
      (err, out) =>
        @$el.html out
#        BTD.Mediator.publish 'ui:ready', @
    return @

#    data = @collection.toJSON()
#    calcTodos = (proj) ->
#      i = 0
#      i++ for todo in proj.todos when not todo.complete
#      proj.totalIncomplete = i
#
#    calcTodos project for project in data

  delete: ->