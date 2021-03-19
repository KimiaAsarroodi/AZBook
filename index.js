var searched = [];
var categorized = [];
//var mutual = [];
var selectedId = "";
var countbooks = 0;

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
    //console.log(list[i]);
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
    //console.log(count);
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
function search(){
  
//console.log("search function");
//const searchBar = document.forms['search-titles'].querySelector('input');
document.getElementById("btn").addEventListener('click',function(e){
  searched = [];
  console.log(searched.length);
  //console.log("inside event");
  const term = document.getElementById("search").value.toLowerCase();
  //console.log(document.getElementById("search").value.toLowerCase());
  //const titles = document.querySelector('td:nth-child(3)');
 const titles= []; 
 //const categories = ["Action and Adventure","Art","Health","Science History","Boudnary Test"];

 for(var i=1; i< document.getElementById("myTable").rows.length;i++){
   titles.push(document.getElementById("myTable").rows[i].cells.item(2).innerHTML);
   
 }
// console.log(titles);
 //document.getElementById("myTable").rows[1].cells.item(2).innerHTML;
  
  //alert(titles);
  if(term ===""){
    console.log("term is blank");
    return;}
   for(var j=0;j<titles.length;j++){
// console.log("where you wanted to be");
    //console.log(titles);
   // console.log(titles[j]);
    // if(term === "" ){
    //   console.log("term empty");
    //   document.getElementById("myTable").rows[j+1].cells.item(2).style.borderStyle = "dotted";

    // }
    if(titles[j].toLowerCase().indexOf(term)!= -1 && term !== ""){
      //console.log("matches" + j);
      //document.getElementById("myTable").rows[j+1].cells.item(2).style.backgroundColor = "red";
      
      searched.push(j);
      changeColor(j);
      //console.log(searched);
      //searched = true;
    }
    
    else{
       console.log("term is:" + term);
       
      document.getElementById("myTable").rows[j+1].style.backgroundColor = "white";
    }
   }
  //})
})}
function limitcheck(tick){
  ///console.log("TOP"+tick.checked);
 // if((searched === true && categorized === false) || (searched === false && categorized === true) || (searched === true && categorized === true)){
    if(tick.checked === false){
      return;
     }
    else{
    for(var i =0; i<document.getElementById("myTable").rows.length-1; i++){
      document.getElementById(i).checked = false;
    }
    tick.checked = true;
    selectedId=tick.id;
   // console.log(selectedId);
   }
    //console.log(tick.checked)
  //}
}

function addCart(){

  var tenure = prompt("Please specify how many of " + document.getElementById("myTable").rows[parseInt(selectedId)+1].cells.item(2).innerHTML + " book you would like to add to your shopping cart?","");
  countbooks += parseInt(tenure); 
  document.getElementById(selectedId).checked = false;
  document.getElementById("qty").innerHTML = "("+countbooks+")";
}
function resetCart(){
  confirm("Is it okay to reset the cart?");
  countbooks = 0;
  document.getElementById(selectedId).checked = false;
  document.getElementById("qty").innerHTML = "(0)";
}
function categorize(){
  
  categorized = [];
 // console.log(categorized.length);
  //console.log(document.getElementById("categories").options[document.getElementById("categories").selectedIndex].value);
  for(var i =0; i<document.getElementById("myTable").rows.length-1; i++){
    if(document.getElementById("categories").options[document.getElementById("categories").selectedIndex].value === document.getElementById("myTable").rows[i+1].cells.item(8).innerHTML.toLowerCase()){
      //console.log(i);
      //categorized = true;
      //console.log(document.getElementById("myTable").rows[i+1].cells.item(2).innerHTML);
     // document.getElementById("myTable").rows[i+1].cells.item(8).style.backgroundColor = "red";
      categorized.push(i);
     // console.log(categorized);
      changeColor(i);
     // console.log(document.getElementById("myTable").rows[i+1].cells.item(8).style.backgroundColor);
    }
    else{
      document.getElementById("myTable").rows[i+1].style.backgroundColor = "white";
    }
    //console.log(document.getElementById("myTable").rows[i+1].cells.item(8).innerHTML);
 // console.log(document.getElementById("categories").selectedIndex);
}
}
function changeColor(id){
 // console.log("searched: "+ searched.length);
 // console.log("categorized: "+ categorized.length);
 // console.log(typeof id);
  if((searched.length === 0 && categorized.length !== 0) || (categorized.length === 0 && searched.length !== 0)){
    document.getElementById("myTable").rows[id+1].style.backgroundColor = "red";
    // for(var i=0; i<categorized.length;i++){
    //   document.getElementById("myTable").rows[categorized[i]+1].style.backgroundColor = "red";
    // }
    //console.log("searched is EMPTY");
    return;
  }
  // if(categorized.length === 0 && searched.length !== 0){
  //   for(var i=0; i<searched.length;i++){
  //     document.getElementById("myTable").rows[searched[i]+1].style.backgroundColor = "red";
  //   }
  //   console.log("categorized is EMPTY");
  //   return;
  // }
  else{
  
 // console.log("NONE were empty");
  for(var i=0; i<searched.length;i++){
    for(var j =0; j<categorized.length;j++){
      if(searched[i] === categorized[j]){
       // console.log(searched[i] + "-----" + categorized[j]);
        document.getElementById("myTable").rows[searched[i] + 1].style.backgroundColor = "red";
        //mutual.push(searched[i]);
       // console.log("MUTUAL +");
      }
    }    
  }
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
      search();
      
      //limitcheck();


    },
    function (xhr) {
      console.error(xhr);
    }
  );
}
