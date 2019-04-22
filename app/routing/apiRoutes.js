// ===============================================================================
// LOAD DATA
// ===============================================================================
var path = require("path");
var friendsData = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

// ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {

   let userInput = req.body;
   let userScore = userInput.scores;

   let matchName = '';
   let matchPhoto = '';
    

        for (var i=0; i<friendsData.length; i++) {
            let diff = 0;
            for (var j=0; j<userScore.length; j++) {
                diff += Math.abs(friendsData[i].scores[j] - userScore[j]);
            }
            if (diff < totalDiff) {
                matchName = friendsData[i].name;
                matchPhoto = friendsData[i].photo;
                console.log(matchName, matchPhoto);
            }
        }

    friendsData.push(req.body);
    res.json(true);
     
  });
}

  