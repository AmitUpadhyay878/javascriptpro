let submit = document.getElementById("submit");
let update = document.getElementById("update");

// Filter Table Data By Name

var searchbox_2 = document.getElementById("myInput");
searchbox_2.addEventListener("keyup", function () {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("dataT");
  let tablebody = document.getElementById("output");
  tr = tablebody.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    var rowContainsFilter = false;
    for (let j = 0; j < td.length; j++) {
      if (td[j]) {
        txtValue =
          td[j].textContent.trim().toUpperCase().replace(/ /g, "") ||
          td[j].innerText.trim().toUpperCase().replace(/ /g, "");
        if (txtValue.toUpperCase().replace(/ /g, "").indexOf(filter) > -1) {
          rowContainsFilter = true;
          continue;
        }
      }
      if (txtValue.toUpperCase().replace(/ /g, "").indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }

    if (!rowContainsFilter) {
      tr[i].style.display = "none";
    } else {
      tr[i].style.display = "";
    }
  }
});

// Filter Active/DeActive User using DropDown
function datafilter(e) {
  var input, filter, table, tr, td, i, txtValue;
  var holdVal = e.target.value;
  input = document.getElementById("datafilter");

  // console.log(holdVal);
  // filter = input.value.toUpperCase();
  table = document.getElementById("dataT");
  let tablebody = document.getElementById("output");
  tr = tablebody.getElementsByTagName("tr");

  var output = document.getElementById("output");

  output.innerHTML == "";
  let localData = JSON.parse(localStorage.getItem("formData")) || [];

  let hhhh = localData.filter((items) => {
    console.log(items.Status == holdVal);
    return items.Status == holdVal;
  });
  let datahhhh = hhhh.map((data) => {
    return `
                             <tr class="daaaa">
                          <td><input type="checkbox" id="AllCheckbox" class="tableCheck" value=${data.id} /></td>
                          <td>${data.fname}</td>
                          <td>${data.lname}</td>
                          <td>${data.email}</td>
                          <td>${data.hobby} </td>
                          <td>${data.Status}</td>
                          <td>
                          <button class="btn btn-warning " onClick='EditRegister(${data.id})'>Edit</button>
                          </td>
                          <td>
                          <button class="btn btn-danger"  onClick='DeleteRegister(${data.id})'>Delete</button>
                          </td>
                          </td>
                          </tr>
                             `;
  });
  output.innerHTML = datahhhh.join("");

  // console.log(e.target.textContent);

  // Loop through all table rows, and hide those who don't match the search query
  // for (i = 0; i < tr.length; i++) {
  //   td = tr[i].getElementsByTagName("td")[5];
  //   if (td) {
  //     txtValue = td.textContent || td.innerText;
  //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //       tr[i].style.display = "";
  //     } else {
  //       tr[i].style.display = "none";
  //     }
  //   }
  // }
}

function ResetAtt() {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("hobby").checked = false;
}

function toggleCheck() {
  let checkbox = document.querySelectorAll('input[class="tableCheck"]');
  let allSelectdata = document.getElementById("allSelect");
  // if(allSelectdata.checked == true){
  checkbox.forEach((item) => {
    if (allSelectdata.checked == true) {
      item.checked = true;
    } else {
      item.checked = false;
    }
  });
}

function clonedata() {
  let alldatas = JSON.parse(localStorage.getItem("formData"));
  let checkbox = document.querySelectorAll('input[class="tableCheck"]:checked');

  let values = [];

  checkbox.forEach((check) => {
    values.push(check.value);
  });
  console.log(values);

  let arr = alldatas.filter((item) => values.includes(item.id));
  localStorage.setItem("CloneData", JSON.stringify(arr));
}

let alldatas = JSON.parse(localStorage.getItem("formData"));
function deleteAll() {
  // let alldatas = JSON.parse(localStorage.getItem("formData"));
  let checkbox = document.querySelectorAll('input[class="tableCheck"]:checked');

  let values = [];

  checkbox.forEach((check) => {
    values.push(check.value);
  });
  //console.log(values);
  let arr = alldatas.filter((item) => !values.includes(item.id));
  localStorage.setItem("formData", JSON.stringify(arr));
  displayData();
}

