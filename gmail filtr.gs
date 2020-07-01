// Jméno štítku, kterým budou označeny nevyřešené emaily
var SHORT_LOG_LABEL_NAME = 'TFTC'; 

// Funkce vytvoří nový štítek, pokud ještě neexistuje
function getShortLogLabel() {
  var label = GmailApp.getUserLabelByName(SHORT_LOG_LABEL_NAME);
  
  if (label == null)
     label = GmailApp.createLabel(SHORT_LOG_LABEL_NAME);
  
  return label;
}

// Odebere štítek všem e-mailům 
function removeShortLogLabels() {
  var label = getShortLogLabel();
  var threads = GmailApp.search('label:' + SHORT_LOG_LABEL_NAME);
  
  for (var i = 0; i < threads.length; i++)
      label.removeFromThread(threads[i]);
}

// Přidá štítek k nejnovějším 200 e-mailům, které vyhovují regulárnímu výrazu 
function addShortLogLabel() {
  var label = getShortLogLabel();
  
  // čísla 0, 200 určují začátek a konec vyhledávání. Maximum je 500
  var threads = GmailApp.getInboxThreads(0, 200);

  // Projde všechny e-maily v rozsahu
  for (var i = 0; i < threads.length; i++) {
    var tmp,
      message = threads[i].getMessages()[0],
      content = message.getPlainBody();

    // Zkontroluje, jestli obsah e-mailu odpovídá zadanému pravidlu
    if (content) {
      
      // Regulární výraz - číslice 40 určuje délku logu, kratší logy než 40 znaků jsou označeny štítkem
      tmp = content.match(/(:\*)\s{1,}.{1,40}\s{1,}(This)/);

      Logger.log(tmp);
      
      // Pokud odpovídá pravidlu, přidá štítek
      if (tmp)
        label.addToThread(threads[i]);
    }  // Konec podmínky
  }  // Konec cyklu
}
