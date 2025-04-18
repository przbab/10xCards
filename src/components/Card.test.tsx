import { fireEvent, render, screen } from '@testing-library/react';
import Card from './Card';
import { describe } from 'vitest';

describe('Component', () => {
    describe('Card', () => {
        test('renders the front and back content correctly', () => {
            render(<Card actions={[]} back="Back Content" front="Front Content" id="1" onAction={() => {}} />);

            expect(screen.getByText('Front Content')).toBeInTheDocument();
            expect(screen.getByText('Back Content')).toBeInTheDocument();
        });

        test('renders the correct number of action buttons', () => {
            const actions = [
                { id: '1', text: 'Action 1', variant: 'default' },
                { id: '2', text: 'Action 2', variant: 'secondary' },
            ];

            render(<Card actions={actions} back="Back Content" front="Front Content" id="1" onAction={() => {}} />);

            expect(screen.getAllByRole('button')).toHaveLength(actions.length);
        });

        test('calls the onAction callback with the correct action ID when a button is clicked', () => {
            const onActionMock = vi.fn();
            const actions = [{ id: '1', text: 'Action 1', variant: 'default' }];

            render(<Card actions={actions} back="Back Content" front="Front Content" id="1" onAction={onActionMock} />);

            fireEvent.click(screen.getByText('Action 1'));

            expect(onActionMock).toHaveBeenCalledWith('1');
        });

        test('applies the correct variant to each action button', () => {
            const actions = [
                { id: '1', text: 'Action 1', variant: 'default' },
                { id: '2', text: 'Action 2', variant: 'destructive' },
            ];

            render(<Card actions={actions} back="Back Content" front="Front Content" id="1" onAction={() => {}} />);

            const buttons = screen.getAllByRole('button');
            expect(buttons[0]).toHaveClass('bg-primary'); // Default variant
            expect(buttons[1]).toHaveClass('bg-destructive'); // Destructive variant
        });
    });
});