const signUp = (e) => {
  e.preventDefault();
  let formData = JSON.parse(localStorage.getItem("formData")) || [];

  var hbox = document.querySelectorAll("input[type='checkbox']:checked");

  let hobbArr = [];

  for (let i = 0; i < hbox.length; i++) {
    hobbArr.push(hbox[i].value);
    if (hbox[i].checked == true) {
      document.getElementsByName("hobby").checked = true;
    }
  }

  formData.push({
    id: new Date().getTime().toString(),
    fname: document.getElementById("fname0").value,
    lname: document.getElementById("lname0").value,
    email: document.getElementById("email0").value,
    Status: "offline",
    hobby: hobbArr,
  });

  localStorage.setItem("formData", JSON.stringify(formData));
  displayData();
  ResetAtt();
};

function EditRegister(id) {
  let dell = document.querySelectorAll(`input[type="checkbox"]`);
  let newd = [...dell];
  newd.forEach((e) => e.removeAttribute("checked"));

  const local = JSON.parse(localStorage.getItem("formData"));
  local.find((data) => {
    if (data.id == id) {
      document.getElementById("hidden").value = data.id;
      document.getElementById("fname0").value = data.fname;
      document.getElementById("lname0").value = data.lname;
      document.getElementById("email0").value = data.email;

      let hobbArr = data.hobby;
      hobbArr.forEach((e) =>
        document
          .querySelector(`input[value=${e}]`)
          .setAttribute("checked", "checked")
      );
    } else {
    }
  });
  update.style.display = "block";
  submit.style.display = "none";
}
// localStorage.setItem("RecycleData",JSON.stringify([]))
let deData = JSON.parse(localStorage.getItem("RecycleData"));
// let alldatas = JSON.parse(localStorage.getItem('formData'));

//Delete Data By Id And Send To Recycle localStorage Table
function DeleteRegister(id) {
  const local = JSON.parse(localStorage.getItem("formData")) || [];

  const ll = local.filter((e) => {
    if (e.id == id) {
      deData.push(e);
    }
    return e.id != id;
  });
  // let arr = local.filter((item) => {
  //   return !ll.includes(item.id);
  // });
  //console.log(arr);
  // deData.push(...arr);
  localStorage.setItem("formData", JSON.stringify(ll));
  localStorage.setItem("RecycleData", JSON.stringify(deData));
  // displayData();
  RecycleDatas();
  window.location.reload();
}

function DeleteRecycleData(id) {
  const local = JSON.parse(localStorage.getItem("RecycleData")) || [];
  const ll = local.filter((e) => {
    return e.id != id;
  });
  localStorage.setItem("RecycleData", JSON.stringify(ll));
  displayData();
  RecycleDatas();
  window.location.reload();
}

//Restore Data From Recycle LocalStorage table To Main Table Start
function RestoreData(id) {
  let RecycleData = JSON.parse(localStorage.getItem("RecycleData"));
  let dData = JSON.parse(localStorage.getItem("formData"));

  let arrr = [];
  const recy = RecycleData.filter((item) => {
    if (item.id == id) {
      arrr.push(item);
    }

    return item.id != id;
  });

  let dd = RecycleData.filter((ff) => {
    return arrr.includes(ff);
  });
  //  dData.push(...dd)
  // localStorage.setItem("formData",JSON.stringify(dData))

  if (dData.indexOf(dd) == -1) {
    dData.push(...dd);
    window.localStorage.setItem("formData", JSON.stringify(dData));

    localStorage.setItem("RecycleData", JSON.stringify(recy));

    displayData();
    RecycleDatas();
    window.location.reload();
  }
}

//Restore Data From Recycle LocalStorage table To Main Table End

// Update Table Data Functionality Start
function updateData() {
  const localVar = document.getElementById("hidden").value;
  var hbox = document.querySelectorAll("input[type='checkbox']:checked");
  let hobbArr = [];

  for (let i = 0; i < hbox.length; i++) {
    hobbArr.push(hbox[i].value);
    if (hobbArr[i].checked == true) {
      document.getElementsByName("hobby").checked = true;
    }
  }

  const local = JSON.parse(localStorage.getItem("formData"));
  const localdata = local.map((e) => {
    if (e.id == localVar) {
      console.log(e);
      return {
        ...e,
        fname: document.getElementById("fname0").value,
        lname: document.getElementById("lname0").value,
        email: document.getElementById("email0").value,
        hobby: hobbArr,
      };
    }

    return e;
  });
  localStorage.setItem("formData", JSON.stringify(localdata));

  displayData();
}
// Update Table Data Functionality End

