/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2jujr5yxvna4nhz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1eqomqqw",
    "name": "hidden",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2jujr5yxvna4nhz")

  // remove
  collection.schema.removeField("1eqomqqw")

  return dao.saveCollection(collection)
})
