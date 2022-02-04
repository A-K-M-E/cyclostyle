// Edit
function initCarousel(){
  $('.pages').hide("fast");
  $('footer').show("slow");
  $('.main-menu .active').removeClass( "active" );
  $('.main-menu .nav-link.create').addClass( "active" );
  $('#page-create').show(2000);
  $('#carousel-content').carousel(0);
}

function editDiv() {
  initCarousel();
  $('.img-result').show();
  $('#carousel-content').show();
  $('.menu-create').show();
  $('.text-end').hide();
  $('#content-flyer').hide();
}

function previewDiv(){
  initCarousel();
  $('#carousel-content').hide();
  $('.menu-create').hide();
  $('.text-end').show();
  $('#content-flyer').show();
}


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
        $('#create-flyer').removeClass('was-validated');
        $('#add-bookmarks').removeClass('was-validated');
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

      $('.back').click(function(){
        $('.carousel').show();
        $('.menu-create').show();
        $('.text-end').hide();
        $('#content-flyer').hide();
      });

        $('.preview-device .action-btn').click(function(event){
          $('.preview-device .action-btn').removeClass( "active" );
          $(this).addClass( "active" );
        });

      $('#carousel-content').on('slid.bs.carousel', function (e) {
        $('.carousel-indicators .nav-link').removeClass('active')
        var index = $(e.target).find('.active').index();
        $('.carousel-indicators .nav-link').eq(index).addClass('active');
      })

      $(".carousel-indicators .nav-link").on('click',function(){
         //Click event for indicators
         $(this).addClass('active').siblings().removeClass('active');
         //remove siblings active class and add it to current clicked item
         handled=true; //set global variable to true to identify whether indicator changing was handled or not.
      });



      // editor
      $('#bodyTextarea').richText({
            // uploads
            imageUpload: false,
            fileUpload: false,

            // media
            videoEmbed: false,
            fonts: false,
            table: false
          });

});
