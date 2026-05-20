import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Dashboard from './Dashboard';

describe('Dashboard', () => {
  it('renders all stat cards', () => {
    render(<Dashboard />);

    expect(screen.getByText('Total Strings')).toBeInTheDocument();
    expect(screen.getByText('1,284')).toBeInTheDocument();
    expect(screen.getAllByText('Languages')).toHaveLength(2);
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('Translated')).toBeInTheDocument();
    expect(screen.getByText('89%')).toBeInTheDocument();
    expect(screen.getByText('Pending Review')).toBeInTheDocument();
    expect(screen.getByText('43')).toBeInTheDocument();
  });

  it('renders language table with all rows', () => {
    render(<Dashboard />);

    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Spanish')).toBeInTheDocument();
    expect(screen.getByText('French')).toBeInTheDocument();
    expect(screen.getByText('German')).toBeInTheDocument();
    expect(screen.getByText('Japanese')).toBeInTheDocument();
  });

  it('filters languages by search input', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'span');

    expect(screen.getByText('Spanish')).toBeInTheDocument();
    expect(screen.queryByText('English')).not.toBeInTheDocument();
    expect(screen.queryByText('French')).not.toBeInTheDocument();
  });

  it('shows empty state when no results match', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'xyz');

    expect(screen.getByText('No languages found')).toBeInTheDocument();
  });

  it('shows correct language count in header', () => {
    render(<Dashboard />);

    expect(screen.getByText('5 of 5 languages')).toBeInTheDocument();
  });
});
