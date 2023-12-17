/*
In here all the code will be focused around checking all bookmarks 
and sending them to the next.js app
*/

//Defining the CTAs
const onButton = document.getElementById("onbutton");
const offButton = document.getElementById("offbutton");
offButton.style.display = "none";

//API call function
async function postJSON(data) {
  try {
    const response = await fetch(
      "https://bookmarkdaily.vercel.app/api/backendForExtensionCalls",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

//Filtering data function. Will only return those records with a DateLastUsed value

const filteringData = (dataUnFiltered) => {
  return dataUnFiltered.filter(
    (bookmark) => bookmark.dateLastUsed !== undefined
  );
};

//On Function

function turningBookmarkDailyOn() {
  onButton.style.display = "none";
  offButton.style.display = "flex";

  const recentlyAdded = chrome.bookmarks
    .getRecent(1000)
    .then((recentlyAdded) => {
      console.log(recentlyAdded);
      const filteredData = filteringData(recentlyAdded);
      console.log(filteredData);

      postJSON(filteredData);
    });
}

onButton.addEventListener("click", turningBookmarkDailyOn);

//Off Function

function turningBookmarkDailyOff() {
  offButton.style.display = "none";
  onButton.style.display = "flex";
}

offButton.addEventListener("click", turningBookmarkDailyOff);
