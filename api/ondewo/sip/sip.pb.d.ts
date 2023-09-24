import { GrpcMessage, RecursivePartial, ToProtobufJSONOptions } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
import * as googleProtobuf001 from '@ngx-grpc/well-known-types';
/**
 * Message implementation for ondewo.sip.SipEndCallRequest
 */
export declare class SipEndCallRequest implements GrpcMessage {
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
export declare module SipEndCallRequest {
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
export declare class SipStartCallRequest implements GrpcMessage {
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
export declare module SipStartCallRequest {
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
	module HeadersEntry {
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
export declare class SipRegisterAccountRequest implements GrpcMessage {
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
export declare module SipRegisterAccountRequest {
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
export declare class SipStartSessionRequest implements GrpcMessage {
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
export declare module SipStartSessionRequest {
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
export declare class SipTransferCallRequest implements GrpcMessage {
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
export declare module SipTransferCallRequest {
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
	module HeadersEntry {
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
export declare class SipStatus implements GrpcMessage {
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
	get timestamp(): googleProtobuf001.Timestamp | undefined;
	set timestamp(value: googleProtobuf001.Timestamp | undefined);
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
export declare module SipStatus {
	/**
	 * Standard JavaScript object representation for SipStatus
	 */
	interface AsObject {
		accountName: string;
		timestamp?: googleProtobuf001.Timestamp.AsObject;
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
		timestamp: googleProtobuf001.Timestamp.AsProtobufJSON | null;
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
	module HeadersEntry {
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
export declare class SipStatusHistoryResponse implements GrpcMessage {
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
export declare module SipStatusHistoryResponse {
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
export declare class SipPlayWavFilesRequest implements GrpcMessage {
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
export declare module SipPlayWavFilesRequest {
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
