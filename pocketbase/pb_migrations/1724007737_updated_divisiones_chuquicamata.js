/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o7hmxj4u40jf8zw")

  // remove
  collection.schema.removeField("wefma1ng")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vslta8fb",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o7hmxj4u40jf8zw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wefma1ng",
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
  collection.schema.removeField("vslta8fb")

  return dao.saveCollection(collection)
})
