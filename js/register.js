var EidMember = "";
var EidRound = "";
var sEmpType = "";
var ClassID = "";

var aEmpID = "";
var aEmpName = "";
var aShortName = "";
var aEmpBranch = "";
var aCheckRound = "";
var CheckRound = "";

$(document).ready(function() {
  if(sessionStorage.getItem("CheckPass")==null) { location.href = "checkid.html"; }
	//ClassID = getParameterByName('gid');
	//if(ClassID=="") { ClassID=1; }
	//$('#DisplayPageID').html(PageID);
	Connect_DB();
	DisplayRound();
	document.getElementById("menu3").style.display = "block";
    //LastData();
} );


//var _0x2223a8=_0x4a06;function _0x4a06(_0x58d05f,_0x37522b){var _0x51897b=_0x5189();return _0x4a06=function(_0x4a065c,_0x574a38){_0x4a065c=_0x4a065c-0xa6;var _0x5ad908=_0x51897b[_0x4a065c];return _0x5ad908;},_0x4a06(_0x58d05f,_0x37522b);}function _0x5189(){var _0x4c9d9a=['1193208OLbmRR','retailproject-6f4fc.firebaseapp.com','793537bcfEnc','1029280khHJRm','AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE','3048VLbdVv','retailproject-6f4fc','653667385625','15090327YLbHCA','3241BeunWp','20392sIqUAD','retailproject-6f4fc.appspot.com','380qTLowL','1133772GbhIaw','G-9SKTRHHSW9'];_0x5189=function(){return _0x4c9d9a;};return _0x5189();}(function(_0xd95154,_0xe1abc4){var _0xb84bf7=_0x4a06,_0x110b75=_0xd95154();while(!![]){try{var _0x27bd57=-parseInt(_0xb84bf7(0xab))/0x1+-parseInt(_0xb84bf7(0xa9))/0x2+-parseInt(_0xb84bf7(0xa7))/0x3+-parseInt(_0xb84bf7(0xb3))/0x4*(-parseInt(_0xb84bf7(0xa6))/0x5)+parseInt(_0xb84bf7(0xae))/0x6*(parseInt(_0xb84bf7(0xb2))/0x7)+-parseInt(_0xb84bf7(0xac))/0x8+parseInt(_0xb84bf7(0xb1))/0x9;if(_0x27bd57===_0xe1abc4)break;else _0x110b75['push'](_0x110b75['shift']());}catch(_0x436a60){_0x110b75['push'](_0x110b75['shift']());}}}(_0x5189,0x624c6));var firebaseConfig={'apiKey':_0x2223a8(0xad),'authDomain':_0x2223a8(0xaa),'projectId':_0x2223a8(0xaf),'storageBucket':_0x2223a8(0xb4),'messagingSenderId':_0x2223a8(0xb0),'appId':'1:653667385625:web:a5aed08500de80839f0588','measurementId':_0x2223a8(0xa8)};
//var _0x2de511=_0x1926;function _0x1926(_0x30734a,_0x5b3bbd){var _0x73f665=_0x73f6();return _0x1926=function(_0x192674,_0x14d42e){_0x192674=_0x192674-0xdd;var _0x597ecc=_0x73f665[_0x192674];return _0x597ecc;},_0x1926(_0x30734a,_0x5b3bbd);}(function(_0x47b941,_0x21d585){var _0x99722d=_0x1926,_0x5afd7d=_0x47b941();while(!![]){try{var _0x9b5d92=parseInt(_0x99722d(0xe1))/0x1*(parseInt(_0x99722d(0xe9))/0x2)+-parseInt(_0x99722d(0xe6))/0x3+-parseInt(_0x99722d(0xe3))/0x4+parseInt(_0x99722d(0xe2))/0x5*(-parseInt(_0x99722d(0xe4))/0x6)+parseInt(_0x99722d(0xe7))/0x7+-parseInt(_0x99722d(0xe5))/0x8*(parseInt(_0x99722d(0xdf))/0x9)+parseInt(_0x99722d(0xde))/0xa*(parseInt(_0x99722d(0xe8))/0xb);if(_0x9b5d92===_0x21d585)break;else _0x5afd7d['push'](_0x5afd7d['shift']());}catch(_0x452ee7){_0x5afd7d['push'](_0x5afd7d['shift']());}}}(_0x73f6,0x7772b),firebase[_0x2de511(0xea)](firebaseConfig));function _0x73f6(){var _0x5162a4=['33YHxiSJ','726230iHTRcS','initializeApp','firestore','5402910hvuKti','9bbneWQ','collection','1YcZXNZ','110560keMpou','1350632PwZPuc','24NBBjSR','4999744QlSEDg','2005383pBWdXK','1573642FrTUWr'];_0x73f6=function(){return _0x5162a4;};return _0x73f6();}var db=firebase[_0x2de511(0xdd)]()[_0x2de511(0xe0)]('Report');
//dbMember = firebase.firestore().collection("BootMember");
function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbBootCamp = firebase.firestore().collection("BootCamp");
  dbBootMember = firebase.firestore().collection("BootMember");
  dbBootRegister = firebase.firestore().collection("BootRegister");
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var aNameGroup = "";
var aHotel = "";
var aWelcomePack = "";
var aListRules = "";

