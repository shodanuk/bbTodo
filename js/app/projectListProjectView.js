var BTD;

BTD = BTD || {};

BTD.ProjectListProjectView = Backbone.View.extend({
  template: dust.compileFn($("#tmpl-project-list-project").html()),
  tagName: 'li',
  className: 'clearfix',
  events: {
    'click .delete': 'delete'
  },
  initialize: function() {
    _.bindAll(this, 'render', 'delete');
    return console.log(this.model);
  },
  render: function() {
    var _this = this;
    this.template({
      'projects': this.model.toJSON()
    }, function(err, out) {
      return _this.$el.html(out);
    });
    return this;
  },
  "delete": function() {}
});
