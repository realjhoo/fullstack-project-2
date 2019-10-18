/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// GLOBAL VARS
// =======================================================================
const students = document.querySelectorAll(".cf");

const startPage = 1;

// =======================================================================
function colorCode() {
  // DEBUGGING ONLY

  for (let i = 1; i < students.length; i++) {
    if (i > 0 && i < 11) {
      students[i].style.backgroundColor = "darkred";
    } else if (i > 10 && i < 21) {
      students[i].style.backgroundColor = "darkblue";
    } else if (i > 20 && i < 31) {
      students[i].style.backgroundColor = "pink";
    } else if (i > 30 && i < 41) {
      students[i].style.backgroundColor = "orange";
    } else if (i > 40 && i < 51) {
      students[i].style.backgroundColor = "purple";
    } else if (i > 50 && i < 60) {
      students[i].style.backgroundColor = "darkgreen";
    }
  }
}

// =======================================================================
function createSearchButtons() {
  // gin up the markup
  let buttonMarkup = `<div class="student-search">
  <input placeholder="Search for students...">
      <button>Search</button>
      </div>`;

  // insert in DOM
  document.querySelector(".cf h2").insertAdjacentHTML("afterend", buttonMarkup);
}

// ========================================================================
function howManyPages(array) {
  // divide the number of students by 10 and return the result
  let buttons = Math.ceil(array.length / 10);
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
  let finalMarkup = `
  <div class="pagination">
    <ul>
      ${liMarkup}
    </ul>
  </div>`;

  // insert in the DOM and set the active button
  document
    .querySelector(".student-list")
    .insertAdjacentHTML("afterend", finalMarkup);

  document.querySelector(".pagination ul li a").classList.add("active");
}

// ========================================================================
function pageButtonListener() {
  // EVENT LISTENER for Page Buttons
  document.addEventListener("click", event => {
    if (event.target.tagName === "A") {
      // paginate!
      paginate(event.target.innerText, students);
      // remove all .active then add for clicked button
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
  let displayFirst = pageToShow * 10 - 10;
  let displayLast = displayFirst + 11;

  nodelist[0].style.display = ""; // force display of Q guy????

  // loop over - show the desired 10, hide the rest
  for (let i = 1; i < nodelist.length; i++) {
    if (i > displayFirst && i < displayLast) {
      nodelist[i].style.display = "list-item";
    } else {
      nodelist[i].style.display = "none";
    }
  }
}

// ========================================================================
function searchButtonListener() {
  // EVENT LISTENER for Search Button
  let searchButton = document.getElementsByTagName("button");

  searchButton[0].addEventListener("click", event => {
    searchNames();
  });
}

// ========================================================================
function searchInputListener() {
  // EVENT LISTENER for Search Input
  // TODO: Live Search
  let searchInput = document.getElementsByTagName("input");

  searchInput[0].addEventListener("keypress", event => {
    if (event.keyCode === 13) {
      searchNames();
    }
  });
}

// ========================================================================
function searchNames() {
  let studentNames = [];
  let cleanStudentNames = [];
  let h3Names = document.querySelectorAll("h3");
  let searchString = document.querySelector("input").value;
  let newArray = [];
  var ctr = 0;

  for (i = 0; i < h3Names.length; i++) {
    // hide the list
    //add the 1 because 0 is the title element for some reason
    students[i + 1].style.display = "none";

    //extract the text names to compare
    studentNames[i] = h3Names[i].innerText;

    // compare the names
    let searchStringIsInStudentNames = studentNames[i].includes(searchString);
    console.log(searchStringIsInStudentNames);

    // if the search is in there, store in new array
    if (searchStringIsInStudentNames) {
      // craete clean array
      newArray.push(students[i + 1]);
      ctr++; // use ctr to avoid null entries
      console.log(newArray);

      /*
      If the search text has a match, the <li> that the h3 lives in
      should be added to an array, so it can be pushed back into DOM
      The currently displayed list should be set to display none
      The new list needs a class so it can be easily removed
      and the original list returned
      How to build HTML node list??? 
      */
      cleanStudentNames.push(studentNames[i]);
    }
  }
  // *********** * * * ** * * * * ** * * * *
  // PASS THE ARRAY NAME TO THE PAGE BUTTONS SO
  // THEY CAN SHOW THE COTRECT ARRAY LINE 87!!!!!!!
  removePageButtons();
  let numberOfButtons = howManyPages(cleanStudentNames);
  createPageButtons(numberOfButtons);
  paginate(startPage, newArray);
}

// ========================================================================
function OLDsearchNames() {
  let studentNames = [];
  let displayStudentNames = [];

  let searchString = document.querySelector("input").value;
  let h3Names = document.querySelectorAll("h3");

  for (let i = 0; i < h3Names.length; i++) {
    studentNames[i] = h3Names[i].innerText;

    let searchStringIsInStudentNames = studentNames[i].includes(searchString);

    // compared to name list
    // if match is found
    // add that entire li to a new list
    // counter will cause null spots in new list.
    if (searchStringIsInStudentNames) {
      displayStudentNames.push(students[i]);
      // displaysturntnames is returning a useless object and not HTML markup
      // I need **MARKUP** to insert into the DOM
    }
  }

  console.log(displayStudentNames);
  // this will be a function ********************
  // THIS REMOVES ALL THE NAMES
  /*
  let e = document.querySelector(".student-list");
  let child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  */

  // add the list we created to the DOM

  // remove currennt display names
  // insert new list of display names into DOM
  // ---------- do I have to rebuild the HTML???
  // removePageButtons
  // calc the number of buttons now needed
  // create the new page buttons
  // call paginate
}

// ========================================================================
function removePageButtons() {
  // destroy page buttons so they dont accumulate
  let removeButtons = document.querySelector(".pagination");
  removeButtons.parentNode.removeChild(removeButtons);
}

// ========================================================================
function main() {
  //  function calls are kept here because I dont like loose code
  // rolling around outside of boxes
  colorCode();
  createSearchButtons();
  let numberOfButtons = howManyPages(students);
  createPageButtons(numberOfButtons);
  pageButtonListener();
  paginate(startPage, students);
  searchButtonListener();
  searchInputListener();
}

// ========================================================================
main();
