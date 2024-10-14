/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7cvb1ql2ie3dk1z")

  // remove
  collection.schema.removeField("hhy6vs1s")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eyo8nvhx",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7cvb1ql2ie3dk1z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hhy6vs1s",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "zsm0zzkl91kt0v2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("eyo8nvhx")

  return dao.saveCollection(collection)
})
