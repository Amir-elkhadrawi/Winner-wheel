// Neon Palette
export const WHEEL_COLORS = [
    '#f43f5e', // Rose
    '#3b82f6', // Blue
    '#8b5cf6', // Violet
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#84cc16', // Lime
  ];
  
  export const DEFAULT_PARTICIPANTS = [
    "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi"
  ];
  
  export interface WheelSettings {
    duration: number; // in seconds
    removeWinner: boolean;
    spinSound: boolean;
  }
  
  export const LOCAL_STORAGE_KEY = 'winner-wheel-data';