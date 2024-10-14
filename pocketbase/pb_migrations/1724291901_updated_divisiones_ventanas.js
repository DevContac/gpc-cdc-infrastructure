/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dowhuxtpunet3cq")

  // remove
  collection.schema.removeField("zsimniry")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1vh1fp3k",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "dowhuxtpunet3cq",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dowhuxtpunet3cq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zsimniry",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "w96it2zdb9xuj6a",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("1vh1fp3k")

  return dao.saveCollection(collection)
})
