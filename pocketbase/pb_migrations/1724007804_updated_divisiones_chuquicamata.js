/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o7hmxj4u40jf8zw")

  collection.name = "divisiones_el_salvador"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o7hmxj4u40jf8zw")

  collection.name = "divisiones_chuquicamata"

  return dao.saveCollection(collection)
})
