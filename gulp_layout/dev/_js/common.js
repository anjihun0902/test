/* ---------------------------------------------
 * 웹, 모바일 페이지 전환
 *
 * @param url 이동할 URL(페이지 주소)
--------------------------------------------- */
//모바일
function mobileLocation(url){
	var mobileKeyWords = new Array('iPhone', 'iPod', 'BlackBerry', 'Android', 'Windows CE', 'Windows CE;', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson', 'Mobile', 'Symbian', 'Opera Mobi', 'Opera Mini', 'IEmobile');
	var is_mobile = false;
	for (var word in mobileKeyWords) {
	 if (navigator.userAgent.match(mobileKeyWords[word]) != null) {
		is_mobile = true;
		window.location.href = url;
		break; }
	}
}

//웹
function webLocation(url){
	if(!is_mobile){
		location.href = url;
	}
}


/* ---------------------------------------------
 * 지정된 URL(페이지 주소)로 이동
 *
 * @param url 이동할 URL(페이지 주소)
--------------------------------------------- */
function move(url) {
	location.href = url;
}


/* ---------------------------------------------
 * FORM check
--------------------------------------------- */

$("").on("click", function(e){
	e.stopPropagation();
	e.preventDefault();

	var chkHan = /^[가-힣]+$/; //한글
	var chkNum = /^[0-9]*$/; //숫자
	var chkEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; //이메일
	var chkPL = $("#f_num").val().length; //전화번호 길이
	var f_name = $.trim($("#f_name").val()); //이름
	var f_num = $.trim($("#f_num").val()); //전화번호	
	var f_email = $.trim($("#f_email").val());
	var f_priv1 = $.trim($("input:checkbox[name=f_priv1]:checked").val()); //개인정보(필수)		
	var f_textarea = $.trim($("#f_textarea").val());

	if(f_name == "") {
		alert("이름을 입력해주세요.");
		$('#f_name').focus();
		return false;
	} else if (!chkHan.test(f_name)) {
		alert("이름을 정확히 입력해주세요.");
		$("#f_name").focus();
		return false;
	} else if (f_num == "") {
		alert("전화번호를 입력해주세요.");
		$("#f_num").focus();
		return false;
	} else if (!chkNum.test(f_num) || chkPL < 10) {
		alert("전화번호를 정확히 입력해주세요.");
		$("#f_num").focus();
		return false;	 
	 } else if (f_email != "" && !chkEmail.test(f_email)) {
		alert("이메일을 정확히 입력해주세요.");
		$("#f_email").focus();
		return false;	
	} else if (f_textarea == "") {
		alert("내용을 입력해주세요.");           
		return false;	
	} else if (f_priv1 != "Y") {
		alert("개인정보 수집 및 이용에 동의해주세요.");
		return false;
	}else{
			var stringData = $('#frm').serialize();
			var procUrl = procUrl;
			$.ajax({
			url : procUrl,
			type : "post",
			dataType : "json",
			data : stringData,
			success: function(data) {				
				if(data.result=="error"){
					alert("잘못된 접근입니다.");
				}else if(data.result=="empty"){
					alert("필요한 정보를 받지 못했습니다.");						
				}else if(data.result=="ok"){
					// 성공
					sendReset();
				}
			},
			error:function(request,status,error){
			//	console.log(request.responseText);
			//	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	}
});


/* ---------------------------------------------
 * FORM reset
--------------------------------------------- */
//sendReset();
function sendReset(){
	$("#f_name").val('');//이름
	$("#f_num").val('');//전화번호
	$("#f_email").val('');
	$("#f_textarea").val('');
	$('input:checkbox[name=f_priv1]').prop('checked', false); //개인정보(필수)
}


/* ---------------------------------------------
 * keyup event
--------------------------------------------- */
$("#onlyNumber").keyup(function(event) {
	if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
		var inputVal = $(this).val();
		$(this).val(inputVal.replace(/[^0-9]/gi, ''));
	}
});
$("#onlyAlphabet").keyup(function(event) {
	if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
		var inputVal = $(this).val();
		$(this).val(inputVal.replace(/[^a-z]/gi, ''));
	}
});
$("#notHangul").keyup(function(event) {
	if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
		var inputVal = $(this).val();
		$(this).val(inputVal.replace(/[^a-z0-9]/gi, ''));
	}
});


/* ---------------------------------------------
 * 앵커 부드럽게 내려가기
--------------------------------------------- */
$("").on("click", function(e) {
  e.stopPropagation();
  e.preventDefault();
  $("html,body").animate({scrollTop: $($(this).attr("href")).offset().top}, 500, "linear");
});


/* ---------------------------------------------
 * 아코디언
--------------------------------------------- */
$(".faq_list .faq_cont").hide();
$(".faq_list li a").click(function() {
	if ($(this).hasClass("on")) {
	    $(this).removeClass("on").siblings(".faq_cont").slideUp(300);
	} else {
	    $(this).addClass("on").siblings(".faq_cont").slideDown(300);
	}
});


/* ---------------------------------------------
 * YOUTUBE API
--------------------------------------------- */
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
	  height: '100%',
	  width: '100%',
	  videoId: '', 
	  playerVars: {
		 'autoplay': 0,
		 'controls': 0, // 재생컨트롤 노출여부
		 'autohide': 0, // 재생컨트롤이 자동으로 사라질지의 여부
		 'rel': 0, // 동영상 재생완료 후 유사동영상 노출여부
		 'playsinline':1,
		 'wmode': 'transparent'
	  },
	  events: {
		 'onStateChange': onPlayerStateChange
	  }
   });
}

