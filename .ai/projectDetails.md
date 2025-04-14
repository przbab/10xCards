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
