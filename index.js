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
    var newCheck = newRow.insertCell();
    var newImg = newRow.insertCell();
    var newTitle = newRow.insertCell();
    var newRate = newRow.insertCell();
    var newAuthors = newRow.insertCell();
    var newYear = newRow.insertCell();
    var newPrice = newRow.insertCell();
    var newPublisher = newRow.insertCell();
    var newCategory = newRow.insertCell();
    newCheck.innerHTML = '<tr><td><input type="checkbox"> </td ></tr>';
    newTitle.innerHTML = bookList[i].title;
    newAuthors.innerHTML = bookList[i].authors;
    newYear.innerHTML = bookList[i].year;
    newPrice.innerHTML = bookList[i].price;
    newPublisher.innerHTML = bookList[i].publisher;
    newCategory.innerHTML = bookList[i].category;
    var img = document.createElement('img');
    img.src = bookList[i].img;
    newImg.appendChild(img);
    for(var j=0; j<bookList[i].rating;j++){
    var rate = document.createElement('img');
    rate.src = "images/star-16.ico";
    newRate.appendChild(rate);
    //newRate.innerHTML=bookList[i].rating;
    }
    var count = 5 - bookList[i].rating;
    console.log(count);
    for(var k=0; k< count;k++){
      var unrate = document.createElement('img');
      unrate.src = "images/outline-star-16.ico";
      newRate.appendChild(unrate);
      //newRate.innerHTML=bookList[i].rating;
      }


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
