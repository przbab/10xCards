Jesteś doświadczonym menedżerem produktu, którego zadaniem jest stworzenie kompleksowego dokumentu wymagań produktu (PRD) w oparciu o poniższe opisy:

<project_description>

### Główny problem

Manualne tworzenie wysokiej jakości fiszek edukacyjnych jest czasochłonne, co zniechęca do korzystania z efektywnej metody nauki jaką jest spaced repetition.

### Najmniejszy zestaw funkcjonalności

- Generowanie fiszek przez AI na podstawie wprowadzonego tekstu (kopiuj-wklej)
- Manualne tworzenie fiszek
- Przeglądanie, edycja i usuwanie fiszek
- Prosty system kont użytkowników do przechowywania fiszek
- Integracja fiszek z gotowym algorytmem powtórek

### Co NIE wchodzi w zakres MVP

- Własny, zaawansowany algorytm powtórek (jak SuperMemo, Anki)
- Import wielu formatów (PDF, DOCX, itp.)
- Współdzielenie zestawów fiszek między użytkownikami
- Integracje z innymi platformami edukacyjnymi
- Aplikacje mobilne (na początek tylko web)

### Kryteria sukcesu

- 75% fiszek wygenerowanych przez AI jest akceptowane przez użytkownika
- Użytkownicy tworzą 75% fiszek z wykorzystaniem AI
  </project_description>

<project_details>
<conversation_summary>
<decisions>

1. Produkt ma być uniwersalny.
2. Fiszki, zarówno generowane przez AI, jak i tworzone manualnie, składają się z pól "front" (do 200 znaków) i "back" (do 500 znaków) i są przechowywane początkowo w formacie tekstowym.
3. Manualne tworzenie fiszek odbywa się przy użyciu prostego formularza służącego do definiowania pól "front" i "back".
4. Fiszki generowane przez AI są traktowane jako kandydat – użytkownik przesyła tekst do modelu LLM, otrzymuje propozycje fiszek, które może zaakceptować lub odrzucić, a zaakceptowane fiszki są zapisywane w bazie danych.
5. W widoku listy fiszek wyświetlany jest jedynie `front` każdej fiszki, co umożliwia zbiorczą operację usuwania. 6. Funkcjonalność zarządzania kontem w MVP ogranicza się do edycji hasła i usunięcia konta.
   </decisions>
   <matched_recommendations>
6. Zaleca się szczegółowe określenie mechanizmów walidacji formularza po obu stronach (klient i serwer) dla pól "front" i "back".
7. Rekomenduje się zaprojektowanie intuicyjnego interfejsu użytkownika do recenzji kandydatów na fiszki, umożliwiającego proste akceptowanie, edycję i odrzucanie.
   </matched_recommendations>
   <prd_planning_summary>
8. Główne wymagania funkcjonalne produktu obejmują:

- Manualne tworzenie fiszek poprzez prosty formularz.
- Generowanie fiszek przez AI na podstawie wprowadzonego tekstu.
- Recenzję i zatwierdzanie/odrzucanie kandydatów generowanych przez AI.
- Przechowywanie fiszek (tekstowo) wraz z ograniczeniami znaków dla pola "front" (do 200) i "back" (do 500).
- Podstawowe zarządzanie kontem (edytowanie hasła i usunięcie konta).
- Widok listy fiszek umożliwiający zaznaczanie wielu elementów do zbiorczego usuwania.

2. Kluczowe historie użytkownika i ścieżki korzystania:

- Użytkownik wprowadza tekst w celu wygenerowania propozycji fiszek przez model LLM.
- Użytkownik przegląda zwrócone propozycje („kandydaci”), decydując o ich zatwierdzeniu lub odrzuceniu.
- Użytkownik tworzy fiszki manualnie, uzupełniając pola "front" i "back".
- Użytkownik zarządza swoimi fiszkami poprzez listę, gdzie może usuwać zaznaczone fiszki.

3. Ważne kryteria sukcesu:

- Użytkownicy powinni korzystać z funkcji generowania fiszek przez AI w co najmniej 75% przypadków.
- Monitorowanie jakości walidacji i spójności wpisów, dzięki walidacji po stronie klienta i serwera.
  </prd_planning_summary>
  </conversation_summary>
  </project_details>

Wykonaj następujące kroki, aby stworzyć kompleksowy i dobrze zorganizowany dokument:

1. Podziel PRD na następujące sekcje:
   a. Przegląd projektu
   b. Problem użytkownika
   c. Wymagania funkcjonalne
   d. Granice projektu
   e. Historie użytkownika
   f. Metryki sukcesu

2. W każdej sekcji należy podać szczegółowe i istotne informacje w oparciu o opis projektu i odpowiedzi na pytania wyjaśniające. Upewnij się, że:

    - Używasz jasnego i zwięzłego języka
    - W razie potrzeby podajesz konkretne szczegóły i dane
    - Zachowujesz spójność w całym dokumencie
    - Odnosisz się do wszystkich punktów wymienionych w każdej sekcji

3. Podczas tworzenia historyjek użytkownika i kryteriów akceptacji
    - Wymień WSZYSTKIE niezbędne historyjki użytkownika, w tym scenariusze podstawowe, alternatywne i skrajne.
    - Przypisz unikalny identyfikator wymagań (np. US-001) do każdej historyjki użytkownika w celu bezpośredniej identyfikowalności.
    - Uwzględnij co najmniej jedną historię użytkownika specjalnie dla bezpiecznego dostępu lub uwierzytelniania, jeśli aplikacja wymaga identyfikacji użytkownika lub ograniczeń dostępu.
    - Upewnij się, że żadna potencjalna interakcja użytkownika nie została pominięta.
    - Upewnij się, że każda historia użytkownika jest testowalna.

Użyj następującej struktury dla każdej historii użytkownika:

- ID
- Tytuł
- Opis
- Kryteria akceptacji

4. Po ukończeniu PRD przejrzyj go pod kątem tej listy kontrolnej:

    - Czy każdą historię użytkownika można przetestować?
    - Czy kryteria akceptacji są jasne i konkretne?
    - Czy mamy wystarczająco dużo historyjek użytkownika, aby zbudować w pełni funkcjonalną aplikację?
    - Czy uwzględniliśmy wymagania dotyczące uwierzytelniania i autoryzacji (jeśli dotyczy)?

5. Formatowanie PRD:
    - Zachowaj spójne formatowanie i numerację.
    - Nie używaj pogrubionego formatowania w markdown ( \*\* ).
    - Wymień WSZYSTKIE historyjki użytkownika.
    - Sformatuj PRD w poprawnym markdown.

Przygotuj PRD z następującą strukturą:

```markdown
# Dokument wymagań produktu (PRD) - {{app-name}}

## 1. Przegląd produktu

## 2. Problem użytkownika

## 3. Wymagania funkcjonalne

## 4. Granice produktu

## 5. Historyjki użytkowników

## 6. Metryki sukcesu
```

Pamiętaj, aby wypełnić każdą sekcję szczegółowymi, istotnymi informacjami w oparciu o opis projektu i nasze pytania wyjaśniające. Upewnij się, że PRD jest wyczerpujący, jasny i zawiera wszystkie istotne informacje potrzebne do dalszej pracy nad produktem.

Ostateczny wynik powinien składać się wyłącznie z PRD zgodnego ze wskazanym formatem w markdown, który zapiszesz w pliku .ai/prd.md
