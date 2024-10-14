/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ejm901lr2asy48")

  // remove
  collection.schema.removeField("2l9atpbi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qg3wppkk",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "0ejm901lr2asy48",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ejm901lr2asy48")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2l9atpbi",
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

  // remove
  collection.schema.removeField("qg3wppkk")

  return dao.saveCollection(collection)
})
