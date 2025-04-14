# Plan implementacji widoku Flashcard Generation View

## 1. Przegląd
Widok generowania fiszek umożliwia użytkownikom wklejenie tekstu, który jest przetwarzany przez model AI w celu wygenerowania propozycji fiszek. Użytkownik może zaakceptować, edytować lub odrzucić każdą propozycję.

## 2. Routing widoku
Ścieżka: `/generate`

## 3. Struktura komponentów
- **FlashcardGeneration** (główny komponent)
  - **TextInput** (obsługuje wprowadzanie tekstu przez użytkownika)
  - **GeneratedCardsList** (wyświetla wygenerowane fiszki)
    - **GeneratedCard** (pojedyncza wygenerowana fiszka z opcjami akceptacji, edycji, odrzucenia)

## 4. Szczegóły komponentów
### FlashcardGeneration
- **Opis**: Główny komponent widoku, zarządza stanem i logiką generowania fiszek.
- **Główne elementy**: TextInput, GeneratedCardsList.
- **Obsługiwane interakcje**:
  - Wysyłanie tekstu do API.
  - Zarządzanie stanem wygenerowanych fiszek.
- **Obsługiwana walidacja**: Walidacja odpowiedzi API (np. poprawność danych).
- **Typy**:
  - `AIGeneratedCardsResponse` (typ odpowiedzi API).
- **Propsy**: Brak (komponent główny).

### TextInput
- **Opis**: Pole tekstowe do wprowadzania danych przez użytkownika.
- **Główne elementy**: Textarea, przycisk "Generuj".
- **Obsługiwane interakcje**:
  - Wysyłanie tekstu do API po kliknięciu przycisku.
- **Obsługiwana walidacja**: Walidacja długości tekstu (np. minimalna liczba znaków).
- **Typy**: Brak.
- **Propsy**:
  - `onGenerate: (text: string) => void` (callback do generowania fiszek).

### GeneratedCardsList
- **Opis**: Wyświetla listę wygenerowanych fiszek.
- **Główne elementy**: GeneratedCard.
- **Obsługiwane interakcje**:
  - Przekazywanie akcji (akceptacja, edycja, odrzucenie) do komponentu nadrzędnego.
- **Obsługiwana walidacja**: Brak.
- **Typy**:
  - `AIGeneratedCardsResponse` (typ danych wejściowych).
- **Propsy**:
  - `cards: AIGeneratedCardsResponse` (lista wygenerowanych fiszek).
  - `onAction: (id: string, action: 'accept' | 'edit' | 'reject') => void` (callback do obsługi akcji).

### GeneratedCard
- **Opis**: Reprezentuje pojedynczą wygenerowaną fiszkę.
- **Główne elementy**: Tekst pola "front" i "back", przyciski akcji.
- **Obsługiwane interakcje**:
  - Akceptacja, edycja, odrzucenie fiszki.
- **Obsługiwana walidacja**: Brak.
- **Typy**:
  - `front: string` (tekst pola "front").
  - `back: string` (tekst pola "back").
- **Propsy**:
  - `id: string`.
  - `front: string`.
  - `back: string`.
  - `onAction: (action: 'accept' | 'edit' | 'reject') => void`.

## 5. Typy
- **AIGeneratedCardsResponse**: Typ odpowiedzi API dla wygenerowanych fiszek.
  ```typescript
  export type AIGeneratedCardsResponse = {
      front: string;
      back: string;
  }[];
  ```

## 6. Zarządzanie stanem
- **Zmienne stanu**:
  - `generatedCards: AIGeneratedCardsResponse` (lista wygenerowanych fiszek).
- **Customowe hooki**:
  - `useGenerateCards` (do wysyłania tekstu do API i zarządzania odpowiedzią).

## 7. Integracja API
- **Generowanie fiszek**:
  - Endpoint: `POST /ai/cards`.
  - Typ żądania: `{ text: string }`.
  - Typ odpowiedzi: `AIGeneratedCardsResponse`.

## 8. Interakcje użytkownika
- Wprowadzenie tekstu: Wywołuje API i aktualizuje stan wygenerowanych fiszek.
- Akceptacja fiszki: Dodaje fiszkę do bazy danych.
- Edycja fiszki: Otwiera modal z edytorem.
- Odrzucenie fiszki: Usuwa ją z listy wygenerowanych fiszek.

## 9. Warunki i walidacja
- Walidacja długości tekstu wejściowego.
- Walidacja odpowiedzi API (np. poprawność danych).

## 10. Obsługa błędów
- Wyświetlanie komunikatów o błędach API (np. toast).
- Obsługa błędów sieciowych (np. brak połączenia).

## 11. Kroki implementacji
1. Stworzenie komponentu FlashcardGeneration.
2. Implementacja komponentu TextInput.
3. Implementacja komponentu GeneratedCardsList.
4. Implementacja komponentu GeneratedCard.
5. Stworzenie hooka `useGenerateCards`.
6. Integracja z API.
7. Testy jednostkowe i integracyjne.
8. Optymalizacja wydajności (np. React.memo).