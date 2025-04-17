<authentication_analysis>

1. **Authentication Flows**:

    - Registration
    - Login
    - Password Recovery
    - Password Reset
    - Logout

2. **Key Actors**:

    - Browser
    - Middleware
    - Astro API
    - Supabase Auth

3. **Token Verification and Refresh**:

    - Tokens are validated for each request.
    - Refresh tokens are used to maintain sessions, with rotation enabled for added security.

4. **Steps in the Authentication Process**:
    - User interacts with the frontend (e.g., submits login form).
    - Middleware checks authentication state and forwards requests to the Astro API.
    - Astro API communicates with Supabase Auth for user validation.
    - Supabase Auth processes the request and returns a response (e.g., token, error).
    - Middleware handles session management and redirects as needed.
      </authentication_analysis>

<mermaid_diagram>

```mermaid
sequenceDiagram
    autonumber
    participant Browser
    participant Middleware
    participant AstroAPI as Astro API
    participant SupabaseAuth as Supabase Auth

    Browser->>Middleware: Request (e.g., Login, Register)
    activate Middleware
    Middleware->>AstroAPI: Forward request
    activate AstroAPI
    AstroAPI->>SupabaseAuth: Validate credentials
    activate SupabaseAuth
    SupabaseAuth-->>AstroAPI: Response (e.g., Token, Error)
    deactivate SupabaseAuth
    AstroAPI-->>Middleware: Response
    deactivate AstroAPI
    Middleware-->>Browser: Response (e.g., Redirect, Error)
    deactivate Middleware

    alt Token Expired
        Browser->>Middleware: Request with expired token
        Middleware->>AstroAPI: Refresh token
        AstroAPI->>SupabaseAuth: Validate refresh token
        SupabaseAuth-->>AstroAPI: New token
        AstroAPI-->>Middleware: New token
        Middleware-->>Browser: New token
    else Token Valid
        Browser->>Middleware: Request with valid token
        Middleware->>AstroAPI: Forward request
        AstroAPI-->>Middleware: Response
        Middleware-->>Browser: Response
    end

    Browser->>Middleware: Logout request
    Middleware->>SupabaseAuth: Invalidate session
    SupabaseAuth-->>Middleware: Session invalidated
    Middleware-->>Browser: Logout successful
```

</mermaid_diagram>
