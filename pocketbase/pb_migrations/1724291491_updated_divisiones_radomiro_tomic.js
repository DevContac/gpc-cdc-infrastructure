/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w96it2zdb9xuj6a")

  // remove
  collection.schema.removeField("koftmmm6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ndpiostv",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "w96it2zdb9xuj6a",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w96it2zdb9xuj6a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "koftmmm6",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "me9kb7mwv1y9nd8",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("ndpiostv")

  return dao.saveCollection(collection)
})
