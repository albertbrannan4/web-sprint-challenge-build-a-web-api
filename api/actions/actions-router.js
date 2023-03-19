// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Action = require("./actions-model");

router.get("/", async (req, res) => {
  try {
    const allActions = await Action.get();
    res.status(200).json(allActions);
  } catch (err) {
    res.status(500).json({ message: "could not get actions" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const selectedAction = await Action.get(req.params.id);
    if (!selectedAction) {
      res.status(404).json({ message: "action could not be found" });
    } else {
      res.status(200).json(selectedAction);
    }
  } catch (err) {
    res.status(500).json({ message: "could not get action" });
  }
});

module.exports = router;
