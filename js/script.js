/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// GLOBAL VARS
// =======================================================================
const students = document.querySelectorAll(".student-item");
const startPage = 1;
const numberOfPages = 10;
let cleanStudentNames = [];

// =======================================================================
function colorCode() {
  // DEBUGGING ONLY
  for (let i = 0; i < students.length; i++) {
    if (i < 10) {
      students[i].style.backgroundColor = "darkred";
    } else if (i < 20) {
      students[i].style.backgroundColor = "darkblue";
    } else if (i < 30) {
      students[i].style.backgroundColor = "pink";
    } else if (i < 40) {
      students[i].style.backgroundColor = "orange";
    } else if (i < 50) {
      students[i].style.backgroundColor = "purple";
    } else if (i < 60) {
      students[i].style.backgroundColor = "darkgreen";
    }
  }
}

// =======================================================================
function createSearchButtons() {
  // gin up the markup
  const buttonMarkup = `<div class="student-search">
  <input placeholder="Search for students...">
      <button>Search</button>
      </div>`;

  // insert in DOM
  document.querySelector(".cf h2").insertAdjacentHTML("afterend", buttonMarkup);
}

// ========================================================================
function howManyPages(arrayLength) {
  // divide the number of students by 10 and return the result
  let buttons = Math.ceil(arrayLength / numberOfPages);
  return buttons;
}

// ========================================================================
function createPageButtons(buttons) {
  let liMarkup = "";

  // gin up the <li> items
  for (let i = 1; i <= buttons; i++) {
    let buildLiMarkup = `
      <li>
         <a href="#">${i}</a>
      </li>`;
    liMarkup += buildLiMarkup;
  }

  // drop the <li> items into the HTML
  const finalMarkup = `
  <div class="pagination">
    <ul>
      ${liMarkup}
    </ul>
  </div>`;

  // insert in the DOM and set the active button
  document
    .querySelector(".student-list")
    .insertAdjacentHTML("afterend", finalMarkup);

  // if there is no <a>, there were no results, so show error msg
  let aTagExists = document.querySelector(".pagination ul li a");
  if (aTagExists) {
    document.querySelector(".pagination ul li a").classList.add("active");
  } else {
    showErrorMsg();
  }
}

// ========================================================================
function pageButtonListener() {
  // EVENT LISTENER for Page Buttons
  document.addEventListener("click", event => {
    if (event.target.tagName === "A") {
      let isSearch = document.querySelector(".search");

      // paginate with correct array - searched or unsearched
      if (isSearch) {
        paginate(event.target.innerText, cleanStudentNames); // <-- search array
      } else {
        paginate(event.target.innerText, students); // <-- not search array
      }

      // set .actice for clicked button
      a = document.querySelectorAll("a");
      for (let i = 0; i < a.length; i++) {
        a[i].classList.remove("active");
        event.target.classList.add("active");
      }
    }
  });
}

// ========================================================================
function paginate(pageToShow, nodelist) {
  // break node list into 10s and show the selected page
  let displayFirst = pageToShow * numberOfPages - numberOfPages;
  let displayLast = displayFirst + numberOfPages;

  // loop over - show the desired 10, hide the rest
  for (let i = 0; i < nodelist.length; i++) {
    if (i >= displayFirst && i < displayLast) {
      nodelist[i].style.display = "";
    } else {
      nodelist[i].style.display = "none";
    }
  }
}

// ========================================================================
function searchButtonListener() {
  // EVENT LISTENER for Search Button
  const searchButton = document.getElementsByTagName("button");

  searchButton[0].addEventListener("click", event => {
    searchNames();
  });
}

// ========================================================================
function searchInputListener() {
  // EVENT LISTENER for Search Input
  const searchInput = document.getElementsByTagName("input");

  // ENTER activates search
  searchInput[0].addEventListener("keypress", event => {
    if (event.keyCode === 13) {
      searchNames();
    }
  });
}

// ========================================================================
function searchNames() {
  let studentNames = []; // <-- holds innertext of names
  let searchStringIsInStudentNames;

  let h3Names = document.querySelectorAll("h3"); // <-- holds names in html
  let searchString = document.querySelector("input").value.toLowerCase();
  let ctr = 0; // <-- counter variable
  cleanStudentNames = []; // <-- holds the search array

  // hide all list items - extract text and compare - push to new array
  for (let i = 0; i < h3Names.length; i++) {
    students[i].style.display = "none";
    studentNames[i] = h3Names[i].innerText;
    searchStringIsInStudentNames = studentNames[i].includes(searchString);

    if (searchStringIsInStudentNames) {
      cleanStudentNames.push(students[i]);
      ctr++; // use ctr to avoid null entries in new array
    }
  }

  // replace page buttons
  removePageButtons();
  let numberOfButtons = howManyPages(cleanStudentNames.length);
  createPageButtons(numberOfButtons);

  // if there are search results, hide error message
  if (cleanStudentNames.length !== 0) {
    hideErrorMsg();
  }

  // logic to control linkage between page buttons and student arrays
  // if there is an active search, buttons get .search
  // otherwise, remove .search
  let searchBtns = document.querySelectorAll(".pagination ul li a");
  if (searchString === "") {
    for (let i = 0; i < searchBtns.length; i++) {
      searchBtns[i].classList.remove("search");
    }
  } else {
    for (let i = 0; i < searchBtns.length; i++) {
      searchBtns[i].classList.add("search");
    }
  }

  paginate(startPage, cleanStudentNames);
}

// ========================================================================
function removePageButtons() {
  // destroy page buttons so they dont accumulate
  const removeButtons = document.querySelector(".pagination");
  removeButtons.parentNode.removeChild(removeButtons);
}

// ========================================================================
function showErrorMsg() {
  // display the error <div>
  document.querySelector(".error").style.display = "block";
}

// ========================================================================
function hideErrorMsg() {
  //hide the error <div>
  document.querySelector(".error").style.display = "none";
}

// ========================================================================
function createErrorMsg() {
  // create error <div> and insert @ startup -  set display none

  const errorMarkup = `<div class="error">
   <p>After an exhaustive search, using alot of valuable computer resources,</p>
   <p>nothing could be found.</p>
   <p>We even asked Siri.</p> 
   <p>Sorry about that.</p>
   <br>
   <p>Maybe try a different search?</p>
      </div>`;

  document
    .querySelector(".student-list")
    .insertAdjacentHTML("afterend", errorMarkup);

  const error = document.querySelector(".error");
  // style the error msg programatically
  error.style.color = "red";
  error.style.fontSize = "2rem";
  error.style.textAlign = "center";
  error.style.display = "none";
  error.style.border = "2px solid red";
  error.style.padding = "7px";
}

// ========================================================================
function main() {
  // colorCode(); // TEMPORARY to observe list behavior
  createSearchButtons();
  let numberOfButtons = howManyPages(students.length);
  createPageButtons(numberOfButtons);
  pageButtonListener();
  paginate(startPage, students);
  searchButtonListener();
  searchInputListener();
  createErrorMsg();
}

// ========================================================================
main();
