import { animate, style, transition, trigger } from "@angular/animations";
import { INavbarData } from "../../interfaces/menu-sidenav";

export const navbarData: INavbarData[] = [
    {
        routeLink: '/admin',
        icon: 'pi pi-home',
        label: 'Dashboard'
    },
    {
        routeLink: '/admin/clients',
        icon: 'pi pi-user',
        label: 'Client'
    },
    {
        routeLink: '',
        icon: 'pi pi-users',
        label: 'Users',
        items: [
            {
                routeLink: '/admin/users',
                label: 'Users',
            },
            {
                routeLink: '/admin/users/roles',
                label: 'Roles',
            }
        ]
    },
    {
        routeLink: '',
        icon: 'pi pi-shopping-bag',
        label: 'Store',
        items: [
            {
                routeLink: '/admin/category',
                label: 'Categories',
            },
            {
                routeLink: '/admin/products',
                label: 'Products',
            }
        ]
    },
    {
        routeLink: '/admin/settings',
        icon: 'pi pi-cog',
        label: 'Setting'
    },

];

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
      style({opacity: 0}),
      animate('350ms', style({opacity: 1}))
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('50ms', style({opacity: 0}))
    ])
  ])