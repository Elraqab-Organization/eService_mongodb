const express = require("express");
const router = express.Router();

const Post = require("../models/posts");

router.get("/", async (req, res) => {
  // tested successfully
  await Post.find({}, function (err, result) {
    if (err) console.log(err);
    else res.json(result);
  });

  //   const post = new Post({
  //     customerId: "custome1ID",
  //     description: "lorem lorem lorem lorem",
  //     cancelationFee: 10.0,
  //     tag: ["Electrical", "Plumber", "House Cleaning"],
  //   });

  //   await post.save();
});

// tested successful
router.post("/", async (req, res) => {
  const description = req.body.description;
  const cancelationFee = req.body.cancelationFee;
  const tag = req.body.tags;

  const post = new Post({
    description: description,
    cancelationFee: cancelationFee,
    tag: tag,
  });

  // pass to function to save object
  await post.save(function (err, result) {
    if (err) console.log(err);
    else res.json(result);
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
