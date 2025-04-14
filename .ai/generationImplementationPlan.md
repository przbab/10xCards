# API Endpoint Implementation Plan: AI-Generated Cards

## 1. Przegląd punktu końcowego
Endpoint `/ai/cards` umożliwia generowanie sugestii kart na podstawie przesłanego tekstu. Wykorzystuje OpenRouter.ai do generowania treści kart.

## 2. Szczegóły żądania
- **Metoda HTTP**: POST
- **Struktura URL**: `/ai/cards`
- **Parametry**:
  - **Wymagane**: `text` (string)
  - **Opcjonalne**: Brak
- **Request Body**:
  ```json
  {
    "text": "string"
  }
  ```

## 3. Wykorzystywane typy
- **Request DTO**:
  ```typescript
  type GenerateCardsRequest = {
    text: string;
  };
  ```
- **Response DTO**: `AIGeneratedCardsResponse` (zdefiniowany w `types.ts`).

## 4. Szczegóły odpowiedzi
- **Struktura odpowiedzi**:
  ```json
  [
    {
      "front": "string",
      "back": "string"
    }
  ]
  ```
- **Kody statusu**:
  - 200 OK: Pomyślne wygenerowanie kart.
  - 400 Bad Request: Nieprawidłowe dane wejściowe.
  - 500 Internal Server Error: Błąd po stronie serwera.

## 5. Przepływ danych
1. Klient wysyła żądanie POST z tekstem do endpointu `/ai/cards`.
2. Backend waliduje dane wejściowe za pomocą Zod.
3. Serwis `AICardsService` wysyła żądanie do OpenRouter.ai w celu wygenerowania treści kart.
4. Otrzymane dane są mapowane na strukturę `AIGeneratedCardsResponse`.
5. Odpowiedź jest zwracana do klienta.

## 6. Względy bezpieczeństwa
- **Autoryzacja**: Endpoint powinien być dostępny tylko dla uwierzytelnionych użytkowników.
- **Walidacja danych**: Użycie Zod do walidacji struktury i długości `text`.
- **Rate-limiting**: Ograniczenie liczby żądań na użytkownika.
- **Bezpieczeństwo API**: Szyfrowanie komunikacji za pomocą HTTPS.

## 7. Obsługa błędów
- **400 Bad Request**: Zwracane, gdy `text` jest pusty lub przekracza maksymalną długość.
- **500 Internal Server Error**: Zwracane w przypadku problemów z OpenRouter.ai lub innymi błędami serwera.

## 8. Rozważania dotyczące wydajności
- **Caching**: Rozważyć cache'owanie wyników dla identycznych żądań.
- **Timeout**: Ustawić limit czasu na odpowiedź od OpenRouter.ai.
- **Asynchroniczność**: Wykorzystać asynchroniczne przetwarzanie żądań.

## 9. Etapy wdrożenia
1. **Utworzenie serwisu**:
   - Stworzyć `AICardsService` do obsługi logiki generowania kart.
   - Zaimplementować komunikację z OpenRouter.ai.
2. **Walidacja danych**:
   - Użyć Zod do walidacji struktury `text`.
3. **Implementacja endpointu**:
   - Utworzyć plik w `src/middleware` dla obsługi `/ai/cards`.
   - Wykorzystać `supabase` z `context.locals` do autoryzacji.
4. **Testy jednostkowe**:
   - Napisać testy dla walidacji danych i serwisu.
5. **Testy integracyjne**:
   - Przetestować pełny przepływ danych od żądania do odpowiedzi.
6. **Monitorowanie**:
   - Wdrożyć logowanie błędów i monitorowanie wydajności.