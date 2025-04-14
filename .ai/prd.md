# Dokument wymagań produktu (PRD) - 10xCards

## 1. Przegląd produktu

Produkt 10xCards to aplikacja webowa usprawniająca tworzenie wysokiej jakości fiszek edukacyjnych. System pozwala na generowanie fiszek za pomocą sztucznej inteligencji oraz tworzenie ich manualnie. Aplikacja umożliwia dalsze zarządzanie fiszkami przez użytkowników poprzez przeglądanie, edycję i usuwanie, a także integrację z gotowym algorytmem powtórek.

## 2. Problem użytkownika

Manualne tworzenie fiszek edukacyjnych jest czasochłonne i wymaga dużego nakładu pracy, co zniechęca użytkowników do korzystania z efektywnej metody nauki, jaką jest spaced repetition. Produkt ma rozwiązać problem przez automatyzację procesu generowania fiszek oraz uproszczenie ręcznego ich tworzenia.

## 3. Wymagania funkcjonalne

- Manualne tworzenie fiszek:
    - Formularz umożliwiający wprowadzenie dwóch pól: front (maks. 200 znaków) oraz back (maks. 500 znaków).
    - Walidacja po stronie klienta i serwera.
- Generowanie fiszek przez AI:
    - Użytkownik wkleja tekst do modelu LLM.
    - System generuje propozycje fiszek będące kandydatami.
    - Kandydaci nie są zapisywani w bazie danych, chyba że użytkownik ich zatwierdzi.
- Recenzja fiszek generowanych przez AI:
    - Użytkownik może zaakceptować, edytować lub odrzucić każdą propozycję.
    - Zaakceptowane fiszki są zapisywane w bazie danych.
- Przeglądanie i zarządzanie fiszkami:
    - Widok listy fiszek wyświetla jedynie pole front każdej fiszki.
    - Umożliwienie zaznaczania wielu fiszek dla operacji zbiorczego usuwania.
- Uwierzytelnianie i zarządzanie kontem:
    - Podstawowa funkcjonalność konta użytkownika ograniczona do edycji hasła i usunięcia konta.
- Integracja z algorytmem powtórek:
    - Fiszki mają być zintegrowane z gotowym algorytmem powtórek.

## 4. Granice produktu

- Nie będą wdrażane:
    - Zaawansowany algorytm powtórek na wzór SuperMemo czy Anki.
    - Import wielu formatów (PDF, DOCX, itp.).
    - Współdzielenie zestawów fiszek między użytkownikami.
    - Integracje z zewnętrznymi platformami edukacyjnymi.
    - Aplikacje mobilne – na początek jedynie wersja web.
- Fiszki będą przechowywane początkowo wyłącznie w formacie tekstowym.

## 5. Historyjki użytkowników

### US-001: Manualne tworzenie fiszek

- Tytuł: Tworzenie fiszek manualnie
- Opis: Użytkownik wypełnia prosty formularz, wprowadzając wartości do pól front (maks. 200 znaków) i back (maks. 500 znaków), a następnie zapisuje fiszkę.
- Kryteria akceptacji:
    - Użytkownik może wprowadzić dane do pól front i back.
    - System waliduje długość pól po stronie klienta i serwera.
    - Po zapisaniu, fiszka jest dodana do listy użytkownika.

### US-002: Generowanie fiszek przez AI

- Tytuł: Generowanie fiszek za pomocą AI
- Opis: Użytkownik wkleja tekst do interfejsu, który wysyła zapytanie do modelu LLM, a system zwraca propozycje fiszek. Użytkownik przegląda kandydatów, akceptując lub odrzucając je.
- Kryteria akceptacji:
    - Użytkownik może wysłać tekst do systemu.
    - System zwraca propozycje fiszek (kandydatów) bez zapisywania ich w bazie.
    - Użytkownik ma możliwość akceptacji, edycji lub odrzucenia każdej propozycji.
    - Zaakceptowana fiszka jest zapisywana w bazie danych.

### US-003: Przeglądanie i zarządzanie fiszkami

- Tytuł: Zarządzanie listą fiszek
- Opis: Użytkownik przegląda listę fiszek, gdzie każda fiszka wyświetla jedynie pole front, i może zaznaczyć wiele fiszek w celu wykonania zbiorczego usunięcia.
- Kryteria akceptacji:
    - Lista fiszek wyświetla poprawnie pole front każdej fiszki.
    - Użytkownik może zaznaczyć wiele fiszek.
    - System umożliwia wykonanie operacji usuwania na zaznaczonych elementach.

### US-004: Zarządzanie kontem użytkownika

- Tytuł: Edycja hasła i usunięcie konta
- Opis: Użytkownik ma możliwość zmiany hasła oraz usunięcia swojego konta za pomocą dostępnych opcji.
- Kryteria akceptacji:
    - Użytkownik może zmienić swoje hasło przy użyciu formularza.
    - System potwierdza zmianę hasła.
    - Użytkownik może usunąć swoje konto, co skutkuje usunięciem wszystkich danych powiązanych z kontem.

## 6. Metryki sukcesu

- Co najmniej 75% fiszek generowanych przez AI musi być zaakceptowanych przez użytkowników.
- Użytkownicy powinni wykorzystać funkcję generowania fiszek przez AI do tworzenia minimum 75% wszystkich fiszek.
- System musi zapewniać spójną walidację danych po stronie klienta i serwera.
- Interfejs i przepływ recenzji kandydatów muszą umożliwiać szybkie i intuicyjne zatwierdzanie lub odrzucanie fiszek.
