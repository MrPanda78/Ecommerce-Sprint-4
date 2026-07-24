const express = require("express");
const router = express.Router();

const apiProductController = require("../../controllers/api/apiProductController");

router.get("/", apiProductController.list);
router.get("/:id", apiProductController.detail);
router.post("/", apiProductController.create);
router.put("/:id", apiProductController.update);
router.delete("/:id", apiProductController.remove);

module.exports = router;