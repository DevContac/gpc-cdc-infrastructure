/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ymorsemjqgadpqs",
    "created": "2024-08-22 02:09:04.589Z",
    "updated": "2024-08-22 02:09:04.589Z",
    "name": "AreaEquipment",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vhs9nbkl",
        "name": "key",
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
        "id": "rkj1styr",
        "name": "array",
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
  const collection = dao.findCollectionByNameOrId("ymorsemjqgadpqs");

  return dao.deleteCollection(collection);
})
