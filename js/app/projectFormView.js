var BTD;

BTD = BTD || {};

BTD.ProjectFormView = Backbone.View.extend({
  projectFormTmpl: dust.compileFn($('#tmpl-project-form').html(), 'projectForm'),
  events: {
    'submit form': 'saveProject',
    'click .close': 'hide'
  },
  initialize: function() {
    _.bindAll(this, 'saveProject', 'render', 'show', 'hide');
    return BTD.Mediator.subscribe('projectForm:show', this.show);
  },
  /*
    Render the view. We cache references to some key dom elements for later use.
  */
  render: function() {
    var form, title,
      _this = this;
    title = '';
    form = '';
    if (typeof this.model !== 'undefined') title = this.model.get('title');
    this.projectFormTmpl({
      'title': title
    }, function(err, out) {
      _this.$el.html(out);
      _this.$projectTitle = _this.$("#project-title");
      _this.$controlGroup = _this.$projectTitle.closest('.control-group');
      _this.$inlineHelp = _this.$(".help-inline");
      return BTD.Mediator.publish('ui:ready', _this);
    });
    return this;
  },
  /*
    Save a new project
  
    @param obj evt DOM Event object
  */
  saveProject: function(evt) {
    var attrs, error, success,
      _this = this;
    evt.preventDefault();
    this.resetTitle();
    if (this.options.collection != null) {
      attrs = {
        'title': this.$projectTitle.val()
      };
      success = function() {};
      error = function(model, msg) {
        return _this.onError(model, msg);
      };
      return this.options.collection.addProject(attrs, success, error);
    }
  },
  /*
    Reset the title form field to it's original state. Remove any feedback, messages,
    styling etc.
  */
  resetTitle: function() {
    this.$controlGroup.removeClass('error');
    this.$projectTitle.removeClass('error');
    return this.$inlineHelp.text("");
  },
  /*
    Display error message and add error styling
  
    @param obj model
    @param string error Error message text
  */
  onError: function(model, error) {
    this.$controlGroup.addClass('error');
    this.$projectTitle.addClass('error');
    return this.$inlineHelp.text(error);
  },
  show: function() {
    return this.$el.fadeIn('fast');
  },
  hide: function() {
    return this.$el.fadeOut('fast');
  }
});
