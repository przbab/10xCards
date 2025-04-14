# Architektura UI dla 10xCards

## 1. Przegląd struktury UI

Aplikacja 10xCards składa się z czterech głównych widoków: listy fiszek, generowania fiszek, edycji fiszek oraz zarządzania kontem użytkownika. Każdy widok jest zoptymalizowany pod kątem responsywności i dostępności, z intuicyjną nawigacją między ekranami. Interfejs wykorzystuje React z Tailwind CSS oraz Astro Islands dla komponentów interaktywnych.

## 2. Lista widoków

### Flashcard List View
- **Ścieżka widoku**: `/flashcards`
- **Główny cel**: Wyświetlenie listy fiszek i umożliwienie ich zbiorczego usuwania.
- **Kluczowe informacje do wyświetlenia**: Pole "front" każdej fiszki.
- **Kluczowe komponenty widoku**:
  - Tabela lub siatka fiszek.
  - Checkboxy do zaznaczania wielu fiszek.
  - Przycisk "Usuń zaznaczone".
- **UX, dostępność i względy bezpieczeństwa**:
  - Wyraźne komunikaty potwierdzające usunięcie.
  - Obsługa pustych stanów (np. brak fiszek).

### Flashcard Generation View
- **Ścieżka widoku**: `/generate`
- **Główny cel**: Generowanie fiszek za pomocą AI i umożliwienie ich zatwierdzenia.
- **Kluczowe informacje do wyświetlenia**: Lista wygenerowanych fiszek.
- **Kluczowe komponenty widoku**:
  - Karty z wygenerowanymi fiszkami (przyciski akceptacji, edycji, odrzucenia).
  - Loader informujący o trwającym zapytaniu do API.
- **UX, dostępność i względy bezpieczeństwa**:
  - Obsługa błędów API (np. brak odpowiedzi).
  - Intuicyjne przyciski akcji dla każdej fiszki.

### Flashcard Edit View
- **Ścieżka widoku**: `/flashcards/:id/edit`
- **Główny cel**: Edycja pojedynczej fiszki.
- **Kluczowe informacje do wyświetlenia**: Pola "front" i "back" fiszki.
- **Kluczowe komponenty widoku**:
  - Formularz edycji z walidacją.
  - Przycisk "Zapisz zmiany".
- **UX, dostępność i względy bezpieczeństwa**:
  - Walidacja pól (200 znaków dla "front", 500 znaków dla "back").
  - Wyraźne komunikaty o sukcesie lub błędzie.

### User Account View
- **Ścieżka widoku**: `/account`
- **Główny cel**: Zarządzanie kontem użytkownika (zmiana hasła, usunięcie konta).
- **Kluczowe informacje do wyświetlenia**: Formularze zmiany hasła i usunięcia konta.
- **Kluczowe komponenty widoku**:
  - Formularz zmiany hasła.
  - Przycisk "Usuń konto" z potwierdzeniem.
- **UX, dostępność i względy bezpieczeństwa**:
  - Potwierdzenie przed usunięciem konta.
  - Obsługa błędów API (np. nieprawidłowe hasło).

## 3. Mapa podróży użytkownika

1. Użytkownik rozpoczyna na widoku listy fiszek (`/flashcards`).
2. Może przejść do widoku generowania fiszek (`/generate`) w celu utworzenia nowych fiszek.
3. Kliknięcie w fiszkę na liście przenosi użytkownika do widoku edycji (`/flashcards/:id/edit`).
4. Użytkownik może przejść do widoku zarządzania kontem (`/account`) z menu głównego.

## 4. Układ i struktura nawigacji

- Główne menu nawigacyjne z linkami do:
  - "Flashcards" (lista fiszek).
  - "Generate" (generowanie fiszek).
  - "Account" (zarządzanie kontem).
- Breadcrumbs lub przycisk "Wstecz" na widokach edycji i generowania.

## 5. Kluczowe komponenty

- **Tabela fiszek**: Wyświetla listę fiszek z checkboxami do zaznaczania.
- **Karty AI**: Wyświetlają wygenerowane fiszki z przyciskami akcji.
- **Formularze**: Do edycji fiszek i zarządzania kontem.
- **Loader**: Informuje o trwających operacjach API.
- **Alerty/Toasty**: Wyświetlają komunikaty o sukcesie lub błędach.