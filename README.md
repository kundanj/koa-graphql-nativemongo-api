
# Koa-GraphQL-NativeMongo API.


## Overview
A functional API sample that demonstrates API building using Koa with GraphQL and the native Mongo driver to connect to MongoDB.

### Featuring

- koa with GraphQL Query and Mutations
- native Mongo driver using Promise based calls to Mongo
- Mongo aggregation API


## Installation

Install MongoDB Community edition by following the platform specific instructions at https://docs.mongodb.com/manual/administration/install-community/ or alternately you can use the MongoDB Atlas cloud version by signing up for a free trial version @ https://www.mongodb.com/cloud/atlas/register

You can download and run the repo as:

`git clone https://github.com/kundanj/koa-graphql-nativemongo.git`

You can set up the database using initdb.sh from the setup folder. The script uses a Unix "Here document" to non-interactively populate the MongoDB with sample data for a typical blog site - data which will illustrate Mongo CRUD operations as well as the aggregation framework.

`sh ./setup/initdb.sh`

`npm install`

`npm start`


## Contributing

Pull requests are welcome.


### Copyright and license

The MIT License (MIT). Please see [License File](./LICENSE)  for more information.
