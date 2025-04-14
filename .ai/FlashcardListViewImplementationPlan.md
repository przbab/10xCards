# Plan implementacji widoku Flashcard List View

## 1. Przegląd
Widok listy fiszek umożliwia użytkownikom przeglądanie ich fiszek, zaznaczanie wielu elementów oraz wykonywanie operacji zbiorczego usuwania. Jest to kluczowy widok do zarządzania fiszkami w aplikacji.

## 2. Routing widoku
Ścieżka: `/flashcards`

## 3. Struktura komponentów
- **FlashcardList** (główny komponent)
  - **FlashcardTable** (wyświetla listę fiszek w formie tabeli lub siatki)
    - **FlashcardRow** (pojedynczy wiersz tabeli z fiszką)
  - **BulkActions** (obsługuje operacje zbiorcze, np. usuwanie)

## 4. Szczegóły komponentów
### FlashcardList
- **Opis**: Główny komponent widoku, zarządza stanem i logiką widoku listy fiszek.
- **Główne elementy**: FlashcardTable, BulkActions.
- **Obsługiwane interakcje**:
  - Pobieranie listy fiszek z API.
  - Przekazywanie zaznaczonych fiszek do komponentu BulkActions.
- **Obsługiwana walidacja**: Walidacja odpowiedzi API (np. poprawność danych).
- **Typy**:
  - `GetCardsResponse` (typ odpowiedzi API).
- **Propsy**: Brak (komponent główny).

### FlashcardTable
- **Opis**: Wyświetla listę fiszek w formie tabeli lub siatki.
- **Główne elementy**: FlashcardRow.
- **Obsługiwane interakcje**:
  - Zaznaczanie pojedynczych fiszek.
- **Obsługiwana walidacja**: Brak.
- **Typy**:
  - `GetCardsResponse` (typ danych wejściowych).
- **Propsy**:
  - `cards: GetCardsResponse` (lista fiszek).
  - `onSelect: (id: string) => void` (callback do zaznaczania fiszek).

### FlashcardRow
- **Opis**: Reprezentuje pojedynczą fiszkę w tabeli.
- **Główne elementy**: Checkbox, tekst pola "front".
- **Obsługiwane interakcje**:
  - Zaznaczanie fiszki.
- **Obsługiwana walidacja**: Brak.
- **Typy**:
  - `id: string` (identyfikator fiszki).
  - `front: string` (tekst pola "front").
- **Propsy**:
  - `id: string`.
  - `front: string`.
  - `onSelect: (id: string) => void`.

### BulkActions
- **Opis**: Obsługuje operacje zbiorcze na zaznaczonych fiszkach.
- **Główne elementy**: Przycisk "Usuń zaznaczone".
- **Obsługiwane interakcje**:
  - Usuwanie zaznaczonych fiszek.
- **Obsługiwana walidacja**: Walidacja odpowiedzi API (np. sukces usunięcia).
- **Typy**:
  - `DeleteCardsCommand` (typ żądania API).
- **Propsy**:
  - `selectedIds: string[]` (lista zaznaczonych fiszek).
  - `onDeleteSuccess: () => void` (callback po udanym usunięciu).

## 5. Typy
- **GetCardsResponse**: Typ odpowiedzi API dla listy fiszek.
  ```typescript
  export type GetCardsResponse = {
      id: string;
      front: string;
      created_at: string;
  }[];
  ```
- **DeleteCardsCommand**: Typ żądania API dla usuwania fiszek.
  ```typescript
  export type DeleteCardsCommand = {
      card_ids: string[];
  };
  ```

## 6. Zarządzanie stanem
- **Zmienne stanu**:
  - `cards: GetCardsResponse` (lista fiszek).
  - `selectedIds: string[]` (zaznaczone fiszki).
- **Customowe hooki**:
  - `useFetchCards` (do pobierania listy fiszek).
  - `useBulkDelete` (do usuwania zaznaczonych fiszek).

## 7. Integracja API
- **Pobieranie listy fiszek**:
  - Endpoint: `GET /cards`.
  - Typ odpowiedzi: `GetCardsResponse`.
- **Usuwanie zaznaczonych fiszek**:
  - Endpoint: `DELETE /cards`.
  - Typ żądania: `DeleteCardsCommand`.

## 8. Interakcje użytkownika
- Zaznaczenie fiszki: Dodaje jej ID do `selectedIds`.
- Kliknięcie "Usuń zaznaczone": Wysyła żądanie do API i odświeża listę fiszek po sukcesie.

## 9. Warunki i walidacja
- Walidacja odpowiedzi API (np. poprawność danych).
- Obsługa pustych stanów (np. brak fiszek).

## 10. Obsługa błędów
- Wyświetlanie komunikatów o błędach API (np. toast).
- Obsługa błędów sieciowych (np. brak połączenia).

## 11. Kroki implementacji
1. Stworzenie komponentu FlashcardList.
2. Implementacja komponentu FlashcardTable.
3. Implementacja komponentu FlashcardRow.
4. Implementacja komponentu BulkActions.
5. Stworzenie hooków `useFetchCards` i `useBulkDelete`.
6. Integracja z API.
7. Testy jednostkowe i integracyjne.
8. Optymalizacja wydajności (np. React.memo).