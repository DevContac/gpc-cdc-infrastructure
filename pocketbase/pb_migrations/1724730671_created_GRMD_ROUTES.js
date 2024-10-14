/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mznuc71215qhpez",
    "created": "2024-08-27 03:51:11.096Z",
    "updated": "2024-08-27 03:51:11.096Z",
    "name": "GRMD_ROUTES",
    "type": "base",
    "system": false,
    "schema": [
      {
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
    "listRule": "",
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
