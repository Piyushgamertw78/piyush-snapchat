import { describe, it, expect } from 'vitest';
import {
  cn,
  formatCount,
  formatTime,
  generateId,
  generateSnapcode,
  timeAgo,
  hexToRgba,
} from '@/utils/helpers';

describe('cn utility', () => {
  it('should merge class names', () => {
    const result = cn('text-white', 'bg-black');
    expect(result).toBe('text-white bg-black');
  });

  it('should handle conditional classes', () => {
    const result = cn('base', false && 'hidden', 'active');
    expect(result).toBe('base active');
  });

  it('should merge tailwind classes', () => {
    const result = cn('px-4 py-2', 'px-6');
    expect(result).toBe('py-2 px-6');
  });
});

describe('formatCount', () => {
  it('should format numbers under 1000', () => {
    expect(formatCount(0)).toBe('0');
    expect(formatCount(42)).toBe('42');
    expect(formatCount(999)).toBe('999');
  });

  it('should format thousands', () => {
    expect(formatCount(1000)).toBe('1.0K');
    expect(formatCount(5500)).toBe('5.5K');
    expect(formatCount(999999)).toBe('1000.0K');
  });

  it('should format millions', () => {
    expect(formatCount(1000000)).toBe('1.0M');
    expect(formatCount(5500000)).toBe('5.5M');
  });
});

describe('formatTime', () => {
  it('should return "now" for very recent times', () => {
    const result = formatTime(new Date().toISOString());
    expect(result).toBe('now');
  });

  it('should return minutes', () => {
    const date = new Date(Date.now() - 5 * 60000).toISOString();
    const result = formatTime(date);
    expect(result).toBe('5m');
  });

  it('should return hours', () => {
    const date = new Date(Date.now() - 3 * 3600000).toISOString();
    const result = formatTime(date);
    expect(result).toBe('3h');
  });

  it('should return days', () => {
    const date = new Date(Date.now() - 2 * 86400000).toISOString();
    const result = formatTime(date);
    expect(result).toBe('2d');
  });
});

describe('generateId', () => {
  it('should generate unique IDs', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it('should generate string IDs', () => {
    const id = generateId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });
});

describe('generateSnapcode', () => {
  it('should generate 8-character codes', () => {
    const code = generateSnapcode();
    expect(code.length).toBe(8);
  });

  it('should generate alphanumeric codes', () => {
    const code = generateSnapcode();
    expect(/^[A-Za-z0-9]+$/.test(code)).toBe(true);
  });
});

describe('timeAgo', () => {
  it('should return "just now" for very recent times', () => {
    const result = timeAgo(new Date().toISOString());
    expect(result).toBe('just now');
  });

  it('should return minutes ago', () => {
    const date = new Date(Date.now() - 5 * 60000).toISOString();
    expect(timeAgo(date)).toBe('5m ago');
  });

  it('should return hours ago', () => {
    const date = new Date(Date.now() - 2 * 3600000).toISOString();
    expect(timeAgo(date)).toBe('2h ago');
  });
});

describe('hexToRgba', () => {
  it('should convert hex to rgba', () => {
    const result = hexToRgba('#FFFC00', 0.5);
    expect(result).toBe('rgba(255, 252, 0, 0.5)');
  });

  it('should handle full opacity', () => {
    const result = hexToRgba('#000000', 1);
    expect(result).toBe('rgba(0, 0, 0, 1)');
  });
});
