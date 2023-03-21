// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Action = require("./actions-model");

const { validateActionId, validateActionBody } = require("./actions-middlware");
router.get("/", async (req, res) => {
  try {
    const allActions = await Action.get();
    res.status(200).json(allActions);
  } catch (err) {
    res.status(500).json({ message: "could not get actions" });
  }
});

router.get("/:id", validateActionId, async (req, res) => {
  res.status(200).json(req.action);
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

router.put(
  "/:id",
  validateActionId,
  validateActionBody,
  async (req, res, next) => {
    const { notes, description, completed, project_id } = req.body;
    const { id } = req.params;
    try {
      let getUpdate = await Action.update(id, {
        notes,
        description,
        completed,
        project_id,
      });
      res.status(200).json(getUpdate);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validateActionId, async (req, res, next) => {
  await Action.remove(req.params.id)
    .then((deleted) => {
      res.json(deleted);
    })
    .catch((err) => {
      next(err);
    });
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
