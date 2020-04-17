jQuery(document).ready(function ($) {
    $('.layout-drawer').on('click', '#drawer-handle', function(){
        $('.layout-drawer').toggleClass('drawer-close')
        if($('.layout-drawer').hasClass("drawer-close")){
            setCookie('hideNav', 'true')
        } else {
            setCookie('hideNav', 'false')
        }
    })
})
