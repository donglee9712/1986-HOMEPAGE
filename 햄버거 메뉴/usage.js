/**
 * Usage Guide
 * ===========
 *
 * 1) 필요한 HTML
 * ----------------
 * <div class="hamburger-nav" data-hamburger-nav>
 *   <a class="hamburger-nav__logo" href="/">
 *     <img src="logo.png" alt="Site logo" />
 *   </a>
 *   <button
 *     class="hamburger-toggle"
 *     data-hamburger-toggle
 *     aria-controls="siteMenu"
 *     aria-expanded="false"
 *   >
 *     <span></span><span></span><span></span>
 *   </button>
 *   <nav class="hamburger-panel" id="siteMenu" data-hamburger-panel>
 *     <ul>
 *       <li><a href="/about">ABOUT</a></li>
 *       <li><a href="/projects">PROJECTS</a></li>
 *       <li><a href="/contact">CONTACT</a></li>
 *     </ul>
 *   </nav>
 *   <div class="hamburger-backdrop" data-hamburger-backdrop></div>
 * </div>
 *
 * 2) 스타일 & 스크립트 연결
 * -------------------------
 * <link rel="stylesheet" href="햄버거 메뉴/11.css" />
 * <script defer src="햄버거 메뉴/code.js"></script>
 *
 * 3) 동작
 * -------
 * code.js는 data-hamburger-nav 요소를 자동으로 찾아 토글, ESC 닫기,
 * 포커스 트랩, 백드롭 클릭을 처리합니다.
 */
