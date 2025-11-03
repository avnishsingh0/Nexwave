var $form = $(".contact-form");

$.validator.addMethod("letters", function(value, element) {
  return this.optional(element) || value == value.match(/^[a-zA-Z\s]*$/);
});
$.validator.addMethod("numberV", function(value, element) {
  return this.optional(element) || iti.isValidNumber();
});

$form.each(function(){
    var Mainform = $(this);
    var formAt = Mainform.attr('data-form');
    var submitbtn = Mainform.find('button[type=submit]');
    var submitbtntext = Mainform.find('button[type=submit] span').text();
    $form.validate({
      rules: {
        name: {
          required: true,
          minlength: 3,
          letters: true
        },
        email: {
          required: true,
          email: true
        },
        imlookingfor: "required",
        imfrom: "required",
        agree: "required",
        phone: {
          digits: true,
          required: true
        },
      },
      messages: {
        name: "Please specify your name (only letters and spaces are allowed)",
        email: "Please specify a valid email address"
      },
      submitHandler: function() {
        var fr =  Mainform.serialize();
        // var data = new FormData(fr)
        var phnumber = `${Mainform.find('select[name=countrycode]').val()}-${Mainform.find('input[name=phone]').val()} `
        // data.append('phone', phnumber);
  
        $.ajax({
            method: "post",
            url: 'assets/php/enquiry.php',
            data: fr,
            beforeSend: function(){
                submitbtn.addClass('loading');
                submitbtn.prop('disabled', true);
                submitbtn.find('span').text('Please Wait');
            },
            success: function(res){
                submitbtn.removeClass('loading');
                submitbtn.prop('disabled', false);
                submitbtn.find('span').text(submitbtntext);
                Mainform.find('.thk').fadeIn();
                console.log(Mainform.find('.thk'), "cdd");
                setTimeout(() => {
                  Mainform.find('.thk').fadeOut();
                  Mainform[0].reset();
                }, 2000);
            },
            error: function(res){

            }
        })
      }
    });
})

function renderSuccess(btn, res, type){
    var st = `
    <div class="${type=="success"?"success-bar":"error-bar"} state-bar">${res}</div>
    `;
    btn.parent().append(st)
    setTimeout(() => {
        btn.parent().find('.state-bar').fadeOut('slow', function(){
            btn.parent().find('.state-bar').remove()
        })
    }, 1500);
}