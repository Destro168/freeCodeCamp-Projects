$(document).ready(function () {

    // Lightbox code.
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });

    /* Click buttons for additional data links */
    $("#btn_linkedin").click(function() {
        window.open('https://www.linkedin.com/in/darsd/', '_blank');
        return;
    });

    $("#btn_freeCodeCamp").click(function() {
        window.open('https://www.freecodecamp.org/donald', '_blank');
        return;
    });

    $("#btn_github").click(function() {
        window.open('https://github.com/Destro168', '_blank');
        return;
    });

    /*
        Form related code.
    */

    // Get the form.
    var form = $('#ajax-contact');

    // Get the messages div.
    var formMessages = $('#form-messages');
    
    function hideFormSubmissionText() {
        $('#submit_error').hide(100);
        $('#submit_success').hide(100);
    }

    hideFormSubmissionText();

    // Set up an event listener for the contact form.
    $(form).submit(function (event) {
        // Stop the browser from submitting the form.
        event.preventDefault();

        // Always make sure form submission text is hidden.
        hideFormSubmissionText();

        // Serialize the form data.
        var formData = $(form).serialize();

        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');

                // Set the message text.
                $(formMessages).text(response);

                // Clear the form.
                $('#name').val('');
                $('#email').val('');
                $('#message').val('');

                // Display toastr success message to user.
                toastr.info('Email Sent - Thank you for contacting me, I will respond within 24 hours.');
                $('#exampleModal').modal('hide');
            })
            .fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                $('#submit_error').show(100);
                setTimeout(hideFormSubmissionText, 10000);

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text(
                        'Oops! An error occured and your message could not be sent.');
                }
            });

        return false;
    });
});
