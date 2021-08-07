/**
 * Author: Aerror Li, Lingxiao Meng
 * Class: CSC337 
 * Purpose: This is the client file for the home to create the resume 
 * and view the resume
 */
//   function addpost1(){
//     let uname = $('#name').val();
//     let ugender = $('input[name = gender]:checked', '#createResumeArea').val();
//     let upNum = $('#pNum').val();
//     var files = $('#photo').prop('files');
//     var data = new FormData();
//     data.append('photo', files[0]);
//     let ubkg = $('input[name = eduBkg]:checked', '#createResumeArea').val();
//     let ubirthday = $('#birthday').val();
//     let uarea = $('#area').val();
//     let udesc =$('#desc').val();
//     let newpost = {name:uname,gender:ugender,pNum:upNum,bkg:ubkg,birthday:ubirthday,area:uarea,desc:udesc}
//     let postObj = JSON.stringify(newpost);
//     $.ajax({
//         url: '/home/create',
//         data: {newpost:postObj},
//         method: 'POST',
//         cache: false,
//         processData: false,
//         contentType: false,
//         success: function(result) {
//             if (result == 'Successfully posted') {
//                 alert('Resume posted!');
//             }
//         }
//     })
// }

//buttons for create resume 
function createResumeButton(){
    document.getElementById('createResumeArea').style.visibility = 'visible';
    document.getElementById('viewResumeArea').style.visibility='hidden';
}

function viewResumeButton(){
    // hide the create resume area
    document.getElementById('createResumeArea').style.visibility = 'hidden';
    document.getElementById('viewResumeArea').style.visibility='visible';

    // show the data in database
}

// update UI information 
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

//hide and show create resume area and view resume area
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

// post resume information 
function addPost(){
	$.ajax({
        url: '/home/createResume',
        type: 'POST',
        cache: false,
        data: new FormData($('#uploadForm')[0]),
        processData: false,
        contentType: false,
        success: function(result){
            if(result == 'login first'){
                alert('Please log in first!');
            }else if(result == 'insertok'){
                alert('Success to add the resume');
            }else if (result == 'updatefail'){
                alert('Fail to update your resume');
            }else if (result == 'no name'){
                alert('Please enter the name');
            }else if(result == 'no photo'){
                alert('Please upload the photo');
            }
            else{
                alert('Success to update the resume');
            }
        }
    });
    // .done(function(res) {
    //     alert(res);
    // }).fail(function(res) {
    //     alert('Resume posted fail!');
    // }); 
    }

    window.onload=function(){
        changeView(1);
    }

// this is the backup function
// function addPostBk(){
//     let n = $('#name').val();
//     let g = $('#gend').val();
//     let p = $('#pNum').val();
//     let ph = $('#photo').val();
//     let e = $('#Bkg').val();
//     let b = $('#birthday').val();
//     let a = $('#area').val();
//     let d = $('#desc').val();
//     // console.log(n, g, p, ph, e, b, a, d);
//     $.ajax({
//         // url: '/home/create/:username',
//         url: '/home/create/',
//         data: {
//             username: '',
//             name: n,
//             gender: g,
//             phoneNum: p,
//             photo: ph,
//             education: e,
//             birthday: b,
//             area: a,
//             desc: d
//         },
//         method: 'POST',
//         success: function(result){
//             if(result == 'Please log in'){
//                 alert('Please log in first');
//             }
//             else if(result == 'exist'){
//                 alert('You already have one');
//             }
//             else{
//                 alert('resume added');
//             }
//         }
//     });
// }
