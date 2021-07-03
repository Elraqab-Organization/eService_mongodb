var cors = require("cors");
const express = require("express");
const router = express.Router();
const Proposal = require("../models/proposals");
const Post = require("../models/posts");
const User = require("../models/user");
const mongoose = require("mongoose");

// gets all proposal for customer or service provider
router.get("/:id/:isServiceProvider", cors(), async (req, res) => {
  try {
    const { id, isServiceProvider } = req.params;

    var proposal;

    if (isServiceProvider === "true") {
      proposal = await Proposal.find({
        serviceProviderId: id,
      });
    } else {
      proposal = await Proposal.find({ customerId: id });
    }

    if (proposal.length != 0) {
      res.json(proposal);
    } else res.json({ message: "No proposal was found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// gets all proposal for customer or service provider
router.get("/:id", cors(), async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).send(`No post with id: ${req.params.id}`);

    //
    const { id } = req.params;
    const proposal = await Proposal.find({
      postId: id,
    });

    if (proposal.length != 0) {
      res.json(proposal);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// creates new proposal by passing all required attributes
router.post("/create", async (req, res) => {
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const proposal = new Proposal({
    id: req.body.id,
    postId: req.body.postId,
    customerId: req.body.customerId,
    serviceProviderId: req.body.serviceProviderId,
    description: req.body.description,
    steps: req.body.steps,
    post: await Post.findById(
      req.body.postId,
      "location paymentMethod description"
    ),
    customer: await User.findById(req.body.customerId, "name profileImgSrc"),
    serviceProvider: await User.findById(
      req.body.serviceProviderId,
      "name profileImgSrc"
    ),
    provisionDate: today.toLocaleDateString(undefined, options),
  });
  try {
    const newUser = await proposal.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// send proposal id and new status
router.patch("/:id", getProposal, async (req, res) => {
  if (req.params.id != null) {
    // accept, reject, pend
    res.proposal.status = req.body.status;
  }
  try {
    const updatedProposal = await res.proposal.save();
    res.json(updatedProposal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// finds proposal by id
async function getProposal(req, res, next) {
  let proposal;
  try {
    proposal = await Proposal.findById(req.params.id);

    if (proposal == null) {
      return res.status(404).json({ message: "Cannot find proposal" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.proposal = proposal;
  next();
}

module.exports = router;
