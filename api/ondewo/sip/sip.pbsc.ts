/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { Inject, Injectable, Optional } from '@angular/core';
import {
  GrpcCallType,
  GrpcClient,
  GrpcClientFactory,
  GrpcEvent,
  GrpcMetadata
} from '@ngx-grpc/common';
import {
  GRPC_CLIENT_FACTORY,
  GrpcHandler,
  takeMessages,
  throwStatusErrors
} from '@ngx-grpc/core';
import { Observable } from 'rxjs';
import * as thisProto from './sip.pb';
import * as googleProtobuf000 from '@ngx-grpc/well-known-types';
import * as googleProtobuf001 from '@ngx-grpc/well-known-types';
import { GRPC_SIP_CLIENT_SETTINGS } from './sip.pbconf';
/**
 * Service client implementation for ondewo.sip.Sip
 */
@Injectable({ providedIn: 'any' })
export class SipClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary call: /ondewo.sip.Sip/SipStartSession
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatus>>
     */
    sipStartSession: (
      requestData: thisProto.SipStartSessionRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.SipStatus>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/ondewo.sip.Sip/SipStartSession',
        requestData,
        requestMetadata,
        requestClass: thisProto.SipStartSessionRequest,
        responseClass: thisProto.SipStatus
      });
    },
    /**
     * Unary call: /ondewo.sip.Sip/SipEndSession
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatus>>
     */
    sipEndSession: (
      requestData: googleProtobuf000.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.SipStatus>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/ondewo.sip.Sip/SipEndSession',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf000.Empty,
        responseClass: thisProto.SipStatus
      });
    },
    /**
     * Unary call: /ondewo.sip.Sip/SipStartCall
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatus>>
     */
    sipStartCall: (
      requestData: thisProto.SipStartCallRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.SipStatus>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/ondewo.sip.Sip/SipStartCall',
        requestData,
        requestMetadata,
        requestClass: thisProto.SipStartCallRequest,
        responseClass: thisProto.SipStatus
      });
    },
    /**
     * Unary call: /ondewo.sip.Sip/SipEndCall
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatus>>
     */
    sipEndCall: (
      requestData: thisProto.SipEndCallRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.SipStatus>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/ondewo.sip.Sip/SipEndCall',
        requestData,
        requestMetadata,
        requestClass: thisProto.SipEndCallRequest,
        responseClass: thisProto.SipStatus
      });
    },
    /**
     * Unary call: /ondewo.sip.Sip/SipTransferCall
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatus>>
     */
    sipTransferCall: (
      requestData: thisProto.SipTransferCallRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.SipStatus>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/ondewo.sip.Sip/SipTransferCall',
        requestData,
        requestMetadata,
        requestClass: thisProto.SipTransferCallRequest,
        responseClass: thisProto.SipStatus
      });
    },
    /**
     * Unary call: /ondewo.sip.Sip/SipRegisterAccount
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatus>>
     */
    sipRegisterAccount: (
      requestData: thisProto.SipRegisterAccountRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.SipStatus>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/ondewo.sip.Sip/SipRegisterAccount',
        requestData,
        requestMetadata,
        requestClass: thisProto.SipRegisterAccountRequest,
        responseClass: thisProto.SipStatus
      });
    },
    /**
     * Unary call: /ondewo.sip.Sip/SipGetSipStatus
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatus>>
     */
    sipGetSipStatus: (
      requestData: googleProtobuf000.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.SipStatus>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/ondewo.sip.Sip/SipGetSipStatus',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf000.Empty,
        responseClass: thisProto.SipStatus
      });
    },
    /**
     * Unary call: /ondewo.sip.Sip/SipGetSipStatusHistory
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatusHistoryResponse>>
     */
    sipGetSipStatusHistory: (
      requestData: googleProtobuf000.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.SipStatusHistoryResponse>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/ondewo.sip.Sip/SipGetSipStatusHistory',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf000.Empty,
        responseClass: thisProto.SipStatusHistoryResponse
      });
    },
    /**
     * Unary call: /ondewo.sip.Sip/SipPlayWavFiles
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatus>>
     */
    sipPlayWavFiles: (
      requestData: thisProto.SipPlayWavFilesRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.SipStatus>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/ondewo.sip.Sip/SipPlayWavFiles',
        requestData,
        requestMetadata,
        requestClass: thisProto.SipPlayWavFilesRequest,
        responseClass: thisProto.SipStatus
      });
    },
    /**
     * Unary call: /ondewo.sip.Sip/SipMute
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatus>>
     */
    sipMute: (
      requestData: googleProtobuf000.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.SipStatus>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/ondewo.sip.Sip/SipMute',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf000.Empty,
        responseClass: thisProto.SipStatus
      });
    },
    /**
     * Unary call: /ondewo.sip.Sip/SipUnMute
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatus>>
     */
    sipUnMute: (
      requestData: googleProtobuf000.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.SipStatus>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/ondewo.sip.Sip/SipUnMute',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf000.Empty,
        responseClass: thisProto.SipStatus
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_SIP_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('ondewo.sip.Sip', settings);
  }

  /**
   * Unary call @/ondewo.sip.Sip/SipStartSession
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatus>
   */
  sipStartSession(
    requestData: thisProto.SipStartSessionRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.SipStatus> {
    return this.$raw
      .sipStartSession(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/ondewo.sip.Sip/SipEndSession
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatus>
   */
  sipEndSession(
    requestData: googleProtobuf000.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.SipStatus> {
    return this.$raw
      .sipEndSession(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/ondewo.sip.Sip/SipStartCall
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatus>
   */
  sipStartCall(
    requestData: thisProto.SipStartCallRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.SipStatus> {
    return this.$raw
      .sipStartCall(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/ondewo.sip.Sip/SipEndCall
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatus>
   */
  sipEndCall(
    requestData: thisProto.SipEndCallRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.SipStatus> {
    return this.$raw
      .sipEndCall(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/ondewo.sip.Sip/SipTransferCall
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatus>
   */
  sipTransferCall(
    requestData: thisProto.SipTransferCallRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.SipStatus> {
    return this.$raw
      .sipTransferCall(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/ondewo.sip.Sip/SipRegisterAccount
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatus>
   */
  sipRegisterAccount(
    requestData: thisProto.SipRegisterAccountRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.SipStatus> {
    return this.$raw
      .sipRegisterAccount(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/ondewo.sip.Sip/SipGetSipStatus
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatus>
   */
  sipGetSipStatus(
    requestData: googleProtobuf000.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.SipStatus> {
    return this.$raw
      .sipGetSipStatus(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/ondewo.sip.Sip/SipGetSipStatusHistory
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatusHistoryResponse>
   */
  sipGetSipStatusHistory(
    requestData: googleProtobuf000.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.SipStatusHistoryResponse> {
    return this.$raw
      .sipGetSipStatusHistory(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/ondewo.sip.Sip/SipPlayWavFiles
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatus>
   */
  sipPlayWavFiles(
    requestData: thisProto.SipPlayWavFilesRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.SipStatus> {
    return this.$raw
      .sipPlayWavFiles(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/ondewo.sip.Sip/SipMute
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatus>
   */
  sipMute(
    requestData: googleProtobuf000.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.SipStatus> {
    return this.$raw
      .sipMute(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/ondewo.sip.Sip/SipUnMute
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatus>
   */
  sipUnMute(
    requestData: googleProtobuf000.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.SipStatus> {
    return this.$raw
      .sipUnMute(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
