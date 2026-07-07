/**
 * Minimal, idiomatic usage example for `@ondewo/sip-client-angular`.
 *
 * It shows the representative shape a consuming Angular application uses to drive
 * the ONDEWO SIP service: inject the generated {@link SipClient}, build a typed
 * request message, call a unary RPC and consume the streamed response.
 *
 * Authentication is handled transparently by this library's Keycloak bearer-auth
 * surface — register {@link provideOndewoSipAuth} (and a {@link TokenProvider},
 * e.g. the built-in `KeycloakTokenProvider`) once at bootstrap and the
 * `AuthGrpcInterceptor` attaches `Authorization: Bearer <token>` to every call
 * this service makes; no credential handling is needed here.
 *
 * ```ts
 * const example: SipSessionExample = inject(SipSessionExample);
 * example.startSession("sip-account-1", 5).subscribe((status: SipStatus): void => {
 *   console.log(status.statusType, status.accountName);
 * });
 * ```
 */
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { SipClient } from "../../../api/ondewo/sip/sip.pbsc";
import { SipStartSessionRequest, SipStatus } from "../../../api/ondewo/sip/sip.pb";

/**
 * Thin, injectable wrapper around the generated {@link SipClient} that
 * demonstrates the canonical construct-request → call-RPC → handle-response flow.
 */
@Injectable({ providedIn: "root" })
export class SipSessionExample {
  /**
   * @param sipClient the generated `ondewo.sip.Sip` service client, provided by
   *   `@ngx-grpc` DI; the library's `AuthGrpcInterceptor` authorizes its calls.
   */
  public constructor(private readonly sipClient: SipClient) {}

  /**
   * Start a SIP session for the given account and return the resulting status.
   *
   * @param accountName the SIP account to register the session for.
   * @param autoAnswerInterval seconds before an incoming call is auto-answered
   *   (`0` disables auto-answer).
   * @returns an observable emitting the session's {@link SipStatus} once.
   */
  public startSession(accountName: string, autoAnswerInterval: number): Observable<SipStatus> {
    const request: SipStartSessionRequest = new SipStartSessionRequest({ accountName, autoAnswerInterval });
    return this.sipClient.sipStartSession(request);
  }

  /**
   * Start a SIP session and project the response down to just its status type,
   * illustrating how a caller maps the RPC response to application state.
   *
   * @param accountName the SIP account to register the session for.
   * @param autoAnswerInterval seconds before an incoming call is auto-answered.
   * @returns an observable emitting the session's {@link SipStatus.StatusType} once.
   */
  public startSessionStatusType(
    accountName: string,
    autoAnswerInterval: number
  ): Observable<SipStatus.StatusType> {
    return this.startSession(accountName, autoAnswerInterval).pipe(
      map((status: SipStatus): SipStatus.StatusType => status.statusType)
    );
  }
}
