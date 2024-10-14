/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wv5g2v0mqwq20x8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bwanpdm7",
    "name": "ACTIVIDADES_HIJAS",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wv5g2v0mqwq20x8")

  // remove
  collection.schema.removeField("bwanpdm7")

  return dao.saveCollection(collection)
})
