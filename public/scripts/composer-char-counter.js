const maxTweetChars = 140;

//wrap 
$(document).ready(function() {

  // Event to keep track of the character count of new tweets
  $('.tweet-text').on("input", function(e) {
    const inputLength = $(this).val().length;
    
    // The following commented out code is to navigate through the DOM to find the correct element instead of using the $("#tweet-char-counter") handle directly. This is what compass has informed us to do, but I really don't like it - it's very unmaintanable and unreadable.
    
    // let $counterHandle;

    // for (const element of $(this).siblings()) {
    //   for (const child of $(element).children()) {
    //     if($(child).hasClass("tweet-char-counter")) {
    //       $counterHandle = $(child);
    //     }
    //   }
    // }
  
    
    // implement the counter using the element ID of the counter    
    const $counterHandle = $('#tweet-char-counter');
    
    $counterHandle.val(maxTweetChars - inputLength);

    // Change the color style of the counter element if it goes negative. Change back if it becomes positive again
    if ($counterHandle.val() < 0) {
      $counterHandle.css('color', 'red');
    } else {
      $counterHandle.css('color', 'inherit');
    }
  });
});