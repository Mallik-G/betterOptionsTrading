# betterKite

Very simple "userscript" which adds following features to kite.zerodha.com ui

* Group your holdings in 'categories' or 'tags'
* See a small tag next to your stock name indicating which category does the stock belong to.
* When a specific category is selected, only stocks in that category is shown in 'watchlist' or 'orders' or 'holdings' screen
* One stock can have multiple tags.
* When you click on a stock in watchlist, if same stock is present in 'holdings', screen will be scrolled bringing the stock in the middle and it will be highlighted for few seconds.

TODO
* Save tags/categories instead of using array
* Instructions for [Violentmonkey](https://openuserjs.org/about/Violentmonkey-for-Chrome)
* Bug. selection doesn't reflect on order screen in one situation.

# Installation

(Note: Screenshots below are old)

For now installation of script is intentionally kept manual.
* Install [Tempermonkey](https://www.tampermonkey.net/) for your browser. [Chrome extension link](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
* ![Create a new script](https://dl.dropbox.com/s/k13sxt4wl6kfb4w/createNewScript.gif?dl=0)
* Copy and paste content of the script from [this file](https://raw.githubusercontent.com/amit0rana/betterKite/master/mySmallCasesOnKite.js)
* Create your categories, replace it in the script and save it.
* Format of the list
```
var holdings = {
  "Dividend" : ["SJVN","VEDL"],
  "Wealth Creators" : ["WHIRLPOOL","ICICIBANK",],
  "Sell On profit" : ["LUMAXIND","RADICO"]
};
```
* Search for <<< REPLACE >>> and replace it with your list.
![Saving Script](https://dl.dropbox.com/s/zpaoybu6nllta0l/pasteAndSaveScript.gif?dl=0)
* After saving, go to your kite screen and refresh. After refreshing you should see a red (1) badge next to Tempermonkey icon as shown in the image.
* Go to holdings section and click on 'Holdings(xx)' text.
![Using Script](https://dl.dropbox.com/s/blxec4q9nop1jmo/usageScript.gif?dl=0)
