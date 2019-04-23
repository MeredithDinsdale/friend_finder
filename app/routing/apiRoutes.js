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

app.post("/api/friends", function(req, res){

    let newFriend = req.body;
    let newScore = req.body.scores;
    let newTotal = getTotal(newScore);
    let totalDiff = [];
    let matchArr = [];


    for(let i = 0; i<friendsData.length; i++){
        
        totalDiff.push(Math.abs(newTotal - getTotal(friendsData[i].scores)));
        
    }

    let friendIndex = getIndex(totalDiff);

    console.log('totalDiff = '+totalDiff);
    console.log('friendIndex = '+friendIndex);

    for(let i = 0; i<friendIndex.length; i++){
        matchArr.push(friendsData[friendIndex[i]]);
    };

    console.log(matchArr);

    friendsData.push(newFriend);

    res.json(matchArr);

});

function getTotal(friendScores){

    let Total = 0;

    for(let i = 0; i<friendScores.length; i++){
        let toInt = parseInt(friendScores[i]);
        Total = Total + toInt;
    }
    console.log('Total = '+Total);

    return Total;
}

function getIndex(totalDiff){

    indexArr = [];

    let smallVal = Math.min(...totalDiff);  

    for(let i = 0; i<totalDiff.length; i++){
        if(totalDiff[i] === smallVal){
            indexArr.push(i);
        }
    }

    return indexArr;
}

}

  