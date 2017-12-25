$(function(){
    let link = $('.js-categories__link-arrow');
    link.on('click', function(e){
        e.preventDefault();

        $('.categories__item').removeClass('active');
        $(this).parents('.categories__item').toggleClass('active');

        let href = $(this).attr('href');

        if($(href).is(':visible')){
            $(href).slideUp(400);
        }else{
            $('.block').hide(5);
            $(href).slideDown();
        }
    });
});
