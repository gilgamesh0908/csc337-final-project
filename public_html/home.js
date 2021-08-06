function addpost1(){
    let uname = $('#name').val();
    let ugender = $('input[name = gender]:checked', '#createResumeArea').val();
    let upNum = $('#pNum').val();
    var files = $('#photo').prop('files');
    var data = new FormData();
    data.append('photo', files[0]);
    let ubkg = $('input[name = eduBkg]:checked', '#createResumeArea').val();
    let ubirthday = $('#birthday').val();
    let uarea = $('#area').val();
    let udesc =$('#desc').val();
    let newpost = {name:uname,gender:ugender,pNum:upNum,bkg:ubkg,birthday:ubirthday,area:uarea,desc:udesc}
    let postObj = JSON.stringify(newpost);
    $.ajax({
        url: '/home/create',
        data: {newpost:postObj},
        method: 'POST',
        cache: false,
        processData: false,
        contentType: false,
        success: function(result) {
            if (result == 'Successfully posted') {
                alert('Resume posted!');
            }
        }
    })
}
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

 