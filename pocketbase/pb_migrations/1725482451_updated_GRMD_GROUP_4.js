/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mxf0ndpb0wzkci5")

  // remove
  collection.schema.removeField("i4dgem8t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tkws3okf",
    "name": "parent_copy",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "mxf0ndpb0wzkci5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mxf0ndpb0wzkci5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i4dgem8t",
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

  // remove
  collection.schema.removeField("tkws3okf")

  return dao.saveCollection(collection)
})
