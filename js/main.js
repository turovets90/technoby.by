$(document).ready(function(){

    /* перевод картинки svg в код */
    $('.icon img, img.icon').each(function(){
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
            var $svg = $(data).find('svg');
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
            $svg = $svg.removeAttr('xmlns:a');
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
            $img.replaceWith($svg);
        }, 'xml');
    });
    /* end перевод картинки svg в код */


    $('.hamburger').click(function () {
        $('.main_menu').toggleClass('open');
        $('html').toggleClass('page-noscroll');

        $('.main_menu .mm_close').click(function () {
            $('.main_menu').removeClass('open');
            $('html').removeClass('page-noscroll');
        });
        return false;
    });
    $(document).on('click', function(e) {
        if (!$(e.target).closest(".main_menu.open").length) {
            $(".main_menu.open").removeClass('open');
            $("html").removeClass('page-noscroll');
        }
        e.stopPropagation();
    });

    $('.main_menu .arrow').click(function(){
        $(this).next().slideToggle();
        $(this).toggleClass('act');
    });

    $(".m_slider").slick({
        infinite: true,
        arrows: true,
        dots: true,
        //fade: true,
        //autoplay:  true,
        //speed: 2000,
        //autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    $('.amount .down').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.amount .up').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });



    $('.range_values').each(function(){
        var range=$(this).find('.range');
        var tasks_status1=$(this).find('.tasks_status1');
        var tasks_status2=$(this).find('.tasks_status2');
        $(range).slider({
            range: true,
            min: 0,
            max: 1000,
            values: [0, 1000],
            step: 10,
            slide: function(event, ui) {
                $(tasks_status1).val( ui.values[0] );
                $(tasks_status2).val( ui.values[1] );
            }
        });
    });

    $('.filter_item_title').click(function(){
        $(this).parent().toggleClass('act');
    });
    $('.filter_title').click(function(){
        $(this).toggleClass('act');
    });

    $(function () {
        $('input, textarea').each(function () {
            $(this).blur(function(){
                if(!this.value){
                    $(this).removeClass('hide_label');
                }
                else{
                    $(this).addClass('hide_label');
                }
            });
            if ( !this.value ) {
                $(this).removeClass('hide_label');
            }
            else{
                $(this).addClass('hide_label');
            }
        });
    });


    $('.product_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.product_slider_nav'
    });
    $('.product_slider_nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.product_slider',
        dots: false,
        focusOnSelect: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });


/*
    function format(state) {
        if (!state.id) return state.text; // optgroup
        return "<div class='flag_img'><img class='flag' src='img/flags/" + state.id.toLowerCase() + ".png'/></div>" + "<span>" + state.text; + "<span>";
        console.log(state.id.toLowerCase());
    }
    $(".lang_select").select2({
        minimumResultsForSearch: Infinity,
        templateSelection: format,
        formatResult: format,
        templateResult: format,
        formatSelection: format,
        escapeMarkup: function(m) { return m; }
    });



    $(".m_slider").slick({
        infinite: true,
        arrows: true,
        dots: true,
        fade: true,
        //autoplay:  true,
        speed: 2000,
        //autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1
    });


    $('.hamburger').click(function () {
        $('.main_menu').toggleClass('open');
        $('html').toggleClass('page-noscroll');

        $('.main_menu .mm_close').click(function () {
            $('.main_menu').removeClass('open');
            $('html').removeClass('page-noscroll');
        });
        return false;
    });
    $(document).on('click', function(e) {
        if (!$(e.target).closest(".main_menu.open").length) {
            $(".main_menu.open").removeClass('open');
            $("html").removeClass('page-noscroll');
        }
        e.stopPropagation();
    });

    $(function () {
        $('input, textarea').each(function () {
            $(this).blur(function(){
                if(!this.value){
                    $(this).removeClass('hide_label');
                }
                else{
                    $(this).addClass('hide_label');
                }
            });
            if ( !this.value ) {
                $(this).removeClass('hide_label');
            }
            else{
                $(this).addClass('hide_label');
            }
        });
    });



    if($('.main_clients_list .item').length > 6){
        $('.main_clients_list').slick({
            autoplay: false,
            dots: false,
            arrows: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });
    }else if($(window).innerWidth() < 575 && $('.main_clients_list .item').length > 2){
        $('.main_clients_list').slick({
            autoplay: false,
            dots: false,
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 1
        });
    }else if($(window).innerWidth() < 767 && $('.main_clients_list .item').length > 3){
        $('.main_clients_list').slick({
            autoplay: false,
            dots: false,
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1
        });
    }else if($(window).innerWidth() < 991 && $('.main_clients_list .item').length > 3){
        $('.main_clients_list').slick({
            autoplay: false,
            dots: false,
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1
        });
    }


    if($('.gallery_list .item').length > 4){
        $('.gallery_list').slick({
            autoplay: false,
            dots: true,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }else if($(window).innerWidth() < 575 && $('.gallery_list .item').length > 1){
        $('.gallery_list').slick({
            autoplay: false,
            dots: true,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }else if($(window).innerWidth() < 767 && $('.gallery_list .item').length > 2){
        $('.gallery_list').slick({
            autoplay: false,
            dots: true,
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 1
        });
    }else if($(window).innerWidth() < 991 && $('.gallery_list .item').length > 2){
        $('.gallery_list').slick({
            autoplay: false,
            dots: true,
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 1
        });
    }



    $(".product_slider").slick({
        infinite: true,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dotsClass: 'slider__dots',
        customPaging: function(slick, index) {
            var image = $(slick.$slides[index]).find('.slider_img').attr('src');
            return '<span><img src="' + image + '" alt="" /></span>'
        }
    });



    if($('.staff_list .item').length > 4){
        $('.staff_list').slick({
            autoplay: false,
            dots: true,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }else if($(window).innerWidth() < 575 && $('.staff_list .item').length > 1){
        $('.staff_list').slick({
            autoplay: false,
            dots: true,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }else if($(window).innerWidth() < 767 && $('.staff_list .item').length > 2){
        $('.staff_list').slick({
            autoplay: false,
            dots: true,
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 1
        });
    }else if($(window).innerWidth() < 991 && $('.staff_list .item').length > 2){
        $('.staff_list').slick({
            autoplay: false,
            dots: true,
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 1
        });
    }


    $(".project_slider").slick({
        infinite: true,
        arrows: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: '0',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });



    $(window).resize(function(){
        var header_height = $('header').outerHeight();
        $('header').next().css({'margin-top': header_height+'px'});
        $(window).scroll(function(){
            if ($(this).scrollTop() > header_height) {
                $('header').addClass('fixed');
            } else {
                $('header').removeClass('fixed');
            }
        });

        //var page_banner_top=$('.page_banner').offset().top;
        //$('.page_banner').css({
          //  'height':'calc(100vh - '+page_banner_top+'px)'
        //});

    });
    $(window).resize();

 */




});


