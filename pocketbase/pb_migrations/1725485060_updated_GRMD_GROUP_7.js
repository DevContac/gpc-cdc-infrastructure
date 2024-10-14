/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h7grgohxeia739m")

  // remove
  collection.schema.removeField("e2vdmxpy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cn9kgvdc",
    "name": "parent_copy",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "h7grgohxeia739m",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h7grgohxeia739m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e2vdmxpy",
    "name": "parent_copy",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "nylvtgdzho2xid1",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("cn9kgvdc")

  return dao.saveCollection(collection)
})
