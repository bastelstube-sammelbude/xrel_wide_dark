// ==UserScript==
// @name         xrel.to Wide and DARK
// @namespace    http://tampermonkey.net/
// @version      0.71
// @description  Apply custom styles to xrel.to and show full text in dirname-truncated elements
// @author       blAde
// @match        https://www.xrel.to/*
// @match        https://xrel.to/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Apply all custom CSS styles
    const style = `
        html {
            background: #3b3b3b url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABtgAAAABCAYAAABUpKpJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGjGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDMgNzkuOTY5MGE4NywgMjAyNS8wMy8wNi0xOToxMjowMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjYtMDQtMjJUMDc6MjY6MjArMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI2LTA0LTIyVDA3OjQzOjAwKzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI2LTA0LTIyVDA3OjQzOjAwKzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowZmRmNDRmNS1lN2JkLTBmNGMtYmM2My04MTZiYzllMGE5NjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ZTI5NzM1NDktMmQxNy1iZDQxLThmM2YtZGQwMDFhYWY4ZDNiIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZTI5NzM1NDktMmQxNy1iZDQxLThmM2YtZGQwMDFhYWY4ZDNiIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplMjk3MzU0OS0yZDE3LWJkNDEtOGYzZi1kZDAwMWFhZjhkM2IiIHN0RXZ0OndoZW49IjIwMjYtMDQtMjJUMDc6MjY6MjArMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNi4xMSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmE1N2U5OTdjLWFhYTktNWI0OS04NzkxLTVlMWRhNGYwNmU1ZCIgc3RFdnQ6d2hlbj0iMjAyNi0wNC0yMlQwNzo0Mjo1MiswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MGZkZjQ0ZjUtZTdiZC0wZjRjLWJjNjMtODE2YmM5ZTBhOTYzIiBzdEV2dDp3aGVuPSIyMDI2LTA0LTIyVDA3OjQzOjAwKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjYuMTEgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pg/8Mj8AAABjSURBVFhH7diLCcAwCEVRTQhZo3tk/znaNULIB4WGTlBauAfEp+ACainlFJFDgBfNOXdW1Z2NzSEE78+KMXrZba1VWmv7BgAAAAAAAADwPyklyTn737f3LmMM39ts+e7Ax1wLmXIjks7wuuQAAAAASUVORK5CYII=) repeat-y top center;
        }
        #bottom, .xrel_header, .nfo_title, .nav_subcats, .mediathek_toolbar {
            background-size: cover;
        }
        .layout_width {
            width: 1400px;
        }
        #nav_bottom {
            background: url(data:image/png;base64,R0lGODlhBQAyAIQYADQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj4/Pz8/Pz9AQEBAQEFBQUJCQkNDQ0NEREREREZGRkdHR0hISElJSf///////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAB8ALAAAAAAFADIAAAVboCKOZLmcDOM0bOO8cPzMdG1DOB7tu+T7k6BwSCkWK0ikZbm8OJ/QKHOZRBqLwwlvZ7PFHKlwKUEumxFo9GHNbhve8Li8QKcT7vi8fsDv+/8CgYEBhIWGAIiIIQA7) repeat-x center top;
            text-shadow: #333 0 1px 0;
            color: #ccc;
        }
		#global_fav_container {
			filter: invert(80%);
		}

		.fav_list_topic {
			color: #fff;
		}

		.fav_topic_opt_t {
			color: #f0f0f0 !important;
		}
		.nav_bottom_right .search_input {
			background: #fff0;
		}

		.nav_bottom_right .search_input > div input {
			border: 3px;
			color: #fff !important;
			background: #3b3b3b;
			border-color: #464646;
			border-radius: 5px;
			border-style: solid;
			border-width: 3px;
			box-shadow: 0 3px 3px rgba(0, 0, 0, .2) inset;
		}

		.nav_bottom_right .search_input > div {
			background: #fff0;
		}

		#searchAutoComplete {
			filter: invert(80%);
			color: #000;
		}

		.nav_bottom_right input.submit {
			filter: invert(80%);
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
            background-image: url("data:image/png;base64,R0lGODlhAQAfAMIGADc3Nzg4ODk5OTo6Ojs7O0pKSv///////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAcALAAAAAABAB8AAAMMCBrcLnBISeogt5YEADs=");
            text-shadow: 0 0px #000;
        }
        #language_box {
            background: #242424db;
            border: 1px solid #333;
        }
        .release_item:hover {
            background-color: rgba(10, 10, 10, 0.1);
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
            color: #89f1f6;
            font-weight: bold;
        }
        a:visited {
            color: #89f1f6;
            font-weight: bold;
        }
        #nfo-view-dirname {
            max-width: 980px;
        }
        div.std_filter_bg_right a:visited {
            color: #000000;
        }
        div.std_filter_bg_right a:link {
            color: #000000;
        }
        .search_result_releases {
            background-color: unset;
        }
        div.middlespawn div.article {
            width: 1140px;
        }
        div.fav_entry_text a:link {
            color: #760e09;
        }
        div.fav_entry_text a:visited {
            color: #760e09;
        }
        div.my-xrel-notification a:link {
            color: #760e09;
        }
        div.my-xrel-notification a:visited {
            color: #760e09;
        }
        div.blog_overview_btm_small a:link {
            color: #760e09;
        }
        div.blog_overview_btm_small a:visited {
            color: #760e09;
        }
        div.calendar_date_link.c_lnk_d_float1 a:link {
            color: #000000;
        }
        div.calendar_date_link.c_lnk_d_float1 a:visited {
            color: #000000;
        }
        div.calendar_date_link.c_lnk_d_float2 a:link {
            color: #000000;
        }
        div.calendar_date_link.c_lnk_d_float2 a:visited {
            color: #000000;
        }
        div.tippy-box {
            filter: invert(80%);
        }
        div.tippy-box a:link {
            color: #000000;
        }
        div.tippy-box a:visited {
            color: #000000;
        }
        div.sub_bar_active a:link {
            color: #000000;
        }
        div.sub_bar_active a:visited {
            color: #000000;
        }
        .eiTitleOdd {
            background-color: #000000;
        }
        .categoryListEntryOdd {
            background-color: #000000;
        }
		/* from xrel advanced dark */

		.release_updater {
			filter: invert(80%);
		}

		#rls_filter_selection {
			filter: invert(80%);
		}
		#rls_filter_box {
			background: #000000;
            color: #000000;
		}

		.release_odd {
			background: #292929;
		}

		.horiz_line {
			background: #4d4d4d;
			height: 1px;
		}

		.release_date {
			color: #fff;
		}

		.release_type {
			color: #fff;
		}

		.box1 {
			background: #464646;
		}

		.box_content {
			color: #fff;
			background: #242424;
		}

		.releases_bottom {
			filter: invert(80%);
		}

		#release-archive-popup {
			box-shadow: 1px 1px 10px #fff;
			filter: invert(80%);
		}

		.no-releases-msg {
			color: #9f9f9f;
		}

		#middle_spawn .article_cat + .horiz_line + div {
			background: #242424 !important;
		}

		#middle_spawn .horiz_line_dotted + div:not(.article_text):not(.comment_helpful_frame):not(.comment_links_frame) {
			background: #333232 !important;
		}

		/* Blogeintraege anpassen */

		.headline1_2 {
			color: #fff;
		}

		.article_text {
			color: #9f9f9f;
		}

		.blog_overview_btm_small {
			filter: invert(80%);
            background: #000 url(/static/img/bg/blogs_btm_small.jpg) repeat;
            width: 900px;
		}

		.blog_author_middle {
			color: #000;
		}

		/* Produktinfo anpassen */

		#extinfo_title h3, h2 {
			color: #fff;
		}

		#fav_add {
			filter: invert(80%);
		}

		#fav_add_list {
			filter: invert(80%);
		}

		table.bb_table th {
			color: #000;
			filter: invert(80%);
			border: 1px solid #6a6a6a;
		}

		table.bb_table td {
			background: #333232;
			border: 1px solid #6a6a6a;
		}

		.sub_bar_active {
			filter: invert(80%);

		}

		.sub_bar_active2 {
			filter: invert(80%);
		}

		.sub_bar {
			background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QP4RXhpZgAASUkqAAgAAAAHABIBAwABAAAAAQAAABoBBQABAAAAYgAAABsBBQABAAAAagAAACgBAwABAAAAAgAAADEBAgANAAAAcgAAADIBAgAUAAAAgAAAAGmHBAABAAAAlAAAAKYAAAAsAQAAAQAAACwBAAABAAAAR0lNUCAyLjEwLjI0AAAyMDIxOjA4OjA5IDE4OjUyOjE4AAEAAaADAAEAAAABAAAAAAAAAAgAAAEEAAEAAAAJAAAAAQEEAAEAAAAAAQAAAgEDAAMAAAAMAQAAAwEDAAEAAAAGAAAABgEDAAEAAAAGAAAAFQEDAAEAAAADAAAAAQIEAAEAAAASAQAAAgIEAAEAAADdAgAAAAAAAAgACAAIAP/Y/+AAEEpGSUYAAQEAAAEAAQAA/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgBAAAJAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A4yisjzpf+ej/APfRo86X/no//fRoANo9KNo9KdijFACZozRRQAYNGDTqKAEooooAKKKKACijFGKAFooooAKKWigAooopAFFFFABijFLRQAUUUUAFFFFABRV77PF/d/U0fZ4v7v6mgCWiiigD/9kA/+EMd2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOmM4MjI4ZDA4LThkYTUtNDFiZC04YTkwLTEzYTc4NDUxMmRiOSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1ZmRkMWI2ZS1jNzI4LTQwZGYtYWRhOC1lM2QzNzZjMDNjNTUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyYzcwMTRiNC1lZmQ5LTRmOTktOWRiYi03YTRlMThiZmUyNTEiIGRjOkZvcm1hdD0iaW1hZ2UvanBlZyIgR0lNUDpBUEk9IjIuMCIgR0lNUDpQbGF0Zm9ybT0iTGludXgiIEdJTVA6VGltZVN0YW1wPSIxNjI4NTI3OTQ0MzcyMTUyIiBHSU1QOlZlcnNpb249IjIuMTAuMjQiIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0OmNoYW5nZWQ9Ii8iIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTk5YzMyYmItNTZlNS00YzMzLTg1YjUtZjA3NDA0NjdhNWQ5IiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKExpbnV4KSIgc3RFdnQ6d2hlbj0iMjAyMS0wOC0wOVQxODo1MjoyNCswMjowMCIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/iArBJQ0NfUFJPRklMRQABAQAAAqBsY21zBDAAAG1udHJSR0IgWFlaIAflAAgACQAQADIALGFjc3BBUFBMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD21gABAAAAANMtbGNtcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADWRlc2MAAAEgAAAAQGNwcnQAAAFgAAAANnd0cHQAAAGYAAAAFGNoYWQAAAGsAAAALHJYWVoAAAHYAAAAFGJYWVoAAAHsAAAAFGdYWVoAAAIAAAAAFHJUUkMAAAIUAAAAIGdUUkMAAAIUAAAAIGJUUkMAAAIUAAAAIGNocm0AAAI0AAAAJGRtbmQAAAJYAAAAJGRtZGQAAAJ8AAAAJG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAJAAAABwARwBJAE0AUAAgAGIAdQBpAGwAdAAtAGkAbgAgAHMAUgBHAEJtbHVjAAAAAAAAAAEAAAAMZW5VUwAAABoAAAAcAFAAdQBiAGwAaQBjACAARABvAG0AYQBpAG4AAFhZWiAAAAAAAAD21gABAAAAANMtc2YzMgAAAAAAAQxCAAAF3v//8yUAAAeTAAD9kP//+6H///2iAAAD3AAAwG5YWVogAAAAAAAAb6AAADj1AAADkFhZWiAAAAAAAAAknwAAD4QAALbEWFlaIAAAAAAAAGKXAAC3hwAAGNlwYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR8AABMzQAAmZoAACZnAAAPXG1sdWMAAAAAAAAAAQAAAAxlblVTAAAACAAAABwARwBJAE0AUG1sdWMAAAAAAAAAAQAAAAxlblVTAAAACAAAABwAcwBSAEcAQv/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/CABEIABsAAQMBEQACEQEDEQH/xAAXAAADAQAAAAAAAAAAAAAAAAADBAYJ/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAP/2gAMAwEAAhADEAAAAc5gQxNdn//EABkQAQACAwAAAAAAAAAAAAAAAAADEQQTFP/aAAgBAQABBQLbOpTjx3//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAEDAQE/AR//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAECAQE/AR//xAAbEAABBAMAAAAAAAAAAAAAAAACAAMz0hCTov/aAAgBAQAGPwKZ7cdsx9HZf//EABcQAAMBAAAAAAAAAAAAAAAAAAAQIfD/2gAIAQEAAT8hL2Rl/wD/2gAMAwEAAgADAAAAEBAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAwEBPxAf/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAgEBPxAf/8QAHBAAAQMFAAAAAAAAAAAAAAAAABARYXGRodHh/9oACAEBAAE/EAG+btlWOp9//9k=) repeat-x;
		}

		.extinfo_box_date {
			background: #292929;
		}

		.mediathek_top {
			filter: invert(80%);
		}

		.mediathek_bottom {
			filter: invert(80%);
		}

		.middle_extinfo_news {
			color: #9f9f9f;
		}

		.featherlight .featherlight-content {
			background: #333232;
		}
		.featherlight .featherlight-close-icon {
			background: #4f4e4ecc;
		}

		.span_padding {
			color: #9f9f9f;
		}

		.span_padding sub {
			color: #9f9f9f;
		}

		.nfo_scaling {
			background: #464646;
		}

		/* Top100 */

		.extinfo_top_title {
			background: none;
		}

		.extinfo_top_title div.tab_active {
			filter: invert(80%);
		}

		.extinfo_top_subtitle {
			filter: invert(83%);
		}

		.extinfo_top_list {
			filter: invert(82%);
		}

		.extinfo_top_list_entry {
			background: none;
		}

		.extinfo_top_list_entry_odd, .extinfo_awaited_entry_even {
			background-color: #292929 !important;
		}

		.extinfo_top_list_entry .nr, .extinfo_awaited_entry .nr {
			color: #9b9b9b;
		}

		.extinfo_top_list_content {
			background: none;
			border-bottom: 1px solid #606060;
		}

		.extinfo_top_description {
			filter: invert(80%);
		}

		/* awaited */

		div.table-head {
			filter: invert(80%);
		}

		div.table-row > div.w10, div.table-head > div.w10 {
			color: #828282;
		}

		/* TV */

		.series_content {
			background: #242424;
		}

		/* Trailer */

		h3.trailers_headline {
			color: #fff;
		}

		div.trailers_new {
			filter: invert(80%);
		}

		/* Board */

		.board_forum_postcount {
			color: #9a9a9a;
		}

		.comment_odd {
			background-color: #333232;
		}

		.headline2 a:link, .headline2 a:visited {
			color: #9a9a9a;
		}

		.comment_helpful_frame {
			color: #fff;
		}

		.editor_frame {
			background: #333232;
		}

		.textarea {
			background: #3b3b3b;
		}

		textarea.textarea, .inputlike {
			border-color: #464646;
			color: #fff;
		}

		.emoticon-popup {
			border: 1px solid #464646;
			background: #333232;
		}

		/* Buttons */

		input[type="reset"], input[type="submit"], input[type="button"], button[type="button"] {
			filter: invert(80%);
		}

		/* Settings */

		.article {
			color: #9a9a9a;
            width: 900px;
		}

		input[type="text"], input[type="password"], input[type="date"], input[type="url"], input[type="email"], textarea.textarea, .inputlike {
			border-color: #464646;
			background: #333232;
			color: #fff;
		}

		.plot_frame {
			color: #fff;
		}

		.button_expand {
			background-color: #3b3b3b;
			border: #464646 solid 1px;
			color: #fff;
		}

		div.table-row > div.w90, div.table-head > div.w90 {
			color: #fff;
		}

		/* wiki rss api */

		.bb_quote, .bb_box {
			background: #333232;
		}

		.headline3 a {
			color: #fff;
		}

		/* quickcheck */

		.page-releases-quickcheck #raw-input {
			background: #333232;
			border: #464646 solid 1px;
		}

		/* p2p NFO Post*/

		#p2p-nfo-post-bar-step1 {
			filter: invert(80%);
		}

		#p2p-nfo-post-bar-step2 {
			filter: invert(80%);
		}

		#p2p-nfo-post-bar-step3 {
			filter: invert(80%);
		}

		#p2p-nfo-post-bar-step4 {
			filter: invert(80%);
		}

		.wizard-steps {
			background: none;
			border-bottom: 1px solid #606060;
		}

		.wizard-step-contents .label {
			color: #fff;
		}

		.p2p-nfo-post-time {
			color: #fff;
		}

		.checkbox_label {
			color: #fff;
		}

		/* bottom menue*/

		#bottom_sitemap {
			background: none;
		}

		.bb-mediainfo-section-header > .bb-mediainfo-title a {
		  color: #cecece;
		}

		.rlslanguagelabel {
		  color: #9f9f9f;
		}

		/* new Startpage Update 2023 */

		.box1, .modern_box {
		  background: #464646;
		}

		.below_mid_tab_bar_content {
		  background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QP4RXhpZgAASUkqAAgAAAAHABIBAwABAAAAAQAAABoBBQABAAAAYgAAABsBBQABAAAAagAAACgBAwABAAAAAgAAADEBAgANAAAAcgAAADIBAgAUAAAAgAAAAGmHBAABAAAAlAAAAKYAAAAsAQAAAQAAACwBAAABAAAAR0lNUCAyLjEwLjI0AAAyMDIxOjA4OjA5IDE4OjUyOjE4AAEAAaADAAEAAAABAAAAAAAAAAgAAAEEAAEAAAAJAAAAAQEEAAEAAAAAAQAAAgEDAAMAAAAMAQAAAwEDAAEAAAAGAAAABgEDAAEAAAAGAAAAFQEDAAEAAAADAAAAAQIEAAEAAAASAQAAAgIEAAEAAADdAgAAAAAAAAgACAAIAP/Y/+AAEEpGSUYAAQEAAAEAAQAA/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgBAAAJAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A4yisjzpf+ej/APfRo86X/no//fRoANo9KNo9KdijFACZozRRQAYNGDTqKAEooooAKKKKACijFGKAFooooAKKWigAooopAFFFFABijFLRQAUUUUAFFFFABRV77PF/d/U0fZ4v7v6mgCWiiigD/9kA/+EMd2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOmM4MjI4ZDA4LThkYTUtNDFiZC04YTkwLTEzYTc4NDUxMmRiOSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1ZmRkMWI2ZS1jNzI4LTQwZGYtYWRhOC1lM2QzNzZjMDNjNTUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyYzcwMTRiNC1lZmQ5LTRmOTktOWRiYi03YTRlMThiZmUyNTEiIGRjOkZvcm1hdD0iaW1hZ2UvanBlZyIgR0lNUDpBUEk9IjIuMCIgR0lNUDpQbGF0Zm9ybT0iTGludXgiIEdJTVA6VGltZVN0YW1wPSIxNjI4NTI3OTQ0MzcyMTUyIiBHSU1QOlZlcnNpb249IjIuMTAuMjQiIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0OmNoYW5nZWQ9Ii8iIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTk5YzMyYmItNTZlNS00YzMzLTg1YjUtZjA3NDA0NjdhNWQ5IiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKExpbnV4KSIgc3RFdnQ6d2hlbj0iMjAyMS0wOC0wOVQxODo1MjoyNCswMjowMCIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/iArBJQ0NfUFJPRklMRQABAQAAAqBsY21zBDAAAG1udHJSR0IgWFlaIAflAAgACQAQADIALGFjc3BBUFBMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD21gABAAAAANMtbGNtcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADWRlc2MAAAEgAAAAQGNwcnQAAAFgAAAANnd0cHQAAAGYAAAAFGNoYWQAAAGsAAAALHJYWVoAAAHYAAAAFGJYWVoAAAHsAAAAFGdYWVoAAAIAAAAAFHJUUkMAAAIUAAAAIGdUUkMAAAIUAAAAIGJUUkMAAAIUAAAAIGNocm0AAAI0AAAAJGRtbmQAAAJYAAAAJGRtZGQAAAJ8AAAAJG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAJAAAABwARwBJAE0AUAAgAGIAdQBpAGwAdAAtAGkAbgAgAHMAUgBHAEJtbHVjAAAAAAAAAAEAAAAMZW5VUwAAABoAAAAcAFAAdQBiAGwAaQBjACAARABvAG0AYQBpAG4AAFhZWiAAAAAAAAD21gABAAAAANMtc2YzMgAAAAAAAQxCAAAF3v//8yUAAAeTAAD9kP//+6H///2iAAAD3AAAwG5YWVogAAAAAAAAb6AAADj1AAADkFhZWiAAAAAAAAAknwAAD4QAALbEWFlaIAAAAAAAAGKXAAC3hwAAGNlwYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR8AABMzQAAmZoAACZnAAAPXG1sdWMAAAAAAAAAAQAAAAxlblVTAAAACAAAABwARwBJAE0AUG1sdWMAAAAAAAAAAQAAAAxlblVTAAAACAAAABwAcwBSAEcAQv/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/CABEIABsAAQMBEQACEQEDEQH/xAAXAAADAQAAAAAAAAAAAAAAAAADBAYJ/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAP/2gAMAwEAAhADEAAAAc5gQxNdn//EABkQAQACAwAAAAAAAAAAAAAAAAADEQQTFP/aAAgBAQABBQLbOpTjx3//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAEDAQE/AR//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAECAQE/AR//xAAbEAABBAMAAAAAAAAAAAAAAAACAAMz0hCTov/aAAgBAQAGPwKZ7cdsx9HZf//EABcQAAMBAAAAAAAAAAAAAAAAAAAQIfD/2gAIAQEAAT8hL2Rl/wD/2gAMAwEAAgADAAAAEBAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAwEBPxAf/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAgEBPxAf/8QAHBAAAQMFAAAAAAAAAAAAAAAAABARYXGRodHh/9oACAEBAAE/EAG+btlWOp9//9k=) repeat-x;
		  border: 5px solid #464646;
		}

		.mid_tab_bar > .tab_active {
		  color: #fff;
		  border-width: 1px 1px 0 1px;
		  border-color: #777;
		  background: #464646;
		}



		.latest-comments-thread {
		  background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QP4RXhpZgAASUkqAAgAAAAHABIBAwABAAAAAQAAABoBBQABAAAAYgAAABsBBQABAAAAagAAACgBAwABAAAAAgAAADEBAgANAAAAcgAAADIBAgAUAAAAgAAAAGmHBAABAAAAlAAAAKYAAAAsAQAAAQAAACwBAAABAAAAR0lNUCAyLjEwLjI0AAAyMDIxOjA4OjA5IDE4OjUyOjE4AAEAAaADAAEAAAABAAAAAAAAAAgAAAEEAAEAAAAJAAAAAQEEAAEAAAAAAQAAAgEDAAMAAAAMAQAAAwEDAAEAAAAGAAAABgEDAAEAAAAGAAAAFQEDAAEAAAADAAAAAQIEAAEAAAASAQAAAgIEAAEAAADdAgAAAAAAAAgACAAIAP/Y/+AAEEpGSUYAAQEAAAEAAQAA/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgBAAAJAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A4yisjzpf+ej/APfRo86X/no//fRoANo9KNo9KdijFACZozRRQAYNGDTqKAEooooAKKKKACijFGKAFooooAKKWigAooopAFFFFABijFLRQAUUUUAFFFFABRV77PF/d/U0fZ4v7v6mgCWiiigD/9kA/+EMd2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOmM4MjI4ZDA4LThkYTUtNDFiZC04YTkwLTEzYTc4NDUxMmRiOSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1ZmRkMWI2ZS1jNzI4LTQwZGYtYWRhOC1lM2QzNzZjMDNjNTUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyYzcwMTRiNC1lZmQ5LTRmOTktOWRiYi03YTRlMThiZmUyNTEiIGRjOkZvcm1hdD0iaW1hZ2UvanBlZyIgR0lNUDpBUEk9IjIuMCIgR0lNUDpQbGF0Zm9ybT0iTGludXgiIEdJTVA6VGltZVN0YW1wPSIxNjI4NTI3OTQ0MzcyMTUyIiBHSU1QOlZlcnNpb249IjIuMTAuMjQiIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0OmNoYW5nZWQ9Ii8iIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTk5YzMyYmItNTZlNS00YzMzLTg1YjUtZjA3NDA0NjdhNWQ5IiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKExpbnV4KSIgc3RFdnQ6d2hlbj0iMjAyMS0wOC0wOVQxODo1MjoyNCswMjowMCIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/iArBJQ0NfUFJPRklMRQABAQAAAqBsY21zBDAAAG1udHJSR0IgWFlaIAflAAgACQAQADIALGFjc3BBUFBMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD21gABAAAAANMtbGNtcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADWRlc2MAAAEgAAAAQGNwcnQAAAFgAAAANnd0cHQAAAGYAAAAFGNoYWQAAAGsAAAALHJYWVoAAAHYAAAAFGJYWVoAAAHsAAAAFGdYWVoAAAIAAAAAFHJUUkMAAAIUAAAAIGdUUkMAAAIUAAAAIGJUUkMAAAIUAAAAIGNocm0AAAI0AAAAJGRtbmQAAAJYAAAAJGRtZGQAAAJ8AAAAJG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAJAAAABwARwBJAE0AUAAgAGIAdQBpAGwAdAAtAGkAbgAgAHMAUgBHAEJtbHVjAAAAAAAAAAEAAAAMZW5VUwAAABoAAAAcAFAAdQBiAGwAaQBjACAARABvAG0AYQBpAG4AAFhZWiAAAAAAAAD21gABAAAAANMtc2YzMgAAAAAAAQxCAAAF3v//8yUAAAeTAAD9kP//+6H///2iAAAD3AAAwG5YWVogAAAAAAAAb6AAADj1AAADkFhZWiAAAAAAAAAknwAAD4QAALbEWFlaIAAAAAAAAGKXAAC3hwAAGNlwYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR8AABMzQAAmZoAACZnAAAPXG1sdWMAAAAAAAAAAQAAAAxlblVTAAAACAAAABwARwBJAE0AUG1sdWMAAAAAAAAAAQAAAAxlblVTAAAACAAAABwAcwBSAEcAQv/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/CABEIABsAAQMBEQACEQEDEQH/xAAXAAADAQAAAAAAAAAAAAAAAAADBAYJ/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAP/2gAMAwEAAhADEAAAAc5gQxNdn//EABkQAQACAwAAAAAAAAAAAAAAAAADEQQTFP/aAAgBAQABBQLbOpTjx3//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAEDAQE/AR//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAECAQE/AR//xAAbEAABBAMAAAAAAAAAAAAAAAACAAMz0hCTov/aAAgBAQAGPwKZ7cdsx9HZf//EABcQAAMBAAAAAAAAAAAAAAAAAAAQIfD/2gAIAQEAAT8hL2Rl/wD/2gAMAwEAAgADAAAAEBAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAwEBPxAf/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAgEBPxAf/8QAHBAAAQMFAAAAAAAAAAAAAAAAABARYXGRodHh/9oACAEBAAE/EAG+btlWOp9//9k=) repeat-x;
		}

		.latest-comments-comment-body, .latest-comments-comment-body > div.article_text {
		  background-color: #292929;
		}

		.latest-comments-comment-body:nth-of-type(2n+1), .latest-comments-comment-body:nth-of-type(2n+1) > div.article_text {
		  background-color: rgb(59, 59, 59);
		}

		span[class*="headline3"] {
		  color: #fff !important;
		}

		div[class*="max-height-overlay"] {
		  background: linear-gradient(rgba(0, 0, 0, 0), rgb(41, 41, 41)) !important;
		}

		.max-height-overlay > a {
		  border: 1px solid #868686;
		  background-color: #444;
		}

		.thread-rls-scene::after {
		  filter: invert(80%);
		}

		.thread-rls-p2p::after {
		  filter: invert(80%);
		}

		div.page_inactive {
		  border: 1px #7e7e7e solid;
		}

		.release_pages div {
		  color: #fff;
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
