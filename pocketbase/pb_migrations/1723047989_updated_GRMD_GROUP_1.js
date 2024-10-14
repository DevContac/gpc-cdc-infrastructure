/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j2cejxpipynigzx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qjhgoski",
    "name": "kpi",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j2cejxpipynigzx")

  // remove
  collection.schema.removeField("qjhgoski")

  return dao.saveCollection(collection)
})
