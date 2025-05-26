// const express = require("express");
// const router = express.Router();
// const Candidate = require("../models/Candidate");
// const Voter = require("../models/Voter");
// const Constituency = require("../models/Constituency");
// const Party = require("../models/Party");
// const ElectionStatus = require("../models/ElectionStatus"); 

// // POST /admin/reset-votes
// router.post("/reset-votes", async (req, res) => {
//   try {
//     await Candidate.updateMany({}, { votes: 0 });
//     await Voter.updateMany({}, { has_voted: false, voted_candidate_id: null });

//     // Reset election status
//     await ElectionStatus.deleteMany({});
//     await ElectionStatus.create({ conducted: false });

//     res.json({ success: true, message: "Votes and voter statuses reset." });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to reset votes." });
//   }
// });

// // POST /admin/publish-results
// router.post("/publish-results", async (req, res) => {
//   try {
//     const status = await ElectionStatus.findOne();
//     if (!status || !status.conducted) {
//       return res.status(400).json({ error: "No election has been conducted." });
//     }

//     // Existing result aggregation logic
//     const results = await Candidate.aggregate([
//       {
//         $group: {
//           _id: "$constituency",
//           maxVotes: { $max: "$votes" }
//         }
//       },
//       {
//         $lookup: {
//           from: "candidates",
//           let: { constituencyId: "$_id", maxVotes: "$maxVotes" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ["$constituency", "$$constituencyId"] },
//                     { $eq: ["$votes", "$$maxVotes"] }
//                   ]
//                 }
//               }
//             }
//           ],
//           as: "winners"
//         }
//       },
//       { $unwind: "$winners" },
//       {
//         $lookup: {
//           from: "parties",
//           localField: "winners.party_id",
//           foreignField: "party_id",
//           as: "partyInfo"
//         }
//       },
//       { $unwind: "$partyInfo" },
//       {
//         $project: {
//           _id: 0,
//           constituency: "$_id",
//           winner: {
//             candidate_id: "$winners.candidate_id",
//             name: "$winners.name",
//             votes: "$winners.votes",
//             party_name: "$partyInfo.name"
//           }
//         }
//       }
//     ]);

//     res.json(results);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to publish results." });
//   }
// });

// // GET /admin/results
// router.get("/results", async (req, res) => {
//   try {
//     const results = await Candidate.aggregate([
//       {
//         $group: {
//           _id: "$constituency",
//           maxVotes: { $max: "$votes" }
//         }
//       },
//       {
//         $lookup: {
//           from: "candidates",
//           let: { constituencyId: "$_id", maxVotes: "$maxVotes" },
//           pipeline: [
//             { $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ["$constituency", "$$constituencyId"] },
//                     { $eq: ["$votes", "$$maxVotes"] }
//                   ]
//                 }
//               }
//             }
//           ],
//           as: "winners"
//         }
//       },
//       { $unwind: "$winners" },
//       {
//         $lookup: {
//           from: "parties",
//           localField: "winners.party_id",
//           foreignField: "party_id",
//           as: "partyInfo"
//         }
//       },
//       { $unwind: "$partyInfo" },
//       {
//         $project: {
//           _id: 0,
//           constituency: "$_id",
//           winner: {
//             candidate_id: "$winners.candidate_id",
//             name: "$winners.name",
//             votes: "$winners.votes",
//             party_name: "$partyInfo.name"
//           }
//         }
//       }
//     ]);

//     res.json(results);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch results." });
//   }
// });

// // GET /admin/election-status
// router.get("/election-status", async (req, res) => {
//   try {
//     const status = await ElectionStatus.findOne({});
//     res.json({ conducted: status?.conducted || false });
//   } catch (err) {
//     res.status(500).json({ error: "Could not fetch election status." });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const Voter = require("../models/Voter");
const ElectionStatus = require("../models/ElectionStatus");

// POST /admin/reset-votes
router.post("/reset-votes", async (req, res) => {
  try {
    await Candidate.updateMany({}, { votes: 0 });
    await Voter.updateMany({}, { has_voted: false, voted_candidate_id: null });

    // Reset election status including resultsPublished flag
    await ElectionStatus.deleteMany({});
    await ElectionStatus.create({ conducted: false, resultsPublished: false });

    res.json({ success: true, message: "Votes and voter statuses reset." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reset votes." });
  }
});

// POST /admin/publish-results
router.post("/publish-results", async (req, res) => {
  try {
    const status = await ElectionStatus.findOne();
    if (!status || !status.conducted) {
      return res.status(400).json({ error: "No election has been conducted." });
    }

    // Mark results as published
    status.resultsPublished = true;
    await status.save();

    // Aggregate results (existing logic)
    const results = await Candidate.aggregate([
      {
        $group: {
          _id: "$constituency",
          maxVotes: { $max: "$votes" }
        }
      },
      {
        $lookup: {
          from: "candidates",
          let: { constituencyId: "$_id", maxVotes: "$maxVotes" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$constituency", "$$constituencyId"] },
                    { $eq: ["$votes", "$$maxVotes"] }
                  ]
                }
              }
            }
          ],
          as: "winners"
        }
      },
      { $unwind: "$winners" },
      {
        $lookup: {
          from: "parties",
          localField: "winners.party_id",
          foreignField: "party_id",
          as: "partyInfo"
        }
      },
      { $unwind: "$partyInfo" },
      {
        $project: {
          _id: 0,
          constituency: "$_id",
          winner: {
            candidate_id: "$winners.candidate_id",
            name: "$winners.name",
            votes: "$winners.votes",
            party_name: "$partyInfo.name"
          }
        }
      }
    ]);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to publish results." });
  }
});

// GET /admin/results
router.get("/results", async (req, res) => {
  try {
    const status = await ElectionStatus.findOne();

    // Only return results if resultsPublished is true
    if (!status || !status.resultsPublished) {
      return res.json([]); // or res.status(403).json({ error: "Results not published yet." });
    }

    const results = await Candidate.aggregate([
      {
        $group: {
          _id: "$constituency",
          maxVotes: { $max: "$votes" }
        }
      },
      {
        $lookup: {
          from: "candidates",
          let: { constituencyId: "$_id", maxVotes: "$maxVotes" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$constituency", "$$constituencyId"] },
                    { $eq: ["$votes", "$$maxVotes"] }
                  ]
                }
              }
            }
          ],
          as: "winners"
        }
      },
      { $unwind: "$winners" },
      {
        $lookup: {
          from: "parties",
          localField: "winners.party_id",
          foreignField: "party_id",
          as: "partyInfo"
        }
      },
      { $unwind: "$partyInfo" },
      {
        $project: {
          _id: 0,
          constituency: "$_id",
          winner: {
            candidate_id: "$winners.candidate_id",
            name: "$winners.name",
            votes: "$winners.votes",
            party_name: "$partyInfo.name"
          }
        }
      }
    ]);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch results." });
  }
});

// GET /admin/election-status
router.get("/election-status", async (req, res) => {
  try {
    const status = await ElectionStatus.findOne({});
    res.json({ 
      conducted: status?.conducted || false,
      resultsPublished: status?.resultsPublished || false
    });
  } catch (err) {
    res.status(500).json({ error: "Could not fetch election status." });
  }
});

module.exports = router;
