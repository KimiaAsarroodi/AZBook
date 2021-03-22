//var searched = [];
//var categorized = [];
//var result = [];
var selectedId = "";
var countbooks = 0;
var bookList=[];
var count =0;
var currentTable = [];
var searched = [];
var counter = 0;

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
    newTitle.innerHTML = list[i].title;
    newAuthors.innerHTML = list[i].authors;
    newYear.innerHTML = list[i].year;
    newPrice.innerHTML = list[i].price;
    newPublisher.innerHTML = list[i].publisher;
    newCategory.innerHTML = list[i].category;
    var img = document.createElement('img');
    img.src = list[i].img;
    img.classList.add("inverted");
    newImg.appendChild(img);
    for(var j=0; j<list.rating;j++){
    var rate = document.createElement('img');
    rate.src = "images/star-16.ico";
    rate.classList.add("inverted");
    newRate.appendChild(rate);
    //newRate.innerHTML=bookList[i].rating;
    }
    for(var j=0; j<list[i].rating;j++){
    var rate = document.createElement('img');
    rate.src = "images/star-16.ico";
    rate.classList.add("inverted");
    newRate.appendChild(rate);
    //newRate.innerHTML=bookList[i].rating;
    }
    var count = 5 - list[i].rating;
    //console.log(count);
    for(var k=0; k< count;k++){
      var unrate = document.createElement('img');
      unrate.src = "images/outline-star-16.ico";
      unrate.classList.add("inverted");
      newRate.appendChild(unrate);
      }

    
  }


}
function search(){
  
document.getElementById("btn").addEventListener('click',function(e){
  //searched = [];
  bookList.forEach(element => element.searching=false);

  const term = document.getElementById("search").value.toLowerCase();
 const titles= []; 

 for(var i=1; i< document.getElementById("myTable").rows.length;i++){
   titles.push(document.getElementById("myTable").rows[i].cells.item(2).innerHTML);
   
 }
  if(term ===""){
    count =0;
    for(var k = 0;k<document.getElementById("myTable").rows.length;k++){
      document.getElementById("myTable").rows[k+1].style.backgroundColor = "white";
    }
    
    //console.log("term is blank");
    return;}
    count += 1;
   for(var j=0;j<titles.length;j++){
    if(titles[j].toLowerCase().indexOf(term)!= -1 && term !== ""){
      
      //searched.push(j);
      
      bookList[j].searching = true;
      document.getElementById("myTable").rows[j+1].style.backgroundColor = "#5898d8";
      //changeColor(j);
    }
    
    else{
       //console.log("term is:" + term);
      document.getElementById("myTable").rows[j+1].style.backgroundColor = "white";
    }
   }
  //})
})}
function limitcheck(tick){
  
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
counter += 1;
deleteTable();
bookList.forEach(element => element.categorizing=false);
console.log(bookList);
writeTable(bookList);
currentTable=[];
if(count > 0){
  console.log(count);
  if(document.getElementById("categories").options[document.getElementById("categories").selectedIndex].value === "category"){
    return;}
  for(var j=0; j<bookList.length;j++){
    console.log("you are supposed to be here");
    console.log(bookList[j].category);
    console.log(bookList[j].searching);
    console.log("---------");
    console.log(document.getElementById("categories").options[document.getElementById("categories").selectedIndex].value);
    if((bookList[j].searching === true)) {
      console.log("first criteria met");
    if(document.getElementById("categories").options[document.getElementById("categories").selectedIndex].value === bookList[j].category.toLowerCase()){
      console.log("index is"+j);
      bookList[j].categorizing =true;
      console.log(bookList[j]);
      currentTable.push(bookList[j]);
    }
  }
  console.log(currentTable);
  
  
    
  //          if(document.getElementById("categories").options[document.getElementById("categories").selectedIndex].value === document.getElementById("myTable").rows[k].cells.item(8).innerHTML.toLowerCase()){
  //           // bookList[i-1].categorizing = true;
             
  //            //categorized.push(document.getElementById("myTable").rows[i].cells.item(2).innerHTML);
  //  }}
}
deleteTable();
//console.log(document.getElementById("myTable").innerHTML);
writeTable(currentTable);
for(var i=0;i<document.getElementById("myTable").rows.length;i++){
  document.getElementById("myTable").rows[i].style.backgroundColor = "#5898d8";
}}
else{
if(document.getElementById("categories").options[document.getElementById("categories").selectedIndex].value === "category"){
  return;
}
  for(var i =1; i<document.getElementById("myTable").rows.length; i++){
         if(document.getElementById("categories").options[document.getElementById("categories").selectedIndex].value === document.getElementById("myTable").rows[i].cells.item(8).innerHTML.toLowerCase()){
          // bookList[i-1].categorizing = true;
           //console.log(bookList[i-1]);
           bookList[i-1].categorizing =true;
           currentTable.push(bookList[i-1]);
           //categorized.push(document.getElementById("myTable").rows[i].cells.item(2).innerHTML);
 }}
 deleteTable();
 //console.log(document.getElementById("myTable").innerHTML);
 writeTable(currentTable);}

 //console.log(currentTable);

 //console.log(document.getElementById("myTable").innerHTML);


//   if((document.getElementById("categories").options[document.getElementById("categories").selectedIndex].value === "category") ){
//     //catcount -= 1;
//     return;
//   }
//   else{
   
//     console.log("its not category");
//   categorized = [];
//   count += 1;
//   if(count > 1){
  
//   writeTable(bookList);
//   }
//   console.log("twice");
//   for(var i =1; i<document.getElementById("myTable").rows.length; i++){
//     if(document.getElementById("categories").options[document.getElementById("categories").selectedIndex].value !== document.getElementById("myTable").rows[i].cells.item(8).innerHTML.toLowerCase()){
      
//           categorized.push(document.getElementById("myTable").rows[i].cells.item(2).innerHTML);
//     }
// }
// for(var j=0;j<categorized.length;j++){
//   for(var k=1; k< document.getElementById("myTable").rows.length;k++){
//     if(categorized[j] === document.getElementById("myTable").rows[k].cells.item(2).innerHTML){
//       //console.warn("inside if statement");
//       document.getElementById("myTable").deleteRow(k);
//     }
//   }
}

