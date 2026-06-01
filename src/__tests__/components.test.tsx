import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GlowButton, InputField, Avatar, Badge } from '@/components/ui';

describe('GlowButton', () => {
  it('renders with children', () => {
    render(<GlowButton>Click me</GlowButton>);
    expect(screen.getByText('Click me')).toBeDefined();
  });

  it('renders with different variants', () => {
    const { rerender } = render(<GlowButton variant="primary">Primary</GlowButton>);
    expect(screen.getByText('Primary')).toBeDefined();

    rerender(<GlowButton variant="secondary">Secondary</GlowButton>);
    expect(screen.getByText('Secondary')).toBeDefined();

    rerender(<GlowButton variant="ghost">Ghost</GlowButton>);
    expect(screen.getByText('Ghost')).toBeDefined();

    rerender(<GlowButton variant="danger">Danger</GlowButton>);
    expect(screen.getByText('Danger')).toBeDefined();
  });

  it('handles click events', async () => {
    let clicked = false;
    render(<GlowButton onClick={() => { clicked = true; }}>Click</GlowButton>);
    await userEvent.click(screen.getByText('Click'));
    expect(clicked).toBe(true);
  });

  it('can be disabled', () => {
    render(<GlowButton disabled>Disabled</GlowButton>);
    expect(screen.getByText('Disabled').closest('button')?.disabled).toBe(true);
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<GlowButton size="sm">Small</GlowButton>);
    expect(screen.getByText('Small')).toBeDefined();
    rerender(<GlowButton size="lg">Large</GlowButton>);
    expect(screen.getByText('Large')).toBeDefined();
  });
});

describe('InputField', () => {
  it('renders with label and placeholder', () => {
    render(
      <InputField
        label="Email"
        placeholder="Enter email"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByText('Email')).toBeDefined();
    expect(screen.getByPlaceholderText('Enter email')).toBeDefined();
  });

  it('displays current value', () => {
    render(
      <InputField
        label="Name"
        placeholder="Enter name"
        value="Piyush"
        onChange={() => {}}
      />
    );
    const input = screen.getByDisplayValue('Piyush');
    expect(input).toBeDefined();
  });

  it('calls onChange when typing', async () => {
    const values: string[] = [];
    render(
      <InputField
        label="Test"
        placeholder="Type here"
        value=""
        onChange={(v) => { values.push(v); }}
      />
    );
    const input = screen.getByPlaceholderText('Type here');
    await userEvent.type(input, 'hi');
    expect(values.length).toBeGreaterThan(0);
    expect(values[values.length - 1]).toContain('i');
  });

  it('shows error message', () => {
    render(
      <InputField
        label="Email"
        placeholder="Enter email"
        value=""
        onChange={() => {}}
        error="Email is required"
      />
    );
    expect(screen.getByText('Email is required')).toBeDefined();
  });
});

describe('Avatar', () => {
  it('renders initials when no src', () => {
    render(<Avatar name="Piyush" />);
    expect(screen.getByText('P')).toBeDefined();
  });

  it('renders two-letter initials', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeDefined();
  });

  it('shows online indicator', () => {
    const { container } = render(<Avatar name="Piyush" isOnline={true} />);
    const indicator = container.querySelector('.bg-green-400');
    expect(indicator).not.toBeNull();
  });

  it('shows offline indicator', () => {
    const { container } = render(<Avatar name="Piyush" isOnline={false} />);
    const indicator = container.querySelector('.bg-gray-500');
    expect(indicator).not.toBeNull();
  });
});

describe('Badge', () => {
  it('renders count', () => {
    render(<Badge count={5} />);
    expect(screen.getByText('5')).toBeDefined();
  });

  it('shows 99+ for large counts', () => {
    render(<Badge count={150} />);
    expect(screen.getByText('99+')).toBeDefined();
  });

  it('returns null for zero count', () => {
    const { container } = render(<Badge count={0} />);
    expect(container.innerHTML).toBe('');
  });
});
