var stxtEmpID = "";
var stxtEmpName = "";
var stxtEmpPhone = "";
var stxtEmpGroup = "";
var scb1 = "";
var scb2 = "";
var scb3 = "";
var db = "";
var dbBootCamp = "";
var dbBootMember = "";
var CheckFoundData = 0;
var Eid = "";
var EidBootCamp = "";
var EidBootRegister = "";
var EidBootMember = "";
var dateString = "";
var sDateRegister = "";
var i = 0;
const x = document.querySelectorAll(`div.com[min="${i}"]`);
var sCheckOpen = "";
//var sEmpType = "";
var sCampRound = "";
var sDateTime = "";
var sLINERegister = "";
var sATK = "";
var xRound = "BPA-1";
var parts = [];
var parts1 = [];
parts = xRound.split("-"); //สร้างString arry ชื่อparts
//alert(parts[0]);
var FinalRound = parts[0]; // 004  //String part1 เก็บค่าparts[0]
//var part2 = parts[1]; // 034556  //String part2 เก็บค่าparts[1]
//alert(FinalRound);


$(document).ready(function () {
  /*
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  */
  main()
  Connect_DB();
  CheckBootCampOpen();
  //CheckRegister();
  //CheckData(); 
});



async function main() {
  await liff.init({ liffId: "1655966947-8DgrpDq6" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


async function getUserProfile() {
  var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  //Connect_DB();
  //CheckData();
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    databaseURL: "https://file-upload-6f4fc.firebaseio.com",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore().collection("CheckProfile");
  dbBootCamp = firebase.firestore().collection("BootCamp");
  dbBootRegister = firebase.firestore().collection("BootRegister");
  dbBootMember = firebase.firestore().collection("BootMember");
}



function CheckBootCampOpen() {
  var str = "";
  dbBootCamp.where('CampRound','==',xRound)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidBootCamp = doc.id;
      sEmpType = doc.data().EmpType;
      sCheckOpen = doc.data().CampName;
      sCampRound = doc.data().CampRound;
      sLINERegister = doc.data().LINERegister;
      sessionStorage.setItem("CampName",doc.data().CampName);
    });
    //alert(sCheckOpen);
    //if(sCheckOpen!="") {
    str += '<div class="btn-t1" style="margin-top:20px;width:220px;" onclick="CheckData()">คลิกลงทะเบียน<br>'+sCheckOpen+'</div>';
    //} else {
    //  str += '<div class="btn-t3" style="margin-top:20px;cursor: default;width:220px;">ขณะนี้ระบบ<br>ยังไม่เปิดลงทะเบียน</div>';
    //}
    $("#gotoLink").html(str);  
    //OpenForm();
    CheckRegister();
  });
}


var xCheckRegister = 0;
function CheckRegister() {
  var str = "";
  //alert("a-2===="+sEmpType);
  dbBootRegister.where('LineID','==',sessionStorage.getItem("LineID"))
  .where('CampRound','==',xRound)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheckRegister = 1;
      EidBootRegister = doc.id;
      sDateTime = doc.data().DateTime;
      sATK = doc.data().ATK;
      sessionStorage.setItem("EmpID", doc.data().EmpID);
      sessionStorage.setItem("EmpName", doc.data().EmpName);
      sessionStorage.setItem("CheckPass", doc.data().DateTime);
      sessionStorage.setItem("ATKimg", doc.data().ATKimg);
      sessionStorage.setItem("EmpGroup", doc.data().EmpRH);
      document.getElementById('OpenBootCamp').style.display='none';
      document.getElementById('myRegister').style.display='none';
      document.getElementById('myTimer').style.display='block';
      //alert(sessionStorage.getItem("EmpGroup"));
    });
    if(EidBootRegister=="") {
      //document.getElementById('OpenBootCamp').style.display='block';
      document.getElementById('loading').style.display='none';
      document.getElementById('gotoLink').style.display='block';
    } else {
      WaitingPage();
    }
  });
}



