function updateUI(){
	$.ajax({
    url: '/home/getResume',
    type: 'POST',
    cache: false,
    processData: false,
    contentType: false
}).done(function(res) {
	 
	 var jsonObj = JSON.parse(res)
	 console.log(jsonObj);
	 $('#vimg').attr('src',jsonObj.avatar);
	 $('#vname').text(jsonObj.name);
	 $('#vgender').text(jsonObj.gender);
	 $('#vpNum').text(jsonObj.phoneNum);
	 $('#veduBkg').text(jsonObj.education);
	 $('#vbirthday').text(jsonObj.birthday);
	 $('#varea').text(jsonObj.area);
	 $('#vdesc').text(jsonObj.desc);
}).fail(function(res) {
}); 
}
function changeView(w){
	console.log(w);
	$('#createResumeArea').hide();
	$('#viewResumeArea').hide();
	if(w==1){
		$('#createResumeArea').show();
	}else{
		updateUI()
		$('#viewResumeArea').show();
	}
}
function addPost(){
	$.ajax({
    url: '/home/createResume',
    type: 'POST',
    cache: false,
    data: new FormData($('#uploadForm')[0]),
    processData: false,
    contentType: false
}).done(function(res) {
	alert(res);
}).fail(function(res) {
	alert('Resume posted fail!');
}); 
}
window.onload=function(){
      changeView(1);
}

 