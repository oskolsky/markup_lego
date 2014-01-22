$(function() {

  $('.form_text.__phone').mask('+7 (999) 999-99-99');
  $('.form_text.__card').mask('9 999999 999999');



  //****************************************************************************************************
  //
  // .. PROMO BLOCK ON HOME PAGE
  //
  //****************************************************************************************************
  $(document).on('click', '.promo-slider.__home .slide a', function() {
    var rel = $(this).data('rel');
    var bg  = $(this).data('bg');

    $('.header_bg').find('.header_bg_i').hide();
    $('.header_bg').find('.header_bg_i[data-rel="' + rel + '"]').fadeIn();

    $('.promo').find('.promo_i').hide();
    $('.promo').find('.promo_i[data-rel="' + rel + '"]').fadeIn();

    return false;
  });



  //****************************************************************************************************
  //
  // .. CATALOG
  //
  //****************************************************************************************************
  $('.catalog.__series').find('.catalog_row').each(function() {
    $(this).find('.catalog_i').resizeToMaxHeight();
  });



  //****************************************************************************************************
  //
  // .. CATALOG SHOW
  //
  //****************************************************************************************************
  $('.js-add-basket').click(function() {
    $(this).removeClass('__red').addClass('__green').text('Оформить');
    return false;
  });



  //****************************************************************************************************
  //
  // .. JOBS
  //
  //****************************************************************************************************
  $('.jobs-item_more').click(function() {
    var $el = $(this).closest('.jobs-item').find('.jobs-item_body');
    if ($el.is(':hidden')) {
      $el.slideDown();
    } else {
      $el.slideUp();
    }
    return false;
  });



  //****************************************************************************************************
  //
  // .. FAQ
  //
  //****************************************************************************************************
  $('.faq_i').find('.faq_i_open').click(function() {
    $(this).closest('.faq_i').addClass('__current');
    $(this).closest('.faq_i').find('.faq_i_answer').show();
    return false;
  });
  $('.faq_i').find('.faq_i_answer_close').click(function() {
    $(this).closest('.faq_i').removeClass('__current');
    $(this).closest('.faq_i').find('.faq_i_answer').hide();
    return false;
  });



  //****************************************************************************************************
  //
  // .. ARTICLE SHOW & CLOSE
  //
  //****************************************************************************************************
  $('.articles_i_caption_more').click(function() {
    var _this = this;
    var url = $(this).data('url');
    $.ajax({
      url: url,
      success: function(response) {
        $(_this).closest('.articles_i_announcement').hide();
        $(_this).closest('.articles_i_announcement').after(response);
        $(_this).closest('.articles_i').find('.articles_i_show').fadeIn();
      },
      error: function() {
        alert('Error load resources');
      }
    });
    return false;
  });

  $(document).on('click', '.articles_i_show_close', function() {
    var $el = $(this).closest('.articles_i');
    $el.find('.articles_i_show').remove();
    $el.find('.articles_i_announcement').show();
    var destination = $el.offset().top;
    $('html, body').animate({scrollTop: destination}, 500);
    return false;
  });


  //****************************************************************************************************
  //
  // .. PHOTO GALLERY LOAD NEW PHOTO
  //
  //****************************************************************************************************
  $(document).on('click', '.articles_i_show_gallery_add', function() {
    var _this = this;
    $.ajax({
      url: '/data/photo_gallery',
      success: function(response) {
        $(_this).before(response);
      },
      error: function() {
        alert('Error load resources');
      }
    });
    return false;
  });



  //****************************************************************************************************
  //
  // .. PHOTO & VIDEO GALLERY
  //
  //****************************************************************************************************
  $('.gallery').each(function() {
    var _this = this;
    $(_this).find('.gallery_preview').find('.gallery_preview_i').click(function() {
      var rel = $(this).data('rel');
      $(_this).find('.gallery_preview_i.__current').removeClass('__current');
      $(this).addClass('__current');
      $(_this).find('.gallery_view').find('.gallery_view_i.__current').removeClass('__current');
      $(_this).find('.gallery_view').find('.gallery_view_i[data-rel="' + rel + '"]').addClass('__current');
      return false;
    });
  });



  //****************************************************************************************************
  //
  // .. AVAILABILITY
  //
  //****************************************************************************************************
  $('.availability_more').click(function() {
    var $el = $(this).closest('.availability').find('.availability_section_more');
    if ($el.is(':hidden')) {
      $(this).text('Скрыть');
      $el.slideDown();
    } else {
      $(this).text('Показать');
      $el.slideUp();
    }
    return false;
  });



  //****************************************************************************************************
  //
  // .. REVIEWS ADD
  //
  //****************************************************************************************************
  $('.js-reviews-toggle').click(function() {
    var $el_list = $('.reviews_list');
    var $el_form = $('.reviews_add');
    if ($el_form.is(':hidden')) {
      $el_list.hide();
      $el_form.fadeIn();
    } else {
      $el_list.fadeIn();
      $el_form.hide();
    }
    return false;
  });


  //****************************************************************************************************
  //
  // .. FORM NUMBER
  //
  //****************************************************************************************************
  $('.form_number').each(function() {
    var _this = this;
    $(this).find('.form_number_controls_i').click(function() {
      var $el = $(_this).find('input');
      var value = $el.val();
      $(this).hasClass('__up') ? value++ : value--;
      if (value > 0) $el.val(value);
      return false;
    });
  });



  //****************************************************************************************************
  //
  // .. JQUERY UI TABS
  //
  //****************************************************************************************************
  $('.tabs').tabs();



  //****************************************************************************************************
  //
  // .. JQUERY UI SLIDER RANGE
  //
  //****************************************************************************************************
  $('.range-slider').each(function() {
    var _this = this;
    $(_this).find('.range-slider_init.__price').slider({
      range: true,
      min: 0,
      max: 22000,
      step: 100,
      values: [0, 22000],
      slide: function(event, ui) {
        $(_this).find('.range-slider_value.__min').text(ui.values[0]);
        $(_this).find('.range-slider_value.__max').text(ui.values[1]);
      }
    });
    $(_this).find('.range-slider_init.__age').slider({
      range: true,
      min: 0,
      max: 16,
      step: 1,
      values: [0, 16],
      slide: function(event, ui) {
        $(_this).find('.range-slider_value.__min').text(ui.values[0]);
        $(_this).find('.range-slider_value.__max').text(ui.values[1]);
      }
    });
  });



  //****************************************************************************************************
  //
  // .. BASKET DELIVERY
  //
  //****************************************************************************************************
  $('.js-basket-delivery').change(function() {
    var value = $(this).val();
    $('.basket_delivery_i').hide();
    $('.basket_delivery_i.__' + value).fadeIn();
  });



  //****************************************************************************************************
  //
  // .. FORMS
  //
  //****************************************************************************************************
  $('.form').customForm(); // $('#checkbox').customForm() to init single element; $('body').customForm() to init all elements



  //****************************************************************************************************
  //
  // .. SCROLL TO
  //
  //****************************************************************************************************
  $('a[data-scroll="true"]').on('click touchend', function() {
    var       $this = $(this),
             anchor = $this.attr('href'),
        destination = $(anchor).offset().top;
    $('html, body').animate({scrollTop: destination}, 500);
    return false;
  });
  


  //****************************************************************************************************
  //
  // .. SLIDERS
  //
  //****************************************************************************************************
  $('.slider').each(function() {
    var _this = this;
    $(this).find('.slides').cycle({
      speed: 500,
      swipe: true,
      slides: '.slide'
    });
  });

  $('.slider.__promo').on('cycle-after', function(event, opts) {

    var rel = $(opts.slides[opts.currSlide]).find('a').data('rel');
    var bg  = $(opts.slides[opts.currSlide]).find('a').data('bg');

    $('.header_bg').find('.header_bg_i').hide();
    $('.header_bg').find('.header_bg_i[data-rel="' + rel + '"]').fadeIn();

    $('.promo').find('.promo_i').hide();
    $('.promo').find('.promo_i[data-rel="' + rel + '"]').fadeIn();

  });



  //****************************************************************************************************
  //
  // .. DIALOGS
  //
  //****************************************************************************************************
  $.arcticmodal('setDefault', {
    overlay: {
      css: {
        backgroundColor: '#000',
        opacity: .66
      }
    },
    openEffect: {
      speed: 200
    },
    closeEffect: {
      speed: 200
    }
  });
  //
  // .. Open dialog
  //
  $(document).on('click touchstart', '[data-dialog="true"]', function() {
    var url = $(this).data('url');
    $.arcticmodal('close');

    $.arcticmodal({
      type: 'ajax',
      url: url,
      afterOpen: function() {

      },
      afterLoadingOnShow: function() {
        $('.form').customForm();
        $('.form_text.__phone').mask('+7 (999) 999-99-99');
      }
    });

    return false;
  });

  //
  // .. Close dialog
  //
  $(document).on('click touchend', '.js-dialog_close', function() {
    $.arcticmodal('close');
  });



  //****************************************************************************************************
  //
  // .. ACCOUNTING
  //
  //****************************************************************************************************
  accounting.settings = {
    currency: {
      decimal: '.',
      thousand: ' ',
      precision: 0
    },
    number: {
      decimal : '.',
      thousand: ' ',
      precision: 0
    }
  }
  //
  // .. Number
  //
  $('.format-number').each(function() {
    var
      number = parseInt($(this).text()),
      formatNumber = accounting.formatNumber(number);

    $(this).text(formatNumber);
  });

  //
  // .. Money
  //
  $('.format-money').each(function() {
    var c = accounting.settings.currency;

    if ($(this).hasClass('__rub')) {
      c.format = '%v';
    } else if ($(this).hasClass('__usd')) {
      c.symbol = '$';
      c.format = '%s%v';
    } else if ($(this).hasClass('__eur')) {
      c.symbol = '€';
      c.format = '%s%v';
    }

    var
      number = parseFloat($(this).text()),
      formatMoney = accounting.formatMoney(number);



    if ($(this).hasClass('__rub')) {
      $(this).text(formatMoney).append('&nbsp;<span>руб.</span>');
    } else {
      $(this).text(formatMoney);
    }
  });



  //****************************************************************************************************
  //
  // .. SCROLL
  //
  //****************************************************************************************************
  $(window).scroll(function() {});



  //****************************************************************************************************
  //
  // .. RESIZE
  //
  //****************************************************************************************************
  $(window).smartresize(function() {

  });
  
});



//****************************************************************************************************
//
// .. LOAD
//
//****************************************************************************************************
$(window).load(function() {});