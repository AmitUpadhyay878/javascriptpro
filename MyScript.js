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

const signUp = (e) => {
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
    fname: document.getElementById("fname").value,
    lname: document.getElementById("lname").value,
    email: document.getElementById("email").value,
    Status: "online",
    hobby: hobbArr,
  });

  localStorage.setItem("formData", JSON.stringify(formData));
  displayData();
  ResetAtt();
  e.preventDefault();
};

function EditRegister(id) {
  let dell = document.querySelectorAll(`input[type="checkbox"]`);
  let newd = [...dell];
  newd.forEach((e) => e.removeAttribute("checked"));

  const local = JSON.parse(localStorage.getItem("formData"));
  local.find((data) => {
    if (data.id == id) {
      document.getElementById("hidden").value = data.id;
      document.getElementById("fname").value = data.fname;
      document.getElementById("lname").value = data.lname;
      document.getElementById("email").value = data.email;

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
    return e.id != id;
  });

  let arr = local.filter((item) => {
    return !ll.includes(item);
  });

  deData.push(...arr);
  localStorage.setItem("formData", JSON.stringify(ll));
  localStorage.setItem("RecycleData", JSON.stringify(deData));
  displayData();
  RecycleDatas();
  window.location.reload();
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
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        email: document.getElementById("email").value,
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
                            <button class="btn btn-warning" onClick='EditRegister(${data.id})'>Edit</button>
                            <button class="btn btn-danger"  onClick='DeleteRegister(${data.id})'>Delete</button>
                            </td>
                            </tr>
                               `;
    });
    output.innerHTML = abcd;
  }
}

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
  RecycleData.innerHTML = abcd;
}

displayData();
RecycleDatas();