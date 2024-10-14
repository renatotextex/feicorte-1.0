export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    inicio: '/dashboard',
    account: '/dashboard/account',
    usuarios: '/dashboard/usuarios',
    palestrantes: '/dashboard/palestrantes',
    eventos: '/dashboard/eventos',
    representantes: '/dashboard/representantes',
    empresas: '/dashboard/empresas',
    estandes: '/dashboard/estandes',
    programacao: '/dashboard/programacao',
    leituraqrcode: '/dashboard/leituraqrcode',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
