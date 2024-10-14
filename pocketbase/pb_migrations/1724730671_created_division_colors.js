/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "9j8444r0u23w6aj",
    "created": "2024-08-27 03:51:11.096Z",
    "updated": "2024-08-27 03:51:11.096Z",
    "name": "division_colors",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fv46bqho",
        "name": "DIVISION",
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
        "id": "dtcatym7",
        "name": "COLOR",
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
  const collection = dao.findCollectionByNameOrId("9j8444r0u23w6aj");

  return dao.deleteCollection(collection);
})
