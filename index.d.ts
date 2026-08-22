import {
	GrpcMessage,
	RecursivePartial,
	ToProtobufJSONOptions,
	GrpcMetadata,
	GrpcEvent,
	GrpcClientFactory,
	GrpcRequest
} from '@ngx-grpc/common';
import { ByteSource, BinaryReader, BinaryWriter } from 'google-protobuf';
import * as googleProtobuf000 from '@ngx-grpc/well-known-types';
import * as i0 from '@angular/core';
import { InjectionToken, OnDestroy, NgZone, EnvironmentProviders, Type } from '@angular/core';
import { GrpcHandler, GrpcInterceptor } from '@ngx-grpc/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpClient } from '@angular/common/http';

/**
 * Message implementation for ondewo.sip.SipEndCallRequest
 */
declare class SipEndCallRequest implements GrpcMessage {
	static id: string;
	/**
	 * Deserialize binary data to message
	 * @param instance message instance
	 */
	static deserializeBinary(bytes: ByteSource): SipEndCallRequest;
	/**
	 * Check all the properties and set default protobuf values if necessary
	 * @param _instance message instance
	 */
	static refineValues(_instance: SipEndCallRequest): void;
	/**
	 * Deserializes / reads binary message into message instance using provided binary reader
	 * @param _instance message instance
	 * @param _reader binary reader instance
	 */
	static deserializeBinaryFromReader(_instance: SipEndCallRequest, _reader: BinaryReader): void;
	/**
	 * Serializes a message to binary format using provided binary reader
	 * @param _instance message instance
	 * @param _writer binary writer instance
	 */
	static serializeBinaryToWriter(_instance: SipEndCallRequest, _writer: BinaryWriter): void;
	private _hardHangup;
	/**
	 * Message constructor. Initializes the properties and applies default Protobuf values if necessary
	 * @param _value initial values object or instance of SipEndCallRequest to deeply clone from
	 */
	constructor(_value?: RecursivePartial<SipEndCallRequest.AsObject>);
	get hardHangup(): boolean;
	set hardHangup(value: boolean);
	/**
	 * Serialize message to binary data
	 * @param instance message instance
	 */
	serializeBinary(): any;
	/**
	 * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
	 */
	toObject(): SipEndCallRequest.AsObject;
	/**
	 * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
	 */
	toJSON(): SipEndCallRequest.AsObject;
	/**
	 * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
	 * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
	 * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
	 */
	toProtobufJSON(options?: ToProtobufJSONOptions): SipEndCallRequest.AsProtobufJSON;
}
declare namespace SipEndCallRequest {
	/**
	 * Standard JavaScript object representation for SipEndCallRequest
	 */
	interface AsObject {
		hardHangup: boolean;
	}
	/**
	 * Protobuf JSON representation for SipEndCallRequest
	 */
	interface AsProtobufJSON {
		hardHangup: boolean;
	}
}
/**
 * Message implementation for ondewo.sip.SipStartCallRequest
 */
declare class SipStartCallRequest implements GrpcMessage {
	static id: string;
	/**
	 * Deserialize binary data to message
	 * @param instance message instance
	 */
	static deserializeBinary(bytes: ByteSource): SipStartCallRequest;
	/**
	 * Check all the properties and set default protobuf values if necessary
	 * @param _instance message instance
	 */
	static refineValues(_instance: SipStartCallRequest): void;
	/**
	 * Deserializes / reads binary message into message instance using provided binary reader
	 * @param _instance message instance
	 * @param _reader binary reader instance
	 */
	static deserializeBinaryFromReader(_instance: SipStartCallRequest, _reader: BinaryReader): void;
	/**
	 * Serializes a message to binary format using provided binary reader
	 * @param _instance message instance
	 * @param _writer binary writer instance
	 */
	static serializeBinaryToWriter(_instance: SipStartCallRequest, _writer: BinaryWriter): void;
	private _calleeId;
	private _headers;
	/**
	 * Message constructor. Initializes the properties and applies default Protobuf values if necessary
	 * @param _value initial values object or instance of SipStartCallRequest to deeply clone from
	 */
	constructor(_value?: RecursivePartial<SipStartCallRequest.AsObject>);
	get calleeId(): string;
	set calleeId(value: string);
	get headers(): {
		[prop: string]: string;
	};
	set headers(value: { [prop: string]: string });
	/**
	 * Serialize message to binary data
	 * @param instance message instance
	 */
	serializeBinary(): any;
	/**
	 * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
	 */
	toObject(): SipStartCallRequest.AsObject;
	/**
	 * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
	 */
	toJSON(): SipStartCallRequest.AsObject;
	/**
	 * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
	 * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
	 * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
	 */
	toProtobufJSON(options?: ToProtobufJSONOptions): SipStartCallRequest.AsProtobufJSON;
}
declare namespace SipStartCallRequest {
	/**
	 * Standard JavaScript object representation for SipStartCallRequest
	 */
	interface AsObject {
		calleeId: string;
		headers: {
			[prop: string]: string;
		};
	}
	/**
	 * Protobuf JSON representation for SipStartCallRequest
	 */
	interface AsProtobufJSON {
		calleeId: string;
		headers: {
			[prop: string]: string;
		};
	}
	/**
	 * Message implementation for ondewo.sip.SipStartCallRequest.HeadersEntry
	 */
	class HeadersEntry implements GrpcMessage {
		static id: string;
		/**
		 * Deserialize binary data to message
		 * @param instance message instance
		 */
		static deserializeBinary(bytes: ByteSource): HeadersEntry;
		/**
		 * Check all the properties and set default protobuf values if necessary
		 * @param _instance message instance
		 */
		static refineValues(_instance: HeadersEntry): void;
		/**
		 * Deserializes / reads binary message into message instance using provided binary reader
		 * @param _instance message instance
		 * @param _reader binary reader instance
		 */
		static deserializeBinaryFromReader(_instance: HeadersEntry, _reader: BinaryReader): void;
		/**
		 * Serializes a message to binary format using provided binary reader
		 * @param _instance message instance
		 * @param _writer binary writer instance
		 */
		static serializeBinaryToWriter(_instance: HeadersEntry, _writer: BinaryWriter): void;
		private _key;
		private _value;
		/**
		 * Message constructor. Initializes the properties and applies default Protobuf values if necessary
		 * @param _value initial values object or instance of HeadersEntry to deeply clone from
		 */
		constructor(_value?: RecursivePartial<HeadersEntry.AsObject>);
		get key(): string;
		set key(value: string);
		get value(): string;
		set value(value: string);
		/**
		 * Serialize message to binary data
		 * @param instance message instance
		 */
		serializeBinary(): any;
		/**
		 * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
		 */
		toObject(): HeadersEntry.AsObject;
		/**
		 * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
		 */
		toJSON(): HeadersEntry.AsObject;
		/**
		 * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
		 * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
		 * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
		 */
		toProtobufJSON(options?: ToProtobufJSONOptions): HeadersEntry.AsProtobufJSON;
	}
	namespace HeadersEntry {
		/**
		 * Standard JavaScript object representation for HeadersEntry
		 */
		interface AsObject {
			key: string;
			value: string;
		}
		/**
		 * Protobuf JSON representation for HeadersEntry
		 */
		interface AsProtobufJSON {
			key: string;
			value: string;
		}
	}
}
/**
 * Message implementation for ondewo.sip.SipRegisterAccountRequest
 */
