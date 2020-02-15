  const MongoClient = require('mongodb').MongoClient
  const { UserInputError } = require('apollo-server-koa');

  const url = process.env.DB_HOST

  const client  = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true  })
  var db  =  null;


  async function initDB() {
    if (!db)
    {
      db = await new Promise( (resolve, reject) =>
        client.connect((err) =>
        {
          if (err)
            return reject(err)
          let database = client.db('blogdb')
          resolve (database);
       })
     ).catch(e => {
        console.log('Could not get connection to MongoDB..\n' + e)
        process.exit(1)
      })
    }
  }

  function closeDB() {
    if (db)
      client.close()
  }

  async function getPostById(root, {id}, {dataSources}) {
    const blogsCollection = db.collection('blogs')
    let pid = parseInt(id);
    return blogsCollection.findOne({ post_id: pid }, { projection: {_id: 0, post_title:1, post_text:1, author: 1 }}).then( res => {
          if (!res)
            throw new UserInputError('Cound not find Post for the ID specified.', {ID: id});
          return  { postTitle: res.post_title, postText: res.post_text,  author: res.author } ;
        })
  }


  async function getPostList() {
    const blogsCollection = db.collection('blogs')
    let res = null;
    res = await new Promise( (resolve, reject) => {
        blogsCollection.find( {}, { projection: {_id:0, post_title:1 }}).toArray( (err, items) => {
              if (err)
                return reject(err)
              resolve(items)
            }
        )
      }
    )
    return res.map( x =>  ( { "postTitle": x.post_title } ))
  }


  async function getAuthorsbyComments() {
      const blogsCollection = db.collection('blogs')
      return new Promise( (resolve, reject) => {
            blogsCollection.aggregate([ { $unwind: "$comments" },	{ $group: { _id: "$author", count: {$sum : 1} } }, ], {}, (err, aggreCursor) => {
                  if (err)
                    return reject(err)
                  aggreCursor.toArray( (errInner, results) => {
                    if (errInner)
                      return reject(errInner)
                    documents = []
                    for (i in results)
                    {
                      documents.push({ author: results[i]._id, comments: results[i].count })
                    }
                    resolve(documents)
                  })
                }
          )
        }
      )
  }


  async function addPostDetails(root, {postTitle, postText,  author}) {
    let validationErrors = {}
    if ( postTitle.length >= 100 )
      validationErrors.postTitle = 'postTitle should be less than 100 characters';
    if ( author.length >= 50 )
      validationErrors.author = 'author should be less than 50 characters';

    if (Object.keys(validationErrors).length > 0)
      throw new UserInputError('Post update failed due to incorrect data. Please correct the below fields before proceeding.', validationErrors);

    const blogsCollection = db.collection('blogs')
    let res = null;
    res = await new Promise( (resolve, reject) => {
            blogsCollection.insertOne( { post_title:postTitle, post_text: postText, author: author }, {},  (err, result) => {
                if (err)
                  return reject(err)
                resolve(result.ops[0].post_title)
              }
          )
        }
      )
      return { postTitle: res };
  }


  module.exports = { initDB, getPostList, getPostById, addPostDetails, getAuthorsbyComments, closeDB }
