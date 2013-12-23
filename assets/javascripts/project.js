$(function() {

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
  // .. JQUERY UI TABS
  //
  //****************************************************************************************************
  $('.tabs').tabs();



  //****************************************************************************************************
  //
  // .. DOUBLE HOVER
  //
  //****************************************************************************************************
  doubleHover('a.double-hover', 'hover');



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
  $('.slider').find('.slides').cycle({
    speed: 500,
    swipe: true,
    timeout: 0,
    slides: '.slide'
  });

  $('.slider.__promo').on('cycle-after', function(event, opts) {
    $('.header').css({backgroundImage: 'url(/assets/images/promo/bg_0' + opts.slideNum + '.png)'});
  });



  //****************************************************************************************************
  //
  // .. DIALOGS
  //
  //****************************************************************************************************
  //
  // .. Open dialog
  //
  $('[data-dialog]').on('click touchend', function() {
    var $this = $(this),
           id = $this.data('dialog');
    $.arcticmodal({
      type: 'ajax',
      url: '/views/dialogs/_' + id + '.html'
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
      $(this).text(formatMoney).append('&nbsp;<i class="fa fa-ruble"></i>');
    } else {
      $(this).text(formatMoney);
    }
  });



  //****************************************************************************************************
  //
  // .. LOAD
  //
  //****************************************************************************************************
  $(window).load(function() {});



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