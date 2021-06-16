const express = require("express");
const router = express.Router();

const Post = require("../models/posts");

router.get("/", async (req, res) => {
  // tested successfully
  await Post.find({}, function (err, result) {
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

// tested successful
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
});

// tested
router.delete("/:id", async (req, res) => {
  await Post.findByIdAndRemove({ _id: req.params.id }, function (err, result) {
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