var playerState;
var playNum = 0;

function onPlayerStateChange(event) {	
   playerState = event.data == YT.PlayerState.ENDED ? 'end' :
	  event.data == YT.PlayerState.PLAYING ? 'playing' :
	  event.data == YT.PlayerState.PAUSED ? 'stop' :
	  event.data == YT.PlayerState.BUFFERING ? 'buffering' :
	  event.data == YT.PlayerState.CUED ? 'playready' :
	  event.data == -1 ? 'not start' : 'error';
}


/* ---------------------------------------------
 * popup 중앙정렬
--------------------------------------------- */
$(document).on("click","",function(e){
	e.preventDefault();
	$(".popup").css({ "position":"absolute","top":($(window).scrollTop()) });
	$(".popup").css({ "top": (($(window).height() - $(".popup").outerHeight()) / 2 + $(window).scrollTop()) + "px"}).show(); 
})


/* ---------------------------------------------
 * TAB UI
 *
 * @param i : 탭 여러개일 때 class+숫자
--------------------------------------------- */
function tabChange(i){
   $(".tab_content"+i).hide();
   $(".tab_content"+i+":first").show(); 
	  $("ul.tabs"+i+" li a").click(function(e) {
		 e.preventDefault();
		 e.stopPropagation();
	  $("ul.tabs"+i+" li a").removeClass("on");
	  $(this).addClass("on");
	  $(".tab_content"+i).hide();
	  var activeTab = $(this).attr("href");
	  $("#" + activeTab).show();
   });
}	


/* ---------------------------------------------
 * 다음 우편 주소 찾기(WEB)
 *
 * html에 추가
 * onclick="execDaumPostcode();
 * <script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
--------------------------------------------- */
/*
function execDaumPostcode() {
	new daum.Postcode({
		oncomplete: function (data) {
			var fullAddr = '';
			var extraAddr = '';

			if (data.userSelectedType === 'R') {
				fullAddr = data.roadAddress;
			} else {
				fullAddr = data.jibunAddress;
			}

			if (data.userSelectedType === 'R') {
				if (data.bname !== '') {
					extraAddr += data.bname;
				}

				if (data.buildingName !== '') {
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}

				fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
			}
			fullAddr = "(" + data.zonecode + ") " + fullAddr;

				document.getElementById('f_addr1').value = fullAddr;
				document.getElementById('f_addr2').focus();

		}
	}).open();
}
*/

