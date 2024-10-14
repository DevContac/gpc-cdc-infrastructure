/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7zm6qpimpe4cwuw")

  // remove
  collection.schema.removeField("8nvfy9we")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6agy4dlg",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "7zm6qpimpe4cwuw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7zm6qpimpe4cwuw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8nvfy9we",
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
  collection.schema.removeField("6agy4dlg")

  return dao.saveCollection(collection)
})
