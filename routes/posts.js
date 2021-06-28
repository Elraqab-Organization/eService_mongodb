const express = require("express");
const router = express.Router();

const Post = require("../models/posts");

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
  const { _id } = req.params;
  const post = await Post.findById(_id);
  post.proposal.push(req.body);

  const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
  res.json(updatedPost);
});

// tested successful
<<<<<<< HEAD
router.post("/", async(req, res) => {


    const shortCut = req.body;
    const post = new Post({
        description: shortCut.description,
        cancelationFee: shortCut.cancelationFee,
        tag: shortCut.tag,
    });

    // pass to function to save object
    await post.save(function(err, result) {
        if (err) console.log(err);
        else res.json(result);
    });
=======
router.post("/", async (req, res) => {
  const {
    customerId,
    location,
    paymentMethod,
    cancelationFee,
    tags,
    description,
  } = req.body;

  const newPost = new Post({
    customerId: customerId,
    location: location,
    paymentMethod: paymentMethod,
    cancelationFee: cancelationFee,
    tags: tags,
    description: description,
  });

  // pass to function to save object
  await newPost.save(function (err, result) {
    if (err) res.status(409).json({ message: error.message });
    else res.status(201).json(newPost);
  });
>>>>>>> 61a217a1037a4d1a70e6bbed712a460e1fe65158
});

// tested
router.delete("/:id", async(req, res) => {
    await Post.findByIdAndRemove({ _id: req.params.id }, function(err, result) {
        if (err) console.log(err);
        else res.json(result);
    });
});

module.exports = router;

// experipmental data

// const post = new Post({
//     _id: "post3ID",
//     customerId: "custome1ID",
//     description: "lorem lorem lorem lorem",
//     cancelationFee: 10.0,
//     tag: ["Electrical", "Plumber", "House Cleaning"],
//     proposal: [
//       {
//         proposalId: "proposal1ID",
//         postId: "post3ID",
//         serviceProviderId: "serviceprovider1ID",
//         description:
//           "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
//         steps: ["step1", "step2", "step3"],
//       },
//     ],
//   });