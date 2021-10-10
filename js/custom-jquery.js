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
    $('.menu-create .nav-link').click(function(){
        var target = $(this).data('target');
        $('.panel').hide();
        $('.menu-create .active').removeClass( "active" );
        $(this).addClass( "active" );
        $('#'+target).show();
    });
      $('#preview').click(function(){
        $('.panel').hide();
        $('.menu-create').hide();
        $('.text-end').show();
        $('#flyer').show();
        $('.menu-create .active').removeClass( "active" );
      });
      $('#back').click(function(){
        $('#panel-template').show();
        $('.menu-create').show();
        $('.text-end').hide();
        $('.menu-create .first').addClass( "active" );
        $('#flyer').hide();
      });

});
