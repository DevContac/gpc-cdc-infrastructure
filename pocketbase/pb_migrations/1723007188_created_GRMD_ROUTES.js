/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mznuc71215qhpez",
    "created": "2024-08-07 05:06:28.896Z",
    "updated": "2024-08-07 05:06:28.896Z",
    "name": "GRMD_ROUTES",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "obkxaitj",
        "name": "ENDPOINT",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("mznuc71215qhpez");

  return dao.deleteCollection(collection);
})
