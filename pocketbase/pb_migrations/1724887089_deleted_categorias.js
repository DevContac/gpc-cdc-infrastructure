/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8qbljie6hrlyahy");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "8qbljie6hrlyahy",
    "created": "2024-08-28 23:11:40.311Z",
    "updated": "2024-08-28 23:15:18.053Z",
    "name": "categorias",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lwtgysyw",
        "name": "nombre",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "tetgofmb",
        "name": "parent",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "8qbljie6hrlyahy",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