declare class SipRegisterAccountRequest implements GrpcMessage {
	static id: string;
	/**
	 * Deserialize binary data to message
	 * @param instance message instance
	 */
	static deserializeBinary(bytes: ByteSource): SipRegisterAccountRequest;
	/**
	 * Check all the properties and set default protobuf values if necessary
	 * @param _instance message instance
	 */
	static refineValues(_instance: SipRegisterAccountRequest): void;
	/**
	 * Deserializes / reads binary message into message instance using provided binary reader
	 * @param _instance message instance
	 * @param _reader binary reader instance
	 */
	static deserializeBinaryFromReader(_instance: SipRegisterAccountRequest, _reader: BinaryReader): void;
	/**
	 * Serializes a message to binary format using provided binary reader
	 * @param _instance message instance
	 * @param _writer binary writer instance
	 */
	static serializeBinaryToWriter(_instance: SipRegisterAccountRequest, _writer: BinaryWriter): void;
	private _accountName;
	private _password;
	private _authUsername;
	private _outboundProxy;
	/**
	 * Message constructor. Initializes the properties and applies default Protobuf values if necessary
	 * @param _value initial values object or instance of SipRegisterAccountRequest to deeply clone from
	 */
	constructor(_value?: RecursivePartial<SipRegisterAccountRequest.AsObject>);
	get accountName(): string;
	set accountName(value: string);
	get password(): string;
	set password(value: string);
	get authUsername(): string;
	set authUsername(value: string);
	get outboundProxy(): string;
	set outboundProxy(value: string);
	/**
	 * Serialize message to binary data
	 * @param instance message instance
	 */
	serializeBinary(): any;
	/**
	 * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
	 */
	toObject(): SipRegisterAccountRequest.AsObject;
	/**
	 * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
	 */
	toJSON(): SipRegisterAccountRequest.AsObject;
	/**
	 * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
	 * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
	 * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
	 */
	toProtobufJSON(options?: ToProtobufJSONOptions): SipRegisterAccountRequest.AsProtobufJSON;
}
declare namespace SipRegisterAccountRequest {
	/**
	 * Standard JavaScript object representation for SipRegisterAccountRequest
	 */
	interface AsObject {
		accountName: string;
		password: string;
		authUsername: string;
		outboundProxy: string;
	}
	/**
	 * Protobuf JSON representation for SipRegisterAccountRequest
	 */
	interface AsProtobufJSON {
		accountName: string;
		password: string;
		authUsername: string;
		outboundProxy: string;
	}
}
/**
 * Message implementation for ondewo.sip.SipStartSessionRequest
 */
declare class SipStartSessionRequest implements GrpcMessage {
	static id: string;
	/**
	 * Deserialize binary data to message
	 * @param instance message instance
	 */
	static deserializeBinary(bytes: ByteSource): SipStartSessionRequest;
	/**
	 * Check all the properties and set default protobuf values if necessary
	 * @param _instance message instance
	 */
	static refineValues(_instance: SipStartSessionRequest): void;
	/**
	 * Deserializes / reads binary message into message instance using provided binary reader
	 * @param _instance message instance
	 * @param _reader binary reader instance
	 */
	static deserializeBinaryFromReader(_instance: SipStartSessionRequest, _reader: BinaryReader): void;
	/**
	 * Serializes a message to binary format using provided binary reader
	 * @param _instance message instance
	 * @param _writer binary writer instance
	 */
	static serializeBinaryToWriter(_instance: SipStartSessionRequest, _writer: BinaryWriter): void;
	private _accountName;
	private _autoAnswerInterval;
	/**
	 * Message constructor. Initializes the properties and applies default Protobuf values if necessary
	 * @param _value initial values object or instance of SipStartSessionRequest to deeply clone from
	 */
	constructor(_value?: RecursivePartial<SipStartSessionRequest.AsObject>);
	get accountName(): string;
	set accountName(value: string);
	get autoAnswerInterval(): number;
	set autoAnswerInterval(value: number);
	/**
	 * Serialize message to binary data
	 * @param instance message instance
	 */
	serializeBinary(): any;
	/**
	 * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
	 */
	toObject(): SipStartSessionRequest.AsObject;
	/**
	 * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
	 */
	toJSON(): SipStartSessionRequest.AsObject;
	/**
	 * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
	 * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
	 * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
	 */
	toProtobufJSON(options?: ToProtobufJSONOptions): SipStartSessionRequest.AsProtobufJSON;
}
declare namespace SipStartSessionRequest {
	/**
	 * Standard JavaScript object representation for SipStartSessionRequest
	 */
	interface AsObject {
		accountName: string;
		autoAnswerInterval: number;
	}
	/**
	 * Protobuf JSON representation for SipStartSessionRequest
	 */
	interface AsProtobufJSON {
		accountName: string;
		autoAnswerInterval: number;
	}
}
/**
 * Message implementation for ondewo.sip.SipTransferCallRequest
 */
