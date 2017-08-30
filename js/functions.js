var LoginData = {}
var bigData = {}

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
        navigator.splashscreen.hide();
}



jQuery(function($){

    $('#loginAccess').submit(function(e){
        
          var email = $('#email_token').val();
          var pass  = $('#pass_token').val();

          if (!email){ $('#email_token').focus(); return false; }
          if (!pass){ $('#pass_token').focus(); return false; }

          if (email && pass){
              
              app.ajax({
                         beforeSend : function(){
                                app.dialogWait('Estamos comprobando el acceso');
                         },
                         datos : { opc : 'login', user: email , pass : pass },
                         success: function( rs){
                                app.dialogClose();
                                if (rs.error){
                                    $('#email_token').focus();
                                    app.alertConfirm('Acceso denegado', "Nom d'usuari incorrecte");
                                }
                             
                                if (rs.LoginData){
                                    LoginData = rs.LoginData;
                                    $('#email_token , #pass_token').val('');
                                    app.setAvatar(LoginData);
                                    app.animatePage('home','in-right');
                                }
                                
                                console.log(LoginData);
                         }
                      })
              
              // $('#email_token , #pass_token').val('');
              
              // alert("email:"+email+" pass:"+pass);
          }

          e.preventDefault();
    })

})

 $(document).ready(function(){
        app.main(); 
     
        var elem = document.querySelector('.js-switch');
        var init = new Switchery(elem , { size: 'small' });
     
 })



app = {
        debug : false ,
        loading : '' ,
        pageBefore : '',
        wDivise : 0,
        baseULR : '',
        lastEvent : '',
        navApp : [],
    
        main : function(){
            this.setSizeMobil();
            this.hastControl();
        },
        
        hastControl : function(){
          
            if (window.history && window.history.pushState) {
                $(window).on('popstate', function(e) {
                    
                    
                    
                    var hash = app.getLastNav();
                    
                    console.log(hash);
                    
                    var hashLocation = location.hash;
                    
                    /*
                    var beforeHash = this.pageBefore;  
                    
                    if (hashLocation) this.pageBefore = hashLocation;
                     
                   
                    
                     
                    if (this.pageBefore == '#home' && !hashLocation ){
                         app.animatePage('home','out-right')
                     }else{
                        
                         if (hash != 'home'){
                             app.animatePage(hash,'out-right');
                         }
                             
                     }
                     */
                    
                    if (app.lastEvent == 'in' && hash != hashLocation.replace('#','') && hashLocation ) app.animatePage(hash,'out-right');
                    
                });
          }
                
        },
        setNavigator : function(value){
                var indice = (!this.navApp.length) ? 0 : (this.navApp.length);
                this.navApp[indice] = value;
        },
        getLastNav : function(){
            var indice = (!this.navApp.length) ? 0 : (this.navApp.length - 1); 
            return this.navApp[indice];
        },
        setSizeMobil : function(){
                
               
                

            
               this.wDivise = $(window).width() ;
               this.baseULR = window.location.href;
            
                var addCss = '<style type="text/css">'+
                             '.page { overflow: hidden; '+
                                'height :'+$(window).height()+'px'+
                             '}'+
                             '.content {'+
                                'height :'+( $(window).height() - ($ ('header nav').height() + $('footer nav').height() )  )+'px'+
                             '}'+
                              '[data-start="right"] {'+
                                'right :-'+( this.wDivise  )+'px'+
                             '}'+
                            '[data-start="left"] {'+
                                'left :-'+( this.wDivise  )+'px'+
                             '}'+
                             '</style>';
            
            
            
                $('body').append(addCss);
            
            
        },
    
        dialogWait : function (msg){
            
                msg =  (msg) ? msg : '';
            
                this.loading = $.dialog({
                    title: '',
                    content: '<div class="ajax-loading-medium"><img src="images/loading.svg" /><p>'+msg+'</p></div>',
                    closeIcon: false
                });
            
        },
    
        dialogClose : function(ID){
            if (!ID)
                this.loading.close();   
            else
                ID.close();   
        },
    
        animatePage : function (pageName , ANIMATION ){
                
                ANIMATION = (ANIMATION) ? ANIMATION : 'basic';
                
                var propagation = true;
            
                var page = $('.page[data-page="'+pageName+'"]');
                
                var velocity = 500;
            
                if(!page.length) {
                    page = $('section[data-sidebar="'+pageName+'"]');
                    // pageName = 'sidebar';
                    velocity = 100;
                }        
                 
                if(!page.length)  return false;
            
                page.addClass('animated-page');
                
                if (!this.debug) StatusBar.backgroundColorByHexString("#E18560");
            
                
                var wDivise = this.wDivise;
                
                
                switch(ANIMATION){
                    
                    case 'out-right':
                        page.stop().animate({'top':0,
                                      'left':(this.wDivise)+'px', 
                                      'position':'absolute'},velocity,function(){
                                    
                                page.css({'left':'', 'right':'-'+(wDivise)+'px' }); 
                            
                        });
            
                        
                    break;
                    case 'out-left':
                        page.stop().animate({'top':0,
                                      'left':'-'+(this.wDivise)+'px', 
                                      'position':'absolute'},velocity,function(){
                                 page.css({'left':'-'+(wDivise)+'px' });      
                        });
                         
                       
                        
                    break; 
                    case 'in-right':
                        page.stop().css({'right':'-'+(this.wDivise)+'px'});
                        page.animate({'top':0,'right':'0px', 
                                       'position':'absolute'},velocity);
                        
                        this.setNavigator(pageName);
                        this.lastEvent = 'in';
                    break;
                        
                    case 'in-left':
                        
                        page.stop().css({'left':'-'+(this.wDivise)+'px'});
                        page.animate({'top':0,'left':'0px', 
                                       'position':'absolute'},velocity); 
                         
                        this.setNavigator(pageName);
                        this.lastEvent = 'in';
                    break; 
                        
                    default:
                         
                         page.stop().animate({'top':0,'left':'-'+(this.wDivise + 150)+'px', 
                                       'position':'absolute'},velocity);   
                    break;
                        
                } 
                    
                     
                        window.location.href = "#"+pageName;
                   
            
        },
    
        alertConfirm: function(title, msg ){
                    
                    title = (title) ? title : 'Informació';
                    
                    $.alert({
                          title: title, 
                          content: msg,
                          theme: 'light',
                          containerFluid : true
                    });

		}, 
         
        ajax : function (opciones){
             
                
              errorMSGTITLE =  (opciones.errorMSGTITLE) ?  opciones.errorMSG : 'Error';
              errorMSG      =  (opciones.errorMSGTITLE) ?  opciones.errorMSG : 'Se ha producido un error en la carga de la información. El servidor respondio:';
            
              $.ajax({ 
						 beforeSend :  opciones.beforeSend,
                		 type   : "POST",
                         crossDomain: true,
                         dataType : 'json',      
						 url    : 'https://socialpartners.org/app/app.php',
						 data   : opciones.datos,
						 success: opciones.success,
                         complete: opciones.complete,
                         error: function (jqXHR, exception) {
                            app.alertConfirm( errorMSGTITLE , errorMSG + ' <b>'+jqXHR.statusText+'</b>');
                         },
						 cache: false
				})
            
        },
    
        setAvatar : function(data){
            
                if (data.avatar) $('.avatar img').attr('src', data.avatar);
                if (data.Name) $('.nice-name').html(data.Name);
                 
        }
        
    
        
    
    
}



