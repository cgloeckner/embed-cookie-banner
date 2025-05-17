# embed-cookie-banner

Dependecy: jQuery

All embeds (iframes) will be redirected to a custom cookie info. If the cookie-banner is consented, they'll be reset to their original sources.

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
```

## 2. Include embed-handler

Add to each of your pages' headers:
```html
<script src="path-to-the-embed-handler.js"></script>
```
```javascript
$(document).ready(function() {
    on_page_load('path-to-info.html', 'path-to-banner.html')
})
```
