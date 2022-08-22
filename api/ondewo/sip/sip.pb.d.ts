import { GrpcMessage, RecursivePartial, ToProtobufJSONOptions } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
import * as googleProtobuf001 from '@ngx-grpc/well-known-types';
/**
 * Message implementation for ondewo.sip.EndCallRequest
 */
export declare class EndCallRequest implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): EndCallRequest;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: EndCallRequest): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: EndCallRequest, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: EndCallRequest, _writer: BinaryWriter): void;
    private _hardHangup?;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of EndCallRequest to deeply clone from
     */
    constructor(_value?: RecursivePartial<EndCallRequest.AsObject>);
    get hardHangup(): boolean | undefined;
    set hardHangup(value: boolean | undefined);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): any;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): EndCallRequest.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): EndCallRequest.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): EndCallRequest.AsProtobufJSON;
}
export declare module EndCallRequest {
    /**
     * Standard JavaScript object representation for EndCallRequest
     */
    interface AsObject {
        hardHangup?: boolean;
    }
    /**
     * Protobuf JSON representation for EndCallRequest
     */
    interface AsProtobufJSON {
        hardHangup?: boolean;
    }
}
/**
 * Message implementation for ondewo.sip.StartCallRequest
 */
export declare class StartCallRequest implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): StartCallRequest;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: StartCallRequest): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: StartCallRequest, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: StartCallRequest, _writer: BinaryWriter): void;
    private _calleeId?;
    private _headers?;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of StartCallRequest to deeply clone from
     */
    constructor(_value?: RecursivePartial<StartCallRequest.AsObject>);
    get calleeId(): string | undefined;
    set calleeId(value: string | undefined);
    get headers(): {
        [prop: string]: string;
    } | undefined;
    set headers(value: {
        [prop: string]: string;
    } | undefined);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): any;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): StartCallRequest.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): StartCallRequest.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): StartCallRequest.AsProtobufJSON;
}
export declare module StartCallRequest {
    /**
     * Standard JavaScript object representation for StartCallRequest
     */
    interface AsObject {
        calleeId?: string;
        headers?: {
            [prop: string]: string;
        };
    }
    /**
     * Protobuf JSON representation for StartCallRequest
     */
    interface AsProtobufJSON {
        calleeId?: string;
        headers?: {
            [prop: string]: string;
        };
    }
    /**
     * Message implementation for ondewo.sip.HeadersEntry
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
        private _key?;
        private _value?;
        /**
         * Message constructor. Initializes the properties and applies default Protobuf values if necessary
         * @param _value initial values object or instance of HeadersEntry to deeply clone from
         */
        constructor(_value?: RecursivePartial<HeadersEntry.AsObject>);
        get key(): string | undefined;
        set key(value: string | undefined);
        get value(): string | undefined;
        set value(value: string | undefined);
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
            key?: string;
            value?: string;
        }
        /**
         * Protobuf JSON representation for HeadersEntry
         */
        interface AsProtobufJSON {
            key?: string;
            value?: string;
        }
    }
}
/**
 * Message implementation for ondewo.sip.RegisterAccountRequest
 */
export declare class RegisterAccountRequest implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): RegisterAccountRequest;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: RegisterAccountRequest): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: RegisterAccountRequest, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: RegisterAccountRequest, _writer: BinaryWriter): void;
    private _accountName?;
    private _password?;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of RegisterAccountRequest to deeply clone from
     */
    constructor(_value?: RecursivePartial<RegisterAccountRequest.AsObject>);
    get accountName(): string | undefined;
    set accountName(value: string | undefined);
    get password(): string | undefined;
    set password(value: string | undefined);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): any;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): RegisterAccountRequest.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): RegisterAccountRequest.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): RegisterAccountRequest.AsProtobufJSON;
}
export declare module RegisterAccountRequest {
    /**
     * Standard JavaScript object representation for RegisterAccountRequest
     */
    interface AsObject {
        accountName?: string;
        password?: string;
    }
    /**
     * Protobuf JSON representation for RegisterAccountRequest
     */
    interface AsProtobufJSON {
        accountName?: string;
        password?: string;
    }
}
/**
 * Message implementation for ondewo.sip.StartSessionRequest
 */
export declare class StartSessionRequest implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): StartSessionRequest;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: StartSessionRequest): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: StartSessionRequest, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: StartSessionRequest, _writer: BinaryWriter): void;
    private _accountName?;
    private _autoAnswerInterval?;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of StartSessionRequest to deeply clone from
     */
    constructor(_value?: RecursivePartial<StartSessionRequest.AsObject>);
    get accountName(): string | undefined;
    set accountName(value: string | undefined);
    get autoAnswerInterval(): number | undefined;
    set autoAnswerInterval(value: number | undefined);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): any;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): StartSessionRequest.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): StartSessionRequest.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): StartSessionRequest.AsProtobufJSON;
}
export declare module StartSessionRequest {
    /**
     * Standard JavaScript object representation for StartSessionRequest
     */
    interface AsObject {
        accountName?: string;
        autoAnswerInterval?: number;
    }
    /**
     * Protobuf JSON representation for StartSessionRequest
     */
    interface AsProtobufJSON {
        accountName?: string;
        autoAnswerInterval?: number;
    }
}
/**
 * Message implementation for ondewo.sip.TransferCallRequest
 */
