/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z57stkmx7filu6s")

  // remove
  collection.schema.removeField("cudzblxs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rk9nv7cw",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "z57stkmx7filu6s",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z57stkmx7filu6s")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cudzblxs",
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

  // remove
  collection.schema.removeField("rk9nv7cw")

  return dao.saveCollection(collection)
})
