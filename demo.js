function createTable() {
  // Create table elements
  var table = document.createElement("table");
  var tbody = document.createElement("tbody");
  var thead = document.createElement("thead");

  table.setAttribute("id", "newTable");

  // Check if the table already exists
  newTable = document.getElementById("newTable");
  if (newTable != null) {
    // If it does, remove it
    newTable.parentNode.removeChild(newTable);
  }

  // Add table headers
  thead.appendChild(createHeader(["Name", "Email", "Level"]));

  var numStudents = document.getElementById("seats").value;
  for (var i = 0; i < numStudents; i++) {
    // Add table rows, with the second argument representing the grade level
    tbody.appendChild(createRow());
  }

  // Append the table body and headers to the table
  table.appendChild(thead);
  table.appendChild(tbody);
  document.getElementById("table").appendChild(table);
  document.getElementById("save").style.display = "block";
}

// Function to create the table header
function createHeader(data) {
  var row = document.createElement("tr");
  for (var i = 0; i < data.length; i++) {
    var cell = document.createElement("th");
    var cellText = document.createTextNode(data[i]);
    cell.appendChild(cellText);
    row.appendChild(cell);
  }
  return row;
}

// Creates an empty row for the table
function createRow() {
  var row = document.createElement("tr");

  // Create the first two columns
  for (var i = 0; i < 3; i++) {
    var cell = document.createElement("td");
    if(i == 0){
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("placeholder", "Name");
      input.setAttribute("id", "name");
      input.setAttribute("required", "true");
      cell.appendChild(input);
    }

    // Create the email input for the second column
    if(i == 1){
      var email = document.createElement("input");
      email.setAttribute("type", "email");
      email.setAttribute("id", "email");
      email.setAttribute("placeholder", "Email");
      email.setAttribute("required", "true");
      cell.appendChild(email);
    }

    // Add the grade selector to the third column
    if(i == 2)
      cell.appendChild(
        createSelector([
          "First-year", "Second-year", "Third-year", "Fourth-year"
        ])
      );
    row.appendChild(cell);
  }

  return row;
}

// Creates the selector for grade level
function createSelector(data){
  var selector = document.createElement("select");
  for (var i = 0; i < data.length; i++) {
    var option = document.createElement("option");
    var optionText = document.createTextNode(data[i]);
    option.appendChild(optionText);
    selector.appendChild(option);
  }
  return selector;
}

// Checks the validity of all the inputs
function checkValidity(){
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++)
    if(!inputs[i].checkValidity())
      return false;
  return true;
}

// Toggles whether or not the inputs can be edited
function saveTable(){
  if(document.getElementById("savebutton").innerHTML == "Edit Table"){
      document.querySelectorAll("td > input").forEach(input => {
        input.readOnly = false;
      });
      document.getElementById("savelabel").innerHTML = "Done editing?";
      document.getElementById("savebutton").innerHTML = "Save Table";
  } else {
    if(checkValidity()){
      document.querySelectorAll("td > input").forEach(input => {
        input.readOnly = true;
      });
      document.getElementById("savelabel").innerHTML = "Need to make a change?";
      document.getElementById("savebutton").innerHTML = "Edit Table";
    } else
      alert("Please fill out all the fields and ensure they are valid");
  }
}
