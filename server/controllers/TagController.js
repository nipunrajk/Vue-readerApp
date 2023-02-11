const Tag = require('../models').Tag

module.exports = {
  async index(req, res) {
    try {
      const tags = await Tag.findAll({
        limit: 10,
      })
      res.send(tags)
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the tags ',
      })
    }
  },

  async post(req, res) {
    try {
      const tag = await Tag.create(req.body)
      res.send(tag)
    } catch (error) {
      console.log('error occured in posting tags', error)
      res.status(500).send({
        error: 'An error has occured trying to create a tag',
      })
    }
  },
}
