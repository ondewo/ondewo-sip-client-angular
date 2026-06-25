import { GrpcEvent, GrpcMessage, GrpcRequest } from "@ngx-grpc/common";
import { GrpcHandler, GrpcInterceptor } from "@ngx-grpc/core";
import { Inject, Injectable } from "@angular/core";
import { Observable, switchMap } from "rxjs";
import { AUTHORIZATION_HEADER, resolveBearerValue } from "./resolve-token";
import { TOKEN_PROVIDER, TokenProvider } from "./token-provider";

/**
 * `@ngx-grpc` interceptor that attaches the current Keycloak access token as an
 * `authorization: Bearer <token>` entry on the gRPC-web request metadata. This
 * is the gRPC-web counterpart of {@link authHttpInterceptor} and matches the
 * `@ngx-grpc` client style used by the generated `SipClient` service client
 * (`api/ondewo/sip/sip.pbsc.ts`) in this library.
 *
 * Behaviour mirrors the HTTP interceptor:
 * - token present → the bearer credential is set on `requestMetadata`.
 * - token absent / empty → the request metadata is left untouched (no empty
 *   `Bearer` value is ever attached).
 * - token source is async (Promise/Observable) → resolved before the request is
 *   handed to the next handler.
 * - an `authorization` entry already present on the request metadata is left
 *   untouched, so an explicitly-set credential wins.
 *
 * Register it via the standard `@ngx-grpc` multi-provider:
 *
 * ```ts
 * providers: [
 *   { provide: GRPC_INTERCEPTORS, useClass: AuthGrpcInterceptor, multi: true },
 * ]
 * ```
 */
@Injectable()
export class AuthGrpcInterceptor implements GrpcInterceptor {
  constructor(@Inject(TOKEN_PROVIDER) private readonly tokenProvider: TokenProvider) {}

  /**
   * Attach the bearer credential (when available) to the request metadata, then
   * delegate to the next handler in the chain.
   *
   * @param request the intercepted gRPC request.
   * @param next the next handler to pass the request through.
   * @returns the stream of gRPC events for the (possibly authorized) request.
   */
  public intercept<Q extends GrpcMessage, S extends GrpcMessage>(
    request: GrpcRequest<Q, S>,
    next: GrpcHandler
  ): Observable<GrpcEvent<S>> {
    if (request.requestMetadata.has(AUTHORIZATION_HEADER)) {
      return next.handle(request);
    }

    return resolveBearerValue(this.tokenProvider.getToken()).pipe(
      switchMap((bearerValue: string | null): Observable<GrpcEvent<S>> => {
        if (bearerValue !== null) {
          request.requestMetadata.set(AUTHORIZATION_HEADER, bearerValue);
        }
        return next.handle(request);
      })
    );
  }
}
