# Specyfikacja techniczna modułu rejestracji, logowania i odzyskiwania hasła użytkowników

## 1. ARCHITEKTURA INTERFEJSU UŻYTKOWNIKA

### Zmiany w warstwie frontendu

#### Nowe strony Astro:

1. **Strona rejestracji (`pages/auth/register.astro`)**

    - Formularz rejestracji z polami:
        - Email (walidacja: poprawny format email)
        - Hasło (walidacja: minimum 8 znaków, co najmniej jedna litera i cyfra)
        - Potwierdzenie hasła (walidacja: zgodność z hasłem)
    - Komunikaty błędów i sukcesu:
        - Wykorzystanie komponentu `sonner` z shadcn do wyświetlania powiadomień.
    - Przycisk "Zarejestruj się" wysyłający dane do backendu.

2. **Strona logowania (`pages/auth/login.astro`)**

    - Formularz logowania z polami:
        - Email
        - Hasło
    - Komunikaty błędów i sukcesu:
        - Wykorzystanie komponentu `sonner` z shadcn do wyświetlania powiadomień.
    - Przycisk "Zaloguj się" oraz link do odzyskiwania hasła.

3. **Strona odzyskiwania hasła (`pages/auth/recover.astro`)**

    - Formularz z polem email.
    - Komunikaty błędów i sukcesu:
        - Wykorzystanie komponentu `sonner` z shadcn do wyświetlania powiadomień.
    - Przycisk "Wyślij link do resetowania hasła".

4. **Strona resetowania hasła (`pages/auth/reset.astro`)**
    - Formularz z polami:
        - Nowe hasło
        - Potwierdzenie nowego hasła
    - Komunikaty błędów i sukcesu:
        - Wykorzystanie komponentu `sonner` z shadcn do wyświetlania powiadomień.
    - Przycisk "Zresetuj hasło".

#### Rozszerzenia istniejących elementów:

- **`layouts/Layout.astro`**:
    - Dodanie przycisków "Zaloguj się" i "Wyloguj się" w prawym górnym rogu.
    - Warunkowe renderowanie przycisków w zależności od stanu uwierzytelnienia użytkownika.

#### Komponenty React:

1. **`components/ui/AuthForm.tsx`**

    - Wielokrotnego użytku formularz obsługujący rejestrację, logowanie i resetowanie hasła.
    - Propsy:
        - `type`: "register" | "login" | "recover" | "reset"
        - `onSubmit`: funkcja obsługująca wysyłanie danych.

2. **`components/ui/sonner.tsx`**
    - Wykorzystanie komponentu `sonner` z shadcn do wyświetlania powiadomień o błędach i sukcesach.

### Scenariusze obsługi:

- Rejestracja nowego użytkownika.
- Logowanie istniejącego użytkownika.
- Wylogowanie użytkownika.
- Odzyskiwanie hasła przez email.
- Resetowanie hasła.

## 2. LOGIKA BACKENDOWA

### Struktura endpointów API:

1. **`POST /api/auth/register`**

    - Dane wejściowe:
        - Email
        - Hasło
    - Walidacja:
        - Poprawny format email
        - Hasło spełniające wymagania bezpieczeństwa
    - Obsługa wyjątków:
        - Email już zarejestrowany.

2. **`POST /api/auth/login`**

    - Dane wejściowe:
        - Email
        - Hasło
    - Walidacja:
        - Poprawny format email
    - Obsługa wyjątków:
        - Nieprawidłowe dane logowania.

3. **`POST /api/auth/recover`**

    - Dane wejściowe:
        - Email
    - Walidacja:
        - Poprawny format email
    - Obsługa wyjątków:
        - Email nie istnieje w systemie.

4. **`POST /api/auth/reset`**
    - Dane wejściowe:
        - Token resetujący
        - Nowe hasło
    - Walidacja:
        - Token jest ważny
        - Hasło spełniające wymagania bezpieczeństwa
    - Obsługa wyjątków:
        - Token wygasł lub jest nieprawidłowy.

### Modele danych:

- **Użytkownik**:
    - Zarządzanie użytkownikami odbywa się za pomocą wbudowanego systemu autoryzacji Supabase.

## 3. SYSTEM AUTENTYKACJI

### Wykorzystanie Supabase Auth:

- **Rejestracja**:
    - Wywołanie `supabase.auth.signUp` z email i hasłem.
- **Logowanie**:
    - Wywołanie `supabase.auth.signInWithPassword` z email i hasłem.
- **Wylogowanie**:
    - Wywołanie `supabase.auth.signOut`.
- **Odzyskiwanie hasła**:
    - Wywołanie `supabase.auth.resetPasswordForEmail` z email.
- **Resetowanie hasła**:
    - Wywołanie `supabase.auth.updateUser` z nowym hasłem.

### Integracja z Astro:

- Middleware (`middleware/index.ts`):
    - Sprawdzanie stanu uwierzytelnienia użytkownika na serwerze.
    - Przekierowanie nieautoryzowanych użytkowników na stronę logowania.
- Zmienne środowiskowe:
    - `SUPABASE_URL`
    - `SUPABASE_ANON_KEY`

### Bezpieczeństwo:

- Hasła przechowywane jako hash (Supabase).
- Tokeny resetujące hasło z ograniczonym czasem ważności.
- Walidacja danych wejściowych po stronie klienta i serwera.