declare class SipTransferCallRequest implements GrpcMessage {
	static id: string;
	/**
	 * Deserialize binary data to message
	 * @param instance message instance
	 */
	static deserializeBinary(bytes: ByteSource): SipTransferCallRequest;
	/**
	 * Check all the properties and set default protobuf values if necessary
	 * @param _instance message instance
	 */
	static refineValues(_instance: SipTransferCallRequest): void;
	/**
	 * Deserializes / reads binary message into message instance using provided binary reader
	 * @param _instance message instance
	 * @param _reader binary reader instance
	 */
	static deserializeBinaryFromReader(_instance: SipTransferCallRequest, _reader: BinaryReader): void;
	/**
	 * Serializes a message to binary format using provided binary reader
	 * @param _instance message instance
	 * @param _writer binary writer instance
	 */
	static serializeBinaryToWriter(_instance: SipTransferCallRequest, _writer: BinaryWriter): void;
	private _transferId;
	private _headers;
	/**
	 * Message constructor. Initializes the properties and applies default Protobuf values if necessary
	 * @param _value initial values object or instance of SipTransferCallRequest to deeply clone from
	 */
	constructor(_value?: RecursivePartial<SipTransferCallRequest.AsObject>);
	get transferId(): string;
	set transferId(value: string);
	get headers(): {
		[prop: string]: string;
	};
	set headers(value: { [prop: string]: string });
	/**
	 * Serialize message to binary data
	 * @param instance message instance
	 */
	serializeBinary(): any;
	/**
	 * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
	 */
	toObject(): SipTransferCallRequest.AsObject;
	/**
	 * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
	 */
	toJSON(): SipTransferCallRequest.AsObject;
	/**
	 * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
	 * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
	 * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
	 */
	toProtobufJSON(options?: ToProtobufJSONOptions): SipTransferCallRequest.AsProtobufJSON;
}
declare namespace SipTransferCallRequest {
	/**
	 * Standard JavaScript object representation for SipTransferCallRequest
	 */
	interface AsObject {
		transferId: string;
		headers: {
			[prop: string]: string;
		};
	}
	/**
	 * Protobuf JSON representation for SipTransferCallRequest
	 */
	interface AsProtobufJSON {
		transferId: string;
		headers: {
			[prop: string]: string;
		};
	}
	/**
	 * Message implementation for ondewo.sip.SipTransferCallRequest.HeadersEntry
	 */
	class HeadersEntry implements GrpcMessage {
		static id: string;
		/**
		 * Deserialize binary data to message
		 * @param instance message instance
		 */
		static deserializeBinary(bytes: ByteSource): HeadersEntry;
		/**
		 * Check all the properties and set default protobuf values if necessary
		 * @param _instance message instance
		 */
		static refineValues(_instance: HeadersEntry): void;
		/**
		 * Deserializes / reads binary message into message instance using provided binary reader
		 * @param _instance message instance
		 * @param _reader binary reader instance
		 */
		static deserializeBinaryFromReader(_instance: HeadersEntry, _reader: BinaryReader): void;
		/**
		 * Serializes a message to binary format using provided binary reader
		 * @param _instance message instance
		 * @param _writer binary writer instance
		 */
		static serializeBinaryToWriter(_instance: HeadersEntry, _writer: BinaryWriter): void;
		private _key;
		private _value;
		/**
		 * Message constructor. Initializes the properties and applies default Protobuf values if necessary
		 * @param _value initial values object or instance of HeadersEntry to deeply clone from
		 */
		constructor(_value?: RecursivePartial<HeadersEntry.AsObject>);
		get key(): string;
		set key(value: string);
		get value(): string;
		set value(value: string);
		/**
		 * Serialize message to binary data
		 * @param instance message instance
		 */
		serializeBinary(): any;
		/**
		 * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
		 */
		toObject(): HeadersEntry.AsObject;
		/**
		 * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
		 */
		toJSON(): HeadersEntry.AsObject;
		/**
		 * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
		 * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
		 * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
		 */
		toProtobufJSON(options?: ToProtobufJSONOptions): HeadersEntry.AsProtobufJSON;
	}
	namespace HeadersEntry {
		/**
		 * Standard JavaScript object representation for HeadersEntry
		 */
		interface AsObject {
			key: string;
			value: string;
		}
		/**
		 * Protobuf JSON representation for HeadersEntry
		 */
		interface AsProtobufJSON {
			key: string;
			value: string;
		}
	}
}
/**
 * Message implementation for ondewo.sip.SipStatus
 */