function CheckData() {
  document.getElementById('BootCampLoading').style.display='none';
  document.getElementById('myRegister').style.display='block';
  //alert(sessionStorage.getItem("LineID"));
  //console.log(sessionStorage.getItem("LineID"));
  //dbCYCProfile.where('LineID','==',sessionStorage.getItem("LineID"))
  //db.where('statusconfirm','==',parseInt(sstatusconfirm))
  //alert(sessionStorage.getItem("LineID"));
  db.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      Eid = doc.id;
      sDateRegister = doc.data().DateRegister;
      sessionStorage.setItem("EmpID", doc.data().empID);
      sessionStorage.setItem("EmpName", doc.data().empName);
      sessionStorage.setItem("EmpPhone", doc.data().empPhone);
      sessionStorage.setItem("EmpGroup", doc.data().empRH);
      document.getElementById("txtEmpID").value = doc.data().empID;
      document.getElementById("txtEmpName").value = doc.data().empName;
      //document.getElementById("txtEmpPhone").value = doc.data().empPhone;
      //document.getElementById("txtEmpPhone").value = doc.data().empPhone;
      document.getElementById("txtEmpGroup").value = doc.data().empRH;
      WaitingPage();
    });
    $("#test *").attr("disabled", "disabled").off('click');
    OpenForm();
  });
}



function OpenForm() {
  if(CheckFoundData==1) {
    document.getElementById('OpenBootCamp').style.display='none';
    document.getElementById('myRegister').style.display='none';
    document.getElementById('myTimer').style.display='block';
  } else {
    document.getElementById('OpenBootCamp').style.display='none';
    document.getElementById('myRegister').style.display='block';
    document.getElementById('myTimer').style.display='none';
  }
}



function EditData() {
    document.getElementById('myRegister').style.display='block';
    document.getElementById('myTimer').style.display='none';
}



function CheckMember() {

  dbBootMember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .where('EmpType','==',sEmpType)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidBootMember = doc.id;
      xEmpType = doc.data().EmpType;
      sessionStorage.setItem("EmpID", doc.data().EmpID);
      sessionStorage.setItem("EmpName", doc.data().EmpName);
      sessionStorage.setItem("EmpGroup", doc.data().EmpGroup);
      dbBootMember.doc(EidBootMember).update({
        LineID : sessionStorage.getItem("LineID"),
        LineName : sessionStorage.getItem("LineName"),
        LinePicture : sessionStorage.getItem("LinePicture"),
        StatusRegister : 1
      });
    });
    //alert("(1)EidBootMember="+EidBootMember);
  });

}


function WaitingPage() {
  if(xCheckRegister==1) {
    document.getElementById('BootCampLoading').style.display='none';
  }
  var str = "";
  var xEmpType = "";
  dbBootMember.where('EmpID','==',sessionStorage.getItem("EmpID"))
  .where('EmpType','==',sEmpType)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidBootMember = doc.id;
      xEmpType = doc.data().EmpType;
      sessionStorage.setItem("EmpID", doc.data().EmpID);
      sessionStorage.setItem("EmpName", doc.data().EmpName);
    });
    str +='<div class="title_container"><div class="title-head">ยืนยันการลงทะเบียนเข้าร่วมงาน<br>BPA Forum</div><div style="padding-top:0px;color:#f68b1f;font-weight: 600;font-size:13px;">'+sCheckOpen+'</div></div>';
    str +='<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="profile-member"></div>';
    str +='<div class="profile-txt">'+ sessionStorage.getItem("LineName") +'</div>';
    str +='<div><div style="padding-top:15px;color:#f68b1f;font-weight: 600;">คุณ'+sessionStorage.getItem("EmpName")+'</div>';
    //if(xEmpType!="") {
    //  str +='<div class="profile-txt1">ได้ทำการลงทะเบียนเข้าร่วมอบรม<br>หลักสูตร BBD Specialist Bootcamp<br><font color="#0056ff">รุ่น '+xEmpType+'</font></div>';
    //} else {
    //  str +='<div class="profile-txt1">ได้ทำการลงทะเบียนเข้าร่วมงาน<br>BBD CAMPUS Specialist Program 2022<br><font color="#0056ff">รุ่น <b>'+sEmpType+'</b></font></div>';
    //}
    if(sDateTime!="") {
      str +='<div style="color:#ccc;font-size:11px;font-weight: 300;">ลงทะเบียนเมื่อ : '+ sDateTime +'</div>';
    }
    //alert(sessionStorage.getItem("ATKimg"));
    if(sessionStorage.getItem("ATKimg")!=null) {
      str +='<div class="btn-t4" onclick="showATK()" style="margin-top:10px;width:250px;">คลิกเพื่อแสดงผล ATK<br>ก่อนเข้าร่วมงาน</div>';
    }
    str +='<div class="btn-t1" onclick="showRegister()" style="margin-top:10px;width:250px;">ดูรายชื่อผู้ลงทะเบียน</div>';
    str +='</div></center>';
    $("#MyWating").html(str);    

  });
}


