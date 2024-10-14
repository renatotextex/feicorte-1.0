import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'inicio', title: 'Início', href: paths.dashboard.inicio, icon: 'chart-pie' },
  { key: 'usuarios', title: 'Usuarios', href: paths.dashboard.usuarios, icon: 'users' },
  { key: 'palestrantes', title: 'Palestrantes', href: paths.dashboard.palestrantes, icon: 'users' },
  { key: 'representantes', title: 'Representantes', href: paths.dashboard.representantes, icon: 'users' },
  { key: 'eventos', title: 'Eventos', href: paths.dashboard.eventos, icon: 'event' },
  { key: 'empresas', title: 'Empresas', href: paths.dashboard.empresas, icon: 'presentation' },
  { key: 'estandes', title: 'Estandes', href: paths.dashboard.estandes, icon: 'presentation' },
  { key: 'programacao', title: 'Programação', href: paths.dashboard.programacao, icon: 'calendar' },
  { key: 'leituraqrcode', title: 'Leitura de QRCode', href: paths.dashboard.leituraqrcode, icon: 'calendar' },
  // { key: 'configuracoes', title: 'Configurações', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Perfil', href: paths.dashboard.account, icon: 'user' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
