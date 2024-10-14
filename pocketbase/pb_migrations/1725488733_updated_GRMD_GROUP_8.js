/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2v5hwpsj4o3uie2")

  // remove
  collection.schema.removeField("whjvtzkf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uoniq3l1",
    "name": "parent_copy",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2v5hwpsj4o3uie2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "whjvtzkf",
    "name": "parent_copy",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "h7grgohxeia739m",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("uoniq3l1")

  return dao.saveCollection(collection)
})
