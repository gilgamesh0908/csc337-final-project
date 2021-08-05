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
    //let newpost = {name:uname,gender:ugender,pNum:upNum,bkg:ubkg,birthday:ubirthday,area:uarea,desc:udesc}
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