function button() {
    const buttons = document.querySelector('.btn');
    var timeoutId;
    window.addEventListener('scroll', function() {
        buttons.style.visibility = 'hidden';
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            buttons.style.visibility = 'visible';
        }, 500);
    });
    document.getElementById('switch-theme').addEventListener('click', function() {
        switchTheme();
    });
    const menuButton = document.getElementById('btn-menu');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            menuOpener();
        });
    }
    document.querySelector('.btn-scroll-top').addEventListener('click', function() {
        document.documentElement.scrollTop = 0;
    });
    if (document.querySelector('span.post-comment-notloaded')) {
        document.querySelector('span.post-comment-notloaded').addEventListener('click', loadComment);
    }
}
function getCurrentTheme() {
    let currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'auto') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
        return currentTheme === 'dark' ? 'dark' : 'light';
    }
}
function menuOpener() {
    const menu = document.querySelector('.sidebar-mobile');
    if (menu) {
        if (menu.style.display === 'none') {
            menu.setAttribute('style', 'display: flex;');
        } else {
            menu.setAttribute('style', 'display: none;');
        }
    }
}
function switchTheme() {
    let currentTheme = getCurrentTheme();
    let domTheme = document.body.getAttribute('data-theme');
    const needAuto = document.body.getAttribute('data-theme-auto') === 'true';
    let systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (domTheme === 'auto') {
        document.body.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
        localStorage.setItem('fuji_data-theme', currentTheme === 'light' ? 'dark' : 'light');
    } else if (domTheme === 'light') {
        const tar = systemTheme === 'dark' ? needAuto ? 'auto' : 'dark' : 'dark';
        document.body.setAttribute('data-theme', tar);
        localStorage.setItem('fuji_data-theme', tar);
    } else {
        const tar = systemTheme === 'light' ? needAuto ? 'auto' : 'light' : 'light';
        document.body.setAttribute('data-theme', tar);
        localStorage.setItem('fuji_data-theme', tar);
    }
    let commentArea = document.querySelector('.post-comment');
    if (commentArea) {
        if (document.querySelector('span.post-comment-notloaded').getAttribute('style')) {
            if (commentArea.getAttribute('data-comment') === 'utterances') {
                updateUtterancesTheme(document.querySelector('.post-comment iframe'));
            }
            if (commentArea.getAttribute('data-comment') === 'disqus') {
                DISQUS.reset({
                    reload: true
                });
            }
        }
    }
}
function updateUtterancesTheme(utterancesFrame) {
    let targetTheme = getCurrentTheme();
    if (utterancesFrame) {
        if (targetTheme === 'dark') {
            utterancesFrame.contentWindow.postMessage({
                type: 'set-theme',
                theme: 'photon-dark'
            }, 'https://utteranc.es');
        } else {
            utterancesFrame.contentWindow.postMessage({
                type: 'set-theme',
                theme: 'github-light'
            }, 'https://utteranc.es');
        }
    }
}
function header() {
    const header1 = document.querySelector('header'), headerHeight = header1.clientHeight;
    let currentPosition = 0, lastPosition = 0;
    document.addEventListener('scroll', function() {
        currentPosition = window.scrollY;
        if (currentPosition > headerHeight && currentPosition > lastPosition) {
            header1.style.visibility = 'hidden';
        } else {
            header1.style.visibility = 'visible';
        }
        lastPosition = currentPosition;
    });
}
document.addEventListener('DOMContentLoaded', function() {
    if (typeof mediumZoom === 'function') {
        mediumZoom('.img-zoomable', {
            margin: 32,
            background: '#00000054',
            scrollOffset: 128
        });
    }
});
button();
header();
