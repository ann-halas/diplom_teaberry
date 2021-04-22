$(document).ready(() => {

    let radBig = document.getElementById('circleB');
    let radSmall = document.getElementById('circleS');

    let rad = (radBig.offsetWidth + radSmall.offsetWidth) / 4;


    let circleUp = document.getElementsByClassName('advantage-up');
    for (let i = 0; i < circleUp.length; i++) {
        let circleTypeUp = new CircleType(circleUp[i]);
        circleTypeUp.radius(rad).dir(1);
    }

    let circleDown = document.getElementsByClassName('advantage-down');
    for (let a = 0; a < circleDown.length; a++) {
        let circleTypeDown = new CircleType(circleDown[a]);
        circleTypeDown.radius(rad).dir(-1);
    }

    $('.category').click((e) => {
        let currentElement = $(e.target);
        $('.products-container').hide();
        let id = currentElement.data('id');
        $('#' + id).show();

        $('.category').removeClass('active');
        currentElement.addClass('active');

        $('#' + id + ' .products').slick('refresh');
    });


    $('#white_tea .products').slick({
        centerMode: true,
        centerPadding: '100px',
        slidesToShow: 1,
        useTransform: true,
        infinite: true,
        variableWidth: true,
        arrows: true,
        dots: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $('#black_tea .products').slick({
        centerMode: true,
        centerPadding: '100px',
        slidesToShow: 1,
        useTransform: true,
        infinite: true,
        variableWidth: true,
        arrows: true,
        dots: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $('#green_tea .products').slick({
        centerMode: true,
        centerPadding: '100px',
        slidesToShow: 1,
        useTransform: true,
        infinite: true,
        variableWidth: true,
        arrows: true,
        dots: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $('#exotic_tea .products').slick({
        centerMode: true,
        centerPadding: '100px',
        slidesToShow: 1,
        useTransform: true,
        infinite: true,
        variableWidth: true,
        arrows: true,
        dots: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $('#oolong_tea .products').slick({
        centerMode: true,
        centerPadding: '100px',
        slidesToShow: 1,
        useTransform: true,
        infinite: true,
        variableWidth: true,
        arrows: true,
        dots: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    let items = $('.property');
    let length = items.length;
    let arc = 2 * Math.PI * (1 / length);
    let circleProperty = $('#circ_property');
    let diameter = circleProperty.width();
    let radius = diameter / 2;

    for (let i = 0; i < length; i++) {
        let angle = arc * (i + 2);
        let x = radius * Math.cos(angle);
        let y = radius * Math.sin(angle);
            $(items[i]).css('bottom', 'calc(50% - ' + y + 'px - 52px)');

            if ($(items[i]).hasClass('property-right')) {
                $(items[i]).css('left', 'calc(50% + ' + x + 'px + 38px)');
            } else {
                $(items[i]).css('right', 'calc(50% - ' + x + 'px + 38px)');
            }
    }

    wow = new WOW(
        {
            animateClass: 'animate__animated',
        }
    )
    wow.init();


    $('.product-action > button').click(() => {
        $('#popup').css('display', 'flex');
    });

    $('#popup-close2, #popup').click((e) => {
        if (e.target.id === 'popup-close2' || e.target.id === 'popup') {
            $('#popup').hide();
        }
    });


    $('#order').click(() => {
        if ($('.form_item').hasClass('open')) {
            $('.form_item').removeClass('open');
        } else {
            $('.form_item').addClass('open');
        }
    });

    $('.select_item').click((e) => {
        let choice = $(e.target).text();
        $('#order').val(choice);
        $('.form_item').removeClass('open');
    });

    $('#popup-container, #popup-order, #form-order').click((e) => {
        if (e.target.id === 'popup-container' || e.target.id === 'popup-order' || e.target.id === 'form-order') {
            if ($('.form_item').hasClass('open')) {
                $('.form_item').removeClass('open');
            }
        }
    });


    $('#order-button > button').click(function () {
        $('.error-input').hide();
        $('.control').css('border-color', 'rgb(143, 188, 98)');
        let hasError = false;
        let form = $('input.control');
        for (let i = 0; i < form.length; i++) {
            if (!$(form[i]).val()) {
                $(form[i]).siblings('.error-input').show();
                $(form[i]).css('border-color', 'red');
                hasError = true
            }
        }

        if (!hasError) {
            let name = $('#name');
            let gram = $('#gram');
            let phone = $('#phone');
            let order = $('#order');


            $.ajax({
                type: 'post',
                url: 'mail.php',
                data: 'name=' + name.val() + '&gram=' + gram.val() + '&phone=' + phone.val() + '&order=' + order.val(),
                success: () => {
                    $('#popup-order').hide();
                    $('#popup-container').toggleClass('thanks');
                    $('#popup-thanks').show();
                },
                error: () => {
                    alert('Ошибка при заказе. Свяжитесь, пожалуйста, по номеру телефона')
                }
            });
        }
    })

    $('#promo-discount > button').click(function () {
        let email = $('#email');
        if (email.val()) {

            $.ajax({
                type: 'post',
                url: 'mail_promo.php',
                data: 'email=' + email.val(),
                success: () => {
                    $('#promo-discount').hide();
                    $('#promo_email').show();
                },
                error: () => {
                    alert('Ошибка при отправке. Свяжитесь, пожалуйста, по номеру телефона')
                }
            });
        } else {
            $('#promo-error').show();
        }
    })


    $('#burger').click(() => {
        $('#header').toggleClass('menu-open');
    })

    $('#header .menu-item, #header-close2').click(() => {
        $('#header').removeClass('menu-open');
    })

    $('#collect-video-play img').click(() => {
        $('#collect-video-play').hide();
        $('#collect-video .circle-big').hide();
        let video = $('#collect-video iframe');
        video.show();
        var videoURL = video.prop('src');
        videoURL += "?autoplay=1";
        video.prop('src',videoURL);

    })

})