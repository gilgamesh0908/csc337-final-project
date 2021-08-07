
// Author: Aerror Li, Lingxiao Meng
// Class: CSC337 
// Purpose: This is the javascript to update the jobs' information for database.
function addJob(){
    let title = $('#jTitle').val();
    let comp = $('#compName').val();
    let jobArea = $('#area').val();
	
    $.ajax({
        url: '/add/job',
        data: {
            jobTitle: title,
            compName: comp,
            jobArea: jobArea,
        },
        method: 'POST',
        success: function(result){
            if(result == 'finish adding'){
                alert('job added');
            }else{
                alert('fail to add the job');
            }
        }
    })
}