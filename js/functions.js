jQuery(function($){

    $('#login').submit(function(e){
        
          var email = $('#email-token').val();
          var pass  = $('#pass-token').val();

          if (!email){ $('#email-token').focus(); return false; }
          if (!pass){ $('#pass-token').focus(); return false; }

          if (email && pass){
              $('#email-token , #pass-token').val('');
              phonon.navigator().changePage('pagetwo', '');
              // alert("email:"+email+" pass:"+pass);
          }

          e.preventDefault();
    })

})
