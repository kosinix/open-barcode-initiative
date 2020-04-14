jQuery(document).ready(function ($) {
    var hideNav = getCookie('hideNav')
    console.log(hideNav,typeof hideNav)

    
    $('.layout-drawer').on('click', '#drawer-handle', function(){
        $('.layout-drawer').toggleClass('drawer-close')
        if($('.layout-drawer').hasClass("drawer-close")){
            setCookie('hideNav', 'true')
        } else {
            setCookie('hideNav', 'false')
        }
    })
})
