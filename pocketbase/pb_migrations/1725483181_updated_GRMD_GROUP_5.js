/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wz0dep8f9wx7yw2")

  // remove
  collection.schema.removeField("s2morigd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zkpvljye",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wz0dep8f9wx7yw2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s2morigd",
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

  // remove
  collection.schema.removeField("zkpvljye")

  return dao.saveCollection(collection)
})