function showATK() {
  var str = "";
  str +='<div class="title_container"><div class="title-head">แสดงผล ATK สำหรับเข้าร่วมงาน<br>BPA Forum</div></div>';
  str +='<div class="profile-txt" style="margin-top:-25px;font-size:12px;">'+ sEmpType +'</div>';
  str +='<div><img src="'+ sessionStorage.getItem("ATKimg") +'" style="width:370px;"></div>';
  str +='<div style="padding:10px;color:#002d63;font-weight: 600;">แจ้งผล ATK เป็น : <font color="#f68b1f">'+sATK+'</font></div>';
  //str +='<div class="profile-txt" style="font-size:12px;color:#002d63;">ข้อมูลผู้แจ้งผล ATK</div>';
  str +='<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="profile-member" style="width:60px;"></div>';
  str +='<div style="color:#0056ff;font-weight: 600;margin-top:15px;">คุณ'+sessionStorage.getItem("EmpName")+'</div>';
  str +='<div style="color:#0056ff;">สังกัด : '+sessionStorage.getItem("EmpGroup")+'</div>';
  str +='<div style="color:#ccc;font-size:11px;font-weight: 300;">ลงทะเบียนเมื่อ : '+sDateTime+'</div>';
  str +='<div class="btn-t1" onclick="showRegister()" style="margin-top:10px;width:250px;">ดูรายชื่อผู้ลงทะเบียน</div>';
  //str +='<div class="btn-t1" onclick="gotowebsite()" style="margin-top:20px;width:220px;">ดูรายละเอียดเว็บไซต์</div>';
  $("#MyWating").html(str);    
}


function showRegister() {
  var str = "";
  var sCountID = 0;
  str +='<div class="title_container"><div class="title-head">ข้อมูลผู้ลงทะเบียนเข้าร่วมงาน<br>BPA Forum</div></div>';
  str +='<div id="DisplayCountRegister" style="margin-bottom: 15px;"></div>';
  //alert(sEmpType);
  dbBootRegister.where('EmpType','==',sEmpType)
  .orderBy('TimeStamp','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      sCountID = sCountID+1;
      str += '<div class="box-member" style="width:61px;height:80px;overflow:hidden;float: left;" onclick="OpenRegister(\''+ doc.id +'\')"><div><img src="'+ doc.data().LinePicture +'" class="img-register"></div><div class="clr txt-member" style="font-size:10px;">'+ doc.data().LineName +'</div></div>';
    });
    if(sessionStorage.getItem("ATKimg")!=null) {
      str +='<div class="btn-t4" onclick="showATK()" style="margin-top:10px;width:250px;">คลิกเพื่อแสดงผล ATK<br>ก่อนเข้าร่วมงาน</div>';
    }
    //str +='<div class="btn-t1" onclick="showRegister()" style="margin-top:10px;width:250px;background:#999;">ดูรายชื่อผู้ลงทะเบียน</div>';
    //$("#DisplayRegister").html(str);  
    $("#MyWating").html(str);    
    $("#DisplayCountRegister").html("<div>จำนวนลงทะเบียน : "+sCountID+" คน</div>");  
  });
}


