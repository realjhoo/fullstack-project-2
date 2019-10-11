/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
// =-=-=-=-=-=-=-=-=-= GLOBAL VARIABLES =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
let students = document.querySelectorAll(".cf");
// +++++++++++++++++++++++++++++++++++++++++
let temp_page = 5;

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function showSearch() {
  // set the markup for the search business
  let search_markup = `<input placeholder="Search for students...">
      <button>Search</button>`;

  //  create a div and give it a class name of student-search
  let search_div = document.createElement("div");
  search_div.classList.add("student-search");

  //   select the h2 inside class of cf, insert the new div and the markup
  // immediately following the h2
  document
    .querySelector(".cf h2")
    .insertAdjacentElement("afterend", search_div).innerHTML = search_markup;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function showPage(page) {
  // calculate which set of ten to show
  display_first = page * 10 - 10;
  display_last = display_first + 11;

  /***

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

  for (let i = 1; i < students.length; i++) {
    if (i > display_first && i < display_last) {
      students[i].style.display = "list-item";
    } else {
      students[i].style.display = "none";
    }
  }
}

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

// Remember to delete the comments that came with this file, and replace them with your own code comments.
function colorCode() {
  // this temporary function color codes the names so you can see
  // that you have selected the correct ten
  //testing only
  // remove from production code
  for (let i = 1; i < students.length; i++) {
    if (i > 0 && i < 11) {
      students[i].style.backgroundColor = "red";
    } else if (i > 10 && i < 21) {
      students[i].style.backgroundColor = "blue";
    } else if (i > 20 && i < 31) {
      students[i].style.backgroundColor = "pink";
    } else if (i > 30 && i < 41) {
      students[i].style.backgroundColor = "orange";
    } else if (i > 40 && i < 51) {
      students[i].style.backgroundColor = "purple";
    } else if (i > 50 && i < 60) {
      students[i].style.backgroundColor = "green";
    }
  }
}
// +_+_+_+_+_+_+_+_+_+_+_+_+_+ TESTING +_+_+_+_+_+_+_+_+_+_=
showSearch();
showPage(temp_page); // temporary hard code var
colorCode();

/* 
Build and insert generated HTML into DOM
When clicked Pass innerText to pagination function (showPage)

*/
