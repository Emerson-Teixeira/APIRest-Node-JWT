const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const url = 'mongodb://localhost/'
const dbname = 'conFusion'

MongoClient.connect(url,(err,client) =>{
    assert.strictEqual(err,null)
    console.log('Connected Correctly to server')
    const db = client.db(dbname)
    const collection = db.collection('dishes')
    collection.insertOne({'name':'Pizza Braba','describe':'A melhor pizza do brasil'},(err,result)=>{
        assert.strictEqual(err,null)
        console.log('After Insert:')
        console.log(result.ops)

        collection.find({}).toArray((err,docs) => {
            assert.strictEqual(err,null)
            console.log('Found:\n')
            console.log(docs)
        })
    })
})