// const { Article } = require('../models')
const Article = require('../models').Article

const Tag = require('../models').Tag
const ArticleTag = require('../models').ArticleTag

module.exports = {
  async index(req, res) {
    try {
      const article = await Article.findAll({
        //
        where: {
          status: 'published',
        },
        //
        limit: 10,
      })
      res.send(article)
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the article ',
      })
    }
  },
  async indexByUser(req, res) {
    try {
      const { username } = req.params
      const articles = await Article.findAll({
        where: { author: username },
      })
      res.send(articles)
    } catch (error) {
      res.status(500).send({
        error: 'An error has occurred trying to fetch the articles',
      })
    }
  },

  async post(req, res) {
    try {
      let { header, author, content, tags, status } = req.body
      const article = await Article.create({ header, author, content, status })
      if (!Array.isArray(tags)) {
        tags = [tags]
        console.log('here inside')
      }

      const tagPromises = tags.map(async (tag) => {
        const existingTag = await Tag.findOne({ where: { id: tag } })
        if (!existingTag) {
          // return Tag.create({ name: tag })
        }
        return existingTag
      })

      const createdTags = await Promise.all(tagPromises)
      const tagIds = createdTags.map((tag) => tag.id)
      const articleTags = tagIds.map((tagId) => ({
        ArticleId: article.id,
        tagId,
      }))
      await ArticleTag.bulkCreate(articleTags)

      res.send(article)
    } catch (error) {
      console.log(error)
      console.log('error occured in posting articles', error)
      res.status(500).send({
        error: 'An error has occured trying to create a article',
      })
    }
  },
  async getByHeader(req, res) {
    try {
      const header = req.query.header
      const articles = await Article.findAll({
        where: { header, status: 'published' },
      })
      res.send(articles)
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the articles by header',
      })
    }
  },
  async getByHeaderOrAuthor(req, res) {
    try {
      // const header = req.params.header
      const header = req.query.header
      const author = req.query.author
      const whereClause = {}
      if (header) {
        whereClause.header = header
      } else if (author) {
        whereClause.author = author
      }
      const articles = await Article.findAll({
        where: whereClause,
      })
      res.send(articles)
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the articles by header',
      })
    }
  },
}
