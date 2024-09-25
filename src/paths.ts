export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    inicio: '/dashboard',
    account: '/dashboard/account',
    representantes: '/dashboard/representantes',
    empresas: '/dashboard/empresas',
    programacao: '/dashboard/programacao',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
