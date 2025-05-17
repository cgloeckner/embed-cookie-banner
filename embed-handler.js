/// Get cookie value for key (or null if not set)
function get_cookie(key) {
    let delimiter = `${key}=`
    let value = document.cookie
        .split('; ')
        .find(row => row.startsWith(delimiter))
    return value ? value.split('=')[1] : null
}

/// Set cookie key-value pair for some days (default: 10 years) and the given path
function set_cookie(key, value, days=3650, path='/') {
    let expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expires}; path=${path}`;
}

/// Disable an iframe by replacing its source with a placeholder URL
function disable(iframe, dummy_url) {
    iframe.setAttribute('data-src', iframe.src)
    iframe.src = dummy_url
}

/// Enable an iframe by restoring its original source attribute
function enable(iframe) {
    let src = iframe.getAttribute('data-src')
    if (src) {
        iframe.src = src
    }
}

/// Disable embeds if no cookies were consent yet (trigger cookie banner if necessary)
function on_page_load(dummy_url, cookie_url) {
    let consent = get_cookie('cookie_consent')
    
    switch (consent) {
        case true:
            console.log('cookies were consented')
            break
        
        case null:
            // show cookie banner
            console.log('asking for cookie consent')
            show_cookie_banner(cookie_url)

        case false:
            console.log('disabling embeds')
            // disable all iframes
            $('iframe').each(function(index, iframe) {
                disable(iframe, dummy_url)
            })
            break
    }
}

/// Show cookie banner
function show_cookie_banner(cookie_url) {
    let iframe = $('<iframe>', {
        src: cookie_url,
        id: 'cookiebanner',
        css: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100vw',
            height: '80px',
            border: 'none',
            'z-index': 10000
        }
    })
    $('body').append(iframe)
}

///
function on_cookie_consent() {
    set_cookie('cookie_consent', true)
    // enable all iframes
    $('iframe').each(function(index, iframe) {
        enable(iframe)
    })
    $('#cookiebanner').remove()
}

function on_cookie_decline() {
    set_cookie('cookie_consent', false)
    $('#cookiebanner').remove()
}