export declare class TransferCallRequest implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): TransferCallRequest;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: TransferCallRequest): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: TransferCallRequest, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: TransferCallRequest, _writer: BinaryWriter): void;
    private _transferId?;
    private _headers?;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of TransferCallRequest to deeply clone from
     */
    constructor(_value?: RecursivePartial<TransferCallRequest.AsObject>);
    get transferId(): string | undefined;
    set transferId(value: string | undefined);
    get headers(): {
        [prop: string]: string;
    } | undefined;
    set headers(value: {
        [prop: string]: string;
    } | undefined);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): any;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): TransferCallRequest.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): TransferCallRequest.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): TransferCallRequest.AsProtobufJSON;
}
export declare module TransferCallRequest {
    /**
     * Standard JavaScript object representation for TransferCallRequest
     */
    interface AsObject {
        transferId?: string;
        headers?: {
            [prop: string]: string;
        };
    }
    /**
     * Protobuf JSON representation for TransferCallRequest
     */
    interface AsProtobufJSON {
        transferId?: string;
        headers?: {
            [prop: string]: string;
        };
    }
    /**
     * Message implementation for ondewo.sip.HeadersEntry
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
        private _key?;
        private _value?;
        /**
         * Message constructor. Initializes the properties and applies default Protobuf values if necessary
         * @param _value initial values object or instance of HeadersEntry to deeply clone from
         */
        constructor(_value?: RecursivePartial<HeadersEntry.AsObject>);
        get key(): string | undefined;
        set key(value: string | undefined);
        get value(): string | undefined;
        set value(value: string | undefined);
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
            key?: string;
            value?: string;
        }
        /**
         * Protobuf JSON representation for HeadersEntry
         */
        interface AsProtobufJSON {
            key?: string;
            value?: string;
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
    private _accountName?;
    private _timestamp?;
    private _statusType?;
    private _calleeId?;
    private _transferCallId?;
    private _headers?;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipStatus to deeply clone from
     */
    constructor(_value?: RecursivePartial<SipStatus.AsObject>);
    get accountName(): string | undefined;
    set accountName(value: string | undefined);
    get timestamp(): googleProtobuf001.Timestamp | undefined;
    set timestamp(value: googleProtobuf001.Timestamp | undefined);
    get statusType(): SipStatus.StatusType | undefined;
    set statusType(value: SipStatus.StatusType | undefined);
    get calleeId(): string | undefined;
    set calleeId(value: string | undefined);
    get transferCallId(): string | undefined;
    set transferCallId(value: string | undefined);
    get headers(): {
        [prop: string]: string;
    } | undefined;
    set headers(value: {
        [prop: string]: string;
    } | undefined);
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
        accountName?: string;
        timestamp?: googleProtobuf001.Timestamp.AsObject;
        statusType?: SipStatus.StatusType;
        calleeId?: string;
        transferCallId?: string;
        headers?: {
            [prop: string]: string;
        };
    }
    /**
     * Protobuf JSON representation for SipStatus
     */
    interface AsProtobufJSON {
        accountName?: string;
        timestamp?: googleProtobuf001.Timestamp.AsProtobufJSON | null;
        statusType?: string;
        calleeId?: string;
        transferCallId?: string;
        headers?: {
            [prop: string]: string;
        };
    }
    enum StatusType {
        no_session = 0,
        registered = 1,
        ready = 2,
        incoming_call_initiated = 3,
        outgoing_call_initiated = 4,
        outgoing_call_connected = 5,
        incoming_call_connected = 6,
        transfer_call_initiated = 7,
        soft_hangup_initiated = 8,
        hard_hangup_initiated = 9,
        incoming_call_failed = 10,
        outgoing_call_failed = 11,
        incoming_call_finished = 12,
        outgoing_call_finished = 13
    }
    /**
     * Message implementation for ondewo.sip.HeadersEntry
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
        private _key?;
        private _value?;
        /**
         * Message constructor. Initializes the properties and applies default Protobuf values if necessary
         * @param _value initial values object or instance of HeadersEntry to deeply clone from
         */
        constructor(_value?: RecursivePartial<HeadersEntry.AsObject>);
        get key(): string | undefined;
        set key(value: string | undefined);
        get value(): string | undefined;
        set value(value: string | undefined);
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
            key?: string;
            value?: string;
        }
        /**
         * Protobuf JSON representation for HeadersEntry
         */
        interface AsProtobufJSON {
            key?: string;
            value?: string;
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
        statusHistory?: SipStatus.AsProtobufJSON[] | null;
    }
}
/**
 * Message implementation for ondewo.sip.PlayWavFilesRequest
 */
export declare class PlayWavFilesRequest implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): PlayWavFilesRequest;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: PlayWavFilesRequest): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: PlayWavFilesRequest, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: PlayWavFilesRequest, _writer: BinaryWriter): void;
    private _wavFiles?;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of PlayWavFilesRequest to deeply clone from
     */
    constructor(_value?: RecursivePartial<PlayWavFilesRequest.AsObject>);
    get wavFiles(): Uint8Array[] | undefined;
    set wavFiles(value: Uint8Array[] | undefined);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): any;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): PlayWavFilesRequest.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): PlayWavFilesRequest.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): PlayWavFilesRequest.AsProtobufJSON;
}
export declare module PlayWavFilesRequest {
    /**
     * Standard JavaScript object representation for PlayWavFilesRequest
     */
    interface AsObject {
        wavFiles?: Uint8Array[];
    }
    /**
     * Protobuf JSON representation for PlayWavFilesRequest
     */
    interface AsProtobufJSON {
        wavFiles?: string[];
    }
}