/* ---------------------------------------------
 * 다음 우편 주소 찾기(MOBILE)
 *
 * html에 추가
 * onclick="execDaumPostcode();
 * <div id="layer" style="display:none;position:relative;top:-50px;overflow:hidden;background:#fff;z-index:100;
	-webkit-overflow-scrolling:touch;width:100%;height:430px;left:0px">
 *		<img src="//t1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" 
		style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1;width:6%;z-index:200" 
		onclick="closeDaumPostcode()" alt="닫기 버튼">
 * </div>
 * <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
--------------------------------------------- */
/*
// 우편번호 찾기 화면을 넣을 element
var element_layer = document.getElementById('layer');
function closeDaumPostcode() {
	// iframe을 넣은 element를 안보이게 한다.
	element_layer.style.display = 'none';
}
function execDaumPostcode() {

	new daum.Postcode({
		oncomplete: function(data) {
		   
			var fullAddr = data.address; // 최종 주소 변수
			var extraAddr = ''; // 조합형 주소 변수

			// 기본 주소가 도로명 타입일때 조합한다.
			if(data.addressType === 'R'){
				//법정동명이 있을 경우 추가한다.
				if(data.bname !== ''){
					extraAddr += data.bname;
				}
				// 건물명이 있을 경우 추가한다.
				if(data.buildingName !== ''){
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
				fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
			}

				fullAddr = "("+data.zonecode+") "+ fullAddr; //우편번호+주소
				document.getElementById('f_addr1').value = fullAddr;
				document.getElementById('f_addr2').focus();


			// iframe을 넣은 element를 안보이게 한다.
			// (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
			element_layer.style.display = 'none';
		},
		width : '100%',
		height : '100%',
		maxSuggestItems : 5
	}).embed(element_layer);

		// iframe을 넣은 element를 보이게 한다.
		element_layer.style.display = 'block';
}
*/

/* ---------------------------------------------
 * AOS
 *
 * @param easing
 * @param duration
--------------------------------------------- */
function myAOS(easing, duration){
	AOS.init({
	   easing: easing,
	   duration: duration
	});
}


/* ---------------------------------------------
 * ClipboardJS (해시태그복사)
--------------------------------------------- */
var clipboard = new ClipboardJS('.hashtag_copy');
clipboard.on('success', function(){	
	alert("해시태그가 복사되었습니다.");
});


/* ---------------------------------------------
 * 스크롤 다운
--------------------------------------------- */
$(window).on('scroll', function() {
	var positionTop = 0;
	var cur_pos = $(this).scrollTop();
	if (cur_pos == positionTop) {
		$('').fadeIn();
	} else if (cur_pos >= positionTop) {
		$('').fadeOut();
	}
});


/* ---------------------------------------------
 * 쿠키 설정
--------------------------------------------- */
var setCookie = function(name, value, exp) {
  var date = new Date();
  date.setTime(date.getTime() + exp*24*60*60*1000); //하루
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};
var getCookie = function(name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null;
};


/* ---------------------------------------------
 * 퀵메뉴
--------------------------------------------- */
var currentPosition = parseInt($("").css("top"),10); //퀵메뉴 시작위치
var footerPosition = parseInt($("").offset().top,10); //footer 위치
var qMenuHeight = $("").height(); //오른쪽 메뉴 길이

$(window).scroll(function() { 
	var position = $(window).scrollTop() ; // 현재 스크롤바의 위치값
	var calcPositionMenu = position + qMenuHeight; 

	if(footerPosition-currentPosition>=calcPositionMenu){
		$("").stop().animate({"top":position+currentPosition+"px"},500); 
	}
});


/* ---------------------------------------------
 * 페이지네이션
--------------------------------------------- */
$("").twbsPagination({
	totalPages: 1,
	visiblePages: 10,
	onPageClick: function (event, page) {	
		interViewList("",page);
	}
});


/* ---------------------------------------------
 * 로컬스토리지
--------------------------------------------- */
var local_id;
if(typeof(Storage) !== "undefined") {
	local_id = localStorage.getItem('');//로컬스토리지아이디
}else{
	local_id = getCookie(''); //쿠키
}
if(local_id == null){
	local_id =  Math.random().toString(36).substr(2, 16);
	if(typeof(Storage) !== "undefined") {
		localStorage.setItem("",local_id);
	}else{
		setCookie('', local_id, 7); 
	}		
}

