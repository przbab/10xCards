<user_journey_analysis>

1. **Ścieżki użytkownika**:

    - Rejestracja nowego konta.
    - Logowanie do istniejącego konta.
    - Odzyskiwanie hasła.
    - Wylogowanie.

2. **Główne podróże i stany**:

    - Strona główna (niezalogowany użytkownik).
    - Formularz rejestracji.
    - Formularz logowania.
    - Formularz odzyskiwania hasła.
    - Weryfikacja tokena (dla odzyskiwania hasła).
    - Panel użytkownika (zalogowany użytkownik).

3. **Punkty decyzyjne i alternatywne ścieżki**:

    - Czy dane logowania są poprawne?
    - Czy token weryfikacyjny jest poprawny?
    - Czy użytkownik potwierdził rejestrację przez e-mail?

4. **Opis celu każdego stanu**:
    - **Strona główna**: Punkt startowy dla niezalogowanego użytkownika.
    - **Formularz rejestracji**: Umożliwia utworzenie nowego konta.
    - **Formularz logowania**: Umożliwia dostęp do konta użytkownika.
    - **Formularz odzyskiwania hasła**: Pozwala użytkownikowi zainicjować proces resetowania hasła.
    - **Weryfikacja tokena**: Sprawdza poprawność tokena resetującego hasło.
    - **Panel użytkownika**: Główne miejsce zarządzania kontem i fiszkami dla zalogowanego użytkownika.
      </user_journey_analysis>

<mermaid_diagram>

```mermaid
stateDiagram-v2
    [*] --> StronaGlowna

    state "Proces Rejestracji" as Rejestracja {
        [*] --> FormularzRejestracji
        FormularzRejestracji --> WalidacjaDanych
        WalidacjaDanych --> WyslanieMaila
        WyslanieMaila --> PotwierdzenieEmail
        PotwierdzenieEmail --> [*]
    }

    state "Proces Logowania" as Logowanie {
        [*] --> FormularzLogowania
        FormularzLogowania --> WalidacjaDanychLogowania
        state if_logowanie <<choice>>
        WalidacjaDanychLogowania --> if_logowanie
        if_logowanie --> PanelUzytkownika: Dane poprawne
        if_logowanie --> FormularzLogowania: Dane błędne
    }

    state "Proces Odzyskiwania Hasła" as OdzyskiwanieHasla {
        [*] --> FormularzOdzyskiwaniaHasla
        FormularzOdzyskiwaniaHasla --> WyslanieTokena
        WyslanieTokena --> WeryfikacjaTokena
        state if_token <<choice>>
        WeryfikacjaTokena --> if_token
        if_token --> FormularzNoweHaslo: Token poprawny
        if_token --> FormularzOdzyskiwaniaHasla: Token błędny
        FormularzNoweHaslo --> [*]
    }

    StronaGlowna --> Rejestracja: Rejestracja
    StronaGlowna --> Logowanie: Logowanie
    StronaGlowna --> OdzyskiwanieHasla: Odzyskiwanie hasła
    PanelUzytkownika --> [*]: Wylogowanie
```

</mermaid_diagram>