declare class SipStatus implements GrpcMessage {
	static id: string;
	/**
	 * Deserialize binary data to message
	 * @param instance message instance
	 */
	static deserializeBinary(bytes: ByteSource): SipStatus;
	/**
	 * Check all the properties and set default protobuf values if necessary
	 * @param _instance message instance
	 */
	static refineValues(_instance: SipStatus): void;
	/**
	 * Deserializes / reads binary message into message instance using provided binary reader
	 * @param _instance message instance
	 * @param _reader binary reader instance
	 */
	static deserializeBinaryFromReader(_instance: SipStatus, _reader: BinaryReader): void;
	/**
	 * Serializes a message to binary format using provided binary reader
	 * @param _instance message instance
	 * @param _writer binary writer instance
	 */
	static serializeBinaryToWriter(_instance: SipStatus, _writer: BinaryWriter): void;
	private _accountName;
	private _timestamp?;
	private _statusType;
	private _calleeId;
	private _transferCallId;
	private _headers;
	private _description;
	private _exceptionName;
	private _exceptionTraceback;
	private _nluSessionName;
	/**
	 * Message constructor. Initializes the properties and applies default Protobuf values if necessary
	 * @param _value initial values object or instance of SipStatus to deeply clone from
	 */
	constructor(_value?: RecursivePartial<SipStatus.AsObject>);
	get accountName(): string;
	set accountName(value: string);
	get timestamp(): googleProtobuf000.Timestamp | undefined;
	set timestamp(value: googleProtobuf000.Timestamp | undefined);
	get statusType(): SipStatus.StatusType;
	set statusType(value: SipStatus.StatusType);
	get calleeId(): string;
	set calleeId(value: string);
	get transferCallId(): string;
	set transferCallId(value: string);
	get headers(): {
		[prop: string]: string;
	};
	set headers(value: { [prop: string]: string });
	get description(): string;
	set description(value: string);
	get exceptionName(): string;
	set exceptionName(value: string);
	get exceptionTraceback(): string;
	set exceptionTraceback(value: string);
	get nluSessionName(): string;
	set nluSessionName(value: string);
	/**
	 * Serialize message to binary data
	 * @param instance message instance
	 */
	serializeBinary(): any;
	/**
	 * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
	 */
	toObject(): SipStatus.AsObject;
	/**
	 * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
	 */
	toJSON(): SipStatus.AsObject;
	/**
	 * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
	 * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
	 * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
	 */
	toProtobufJSON(options?: ToProtobufJSONOptions): SipStatus.AsProtobufJSON;
}
declare namespace SipStatus {
	/**
	 * Standard JavaScript object representation for SipStatus
	 */
	interface AsObject {
		accountName: string;
		timestamp?: googleProtobuf000.Timestamp.AsObject;
		statusType: SipStatus.StatusType;
		calleeId: string;
		transferCallId: string;
		headers: {
			[prop: string]: string;
		};
		description: string;
		exceptionName: string;
		exceptionTraceback: string;
		nluSessionName: string;
	}
	/**
	 * Protobuf JSON representation for SipStatus
	 */
	interface AsProtobufJSON {
		accountName: string;
		timestamp: googleProtobuf000.Timestamp.AsProtobufJSON | null;
		statusType: string;
		calleeId: string;
		transferCallId: string;
		headers: {
			[prop: string]: string;
		};
		description: string;
		exceptionName: string;
		exceptionTraceback: string;
		nluSessionName: string;
	}
	enum StatusType {
		NO_SESSION = 0,
		REGISTERED = 1,
		READY = 2,
		INCOMING_CALL_INITIATED = 3,
		OUTGOING_CALL_INITIATED = 4,
		OUTGOING_CALL_CONNECTED = 5,
		INCOMING_CALL_CONNECTED = 6,
		TRANSFER_CALL_INITIATED = 7,
		SOFT_HANGUP_INITIATED = 8,
		HARD_HANGUP_INITIATED = 9,
		INCOMING_CALL_FAILED = 10,
		OUTGOING_CALL_FAILED = 11,
		INCOMING_CALL_FINISHED = 12,
		OUTGOING_CALL_FINISHED = 13,
		SESSION_REGISTRATION_FAILED = 14,
		SESSION_STARTED = 15,
		SESSION_ENDED = 16,
		TRANSFER_CALL_FAILED = 17,
		MICROPHONE_MUTED = 18,
		MICROPHONE_UNMUTED = 19,
		MICROPHONE_WAV_FILES_PLAYED = 20,
		NO_ONGOING_CALL = 21
	}
	/**
	 * Message implementation for ondewo.sip.SipStatus.HeadersEntry
	 */
	class HeadersEntry implements GrpcMessage {
		static id: string;
		/**
		 * Deserialize binary data to message
		 * @param instance message instance
		 */
		static deserializeBinary(bytes: ByteSource): HeadersEntry;
		/**
		 * Check all the properties and set default protobuf values if necessary
		 * @param _instance message instance
		 */
		static refineValues(_instance: HeadersEntry): void;
		/**
		 * Deserializes / reads binary message into message instance using provided binary reader
		 * @param _instance message instance
		 * @param _reader binary reader instance
		 */
		static deserializeBinaryFromReader(_instance: HeadersEntry, _reader: BinaryReader): void;
		/**
		 * Serializes a message to binary format using provided binary reader
		 * @param _instance message instance
		 * @param _writer binary writer instance
		 */
		static serializeBinaryToWriter(_instance: HeadersEntry, _writer: BinaryWriter): void;
		private _key;
		private _value;
		/**
		 * Message constructor. Initializes the properties and applies default Protobuf values if necessary
		 * @param _value initial values object or instance of HeadersEntry to deeply clone from
		 */
		constructor(_value?: RecursivePartial<HeadersEntry.AsObject>);
		get key(): string;
		set key(value: string);
		get value(): string;
		set value(value: string);
		/**
		 * Serialize message to binary data
		 * @param instance message instance
		 */
		serializeBinary(): any;
		/**
		 * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
		 */
		toObject(): HeadersEntry.AsObject;
		/**
		 * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
		 */
		toJSON(): HeadersEntry.AsObject;
		/**
		 * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
		 * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
		 * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
		 */
		toProtobufJSON(options?: ToProtobufJSONOptions): HeadersEntry.AsProtobufJSON;
	}
	namespace HeadersEntry {
		/**
		 * Standard JavaScript object representation for HeadersEntry
		 */
		interface AsObject {
			key: string;
			value: string;
		}
		/**
		 * Protobuf JSON representation for HeadersEntry
		 */
		interface AsProtobufJSON {
			key: string;
			value: string;
		}
	}
}
/**
 * Message implementation for ondewo.sip.SipStatusHistoryResponse
 */
declare class SipStatusHistoryResponse implements GrpcMessage {
	static id: string;
	/**
	 * Deserialize binary data to message
	 * @param instance message instance
	 */
	static deserializeBinary(bytes: ByteSource): SipStatusHistoryResponse;
	/**
	 * Check all the properties and set default protobuf values if necessary
	 * @param _instance message instance
	 */
	static refineValues(_instance: SipStatusHistoryResponse): void;
	/**
	 * Deserializes / reads binary message into message instance using provided binary reader
	 * @param _instance message instance
	 * @param _reader binary reader instance
	 */
	static deserializeBinaryFromReader(_instance: SipStatusHistoryResponse, _reader: BinaryReader): void;
	/**
	 * Serializes a message to binary format using provided binary reader
	 * @param _instance message instance
	 * @param _writer binary writer instance
	 */
	static serializeBinaryToWriter(_instance: SipStatusHistoryResponse, _writer: BinaryWriter): void;
	private _statusHistory?;
	/**
	 * Message constructor. Initializes the properties and applies default Protobuf values if necessary
	 * @param _value initial values object or instance of SipStatusHistoryResponse to deeply clone from
	 */
	constructor(_value?: RecursivePartial<SipStatusHistoryResponse.AsObject>);
	get statusHistory(): SipStatus[] | undefined;
	set statusHistory(value: SipStatus[] | undefined);
	/**
	 * Serialize message to binary data
	 * @param instance message instance
	 */
	serializeBinary(): any;
	/**
	 * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
	 */
	toObject(): SipStatusHistoryResponse.AsObject;
	/**
	 * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
	 */
	toJSON(): SipStatusHistoryResponse.AsObject;
	/**
	 * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
	 * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
	 * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
	 */
	toProtobufJSON(options?: ToProtobufJSONOptions): SipStatusHistoryResponse.AsProtobufJSON;
}
declare namespace SipStatusHistoryResponse {
	/**
	 * Standard JavaScript object representation for SipStatusHistoryResponse
	 */
	interface AsObject {
		statusHistory?: SipStatus.AsObject[];
	}
	/**
	 * Protobuf JSON representation for SipStatusHistoryResponse
	 */
	interface AsProtobufJSON {
		statusHistory: SipStatus.AsProtobufJSON[] | null;
	}
}
/**
 * Message implementation for ondewo.sip.SipPlayWavFilesRequest
 */
