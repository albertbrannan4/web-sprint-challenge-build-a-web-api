// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Project = require("./projects-model");

router.get("/", async (req, res) => {
  try {
    const allProjects = await Project.get();
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(500).json({ message: "could not get projects" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const chosenProject = await Project.get(req.params.id);
    if (!chosenProject) {
      res.status(404).json({ message: "project not found" });
    } else {
      res.status(200).json(chosenProject);
    }
  } catch (err) {
    res.status(500).json({ message: "could not get project" });
  }
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

// router.put("/:id", async (req, res, next) => {
//   let { description, name, completed } = req.body;
//   let postExists = await Project.get(req.params.id);
//   if (!description || !name || !completed) {
//     res.status(400).json();
//     next({ status: 400, message: "name and description is required" });
//   } else if (!postExists) {
//     next({ status: 404, message: "project does not exist" });
//   } else {
//     Project.update(req.params.id, { description, name, completed })
//       .then((update) => {
//         res.status(200).json(update);
//       })
//       .catch((err) => {
//         next({ status: 500, message: "nothing was updated" });
//       });
//   }
// });

router.delete("/:id", async (req, res, next) => {
  try {
    let postExists = await Project.get(req.params.id);
    if (!postExists) {
      next({ status: 404, message: "project does not exist" });
    } else {
      let projectToRemove = await Project.remove(req.params.id);
      res.json(projectToRemove);
    }
  } catch (err) {
    next({ status: 500, message: "could not delete project" });
  }
});

router.get("/:id/actions", async (req, res, next) => {
  try {
    let postExists = await Project.get(req.params.id);
    if (!postExists) {
      next({ status: 404, message: "project does not exist" });
    } else {
      let projectActions = await Project.getProjectActions(req.params.id);
      res.status(200).json(projectActions);
    }
  } catch (err) {
    next({ status: 500, message: "actions does not exist" });
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
