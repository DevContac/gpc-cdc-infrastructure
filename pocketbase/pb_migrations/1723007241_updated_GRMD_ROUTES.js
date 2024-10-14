/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mznuc71215qhpez")

  // remove
  collection.schema.removeField("pknojoqu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "admtfwqb",
    "name": "GRUPO",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mznuc71215qhpez")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pknojoqu",
    "name": "GRUPO",
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
  collection.schema.removeField("admtfwqb")

  return dao.saveCollection(collection)
})
