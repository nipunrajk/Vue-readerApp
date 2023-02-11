module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    header: DataTypes.STRING,
    author: DataTypes.STRING,
    content: DataTypes.TEXT,
    //
    status: {
      type: DataTypes.ENUM,
      values: ['submitted', 'rejected', 'published'],
      defaultValue: 'submitted',
    },
    //
  })

  Article.associate = function (models) {
    Article.belongsToMany(models.Tag, {
      through: 'ArticleTag',
      foreignKey: 'ArticleId',
      as: 'tags',
    })
  }
  return Article
}
