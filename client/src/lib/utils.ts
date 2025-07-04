import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  return 'Just now';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'ready':
    case 'success':
    case 'active':
      return 'text-green-400';
    case 'building':
    case 'pending':
    case 'configuring':
      return 'text-yellow-400';
    case 'error':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
}

export function getStatusDot(status: string): string {
  switch (status) {
    case 'ready':
    case 'success':
    case 'active':
      return 'bg-green-400';
    case 'building':
    case 'pending':
    case 'configuring':
      return 'bg-yellow-400';
    case 'error':
      return 'bg-red-400';
    default:
      return 'bg-gray-400';
  }
}
