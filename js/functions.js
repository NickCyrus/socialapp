var LoginData = {}
var bigData = {}

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
       // navigator.splashscreen.hide();
}



jQuery(function($){

    $('#loginAccess').submit(function(e){
            
           
          var email = $('#email_token').val();
          var pass  = $('#pass_token').val();

          if (!email){ $('#email_token').focus(); return false; }
          if (!pass){ $('#pass_token').focus(); return false; }

          if (email && pass){
              app.login( email , pass)
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
        wDivice : 0,
        hDivice : 0,
        baseULR : '',
        lastEvent : '',
        navApp : [],
        zIndex : 1000,
    
        main : function(){
            this.setSizeMobil();
            this.hastControl();
            this.oauth();
        },
        
        login : function( email , pass){
            
            this.ajax({
                         beforeSend : function(){
                                app.dialogWait('Validant accés, per favor esperi');
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
                                    bigData   = rs.bigData;
                                    Cookies.set('loginoauth', LoginData, { expires: 365 });
                                    $('#email_token , #pass_token').val('');
                                    app.setAvatar(LoginData);
                                    app.addEquip(bigData.team);
                                    app.animatePage('home','in-right');
                                }
                                
                                console.log(LoginData);
                         },
                         errorCallback : function(){
                             app.dialogClose();
                         }
                      })
        },
    
        oauth : function(){
            
                var oauth = Cookies.getJSON('loginoauth');
            
                if (oauth){
                        LoginData = oauth;
                        this.login(LoginData.user , LoginData.pass);
                }
            
        },
    
        hastControl : function(){
          
            if (window.history && window.history.pushState) {
                $(window).on('hashchange', function(e) {
                    
                    
                    
                    var hash = app.getLastNav();
                    
                    
                    var hashLocation = location.hash.replace('#','');
                
                    if ( hash != hashLocation && hashLocation ) {
                            if (hash =='home') { location.hash = "#home"; return false; } 
                            app.animatePage(hash,'out-right');
                    }
                    
                });
          }
                
        },
        setNavigator : function(value){
                var indice = (!this.navApp.length) ? 0 : (this.navApp.length);
                this.navApp[indice] = value;
        },
        unsetNavigator : function(value){
                var indice = (!this.navApp.length) ? 0 : (this.navApp.length) - 1;
                this.navApp.splice(indice, 1);    
        },
        backNavigator: function(){
            window.history.back();
        },
        getLastNav : function(){
            var indice = (!this.navApp.length) ? 0 : (this.navApp.length - 1); 
            return this.navApp[indice];
        },
        setSizeMobil : function(){
                
               
                

               this.hDivice = $(window).height() ;   
               this.wDivice = $(window).width() ;
               this.baseULR = window.location.href;
            
                var addCss = '<style type="text/css">'+
                             '.page { overflow: hidden; '+
                                'height :'+$(window).height()+'px'+
                             '}'+
                             '.content {'+
                                'height :'+( $(window).height() - ($('header nav').height() + $('footer nav').height() )  )+'px'+
                             '}'+
                             '.content-header {'+
                                'height :'+( $(window).height() - $('header nav').height() )+'px'+
                             '}'+
                             '.content-full {'+
                                'height :'+( $(window).height() )+'px'+
                             '}'+
                             '[data-start="bottom"] {'+
                                'top :'+( $(window).height()  )+'px'+
                             '}'+
                              '[data-start="right"] {'+
                                'top:0px; right :-'+( this.wDivice  )+'px'+
                             '}'+
                            '[data-start="left"] {'+
                                'left :-'+( this.wDivice  )+'px'+
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
        
        getzIndex   : function(){
            this.zIndex += 10;
            return this.zIndex
        },
        animatePage : function (pageName , ANIMATION ){
                
                ANIMATION = (ANIMATION) ? ANIMATION : 'basic';
                
                var propagation = true;
            
                var page = $('.page[data-page="'+pageName+'"]');
                
                var velocity = 500;
            
                if(!page.length) {
                    page = $('section[data-sidebar="'+pageName+'"]');
                    velocity = 100;
                }        
                
                
                if(!page.length)  return false;
            
                page.addClass('animated-page');
                
            if (page.attr("data-speed")) velocity = parseFloat(page.attr("data-speed"));
                
                if (!this.debug) StatusBar.backgroundColorByHexString("#E18560");
            
                
                var wDivice = this.wDivice;
                
                $('*').removeClass('currentPageActive');
                page.addClass('currentPageActive')
                  
                switch(ANIMATION){
                    
                    case 'out-right':
                        page.stop().animate({'top':0,
                                      'left':(this.wDivice)+'px', 
                                      'position':'absolute'},velocity,function(){
                                    
                                    
                                    page.attr('style', '').removeClass('animated-page');
                           
                            
                        });
                        this.lastEvent = 'out';
                        this.unsetNavigator(pageName);
                        
                    break;
                    case 'out-left':
                        page.stop().animate({'top':0,
                                      'left':'-'+(this.wDivice)+'px', 
                                      'position':'absolute'},velocity,function(){
                                      
                                      page.attr('style', '').removeClass('animated-page');
                                      page.attr('style', '');              
                                      page.css({'left':'-'+(wDivice)+'px' });      
                        });
                        
                        this.lastEvent = 'out';
                        this.unsetNavigator(pageName);
                        
                    break; 
                    
                    case 'show':
                        
                        page.animate({'z-index': this.getzIndex(),
                                      top:'0px', 
                                      left : 0,
                                      'position':'absolute'},velocity);
                        
                        this.setNavigator(pageName);
                        this.lastEvent = 'in';
                        window.location.href = "#"+pageName;
                        
                        
                        
                    break;
                    case 'in-right':
                        page.stop().css({'right':'-'+(this.wDivice)+'px'});
                        page.animate({'z-index': this.getzIndex(),right:'0px', 
                                      'position':'absolute'},velocity);
                        
                        this.setNavigator(pageName);
                        this.lastEvent = 'in';
                        window.location.href = "#"+pageName;
                    break;
                        
                    case 'in-left':
                        
                        page.stop().css({'left':'-'+(this.wDivice)+'px'});
                        page.animate({'z-index': this.getzIndex(),'top':0,'left':'0px', 
                                       'position':'absolute'},velocity); 
                         
                        this.setNavigator(pageName);
                        this.lastEvent = 'in';
                        window.location.href = "#"+pageName;
                    break;
                        
                    case 'bottom-top':
                        
                        page.stop().css({top: this.hDivice+'px'});
                        page.animate({'z-index': this.getzIndex(),'top':0,'left':'0px', 
                                       'position':'absolute'},velocity); 
                         
                        this.setNavigator(pageName);
                        this.lastEvent = 'in';
                        window.location.href = "#"+pageName;
                    break; 
                        
                        
                    default:
                         
                         page.stop().animate({'top':0,'left':'-'+(this.wDivice + 150)+'px', 
                                       'position':'absolute'},velocity);   
                    break;
                        
                } 
                    
                     
                
                   
            
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
              errorMSG      =  (opciones.errorMSGTITLE) ?  opciones.errorMSG : 'S\'ha produït un error en la càrrega de la informació. El servidor respondio:';
            
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
                            if (opciones.errorCallback){ 
                                 opciones.errorCallback()
                            }
                         },
						 cache: false
				})
            
        },
    
        setAvatar : function(data){
            
                if (data.avatar) $('.avatar img').attr('src', data.avatar);
                if (data.Name) $('.nice-name').html(data.Name);
                 
        },
    
        addEquip : function(listEquip){
                
            var  ul = $('#equip-list');
            
            $.each( listEquip , function( key, M ) {
                ul.append('<li>'+M.SNAME+
                          '<a class="category-team" onclick="app.loadPage(\'detailsEquip\',{ opc : \'loadPage\', page : \'detailsEquip\', id : '+M.ID+'})">'+M.Roll+'</a>'+        
                          '</li>')
            });
            
        },
    
    
        loadPage  : function(page , data){
                
                var pageSelect =  $('[data-page="'+page+'"]');
            
                this.ajax({
                            beforeSend : function(){
                                    app.dialogWait('Per favor esperi');
                            },
                            datos : data,
                            success : function(rs){
                                if (rs.htmlContent){
                                    $(pageSelect).find(rs.obj).html(rs.htmlContent);
                                }
                                app.dialogClose();   
                                app.animatePage(page,'show');
                            }
                })
            
            
        }
        
    
        
    
    
}



