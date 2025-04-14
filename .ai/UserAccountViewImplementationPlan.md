# Plan implementacji widoku User Account View

## 1. Przegląd
Widok zarządzania kontem użytkownika umożliwia użytkownikom zmianę hasła oraz usunięcie konta. Jest to kluczowy widok dla funkcji związanych z bezpieczeństwem i zarządzaniem danymi użytkownika.

## 2. Routing widoku
Ścieżka: `/account`

## 3. Struktura komponentów
- **UserAccount** (główny komponent)
  - **ChangePasswordForm** (formularz zmiany hasła)
  - **DeleteAccountButton** (przycisk usunięcia konta z potwierdzeniem)

## 4. Szczegóły komponentów
### UserAccount
- **Opis**: Główny komponent widoku, zarządza stanem i logiką zarządzania kontem.
- **Główne elementy**: ChangePasswordForm, DeleteAccountButton.
- **Obsługiwane interakcje**:
  - Przekazywanie akcji do komponentów dzieci.
- **Obsługiwana walidacja**: Walidacja odpowiedzi API (np. poprawność danych).
- **Typy**: Brak.
- **Propsy**: Brak (komponent główny).

### ChangePasswordForm
- **Opis**: Formularz umożliwiający zmianę hasła użytkownika.
- **Główne elementy**: Pola tekstowe (stare hasło, nowe hasło), przycisk "Zmień hasło".
- **Obsługiwane interakcje**:
  - Wysyłanie żądania zmiany hasła do API.
- **Obsługiwana walidacja**:
  - Walidacja długości i złożoności hasła.
- **Typy**:
  - `UpdatePasswordCommand` (typ żądania API).
- **Propsy**: Brak.

### DeleteAccountButton
- **Opis**: Przycisk umożliwiający usunięcie konta użytkownika.
- **Główne elementy**: Przycisk z potwierdzeniem.
- **Obsługiwane interakcje**:
  - Wysyłanie żądania usunięcia konta do API.
- **Obsługiwana walidacja**: Walidacja odpowiedzi API (np. sukces usunięcia).
- **Typy**:
  - `DeleteUserResponse` (typ odpowiedzi API).
- **Propsy**: Brak.

## 5. Typy
- **UpdatePasswordCommand**: Typ żądania API dla zmiany hasła.
  ```typescript
  export type UpdatePasswordCommand = {
      password: string;
  };
  ```
- **DeleteUserResponse**: Typ odpowiedzi API dla usunięcia konta.
  ```typescript
  export type DeleteUserResponse = {
      message: string;
  };
  ```

## 6. Zarządzanie stanem
- **Zmienne stanu**: Brak (zarządzanie stanem odbywa się na poziomie API).
- **Customowe hooki**:
  - `useChangePassword` (do wysyłania żądania zmiany hasła).
  - `useDeleteAccount` (do wysyłania żądania usunięcia konta).

## 7. Integracja API
- **Zmiana hasła**:
  - Endpoint: `PUT /users/{userId}/password`.
  - Typ żądania: `UpdatePasswordCommand`.
  - Typ odpowiedzi: `{ message: string }`.
- **Usunięcie konta**:
  - Endpoint: `DELETE /users/{userId}`.
  - Typ odpowiedzi: `DeleteUserResponse`.

## 8. Interakcje użytkownika
- Zmiana hasła: Wysyła żądanie do API i wyświetla komunikat o sukcesie lub błędzie.
- Usunięcie konta: Wyświetla potwierdzenie, a następnie wysyła żądanie do API.

## 9. Warunki i walidacja
- Walidacja długości i złożoności hasła.
- Walidacja odpowiedzi API (np. poprawność danych).

## 10. Obsługa błędów
- Wyświetlanie komunikatów o błędach API (np. toast).
- Obsługa błędów sieciowych (np. brak połączenia).

## 11. Kroki implementacji
1. Stworzenie komponentu UserAccount.
2. Implementacja komponentu ChangePasswordForm.
3. Implementacja komponentu DeleteAccountButton.
4. Stworzenie hooków `useChangePassword` i `useDeleteAccount`.
5. Integracja z API.
6. Testy jednostkowe i integracyjne.
7. Optymalizacja wydajności (np. React.memo).