//Display Data Function
function displayData() {
  if (localStorage.getItem("formData") != "") {
    var output = document.getElementById("output");

    output.innerHTML == "";
    let localData = JSON.parse(localStorage.getItem("formData")) || [];

    let abcd = localData.map((data) => {
      return `
                               <tr class="daaaa">
                            <td><input type="checkbox" id="AllCheckbox" class="tableCheck" value=${data.id} /></td>
                            <td>${data.fname}</td>
                            <td>${data.lname}</td>
                            <td>${data.email}</td>
                            <td>${data.hobby} </td>
                            <td>${data.Status}</td>
                            <td>
                            <button class="btn btn-warning " onClick='EditRegister(${data.id})'>Edit</button>
                            </td>
                            <td>
                            <button class="btn btn-danger"  onClick='DeleteRegister(${data.id})'>Delete</button>
                            </td>
                            </td>
                            </tr>
                               `;
    });
    output.innerHTML = abcd.join("");
  }
}

// function displayData() {
//   var container = $("#pagination");
//   var options = {
//     dataSource: JSON.parse(localStorage.getItem("formData")),
//     pageSize: 5,
//     showGoInput: true,
//     showGoButton: true,
//     callback: function (response, pagination) {
//       window.console && console.log(response, pagination);

//       var dataHtml = "";

//       $.each(response, function (index, item) {
//         console.log(item);
//         dataHtml +=
//           "<tr><td>" +
//           item.id +
//           "</td><td>" +
//           item.fname +
//           "</td><td>" +
//           item.email +
//           "</td><td>" +
//           item.lname +
//           "</td><td>" +
//           item.hobby +
//           "</td><td>" +
//           item.Status +
//           '<td><a href="#" class="btn btn-danger" onclick="DeleteRegister(' +
//           item.id +
//           ')">delete</a></td></tr>';
//       });
//       dataHtml += "";
//       $("#output").html(dataHtml);
//     },
//   };

//   //$.pagination(container, options);
//   container.addHook("beforeInit", function () {
//     // window.console && console.log('beforeInit...');
//   });
//   container.pagination(options);

//   container.addHook("beforePageOnClick", function () {
//     // window.console && console.log('beforePageOnClick...');
//     //return false
//   });
// }

function RecycleDatas() {
  var RecycleData = document.getElementById("RecycleData");

  if (JSON.parse(localStorage.getItem("RecycleData")) == []) {
    localStorage.setItem("RecycleData", JSON.stringify([]));
  }

  RecycleData.innerHTML == "";
  let redata = JSON.parse(localStorage.getItem("RecycleData"));

  let abcd = redata.map((data) => {
    return `
                               <tr class="daaaa">

                            <td>${data.fname}</td>
                            <td>${data.lname}</td>
                            <td>${data.email}</td>
                            <td>${data.hobby} </td>
                            <td>
                             <button class="btn btn-success badge py-2 m-2" onClick='RestoreData(${data.id})'>Restore</button>
                             <button class="btn btn-danger badge py-2 m-2" onClick='DeleteRecycleData(${data.id})'>Remove Ever</button>
                            </td>
                            </tr>
                               `;
  });
  RecycleData.innerHTML = abcd.join("");
}

// Fetch Method with Promise OR   async/await
function html(data) {
  ggg.innerHTML += ` <tr>
                 <td>${data.name}</td>
                 <td>${data.email}</td>
                 <td>${data.username}</td>
                 <td>${data.address.city}</td>
              </tr>
             `;
}
let ggg = document.getElementById("ffffff");

let fun = fetch("https://jsonplaceholder.typicode.com/users")
  .then((real) => {
    return real.json();
  })
  .then((e) => {
    setTimeout(() => {
      let game = e.map((x) => {
        return html(x);
      });
    }, 3000);

    // console.log(game);
    //ggg.innerHTML = game;
  })
  .catch((er) => {
    console.log(er);
  });

// async function usingAsyncAwait() {
//   const GetData = await fetch("https://jsonplaceholder.typicode.com/users/");

//   const FinalData = await GetData.json();
//   FinalData.map((k) => {
//     html(k);
//   });
// }
// usingAsyncAwait();

displayData();
RecycleDatas();