function DisplayRound() {
  var str = "";
  //aCheckRound = "R1";

  dbBootCamp.where('CampStatus','==',1)
  .orderBy('CampRound','desc')
  .limit(1)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      aCheckRound = doc.data().CampRound;
      //alert(doc.data().CampRound);
    });


    dbBootCamp.where('CampRound','==',aCheckRound)
    .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    		sEmpType = doc.data().EmpType;
  	    $("#HeadCampName").html('<div class="btn-t3" style="margin:30px auto 30px auto;width:260px;cursor: default;">???????????????????????? '+doc.data().CampName+'</div>');  
  	    $("#HeadCampName").html('???????????????????????? '+doc.data().CampName);  
  	    $("#CampName").html('<div class="btn-t3" style="margin:-5px 0;px;cursor: default;">??????????????????????????????????????????????????????</div>');  
  	    $("#ListRules").html(doc.data().ListRules);  
  	    $("#WelcomePack").html(doc.data().WelcomePack);  
  	    str += '<div style="width:110px;float: left;padding-top:20px;"><img src="./avatar/'+doc.data().PicCamp+'" style="height: 200px;padding:10px;"></div>';
  	    str += '<div style="width:280px;float: left;color:#fff;padding-top:0px;">';
  	    str += '<div class="headCamp">???????????????????????? '+doc.data().CampName+'</div>';
  	    str += '<div style="color:#002d63; font-weight: 600;padding-bottom: 6px;margin-top:20px;">??????????????????????????????????????????????????????</div>';
  	    str += '<div>???????????????????????? BBD Specialist Bootcamp '+doc.data().CampName+'</div>';
  	    str += '<div>?????????????????????????????? '+doc.data().TrainingDays+'</div>';
  	    str += '<div>'+doc.data().Hotel+'</div>';
  	    str += '<div>???????????????????????????????????? : '+doc.data().Participant+'</div>';
  	    str += '<div>???????????????????????????????????? : '+doc.data().EmpTarget+' ??????</div>';
  	    if(doc.data().CampStatus==0) {
  		    str += '<div class="btn-t5">??????????????? : ?????????????????????????????????????????????????????????</div>';
  	    } else if(doc.data().CampStatus==1) { 
  		    str += '<div class="btn-t1">??????????????? : ???????????????????????????????????????</div>';
  	    } else if(doc.data().CampStatus==9) { 
  		    str += '<div class="btn-t4">??????????????? : ????????????????????????????????????</div>';
  	    }
  	    str += '</div>';
  	    $("#DisplayCamp").html(str);  
      });
  	   LoadMember();
    });

  });
}



function LoadMember() {
  var str = "";
  var sCountID = 0;
  //alert(sEmpType);
  dbBootRegister.where('EmpType','==',sEmpType)
  .orderBy('TimeStamp','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
    sCountID = sCountID+1;
		str += '<div class="box-member" onclick="OpenRegister(\''+ doc.id +'\')"><div><img src="'+ doc.data().LinePicture +'" class="img-register"></div><div class="txt-member">'+ doc.data().LineName +'</div></div>';
		//str += '<div class="box-member"><div><img src="./img/m.png" class="img-member"></div><div class="txt-member">'+ doc.data().LineName +'</div></div>';
    });
    $("#DisplayMember").html(str);  
    $("#DisplayCountRegister").html("<div>?????????????????????????????????????????? : "+sCountID+" ??????</div>");  
  });
}


function DisplayMenu(x) {
	document.getElementById("menu1").style.display = "none";
	document.getElementById("menu2").style.display = "none";
	document.getElementById("menu3").style.display = "none";
	document.getElementById("menu4").style.display = "none";
	document.getElementById("menu5").style.display = "none";
	if(x==1) {
		document.getElementById("menu1").style.display = "block";
	} else if(x==2) { 
		document.getElementById("menu2").style.display = "block";
	} else if(x==3) { 
		document.getElementById("menu3").style.display = "block";
	} else if(x==4) { 
		document.getElementById("menu4").style.display = "block";
	} else if(x==5) { 
		document.getElementById("menu5").style.display = "block";
	}
    //location.href = "view.html?gid="+x;
}



function OpenRegister(x) {
  var str = "";
  dbBootRegister.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<div style="font-weight: 600;letter-spacing:4px;padding-bottom: 10px; color:#002d63;">???????????? '+doc.data().EmpType+'</div>';
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
      str += '<div style="margin-top:20px;font-size:13px;font-weight: 600;">?????????'+doc.data().EmpName+'</div>';
      str += '<div>??????????????????????????????????????????????????? '+doc.data().EmpType+'</div>';
      str += '<div>????????????????????????????????? '+doc.data().DateTime+'</div>';
    });
    $("#DisplayUser").html(str);  
    document.getElementById("id01").style.display = "block";
  });
}

function CloseAll() {
  document.getElementById('id01').style.display='none';
}