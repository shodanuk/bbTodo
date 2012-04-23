var BTD;

BTD = BTD || {};

BTD.TodoFormView = Backbone.View.extend({
  template: dust.compileFn($("#tmpl-todo-form").html(), 'todoFormView'),
  events: {
    'submit form': 'onSubmit'
  },
  initialize: function() {
    return _.bindAll(this, 'render', 'onSubmit');
  },
  render: function() {
    var _this = this;
    this.template({
      body: '',
      date: ''
    }, function(err, out) {
      _this.$el.html(out);
      _this.$bodyInput = _this.$("#todo-body");
      _this.$inlineHelp = _this.$(".help-block");
      _this.$inputWrapper = _this.$bodyInput.closest('.control-group');
      return BTD.Mediator.publish('ui:ready', _this);
    });
    return this;
  },
  /*
    Submit event handler for the todo form.
    
    @param {Object} evt DOM event
  */
  onSubmit: function(evt) {
    var _this = this;
    evt.preventDefault();
    return this.options.project.addTodo({
      'body': this.$bodyInput.val()
    }, function() {
      return _this.$bodyInput.val('');
    }, function() {
      return _this.onError(null, 'Set a proper error message here');
    });
  },
  /*
    Reset the form to it's original state. Remove any feedback, messages,
    styling etc.
  */
  resetForm: function() {
    this.$inputWrapper.removeClass('error');
    this.$bodyInput.removeClass('error');
    return this.$inlineHelp.text("");
  },
  /*
    Display error message and add error styling.
  
    @param {Object} model
    @param {String} error Error message text
  */
  onError: function(model, error) {
    this.$inputWrapper.addClass('error');
    this.$bodyInput.addClass('error');
    return this.$inlineHelp.text(error);
  }
});
