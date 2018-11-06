var newTweet = document.getElementById("newTweet");
var newTweetBox = document.getElementById("newTweetBox");
var suffix = "";
var theTarget
var counter

window.onload = clear;
newTweet.onfocus = expand;
newTweet.onblur = contract;
newTweet.addEventListener("input", validateTweet);
newTweetBox.addEventListener("input", validateTweet);
document.getElementById("submit").addEventListener("click", publishTweet);
document.getElementById("submitBox").addEventListener("click", publishTweet);
document.getElementById("tweet").addEventListener("click", openTweetBox);
document.getElementById("close").addEventListener("click", clear);

function expand() {
  document.getElementById("counter").style.display = "initial";
  document.getElementById("submitBar").style.display = "flex";
  document.getElementById("newTweet").style.border = "2px solid #93D7FA";
  document.getElementById("newTweet").style.height = "80px";
}

function contract() {
  var myNewTweet = newTweet.value;
  if(myNewTweet.trim().length <= 0 && newTweet.onblur) {
    document.getElementById("counter").style.display = "none";
    document.getElementById("submitBar").style.display = "none";
    document.getElementById("newTweet").style.border = "1px solid #93D7FA";
    document.getElementById("newTweet" + suffix).style.height = "35px";
  }
  colorCounter();
}

function clear() {
  document.getElementById("newTweet" + suffix).value = "";
  document.getElementById("counter" + suffix).innerHTML = 140;
  document.getElementById("submit" + suffix).setAttribute("disabled", "");
  document.getElementById("backColor").style.display = "none";
  contract();
}

function validateTweet(event) {
  suffix = "";
  theTarget = event.target.id;
  theTarget === "newTweet" ? suffix = "" : suffix = "Box";
  counter = 140 - parseInt(document.getElementById(theTarget).value.length);
  document.getElementById("counter" + suffix).innerHTML = counter;

  if(document.getElementById(theTarget).value.trim().length > 0) {
    if(counter < 140 && counter >= 0) {
      document.getElementById("submit" + suffix).removeAttribute("disabled");
    } else {
      document.getElementById("submit" + suffix).setAttribute("disabled", "");
    }
  } else {
    document.getElementById("submit" + suffix).setAttribute("disabled", "");
  }
  colorCounter()
}

function colorCounter() {
  if(counter > 20) {
    document.getElementById("counter" + suffix).style.color = "#66757f";
  } else if(counter <= 20 && counter > 10) {
    document.getElementById("counter" + suffix).style.color = "orange";
  } else if(counter <= 10) {
    document.getElementById("counter" + suffix).style.color = "red";
  }
  resize();
}

function resize() {
  newTweet.style.height = "80px";
  newTweet.style.height = newTweet.scrollHeight + "px";
  newTweetBox.style.height = "80px";
  newTweetBox.style.height = newTweetBox.scrollHeight + "px";
}

function openTweetBox() {
  document.getElementById("backColor").style.display = "flex";
  document.getElementById("newTweet").value = "";
  contract();
}

function getTime() {
  var data = new Date();
  var hour = JSON.stringify(data.getHours());
  if(hour.length === 1) {
    hour = "0" + hour;
  }
  var min = JSON.stringify(data.getMinutes());
  if(min.length === 1) {
    min = "0" + min;
  }
  return hour + ":" + min;
}

function publishTweet() {
  var myNewTweet = newTweet.value + newTweetBox.value;
  template = `
    <img class="userPhoto" src="https://pbs.twimg.com/profile_images/2067911760/Untitled_4_400x400.jpg" alt="">
    <div class="tweetConteiner">
      <span class="name">Dine</span>
      <span class="userName">@dinerf</span>
      <span class="now">- ${getTime()}</span>
      <p class="publishedTweet">${myNewTweet}</p>
      <div class="interactOptions">
        <i class="far fa-comment"></i>
        <i class="fas fa-retweet"></i>
        <i class="far fa-heart"></i>
        <span class="icon-bar-chart-2"></span>
      </div>
    </div>
  `
  var feedTweet = document.createElement("div");
  feedTweet.setAttribute("class", "feedTweet");
  feedTweet.innerHTML = template;
  document.getElementById("feed").appendChild(feedTweet);
  
  clear();
}

function findId(e) {
  return e.target.id;
}