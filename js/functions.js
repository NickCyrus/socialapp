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
     
     
     
 })

app = {
        debug : true ,
        loading : '' ,
        pageBefore : '',
        wDivise : 0,
        baseULR : '',
        
        main : function(){
            this.setSizeMobil();
            this.hastControl();
        },
        
        hastControl : function(){
          
            if (window.history && window.history.pushState) {
                $(window).on('popstate', function(e) {
                    var hashLocation = location.hash;
                    if (hashLocation) this.pageBefore = hashLocation;
                     if (this.pageBefore == '#home' && !hashLocation ){
                         app.animatePage('home','out-right')
                     }
                });
          }
                
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
                
                var page = $('.page[data-page="'+pageName+'"]');
            
                if(!page) return false;
                
                page.addClass('animated-page');
                
                if (!this.debug) StatusBar.backgroundColorByHexString("#E18560");
            
                window.location.href = "#"+pageName;
            
                var wDivise = this.wDivise;
            
                switch(ANIMATION){
                    
                    case 'out-right':
                        page.stop().animate({'top':0,
                                      'left':(this.wDivise)+'px', 
                                      'position':'absolute'},500,function(){
                                    
                                page.css({'left':'', 'right':'-'+(wDivise)+'px' }); 
                            
                        });
            
                        
                  
                    break;
                    case 'out-left':
                        page.stop().animate({'top':0,
                                      'left':'-'+(this.wDivise)+'px', 
                                      'position':'absolute'},500,function(){
                                 page.css({'left':'-'+(wDivise)+'px' });      
                        });
            
                       // page.css({'right':'-'+(this.wDivise)+'px'});
                        
                    break;
                    case 'in-right':
                        page.stop().css({'right':'-'+(this.wDivise)+'px'});
                        page.animate({'top':0,'right':'0px', 
                                       'position':'absolute'},500); 
                    break;
                        
                    case 'in-left':
                        page.stop().css({'left':'-'+(this.wDivise)+'px'});
                        page.animate({'top':0,'left':'0px', 
                                       'position':'absolute'},500); 
                    break; 
                        
                    default:
                         
                         page.stop().animate({'top':0,'left':'-'+(this.wDivise + 150)+'px', 
                                       'position':'absolute'},500);   
                    break;
                        
                } 
            
            
        }
        
    
        
    
    
}



