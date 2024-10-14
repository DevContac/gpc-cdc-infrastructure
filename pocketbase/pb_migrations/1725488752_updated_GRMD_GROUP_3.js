/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("abbypwo9odks6ub")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uo9anhi6",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "abbypwo9odks6ub",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("abbypwo9odks6ub")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uo9anhi6",
    "name": "parent_copy",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "abbypwo9odks6ub",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