function OpenRegister(x) {
  //alert(x);
  var str = "";
  dbBootRegister.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<div style="font-weight: 600;letter-spacing:4px;padding-bottom: 10px; color:#002d63;">'+doc.data().EmpType+'</div>';
      if(doc.data().StatusRegister==0) {
        if(doc.data().EmpSex=="M") {
           str += '<div><img src="./img/m.png" class="img-member" style="width:120px;height:120px;">';
        } else {
           str += '<div><img src="./img/f.png" class="img-member" style="width:120px;height:120px;">';
        }
        str += '<div class="txt-member" style="padding-top: 15px;">'+doc.data().ShortName+'</div>';
      } else {
          str += '<div><img src=\''+ doc.data().LinePicture +'\' class="img-member-true" style="width:120px;height:120px;">';
          str += '<div class="txt-member1" style="padding-top: 15px;">'+doc.data().LineName+'</div>';
      }
      str += '<div style="margin-top:20px;font-size:13px;font-weight: 600;">คุณ'+doc.data().EmpName+'</div>';
      str += '<div>ลงทะเบียนกิจกรรม '+doc.data().EmpType+'</div>';
      str += '<div>เมื่อวันที่ '+doc.data().DateTime+'</div>';
    });
    $("#DisplayUser").html(str);  
    document.getElementById("id01").style.display = "block";
  });
}

function CloseAll() {
  document.getElementById('id01').style.display='none';
}

var sCheckBottom = 0;
function ClickSaveProfile() {
  sCheckBottom = 0;
  //alert($("input[type=checkbox][id=cb1]:checked").val());
  stxtEmpID = document.getElementById("txtEmpID").value;
  stxtEmpName = document.getElementById("txtEmpName").value;
  //stxtEmpPhone = document.getElementById("txtEmpPhone").value;
  stxtEmpGroup = document.getElementById("txtEmpGroup").value;
  stxtATK = document.getElementById("txtATK").value;

  if(stxtEmpID !== null && stxtEmpID !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpName !== null && stxtEmpName !== '') { sCheckBottom = sCheckBottom+1; }
  //if(stxtEmpPhone !== null && stxtEmpPhone !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpGroup !== null && stxtEmpGroup !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtATK !== null && stxtATK !== '') { sCheckBottom = sCheckBottom+1; }
  if(sessionStorage.getItem("ATKimg") !== null) { sCheckBottom = sCheckBottom+1; }


  if(sCheckBottom==5) {
    sATK = document.getElementById("txtATK").value;
    sessionStorage.setItem("EmpID", document.getElementById("txtEmpID").value);
    //alert(sessionStorage.getItem("EmpID"));
    CheckMember();
    SaveData();
  } else {
    //alert(sessionStorage.getItem("ATKimg"));
    alert("คุณกรอกข้อมูลไม่ครบ = "+sCheckBottom+"/5");
  }
}



function SaveData() {
  var eSpace = "";
  var eEmpGroup = stxtEmpGroup;
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  sDateTime = dateString;
  sessionStorage.setItem("CheckPass", sDateTime);
  //if(document.getElementById("txtEmpGroup").value!="OTHER") {
  //  eEmpGroup = "BBD";
  //} 
  //alert("Eid="+Eid);
  if(Eid=="") {
    db.add({
      lineID : sessionStorage.getItem("LineID"),
      linename : sessionStorage.getItem("LineName"),
      empPicture : sessionStorage.getItem("LinePicture"),
      empID : document.getElementById("txtEmpID").value,
      empName : document.getElementById("txtEmpName").value,
      //empPhone : document.getElementById("txtEmpPhone").value,
      empRH : document.getElementById("txtEmpGroup").value,
      empBr : eEmpGroup,
      statusconfirm : 2,
      statusedit : 1,
      statuspass : 0,
      memo : eSpace,
      empAddress : eSpace,
      DateRegister : dateString
    });
  } else {
    db.doc(Eid).update({
      lineID : sessionStorage.getItem("LineID"),
      linename : sessionStorage.getItem("LineName"),
      empPicture : sessionStorage.getItem("LinePicture"),
      empID : document.getElementById("txtEmpID").value,
      empName : document.getElementById("txtEmpName").value,
      //empPhone : document.getElementById("txtEmpPhone").value,
      empRH : document.getElementById("txtEmpGroup").value,
      empBr : eEmpGroup,
      DateRegister : dateString
    });
  }

  if(EidBootRegister=="") {
    dbBootRegister.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : document.getElementById("txtEmpID").value,
      EmpName : document.getElementById("txtEmpName").value,
      //EmpPhone : document.getElementById("txtEmpPhone").value,
      EmpRH : document.getElementById("txtEmpGroup").value,
      ATK : document.getElementById("txtATK").value,
      ATKimg : sessionStorage.getItem("ATKimg"),
      EmpMember : 0,
      PreRegister : 0, 
      PreDateTime : eSpace,
      //logATK : sessionStorage.getItem("logATK"),
      CampRound : sCampRound,
      EmpType : sEmpType,
      TimeStamp : TimeStampDate,
      DateTime : dateString
    });
  }

