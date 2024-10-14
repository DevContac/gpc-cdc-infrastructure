/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7cvb1ql2ie3dk1z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kdybx8n0",
    "name": "hidden",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7cvb1ql2ie3dk1z")

  // remove
  collection.schema.removeField("kdybx8n0")

  return dao.saveCollection(collection)
})
