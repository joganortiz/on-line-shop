export const navbarData = [
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
        routeLink: '/admin/users',
        icon: 'pi pi-users',
        label: 'Users',
        items: [
            {
                routeLink: '/admin/users',
                label: 'Users',
            },
            {
                routeLink: '/admin/roles',
                label: 'Roles',
            }
        ]
    },
    {
        routeLink: '/admin/products',
        icon: 'pi pi-shopping-bag',
        label: 'Store'
    },
    {
        routeLink: '/admin/settings',
        icon: 'pi pi-cog',
        label: 'Setting'
    },

];