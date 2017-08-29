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
        debug : false ,
        loading : '' ,
        pageBefore : '',
        wDivise : 0,
        baseULR : '',
        
        main : function(){
            this.setSizeMobil();
            // this.animatePage('login');
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
            
                window.location.href = this.baseULR+"#"+pageName;
            
                switch(ANIMATION){
                    
                    case 'in-right':
                        page.css({'right':'-'+(this.wDivise)+'px'});
                        page.animate({'top':0,'right':'0px', 
                                       'position':'absolute'},500); 
                    break; 
                    default:
                         
                         page.animate({'top':0,'left':'-'+(this.wDivise + 150)+'px', 
                                       'position':'absolute'},500);   
                    break;
                        
                } 
            
            
        }
        
    
        
    
    
}



