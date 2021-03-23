/*
  Defining the global variables
*/
var bookList = [];
var currentTable = [];
var countSearched = 0;
var countCategorized = 0;
var countBooks = 0;
var selectedId = "";

function getJsonObject(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success) success(JSON.parse(xhr.responseText));
      } else {
        if (error) error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}
/*
  Creating the table based on the list provided 
*/
function writeTable(list) {
  
  for (var i = 0; i < list.length; i++) {
    var tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    var newRow = tbodyRef.insertRow();
    var newCheck = newRow.insertCell();
    var newImg = newRow.insertCell();
    var newTitle = newRow.insertCell();
    var newRate = newRow.insertCell();
    var newAuthors = newRow.insertCell();
    var newYear = newRow.insertCell();
    var newPrice = newRow.insertCell();
    var newPublisher = newRow.insertCell();
    var newCategory = newRow.insertCell();
    newCheck.innerHTML = '<input type="checkbox" onclick="limitcheck(this)" id="' + i + '"/> ';
    newTitle.innerHTML = list[i].title;
    newAuthors.innerHTML = list[i].authors;
    newYear.innerHTML = list[i].year;
    newPrice.innerHTML = list[i].price;
    newPublisher.innerHTML = list[i].publisher;
    newCategory.innerHTML = list[i].category;
    var img = document.createElement('img');
    img.src = list[i].img;
    newImg.appendChild(img);
    img.classList.add("bookImg");
    for (var j = 0; j < list.rating; j++) {
      var rate = document.createElement('img');
      rate.src = "images/star-16.ico";
      newRate.appendChild(rate);
    }
    for (var j = 0; j < list[i].rating; j++) {
      var rate = document.createElement('img');
      rate.src = "images/star-16.ico";
      newRate.appendChild(rate);
    }
    var countRate = 5 - list[i].rating;
    for (var k = 0; k < countRate; k++) {
      var unrate = document.createElement('img');
      unrate.src = "images/outline-star-16.ico";
      newRate.appendChild(unrate);
    }
  }
}
/*
 Traversing table to check if the given input by user matches any table entry 
   - If it finds the searching keyword in title of a book it will change its color
*/
function searchKey() {

  bookList.forEach(element => element.searching = false);
  const term = document.getElementById("search").value.toLowerCase();
  const titles = [];
  if(currentTable.length === 0){
    currentTable = bookList;
  }

  for (var i = 1; i < document.getElementById("myTable").rows.length; i++) {
    titles.push(document.getElementById("myTable").rows[i].cells.item(2).innerHTML);
  }
  if (term === "") {
    countSearched = 0;
    for (var k = 1; k < document.getElementById("myTable").rows.length; k++) {
      if (document.getElementById("darkmode").checked === true) {
        document.getElementById("myTable").rows[k].style.backgroundColor = "#bbbbbb";
      }
      else {
        document.getElementById("myTable").rows[k].style.backgroundColor = "#FAFCFF";
      }
    }
    return;
  }
  countSearched += 1;
  for (var j = 0; j < titles.length; j++) {
    if (titles[j].toLowerCase().indexOf(term) != -1 && term !== "") {
      bookList[j].searching = true;
      currentTable[j].searching = true;
      if (document.getElementById("darkmode").checked === true) {
        document.getElementById("myTable").rows[j + 1].style.backgroundColor = "#8e7f7f";
      }
      else {
        document.getElementById("myTable").rows[j + 1].style.backgroundColor = "#5898d8";
      }
    }
    else {
      if (document.getElementById("darkmode").checked === true) {
        document.getElementById("myTable").rows[j + 1].style.backgroundColor = "#bbbbbb";
      }
      else {
        document.getElementById("myTable").rows[j + 1].style.backgroundColor = "#FAFCFF";
      }
    }
  }
}
/*
  Limiting number of checkbox to be selected to one 
*/
function limitcheck(tick) {

  if (tick.checked === false) {
    return;
  }
  else {

    for (var i = 0; i < document.getElementById("myTable").rows.length - 1; i++) {

      document.getElementById(i).checked = false;
    }
    tick.checked = true;
    selectedId = tick.id;
  }
}
/*
  Adding given number of a specific book to the users shopping bag
 */
