$(function() {
  /*
   * The following code loads any of the detail pages
   * - it works by changing the hash (#) in the URL and then loading the corresponding page from the /details folder.
   */

  function hashHandler(event) {
    var newHash = location.hash.substr(1);
    console.log("Hash changed to ", newHash);

    if (newHash == "about") {
      $(".about-nav").addClass("about-active");
      hideDetails();
    } else {
      $(".about-nav").removeClass("about-active");
    }

    if (newHash == "projects") {
      $(".about-nav").addClass("projects-active");
    } else {
      $(".about-nav").removeClass("projects-active");
    }

    switch (newHash) {
      case "projects":
        // load project overview
        hideDetails();
        $("#detail")
          .html(loadingMessage)
          .fadeOut(800);
        $("#teasers").fadeIn(800);
        break;

      default:
        // load details page
        $("#teasers").fadeOut(300, function() {
          console.log("loading details for", newHash);
          $("#detail").load("/details/" + newHash + ".html", function(e) {
            $("#detail").fadeIn(800);
          });
        });
        break;
    }
  }

  // this is what makes is "active"
  window.addEventListener("hashchange", hashHandler, false);

  /*
   * The following code makes the hover effect over the thumbnails work.
   * - look at all work-samples articles and display details on hover
   * - take all articles and for each of then watch if the mouse hovers over it
   */

  $(".work-samples article:not(.coming-soon)").each(function() {
    $(this).hover(showDetails, hideDetails);
  });

  function showDetails(event) {
    //make sure we get the article, not the img or p inside it
    var article;
    if ($(event.target).prop("tagName") == "ARTICLE") {
      article = $(event.target);
    } else {
      article = $(event.target).parents("article");
    }

    // we have the article, grab the description
    var desc = article.find(".work-desc").clone();

    $(".desc-holder").html(desc);
  }

  function hideDetails(event) {
    if (location.hash == "#projects" || location.hash == "#about") {
      $(".desc-holder").html("");
    }
  }

  /*
   * The following code initialises the page
   * - hide the detail container
   * - add the '#projects' hash if there is no hash (user navigated to the homepage)
   * - it loads the content for the hash (if we have one)
   */

  // hide detail container
  $("#detail").hide();
  var loadingMessage = $("#detail").html();

  if (location.hash.length == 0) {
    location.hash = "#projects";
  }
  hashHandler("init page");
});
