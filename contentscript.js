const conRegEx = /arca\.live\/b\/simya\/(\d+)\?/;                   
var simyaArticleList = document.querySelectorAll("a.vrow.column"); // get article number from the board

chrome.runtime.sendMessage(
  {action: "GETNUM"}, 
  function(response)
  {
    // response => Array of article numbers
    for(i = 0; i < simyaArticleList.length; ++i)
    {
      var simyaNum = simyaArticleList[i].href.match(conRegEx);
      if(simyaNum != null)
        simyaNum = simyaNum[1]; // match group(0) to value

      // if find simyaNum from the response then change color to 'red'
      if(response.find(ret => ret === simyaNum) != undefined)  
        simyaArticleList[i].style.color ="red";
    }
  }
);
