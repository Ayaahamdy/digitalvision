// Page Scroll
jQuery(document).ready(function($) {
    $('li a').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') ||
            location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            console.log(target);
            console.log(target.selector);
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 100
                }, 1000);
                if (target.selector == '#contact') {
                    console.log('run expand');
                    setTimeout(function() {
                        $('#collapseThree').addClass('in');
                        $('#id-1').removeClass('collapsed');

                    }, 400);
                }
                return false;
            }
        }
    });

});


//form validation
$('#myform').submit(function(ev) {
    var form = $('#myform');
    var nameform = $('#name');
    var emailform = $('#email');
    var subjectform = $('#subject');
    var filter = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var messform = $('#message');





    if (messform.val().length > 300 || messform.val() < 3) {
        alert("Your message cannot exceed 300 letters or be less than 3 letters!");
        ev.preventDefault();
        subjectform.focus();
        return false;

    }


    var formdata = {
        name: nameform.val(),
        email: emailform.val(),
        subject: subjectform.val(),
        message: messform.val()
    };

    //use ajax to submit form data through it instead to be submitted by form
    $.ajax({
        url: '/contact.aspx',
        type: "POST",
        //dataType: 'json',
        data: formdata,
        error: function(err) {
            console.log(err);
            alert('Oops, something went wrong. Please try again');
            setfocus();
        },
        success: function(data) {
            console.log(data);
            alert('Congrats! Your message was sent successfully!');
            clearform(formdata);
            collapse();
        }

    });
    ev.preventDefault();
    return false;

    //clear data from form after submission success
    function clearform(formdata) {
        $('#name').val('');
        $('#email').val('');
        $('#subject').val('');
        $('#message').val('');
    }
    //close form after submission
    function collapse() {
        $('#collapseThree').removeClass('in');

    }
    //return to form beginning incase of submission error
    function setfocus() {
        $('#name').focus();
    }

});