//}}
function deleteTable(){
  for(var i = document.getElementById("myTable").rows.length-1;i>0;i--){
    document.getElementById("myTable").deleteRow(i);
  }
}
function changeColor(id){


//   console.log("about to change the color");
//  // console.log("searched: "+ searched.length);
//  // console.log("categorized: "+ categorized.length);
//  // console.log(typeof id);
//   if((searched.length === 0 && categorized.length !== 0) || (categorized.length === 0 && searched.length !== 0)){
//document.getElementById("myTable").rows[id+1].style.backgroundColor = "#5898d8";

//     return;
//   }
//   else{
  
//  // console.log("NONE were empty");
//   for(var i=0; i<searched.length;i++){
//     for(var j =0; j<categorized.length;j++){
//       if(searched[i] === categorized[j]){
//        // console.log(searched[i] + "-----" + categorized[j]);
//         document.getElementById("myTable").rows[searched[i] + 1].style.backgroundColor = "blue";
//       }
//     }    
//   }
// }
}
function changeMode(){
  //console.log("change mode");
  document.documentElement.classList.toggle('dark-mode');
  document.querySelectorAll('.inverted').forEach((result) => {
    result.classList.toggle('invert');
  })

}
window.onload = function () {
   // book list container
  getJsonObject('data.json',
    function (data) {
      bookList = data; // store the book list into bookList
      for(var i=0; i< bookList.length;i++){
        bookList[i].searching = false;
        bookList[i].categorizing = false;
      }
       //console.log(bookList); // print it into console (developer tools)
      // console.log(bookList[0].authors); // print the first book object into console 
      // here you can call methods to laod or refresh the page 
      // loadBooks() or refreshPage()
     // currentTable = bookList;
      // for(var i=0;i<currentTable.length;i++){
      //   console.log(currentTable[i]);
      // }
     // console.log("onload");
      writeTable(bookList);
      //console.log(document.getElementById("myTable").rows[0].innerHTML);
      search();
      
      //limitcheck();


    },
    function (xhr) {
      console.error(xhr);
    }
  );
}
