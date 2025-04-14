# Schemat bazy danych dla 10xCards

## 1. Lista tabel

### Tabela: Cards

- **id**: SERIAL PRIMARY KEY
- **user_id**: INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE
- **front**: TEXT NOT NULL
- **back**: TEXT NOT NULL
- **source**: VARCHAR NOT NULL CHECK (source IN ('ai-full', 'ai-edited', 'manual'))
- **created_at**: TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
- **updated_at**: TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL

## 2. Relacje między tabelami

- Relacja jeden-do-wielu: Jeden użytkownik (Users) może mieć wiele fiszek (Cards), ale każda fiszka należy do jednego użytkownika.

## 3. Indeksy

- **Cards**: Indeks na kolumnie `user_id` dla szybkiego wyszukiwania fiszek powiązanych z użytkownikiem.

## 4. Zasady PostgreSQL

- Triggery do automatycznego ustawiania wartości `created_at` i `updated_at`:
    - **Cards**: Aktualizacja `updated_at` przy każdej modyfikacji rekordu.

## 5. Dodatkowe uwagi

- Walidacja długości pól `front` i `back` odbywa się na poziomie aplikacji, zgodnie z decyzjami projektowymi.
