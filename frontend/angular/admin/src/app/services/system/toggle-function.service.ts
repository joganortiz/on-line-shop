import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToggleFunctionService {
  constructor() {}

  sidebar($recentSubmenu: any = undefined) {
    const sidebarCollapseEle = document.querySelectorAll('.sidebarCollapse');
    sidebarCollapseEle.forEach((el) => {
      el.addEventListener('click', function (sidebar) {
        sidebar.preventDefault();
        const getSidebar = document.querySelector('.sidebar-wrapper');

        if ($recentSubmenu === true) {
          if (document.querySelector('.collapse.submenu')?.classList.contains('show')) {
            document.querySelector('.submenu.show')?.classList.add('mini-recent-submenu');
            getSidebar?.querySelector('.collapse.submenu')?.classList.remove('show');
            getSidebar?.querySelector('.collapse.submenu')?.classList.remove('show');
            document
              .querySelector('.collapse.submenu')
              ?.parentNode?.querySelector('.dropdown-toggle')
              ?.setAttribute('aria-expanded', 'false');
          } else {
            if (
              document
                .querySelector('.main-container')
                ?.classList.contains('sidebar-closed')
            ) {
              if (
                document
                  .querySelector('.collapse.submenu')
                  ?.classList.contains('recent-submenu')
              ) {
                getSidebar
                  ?.querySelector('.collapse.submenu.recent-submenu')
                  ?.classList.add('show');
                document
                  .querySelector('.collapse.submenu.recent-submenu')
                  ?.parentNode?.querySelector('.dropdown-toggle')
                  ?.setAttribute('aria-expanded', 'true');
                document
                  .querySelector('.submenu')
                  ?.classList.remove('mini-recent-submenu');
              } else {
                document
                  .querySelector('li.active .submenu')
                  ?.classList.add('recent-submenu');
                getSidebar
                  ?.querySelector('.collapse.submenu.recent-submenu')
                  ?.classList.add('show');
                document
                  .querySelector('.collapse.submenu.recent-submenu')
                  ?.parentNode?.querySelector('.dropdown-toggle')
                  ?.setAttribute('aria-expanded', 'true');
                document
                  .querySelector('.submenu')
                  ?.classList.remove('mini-recent-submenu');
              }
            }
          }
        }
        document
          .querySelector('.main-container')
          ?.classList.toggle('sidebar-closed');
        document
          .querySelector('.header.navbar')
          ?.classList.toggle('expand-header');
        document
          .querySelector('.main-container')
          ?.classList.toggle('sbar-open');
        document.querySelector('.overlay')?.classList.toggle('show');
        document
          .querySelector('html, body')
          ?.classList.toggle('sidebar-noneoverflow');
      });
    });
  }

  onToggleSidebarSubmenu() {
    ['mouseenter', 'mouseleave'].forEach(function (e) {
      document .querySelector('.sidebar-wrapper')?.addEventListener(e, function () {
        if (document.querySelector('body')?.classList.contains('alt-menu')) {
          if (document.querySelector('.main-container')?.classList.contains('sidebar-closed')) {
            if (e === 'mouseenter') {
              document.querySelector('li.menu .submenu')?.classList.remove('show');
              document.querySelector('li.menu.active .submenu')?.classList.add('recent-submenu');
              document.querySelector('li.menu.active')?.querySelector('.collapse.submenu.recent-submenu')?.classList.add('show');
              document.querySelector('.collapse.submenu.recent-submenu')?.parentNode?.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'true');
            } else if (e === 'mouseleave') {
              const getMenuList = document.querySelectorAll('li.menu');
              getMenuList.forEach((element) => {
                const submenuShowEle = element.querySelector( '.collapse.submenu.show' );

                if (submenuShowEle) {
                  submenuShowEle.classList.remove('show');
                }

                const submenuExpandedToggleEle = element.querySelector( '.dropdown-toggle[aria-expanded="true"]' );

                if (submenuExpandedToggleEle) {
                  submenuExpandedToggleEle.setAttribute('aria-expanded', 'false');
                }
              });
            }
          }
        } else {
          if ( document.querySelector('.main-container')?.classList.contains('sidebar-closed')) {
            if (e === 'mouseenter') {
              document.querySelector('li.menu .submenu')?.classList.remove('show');

              if (document.querySelector('li.menu.active .submenu')) {
                document.querySelector('li.menu.active .submenu')?.classList.add('recent-submenu');
                document.querySelector('li.menu.active')?.querySelector('.collapse.submenu.recent-submenu')?.classList.add('show');
                document.querySelector('.collapse.submenu.recent-submenu')?.parentNode?.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'true');
              }
            } else if (e === 'mouseleave') {
              const getMenuList = document.querySelectorAll('li.menu');
              getMenuList.forEach((element) => {
                const submenuShowEle = element.querySelector('.collapse.submenu.show');

                if (submenuShowEle) {
                  submenuShowEle.classList.remove('show');
                }

                var submenuExpandedToggleEle = element.querySelector('.dropdown-toggle[aria-expanded="true"]');

                if (submenuExpandedToggleEle) {
                  submenuExpandedToggleEle.setAttribute('aria-expanded','false');
                }
              });
            }
          }
        }
      });
    });
  }

  offToggleSidebarSubmenu() {
    // $('.sidebar-wrapper').off('mouseenter mouseleave');
  }

  overlay() {
    if(typeof window != 'undefined') {
      document.querySelector('#dismiss, .overlay')?.addEventListener('click', function () {
        // hide sidebar
        document.querySelector("#container")?.classList.add('sidebar-closed');
        document.querySelector("#container")?.classList.remove('sbar-open');
        // hide overlay
        document.querySelector('.overlay')?.classList.remove('show');
        document.querySelector('html, body')?.classList.remove('sidebar-noneoverflow');
      });
    }       
  }
}
