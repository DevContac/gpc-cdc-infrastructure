/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "hnnhbq9r7mwxwml",
    "created": "2024-08-18 04:51:24.267Z",
    "updated": "2024-08-18 04:51:24.267Z",
    "name": "global_disponibility_ratios",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "1eeptw9j",
        "name": "MINING_OPERATION",
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
        "id": "2u57f1mo",
        "name": "CODE",
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
        "id": "r5krjaxm",
        "name": "RATIO",
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
  const collection = dao.findCollectionByNameOrId("hnnhbq9r7mwxwml");

  return dao.deleteCollection(collection);
})
