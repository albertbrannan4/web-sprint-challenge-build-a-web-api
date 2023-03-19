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

// router.post('/',(req,res)=>{
//     Project.insert()
// })

module.exports = router;
