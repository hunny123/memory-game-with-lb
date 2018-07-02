$(document).ready(function() {
	// initialising the variable.
  let status = "off";
  let b;
  const starcount = 0;
  let count = 0;
  let time = 0;
  let interval;
  b = random16();
  imgdistribute(b);
  let imgsrc = "";
  let idmatch = [];
  let pairedupid = [];
  // Event attaching on play button
  $(".play").click(function() {
   
    status = "on";//changing status of game to on
    //display restart button
    $(".restart").show();
    //calling timing function for timer
    interval = setInterval(function() {
      $(".time").text(time + " seconds");
      time++;
      ratefunction();//for change in time changing stars
    }, 1000);
    $(".move").text(count);
    $(".play").hide();
  });
  // onclick event on card 
  $(".card").click(function() {
    if (status === "off") { // checking if game status is on or not
      alert("please click on play button");
    }

    let id = $(this).attr("id");// fetching id of card.
    if (
      idmatch[0] != id &&                        //checking condition for valid click
      jQuery.inArray(id, pairedupid) <= -1 &&
      status === "on"
    ) {
      $("#" + id).addClass("animated flipInY background");
      $("#" + id + " img").css("visibility", "visible");

      if (count % 2 == 0) {// condition for whether player open the card  
        evenfunction(id);
      } else {             // condition for whether player trying to match the card  
        oddfunction(id);
      }
      count++;            // increment in count for move
      $(".move").text(count);
      ratefunction(count);
    } else {
      console.log("do nothing");
    }
  });
  $(".restart").click(function() {
    restart();// restart function calling
  });
  function evenfunction(id) { // even function body
    imgsrc = $("#" + id + " img").attr("src");
    console.log("this is even function call " + count + imgsrc);
    idmatch.push(id);
  }
  function oddfunction(id) { // odd function body
    console.log("odd call" + $("#" + id + " img").attr("src"));
    idmatch.push(id);
    if (imgsrc === $("#" + id + " img").attr("src")) { // when  cards are  matched 
      console.log(idmatch);
      $("#" + idmatch[0] + ",#" + idmatch[1]).removeClass("background");
      $("#" + idmatch[0] + ",#" + idmatch[1]).addClass("succes");
      pairedupid.push(idmatch[0], idmatch[1]);
      console.log(pairedupid);
      idmatch = [];
      if (pairedupid.length == 16) {
        setTimeout(function() {
          clearInterval(interval);
          winnerfound();
        }, 800);
      }
    } else {// when cards are not matched
      console.log("not match");
      setTimeout(function() { 
        $("#" + idmatch[0] + ",#" + idmatch[1]).removeClass(
          " animated flipInY background",
          100
        );
        $("#" + idmatch[0] + " img" + ",#" + idmatch[1] + " img").css(
          "visibility",
          "hidden"
        );
        $("#" + idmatch[0] + ",#" + idmatch[1]).addClass("animated flipInX");

        idmatch = [];
      }, 500);
    }
  }

  function random16() { // function producing for random 16 unique number in between 0-15 
    let k = 0;
    let a = [];
    for (var i = 0; a.length < 16; i++) {
      k = Math.floor(Math.random() * 16) + 1;
      if (jQuery.inArray(k, a) <= -1) {
        a.push(k);
      }
    }
    return a;
  }
  function imgdistribute(arr) { // shuffing image using 16 random number
    for (var i = 0, j = 1; i < arr.length - 1, j < 9; i = i + 2, j++) {
      let img = document.createElement("IMG");
      let img1 = document.createElement("IMG");
      img.src = "images/i" + j + ".png";
      img1.src = "images/i" + j + ".png";
      $("#" + arr[i]).html(img);
      $("#" + arr[i + 1]).html(img1);
      $(".card img").addClass("img");
      console.log(i, j);
    }
    console.log(arr);
  }
  function restart() {// body of restart function

  	//reset the everthing  to initial conditions
    status = "off";

    count = 0;
    time = 0;
    clearInterval(interval);
    $("#myModal").modal("hide");
    $(".time").text("time");
    $(".move").text(count);
    $(".play").show();
    $(".restart").hide();
    $("span").addClass("checked");
    $(".Submitt_score").show();
    $(".username").hide();
    b = random16();
    imgdistribute(b);
    imgsrc = "";
    idmatch = [];
    pairedupid = [];
    $(".card ").removeClass("animated flipInY succes background");
    $(".card img").css("visibility", "hidden");
  }
  function winnerfound() {
    $("#myModal").modal();//showing modal box when player wins
  }
  function ratefunction(count) {// rate function body for calculating star
    if ((count > 30 && count < 36) || time > 50) {
      $(".r5").removeClass("checked");
    } else if ((count > 35 && count < 45) || time > 120) {
      $(".r4").removeClass("checked");
    } else if (count > 44 || time > 240) {
      $(".r3").removeClass("checked");
    } else {
      console.log("same rate");
    }
  }

  $(".Submitt_score").click(function() { // event on submit score button
    $(".username").show(200);
    $(".Submitt_score").hide(200);
  });


  // sending data for leader board through submit form
  function submitfun() { 
    const star = getstar();

    const score = star * 500 -  (time / 60);

    writeNewPost(count, star, score);
  }
  function getstar() {
    let star = 0;
    const arr = $("#star-rate span");

    for (let i = 0; i < 4; i++) {
      if ($(arr[i]).hasClass("checked") == true) {
        star++;
      }
    }
    return star;
  }
// firebase configuration
  var config = {
    apiKey: "AIzaSyAofsLHfVk-0wQRa9JZzSi78PnU6dHq-Aw",
    authDomain: "leader-board-7e707.firebaseapp.com",
    databaseURL: "https://leader-board-7e707.firebaseio.com",
    projectId: "leader-board-7e707",
    storageBucket: "leader-board-7e707.appspot.com",
    messagingSenderId: "825013428445"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  // database update function , taken from firebase documentation
  function writeNewPost(move, star, rating) {
    var name = $("#name").val();
    alert(name);
    // A post entry.
    var postData = {
      Name: name,
      move: move,
      star: star,
      rating: rating
    };

    var newPostKey = firebase
      .database()
      .ref()
      .push().key;

    var updates = {};
    updates[newPostKey] = postData;

    return firebase
      .database()
      .ref()
      .update(updates);
    console.log("call succse");
  }
  $("#form").submit(function() {// event when form submit
    submitfun();
  });
  $("img").attr('alt','image not Available');
});