declare class SipPlayWavFilesRequest implements GrpcMessage {
	static id: string;
	/**
	 * Deserialize binary data to message
	 * @param instance message instance
	 */
	static deserializeBinary(bytes: ByteSource): SipPlayWavFilesRequest;
	/**
	 * Check all the properties and set default protobuf values if necessary
	 * @param _instance message instance
	 */
	static refineValues(_instance: SipPlayWavFilesRequest): void;
	/**
	 * Deserializes / reads binary message into message instance using provided binary reader
	 * @param _instance message instance
	 * @param _reader binary reader instance
	 */
	static deserializeBinaryFromReader(_instance: SipPlayWavFilesRequest, _reader: BinaryReader): void;
	/**
	 * Serializes a message to binary format using provided binary reader
	 * @param _instance message instance
	 * @param _writer binary writer instance
	 */
	static serializeBinaryToWriter(_instance: SipPlayWavFilesRequest, _writer: BinaryWriter): void;
	private _wavFiles;
	/**
	 * Message constructor. Initializes the properties and applies default Protobuf values if necessary
	 * @param _value initial values object or instance of SipPlayWavFilesRequest to deeply clone from
	 */
	constructor(_value?: RecursivePartial<SipPlayWavFilesRequest.AsObject>);
	get wavFiles(): Uint8Array[];
	set wavFiles(value: Uint8Array[]);
	/**
	 * Serialize message to binary data
	 * @param instance message instance
	 */
	serializeBinary(): any;
	/**
	 * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
	 */
	toObject(): SipPlayWavFilesRequest.AsObject;
	/**
	 * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
	 */
	toJSON(): SipPlayWavFilesRequest.AsObject;
	/**
	 * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
	 * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
	 * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
	 */
	toProtobufJSON(options?: ToProtobufJSONOptions): SipPlayWavFilesRequest.AsProtobufJSON;
}
declare namespace SipPlayWavFilesRequest {
	/**
	 * Standard JavaScript object representation for SipPlayWavFilesRequest
	 */
	interface AsObject {
		wavFiles: Uint8Array[];
	}
	/**
	 * Protobuf JSON representation for SipPlayWavFilesRequest
	 */
	interface AsProtobufJSON {
		wavFiles: string[];
	}
}

/**
 * Specific GrpcClientSettings for Sip.
 * Use it only if your default settings are not set or the service requires other settings.
 */
declare const GRPC_SIP_CLIENT_SETTINGS: InjectionToken<any>;

/**
 * Service client implementation for ondewo.sip.Sip
 */
