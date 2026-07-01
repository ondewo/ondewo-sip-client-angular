import { firstValueFrom, Observable, of } from "rxjs";
import type { SipClient } from "../../../api/ondewo/sip/sip.pbsc";
import type { SipStartSessionRequest, SipStatus } from "../../../api/ondewo/sip/sip.pb";
import { SipSessionExample } from "./sip-session.example";

// The generated gRPC stubs ship only as compiled type declarations in this repo
// (their runtime lives in the published fesm bundle), so the example's value
// imports are backed by lightweight virtual mocks here. This keeps the test
// hermetic — no live SIP server, no generated-message serialization — while
// still exercising the example's real construct-request -> call-RPC -> map-response
// logic against a mocked SipClient.
jest.mock(
  "../../../api/ondewo/sip/sip.pbsc",
  (): Record<string, unknown> => {
    class SipClientMock {}
    return { SipClient: SipClientMock };
  },
  { virtual: true }
);

jest.mock(
  "../../../api/ondewo/sip/sip.pb",
  (): Record<string, unknown> => {
    class SipStartSessionRequestMock {
      public constructor(value: { accountName: string; autoAnswerInterval: number }) {
        Object.assign(this, value);
      }
    }
    return { SipStartSessionRequest: SipStartSessionRequestMock };
  },
  { virtual: true }
);

/** A representative SIP account the example registers a session for. */
const ACCOUNT_NAME: string = "sip-account-1";

/** Seconds before an incoming call is auto-answered. */
const AUTO_ANSWER_INTERVAL: number = 5;

/** `SipStatus.StatusType.SESSION_STARTED` (enum value `15`) as a plain response stand-in. */
const SESSION_STARTED: number = 15;

/** A mocked {@link SipClient} together with the `sipStartSession` spy it exposes. */
interface MockedSipClient {
  /** The mocked client passed to the example under test. */
  client: SipClient;
  /** The `sipStartSession` jest mock, for asserting on the request it received. */
  sipStartSession: jest.Mock<Observable<SipStatus>, [SipStartSessionRequest]>;
}

/**
 * Build a mocked {@link SipClient} whose `sipStartSession` emits the given status once.
 *
 * @param status the {@link SipStatus} the mocked RPC should return.
 * @returns the mocked client and its `sipStartSession` spy.
 */
function buildClient(status: SipStatus): MockedSipClient {
  const sipStartSession: jest.Mock<Observable<SipStatus>, [SipStartSessionRequest]> = jest
    .fn<Observable<SipStatus>, [SipStartSessionRequest]>()
    .mockReturnValue(of(status));
  const client: SipClient = { sipStartSession } as unknown as SipClient;
  return { client, sipStartSession };
}

/** Unit tests proving the {@link SipSessionExample} usage sample works with a mocked SipClient. */
describe("SipSessionExample", (): void => {
  it("builds a SipStartSessionRequest from its arguments and returns the RPC response", async (): Promise<void> => {
    const expectedStatus: SipStatus = { accountName: ACCOUNT_NAME, statusType: SESSION_STARTED } as unknown as SipStatus;
    const mocked: MockedSipClient = buildClient(expectedStatus);
    const example: SipSessionExample = new SipSessionExample(mocked.client);

    const status: SipStatus = await firstValueFrom(example.startSession(ACCOUNT_NAME, AUTO_ANSWER_INTERVAL));

    expect(mocked.sipStartSession).toHaveBeenCalledTimes(1);
    const passedRequest: SipStartSessionRequest = mocked.sipStartSession.mock.calls[0][0];
    expect(passedRequest.accountName).toBe(ACCOUNT_NAME);
    expect(passedRequest.autoAnswerInterval).toBe(AUTO_ANSWER_INTERVAL);
    expect(status).toBe(expectedStatus);
  });

  it("maps the response down to its status type", async (): Promise<void> => {
    const expectedStatus: SipStatus = { statusType: SESSION_STARTED } as unknown as SipStatus;
    const mocked: MockedSipClient = buildClient(expectedStatus);
    const example: SipSessionExample = new SipSessionExample(mocked.client);

    const statusType: SipStatus.StatusType = await firstValueFrom(
      example.startSessionStatusType(ACCOUNT_NAME, AUTO_ANSWER_INTERVAL)
    );

    expect(statusType).toBe(SESSION_STARTED);
  });
});
