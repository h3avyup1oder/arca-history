const conRegEx = /arca\.live\/b\/simya\/(\d+)\?/;
var duplicatedNumArray = [];
var microsecondsPerYear = 1000 * 60 * 60 * 24 * 365;
var oneYearAgo = (new Date).getTime() - microsecondsPerYear;

function getAllHistory(callback)
{
  chrome.history.search({
    'text': 'arca.live/b/simya/',    // filter by text 
    'startTime': oneYearAgo,         // if not define startTime then set default value to 24 hours
    'maxResults' : 0                 // 0 = no limits
  },
  function(historyItems){
    for(var i = 0; i < historyItems.length; ++i)
    {
      var url = historyItems[i].url;
      var simyaNum = url.match(conRegEx);
      if(simyaNum != null)
        duplicatedNumArray.push(simyaNum[1]); 
    }
    callback(); // callback using for synchronization of sendResponse
  });  
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse)
{
  if(request.action === "GETNUM")
  {
    getAllHistory(function(){
      sendResponse(duplicatedNumArray);
      duplicatedNumArray.splice(0, duplicatedNumArray.length);
    });
    return true; // DO NOT REMOVE 'return true' 
                 // because it's a handle asynchronously in content scripts.
  }
});