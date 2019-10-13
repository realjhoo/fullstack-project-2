/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// =-=-=-=-=-=-=-=-=-= GLOBAL VARIABLES =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
let students = document.querySelectorAll(".cf");

// ========================================================================
// creates the search button and input field
function showSearch() {
  // set the markup
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

// ========================================================================
// determines num of buttons needed for a given array @ 10 items each
function howManyPages(array) {
  // divide and round up
  let buttons = Math.ceil(array.length / 10);

  // this returns the number of buttons we'll need
  return buttons;
}

// ========================================================================
// this function gins up the markup for the page buttons
function showPageButtons(numberOfButtons) {
  // initialize the variables
  let buildListMarkup = "";
  let listMarkup = "";
  let finalMarkup = "";

  for (let i = 1; i <= numberOfButtons; i++) {
    // build the <li> tags
    buildListMarkup = `
    <li>
      <a href="#">${i}</a>
    </li>`;
    // accumulate the markup
    listMarkup += buildListMarkup;
  }

  // create the final HTML and drop the <li> business in the middle
  finalMarkup = `
   <div class="pagination">
      <ul>
         ${listMarkup}
      </ul>
   </div>`;

  // insert the HTML in the right spot
  document
    .querySelector(".student-list")
    .insertAdjacentHTML("afterend", finalMarkup);
  // set the first button to active
  document.querySelector(".pagination ul li a").classList.add("active");
}

// ========================================================================
// this function is not yet GENERIC
// it shows the correct 10 pages
function showPage(pages, array) {
  // calculate which set of ten to show
  let display_first = pages * 10 - 10;
  let display_last = display_first + 11;

  // show the ones in the correct range
  // hide the ones outside of that range
  for (let i = 1; i < array.length; i++) {
    if (i > display_first && i < display_last) {
      students[i].style.display = "list-item";
    } else {
      students[i].style.display = "none";
    }
  }
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function buttonClick() {
  // listen for clicks
  document.addEventListener("click", event => {
    // if an anchor tag is clicked
    // send the showPage function the button that was clicked
    if (event.target.tagName === "A") {
      showPage(event.target.innerText, students);
      // turn off all active class
      // then turn it back on for the button
      // that was clicked
      a = document.querySelectorAll("a");
      for (let i = 0; i < a.length; i++) {
        a[i].classList.remove("active");
        event.target.classList.add("active");
      }
    }
  });
}

// ========================================================================
function colorCode() {
  // this temporary function color codes the names so you can see
  // that you have selected the correct ten
  //testing only
  // remove from production code
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

// ========================================================================
function searchListen() {
  // SEARCH BOX LISTENER
  let button = document.getElementsByTagName("button");
  let input = document.getElementsByTagName("input");

  button[0].addEventListener("click", event => {
    doSearch();
  });

  // ADD LIVE SEARCH
  input[0].addEventListener("keypress", event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      doSearch();
    }
  });
}

// ======================================================================
function doSearch() {
  let cleanArray = [];
  let nameArray = [];
  let names = document.querySelectorAll("h3"); // student names are on <h3>
  let input = document.querySelector("input");

  // this is what is in the input box
  let searchString = input.value;

  for (let i = 0; i < names.length; i++) {
    // extract the names for search
    // i wonder... let names = document.querySelectorAll("h3").innerText;
    // would that simplify?
    nameArray[i] = names[i].innerText; // extract the text only

    let isIn = nameArray[i].includes(searchString);

    // if the string is in there, show, otherwise hide
    if (isIn) {
      // extract clean array
      cleanArray.push(nameArray[i]);

      names[i].parentElement.parentElement.style.display = "block";
      names[i].parentElement.parentElement.style.borderBottom =
        "1px solid #eaeaea;";
    } else {
      names[i].parentElement.parentElement.style.display = "none";
      names[i].parentElement.parentElement.style.borderBottom = "none";
    }
  }

  // TODO remove old buttons
  // make the new button work for cleanArray

  // find out how many buttons I need
  let numberOfButtons = howManyPages(cleanArray);
  // add the desired number of buttons to the page
  showPageButtons(numberOfButtons);
  // divvy up the list across pages, 10 items each
  showPage(1, cleanArray);
}

// ========================================================================
//  Place all the function calls in one place. I just like it like that
function main() {
  let numberOfButtons = howManyPages(students);

  showSearch();
  showPage(1, students); // start up page = 1. Could be a variable I guess
  showPageButtons(numberOfButtons);
  buttonClick();
  searchListen();

  // ++++++++++++++++ FOR DEBUG ONLY - TEMPORARY +++++++
  colorCode(); // remove before submission
  //+++++++++++++++++++++++++++++++++++++++++++++++
}

// ========================================================================
//                     ========== BEGIN HERE ==========
main();

/**
 * In the search, we are searching on ".student-details h3"
 * loop thru, hide everything that doesnt contain the search string
 * show everything that does
 * on type, so its a live search
 *
 * re-run howManyPages... but only count the visible
 *
 * Display a lovely error message on DOM if no results come back
 */
