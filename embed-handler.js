/// Get cookie value for key (or null if not set)
function get_cookie(key) {
    let delimiter = `${key}=`
    let value = document.cookie
        .split('; ')
        .find(row => row.startsWith(delimiter))
    return value ? value.split('=')[1] : null
}

/// Set cookie key-value pair for some days (default: 10 years) and the given path
function set_cookie(key, value, days, path) {
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
        case 'consent':
            console.log('cookies were consented')
            break
        
        case null:
            // show cookie banner
            console.log('asking for cookie consent')
            show_cookie_banner(cookie_url)

        case 'decline':
            console.log('disabling embeds')
            // disable all iframes
            $('iframe, embed').each(function(index, iframe) {
                disable(iframe, dummy_url)
            })
            break
    }
}

/// Show cookie banner
function show_cookie_banner(cookie_url) {
    $.get(cookie_url, function(html) {
        let div = $('<div>', {id: 'cookiebanner'}).html(html)
        $('body').append(div)
    })
}

///
function on_cookie_consent() {
    set_cookie('cookie_consent', 'consent', 365, '/')
    // enable all iframes
    $('iframe, embed').each(function(index, iframe) {
        enable(iframe)
    })
    $('#cookiebanner').remove()
}

function on_cookie_decline() {
    set_cookie('cookie_consent', 'decline', 365, '/')
    $('#cookiebanner').remove()
}