declare class SipClient {
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
		sipStartSession: (
			requestData: SipStartSessionRequest,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/SipEndSession
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		sipEndSession: (
			requestData: googleProtobuf000.Empty,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/SipStartCall
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		sipStartCall: (
			requestData: SipStartCallRequest,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/SipEndCall
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		sipEndCall: (requestData: SipEndCallRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/SipTransferCall
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		sipTransferCall: (
			requestData: SipTransferCallRequest,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/SipRegisterAccount
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		sipRegisterAccount: (
			requestData: SipRegisterAccountRequest,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/SipGetSipStatus
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		sipGetSipStatus: (
			requestData: googleProtobuf000.Empty,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/SipGetSipStatusHistory
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatusHistoryResponse>>
		 */
		sipGetSipStatusHistory: (
			requestData: googleProtobuf000.Empty,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<SipStatusHistoryResponse>>;
		/**
		 * Unary call: /ondewo.sip.Sip/SipPlayWavFiles
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		sipPlayWavFiles: (
			requestData: SipPlayWavFilesRequest,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/SipMute
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		sipMute: (requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
		/**
		 * Unary call: /ondewo.sip.Sip/SipUnMute
		 *
		 * @param requestMessage Request message
		 * @param requestMetadata Request metadata
		 * @returns Observable<GrpcEvent<thisProto.SipStatus>>
		 */
		sipUnMute: (
			requestData: googleProtobuf000.Empty,
			requestMetadata?: GrpcMetadata
		) => Observable<GrpcEvent<SipStatus>>;
	};
	constructor(settings: any, clientFactory: GrpcClientFactory<any>, handler: GrpcHandler);
	/**
	 * Unary call @/ondewo.sip.Sip/SipStartSession
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	sipStartSession(requestData: SipStartSessionRequest, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/SipEndSession
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	sipEndSession(requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/SipStartCall
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	sipStartCall(requestData: SipStartCallRequest, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/SipEndCall
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	sipEndCall(requestData: SipEndCallRequest, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/SipTransferCall
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	sipTransferCall(requestData: SipTransferCallRequest, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/SipRegisterAccount
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	sipRegisterAccount(requestData: SipRegisterAccountRequest, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/SipGetSipStatus
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	sipGetSipStatus(requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/SipGetSipStatusHistory
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatusHistoryResponse>
	 */
	sipGetSipStatusHistory(
		requestData: googleProtobuf000.Empty,
		requestMetadata?: GrpcMetadata
	): Observable<SipStatusHistoryResponse>;
	/**
	 * Unary call @/ondewo.sip.Sip/SipPlayWavFiles
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	sipPlayWavFiles(requestData: SipPlayWavFilesRequest, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/SipMute
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	sipMute(requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
	/**
	 * Unary call @/ondewo.sip.Sip/SipUnMute
	 *
	 * @param requestMessage Request message
	 * @param requestMetadata Request metadata
	 * @returns Observable<thisProto.SipStatus>
	 */
	sipUnMute(requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
	static ɵfac: i0.ɵɵFactoryDeclaration<SipClient, [{ optional: true }, null, null]>;
	static ɵprov: i0.ɵɵInjectableDeclaration<SipClient>;
}

/**
 * The set of shapes a {@link TokenProvider} is allowed to return for the current
 * access token.
 *
 * - `string` — a ready, synchronous token.
 * - `null` — there is no token right now (the user is unauthenticated). The
 *   request must be sent unchanged, never with an empty `Bearer` header.
 * - `Promise<...>` / `Observable<...>` — an asynchronous source (e.g.
 *   `keycloak.updateToken()` from `keycloak-js`, or `KeycloakService` from
 *   `keycloak-angular`) that resolves to a token or `null`.
 */
type TokenResult = string | null | Promise<string | null> | Observable<string | null>;
/**
 * Contract the consuming application implements to feed the current Keycloak
 * access token into this library's auth interceptors.
 *
 * SECURITY: this client deliberately does NOT perform any OAuth/OIDC flow
 * itself — no Resource Owner Password Credentials grant, no client secret, no
 * token storage. Acquiring, refreshing and storing the token is the
 * responsibility of a dedicated, browser-safe library (`keycloak-js` /
 * `keycloak-angular`) in the host application. This client only reads the
 * current token and attaches it as a bearer credential to outgoing requests.
 *
 * Implementations should return the freshest token they have. Returning a
 * `Promise`/`Observable` lets the implementation refresh a soon-to-expire token
 * before the request is sent (e.g. `keycloak.updateToken(30)`).
 */
interface TokenProvider {
	/**
	 * Return the current access token, or `null` when the user is not
	 * authenticated. May be synchronous or asynchronous.
	 */
	getToken(): TokenResult;
}
/**
 * DI token under which the consuming application registers its
 * {@link TokenProvider} implementation.
 *
 * Example:
 *
 * ```ts
 * providers: [
 *   { provide: TOKEN_PROVIDER, useExisting: KeycloakTokenProvider },
 * ]
 * ```
 */
declare const TOKEN_PROVIDER: InjectionToken<TokenProvider>;

/**
 * The HTTP / gRPC header under which the bearer credential is attached.
 *
 * Canonical `Authorization` casing: gRPC-web metadata keys are case-insensitive
 * and the HTTP/2 transport lower-cases header names on the wire, but the ONDEWO
 * SDKs standardize on the capitalized `Authorization` key in source.
 */
declare const AUTHORIZATION_HEADER: string;
/** The credential scheme prefix prepended to the raw access token. */
declare const BEARER_PREFIX: string;
/**
 * Normalize the value returned by a `TokenProvider.getToken()` call — which may
 * be a `string`, `null`, a `Promise` or an `Observable` — into a single
 * `Observable<string | null>` that emits exactly once.
 *
 * A non-empty token is returned trimmed; `null`, `undefined`, an empty string
 * and a whitespace-only string are all collapsed to `null` so callers have a
 * single "no usable token" signal and never build an empty `Bearer` header.
 *
 * @param result the raw value returned by `TokenProvider.getToken()`.
 * @returns an observable emitting the usable token, or `null` when absent.
 */
declare function resolveToken(result: TokenResult): Observable<string | null>;
/**
 * Build the `Authorization` header value for a resolved token, or `null` when
 * the token is absent.
 *
 * @param token a usable token, or `null`.
 * @returns the `"Bearer <token>"` string, or `null` when there is no token.
 */
declare function buildBearerValue(token: string | null): string | null;
/**
 * Convenience wrapper: emit the ready-to-use `Authorization` header value, or
 * `null` when no token is available.
 *
 * @param result the raw value returned by `TokenProvider.getToken()`.
 * @returns an observable emitting the bearer header value, or `null`.
 */
declare function resolveBearerValue(result: TokenResult): Observable<string | null>;

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
declare function authHttpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>;

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
declare class AuthGrpcInterceptor implements GrpcInterceptor {
	private readonly tokenProvider;
	/**
	 * @param tokenProvider the application-supplied {@link TokenProvider}, injected
	 *   under the {@link TOKEN_PROVIDER} DI token, that yields the current access
	 *   token.
	 */
	constructor(tokenProvider: TokenProvider);
	/**
	 * Attach the bearer credential (when available) to the request metadata, then
	 * delegate to the next handler in the chain.
	 *
	 * @param request the intercepted gRPC request.
	 * @param next the next handler to pass the request through.
	 * @returns the stream of gRPC events for the (possibly authorized) request.
	 */
	intercept<Q extends GrpcMessage, S extends GrpcMessage>(
		request: GrpcRequest<Q, S>,
		next: GrpcHandler
	): Observable<GrpcEvent<S>>;
	static ɵfac: i0.ɵɵFactoryDeclaration<AuthGrpcInterceptor, never>;
	static ɵprov: i0.ɵɵInjectableDeclaration<AuthGrpcInterceptor>;
}

/**
 * Seconds of head-room subtracted from a token's `expires_in` so the background
 * refresh fires *before* the access token actually lapses (covers clock skew and
 * the round-trip to Keycloak). Mirrors the nodejs `REFRESH_SKEW_IN_S` and the
 * python `_EXPIRY_LEEWAY_S` references.
 */
declare const REFRESH_SKEW_IN_S: number;
/**
 * Lower bound (in seconds) on the scheduled refresh delay, so a tiny or zero
 * `expires_in` cannot spin a hot refresh loop.
 */
declare const MIN_REFRESH_DELAY_IN_S: number;
/**
 * Configuration the consuming application supplies to {@link KeycloakTokenProvider}.
 *
 * Provide either a long-lived offline / refresh token (`refreshToken`) — the
 * preferred headless-SDK shape, no password kept in memory — or a
 * `username` + `password` pair for a one-time Resource Owner Password Credentials
 * (ROPC) login with `scope=offline_access`. Exactly one of the two must be given.
 */
interface KeycloakTokenProviderConfig {
	/**
	 * Base Keycloak URL, e.g. `https://auth.example.com/auth` (a trailing slash and
	 * a baked-in `/auth` path are both tolerated).
	 */
	readonly keycloakUrl: string;
	/** Realm name, e.g. `ondewo-ccai-platform`. */
	readonly realm: string;
	/**
	 * Public SDK client id, e.g. `ondewo-nlu-cai-sdk-public`. No `client_secret` is
	 * ever sent (the SDK client is public).
	 */
	readonly clientId: string;
	/**
	 * A long-lived offline / refresh token used to mint access tokens directly
	 * (`grant_type=refresh_token`). Mutually exclusive with `username`/`password`.
	 */
	readonly refreshToken?: string;
	/**
	 * Technical-user email/username for a one-time ROPC login. Requires `password`.
	 * Mutually exclusive with `refreshToken`.
	 */
	readonly username?: string;
	/** Technical-user password for the ROPC login. Requires `username`. */
	readonly password?: string;
	/**
	 * Optional cap (in seconds since login) on how long the background refresh loop
	 * runs. Once it elapses the loop stops and the access token is allowed to lapse
	 * (re-login required). Omit to keep refreshing until the offline session itself
	 * expires.
	 */
	readonly tokenExpirationInS?: number;
	/**
	 * Whether to verify the Keycloak server's TLS certificate on the
	 * token-endpoint call. Defaults to `true` (secure).
	 *
	 * NO-OP IN THIS ANGULAR/BROWSER CLIENT. The token request is made with
	 * Angular's `HttpClient` (an XHR/fetch call), and in a browser the TLS
	 * handshake is owned by the user agent — there is no `https.Agent`, undici
	 * dispatcher, or `rejectUnauthorized` hook that app code can reach, and
	 * `HttpClient`'s request options expose no certificate-verification slot. The
	 * value is therefore stored on the provider for cross-SDK config parity with
	 * the Python/Node.js clients (where it does disable TLS verification) but has
	 * no effect on the outgoing request here. For a self-signed local Envoy, the
	 * certificate must be trusted at the browser/OS level instead.
	 */
	readonly keycloakVerifySsl?: boolean;
}
/**
 * DI token under which {@link KeycloakTokenProvider} reads its
 * {@link KeycloakTokenProviderConfig}. The consuming application provides a value
 * for it (see {@link provideKeycloakTokenProvider}).
 */
declare const KEYCLOAK_TOKEN_PROVIDER_CONFIG: InjectionToken<KeycloakTokenProviderConfig>;
/** Error raised on a missing/invalid configuration or any token-endpoint failure. */
declare class KeycloakAuthenticationError extends Error {
	/**
	 * @param message a human-readable description of the configuration or token failure.
	 */
	constructor(message: string);
}
/**
 * Concrete, ready-to-use {@link TokenProvider} that performs the Keycloak headless
 * offline-token flow itself, so consumers get background access-token refresh
 * without implementing {@link TokenProvider}.
 *
 * On the first {@link getToken} call it logs in once against the Keycloak token
 * endpoint — either with a supplied offline / refresh token
 * (`grant_type=refresh_token`) or with a `username` + `password` ROPC grant
 * (`grant_type=password`, `scope=offline_access`) — then keeps the access token
 * fresh via a background timer that refreshes shortly *before* expiry (clamped to
 * an optional bounded deadline, mirroring the nodejs `OfflineTokenProvider` and
 * python `KeycloakTokenProvider` references). {@link getToken} returns the current
 * valid access token; the library's interceptors attach it as
 * `Authorization: Bearer <token>`.
 *
 * Register it with {@link provideKeycloakTokenProvider}, then point the SDK auth at
 * it:
 *
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideHttpClient(),
 *     provideKeycloakTokenProvider({
 *       keycloakUrl: "https://auth.example.com/auth",
 *       realm: "ondewo-ccai-platform",
 *       clientId: "ondewo-nlu-cai-sdk-public",
 *       refreshToken: "<offline-token>",
 *     }),
 *     provideOndewoSipAuth(KeycloakTokenProvider),
 *     provideHttpClient(withInterceptors([authHttpInterceptor])),
 *   ],
 * });
 * ```
 */
declare class KeycloakTokenProvider implements TokenProvider, OnDestroy {
	private readonly http;
	private readonly zone;
	/** Pre-computed OIDC token endpoint URL for the configured realm. */
	private readonly tokenEndpoint;
	/** Public SDK client id sent on every token request (no `client_secret`). */
	private readonly clientId;
	/** Optional cap (seconds) after which the refresh loop stops; `undefined` means unbounded. */
	private readonly tokenExpirationInS;
	/**
	 * Whether TLS-certificate verification is requested for the token-endpoint
	 * call. Defaults to `true`. Stored for cross-SDK config parity only — it is a
	 * NO-OP in this browser client (the browser owns the TLS handshake), so the
	 * outgoing {@link postTokenRequest} call is unaffected by its value. See
	 * {@link KeycloakTokenProviderConfig.keycloakVerifySsl}.
	 */
	private readonly verifySsl;
	/** The grant parameters for the one-time login, derived from the config. */
	private readonly loginRequest;
	/** The current access token, or `null` before the first login / after the bounded loop lapses. */
	private accessToken;
	/** The current refresh token, or `null` before any login completes. */
	private refreshToken;
	/** Handle of the armed refresh timer, or `null` when no refresh is scheduled. */
	private timer;
	/** Whether {@link ngOnDestroy} has run; suppresses any further (re-)scheduling. */
	private stopped;
	/** Absolute epoch-ms deadline for the bounded loop, or `null` when unbounded. */
	private deadlineInMs;
	/** The in-flight (or settled) one-time login promise; ensures login happens exactly once. */
	private loginPromise;
	/**
	 * @param http the Angular {@link HttpClient} used for the token-endpoint calls.
	 * @param zone the {@link NgZone}; the background timer is armed outside Angular so it
	 *   does not keep change detection / zone stability churning between refreshes.
	 * @param config the {@link KeycloakTokenProviderConfig}, injected under
	 *   {@link KEYCLOAK_TOKEN_PROVIDER_CONFIG}.
	 */
	constructor(http: HttpClient, zone: NgZone, config: KeycloakTokenProviderConfig | null);
	/**
	 * Return the current access token, logging in on the first call.
	 *
	 * The first invocation returns a `Promise` that resolves once the one-time login
	 * has completed and the background refresh is armed. Subsequent invocations
	 * return the synchronously-held current access token (or `null` if the bounded
	 * loop has lapsed), so interceptors pay no async cost on the hot path.
	 *
	 * @returns the current access token as a {@link TokenResult}.
	 */
	getToken(): TokenResult;
	/**
	 * The resolved TLS-verification setting from
	 * {@link KeycloakTokenProviderConfig.keycloakVerifySsl} (defaults to `true`).
	 *
	 * Exposed for cross-SDK config parity and introspection only. It is a NO-OP in
	 * this browser client — the browser owns the TLS handshake, so the value never
	 * reaches {@link postTokenRequest} and does not change the outgoing request.
	 *
	 * @returns `true` when TLS verification is requested (the default), `false`
	 *   when the config explicitly opted out (still inert here).
	 */
	get keycloakVerifySsl(): boolean;
	/** Stop the background refresh loop when the provider is torn down. Idempotent. */
	ngOnDestroy(): void;
	/**
	 * Perform the one-time login (offline-token or ROPC) and arm the first refresh.
	 *
	 * @returns a promise that resolves once the first token is stored and the refresh is armed.
	 * @throws {@link KeycloakAuthenticationError} if the token endpoint fails or returns no
	 *   `access_token` / `refresh_token`.
	 */
	private bootstrap;
	/**
	 * Exchange the refresh token for a fresh access token and re-arm the next refresh.
	 *
	 * Stops the loop (instead of refreshing) once the bounded deadline has elapsed,
	 * letting the access token lapse. If the provider was torn down while this refresh's
	 * request was in flight, {@link scheduleRefresh} declines to arm the next timer.
	 *
	 * @returns a promise that resolves once the token is refreshed and the next refresh is armed.
	 * @throws {@link KeycloakAuthenticationError} if the refresh call fails or returns no `access_token`.
	 */
	private refresh;
	/**
	 * Arm a single timer for the next refresh, clamped to the bounded deadline.
	 *
	 * The delay is `expiresInRaw` minus {@link REFRESH_SKEW_IN_S}, floored at
	 * {@link MIN_REFRESH_DELAY_IN_S}, then clamped to the time remaining before the
	 * deadline. Stops silently once `tokenExpirationInS` has elapsed.
	 *
	 * @param expiresInRaw the `expires_in` (seconds) from the latest token response; a missing
	 *   or non-positive value falls back to {@link MIN_REFRESH_DELAY_IN_S}.
	 */
	private scheduleRefresh;
	/**
	 * POST a form-encoded body to the token endpoint and return the parsed JSON.
	 *
	 * @param params the form fields to URL-encode (grant type, client id, credentials).
	 * @returns the parsed {@link KeycloakTokenResponse}.
	 * @throws {@link KeycloakAuthenticationError} on a transport error.
	 */
	private postTokenRequest;
	/**
	 * Store the access token (and any rotated refresh token) from a token response.
	 *
	 * Keycloak may omit the refresh token on a same-token refresh; the previous one is
	 * kept in that case so it is never blanked out.
	 *
	 * @param response the parsed token-endpoint response.
	 * @throws {@link KeycloakAuthenticationError} if the response carries no `access_token`.
	 */
	private storeTokens;
	/**
	 * Validate the config and build the one-time login grant parameters in a single pass.
	 *
	 * Validating and building together lets the credential checks narrow the optional
	 * `username` / `password` fields to `string` for the request shape, so no type
	 * assertion or unreachable guard is needed.
	 *
	 * @param config the {@link KeycloakTokenProviderConfig} to validate.
	 * @returns the form parameters for the offline-token (`grant_type=refresh_token`) or
	 *   ROPC (`grant_type=password`) login.
	 * @throws {@link KeycloakAuthenticationError} on a missing base field or an invalid
	 *   credential combination (neither, or both, credential shapes supplied).
	 */
	private validateAndBuildLoginRequest;
	/**
	 * Build the OIDC token endpoint URL for a realm, tolerating a trailing slash.
	 *
	 * @param keycloakUrl the base Keycloak URL (trailing slashes are stripped).
	 * @param realm the realm name; URL-encoded into the path.
	 * @returns the fully-qualified `.../protocol/openid-connect/token` endpoint URL.
	 */
	private static buildTokenEndpoint;
	/**
	 * Render an arbitrary thrown value into a short message for error wrapping.
	 *
	 * @param caughtError the value thrown by the failing token call.
	 * @returns the error's `message` when it is an `Error`, otherwise its string form.
	 */
	private static describeError;
	static ɵfac: i0.ɵɵFactoryDeclaration<KeycloakTokenProvider, [null, null, { optional: true }]>;
	static ɵprov: i0.ɵɵInjectableDeclaration<KeycloakTokenProvider>;
}

/**
 * Wire a consuming application's {@link TokenProvider} implementation into this
 * library and register the `@ngx-grpc` {@link AuthGrpcInterceptor} that uses it.
 *
 * This covers the gRPC-web side. For HTTP requests, additionally register the
 * functional `authHttpInterceptor`:
 *
 * ```ts
 * provideHttpClient(withInterceptors([authHttpInterceptor]))
 * ```
 *
 * Usage in an application's `providers` (standalone bootstrap or `AppModule`):
 *
 * ```ts
 * import { provideOndewoSipAuth } from "@ondewo/sip-client-angular";
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideOndewoSipAuth(KeycloakTokenProvider),
 *     provideHttpClient(withInterceptors([authHttpInterceptor])),
 *   ],
 * });
 * ```
 *
 * @param tokenProvider the application's `TokenProvider` class (e.g. one that
 *   wraps `keycloak-js` / `keycloak-angular`).
 * @returns environment providers binding the token provider and the gRPC
 *   interceptor.
 */
declare function provideOndewoSipAuth(tokenProvider: Type<TokenProvider>): EnvironmentProviders;
/**
 * Register the configuration the built-in `KeycloakTokenProvider` reads.
 *
 * Pair it with `provideOndewoSipAuth(KeycloakTokenProvider)` (and `provideHttpClient()`)
 * so consumers get background access-token refresh without implementing
 * {@link TokenProvider} themselves:
 *
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideHttpClient(withInterceptors([authHttpInterceptor])),
 *     provideKeycloakTokenProvider({
 *       keycloakUrl: "https://auth.example.com/auth",
 *       realm: "ondewo-ccai-platform",
 *       clientId: "ondewo-nlu-cai-sdk-public",
 *       refreshToken: "<offline-token>",
 *     }),
 *     provideOndewoSipAuth(KeycloakTokenProvider),
 *   ],
 * });
 * ```
 *
 * @param config the {@link KeycloakTokenProviderConfig} the provider logs in with.
 * @returns environment providers binding the config under {@link KEYCLOAK_TOKEN_PROVIDER_CONFIG}.
 */
declare function provideKeycloakTokenProvider(config: KeycloakTokenProviderConfig): EnvironmentProviders;

export {
	AUTHORIZATION_HEADER,
	AuthGrpcInterceptor,
	BEARER_PREFIX,
	GRPC_SIP_CLIENT_SETTINGS,
	KEYCLOAK_TOKEN_PROVIDER_CONFIG,
	KeycloakAuthenticationError,
	KeycloakTokenProvider,
	MIN_REFRESH_DELAY_IN_S,
	REFRESH_SKEW_IN_S,
	SipClient,
	SipEndCallRequest,
	SipPlayWavFilesRequest,
	SipRegisterAccountRequest,
	SipStartCallRequest,
	SipStartSessionRequest,
	SipStatus,
	SipStatusHistoryResponse,
	SipTransferCallRequest,
	TOKEN_PROVIDER,
	authHttpInterceptor,
	buildBearerValue,
	provideKeycloakTokenProvider,
	provideOndewoSipAuth,
	resolveBearerValue,
	resolveToken
};
export type { KeycloakTokenProviderConfig, TokenProvider, TokenResult };
