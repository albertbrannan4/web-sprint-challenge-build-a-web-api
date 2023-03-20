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

router.post("/", async (req, res, next) => {
  const { description, notes, completed, project_id } = req.body;
  if (!description || !notes || !project_id) {
    res.status(400).json("notes, description, and project_id are required");
  }
  try {
    let newAction = await Action.insert({
      notes,
      description,
      completed,
      project_id,
    });
    res.status(201).json(newAction);
  } catch (err) {
    next({ status: 500, message: "action was not created" });
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
