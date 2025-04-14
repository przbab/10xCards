# Plan implementacji widoku Flashcard Edit View

## 1. Przegląd
Widok edycji fiszki umożliwia użytkownikom modyfikację istniejących fiszek poprzez edycję pól "front" i "back". Widok ten zapewnia walidację danych oraz zapis zmian w bazie danych.

## 2. Routing widoku
Ścieżka: `/flashcards/:id/edit`

## 3. Struktura komponentów
- **FlashcardEdit** (główny komponent)
  - **EditForm** (formularz edycji fiszki)

## 4. Szczegóły komponentów
### FlashcardEdit
- **Opis**: Główny komponent widoku, zarządza stanem i logiką edycji fiszki.
- **Główne elementy**: EditForm.
- **Obsługiwane interakcje**:
  - Pobieranie danych fiszki z API.
  - Przekazywanie zmodyfikowanych danych do API.
- **Obsługiwana walidacja**: Walidacja odpowiedzi API (np. poprawność danych).
- **Typy**:
  - `CardRow` (typ danych fiszki).
- **Propsy**: Brak (komponent główny).

### EditForm
- **Opis**: Formularz umożliwiający edycję pól "front" i "back" fiszki.
- **Główne elementy**: Pola tekstowe ("front", "back"), przycisk "Zapisz zmiany".
- **Obsługiwane interakcje**:
  - Walidacja danych wejściowych.
  - Wysyłanie zmodyfikowanych danych do API.
- **Obsługiwana walidacja**:
  - Maksymalna długość pola "front": 200 znaków.
  - Maksymalna długość pola "back": 500 znaków.
- **Typy**:
  - `CardRow` (typ danych fiszki).
- **Propsy**:
  - `card: CardRow` (dane fiszki).
  - `onSave: (updatedCard: CardRow) => void` (callback do zapisu zmian).

## 5. Typy
- **CardRow**: Typ danych fiszki.
  ```typescript
  export type CardRow = {
      id: string;
      front: string;
      back: string;
      created_at: string;
  };
  ```

## 6. Zarządzanie stanem
- **Zmienne stanu**:
  - `card: CardRow` (dane edytowanej fiszki).
- **Customowe hooki**:
  - `useFetchCard` (do pobierania danych fiszki).
  - `useUpdateCard` (do zapisywania zmodyfikowanych danych).

## 7. Integracja API
- **Pobieranie danych fiszki**:
  - Endpoint: `GET /cards/:id`.
  - Typ odpowiedzi: `CardRow`.
- **Zapisywanie zmodyfikowanych danych**:
  - Endpoint: `PUT /cards/:id`.
  - Typ żądania: `CardRow`.

## 8. Interakcje użytkownika
- Edycja pól "front" i "back": Aktualizuje stan komponentu.
- Kliknięcie "Zapisz zmiany": Wysyła zmodyfikowane dane do API i wyświetla komunikat o sukcesie lub błędzie.

## 9. Warunki i walidacja
- Walidacja długości pól "front" i "back".
- Walidacja odpowiedzi API (np. poprawność danych).

## 10. Obsługa błędów
- Wyświetlanie komunikatów o błędach API (np. toast).
- Obsługa błędów sieciowych (np. brak połączenia).

## 11. Kroki implementacji
1. Stworzenie komponentu FlashcardEdit.
2. Implementacja komponentu EditForm.
3. Stworzenie hooków `useFetchCard` i `useUpdateCard`.
4. Integracja z API.
5. Testy jednostkowe i integracyjne.
6. Optymalizacja wydajności (np. React.memo).