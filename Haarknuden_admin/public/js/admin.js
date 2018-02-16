document.addEventListener("DOMContentLoaded", function(event) {

//gem aendringer start start
document.querySelectorAll(".gem").forEach(function(gemElement){
  gemElement.addEventListener("click", function(event) {
    event.preventDefault();
    let select = this.parentElement.querySelector(".mainDropdown");
    let modtaget_data = hentData(this);
    modtaget_data.id = select.options[select.selectedIndex].value;
    fetch(`http://localhost:3000/${gemElement.dataset.route}`, {
      "headers":{"Content-Type":"application/json"},
      "method": "POST",
      "body": JSON.stringify(modtaget_data)
    }).then(function(response) {  }).catch(err=>{ console.log(err); console.log(response); })
  });
});
//gem aendringer end

//slet start
  // document.querySelectorAll(".slet").forEach(function(sletElement){
  //   sletElement.addEventListener("click", function(event) {
  //     event.preventDefault();
  //     let id = this.parentElement.querySelector(".mainDropdown").activeSelect.options[activeSelect.selectedIndex].value;
  //     fetch(`http://localhost:3000/delete/${id}`, {
  //       "headers":{"Content-Type":"application/json"},
  //       "method": "POST",
  //       "body": JSON.stringify({db_table: db_table, id:id})
  //     })
  //     .then(function(response) {
  //       return response.json();
  //     })
  //     .then(function(data) {
  //       console.log(data);
  //       activeSelect.parentElement.querySelectorAll("input[type=text]").forEach(function(element) {
  //         element.value = data[0][element.name];
  //       });
  //     }).catch(err=>{ console.log(err); console.log(response); })
  //   });
  // });
//slet end

});

function sletFromDb(e, db_table, button) {
  e.preventDefault();
  let activeSelect = button.parentElement.querySelector(".mainDropdown");
  console.log(activeSelect);
  let id = activeSelect.options[activeSelect.selectedIndex].value;
  fetch(`http://localhost:3000/delete/${id}`, {
    "headers":{"Content-Type":"application/json"},
    "method": "DELETE",
    "body": JSON.stringify({db_table: db_table, id:id})
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  }).catch(err=>{ console.log(err); console.log(response); })
}

function hentData(select) {
  let table = select.parentElement.querySelectorAll("input[type=text]");
  let new_data = {};
  table.forEach(function(element) {
    new_data[element.name] = element.value;
  });
  return new_data;
}

function updateTable(activeSelect, db_table) {
  let id = activeSelect.options[activeSelect.selectedIndex].value;
  fetch("http://localhost:3000/getFormData", {
    "headers":{"Content-Type":"application/json"},
    "method": "POST",
    "body": JSON.stringify({db_table: db_table, id:id})
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    activeSelect.parentElement.querySelectorAll("input[type=text]").forEach(function(element) {
      element.value = data[0][element.name];
    });
  }).catch(err=>{ console.log(err); console.log(response); })
};
