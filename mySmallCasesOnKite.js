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

    var style = document.createElement("style");
    style.textContent = `
.randomClassToHelpHide {outline: 1px dotted green;}
`;
    //only for debuggin- document.body.appendChild(style);
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

    var DEBUG = false;

    //crete the dropdown to filter stocks.
    var dropdown = function(){
        var holdingsSelectorWrap = document.createElement("span");
        holdingsSelectorWrap.classList.add("holdings-selector-wrap");
        holdingsSelectorWrap.classList.add("randomClassToHelpHide");

        var selectBox = document.createElement("SELECT");
        selectBox.id = "tagSelector";
        selectBox.classList.add("holdings-selector");

        var option = document.createElement("option");
        option.text = "All";
        option.value= "All";
        selectBox.add(option);
        selectBox.addEventListener("change", function() {
            var selectedCat = this.value;

            if (DEBUG) console.log("Tag selected: " + selectedCat);
            var selectedStocks = holdings[selectedCat];

            //START work on Holdings AREA
            var allHoldingrows = jQ("div.holdings > section > div > div > table > tbody > tr");
            allHoldingrows.show();
            if (selectedCat === "All") {
                jQ("#stocksInTagCount").text("");
                //don't do anything
            } else {
                //logic to hide the rows in Holdings table not in our list
                var countStocks = 0;
                allHoldingrows.addClass("allHiddenRows");

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
                        countStocks++;
                    } else {
                        jQ(this).hide();
                    }
                });
                jQ("#stocksInTagCount").text("("+countStocks+") ");
            }
            //END work on Holdings AREA

            //START work on watchlist AREA
            var allWatchlistRows = jQ("div.instruments > div > div.vddl-draggable.instrument");
            allWatchlistRows.show();
            if (selectedCat === "All") {
                //don't do anything
            } else {
                allWatchlistRows.addClass("allHiddenRows");

                allWatchlistRows.each(function(rowIndex){
                    var outsideSpan = this;
                    var watchlistStock = jQ(outsideSpan).find("span.nice-name").html();
                    if (watchlistStock.includes("-BE")) {
                        watchlistStock = watchlistStock.split("-BE")[0];
                    }
                    var matchFound = false;
                    matchFound = selectedStocks.includes(watchlistStock);

                    if (matchFound) {
                        if (DEBUG) console.log('match W: '+watchlistStock);
                    } else {
                        jQ(outsideSpan).hide();
                    }
                });
            }
            //END work on watchlist AREA

            //START work on order AREA
            var allPendingOrderRows = jQ("div.pending-orders > div > table > tbody > tr");

            var allExecutedOrderRows = jQ("div.completed-orders > div > table > tbody > tr");
            allPendingOrderRows.show();
            allExecutedOrderRows.show();

            if (DEBUG) console.log("pending orders: " + allPendingOrderRows.length);

            if (selectedCat === "All") {
                //don't do anything
            } else {
                var countStocks = 0;
                allPendingOrderRows.addClass("allHiddenRows");
                allPendingOrderRows.each(function(rowIndex){
                    var workingRow = this;
                    var stockInRow = jQ(workingRow).find("span.tradingsymbol > span").html();
                    if (DEBUG) console.log("found pending order: " + stockInRow);
                    if (stockInRow.includes("-BE")) {
                        stockInRow = stockInRow.split("-BE")[0];
                    }
                    var matchFound = false;
                    matchFound = selectedStocks.includes(stockInRow);

                    if (matchFound) {
                        //do nothing
                        countStocks++;
                    } else {
                        jQ(workingRow).hide();
                    }
                });
                jQ("#stocksInTagCount").text("("+countStocks+") ");

                allExecutedOrderRows.addClass("allHiddenRows");
                allExecutedOrderRows.each(function(rowIndex){
                    var workingRow = this;
                    var stockInRow = jQ(workingRow).find("span.tradingsymbol > span").html();
                    //if (DEBUG) console.log("found executed order: " + stockInRow);
                    if (stockInRow.includes("-BE")) {
                        stockInRow = stockInRow.split("-BE")[0];
                    }
                    var matchFound = false;
                    matchFound = selectedStocks.includes(stockInRow);

                    if (matchFound) {
                        //do nothing
                    } else {
                        jQ(workingRow).hide();
                    }
                });

            }
            //END work on order AREA

            return this;
        });

        for(var key in holdings){
            option = document.createElement("option");
            option.text = key;
            option.value = key;
            selectBox.add(option);
        };

        holdingsSelectorWrap.append(selectBox);

        var iChav = document.createElement("i");
        iChav.classList.add("icon");
        iChav.classList.add("icon-chevron-down");
        holdingsSelectorWrap.append(iChav);

        return holdingsSelectorWrap;
    }();

    jQ(document).on('click', "h3.page-title.small > span", function () {
        // jQuery methods go here...
        if (jQ(".randomClassToHelpHide").length) {
            jQ(".randomClassToHelpHide").remove();
            jQ(".allHiddenRows").show();
        } else {
            jQ("h3.page-title.small")[0].before(dropdown);

            var spanForCount = document.createElement("span");
            spanForCount.classList.add("randomClassToHelpHide");
            spanForCount.style.fontSize = "large";
            spanForCount.id ='stocksInTagCount';
            jQ("h3.page-title.small")[0].before(spanForCount);

            //add label indicating category of stock
            jQ("td.instrument.right-border > span").each(function(rowIndex){

                var displayedStockName = this.innerHTML;

                for(var categoryName in holdings){
                    if (displayedStockName.includes("-BE")) {
                        displayedStockName = displayedStockName.split("-BE")[0];
                    }

                    if (holdings[categoryName].includes(displayedStockName)) {
                        jQ(this).append("<span class='randomClassToHelpHide'>&nbsp;</span><span class='text-label blue randomClassToHelpHide'>"+categoryName+"</span>");
                    }
                };

            });

            //jQ("#tagSelector").val("All").change();
            var sortBySelect = document.querySelector("#tagSelector");
            sortBySelect.value = "All";
            sortBySelect.dispatchEvent(new Event("change"));
        }
    });


}

// load jQuery and execute the main function
addJQuery(main);
