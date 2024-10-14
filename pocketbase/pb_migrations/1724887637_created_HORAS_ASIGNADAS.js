/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "wv5g2v0mqwq20x8",
    "created": "2024-08-28 23:27:17.215Z",
    "updated": "2024-08-28 23:27:17.215Z",
    "name": "HORAS_ASIGNADAS",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "khoy3oeq",
        "name": "fecha",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "vztriail",
        "name": "hora_asignada",
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
        "id": "bwuqzc50",
        "name": "hora_real",
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
  const collection = dao.findCollectionByNameOrId("wv5g2v0mqwq20x8");

  return dao.deleteCollection(collection);
})
