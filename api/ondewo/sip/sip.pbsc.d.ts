import { GrpcClientFactory, GrpcEvent, GrpcMetadata } from '@ngx-grpc/common';
import { GrpcHandler } from '@ngx-grpc/core';
import { Observable } from 'rxjs';
import * as thisProto from './sip.pb';
import * as googleProtobuf000 from '@ngx-grpc/well-known-types';
import * as i0 from '@angular/core';
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
		 * Unary call: /ondewo.sip.Sip/StartSession
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		startSession: (
			requestData: thisProto.StartSessionRequest,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<thisProto.SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/EndSession
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		endSession: (
			requestData: googleProtobuf000.Empty,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<thisProto.SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/StartCall
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		startCall: (
			requestData: thisProto.StartCallRequest,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<thisProto.SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/EndCall
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		endCall: (
			requestData: thisProto.EndCallRequest,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<thisProto.SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/TransferCall
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		transferCall: (
			requestData: thisProto.TransferCallRequest,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<thisProto.SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/RegisterAccount
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		registerAccount: (
			requestData: thisProto.RegisterAccountRequest,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<thisProto.SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/GetSipStatus
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		getSipStatus: (
			requestData: googleProtobuf000.Empty,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<thisProto.SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/GetSipStatusHistory
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatusHistoryResponse>>
		 */
		getSipStatusHistory: (
			requestData: googleProtobuf000.Empty,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<thisProto.SipStatusHistoryResponse>>;
		/**
		 * Unary call: /ondewo.sip.Sip/PlayWavFiles
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		playWavFiles: (
			requestData: thisProto.PlayWavFilesRequest,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<thisProto.SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/Mute
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		mute: (
			requestData: googleProtobuf000.Empty,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<thisProto.SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/UnMute
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		unMute: (
			requestData: googleProtobuf000.Empty,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<thisProto.SipStatus>>;
	};
	constructor(settings: any, clientFactory: GrpcClientFactory<any>, handler: GrpcHandler);
	/**
	 * Unary call @/ondewo.sip.Sip/StartSession
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	startSession(
		requestData: thisProto.StartSessionRequest,
		requestMetadata?: GrpcMetadata
	): Observable<thisProto.SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/EndSession
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	endSession(requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/StartCall
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	startCall(requestData: thisProto.StartCallRequest, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/EndCall
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	endCall(requestData: thisProto.EndCallRequest, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/TransferCall
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	transferCall(
		requestData: thisProto.TransferCallRequest,
		requestMetadata?: GrpcMetadata
	): Observable<thisProto.SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/RegisterAccount
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	registerAccount(
		requestData: thisProto.RegisterAccountRequest,
		requestMetadata?: GrpcMetadata
	): Observable<thisProto.SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/GetSipStatus
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	getSipStatus(requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/GetSipStatusHistory
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatusHistoryResponse>
	 */
	getSipStatusHistory(
		requestData: googleProtobuf000.Empty,
		requestMetadata?: GrpcMetadata
	): Observable<thisProto.SipStatusHistoryResponse>;
	/**
	 * Unary call @/ondewo.sip.Sip/PlayWavFiles
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	playWavFiles(
		requestData: thisProto.PlayWavFilesRequest,
		requestMetadata?: GrpcMetadata
	): Observable<thisProto.SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/Mute
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	mute(requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/UnMute
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	unMute(requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata): Observable<thisProto.SipStatus>;
	static ɵfac: i0.ɵɵFactoryDeclaration<SipClient, [{ optional: true }, null, null]>;
	static ɵprov: i0.ɵɵInjectableDeclaration<SipClient>;
}
