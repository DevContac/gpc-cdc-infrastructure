/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ua4m0i3xpxagvu2")

  // remove
  collection.schema.removeField("udynntqc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ndxsmciy",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ua4m0i3xpxagvu2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ua4m0i3xpxagvu2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "udynntqc",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "2v5hwpsj4o3uie2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("ndxsmciy")

  return dao.saveCollection(collection)
})
