var BTD;

BTD = BTD || {};

BTD.TodoView = Backbone.View.extend({
  template: dust.compileFn($("#tmpl-todo").html()),
  tagName: 'li',
  className: 'todo',
  events: {
    'click .status': 'statusClick',
    'click .delete': 'deleteClick'
  },
  initialize: function() {
    _.bindAll(this, 'render', 'statusClick', 'deleteClick');
    this.model.on('change', this.render);
    this.model.view = this;
    if (this.model.get('complete')) return this.$el.addClass('complete');
  },
  render: function() {
    var _this = this;
    this.template(this.model.toJSON(), function(err, out) {
      return _this.$el.html(out);
    });
    return this;
  },
  /*
    Click event handler for the todo status toggle.
    
    @param {Object} evt DOM event
  */
  statusClick: function(evt) {
    evt.preventDefault();
    this.model.toggle();
    return this.$el.toggleClass('complete');
  },
  /*
    Click event handler for the delete todo button.
    
    @param {Object} evt DOM event
  */
  deleteClick: function(evt) {
    evt.preventDefault();
    return this.model.clearTodo();
  }
});
