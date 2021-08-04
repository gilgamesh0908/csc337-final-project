function login(){
    let username = $('#lusername').val();
    let password = $('#lpassword').val();
    $.ajax({
      url: '/login/'+username+'/'+password,
      method:'GET',
      success: function( result ) {
        if (result == "succeed"){
          $('#loginBox').html('<a href = "home.html">Login in!</a>');
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
    let newuser ={email:nemail, username:nusername,password1:npassword1,password2:npassword2}
    let userobj = JSON.stringify(newuser);
    $.ajax({
      url: '/login/create/'+username+'/'+password+'/'+nemail,
      data: {newuser: userobj},
      method: 'POST',
      success: function(result) {
          if (result == 'account created') {
              alert('Account created!');
          }
          else {
              alert('Username is taken, please try an another one!');
          }
      }
  })
}
