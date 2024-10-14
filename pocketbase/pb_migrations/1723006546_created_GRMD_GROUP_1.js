/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "j2cejxpipynigzx",
    "created": "2024-08-07 04:55:46.759Z",
    "updated": "2024-08-07 04:55:46.759Z",
    "name": "GRMD_GROUP_1",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xwqwrqus",
        "name": "division_section",
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
        "id": "u42xb5pw",
        "name": "level",
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
        "id": "kojaznra",
        "name": "position",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
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
  const collection = dao.findCollectionByNameOrId("j2cejxpipynigzx");

  return dao.deleteCollection(collection);
})
