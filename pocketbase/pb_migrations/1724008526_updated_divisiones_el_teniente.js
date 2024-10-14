/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uzr6uppsy2pge7x")

  // remove
  collection.schema.removeField("qvpqkh9n")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y22fibxo",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "uzr6uppsy2pge7x",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uzr6uppsy2pge7x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qvpqkh9n",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "o7hmxj4u40jf8zw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("y22fibxo")

  return dao.saveCollection(collection)
})
