<decisions>
1. Główne encje do modelowania to Users oraz Cards, przy czym każda fiszka należy do jednego użytkownika, a użytkownik może mieć wiele fiszek.
2. Historia zmian i audytu zostaje pominięta – w bazie przechowywane będą tylko zatwierdzone fiszki.
3. Pola tekstowe "front" (maks. 200 znaków) i "back" (maks. 500 znaków) nie posiadają CHECK constraint, ale walidacja odbywa się na poziomie aplikacji.
4. Użycie typu Serial dla identyfikatorów jest wystarczające dla MVP.
5. Klucze (główne, obce) będą zdefiniowane podczas tworzenia tabel.
6. Kolumna email w tabeli Users musi być unikalna.
7. Triggery będą stosowane do ustawiania daty utworzenia i daty edycji.
8. Zaawansowane aspekty jak RLS, historia edycji, audyt oraz indexowanie zaawansowane pozostają poza MVP.
</decisions>
<matched_recommendations>
1. Oddzielenie tabel Users i Cards z wyraźnym kluczem obcym (user_id) w tabeli Cards.
2. Zapewnienie unikalności kolumny email w tabeli Users.
3. Implementacja trigerów do automatycznego ustawiania dat utworzenia i edycji rekordów.
4. Użycie prostych indeksów na identyfikatorach oraz kolumnie user_id dla szybkiego wyszukiwania.
5. Skupienie się na uproszczonym schemacie dla MVP, bez historii zmian, audytu czy kompleksowego RLS.
</matched_recommendations>
<database_planning_summary>
Główne wymagania dotyczące schematu bazy danych obejmują stworzenie dwóch głównych encji: Users i Cards. Każdy użytkownik (Users) może mieć wiele fiszek (Cards), ale każda fiszka należy do jednego użytkownika. Fiszki obejmują dwa pola tekstowe (front oraz back) z limitem znaków ustalonym na poziomie aplikacji. Dodatkowo, tabela Users posiada unikalny email. Kluczowy aspekt to użycie typu Serial dla identyfikatorów oraz ręczne definiowanie kluczy głównych i obcych. Bezpieczeństwo jest uproszczone, ponieważ aspekty RLS oraz audytu są wyłączone na potrzeby MVP, natomiast triggery dbają o daty utworzenia i modyfikacji.
</database_planning_summary>
<unresolved_issues>
Brak nierozwiązanych kwestii – wszystkie główne założenia zostały omówione.
</unresolved_issues>
