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

module.exports = router;
