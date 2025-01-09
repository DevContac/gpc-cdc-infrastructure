/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "tee1z8x4b24seq1",
    "created": "2025-01-09 20:25:44.048Z",
    "updated": "2025-01-09 20:25:44.048Z",
    "name": "area_code",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0bt13vfo",
        "name": "COLUMN",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "LHD",
            "SISTEMA TRANSPORTE MINERAL",
            "APILAMIENTO GENERAL",
            "MOLIENDA GLOBAL",
            "REMOCION RIPIOS",
            "FUSION"
          ]
        }
      },
      {
        "system": false,
        "id": "6mw7mjry",
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
  const collection = dao.findCollectionByNameOrId("tee1z8x4b24seq1");

  return dao.deleteCollection(collection);
})