function addCart() {
  if (selectedId !== "") {
    var tenure = parseInt(prompt("Please specify how many of " + 
    document.getElementById("myTable").rows[parseInt(selectedId) + 1].cells.item(2).innerHTML +
     " book you would like to add to your shopping cart?", ""));
    if (tenure >= 1) {
      countBooks += tenure;
      document.getElementById(selectedId).checked = false;
      document.getElementById("qty").innerHTML = "(" + countBooks + ")";
    }
    else {
      alert("Please enter a positive number");
      addCart();
    }
  }
  else {
    alert("Please first select a book from the list provided below")
  }
}
/*
  Resetting the cart by setting the book count to zero
*/
function resetCart() {
  if (countBooks === 0) {
    alert("Your shopping bag is empty");
  }
  else {
    confirm("Is it okay to reset the cart?");
    countBooks = 0;
    document.getElementById(selectedId).checked = false;
    document.getElementById("qty").innerHTML = "(0)";
  }
}
/*
  Filtering booklist in accordance with the category selected by the user 
*/
function categorize() {
  countCategorized += 1;
  deleteTable();
  bookList.forEach(element => element.categorizing = false);
  writeTable(bookList);
  currentTable = [];
  if (countSearched > 0) {
    if (document.getElementById("categories")
    .options[document.getElementById("categories").selectedIndex].value 
    === "category") {
      searchKey();
      return;
    }
    for (var j = 0; j < bookList.length; j++) {
      if ((bookList[j].searching === true) && 
      (document.getElementById("categories")
      .options[document.getElementById("categories").selectedIndex].value 
      === bookList[j].category.toLowerCase())) {
          bookList[j].categorizing = true;
          currentTable.push(bookList[j]);
      }
    }
    deleteTable();
    writeTable(currentTable);
    for (var i = 1; i < document.getElementById("myTable").rows.length; i++) {
      if (document.getElementById("darkmode").checked === true) {
        document.getElementById("myTable").rows[i].style.backgroundColor = "#8e7f7f";
      }
      else {
        document.getElementById("myTable").rows[i].style.backgroundColor = "#5898d8";
      }
    }
  }
  else {
    if (document.getElementById("categories")
    .options[document.getElementById("categories").selectedIndex].value 
    === "category") {
      
      return;
    }
    for (var i = 1; i < document.getElementById("myTable").rows.length; i++) {
      if (document.getElementById("categories")
      .options[document.getElementById("categories").selectedIndex].value
       === document.getElementById("myTable").rows[i].cells.item(8).innerHTML.toLowerCase()) {
        bookList[i - 1].categorizing = true;
        currentTable.push(bookList[i - 1]);
      }
    }
    deleteTable();
    writeTable(currentTable);
  }
}
/*
  Deleting table rows except the heading
*/
function deleteTable() {
  for (var i = document.getElementById("myTable").rows.length - 1; i > 0; i--) {
    document.getElementById("myTable").deleteRow(i);
  }
}
/*
  Changing the theme on click of the checkbox
*/
function changeMode() {
  document.body.classList.toggle('theme-dark');
  if (document.getElementById("darkmode").checked === true) {
    for (var i = 0; i < currentTable.length; i++) {
      if (currentTable[i].searching === true) {
        document.getElementById("myTable").rows[i + 1].style.backgroundColor = "#8e7f7f";

      }
      else {
        document.getElementById("myTable").rows[i + 1].style.backgroundColor = "#bbbbbb";
      }
    }
  }
  else {
    for (var i = 0; i < currentTable.length; i++) {
      if (currentTable[i].searching === true) {
        document.getElementById("myTable").rows[i + 1].style.backgroundColor = "#5898d8";
      }
      else {
        document.getElementById("myTable").rows[i + 1].style.backgroundColor = "#FAFCFF";
      }
    }
  }
}
window.onload = function () {
  getJsonObject('data.json',
    function (data) {
      bookList = data; 
      currentTable = bookList;
      for (var i = 0; i < bookList.length; i++) {
        bookList[i].searching = false;
        bookList[i].categorizing = false;
      }
      writeTable(bookList);
    },
    function (xhr) {
      console.error(xhr);
    }
  );
}
