import { GrpcClientFactory, GrpcEvent, GrpcMetadata } from '@ngx-grpc/common';
import { GrpcHandler } from '@ngx-grpc/core';
import { Observable } from 'rxjs';
import * as thisProto from './sip.pb';
import * as googleProtobuf000 from '@ngx-grpc/well-known-types';
import * as i0 from "@angular/core";
/**
 * Service client implementation for ondewo.sip.Sip
 */
export declare class SipClient {
    private handler;
    private client;
    /**
     * Raw RPC implementation for each service client method.
     * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
     * Attention: these methods do not throw errors when non-zero status codes are received.
     */
    $raw: {
        /**
         * Unary call: /ondewo.sip.Sip/SipStartSession
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatus>>
         */
        sipStartSession: (requestData: thisProto.SipStartSessionRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<thisProto.SipStatus>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipEndSession
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatus>>
         */
        sipEndSession: (requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<thisProto.SipStatus>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipStartCall
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatus>>
         */
        sipStartCall: (requestData: thisProto.SipStartCallRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<thisProto.SipStatus>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipEndCall
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatus>>
         */
        sipEndCall: (requestData: thisProto.SipEndCallRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<thisProto.SipStatus>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipTransferCall
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatus>>
         */
        sipTransferCall: (requestData: thisProto.SipTransferCallRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<thisProto.SipStatus>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipRegisterAccount
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatus>>
         */
        sipRegisterAccount: (requestData: thisProto.SipRegisterAccountRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<thisProto.SipStatus>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipGetSipStatus
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatus>>
         */
        sipGetSipStatus: (requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<thisProto.SipStatus>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipGetSipStatusHistory
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatusHistoryResponse>>
         */
        sipGetSipStatusHistory: (requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<thisProto.SipStatusHistoryResponse>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipPlayWavFiles
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatus>>
         */
        sipPlayWavFiles: (requestData: thisProto.SipPlayWavFilesRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<thisProto.SipStatus>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipMute
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatus>>
         */
        sipMute: (requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<thisProto.SipStatus>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipUnMute
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatus>>
         */
        sipUnMute: (requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<thisProto.SipStatus>>;
    };
    constructor(settings: any, clientFactory: GrpcClientFactory<any>, handler: GrpcHandler);
    /**
     * Unary call @/ondewo.sip.Sip/SipStartSession
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatus>
     */
    sipStartSession(requestData: thisProto.SipStartSessionRequest, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
    /**
     * Unary call @/ondewo.sip.Sip/SipEndSession
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatus>
     */
    sipEndSession(requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
    /**
     * Unary call @/ondewo.sip.Sip/SipStartCall
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatus>
     */
    sipStartCall(requestData: thisProto.SipStartCallRequest, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
    /**
     * Unary call @/ondewo.sip.Sip/SipEndCall
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatus>
     */
    sipEndCall(requestData: thisProto.SipEndCallRequest, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
    /**
     * Unary call @/ondewo.sip.Sip/SipTransferCall
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatus>
     */
    sipTransferCall(requestData: thisProto.SipTransferCallRequest, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
    /**
     * Unary call @/ondewo.sip.Sip/SipRegisterAccount
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatus>
     */
    sipRegisterAccount(requestData: thisProto.SipRegisterAccountRequest, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
    /**
     * Unary call @/ondewo.sip.Sip/SipGetSipStatus
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatus>
     */
    sipGetSipStatus(requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
    /**
     * Unary call @/ondewo.sip.Sip/SipGetSipStatusHistory
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatusHistoryResponse>
     */
    sipGetSipStatusHistory(requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatusHistoryResponse>;
    /**
     * Unary call @/ondewo.sip.Sip/SipPlayWavFiles
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatus>
     */
    sipPlayWavFiles(requestData: thisProto.SipPlayWavFilesRequest, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
    /**
     * Unary call @/ondewo.sip.Sip/SipMute
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatus>
     */
    sipMute(requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
    /**
     * Unary call @/ondewo.sip.Sip/SipUnMute
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatus>
     */
    sipUnMute(requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SipClient, [{ optional: true; }, null, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SipClient>;
}
