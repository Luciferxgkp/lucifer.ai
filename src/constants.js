import {
  Code,
  Image,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  Video,
} from 'lucide-react/dist/esm/lucide-react';

export const MAX_FREE_COUNT = 5;
export const pages = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
    color: 'text-blue-500',
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-gray-500',
  },
  {
    label: 'Image Generation',
    icon: Image,
    href: '/image',
    color: 'text-purple-500',
  },
  {
    label: 'Video Generation',
    icon: Video,
    href: '/video',
    color: 'text-yellow-500',
  },
  {
    label: 'Audio Generation',
    icon: Music,
    href: '/audio',
    color: 'text-slate-500',
  },
  {
    label: 'Code Generation',
    icon: Code,
    href: '/code',
    color: 'text-violet-500',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    color: 'text-lime-500',
  },
];
