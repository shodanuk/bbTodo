BTD = BTD or {}

BTD.TodosCollection = Backbone.Collection.extend
  model: BTD.TodoModel
  localStorage: new Store 'BTD_Projects'