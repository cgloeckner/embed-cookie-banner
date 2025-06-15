# embed-cookie-banner

Dependecy: jQuery

All embeds (`iframe` and `embed`) will be redirected to a custom cookie info. If the cookie-banner is consented, they'll be reset to their original sources.

## 1. Create Custom Cookie Info and Banner Files

Example Cookie Info:
```html
This embed has been disabled because not all cookies were consented.
```

Example Cookie Banner:
```html
We do not use cookies ourselves but the embedded players do. If you want to use them, please consent all cookies. Accepting essential cookies will disable the players.<br>
<button onClick="window.parent.on_cookie_decline()">Accept Essential Only</button>
<button onClick="window.parent.on_cookie_consent()">Accept All Cookies</button>
See <a href="/privacy" target="_top">Privacy Notes</a> for further details.
```

## 2. Include embed-handler

Add to each of your pages' headers:
```html
<script src="path-to-embed-handler.js"></script>
```
(copy it to your server manually, use a git submodule or anything else)

Make sure to call the page checker as the document is ready:
```javascript
$(document).ready(function() {
    on_page_load('path-to-info.html', 'path-to-banner.html')
})
```

## 3. Style your #cookiebanner

Like
```css
#cookiebanner {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 80px;
    border: none;
    z-index: 100;
}
```