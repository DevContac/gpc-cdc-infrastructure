/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zsm0zzkl91kt0v2")

  // remove
  collection.schema.removeField("htxedzjl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mv8cvfmc",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "zsm0zzkl91kt0v2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zsm0zzkl91kt0v2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "htxedzjl",
    "name": "parent",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("mv8cvfmc")

  return dao.saveCollection(collection)
})
