export type Navigation = {
    title?: string;
    url: string;
    icon?: string;
    preserveQuery?: boolean;
    children?: Navigation[];
}

export const navigation: Navigation[] = [
    {
        title: 'Головна',
        url: '/home',
        icon: 'home',
    },
    {
        title: 'Лікарі',
        url: '/doctors',
        icon: 'vaccines',
        preserveQuery: true,
    },
    {
        title: 'Ціни',
        url: '/prices',
        icon: 'sell',
        preserveQuery: true,
    },
    {
        title: 'Записатися',
        url: '/book',
        icon: 'assignment-turned-in',
    },
    {
        title: 'Контакти',
        url: '/clinics',
        icon: 'phone',
    },
]
