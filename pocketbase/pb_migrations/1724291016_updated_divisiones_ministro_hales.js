/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("me9kb7mwv1y9nd8")

  // remove
  collection.schema.removeField("mhtmoxtk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kcnczkys",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "me9kb7mwv1y9nd8",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("me9kb7mwv1y9nd8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mhtmoxtk",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "cavyb44i7ms7jmb",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("kcnczkys")

  return dao.saveCollection(collection)
})
