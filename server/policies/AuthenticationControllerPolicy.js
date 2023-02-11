// middlewares
const Joi = require('joi')

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().min(3).max(10).required(),
      username: Joi.string().min(3).max(20).required(),
      is_admin: Joi.boolean().default(false),
      // password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')),
    })

    // const { error, value } = Joi.validate(req.body, schema)
    const { error, value } = schema.validate(req.body, {
      abortEarly: true,
      allowUnknown: true,
    })
    // console.log('error is', error)
    // console.log('value is', value)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'you must provide a valide email address',
          })
          return

        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:
              <br>
              1. It must contain ONLY the following characters: lower case, upper case, numerics.
              <br>
              2. It must be at least 8 characters in length and not greater than 32 characters in length.
            `,
          })
          return

        case 'username':
          res.status(400).send({
            error:
              'username must be at least 3 characters and not more than 20 characters.',
          })
          return

        default:
          res.status(400).send({
            error: 'Invalid registration information',
          })
          return
      }
    } else {
      next()
    }
  },
}
