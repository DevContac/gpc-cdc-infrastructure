/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7q8maaa45njrbnm")

  // remove
  collection.schema.removeField("uozewds4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nizt7l35",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "7q8maaa45njrbnm",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7q8maaa45njrbnm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uozewds4",
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
  collection.schema.removeField("nizt7l35")

  return dao.saveCollection(collection)
})
