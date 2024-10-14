/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nylvtgdzho2xid1")

  // remove
  collection.schema.removeField("daiyfbte")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bhlz9t15",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nylvtgdzho2xid1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "daiyfbte",
    "name": "parent_copy",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "wz0dep8f9wx7yw2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("bhlz9t15")

  return dao.saveCollection(collection)
})
