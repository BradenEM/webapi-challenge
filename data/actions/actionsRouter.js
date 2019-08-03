const express = require("express");
const Actions = require("../helpers/actionModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const actions = await Actions.get();

    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const action = await Actions.get(id);

    res.status(200).json(action);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const action = Actions.remove(id);

    res
      .status(200)
      .json({ message: `action '${req.body.description}' has been deleted` });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const action = await Actions.update(id, req.body);

    res.status(200).json(action);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
