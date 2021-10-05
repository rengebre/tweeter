const maxTweetChars = 140;

//wrap 
$(document).ready(function() {

  // Event to keep track of the character count of new tweets
  $(".tweet-text").on("input", function(e) {
    const inputLength = $(this).val().length;
    let $counterHandle;

    // navigate through the DOM to find the correct element instead of using the $(".tweet-char-counter") handle directly
    for (const element of $(this).siblings()) {
      for (const child of $(element).children()) {
        if($(child).hasClass("tweet-char-counter")) {
          $counterHandle = $(child);
        }
      }
    }
  
    $counterHandle.val(maxTweetChars - inputLength);

    if ($counterHandle.val() < 0) {
      $counterHandle.css('color', 'red');
    } else {
      $counterHandle.css('color', 'inherit');
    }
  });
});