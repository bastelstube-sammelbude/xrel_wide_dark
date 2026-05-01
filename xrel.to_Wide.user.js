// ==UserScript==
// @name         xrel.to Wide
// @namespace    https://github.com/bastelstube-sammelbude/xrel_wide_dark
// @version      0.11
// @description  Apply custom styles to xrel.to and show full text in dirname-truncated elements
// @author       blAde
// @match        https://www.xrel.to/*
// @match        https://xrel.to/*
// @grant        GM_addStyle
// @run-at       document-end
// @downloadURL	 https://github.com/bastelstube-sammelbude/xrel_wide_dark/raw/master/xrel.to_Wide.user.js
// @updateURL    https://github.com/bastelstube-sammelbude/xrel_wide_dark/raw/master/xrel.to_Wide.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Apply all custom CSS styles
    const style = `
        html {
            background: #f2f2f2 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABtgAAAABCAMAAABjelp7AAAALVBMVEXc3Nze3t7f39/j4+Pk5OTo6Ojr6+vt7e3u7u7w8PDx8fHy8vLz8/P+/v7///9q6wN+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE8GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDMgNzkuOTY5MGE4NywgMjAyNS8wMy8wNi0xOToxMjowMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjYtMDQtMzBUMTg6NTk6MDcrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI2LTA0LTMwVDE5OjAwOjAxKzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI2LTA0LTMwVDE5OjAwOjAxKzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMzc2MDc2My05NzllLTRiNGYtOWFlNS0xY2E1ZjAwMzMxYjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzM3NjA3NjMtOTc5ZS00YjRmLTlhZTUtMWNhNWYwMDMzMWI3IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MzM3NjA3NjMtOTc5ZS00YjRmLTlhZTUtMWNhNWYwMDMzMWI3Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozMzc2MDc2My05NzllLTRiNGYtOWFlNS0xY2E1ZjAwMzMxYjciIHN0RXZ0OndoZW49IjIwMjYtMDQtMzBUMTg6NTk6MDcrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNi4xMSAoV2luZG93cykiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+i0GnIQAAAC9JREFUOBHtwcENACAMA7FLv4j99+RPwxYIpNgavEyADdu4aU9ERETctaqQKBUfOJvrCQ1+9HZqAAAAAElFTkSuQmCC) repeat-y top center;
        }
        #bottom, .xrel_header, .nfo_title, .nav_subcats, .mediathek_toolbar {
            background-size: cover;
        }
        .layout_width {
            width: 1400px;
        }
        .plot_frame {
            width: 920px;
        }
        #middle_spawn, .mediathek_toolbar, .mediathek_frame {
            width: 1150px;
        }
        .mediathek_overlay {
            width: 1068px;
        }
        .mediathek_content_frame {
            width: 1058px;
        }
        #top_bar {
            width: 1370px;
        }
        #jumpToTopLink {
            left: 1340px;
        }
        #favs_button {
            margin-left: 440px;
        }
        #TAtext {
            width: 1110px !important;
        }
        #searchAutoComplete {
            margin: 40px 0 0 960px;
        }
        .comment_item_big {
            width: 1010px;
        }
        .release_item {
            width: 1140px;
        }
        .release_title {
            width: 670px;
        }
        .release_grp {
            width: 160px;
        }
        .release_comments {
            width: 60px;
        }
        .release_title_p2p {
            width: 740px;
        }
        div.dirname-truncated > span {
            display: inline !important;
            background: none;
        }
        #rls_filter_box {
            margin: 25px 0 0 988px;
        }
        #fav_add {
            margin-left: 1031px;
        }
        .release_grp a {
            white-space: normal !important;
            overflow: visible !important;
            text-overflow: clip !important;
        }
        #middle {
            width: 900px;
        }
        #middle_right {
            float: right;
        }
        .board_forum {
            width: 1150px;
        }
        .mid_tab_bar {
            width: 1130px;
            height: 29px;
        }
        .below_mid_tab_bar_content {
            width: 1150px;
        }
        .calendar_frame {
            margin: auto;
        }
        a:link {
            font-weight: bold;
        }
        a:visited {
            font-weight: bold;
        }
        #nfo-view-dirname {
            max-width: 980px;
        }
        div.middlespawn div.article {
            width: 1140px;
        }
		.horiz_line {
			height: 1px;
		}
		.blog_overview_btm_small {
            background: #FFFFFF url(/static/img/bg/blogs_btm_small.jpg) repeat;
            width: 900px;
		}
		.article {
            width: 900px;
		}
    `;

    GM_addStyle(style);

    // Function to process dirname-truncated elements
    function processDirnameTruncated() {
        const dirnameElements = document.querySelectorAll('div.dirname-truncated');

        dirnameElements.forEach(element => {
            const spans = element.querySelectorAll('span');

            spans.forEach(span => {
                // Remove the display: none style and any other inline styles
                span.style.display = '';
                span.removeAttribute('style');
            });
        });
    }

    // Function to process release_grp elements to show full titles
    function processReleaseGrp() {
        const releaseGrpElements = document.querySelectorAll('div.release_grp');

        releaseGrpElements.forEach(element => {
            const links = element.querySelectorAll('a');

            links.forEach(link => {
                // Ensure the link shows full text instead of truncated version
                if (link.title && link.textContent) {
                    // If the text is truncated, use the title attribute as the display text
                    if (link.textContent.trim().endsWith('...')) {
                        link.textContent = link.title;
                    }
                }

                // Apply styles to ensure full text display
                link.style.whiteSpace = 'normal';
                link.style.overflow = 'visible';
                link.style.textOverflow = 'clip';
            });
        });
    }

     // Modify the specific div width
    function modifyMiddleFrame() {
        const middleFrame = document.getElementById('middle_frame');
        if (middleFrame) {
            const middleSpawn = middleFrame.querySelector('.middle_spawn');
            if (middleSpawn) {
                const innerDiv = middleSpawn.querySelector('div[style*="width:710px"]');
                if (innerDiv) {
                    innerDiv.style.width = '1150px';
                }
            }
        }
    }

    // Initial processing
    processDirnameTruncated();
    processReleaseGrp();
    modifyMiddleFrame();

    // Watch for new elements that might be added dynamically
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        if (node.classList && node.classList.contains('dirname-truncated')) {
                            processDirnameTruncated();
                        }
                        if (node.classList && node.classList.contains('release_grp')) {
                            processReleaseGrp();
                        }

                        // Check for nested elements
                        const dirnameElements = node.querySelectorAll && node.querySelectorAll('div.dirname-truncated');
                        if (dirnameElements.length > 0) {
                            processDirnameTruncated();
                        }

                        const releaseGrpElements = node.querySelectorAll && node.querySelectorAll('div.release_grp');
                        if (releaseGrpElements.length > 0) {
                            processReleaseGrp();
                        }
                    }
                });
            }
        });
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Also add a small delay to ensure DOM is fully loaded
    setTimeout(() => {
        processDirnameTruncated();
        processReleaseGrp();
    }, 1000);
})();
