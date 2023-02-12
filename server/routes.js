const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ArticleController = require('./controllers/ArticleController')
const TagController = require('./controllers/TagController')

module.exports = (app) => {
  app.post(
    '/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  )
  app.post('/login', AuthenticationController.login)

  app.get('/articles', ArticleController.index)
  app.post('/articles', ArticleController.post)
  // app.get('/articles/header/:header', ArticleController.getByHeader) //by params
  // app.get('/articles/search', ArticleController.getByHeaderOrAuthor)
  app.get('/articles/search', ArticleController.getByHeader)
  app.get('/articles/search', ArticleController.searchByTag) //pending

  app.get('/:username/articles', ArticleController.indexByUser)
  app.put('/:username/articles/:id', ArticleController.update)

  app.post('/tags', TagController.post)
  app.get('/tags', TagController.index)
}
