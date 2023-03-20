// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Project = require("./projects-model");
const {
  validateProjectId,
  validateProjectBody,
} = require("./projects-middleware");

router.get("/", async (req, res) => {
  try {
    const allProjects = await Project.get();
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(500).json({ message: "could not get projects" });
  }
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", async (req, res, next) => {
  const { description, name, completed } = req.body;
  if (!description || !name) {
    res.status(400).json("name and description is required");
  }
  try {
    let newPost = await Project.insert({ name, description, completed });
    res.status(201).json(newPost);
  } catch (err) {
    next({ status: 400, message: "project was not created" });
  }
});

router.put(
  "/:id",
  validateProjectId,
  validateProjectBody,
  async (req, res, next) => {
    const { name, description, completed } = req;

    // Project.update(req.params.id, { name, description, completed })
    //   .then((user) => {
    //     let getUpdate = Project.get(req.params.id);
    //     res.status(200).json(getUpdate);
    //   })
    //   .catch(() => res.status(500).json({ message: "user was not updated" }));
    try {
      let getUpdate = await Project.update(req.params.id, {
        name,
        description,
        completed,
      });

      res.status(200).json(getUpdate);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validateProjectId, async (req, res, next) => {
  await Project.remove(req.params.id)
    .then((deleted) => {
      res.json(deleted);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id/actions", validateProjectId, async (req, res) => {
  let projectActions = await Project.getProjectActions(req.params.id);
  res.status(200).json(projectActions);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
