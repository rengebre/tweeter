/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const exampleTweet = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
};

$(document).ready(function() {
  // const convertDateToTimeOffset = {
    
  // };

  const createTweetElement = function(tweet) {
    // Article jQuery element
    const $tweetArticle = $(`<article class="posted-tweets"></article>`);

    // Store all Header jQuery elements
    const $tweetHeader = $(`<header class="posted-tweets"></header>`);
    const $tweetUserDiv = $(`<div class="posted-tweets user"></div>`);
    const $tweetUserAvatar = $(`<img src="${tweet.user.avatars}" alt="User Icon">`);
    const $tweetUsername = $(`<div><i>${tweet.user.name}</i></div>`);
    const $tweetUserHandle = $(`<div class="handle">${tweet.user.handle}</div>`)
    
    // Store all tweet main jQuery elements
    const $tweetMain = $(`<main class="posted-tweets">${tweet.content.text}</main>`);
    
    // Store hr separator jQuery element
    const $tweetSeparator = $(`<hr class="posted-tweets-separator">`);
    
    // Store all tweet footer elements
    const $tweetFooter = $(`<footer class="posted-tweets"></footer>`);
    const $tweetFooterTime = $(`<time class="time"><i>${tweet.created_at}</i></time>`)
    const $tweetFooterIcons = $(`<div class="posted-tweets icons"><i class="fas fa-flag fa-xs"></i><i class="fas fa-retweet fa-sm"></i><i class="fas fa-heart fa-xs"></i>
  </div>`);

        
    $tweetUserDiv.append($tweetUserAvatar);
    $tweetUserDiv.append($tweetUsername);
    $tweetHeader.append($tweetUserDiv);
    $tweetHeader.append($tweetUserHandle);
    $tweetArticle.append($tweetHeader);
    $tweetArticle.append($tweetMain);
    $tweetArticle.append($tweetSeparator);
    $tweetFooter.append($tweetFooterTime);
    $tweetFooter.append($tweetFooterIcons);
    $tweetArticle.append($tweetFooter);
    
    return $tweetArticle;
  }

  $("form.tweet-form").on("submit", function(event) {
    event.preventDefault();

    $("section.posted-tweets").append(createTweetElement(exampleTweet));
  });
})
