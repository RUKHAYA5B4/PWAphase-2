var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
  param=query[i].split("=");
  paramValue=parseInt(param[1]);
}
var request;
var idb=window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
if(! idb in window){
  alert("browser doesnt support");
}
var open=idb.open("storeData,1");
console.log("IndexedDB is created");
open.onupgradeneeded=function(event){
  var request=event.target.result;
var storeDB=request.createObjectStore("Formatdata",{keyPath:"id",autoIncrement:true});

}
open.onerror=function(error){
  console.log("object store is not created",+error);
}
open.onsuccess=function(event){
  request=event.target.result;
  var transaction=request.transaction("Formatdata","readwrite");
  var storeDB=transaction.objectStore("Formatdata");
  var info=storeDB.get(paramValue);
  info.onsuccess=function(data){
  console.log(data.target.result);
  display(data.target.result);
education(data.target.result);
skills(data.target.result);
  }
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data)
{
  var img=document.createElement("img");
  img.src="image/resume.svg";
  left.append(img);
  var name=document.createElement("h3");
  name.textContent=data.name;
  left.append(name);
  var role=document.createElement("h3");
  role.textContent=data.role;
  left.append(role);
  var email=document.createElement("h3");
  email.textContent=data.email;
  left.append(email);
  var phone=document.createElement("h3");
  phone.textContent=data.phone;
  left.append(phone);
}
//right div
function education(ed){
var head=document.createElement("h2");
head.textContent="career objective";
right.append(head);
var pc=document.createElement("p");
pc.textContent=ed.career;
right.append(pc);

var head1=document.createElement("h2");
head1.textContent="educational details";
right.append(head1);


var table=document.createElement("table");
table.border="1";
  let row='';
row +=  "<tr>"+"<th>"+"institute"+"</th>"+
  "<th>"+"degree" +"</th>"+
  "<th>"+"branch" +"</th>"+
  "<th>"+"marks" +"</th>"+
  "</tr>";



  for(i in ed.education){

  row += "<tr>"+"<td>"+ed.education[i].college +"</td>"+
"<td>"+ed.education[i].degree +"</td>"+
"<td>"+ed.education[i].branch +"</td>"+
"<td>"+ed.education[i].marks+"</td>"+
"</tr>";
}
table.innerHTML=row;
right.appendChild(table);
}



function skills(f)
{
var head3=document.createElement("h2");
head3.textContent="technical skills";
right.appendChild(head3);

var ul=document.createElement(ul);
right.append(ul);

var head4=document.createElement("h3");
head4.textContent=f.skills;
right.append(head4);

}
