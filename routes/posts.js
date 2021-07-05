const express = require("express");
const router = express.Router();

const Post = require("../models/posts");
const Proposal = require("../models/proposals");
const User = require("../models/user");
const mongoose = require("mongoose");

router.get("/", async(req, res) => {
    // tested successfully
    await Post.find({}, function(err, result) {
        if (err) console.log(err);
        else res.json(result);
    });

    // const post = new Post({
    //   customerId: "custome1ID",
    //   description: "lorem lorem lorem lorem",
    //   cancelationFee: 10.0,
    //   tag: ["Electrical", "Plumber", "House Cleaning"],
    // });

    // await post.save(function (err, result) {
    //   if (err) console.log(err);
    //   else res.json(result);
    // });
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  await Post.findById(_id, function (err, result) {
    if (err) console.log(err);
    else res.json(result);
  });
});

router.post("/:_id", async (req, res) => {
  //
  const { _id } = req.params; // postId for the post selected.

  // 1. create a proposal Object with data coming from proposalInfo object
  const { serviceProviderId, diagnosisFee, paymentMethod, description, steps } =
    req.body;

  // Date formatter options
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };

  // Post information Unzip to get all information
  const { customerId } = await Post.findById(_id, "customerId");

  // proposal Object
  const proposal = new Proposal({
    postId: _id,
    customerId: customerId,
    serviceProviderId: serviceProviderId,
    description: description,
    steps: steps,
    diagnosisFee: diagnosisFee,
    post: await Post.findById(_id, "location paymentMethod description"),
    customer: await User.findById(customerId, "firstName lastName imgSrc"),
    serviceProvider: await User.findById(
      serviceProviderId,
      "firstName lastName imgSrc"
    ),
    provisionDate: today.toLocaleDateString(undefined, options),
  });

  try {
    // 2. imagesUrl for the service Provider and display them in the post attachment

    const post = await Post.findById(_id);

    // get image source for post attachment when displayed
    const { imgSrc } = await User.findById(serviceProviderId, "imgSrc");
    post.proposal.push(imgSrc);

    await Post.findByIdAndUpdate(_id, post, { new: true });

    const newProposal = await proposal.save();
    res.status(201).json(newProposal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  // 3. creat a order, and notification object from the infromation of both
  //     post and proposal Info
});

// tested successful
router.post("/", async (req, res) => {
  const {
    customerId,
    location,
    paymentMethod,
    cancelationFee,
    tags,
    imgSrc,
    description,
  } = req.body;

  const newPost = new Post({
    customerId: customerId,
    location: location,
    paymentMethod: paymentMethod,
    cancelationFee: cancelationFee,
    tags: tags,
    imgSrc: imgSrc,
    description: description,
  });

  // pass to function to save object
  await newPost.save(function (err, result) {
    if (err) res.status(409).json({ message: error.message });
    else res.status(201).json(newPost);
  });
});

// tested
router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send(`No post with id: ${req.params.id}`);

  await Post.findByIdAndRemove({ _id: req.params.id }, function (err, result) {
    if (err) res.status(409).json({ message: error.message });
    else res.status(201).json(result);
  });
});

module.exports = router;
