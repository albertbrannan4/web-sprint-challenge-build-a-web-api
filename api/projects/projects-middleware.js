// add middlewares here related to projects
const Project = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      next({ status: 404, message: "project not found" });
    }
  } catch (err) {
    next(err);
  }
}

async function validateProjectBody(req, res, next) {
  try {
    const { name, description, completed } = req.body;

    let checkName = name && typeof name === "string" && name.trim().length > 0;

    let checkDescription =
      description &&
      typeof description === "string" &&
      description.trim().length > 0;

    let checkCompleted = completed !== undefined;

    if (checkName && checkDescription && checkCompleted) {
      req.name = name.trim();
      req.description = description.trim();
      req.completed = completed;
      next();
    } else {
      next({
        status: 400,
        message: "name, description, and completed are required",
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { validateProjectId, validateProjectBody };
