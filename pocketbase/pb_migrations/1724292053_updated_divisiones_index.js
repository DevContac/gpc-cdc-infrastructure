/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3xdp4sxmv4k80sn")

  // remove
  collection.schema.removeField("vurmrhs7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gbdgsh1h",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "3xdp4sxmv4k80sn",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3xdp4sxmv4k80sn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vurmrhs7",
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

  // remove
  collection.schema.removeField("gbdgsh1h")

  return dao.saveCollection(collection)
})
