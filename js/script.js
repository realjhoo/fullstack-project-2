/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

// =-=-=-=-=-=-=-=-=-= GLOBAL VARIABLES =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
let students = document.querySelectorAll(".cf");

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function howManyPages() {
  // determine how many buttons we need by dividing and rounding up
  let buttons = Math.ceil(students.length / 10);
  //   console.log(students.length);
  //   console.log(buttons);

  // this returns the number of buttons we'll need
  return buttons;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function showPageButtons(numberOfButtons) {
  // initialize the variables
  let finalMarkup = "";
  let listMarkup = "";
  let paginationMarkup = "";

  for (let i = 1; i <= numberOfButtons; i++) {
    // build the <li> tags
    listMarkup = `
    <li>
      <a href="#">${i}</a>
    </li>`;
    // accumulate the markup
    paginationMarkup += listMarkup;
  }

  // create the final HTML and drop the <li> business in the middle
  finalMarkup = `
   <div class="pagination">
      <ul>
         ${paginationMarkup}
      </ul>
   </div>`;

  // insertthe HTML in the right spot
  document
    .querySelector(".student-list")
    .insertAdjacentHTML("afterend", finalMarkup);
  // set the first button to active
  document.querySelector(".pagination ul li a").classList.add("active");
}

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

  // show the ones in the correct range
  // hide the ones outside of that range
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
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function buttonClick() {
  // listen for clicks
  document.addEventListener("click", event => {
    // if an anchor tag is clicked
    // send the showPage function the button that was clicked
    if (event.target.tagName == "A") {
      showPage(event.target.innerText);
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

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//  Place all the function calls in one place. I just like it like that
function main() {
  let numberOfButtons = howManyPages();

  showSearch();
  showPage(1); // start up page = 1. Could be a variable I guess
  showPageButtons(numberOfButtons);
  buttonClick();

  // ++++++++++++++++ FOR DEBUG ONLY - TEMPORARY +++++++
  //   colorCode(); // remove before submission
  //+++++++++++++++++++++++++++++++++++++++++++++++
}
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// ========== BEGIN HERE ==========
main();
