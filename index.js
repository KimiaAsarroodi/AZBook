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

function writeTable(list) {
  for (var i = 0; i < list.length; i++) {
    console.log(list[i]);
    var tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    var newRow = tbodyRef.insertRow();
    var newTitle = newRow.insertCell();
    var newAuthors = newRow.insertCell();
    var newYear = newRow.insertCell();
    var newPrice = newRow.insertCell();
    var newPublisher = newRow.insertCell();
    var newCategory = newRow.insertCell();
    newTitle.innerHTML = bookList[i].title;
    newAuthors.innerHTML = bookList[i].authors;
    newYear.innerHTML = bookList[i].year;
    newPrice.innerHTML = bookList[i].price;
    newPublisher.innerHTML = bookList[i].publisher;
    newCategory.innerHTML = bookList[i].category;
    //var newTitle = document.createTextNode(bookList[0].title);
    //var newAuthors = document.createTextNode(bookList[0].authors);
    // newCell.appendChild(newTitle);
  }


}

window.onload = function () {
  bookList = []; // book list container
  getJsonObject('data.json',
    function (data) {
      bookList = data; // store the book list into bookList
      // console.log(bookList); // print it into console (developer tools)
      // console.log(bookList[0].authors); // print the first book object into console 
      // here you can call methods to laod or refresh the page 
      // loadBooks() or refreshPage()
      writeTable(bookList);


    },
    function (xhr) {
      console.error(xhr);
    }
  );
}