/*
  if(EidBootMember!="") {
  alert("(2)EidBootMember="+EidBootMember);
    dbBootMember.doc(EidBootMember).update({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      StatusRegister : 1
    });
  }
*/
  //alert("Save Done"); 
  WaitingPage();
  document.getElementById('myRegister').style.display='none';
  document.getElementById('myTimer').style.display='block';
}


function gotowebsite() {
  //alert("go to web");
  window.location.href = 'showRegister.html';
}


function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}




function phone_formatting(ele,restore) {
  var new_number,
      selection_start = ele.selectionStart,
      selection_end = ele.selectionEnd,
      number = ele.value.replace(/\D/g,'');
  
  // automatically add dashes
  if (number.length > 2) {
    // matches: 123 || 123-4 || 123-45
    new_number = number.substring(0,3) + '-';
    if (number.length === 4 || number.length === 5) {
      // matches: 123-4 || 123-45
      new_number += number.substr(3);
    }
    else if (number.length > 5) {
      // matches: 123-456 || 123-456-7 || 123-456-789
      new_number += number.substring(3,6) + '-';
    }
    if (number.length > 6) {
      // matches: 123-456-7 || 123-456-789 || 123-456-7890
      new_number += number.substring(6);
    }
  }
  else {
    new_number = number;
  }
  ele.value =  (new_number.length > 12) ? new_number.substring(12,0) : new_number; 
  if (new_number.slice(-1) === '-' && restore === false
      && (new_number.length === 8 && selection_end === 7)
          || (new_number.length === 4 && selection_end === 3)) {
      selection_start = new_number.length;
      selection_end = new_number.length;
  }
  else if (restore === 'revert') {
    selection_start--;
    selection_end--;
  }
  ele.setSelectionRange(selection_start, selection_end);
}
  
function phone_number_check(field,e) {
  var key_code = e.keyCode,
      key_string = String.fromCharCode(key_code),
      press_delete = false,
      dash_key = 189,
      delete_key = [8,46],
      direction_key = [33,34,35,36,37,38,39,40],
      selection_end = field.selectionEnd;
  
  // delete key was pressed
  if (delete_key.indexOf(key_code) > -1) {
    press_delete = true;
  }
  
  // only force formatting is a number or delete key was pressed
  if (key_string.match(/^\d+$/) || press_delete) {
    phone_formatting(field,press_delete);
  }
  // do nothing for direction keys, keep their default actions
  else if(direction_key.indexOf(key_code) > -1) {
    // do nothing
  }
  else if(dash_key === key_code) {
    if (selection_end === field.value.length) {
      field.value = field.value.slice(0,-1)
    }
    else {
      field.value = field.value.substring(0,(selection_end - 1)) + field.value.substr(selection_end)
      field.selectionEnd = selection_end - 1;
    }
  }
  // all other non numerical key presses, remove their value
  else {
    e.preventDefault();
//    field.value = field.value.replace(/[^0-9\-]/g,'')
    phone_formatting(field,'revert');
  }

}

//document.getElementById('txtEmpPhone').onkeyup = function(e) {
//  phone_number_check(this,e);
//}





