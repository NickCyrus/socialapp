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
                   
            
        }
        
    
        
    
    
}



