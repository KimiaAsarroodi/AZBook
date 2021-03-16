function getJsonObject(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
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

window.onload = function (){
  bookList = []; // book list container
  getJsonObject('data.json',
    function(data) {
        bookList = data; // store the book list into bookList
        console.log(bookList); // print it into console (developer tools)
        console.log(bookList[0].authors); // print the first book object into console 
        // here you can call methods to laod or refresh the page 
        // loadBooks() or refreshPage()
        var tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
        var newRow = tbodyRef.insertRow();
        var newTitle= newRow.insertCell(0);
        var newAuthors = newRow.insertCell(1);
        var newYear = newRow.insertCell(1);
        var newPrice = newRow.insertCell(1);
        var newPublisher = newRow.insertCell(1);
        var newCategory= newRow.insertCell(1);
        newTitle.innerHTML = bookList[0].title;
        newAuthors.innerHTML = bookList[0].authors;
        newYear.innerHTML = bookList[0].year;
        newPrice.innerHTML = bookList[0].price;
        newPublisher.innerHTML = bookList[0].publisher;
        newCategory.innerHTML = bookList[0].category;
        //var newTitle = document.createTextNode(bookList[0].title);
        //var newAuthors = document.createTextNode(bookList[0].authors);
       // newCell.appendChild(newTitle);
        },
    function(xhr) { console.error(xhr);
     }
); }
