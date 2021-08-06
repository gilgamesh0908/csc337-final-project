var searchResult = []

function applyJob(){
	var compName = $('#companyName').val(); //todo: get the certain comp name
	var title = $('#jobTitle').val();

	$.ajax({
		url: '/job/apply',
		method: 'POST',
		data:{
			companyName: compName,
			jobTitle: title
		},
		success: function(result){
			alert('success to apply for the job');
		}
	});
}

function selectComp(name){
	$('#outputArea').empty();
	var renderHtml = '';
	
	for(var i=0;i<searchResult.length;i++){
		var job = searchResult[i];
		if(job.compName == name){
		
		renderHtml+=`<ul>
	<li>
		<h3 id="companyName">${job.compName}</h3>
		<p id="jobTitle">${job.jobTitle}</p>
		<p>${job.jobArea}</p>
		<input type="button" value="Apply" onclick="applyJob()"></input>
	</li>
</ul>`
		}
	}

	$('#outputArea').html(renderHtml);
}
function searchByTitle() {
    let item = $('#searchbar').val();
 
	$.ajax({
        url: '/job/searchByTitle',
        data: {
            jobTitle: item,
        },
        method: 'POST',
        success: function(result){
			var compList=new Set();
			// console.log(result);
			
			$('#outputArea').empty();
			var renderHtml = '';
			var renderCompHtml = '';
			var joblist = JSON.parse(result);
			searchResult = joblist;
			for(var i=0;i<joblist.length;i++){
				var job = joblist[i];
				compList.add(job.compName);
				
				renderHtml+=`<ul>
            <li>
                <h3 id="companyName">${job.compName}</h3>
                <p id="jobTitle">${job.jobTitle}</p>
                <p>${job.jobArea}</p>
                <input type="button" value="Apply" onclick="applyJob()"></input>
            </li>
        </ul>`
			}
			if(joblist.length == 0){
				
            $('#outputArea').html("not found");
			}else
            $('#outputArea').html(renderHtml);
			
			for (var comp of compList){
				renderCompHtml+=` <li><a onclick="selectComp(\'${comp}\')" >${comp}</a></li>`
			}
			 $('#compList').html(renderCompHtml);
        }
    })
}

