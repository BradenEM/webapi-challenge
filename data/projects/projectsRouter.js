const express = require("express");
const Projects = require("../helpers/projectModel");
const Actions = require("../helpers/actionModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", validateId, async (req, res) => {
  try {
    project = req.project;
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id/actions", async (req, res) => {
  try {
    const id = req.params.id;
    const actions = await Projects.getProjectActions(id);

    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const projectAddition = {
      name: req.body.name,
      description: req.body.description
    };
    const project = await Projects.insert(projectAddition);

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/:id/actions", async (req, res) => {
  try {
    const actionAddition = {
      description: req.body.description,
      notes: req.body.notes,
      project_id: req.params.id
    };
    const action = await Actions.insert(actionAddition);

    res.status(201).json(action);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Projects.remove(id);

    res
      .status(200)
      .json({ message: `Project with id of ${id} has been removed` });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Projects.update(id, req.body);

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

async function validateId(req, res, next) {
  try {
    const id = req.params.id;
    const project = await Projects.get(id);

    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: "project ID not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = router;
