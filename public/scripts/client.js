/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  
  // Common variables used throughout the code
  const tweetSectionCSSSelector = "section.posted-tweets";
  const tweetsURL = "http://localhost:8080/tweets";
  
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }; 
  
  
  const createErrorElement = function(errorMessage) {
    return $(
      `<section class="tweet-error">
      <i id="tweet-error-close" class="fas fa-window-close fa-xs"></i>
      <div class="tweet-error">
      <i class="fas fa-exclamation-triangle"></i>
      <p>${errorMessage}</p>
      <i class="fas fa-exclamation-triangle"></i>
      <div>
      </section>`
      )    
    };
    
    const createAndClearErrorHTML = function(errMsg) {
      // create new element if this is first error, if not just change the internal text
      if (!$("section.tweet-error").length) {
        let $errorHandle = createErrorElement(errMsg);
        $errorHandle.css("display", "none");
        $("main.container").prepend($errorHandle);
      } else {
        $("section.tweet-error p").text(errMsg);
      }
      
      //create error message for too many characters
      $("section.tweet-error").slideDown(400);
      
      // create an on-click listener for the close box in the error message. This will delete the error box
      $("#tweet-error-close").on("click", function() {
        $("section.tweet-error").remove();
      });
    }
    
    // TWEET JS FUNCTIONALITY
    /*******************************************************************************/
    
    // render an array of tweets to the page
    const renderTweets = function(tweets, cssSelector) {
      for (const tweet of tweets) {
        $(cssSelector).append(createTweetElement(tweet));
      }
    };
    
    // function to generate the tweet container HTML
    const createTweetElement = function(tweet) {
      // Article jQuery element
      const $tweetArticle = $(`<article class="posted-tweets"></article>`);
      
      // Store all Header jQuery elements
      const $tweetHeader = $(`<header class="posted-tweets"></header>`);
      const $tweetUserDiv = $(`<div class="posted-tweets user"></div>`);
      const $tweetUserAvatar = $(`<img src="${tweet.user.avatars}" alt="User Icon">`);
      const $tweetUsername = $(`<div><i>${tweet.user.name}</i></div>`);
      const $tweetUserHandle = $(`<div class="handle">${tweet.user.handle}</div>`);
      
      // Store all tweet main jQuery elements
      const $tweetContent = $(`<main class="posted-tweets">${escape(tweet.content.text)}</main>`);
      
      // Store hr separator jQuery element
      const $tweetSeparator = $(`<hr class="posted-tweets-separator">`);
      
      // Store all tweet footer elements
      const $tweetFooter = $(`<footer class="posted-tweets"></footer>`);
      const $tweetFooterTime = $(`<time class="time"><i>${timeago.format(tweet.created_at)}</i></time>`);
      const $tweetFooterIcons = $(`<div class="posted-tweets icons"><i class="fas fa-flag fa-xs"></i><i class="fas fa-retweet fa-sm"></i><i class="fas fa-heart fa-xs"></i></div>`);
      
      // Build the HTML elements into a single structure under Article
      $tweetUserDiv.append($tweetUserAvatar, $tweetUsername);
      $tweetHeader.append($tweetUserDiv, $tweetUserHandle);
      $tweetFooter.append($tweetFooterTime, $tweetFooterIcons);
      $tweetArticle.append($tweetHeader, $tweetContent, $tweetSeparator, $tweetFooter);
      
      return $tweetArticle;
    };
    
    // Fetch tweets array from our database and append to the tweet section on load
    const loadTweets = function() {
      $.ajax({
        url: tweetsURL,
        method: "GET"
      }).then((tweets) => {
        renderTweets(tweets.reverse(), tweetSectionCSSSelector);
      });
    };
    
    // Fetch a single tweet from the database after creation to add to the list
    const loadTweet = function() {
      $.ajax({
        url: tweetsURL,
        method: "GET"
      }).then((tweets) => {
        $(tweetSectionCSSSelector).prepend(createTweetElement(tweets.pop()));
      });
    };
    
    // Tweet form submit:
    // on tweet submit button click, check if tweet is valid, post data to the server and then upon successful post, do a GET request to retrieve the nicely formatted data object the backend was so kind to package up for us. prepened only the most recent post to the tweet section 
    $("form.tweet-form").on("submit", function(event) {
      event.preventDefault();
      const data = $(this).serialize();
      const charCounter = $("#tweet-char-counter").val();
      
      if ( charCounter < 0) {
        createAndClearErrorHTML("too many tweet items in your cart. please return some to their respective shelves");
        
      } else if (data == null || data === "text=") {
        createAndClearErrorHTML("Come on, you must have something to say, no? really? you're THAT boring?");
        
      } else {
        // clear outstanding error messages
        $("section.tweet-error").slideUp(400);
        
        $.post(tweetsURL, $(this).serialize(), () => {
          $("textarea.tweet-text").val('');
          $("#tweet-char-counter").val(140);
          loadTweet();
        });
      }
    });

    // Load existing tweets onto page
    loadTweets();
    
  });
  