/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lq6x1akop6yee84")

  // remove
  collection.schema.removeField("xn8j9nyu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dekhn76h",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "lq6x1akop6yee84",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lq6x1akop6yee84")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xn8j9nyu",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "2jujr5yxvna4nhz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("dekhn76h")

  return dao.saveCollection(collection)
})
