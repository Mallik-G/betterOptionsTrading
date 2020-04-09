// ==UserScript==
// @name         mySmallCasesOnKite
// @namespace    http://mySmallCasesOnKite.net/
// @version      0.1
// @description  try to take over the world!
// @author       Amit
// @match        https://*/*
// @grant        none
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


// the guts of this userscript
function main() {
  // Note, jQ replaces $ to avoid conflicts.

    /* replace the below text with your array eg
    var holdings = {
      "Dividend" : ["SJVN","VEDL"],
      "Wealth Creators" : ["WHIRLPOOL","ICICIBANK",],
      "Sell On profit" : ["LUMAXIND","RADICO"]
    };
    */
    <<< REPLACE >>>

    //crete the dropdown to filter stocks.
    var dropdown = function(){
        var selectBox = document.createElement("SELECT");
        selectBox.classList.add("randomClassToHelpHide");
        var option = document.createElement("option");
        option.text = "All";
        selectBox.add(option);
        selectBox.addEventListener("change", function() {
            var selectedCat = this.value;
            var selectedStocks = holdings[selectedCat];

            //START work on Holdings AREA
            var allHoldingrows = jQ("#app > div.container.wrapper > div.container-right > div > div > section > div > div > table > tbody > tr");
            allHoldingrows.show();
            if (selectedCat === "All") {
                //don't do anything
            } else {
                //logic to hide the rows not in our list
                allHoldingrows.each(function(rowIndex) {
                    var dataUidInTR = this.getAttribute("data-uid");
                    if (dataUidInTR.includes("-BE")) {
                        dataUidInTR = dataUidInTR.split("-BE")[0];
                    } else if (dataUidInTR.includes("NSE")) {
                        dataUidInTR = dataUidInTR.split("NSE")[0];
                    } else if (dataUidInTR.includes("BSE")) {
                        dataUidInTR = dataUidInTR.split("BSE")[0];
                    }

                    var matchFound = false;
                    matchFound = selectedStocks.includes(dataUidInTR);

                    if (matchFound) {
                        //dont do anything, let the row be shown.
                    } else {
                        jQ(this).hide();
                    }
                });
            }
            //END work on Holdings AREA

            //START work on watchlist AREA
            var allWatchlistRows = jQ("#app > div.container.wrapper > div.container-left > div > div.instruments > div > div.vddl-draggable.instrument");
            allWatchlistRows.show();
            if (selectedCat === "All") {
                //don't do anything
            } else {
                allWatchlistRows.each(function(rowIndex){
                    var outsideSpan = this;
                    var watchlistStock = jQ(outsideSpan).find("span.nice-name").html();
                    if (watchlistStock.includes("-BE")) {
                        watchlistStock = watchlistStock.split("-BE")[0];
                    }
                    var matchFound = false;
                    matchFound = selectedStocks.includes(watchlistStock);

                    if (matchFound) {
                        console.log('match W: '+watchlistStock);
                    } else {
                        jQ(outsideSpan).hide();
                    }
                });
            }
            //END work on watchlist AREA
        });

        //var cats = Object.keys(myObject);
        for(var key in holdings){
            option = document.createElement("option");
            option.text = key;
            selectBox.add(option);
        };

        return selectBox;
       }();
    var myScriptLoaded = false;


    //jQ(document).ready(function(){
    jQ(document).on('click', "h3.page-title.small > span", function () {
        // jQuery methods go here...
        //jQ(".nice-name").hide();
        if (!myScriptLoaded) {
            jQ("span.holdings-selector-wrap").after(dropdown);

            //jQ("#app > div.container.wrapper > div.container-right > div > div > section > div > div > table > tbody > tr").each(function(rowIndex) {
            //label indicating category of stock
            jQ("td.instrument.right-border > span").each(function(rowIndex){

                    var rowValue = this.innerHTML;

                    var cat = function() {
                        for(var key in holdings){
                            if (rowValue.includes("-BE")) {
                                rowValue = rowValue.split("-BE")[0];
                            }
                            if (holdings[key].includes(rowValue)) {
                                return key;
                            }
                        };
                        return "";
                    }();
                    jQ(this).append("\r\n<b class='randomClassToHelpHide' style='vertical-align:sub;font-size:x-small;color:red'> ("+cat+") </b>");
                });

            //});


            jQ(".randomClassToHelpHide").dblclick(function(){
                // jQuery methods go here...
                //jQ(".nice-name").hide();
                jQ(".randomClassToHelpHide").remove();
                myScriptLoaded = false;

            });
            myScriptLoaded = true;
        }
    });
}

// load jQuery and execute the main function
addJQuery(main);
