function addJob(){
    let title = $('#jTitle').val();
    let comp = $('#compName').val();
    $.ajax({
        url: '/add/job',
        data: {
            jobTitle: title,
            compName: comp,
        },
        method: 'POST',
        success: function(result){
            alert('job added');
        }
    })
}