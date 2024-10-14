/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cavyb44i7ms7jmb")

  // remove
  collection.schema.removeField("1pb7mbsr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vwbd67ky",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "cavyb44i7ms7jmb",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cavyb44i7ms7jmb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1pb7mbsr",
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

  // remove
  collection.schema.removeField("vwbd67ky")

  return dao.saveCollection(collection)
})
