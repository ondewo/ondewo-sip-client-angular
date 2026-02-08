import * as i0 from '@angular/core';
import { InjectionToken } from '@angular/core';
import { GrpcMessage, RecursivePartial, ToProtobufJSONOptions, GrpcMetadata, GrpcEvent, GrpcClientFactory } from '@ngx-grpc/common';
import { GrpcHandler } from '@ngx-grpc/core';
import { Observable } from 'rxjs';
import { ByteSource, BinaryReader, BinaryWriter } from 'google-protobuf';
import * as googleProtobuf000 from '@ngx-grpc/well-known-types';

/**
 * Specific GrpcClientSettings for Sip.
 * Use it only if your default settings are not set or the service requires other settings.
 */
declare const GRPC_SIP_CLIENT_SETTINGS: InjectionToken<any>;

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
    set headers(value: {
        [prop: string]: string;
    });
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
    set headers(value: {
        [prop: string]: string;
    });
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
    set headers(value: {
        [prop: string]: string;
    });
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
        sipStartSession: (requestData: SipStartSessionRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipEndSession
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatus>>
         */
        sipEndSession: (requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipStartCall
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatus>>
         */
        sipStartCall: (requestData: SipStartCallRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
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
        sipTransferCall: (requestData: SipTransferCallRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipRegisterAccount
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatus>>
         */
        sipRegisterAccount: (requestData: SipRegisterAccountRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipGetSipStatus
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatus>>
         */
        sipGetSipStatus: (requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipGetSipStatusHistory
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatusHistoryResponse>>
         */
        sipGetSipStatusHistory: (requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatusHistoryResponse>>;
        /**
         * Unary call: /ondewo.sip.Sip/SipPlayWavFiles
         *
         * @param requestMessage Request message
         * @param requestMetadata Request metadata
         * @returns Observable<GrpcEvent<thisProto.SipStatus>>
         */
        sipPlayWavFiles: (requestData: SipPlayWavFilesRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
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
        sipUnMute: (requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
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
    sipGetSipStatusHistory(requestData: googleProtobuf000.Empty, requestMetadata?: GrpcMetadata): Observable<SipStatusHistoryResponse>;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<SipClient, [{ optional: true; }, null, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SipClient>;
}

export { GRPC_SIP_CLIENT_SETTINGS, SipClient, SipEndCallRequest, SipPlayWavFilesRequest, SipRegisterAccountRequest, SipStartCallRequest, SipStartSessionRequest, SipStatus, SipStatusHistoryResponse, SipTransferCallRequest };
