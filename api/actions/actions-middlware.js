// add middlewares here related to actions

const Action = require("./actions-model");

async function validateActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (action) {
      req.action = action;
      next();
    } else {
      next({ status: 404, message: "action not found" });
    }
  } catch (err) {
    next(err);
  }
}

async function validateActionBody(req, res, next) {
  try {
    const { notes, description, completed, project_id } = req.body;

    let checkNotes =
      notes && typeof notes === "string" && notes.trim().length > 0;

    let checkDescription =
      description &&
      typeof description === "string" &&
      description.trim().length > 0;

    let checkCompleted = completed !== undefined;
    let checkProjId = project_id !== undefined;

    if (checkNotes && checkDescription && checkCompleted && checkProjId) {
      req.notes = notes.trim();
      req.description = description.trim();
      req.completed = completed;
      req.project_id = project_id;
      next();
    } else {
      next({
        status: 400,
        message: "notes, description, and completed are required",
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { validateActionId, validateActionBody };
