/*
In here all the code will be focused around checking all bookmarks 
and sending them to the next.js app
*/

//Defining the CTAs
const onButton = document.getElementById("onbutton");
const offButton = document.getElementById("offbutton");
offButton.style.display = "none";

//On Function

function turningBookmarkDailyOn() {
  onButton.style.display = "none";
  offButton.style.display = "flex";

  const recentlyAdded = chrome.bookmarks
    .getRecent(1000)
    .then((recentlyAdded) => {
      console.log(recentlyAdded);
      const dateAddedFirstBookmark = recentlyAdded[0];
      const dateConversionFirstBookMark = new Date(
        dateAddedFirstBookmark.dateAdded
      );

      const dateFirstBookMarkUSFormat =
        dateConversionFirstBookMark.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
      console.log("First Bookmark was added on: ", dateFirstBookMarkUSFormat);
    });

  console.log(recentlyAdded);
}

onButton.addEventListener("click", turningBookmarkDailyOn);

//Off Function

function turningBookmarkDailyOff() {
  console.log("Turning it on");
  offButton.style.display = "none";
  onButton.style.display = "flex";
}

offButton.addEventListener("click", turningBookmarkDailyOff);
