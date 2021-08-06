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

function addpost(){
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
    console.log(postObj);
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
// use this function to add the post
function addPostBk(){
    let n = $('#name').val();
    let g = $('#gend').val();
    let p = $('#pNum').val();
    let ph = $('#photo').val();
    let e = $('#Bkg').val();
    let b = $('#birthday').val();
    let a = $('#area').val();
    let d = $('#desc').val();
    // console.log(n, g, p, ph, e, b, a, d);
    $.ajax({
        // url: '/home/create/:username',
        url: '/home/create/',
        data: {
            username: '',
            name: n,
            gender: g,
            phoneNum: p,
            photo: ph,
            education: e,
            birthday: b,
            area: a,
            desc: d
        },
        method: 'POST',
        success: function(result){
            alert('resume added');
        }
    });
}