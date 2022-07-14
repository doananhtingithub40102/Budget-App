import $ from "jquery"

function scrollToSpecificElementById(specId) {
    $('html, body').animate({
        scrollTop: $(specId).offset().top
    }, 100);
}

export { scrollToSpecificElementById }