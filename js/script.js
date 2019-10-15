/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// GLOBAL VARS
// =======================================================================
let students = document.querySelectorAll(".cf");
const startPage = 1;

// =======================================================================
function colorCode() {
  // DEBUGGING

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
  //   let buildLiMarkup = "";

  for (let i = 1; i <= buttons; i++) {
    let buildLiMarkup = `
      <li>
         <a href="#">${i}</a>
      </li>`;
    liMarkup += buildLiMarkup;
  }

  let finalMarkup = `
  <div class="pagination">
    <ul>
      ${liMarkup}
    </ul>
  </div>`;

  document
    .querySelector(".student-list")
    .insertAdjacentHTML("afterend", finalMarkup);

  document.querySelector(".pagination ul li a").classList.add("active");
}

// ========================================================================
function pageButtonListener() {
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
function paginate(numOfPages, array) {
  let displayFirst = numOfPages * 10 - 10;
  let displayLast = displayFirst + 11;

  for (i = 1; i < array.length; i++) {
    if (i > displayFirst && i < displayLast) {
      array[i].style.display = "list-item";
    } else {
      array[i].style.display = "none";
    }
  }
}

// ========================================================================
function searchButtonListener() {
  let searchButton = document.getElementsByTagName("button");

  searchButton[0].addEventListener("click", event => {
    searchNames();
  });
}

// ========================================================================
function searchInputListener() {
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

  for (i = 0; i < h3Names.length; i++) {
    studentNames[i] = h3Names[i].innerText;

    let searchStringIsInStudentNames = studentNames[i].includes(searchString);

    if (searchStringIsInStudentNames) {
      h3Names[i].parentElement.parentElement.style.display = "block";
      h3Names[i].parentElement.parentElement.style.borderBottom =
        "1px solid #eaeaea;";
      cleanStudentNames.push(studentNames[i]);
    } else {
      h3Names[i].parentElement.parentElement.style.display = "none";
      h3Names[i].parentElement.parentElement.style.borderBottom = "none";
    }
  }

  removePageButtons();
  let numberOfButtons = howManyPages(cleanStudentNames);
  createPageButtons(numberOfButtons);

  // this function needs to pass a Node List, not an Array!
  // can we walk the DOM and build a node list of visible block list items?
  // could convert the param to an integer, and pass the length, instead of
  // determining the length in paginate?? NO. the function needs the nodes
  // to calculate which list-items to show or hide
  //   paginate(startPage, cleanStudentNames);
}

// ========================================================================
function removePageButtons() {
  let removeButtons = document.querySelector(".pagination");
  removeButtons.parentNode.removeChild(removeButtons);
}

// ========================================================================
function main() {
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
