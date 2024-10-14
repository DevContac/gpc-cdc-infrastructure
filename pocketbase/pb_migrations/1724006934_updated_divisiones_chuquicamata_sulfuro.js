/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2jujr5yxvna4nhz")

  // remove
  collection.schema.removeField("uhfpsmln")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zvwujape",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2jujr5yxvna4nhz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uhfpsmln",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "7cvb1ql2ie3dk1z",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("zvwujape")

  return dao.saveCollection(collection)
})
