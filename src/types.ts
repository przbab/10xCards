import { type Database } from './db/database.types';

export type CreateUserCommand = {
    email: string;
    password: string;
};

export type UpdatePasswordCommand = {
    password: string;
};

export type DeleteUserResponse = {
    message: string;
};

type CardInsert = Database['public']['Tables']['cards']['Insert'];

export type CardRow = Database['public']['Tables']['cards']['Row'];

export type CreateCardCommand = Pick<CardInsert, 'user_id' | 'front' | 'back' | 'source'>;

export type CreateMultipleCardsCommand = {
    cards: CreateCardCommand[];
};

export type GetCardsResponse = Pick<CardRow, 'id' | 'front' | 'created_at'>[];

export type DeleteCardsCommand = {
    card_ids: string[];
};

export type Card = { back: string; front: string; id: string; source: 'ai-full' | 'ai-edited' | 'manual' };
