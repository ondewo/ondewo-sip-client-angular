import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, switchMap } from "rxjs";
import { AUTHORIZATION_HEADER, resolveBearerValue } from "./resolve-token";
import { TOKEN_PROVIDER, TokenProvider } from "./token-provider";

/**
 * Functional Angular `HttpInterceptor` that attaches the current Keycloak access
 * token as an `Authorization: Bearer <token>` header to outgoing HTTP requests.
 *
 * Behaviour:
 * - token present  → a cloned request carrying the bearer header is forwarded.
 * - token absent / empty → the original request is forwarded untouched (no empty
 *   `Bearer` header is ever sent).
 * - token source is async (Promise/Observable) → resolved before the request is
 *   sent.
 * - an existing `Authorization` header on the request is left untouched, so a
 *   caller that already set credentials explicitly wins.
 *
 * Register it in the application's HTTP pipeline:
 *
 * ```ts
 * provideHttpClient(withInterceptors([authHttpInterceptor]))
 * ```
 *
 * Errors raised by the `TokenProvider` propagate to the caller (the request is
 * not sent) so an authentication failure surfaces rather than silently issuing
 * an unauthenticated request.
 *
 * @param req the outgoing HTTP request.
 * @param next the next handler in the interceptor chain.
 * @returns the stream of HTTP events for the (possibly authorized) request.
 */
export function authHttpInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  if (req.headers.has(AUTHORIZATION_HEADER)) {
    return next(req);
  }

  const tokenProvider: TokenProvider = inject(TOKEN_PROVIDER);

  return resolveBearerValue(tokenProvider.getToken()).pipe(
    switchMap((bearerValue: string | null): Observable<HttpEvent<unknown>> => {
      if (bearerValue === null) {
        return next(req);
      }
      const authorizedRequest = req.clone({
        setHeaders: { [AUTHORIZATION_HEADER]: bearerValue }
      });
      return next(authorizedRequest);
    })
  );
}
