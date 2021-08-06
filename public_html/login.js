function login(){
  let username = $('#lusername').val();
  let password = $('#lpassword').val();
  $.ajax({
    url: '/login/logIn/'+username+'/'+password,
    method:'GET',
    success: function( result ) {
      if (result == "succeed"){
        // $('#loginBox').html('<a href = "home.html">Login in!</a>');
        // alert('Success to login');
        window.location='/home.html';
      }
      else{
        alert('Wrong information, try it again!')
      }
    }
    });
}

function create(){
  let nemail = $('#email').val();
  let nusername = $('#username').val();
  let npassword1 = $('#password1').val();
  let npassword2 = $('#password2').val();

  if(npassword1 != npassword2){
    alert("Two passwords don't match");
  }else{
    $.ajax({
      url: '/login/create/',
      data:{
        username: nusername,
        email: nemail,
        password: npassword1
      },
      method: 'POST',
      success: function(result){
        alert('user added!');
      }
    });
  }
}