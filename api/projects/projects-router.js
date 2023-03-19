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

module.exports = router;
