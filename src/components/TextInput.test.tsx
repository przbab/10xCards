import { fireEvent, render, screen } from '@testing-library/react';
import TextInput from '@/components/TextInput';
import { describe, vi } from 'vitest';

describe('Component', () => {
    describe('TextInput', () => {
        test('should render the Textarea and Button components correctly', () => {
            render(<TextInput isLoading={false} onGenerate={vi.fn()} />);

            expect(screen.getByPlaceholderText('Enter text to generate flashcards')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Generate' })).toBeInTheDocument();
        });

        test('should disable Textarea and Button when isLoading is true', () => {
            render(<TextInput isLoading onGenerate={vi.fn()} />);

            expect(screen.getByPlaceholderText('Enter text to generate flashcards')).toBeDisabled();
            expect(screen.getByRole('button', { name: 'Generating...' })).toBeDisabled();
        });

        test('should call onGenerate with the correct text when the button is clicked', () => {
            const mockOnGenerate = vi.fn();
            render(<TextInput isLoading={false} onGenerate={mockOnGenerate} />);

            const textarea = screen.getByPlaceholderText('Enter text to generate flashcards');
            const button = screen.getByRole('button', { name: 'Generate' });

            fireEvent.change(textarea, { target: { value: 'Test text' } });
            fireEvent.click(button);

            expect(mockOnGenerate).toHaveBeenCalledWith('Test text');
        });

        test('should not call onGenerate if the text is empty or only whitespace', () => {
            const mockOnGenerate = vi.fn();
            render(<TextInput isLoading={false} onGenerate={mockOnGenerate} />);

            const button = screen.getByRole('button', { name: 'Generate' });

            fireEvent.click(button);
            expect(mockOnGenerate).not.toHaveBeenCalled();

            const textarea = screen.getByPlaceholderText('Enter text to generate flashcards');
            fireEvent.change(textarea, { target: { value: '   ' } });
            fireEvent.click(button);
            expect(mockOnGenerate).not.toHaveBeenCalled();
        });

        test('should update the text state when typing in the Textarea', () => {
            render(<TextInput isLoading={false} onGenerate={vi.fn()} />);

            const textarea = screen.getByPlaceholderText('Enter text to generate flashcards');
            fireEvent.change(textarea, { target: { value: 'New text' } });

            expect(textarea).toHaveValue('New text');
        });
    });
});
