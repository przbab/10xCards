import { describe, expect, it, vi } from 'vitest';
import { DELETE, GET, PUT } from './[id]';
import { CardsService } from '../../../services/CardsService';

// @vitest-environment node

vi.mock('../../../services/CardsService');

describe('API Route: /api/cards/[id]', () => {
    describe('GET', () => {
        it('should fetch a card by ID and return it with status 200', async () => {
            const mockCard = { back: 'Back', front: 'Front', id: '1' };
            CardsService.getCard.mockResolvedValue(mockCard);

            const locals = { supabase: {}, user: {} };
            const params = { id: '1' };

            const response = await GET({ locals, params });
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data).toEqual(mockCard);
        });

        it('should return a 500 status code on error', async () => {
            CardsService.getCard.mockRejectedValue(new Error('Test Error'));

            const locals = { supabase: {}, user: {} };
            const params = { id: '1' };

            const response = await GET({ locals, params });
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data).toEqual({ error: 'Internal Server Error' });
        });
    });

    describe('PUT', () => {
        it('should update a card and return the updated card with status 200', async () => {
            const mockUpdatedCard = { back: 'Updated Back', front: 'Updated Front', id: '1' };
            CardsService.updateCard.mockResolvedValue(mockUpdatedCard);

            const locals = { supabase: {}, user: {} };
            const params = { id: '1' };
            const request = {
                json: vi.fn().mockResolvedValue({ back: 'Updated Back', front: 'Updated Front' }),
            };

            const response = await PUT({ locals, params, request });
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data).toEqual(mockUpdatedCard);
        });

        it('should return a 500 status code on error', async () => {
            CardsService.updateCard.mockRejectedValue(new Error('Test Error'));

            const locals = { supabase: {}, user: {} };
            const params = { id: '1' };
            const request = {
                json: vi.fn().mockResolvedValue({ back: 'Updated Back', front: 'Updated Front' }),
            };

            const response = await PUT({ locals, params, request });
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data).toEqual({ error: 'Internal Server Error' });
        });
    });

    describe('DELETE', () => {
        it('should delete a card and return a success message with status 200', async () => {
            CardsService.deleteCard.mockResolvedValue();

            const locals = { supabase: {}, user: {} };
            const params = { id: '1' };

            const response = await DELETE({ locals, params });
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data).toEqual({ message: 'Card deleted successfully' });
        });

        it('should return a 500 status code on error', async () => {
            CardsService.deleteCard.mockRejectedValue(new Error('Test Error'));

            const locals = { supabase: {}, user: {} };
            const params = { id: '1' };

            const response = await DELETE({ locals, params });
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data).toEqual({ error: 'Internal Server Error' });
        });
    });
});
