/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j2cejxpipynigzx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hpl3sj3a",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "j2cejxpipynigzx",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j2cejxpipynigzx")

  // remove
  collection.schema.removeField("hpl3sj3a")

  return dao.saveCollection(collection)
})
