$( document ).ready(function() {

  // menu sidebar
  $('.main-menu .nav-link').click(function(event){
      event.preventDefault();
      $('header .navbar').removeClass( "home" );
      var target = $(this).data('target');
      var v_footer = $(this).data('footer');
      if(v_footer){$('footer').show("slow");}else{$('footer').hide("fast");}
      $('.pages').hide("fast");
        $('.main-menu .active').removeClass( "active" );
        $(this).addClass( "active" );
        $('#'+target).show(2000);
  });
  $('.home-create').click(function(event){
      event.preventDefault();
      $('#page-home').hide("fast");
      $('footer').show("slow");
      $('header .navbar').removeClass( "home" );
        $('.main-menu .active').removeClass( "active" );
        $('.main-menu .nav-link.create').addClass( "active" );
        $('#page-create').show(2000);
  });
  // menu footer create a flyer
  //  $('.menu-create .nav-link').click(function(){
  //      var target = $(this).data('target');
  //      $('.panel').hide();
  //      $('.menu-create .active').removeClass( "active" );
  //      $(this).addClass( "active" );
  //      $('#'+target).show();
  //  });
      $('#preview').click(function(){
        $('.carousel').hide();
        $('.menu-create').hide();
        $('.text-end').show();
        $('#flyer').show();
      });
      $('#back').click(function(){
        $('.carousel').show();
        $('.menu-create').show();
        $('.text-end').hide();
        $('#flyer').hide();
      });

      $('#carousel-content').on('slid.bs.carousel', function (e) {
        $('.carousel-indicators .nav-link').removeClass('active')
        var index = $(e.target).find('.active').index();
        $('.carousel-indicators .nav-link').eq(index).addClass('active');
      })

      // var $carousel = $('#carousel-content');
      // $carousel.carousel();
      // var handled=false;//global variable

      // $carousel.on('slide.bs.carousel', function (e) {
        //   var current=$(e.target).find('.carousel-item.active');
        //   var indx=$(current).index();
        //   if((indx+2)>$('.carousel-indicators .nav-link').length)
        //       indx=-1
        //    if(!handled)
        //    {
        //       $('.carousel-indicators .nav-link').removeClass('active')
        //       $('.carousel-indicators .nav-link:nth-child('+(indx+2)+')').addClass('active');
        //    }
        //    else
        //    {
        //       handled=!handled;//if handled=true make it back to false to work normally.
        //    }
    //   });

      $(".carousel-indicators .nav-link").on('click',function(){
         //Click event for indicators
         $(this).addClass('active').siblings().removeClass('active');
         //remove siblings active class and add it to current clicked item
         handled=true; //set global variable to true to identify whether indicator changing was handled or not.
      });
});
