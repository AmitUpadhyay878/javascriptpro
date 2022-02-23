let submit = document.getElementById("submit");
let update = document.getElementById("update");

// Filter Table Data By Name
function myfilter(e) {
  console.log(e.target.value);
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("dataT");
  let tablebody = document.getElementById("output");
  tr = tablebody.getElementsByTagName("tr");
  console.log(e.target.textContent);

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// Filter Active/DeActive User using DropDown
function datafilter(e) {
  //  console.log(e.target.value);
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("datafilter");
  filter = input.value.toUpperCase();
  table = document.getElementById("dataT");
  let tablebody = document.getElementById("output");
  tr = tablebody.getElementsByTagName("tr");

  // console.log(e.target.textContent);

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[5];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
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

function deleteAll() {
  let alldatas = JSON.parse(localStorage.getItem("formData"));
  let checkbox = document.querySelectorAll('input[class="tableCheck"]:checked');

  let values = [];

  checkbox.forEach((check) => {
    values.push(check.value);
  });
  console.log(values);
  let arr = alldatas.filter((item) => values.includes(item.id));
  localStorage.setItem("formData", JSON.stringify(arr));
  displayData();
}

function EditRegister(id) {
  update.style.display = "block";
  submit.style.display = "none";
  document.getElementById("hidden").value = id;
  fetch(`http://localhost:3000/users/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let { fname, lname, email, password, Status } = data;
      document.getElementById("fname0").value = fname;
      document.getElementById("lname0").value = lname;
      document.getElementById("email0").value = email;
      document.getElementById("password0").value = password;
      document.getElementById("Status0").value = Status;
    });
}

//Delete Data By Id And Send To Recycle localStorage Table

async function DeleteRegister(id) {
  const gettingData = await fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
}

function DeleteRecycleData(id) {
  const local = JSON.parse(localStorage.getItem("RecycleData")) || [];
  const ll = local.filter((e) => {
    return e.id != id;
  });
  localStorage.setItem("RecycleData", JSON.stringify(ll));

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
  let idd = document.getElementById("hidden").value;
  let fname = document.getElementById("fname0").value;
  let lname = document.getElementById("lname0").value;
  let email = document.getElementById("email0").value;
  let password = document.getElementById("password0").value;

  fetch(`http://localhost:3000/users/${idd}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fname,
      lname,
      email,
      password,
      Status,
    }),
  });
}
// Update Table Data Functionality End

//Display Data Function
function displayData() {
  fetch("http://localhost:3000/users")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.map((dd) => {
        output.innerHTML += ` 
                                                     <tr class="daaaa">
                                                  <td><input type="checkbox" id="AllCheckbox" class="tableCheck" value=${dd.id} /></td>
                                                  <td>${dd.fname}</td>
                                                  <td>${dd.lname}</td>
                                                  <td>${dd.email}</td>
                                                  <td>${dd.password} </td> 
                                                  <td>${dd.Status}</td>                                                 
                                                  <td>
                                                  <button class="btn btn-warning " onClick='EditRegister(${dd.id})'>Edit</button>
                                                  </td>
                                                  <td>
                                                  <button class="btn btn-danger"  onClick='DeleteRegister(${dd.id})'>Delete</button>
                                                  </td>
                                                  </td>
                                                  </tr>
                                                     `;
      });
    });
}

function RecycleDatas() {
  var RecycleData = document.getElementById("RecycleData");

  if (JSON.parse(localStorage.getItem("RecycleData")) == []) {
    localStorage.setItem("RecycleData", JSON.stringify([]));
  }

  RecycleData.innerHTML == "";
  let redata = JSON.parse(localStorage.getItem("RecycleData"));

  let abcd = redata.map((data) => {
    RecycleData.innerHTML += ` 
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
  // RecycleData.innerHTML = abcd;
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

async function usingAsyncAwait() {
  const GetData = await fetch("https://jsonplaceholder.typicode.com/users/");

  const FinalData = await GetData.json();
  FinalData.map((k) => {
    html(k);
  });
}
usingAsyncAwait();
let i = 1;
function Addmore(e) {
  e.preventDefault();

  if (i < 10) {
    let v = document.getElementById("jkk");
    let div = document.createElement("div");
    let fname = document.createElement("input");
    fname.setAttribute("type", "text");
    fname.setAttribute("name", "fname");
    fname.setAttribute("id", `fname${i}`);
    fname.setAttribute("class", "form-control");
    fname.setAttribute("placeholder", "first name");
    let lname = document.createElement("input");
    lname.setAttribute("type", "text");
    lname.setAttribute("name", "lname");
    lname.setAttribute("id", `lname${i}`);
    lname.setAttribute("class", "form-control");
    lname.setAttribute("placeholder", "last name");
    let email = document.createElement("input");
    email.setAttribute("type", "email");
    email.setAttribute("name", "email");
    email.setAttribute("id", `email${i}`);
    email.setAttribute("class", "form-control");
    email.setAttribute("placeholder", "Email");
    let password = document.createElement("input");
    password.setAttribute("type", "password");
    password.setAttribute("name", "password");
    password.setAttribute("id", `password${i}`);
    password.setAttribute("class", "form-control");
    password.setAttribute("placeholder", "password");

    let button = document.createElement("button");
    button.setAttribute("onclick", "additem");
    div.setAttribute("class", "maidiv");
    div.append(fname, lname, email, password);
    console.log(div);
    v.appendChild(div);
    i++;
  } else {
    alert("limit cross");
  }
}

displayData();
RecycleDatas();

const signUp = (e) => {
  e.preventDefault();
  let maidiv = document.querySelectorAll(".maidiv");
  console.log(maidiv.length);
  for (let i = 0; i < maidiv.length; i++) {
    let fname = document.getElementById(`fname${i}`).value;
    let lname = document.getElementById(`lname${i}`).value;
    let email = document.getElementById(`email${i}`).value;
    let password = document.getElementById(`password${i}`).value;

    fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
        Status: "offline",
      }),
    });
    console.log(fname, lname, email, password);
  }

  // let names = { fname: [], lname: [], email: [], password: [] };

  // let fname = document.getElementsByName("fname");
  // let lname = document.getElementsByName("lname");
  // let email = document.getElementsByName("email");
  // let password = document.getElementsByName("password");
  // namedata.forEach((ert) => {
  //   names.fname.push(ert.value);
  //   names.lname.push(ert.value);
  //   names.email.push(ert.value);
  //   names.password.push(ert.value);
  // });
  // emaildata.forEach((ert) => {
  //   names.email.push(ert.value);
  // });

  // console.log(names);

  // let maidiv = document.querySelectorAll(".maidiv");
  // // console.log(maidiv.length);
  // for (let i = 0; i < maidiv.length; i++) {
  //   let fname = document.getElementById(`fname${i}`).value;
  //   let lname = document.getElementById(`lname${i}`).value;
  //   let email = document.getElementById(`email${i}`).value;
  //   let password = document.getElementById(`password${i}`).value;
  //   console.log(fname, lname, email, password);
  // }

  // fetch(`http://localhost:3000/users`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     fname,
  //     lname,
  //     email,
  //     password,
  //   }),
  // });
  // ResetAtt();
};

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
