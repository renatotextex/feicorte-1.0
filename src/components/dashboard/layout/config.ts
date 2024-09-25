import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'inicio', title: 'Início', href: paths.dashboard.inicio, icon: 'chart-pie' },
  { key: 'representantes', title: 'Representantes', href: paths.dashboard.representantes, icon: 'users' },
  { key: 'empresas', title: 'Estandes / Empresas', href: paths.dashboard.empresas, icon: 'presentation' },
  { key: 'programacao', title: 'Programação', href: paths.dashboard.programacao, icon: 'calendar' },
  // { key: 'configuracoes', title: 'Configurações', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Perfil', href: paths.dashboard.account, icon: 'user' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
