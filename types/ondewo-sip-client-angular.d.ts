/**
 * Generated bundle index. Do not edit.
 */
import { GrpcClientFactory, GrpcEvent, GrpcMessage, GrpcMetadata, GrpcRequest, RecursivePartial, ToProtobufJSONOptions } from "@ngx-grpc/common";
import { BinaryReader, BinaryWriter, ByteSource } from "google-protobuf";
import * as googleProtobuf001 from "@ngx-grpc/well-known-types";
import * as i0 from "@angular/core";
import { EnvironmentProviders, InjectionToken, OnDestroy, Type } from "@angular/core";
import { GrpcHandler, GrpcInterceptor } from "@ngx-grpc/core";
import { Observable } from "rxjs";
import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
export declare enum SipTransferDelegation {
  SIP_TRANSFER_DELEGATION_UNSPECIFIED = 0,
  SIP_TRANSFER_DELEGATION_CLAIM = 1,
  SIP_TRANSFER_DELEGATION_EXECUTE = 2,
  SIP_TRANSFER_DELEGATION_DISCARD = 3
}
export declare enum MediaControlSetting {
  MEDIA_CONTROL_SETTING_UNCHANGED = 0,
  MEDIA_CONTROL_SETTING_ON = 1,
  MEDIA_CONTROL_SETTING_OFF = 2
}
export declare enum MediaControlOwner {
  MEDIA_CONTROL_OWNER_UNSPECIFIED = 0,
  MEDIA_CONTROL_OWNER_OPERATOR = 1,
  MEDIA_CONTROL_OWNER_PARTICIPANT = 2
}
export declare enum SipWarmTransferOutcome {
  SIP_WARM_TRANSFER_OUTCOME_UNSPECIFIED = 0,
  SIP_WARM_TRANSFER_OUTCOME_DECLINED = 1,
  SIP_WARM_TRANSFER_OUTCOME_UNREACHABLE = 2,
  SIP_WARM_TRANSFER_OUTCOME_DELEGATION_EXPIRED = 3
}
export declare enum SipWarmTransferOutcomeNoticeStatus {
  SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_UNSPECIFIED = 0,
  SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_QUEUED = 1,
  SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_DUPLICATE = 2,
  SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_DISABLED = 3,
  SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_INVALID = 4,
  SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_PENDING = 5
}
export declare enum SipCallAudioMode {
  SIP_CALL_AUDIO_MODE_UNSPECIFIED = 0,
  SIP_CALL_AUDIO_MODE_LISTEN = 1,
  SIP_CALL_AUDIO_MODE_TALK = 2
}
export declare enum SipCallAudioEndReason {
  SIP_CALL_AUDIO_END_REASON_UNSPECIFIED = 0,
  SIP_CALL_AUDIO_END_REASON_CLIENT_CLOSED = 1,
  SIP_CALL_AUDIO_END_REASON_CALL_ENDED = 2,
  SIP_CALL_AUDIO_END_REASON_CALL_TRANSFERRED = 3,
  SIP_CALL_AUDIO_END_REASON_MAX_DURATION = 4,
  SIP_CALL_AUDIO_END_REASON_STALLED = 5,
  SIP_CALL_AUDIO_END_REASON_INTERNAL = 6
}
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
  private _endReason;
  private _amdResult?;
  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipEndCallRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipEndCallRequest.AsObject>);
  get hardHangup(): boolean;
  set hardHangup(value: boolean);
  get endReason(): SipEndCallRequest.EndCallReason;
  set endReason(value: SipEndCallRequest.EndCallReason);
  get amdResult(): AnsweringMachineDetectionResult | undefined;
  set amdResult(value: AnsweringMachineDetectionResult | undefined);
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
export declare namespace SipEndCallRequest {
  /**
   * Standard JavaScript object representation for SipEndCallRequest
   */
  interface AsObject {
    hardHangup: boolean;
    endReason: SipEndCallRequest.EndCallReason;
    amdResult?: AnsweringMachineDetectionResult.AsObject;
  }
  /**
   * Protobuf JSON representation for SipEndCallRequest
   */
  interface AsProtobufJSON {
    hardHangup: boolean;
    endReason: string;
    amdResult: AnsweringMachineDetectionResult.AsProtobufJSON | null;
  }
  enum EndCallReason {
    END_CALL_REASON_UNSPECIFIED = 0,
    ANSWERING_MACHINE = 1,
    ANSWERING_MACHINE_VOICE_MESSAGE_LEFT = 2,
    END_CALL_REASON_TRANSFERRED = 3
  }
}
/**
 * Message implementation for ondewo.sip.SipReportAnsweringMachineDetectedRequest
 */
export declare class SipReportAnsweringMachineDetectedRequest implements GrpcMessage {
  static id: string;
  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource): SipReportAnsweringMachineDetectedRequest;
  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipReportAnsweringMachineDetectedRequest): void;
  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: SipReportAnsweringMachineDetectedRequest, _reader: BinaryReader): void;
  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: SipReportAnsweringMachineDetectedRequest, _writer: BinaryWriter): void;
  private _amdResult?;
  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipReportAnsweringMachineDetectedRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipReportAnsweringMachineDetectedRequest.AsObject>);
  get amdResult(): AnsweringMachineDetectionResult | undefined;
  set amdResult(value: AnsweringMachineDetectionResult | undefined);
  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary(): any;
  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipReportAnsweringMachineDetectedRequest.AsObject;
  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON(): SipReportAnsweringMachineDetectedRequest.AsObject;
  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(options?: ToProtobufJSONOptions): SipReportAnsweringMachineDetectedRequest.AsProtobufJSON;
}
export declare namespace SipReportAnsweringMachineDetectedRequest {
  /**
   * Standard JavaScript object representation for SipReportAnsweringMachineDetectedRequest
   */
  interface AsObject {
    amdResult?: AnsweringMachineDetectionResult.AsObject;
  }
  /**
   * Protobuf JSON representation for SipReportAnsweringMachineDetectedRequest
   */
  interface AsProtobufJSON {
    amdResult: AnsweringMachineDetectionResult.AsProtobufJSON | null;
  }
}
/**
 * Message implementation for ondewo.sip.AnsweringMachineDetectionResult
 */
export declare class AnsweringMachineDetectionResult implements GrpcMessage {
  static id: string;
  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource): AnsweringMachineDetectionResult;
  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AnsweringMachineDetectionResult): void;
  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: AnsweringMachineDetectionResult, _reader: BinaryReader): void;
  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: AnsweringMachineDetectionResult, _writer: BinaryWriter): void;
  private _verdict;
  private _cause;
  private _confidence;
  private _decisionMs;
  private _ruleId;
  private _matchedCueIds;
  private _actionTaken;
  private _callId;
  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AnsweringMachineDetectionResult to deeply clone from
   */
  constructor(_value?: RecursivePartial<AnsweringMachineDetectionResult.AsObject>);
  get verdict(): AnsweringMachineDetectionResult.Verdict;
  set verdict(value: AnsweringMachineDetectionResult.Verdict);
  get cause(): AnsweringMachineDetectionResult.Cause;
  set cause(value: AnsweringMachineDetectionResult.Cause);
  get confidence(): number;
  set confidence(value: number);
  get decisionMs(): number;
  set decisionMs(value: number);
  get ruleId(): string;
  set ruleId(value: string);
  get matchedCueIds(): string[];
  set matchedCueIds(value: string[]);
  get actionTaken(): AnsweringMachineDetectionResult.ActionTaken;
  set actionTaken(value: AnsweringMachineDetectionResult.ActionTaken);
  get callId(): string;
  set callId(value: string);
  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary(): any;
  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AnsweringMachineDetectionResult.AsObject;
  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON(): AnsweringMachineDetectionResult.AsObject;
  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(options?: ToProtobufJSONOptions): AnsweringMachineDetectionResult.AsProtobufJSON;
}
export declare namespace AnsweringMachineDetectionResult {
  /**
   * Standard JavaScript object representation for AnsweringMachineDetectionResult
   */
  interface AsObject {
    verdict: AnsweringMachineDetectionResult.Verdict;
    cause: AnsweringMachineDetectionResult.Cause;
    confidence: number;
    decisionMs: number;
    ruleId: string;
    matchedCueIds: string[];
    actionTaken: AnsweringMachineDetectionResult.ActionTaken;
    callId: string;
  }
  /**
   * Protobuf JSON representation for AnsweringMachineDetectionResult
   */
  interface AsProtobufJSON {
    verdict: string;
    cause: string;
    confidence: number;
    decisionMs: number;
    ruleId: string;
    matchedCueIds: string[];
    actionTaken: string;
    callId: string;
  }
  enum Verdict {
    VERDICT_UNSPECIFIED = 0,
    HUMAN = 1,
    MACHINE = 2,
    IVR = 3,
    FAX = 4,
    NETWORK_ANNOUNCEMENT = 5,
    CALL_SCREENING = 6,
    NO_SPEECH = 7,
    UNKNOWN = 8
  }
  enum Cause {
    CAUSE_UNSPECIFIED = 0,
    CADENCE = 1,
    KEYWORD = 2,
    BEEP = 3,
    TONE = 4,
    CADENCE_AND_KEYWORD = 5,
    CADENCE_AND_BEEP = 6,
    TIMEOUT = 7,
    SILENCE = 8
  }
  enum ActionTaken {
    ACTION_TAKEN_UNSPECIFIED = 0,
    HUNG_UP = 1,
    CONTINUED = 2,
    DETECT_ONLY = 3,
    LEFT_VOICE_MESSAGE = 4
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
export declare namespace SipStartCallRequest {
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
export declare namespace SipRegisterAccountRequest {
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
export declare namespace SipStartSessionRequest {
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
  private _outcomeTimeoutMs;
  private _delegation;
  private _delegatedRequestId;
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
  get outcomeTimeoutMs(): number;
  set outcomeTimeoutMs(value: number);
  get delegation(): SipTransferDelegation;
  set delegation(value: SipTransferDelegation);
  get delegatedRequestId(): string;
  set delegatedRequestId(value: string);
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
export declare namespace SipTransferCallRequest {
  /**
   * Standard JavaScript object representation for SipTransferCallRequest
   */
  interface AsObject {
    transferId: string;
    headers: {
      [prop: string]: string;
    };
    outcomeTimeoutMs: number;
    delegation: SipTransferDelegation;
    delegatedRequestId: string;
  }
  /**
   * Protobuf JSON representation for SipTransferCallRequest
   */
  interface AsProtobufJSON {
    transferId: string;
    headers: {
      [prop: string]: string;
    };
    outcomeTimeoutMs: number;
    delegation: string;
    delegatedRequestId: string;
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
 * Message implementation for ondewo.sip.SipDelegatedTransfer
 */
export declare class SipDelegatedTransfer implements GrpcMessage {
  static id: string;
  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource): SipDelegatedTransfer;
  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipDelegatedTransfer): void;
  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: SipDelegatedTransfer, _reader: BinaryReader): void;
  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: SipDelegatedTransfer, _writer: BinaryWriter): void;
  private _requestId;
  private _requestedAt?;
  private _targetIsPhoneNumber;
  private _transferId;
  private _headers;
  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipDelegatedTransfer to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipDelegatedTransfer.AsObject>);
  get requestId(): string;
  set requestId(value: string);
  get requestedAt(): googleProtobuf001.Timestamp | undefined;
  set requestedAt(value: googleProtobuf001.Timestamp | undefined);
  get targetIsPhoneNumber(): boolean;
  set targetIsPhoneNumber(value: boolean);
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
  toObject(): SipDelegatedTransfer.AsObject;
  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON(): SipDelegatedTransfer.AsObject;
  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(options?: ToProtobufJSONOptions): SipDelegatedTransfer.AsProtobufJSON;
}
export declare namespace SipDelegatedTransfer {
  /**
   * Standard JavaScript object representation for SipDelegatedTransfer
   */
  interface AsObject {
    requestId: string;
    requestedAt?: googleProtobuf001.Timestamp.AsObject;
    targetIsPhoneNumber: boolean;
    transferId: string;
    headers: {
      [prop: string]: string;
    };
  }
  /**
   * Protobuf JSON representation for SipDelegatedTransfer
   */
  interface AsProtobufJSON {
    requestId: string;
    requestedAt: googleProtobuf001.Timestamp.AsProtobufJSON | null;
    targetIsPhoneNumber: boolean;
    transferId: string;
    headers: {
      [prop: string]: string;
    };
  }
  /**
   * Message implementation for ondewo.sip.SipDelegatedTransfer.HeadersEntry
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
  private _amdResult?;
  private _callId;
  private _botMuted;
  private _listeningPaused;
  private _callAudioStreams;
  private _sipResponseCode;
  private _delegatedTransfer?;
  private _capabilities;
  private _warmTransferOutcomeNoticeStatus;
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
  get amdResult(): AnsweringMachineDetectionResult | undefined;
  set amdResult(value: AnsweringMachineDetectionResult | undefined);
  get callId(): string;
  set callId(value: string);
  get botMuted(): boolean;
  set botMuted(value: boolean);
  get listeningPaused(): boolean;
  set listeningPaused(value: boolean);
  get callAudioStreams(): number;
  set callAudioStreams(value: number);
  get sipResponseCode(): number;
  set sipResponseCode(value: number);
  get delegatedTransfer(): SipDelegatedTransfer | undefined;
  set delegatedTransfer(value: SipDelegatedTransfer | undefined);
  get capabilities(): string[];
  set capabilities(value: string[]);
  get warmTransferOutcomeNoticeStatus(): SipWarmTransferOutcomeNoticeStatus;
  set warmTransferOutcomeNoticeStatus(value: SipWarmTransferOutcomeNoticeStatus);
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
export declare namespace SipStatus {
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
    amdResult?: AnsweringMachineDetectionResult.AsObject;
    callId: string;
    botMuted: boolean;
    listeningPaused: boolean;
    callAudioStreams: number;
    sipResponseCode: number;
    delegatedTransfer?: SipDelegatedTransfer.AsObject;
    capabilities: string[];
    warmTransferOutcomeNoticeStatus: SipWarmTransferOutcomeNoticeStatus;
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
    amdResult: AnsweringMachineDetectionResult.AsProtobufJSON | null;
    callId: string;
    botMuted: boolean;
    listeningPaused: boolean;
    callAudioStreams: number;
    sipResponseCode: number;
    delegatedTransfer: SipDelegatedTransfer.AsProtobufJSON | null;
    capabilities: string[];
    warmTransferOutcomeNoticeStatus: string;
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
    NO_ONGOING_CALL = 21,
    OUTGOING_CALL_ANSWERING_MACHINE_DETECTED = 22
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
export declare namespace SipStatusHistoryResponse {
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
 * Message implementation for ondewo.sip.SipSetCallMediaControlRequest
 */
export declare class SipSetCallMediaControlRequest implements GrpcMessage {
  static id: string;
  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource): SipSetCallMediaControlRequest;
  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipSetCallMediaControlRequest): void;
  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: SipSetCallMediaControlRequest, _reader: BinaryReader): void;
  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: SipSetCallMediaControlRequest, _writer: BinaryWriter): void;
  private _botVoice;
  private _botListening;
  private _owner;
  private _participantsPresent;
  private _warmTransferOutcome?;
  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipSetCallMediaControlRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipSetCallMediaControlRequest.AsObject>);
  get botVoice(): MediaControlSetting;
  set botVoice(value: MediaControlSetting);
  get botListening(): MediaControlSetting;
  set botListening(value: MediaControlSetting);
  get owner(): MediaControlOwner;
  set owner(value: MediaControlOwner);
  get participantsPresent(): boolean;
  set participantsPresent(value: boolean);
  get warmTransferOutcome(): SipWarmTransferOutcomeNotice | undefined;
  set warmTransferOutcome(value: SipWarmTransferOutcomeNotice | undefined);
  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary(): any;
  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipSetCallMediaControlRequest.AsObject;
  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON(): SipSetCallMediaControlRequest.AsObject;
  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(options?: ToProtobufJSONOptions): SipSetCallMediaControlRequest.AsProtobufJSON;
}
export declare namespace SipSetCallMediaControlRequest {
  /**
   * Standard JavaScript object representation for SipSetCallMediaControlRequest
   */
  interface AsObject {
    botVoice: MediaControlSetting;
    botListening: MediaControlSetting;
    owner: MediaControlOwner;
    participantsPresent: boolean;
    warmTransferOutcome?: SipWarmTransferOutcomeNotice.AsObject;
  }
  /**
   * Protobuf JSON representation for SipSetCallMediaControlRequest
   */
  interface AsProtobufJSON {
    botVoice: string;
    botListening: string;
    owner: string;
    participantsPresent: boolean;
    warmTransferOutcome: SipWarmTransferOutcomeNotice.AsProtobufJSON | null;
  }
}
/**
 * Message implementation for ondewo.sip.SipWarmTransferOutcomeNotice
 */
export declare class SipWarmTransferOutcomeNotice implements GrpcMessage {
  static id: string;
  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource): SipWarmTransferOutcomeNotice;
  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipWarmTransferOutcomeNotice): void;
  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: SipWarmTransferOutcomeNotice, _reader: BinaryReader): void;
  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: SipWarmTransferOutcomeNotice, _writer: BinaryWriter): void;
  private _requestId;
  private _outcome;
  private _introSession;
  private _calleeDisplayName;
  private _cause;
  private _fallbackText;
  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipWarmTransferOutcomeNotice to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipWarmTransferOutcomeNotice.AsObject>);
  get requestId(): string;
  set requestId(value: string);
  get outcome(): SipWarmTransferOutcome;
  set outcome(value: SipWarmTransferOutcome);
  get introSession(): string;
  set introSession(value: string);
  get calleeDisplayName(): string;
  set calleeDisplayName(value: string);
  get cause(): string;
  set cause(value: string);
  get fallbackText(): string;
  set fallbackText(value: string);
  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary(): any;
  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipWarmTransferOutcomeNotice.AsObject;
  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON(): SipWarmTransferOutcomeNotice.AsObject;
  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(options?: ToProtobufJSONOptions): SipWarmTransferOutcomeNotice.AsProtobufJSON;
}
export declare namespace SipWarmTransferOutcomeNotice {
  /**
   * Standard JavaScript object representation for SipWarmTransferOutcomeNotice
   */
  interface AsObject {
    requestId: string;
    outcome: SipWarmTransferOutcome;
    introSession: string;
    calleeDisplayName: string;
    cause: string;
    fallbackText: string;
  }
  /**
   * Protobuf JSON representation for SipWarmTransferOutcomeNotice
   */
  interface AsProtobufJSON {
    requestId: string;
    outcome: string;
    introSession: string;
    calleeDisplayName: string;
    cause: string;
    fallbackText: string;
  }
}
/**
 * Message implementation for ondewo.sip.SipSendDtmfRequest
 */
export declare class SipSendDtmfRequest implements GrpcMessage {
  static id: string;
  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource): SipSendDtmfRequest;
  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipSendDtmfRequest): void;
  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: SipSendDtmfRequest, _reader: BinaryReader): void;
  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: SipSendDtmfRequest, _writer: BinaryWriter): void;
  private _digits;
  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipSendDtmfRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipSendDtmfRequest.AsObject>);
  get digits(): string;
  set digits(value: string);
  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary(): any;
  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipSendDtmfRequest.AsObject;
  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON(): SipSendDtmfRequest.AsObject;
  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(options?: ToProtobufJSONOptions): SipSendDtmfRequest.AsProtobufJSON;
}
export declare namespace SipSendDtmfRequest {
  /**
   * Standard JavaScript object representation for SipSendDtmfRequest
   */
  interface AsObject {
    digits: string;
  }
  /**
   * Protobuf JSON representation for SipSendDtmfRequest
   */
  interface AsProtobufJSON {
    digits: string;
  }
}
/**
 * Message implementation for ondewo.sip.SipCallAudioConfig
 */
export declare class SipCallAudioConfig implements GrpcMessage {
  static id: string;
  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource): SipCallAudioConfig;
  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipCallAudioConfig): void;
  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: SipCallAudioConfig, _reader: BinaryReader): void;
  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: SipCallAudioConfig, _writer: BinaryWriter): void;
  private _mode;
  private _sampleRateHz;
  private _frameMs;
  private _takeOver;
  private _streamId;
  private _maxDurationS;
  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipCallAudioConfig to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipCallAudioConfig.AsObject>);
  get mode(): SipCallAudioMode;
  set mode(value: SipCallAudioMode);
  get sampleRateHz(): number;
  set sampleRateHz(value: number);
  get frameMs(): number;
  set frameMs(value: number);
  get takeOver(): boolean;
  set takeOver(value: boolean);
  get streamId(): string;
  set streamId(value: string);
  get maxDurationS(): number;
  set maxDurationS(value: number);
  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary(): any;
  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipCallAudioConfig.AsObject;
  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON(): SipCallAudioConfig.AsObject;
  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(options?: ToProtobufJSONOptions): SipCallAudioConfig.AsProtobufJSON;
}
export declare namespace SipCallAudioConfig {
  /**
   * Standard JavaScript object representation for SipCallAudioConfig
   */
  interface AsObject {
    mode: SipCallAudioMode;
    sampleRateHz: number;
    frameMs: number;
    takeOver: boolean;
    streamId: string;
    maxDurationS: number;
  }
  /**
   * Protobuf JSON representation for SipCallAudioConfig
   */
  interface AsProtobufJSON {
    mode: string;
    sampleRateHz: number;
    frameMs: number;
    takeOver: boolean;
    streamId: string;
    maxDurationS: number;
  }
}
/**
 * Message implementation for ondewo.sip.SipCallAudioFrame
 */
export declare class SipCallAudioFrame implements GrpcMessage {
  static id: string;
  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource): SipCallAudioFrame;
  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipCallAudioFrame): void;
  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: SipCallAudioFrame, _reader: BinaryReader): void;
  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: SipCallAudioFrame, _writer: BinaryWriter): void;
  private _pcmS16le;
  private _sequence;
  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipCallAudioFrame to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipCallAudioFrame.AsObject>);
  get pcmS16le(): Uint8Array;
  set pcmS16le(value: Uint8Array);
  get sequence(): string;
  set sequence(value: string);
  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary(): any;
  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipCallAudioFrame.AsObject;
  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON(): SipCallAudioFrame.AsObject;
  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(options?: ToProtobufJSONOptions): SipCallAudioFrame.AsProtobufJSON;
}
export declare namespace SipCallAudioFrame {
  /**
   * Standard JavaScript object representation for SipCallAudioFrame
   */
  interface AsObject {
    pcmS16le: Uint8Array;
    sequence: string;
  }
  /**
   * Protobuf JSON representation for SipCallAudioFrame
   */
  interface AsProtobufJSON {
    pcmS16le: string;
    sequence: string;
  }
}
/**
 * Message implementation for ondewo.sip.SipCallAudioRequest
 */
export declare class SipCallAudioRequest implements GrpcMessage {
  static id: string;
  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource): SipCallAudioRequest;
  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipCallAudioRequest): void;
  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: SipCallAudioRequest, _reader: BinaryReader): void;
  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: SipCallAudioRequest, _writer: BinaryWriter): void;
  private _config?;
  private _audio?;
  private _agentMuted;
  private _request;
  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipCallAudioRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipCallAudioRequest.AsObject>);
  get config(): SipCallAudioConfig | undefined;
  set config(value: SipCallAudioConfig | undefined);
  get audio(): SipCallAudioFrame | undefined;
  set audio(value: SipCallAudioFrame | undefined);
  get agentMuted(): boolean;
  set agentMuted(value: boolean);
  get request(): SipCallAudioRequest.RequestCase;
  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary(): any;
  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipCallAudioRequest.AsObject;
  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON(): SipCallAudioRequest.AsObject;
  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(options?: ToProtobufJSONOptions): SipCallAudioRequest.AsProtobufJSON;
}
export declare namespace SipCallAudioRequest {
  /**
   * Standard JavaScript object representation for SipCallAudioRequest
   */
  interface AsObject {
    config?: SipCallAudioConfig.AsObject;
    audio?: SipCallAudioFrame.AsObject;
    agentMuted: boolean;
  }
  /**
   * Protobuf JSON representation for SipCallAudioRequest
   */
  interface AsProtobufJSON {
    config: SipCallAudioConfig.AsProtobufJSON | null;
    audio: SipCallAudioFrame.AsProtobufJSON | null;
    agentMuted: boolean;
  }
  enum RequestCase {
    none = 0,
    config = 1,
    audio = 2,
    agentMuted = 3
  }
}
/**
 * Message implementation for ondewo.sip.SipCallAudioStarted
 */
export declare class SipCallAudioStarted implements GrpcMessage {
  static id: string;
  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource): SipCallAudioStarted;
  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipCallAudioStarted): void;
  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: SipCallAudioStarted, _reader: BinaryReader): void;
  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: SipCallAudioStarted, _writer: BinaryWriter): void;
  private _streamId;
  private _sampleRateHz;
  private _frameMs;
  private _mode;
  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipCallAudioStarted to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipCallAudioStarted.AsObject>);
  get streamId(): string;
  set streamId(value: string);
  get sampleRateHz(): number;
  set sampleRateHz(value: number);
  get frameMs(): number;
  set frameMs(value: number);
  get mode(): SipCallAudioMode;
  set mode(value: SipCallAudioMode);
  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary(): any;
  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipCallAudioStarted.AsObject;
  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON(): SipCallAudioStarted.AsObject;
  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(options?: ToProtobufJSONOptions): SipCallAudioStarted.AsProtobufJSON;
}
export declare namespace SipCallAudioStarted {
  /**
   * Standard JavaScript object representation for SipCallAudioStarted
   */
  interface AsObject {
    streamId: string;
    sampleRateHz: number;
    frameMs: number;
    mode: SipCallAudioMode;
  }
  /**
   * Protobuf JSON representation for SipCallAudioStarted
   */
  interface AsProtobufJSON {
    streamId: string;
    sampleRateHz: number;
    frameMs: number;
    mode: string;
  }
}
/**
 * Message implementation for ondewo.sip.SipCallAudioStats
 */
export declare class SipCallAudioStats implements GrpcMessage {
  static id: string;
  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource): SipCallAudioStats;
  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipCallAudioStats): void;
  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: SipCallAudioStats, _reader: BinaryReader): void;
  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: SipCallAudioStats, _writer: BinaryWriter): void;
  private _framesSent;
  private _framesDropped;
  private _framesReceived;
  private _underruns;
  private _framesDiscarded;
  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipCallAudioStats to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipCallAudioStats.AsObject>);
  get framesSent(): string;
  set framesSent(value: string);
  get framesDropped(): string;
  set framesDropped(value: string);
  get framesReceived(): string;
  set framesReceived(value: string);
  get underruns(): string;
  set underruns(value: string);
  get framesDiscarded(): string;
  set framesDiscarded(value: string);
  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary(): any;
  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipCallAudioStats.AsObject;
  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON(): SipCallAudioStats.AsObject;
  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(options?: ToProtobufJSONOptions): SipCallAudioStats.AsProtobufJSON;
}
export declare namespace SipCallAudioStats {
  /**
   * Standard JavaScript object representation for SipCallAudioStats
   */
  interface AsObject {
    framesSent: string;
    framesDropped: string;
    framesReceived: string;
    underruns: string;
    framesDiscarded: string;
  }
  /**
   * Protobuf JSON representation for SipCallAudioStats
   */
  interface AsProtobufJSON {
    framesSent: string;
    framesDropped: string;
    framesReceived: string;
    underruns: string;
    framesDiscarded: string;
  }
}
/**
 * Message implementation for ondewo.sip.SipCallAudioEnded
 */
export declare class SipCallAudioEnded implements GrpcMessage {
  static id: string;
  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource): SipCallAudioEnded;
  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipCallAudioEnded): void;
  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: SipCallAudioEnded, _reader: BinaryReader): void;
  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: SipCallAudioEnded, _writer: BinaryWriter): void;
  private _reason;
  private _detail;
  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipCallAudioEnded to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipCallAudioEnded.AsObject>);
  get reason(): SipCallAudioEndReason;
  set reason(value: SipCallAudioEndReason);
  get detail(): string;
  set detail(value: string);
  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary(): any;
  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipCallAudioEnded.AsObject;
  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON(): SipCallAudioEnded.AsObject;
  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(options?: ToProtobufJSONOptions): SipCallAudioEnded.AsProtobufJSON;
}
export declare namespace SipCallAudioEnded {
  /**
   * Standard JavaScript object representation for SipCallAudioEnded
   */
  interface AsObject {
    reason: SipCallAudioEndReason;
    detail: string;
  }
  /**
   * Protobuf JSON representation for SipCallAudioEnded
   */
  interface AsProtobufJSON {
    reason: string;
    detail: string;
  }
}
/**
 * Message implementation for ondewo.sip.SipCallAudioResponse
 */
export declare class SipCallAudioResponse implements GrpcMessage {
  static id: string;
  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource): SipCallAudioResponse;
  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipCallAudioResponse): void;
  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: SipCallAudioResponse, _reader: BinaryReader): void;
  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: SipCallAudioResponse, _writer: BinaryWriter): void;
  private _started?;
  private _audio?;
  private _stats?;
  private _ended?;
  private _response;
  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipCallAudioResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipCallAudioResponse.AsObject>);
  get started(): SipCallAudioStarted | undefined;
  set started(value: SipCallAudioStarted | undefined);
  get audio(): SipCallAudioFrame | undefined;
  set audio(value: SipCallAudioFrame | undefined);
  get stats(): SipCallAudioStats | undefined;
  set stats(value: SipCallAudioStats | undefined);
  get ended(): SipCallAudioEnded | undefined;
  set ended(value: SipCallAudioEnded | undefined);
  get response(): SipCallAudioResponse.ResponseCase;
  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary(): any;
  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipCallAudioResponse.AsObject;
  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON(): SipCallAudioResponse.AsObject;
  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(options?: ToProtobufJSONOptions): SipCallAudioResponse.AsProtobufJSON;
}
export declare namespace SipCallAudioResponse {
  /**
   * Standard JavaScript object representation for SipCallAudioResponse
   */
  interface AsObject {
    started?: SipCallAudioStarted.AsObject;
    audio?: SipCallAudioFrame.AsObject;
    stats?: SipCallAudioStats.AsObject;
    ended?: SipCallAudioEnded.AsObject;
  }
  /**
   * Protobuf JSON representation for SipCallAudioResponse
   */
  interface AsProtobufJSON {
    started: SipCallAudioStarted.AsProtobufJSON | null;
    audio: SipCallAudioFrame.AsProtobufJSON | null;
    stats: SipCallAudioStats.AsProtobufJSON | null;
    ended: SipCallAudioEnded.AsProtobufJSON | null;
  }
  enum ResponseCase {
    none = 0,
    started = 1,
    audio = 2,
    stats = 3,
    ended = 4
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
export declare namespace SipPlayWavFilesRequest {
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
export declare const GRPC_SIP_CLIENT_SETTINGS: InjectionToken<any>;
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
    sipStartSession: (requestData: SipStartSessionRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
    /**
     * Unary call: /ondewo.sip.Sip/SipEndSession
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatus>>
     */
    sipEndSession: (requestData: googleProtobuf001.Empty, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
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
    sipGetSipStatus: (requestData: googleProtobuf001.Empty, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
    /**
     * Unary call: /ondewo.sip.Sip/SipGetSipStatusHistory
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatusHistoryResponse>>
     */
    sipGetSipStatusHistory: (requestData: googleProtobuf001.Empty, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatusHistoryResponse>>;
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
    sipMute: (requestData: googleProtobuf001.Empty, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
    /**
     * Unary call: /ondewo.sip.Sip/SipUnMute
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatus>>
     */
    sipUnMute: (requestData: googleProtobuf001.Empty, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
    /**
     * Unary call: /ondewo.sip.Sip/SipReportAnsweringMachineDetected
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatus>>
     */
    sipReportAnsweringMachineDetected: (requestData: SipReportAnsweringMachineDetectedRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
    /**
     * Unary call: /ondewo.sip.Sip/SipSetCallMediaControl
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatus>>
     */
    sipSetCallMediaControl: (requestData: SipSetCallMediaControlRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
    /**
     * Unary call: /ondewo.sip.Sip/SipSendDtmf
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SipStatus>>
     */
    sipSendDtmf: (requestData: SipSendDtmfRequest, requestMetadata?: GrpcMetadata) => Observable<GrpcEvent<SipStatus>>;
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
  sipEndSession(requestData: googleProtobuf001.Empty, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
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
  sipGetSipStatus(requestData: googleProtobuf001.Empty, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
  /**
   * Unary call @/ondewo.sip.Sip/SipGetSipStatusHistory
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatusHistoryResponse>
   */
  sipGetSipStatusHistory(requestData: googleProtobuf001.Empty, requestMetadata?: GrpcMetadata): Observable<SipStatusHistoryResponse>;
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
  sipMute(requestData: googleProtobuf001.Empty, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
  /**
   * Unary call @/ondewo.sip.Sip/SipUnMute
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatus>
   */
  sipUnMute(requestData: googleProtobuf001.Empty, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
  /**
   * Unary call @/ondewo.sip.Sip/SipReportAnsweringMachineDetected
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatus>
   */
  sipReportAnsweringMachineDetected(requestData: SipReportAnsweringMachineDetectedRequest, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
  /**
   * Unary call @/ondewo.sip.Sip/SipSetCallMediaControl
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatus>
   */
  sipSetCallMediaControl(requestData: SipSetCallMediaControlRequest, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
  /**
   * Unary call @/ondewo.sip.Sip/SipSendDtmf
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SipStatus>
   */
  sipSendDtmf(requestData: SipSendDtmfRequest, requestMetadata?: GrpcMetadata): Observable<SipStatus>;
  static ɵfac: i0.ɵɵFactoryDeclaration<SipClient, [{
    optional: true;
  }, null, null]>;
  static ɵprov: i0.ɵɵInjectableDeclaration<any>;
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
export type TokenResult = string | null | Promise<string | null> | Observable<string | null>;
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
export interface TokenProvider {
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
export declare const TOKEN_PROVIDER: InjectionToken<TokenProvider>;
/**
 * The HTTP / gRPC header under which the bearer credential is attached.
 *
 * Canonical `Authorization` casing: gRPC-web metadata keys are case-insensitive
 * and the HTTP/2 transport lower-cases header names on the wire, but the ONDEWO
 * SDKs standardize on the capitalized `Authorization` key in source.
 */
export declare const AUTHORIZATION_HEADER: string;
/** The credential scheme prefix prepended to the raw access token. */
export declare const BEARER_PREFIX: string;
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
export declare function resolveToken(result: TokenResult): Observable<string | null>;
/**
 * Build the `Authorization` header value for a resolved token, or `null` when
 * the token is absent.
 *
 * @param token a usable token, or `null`.
 * @returns the `"Bearer <token>"` string, or `null` when there is no token.
 */
export declare function buildBearerValue(token: string | null): string | null;
/**
 * Convenience wrapper: emit the ready-to-use `Authorization` header value, or
 * `null` when no token is available.
 *
 * @param result the raw value returned by `TokenProvider.getToken()`.
 * @returns an observable emitting the bearer header value, or `null`.
 */
export declare function resolveBearerValue(result: TokenResult): Observable<string | null>;
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
export declare function authHttpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>;
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
export declare class AuthGrpcInterceptor implements GrpcInterceptor {
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
  intercept<Q extends GrpcMessage, S extends GrpcMessage>(request: GrpcRequest<Q, S>, next: GrpcHandler): Observable<GrpcEvent<S>>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AuthGrpcInterceptor, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<any>;
}
/**
 * Seconds before `expires_at` at which the access token is refreshed (spec `EXPIRY_LEEWAY`). Covers
 * clock skew and the round trip to Keycloak. Identical in every ONDEWO client SDK.
 */
export declare const REFRESH_SKEW_IN_S: number;
/** Floor (seconds) of any background wait, so an `expires_in` of 0 cannot spin a hot loop. */
export declare const MIN_REFRESH_DELAY_IN_S: number;
/**
 * First retry delay (seconds) after a FAILED refresh. Far above {@link MIN_REFRESH_DELAY_IN_S} on
 * purpose: ondewo runs one client per call container, so clients that fail together would otherwise
 * poll a shared realm at 1 Hz, together, for the whole outage.
 */
export declare const REFRESH_RETRY_BASE_DELAY_IN_S: number;
/** Ceiling (seconds) of the failure backoff: a persistent outage is retried at most this often. */
export declare const REFRESH_RETRY_MAX_DELAY_IN_S: number;
/** Exponent cap so `2 ** n` cannot grow without bound; `5 * 2^6 = 320` already exceeds the ceiling. */
export declare const MAX_REFRESH_RETRY_EXPONENT: number;
/** Timeout (seconds) of one whole token-endpoint call. Must stay below {@link REFRESH_SKEW_IN_S}. */
export declare const HTTP_TIMEOUT_IN_S: number;
/** An error body quoted into an error message is truncated to this many characters. */
export declare const MAX_ERROR_BODY_CHARS: number;
/** How a non-empty secret is rendered by every string rendering of a configuration. */
export declare const REDACTED: string;
/** The timing constants of the token session, overridable (shrinkable) by tests. */
export interface KeycloakTimings {
  /** See {@link REFRESH_SKEW_IN_S}. */
  expiryLeewayInS: number;
  /** See {@link MIN_REFRESH_DELAY_IN_S}. */
  minRefreshDelayInS: number;
  /** See {@link REFRESH_RETRY_BASE_DELAY_IN_S}. */
  retryBaseDelayInS: number;
  /** See {@link REFRESH_RETRY_MAX_DELAY_IN_S}. */
  retryMaxDelayInS: number;
  /** See {@link MAX_REFRESH_RETRY_EXPONENT}. */
  maxRetryExponent: number;
  /** See {@link HTTP_TIMEOUT_IN_S}. */
  httpTimeoutInS: number;
  /** See {@link MAX_ERROR_BODY_CHARS}. */
  maxErrorBodyChars: number;
}
/** The production timings: exactly the constants above. */
export declare const DEFAULT_KEYCLOAK_TIMINGS: Readonly<KeycloakTimings>;
/**
 * The one error type of every Keycloak failure: login, refresh, and the lazy read of an expired
 * token. The original error, when there is one, is kept as `cause`. Its message never carries a
 * credential.
 */
export declare class KeycloakAuthenticationError extends Error {
  /**
   * @param message a human-readable description of the authentication failure.
   * @param options `cause`: the underlying error, kept as the standard `Error.cause`.
   */
  constructor(message: string, options?: ErrorOptions);
}
/**
 * Raised by a {@link KeycloakTokenTransport} when the token endpoint could not be REACHED (connection
 * refused, DNS, TLS handshake, timeout). The session reports it as "could not reach the token
 * endpoint"; any other error a transport throws is treated as a defect of the transport.
 */
export declare class KeycloakTransportError extends Error {
  /**
   * @param message what failed.
   * @param options `cause`: the underlying network error, kept as the standard `Error.cause`.
   */
  constructor(message: string, options?: ErrorOptions);
}
/** One token-endpoint request handed to a {@link KeycloakTokenTransport}. */
export interface KeycloakTokenRequest {
  /** `<keycloakUrl>/realms/<realm>/protocol/openid-connect/token`. */
  url: string;
  /** The form fields, to be sent `application/x-www-form-urlencoded`. */
  form: Record<string, string>;
  /** Timeout of the whole call (seconds). */
  timeoutInS: number;
  /** Whether to verify the endpoint's TLS certificate (a browser transport cannot honour `false`). */
  verifySsl: boolean;
}
/** The raw HTTP answer of the token endpoint. */
export interface KeycloakTokenHttpResponse {
  /** HTTP status code. */
  status: number;
  /** The raw response body. */
  body: string;
}
/**
 * POST one form to the token endpoint. Resolves with ANY HTTP answer (the session judges the status),
 * rejects with a {@link KeycloakTransportError} when no answer could be obtained.
 */
export type KeycloakTokenTransport = (request: KeycloakTokenRequest) => Promise<KeycloakTokenHttpResponse>;
/** Log sink; levels as in every ONDEWO SDK (WARNING per failed refresh, INFO on recovery). */
export interface KeycloakLogger {
  /** One line per failed refresh. */
  warn(message: string): void;
  /** One line when refreshing recovers. */
  info(message: string): void;
  /** Diagnostic detail only. */
  debug(message: string): void;
}
/** The default {@link KeycloakLogger}: the browser console. */
export declare const CONSOLE_KEYCLOAK_LOGGER: KeycloakLogger;
/** Timer seam of the background refresher. */
export interface KeycloakScheduler {
  /** Arm `fn` to run in `delayInMs`; returns a handle for {@link clearTimeout}. */
  setTimeout(fn: () => void, delayInMs: number): unknown;
  /** Disarm a handle returned by {@link setTimeout}. */
  clearTimeout(handle: unknown): void;
}
/** The default {@link KeycloakScheduler}: the global timers (looked up per call, so fakes apply). */
export declare const GLOBAL_KEYCLOAK_SCHEDULER: KeycloakScheduler;
/** Options of {@link KeycloakTokenSession.create}. `refreshToken` is deliberately the last field. */
export interface KeycloakTokenSessionOptions {
  /** Keycloak base URL, the part before `/realms/<realm>`; trailing `/` characters are stripped. */
  keycloakUrl: string;
  /** Realm, e.g. `ondewo-ccai-platform`. */
  realm: string;
  /** PUBLIC SDK client id; no client secret exists and none is ever sent. */
  clientId: string;
  /** Technical user of the password grant. */
  username?: string;
  /** Technical-user password. SECRET. */
  password?: string;
  /** Bounds auto-refresh, measured from the initial token acquisition; absent = unbounded. */
  tokenExpirationInS?: number | null;
  /** TLS verification of the token-endpoint call only (default `true`). */
  verifySsl?: boolean;
  /** The HTTP exchange with the token endpoint. */
  transport: KeycloakTokenTransport;
  /** MONOTONIC clock in seconds; defaults to `performance.now() / 1000`. */
  timeFn?: () => number;
  /** [0,1] jitter source of the failure backoff; defaults to `Math.random`. */
  randomFn?: () => number;
  /** Timer seam of the background refresher. */
  scheduler?: KeycloakScheduler;
  /** Log sink; defaults to the console. */
  logger?: KeycloakLogger;
  /** `false` skips the background refresher (test seam); default `true`. */
  startBackgroundRefresh?: boolean;
  /** Overrides of {@link DEFAULT_KEYCLOAK_TIMINGS} (test seam). */
  timings?: Partial<KeycloakTimings>;
  /** A handed-off Keycloak OFFLINE refresh token used instead of the password. SECRET. */
  refreshToken?: string;
}
/** Options of {@link KeycloakTokenSession.getAccessToken}. */
export interface KeycloakAccessTokenOptions {
  /**
   * Refresh even when the token still looks comfortably valid (e.g. after the server answered
   * `UNAUTHENTICATED`). A running backoff and the `tokenExpirationInS` deadline still apply.
   */
  force?: boolean;
}
/**
 * Full-jitter backoff delay (seconds) after `consecutiveFailures` failed refreshes: uniform in
 * `[base, ceiling]`, the ceiling doubling per failure up to the maximum.
 *
 * @param consecutiveFailures how many refreshes failed in a row (values below 1 count as 1).
 * @param randomFn jitter source; its value is clamped to [0, 1].
 * @param timings the timing constants to use.
 * @returns the delay in seconds.
 */
export declare function backoffDelayInS(consecutiveFailures: number, randomFn: () => number, timings?: Readonly<KeycloakTimings>): number;
/**
 * @param value a secret, possibly empty.
 * @returns {@link REDACTED} for a non-empty secret, the empty string otherwise.
 */
export declare function redactSecret(value: string | undefined | null): string;
/**
 * The fields that identify one credential set, in the order the shared-session key hashes them.
 */
export interface KeycloakCredentialFields {
  /** Keycloak base URL. */
  keycloakUrl: string;
  /** Realm. */
  realm: string;
  /** Public client id. */
  clientId: string;
  /** Technical user. */
  username?: string;
  /** Password. */
  password?: string;
  /** Auto-refresh bound. */
  tokenExpirationInS?: number | null;
  /** TLS verification flag. */
  verifySsl?: boolean;
  /** Offline refresh token. */
  refreshToken?: string;
}
/**
 * Key of the shared-session registry: SHA-256 hex of the credential fields joined with NUL, in the
 * order of every ONDEWO SDK. Never an object identity, and it holds no secret substring.
 *
 * @param fields the credential set.
 * @returns 64 hex characters.
 */
export declare function keycloakSessionRegistryKey(fields: KeycloakCredentialFields): string;
/**
 * One Keycloak login and the access token it keeps fresh: the framework-free core of
 * `KeycloakTokenProvider`, behaving exactly like the token provider of every other ONDEWO SDK.
 *
 * - Start-up ({@link create}): ONE refresh grant with a handed-off offline token, or else ONE password
 *   grant. A refused offline token is never answered with a password login.
 * - Lazy path ({@link getAccessToken} / {@link authorizationMetadata}): inside {@link REFRESH_SKEW_IN_S}
 *   of expiry one refresh grant is sent, shared by every concurrent caller; while it fails, the
 *   still-valid token keeps being served and the jittered backoff decides when the next request may
 *   go out. Only an EXPIRED token whose refresh fails raises.
 * - Background: a timer refreshes ahead of expiry; no failure ever ends it, it backs off instead.
 *   It ends on {@link stop} or once `tokenExpirationInS` has elapsed.
 */
export declare class KeycloakTokenSession {
  /** Keycloak base URL without trailing `/`. */
  readonly keycloakUrl: string;
  /** Realm. */
  readonly realm: string;
  /** Public client id. */
  readonly clientId: string;
  /** Technical user. */
  readonly username: string;
  /** Auto-refresh bound in seconds, or `null`. */
  readonly tokenExpirationInS: number | null;
  /** TLS verification flag of the token-endpoint call. */
  readonly verifySsl: boolean;
  /** Password; never rendered. */
  private readonly password;
  /** The offline token handed in at start-up; never rendered. */
  private readonly configuredRefreshToken;
  /** Token endpoint URL. */
  private readonly tokenEndpoint;
  /** HTTP exchange. */
  private readonly transport;
  /** Monotonic clock (seconds). */
  private readonly timeFn;
  /** Backoff jitter. */
  private readonly randomFn;
  /** Timer seam. */
  private readonly scheduler;
  /** Log sink. */
  private readonly logger;
  /** Timing constants. */
  private readonly timings;
  /** The current access token. */
  private currentAccessToken;
  /** The current refresh token (rotated by Keycloak, kept when a response carries none). */
  private currentRefreshToken;
  /** Monotonic second at which the access token lapses. */
  private expiresAt;
  /** Monotonic second after which auto-refresh stops, or `null`. */
  private loginDeadline;
  /** Consecutive failed refreshes; shared by the lazy path and the background refresher. */
  private failures;
  /** No refresh request is sent before this monotonic second (0 = no backoff running). */
  private nextAttemptAt;
  /** The refresh attempt in flight, shared by every caller. */
  private inFlight;
  /** The armed background timer handle. */
  private timer;
  /** Whether a background timer is armed. */
  private timerArmed;
  /** Whether the background refresher has ended. */
  private backgroundStopped;
  /** Whether {@link stop} ran. */
  private stopCalled;
  /**
   * @param options the session options.
   */
  private constructor();
  /**
   * Acquire the first token and start the background refresher.
   *
   * @param options the session options.
   * @returns the started session.
   * @throws KeycloakAuthenticationError when the initial acquisition fails (nothing is retried and
   *   no refresher is started).
   */
  static create(options: KeycloakTokenSessionOptions): Promise<KeycloakTokenSession>;
  /** @returns the current access token as stored, without any refresh decision. */
  get accessToken(): string;
  /** @returns the monotonic second at which the current access token lapses. */
  get accessTokenExpiresAt(): number;
  /** @returns the monotonic second after which auto-refresh stops, or `null`. */
  get autoRefreshDeadline(): number | null;
  /** @returns how many refreshes have failed in a row. */
  get consecutiveFailures(): number;
  /** @returns the monotonic second before which no refresh request is sent (0 = none pending). */
  get nextRefreshAttemptAt(): number;
  /** @returns whether the background refresher is still running. */
  get backgroundRefreshActive(): boolean;
  /** @returns whether {@link stop} was called. */
  get closed(): boolean;
  /**
   * The access token if it may be served WITHOUT a refresh decision that could send a request:
   * comfortably valid, or past the auto-refresh deadline. Lets an interceptor stay synchronous.
   *
   * @returns the token, or `null` when the caller must go through {@link getAccessToken}.
   */
  peekAccessToken(): string | null;
  /**
   * The access token to send right now, refreshing first when it is inside the leeway.
   *
   * @param options `force`: refresh even when the token still looks comfortably valid.
   * @returns the access token.
   * @throws KeycloakAuthenticationError when the token has expired and cannot be refreshed.
   */
  getAccessToken(options?: KeycloakAccessTokenOptions): Promise<string>;
  /**
   * The gRPC metadata entry to attach to an RPC.
   *
   * @returns `["authorization", "Bearer <token>"]`.
   * @throws KeycloakAuthenticationError when the token has expired and cannot be refreshed.
   */
  authorizationMetadata(): Promise<[string, string]>;
  /**
   * Stop the background refresher, interrupting a pending wait (a backoff wait included) so no
   * further request is sent. Idempotent and safe from any state, also from inside a refresh. The lazy
   * path keeps working afterwards.
   */
  stop(): void;
  /** Alias of {@link stop}. */
  close(): void;
  /** @returns the configuration with every non-empty secret rendered as {@link REDACTED}. */
  toJSON(): Record<string, unknown>;
  /** @returns a redacted rendering of the configuration. */
  toString(): string;
  /** P1-P4: one refresh grant with a handed-off token, else one password grant; then the deadline. */
  private acquireInitialToken;
  /**
   * The refresh decision shared by the lazy path and the background refresher (R1-R6). Concurrent
   * callers share one in-flight attempt.
   *
   * @param force skip the "comfortably valid" short-cut.
   * @throws KeycloakAuthenticationError when the token has expired and cannot be refreshed.
   */
  private refreshIfWithinWindow;
  /**
   * Count a failed refresh, arm the backoff from NOW (the moment it is recorded) and warn once.
   *
   * @param error the failure.
   */
  private recordFailure;
  /** Reset the backoff after a successful refresh, with one INFO line if it had been failing. */
  private recordSuccess;
  /** Arm the next background refresh per the loop of every ONDEWO SDK. */
  private scheduleNextBackgroundRefresh;
  /** Disarm the background timer, if armed. */
  private disarmTimer;
  /** One password (ROPC) grant: exactly the five fields of every ONDEWO SDK. */
  private passwordGrant;
  /** One refresh grant: exactly the three fields of every ONDEWO SDK. Never a password. */
  private refreshGrant;
  /**
   * POST one form and return the JSON object it answered with (E1-E4).
   *
   * @param form the form fields.
   * @param action `login` or `refresh`, for the error messages.
   * @returns the parsed JSON object.
   * @throws KeycloakAuthenticationError on every failure; a non-transport error of the transport
   *   itself is passed through for the caller to wrap.
   */
  private postTokenRequest;
  /**
   * Validate a token response completely, then adopt it (S1-S4): a malformed response changes nothing.
   *
   * @param payload the parsed token response.
   * @throws KeycloakAuthenticationError on a missing access token or a non-numeric `expires_in`.
   */
  private storeTokens;
}
/** A counted hold on a shared {@link KeycloakTokenSession}. */
export interface KeycloakTokenSessionLease {
  /** The shared session. */
  readonly session: KeycloakTokenSession;
  /** Give the hold back; the last release stops the session. Idempotent. */
  release(): void;
}
/**
 * Hold the ONE session of a credential set, starting it when none is live: every caller with the
 * same credentials and scope shares one login and one refresher. Concurrent first callers share one
 * start-up; a failed start-up is not cached; a stopped session is never handed out again.
 *
 * @param options the session options.
 * @param scope what the session is shared within (default: the transport), e.g. one Angular
 *   `HttpClient`, so a session never sends through another application's HTTP stack.
 * @returns a lease on the session; release it when done.
 * @throws KeycloakAuthenticationError when the start-up fails.
 */
export declare function acquireKeycloakTokenSession(options: KeycloakTokenSessionOptions, scope?: object): Promise<KeycloakTokenSessionLease>;
/** Options accepted by {@link KeycloakTokenProvider.ensureFreshToken}. */
export interface EnsureFreshTokenOptions {
  /**
   * Renew even when the cached access token still looks valid.
   *
   * Set this after the server has rejected a request with `UNAUTHENTICATED`: the
   * token may have been revoked, or the local clock may be ahead of Keycloak's,
   * in which case the cached expiry cannot be trusted. A running failure backoff
   * still applies, so a forced renewal never hammers an unavailable Keycloak.
   */
  force?: boolean;
}
/**
 * Runtime configuration for {@link KeycloakTokenProvider}.
 *
 * Authentication is performed against the *public* SDK Keycloak client (no
 * `client_secret` is ever sent). Supply **either** a long-lived offline
 * refresh token (`refreshToken`) **or** a username + password pair for a
 * one-time Resource-Owner-Password-Credentials (ROPC) login — the technical
 * user must be 2FA-exempt for the ROPC grant to succeed.
 *
 * `keycloakUrl`, `realm` and `clientId` are all-or-nothing: all three empty
 * means "no Keycloak" (no login, no `authorization` metadata); setting only
 * some of them is rejected.
 */
export interface KeycloakTokenProviderConfig {
  /** Base Keycloak URL, e.g. `https://auth.example.com/auth` (trailing slash tolerated). */
  keycloakUrl: string;
  /** Realm name, e.g. `ondewo-ccai-platform`. */
  realm: string;
  /** Public SDK client id, e.g. `ondewo-nlu-cai-sdk-public` (no `client_secret`). */
  clientId: string;
  /**
   * Deprecated alias of {@link refreshToken}, used only when `refreshToken` is empty.
   *
   * @deprecated use `refreshToken`.
   */
  offlineToken?: string;
  /** Technical-user email / username for the ROPC grant (not needed with a refresh token). */
  username?: string;
  /** Technical-user password for the ROPC grant. Never sent when a refresh token is configured. */
  password?: string;
  /**
   * Optional cap (seconds) on how long the auto-refresh runs after the
   * first login. Once it elapses no refresh is sent any more and the access
   * token is allowed to lapse. Omit to keep refreshing until the offline
   * session itself expires.
   */
  tokenExpirationInS?: number;
  /**
   * Whether to verify the Keycloak server's TLS certificate on the
   * token-endpoint call. Defaults to `true` (secure).
   *
   * NO-OP IN THIS ANGULAR/BROWSER CLIENT. The token request is made with
   * Angular's `HttpClient` (an XHR/fetch call), and in a browser the TLS
   * handshake is owned by the user agent — there is no `https.Agent`, undici
   * dispatcher, or `rejectUnauthorized` hook that app code can reach. The value
   * is accepted for cross-SDK config parity (it is part of the shared-login key)
   * but has no effect on the outgoing request here. For a self-signed
   * Keycloak/Envoy endpoint, trust the certificate at the browser/OS level.
   */
  keycloakVerifySsl?: boolean;
  /**
   * Optional [0,1] random source for the failure-backoff jitter; defaults to
   * `Math.random`. Tests inject a constant to make the retry delay exact.
   */
  randomFraction?: () => number;
  /**
   * Optional log sink for the refresh WARNING / recovery INFO lines; defaults to
   * the console. No credential ever reaches it.
   */
  logger?: KeycloakLogger;
  /**
   * A handed-off Keycloak OFFLINE refresh token. When set, start-up is ONE
   * `refresh_token` grant with it and no password grant is ever sent, not even
   * as a fallback when the token is refused. Takes precedence over
   * `username` / `password`.
   */
  refreshToken?: string;
}
/**
 * DI token under which the consuming application supplies the
 * {@link KeycloakTokenProviderConfig} for {@link KeycloakTokenProvider}.
 *
 * Example:
 *
 * ```ts
 * providers: [
 *   {
 *     provide: KEYCLOAK_TOKEN_PROVIDER_CONFIG,
 *     useValue: {
 *       keycloakUrl: "https://auth.example.com/auth",
 *       realm: "ondewo-ccai-platform",
 *       clientId: "ondewo-nlu-cai-sdk-public",
 *       refreshToken: "<offline token>", // or: username + password
 *     } satisfies KeycloakTokenProviderConfig,
 *   },
 *   provideOndewoSipAuth(KeycloakTokenProvider),
 * ]
 * ```
 */
export declare const KEYCLOAK_TOKEN_PROVIDER_CONFIG: InjectionToken<KeycloakTokenProviderConfig>;
/**
 * Concrete, ready-to-use {@link TokenProvider} that logs in once against the
 * public Keycloak SDK client and keeps the access token fresh, behaving exactly
 * like the token provider of every other ONDEWO SDK (see {@link KeycloakTokenSession}):
 *
 * 1. **Start-up once** — ONE `refresh_token` grant with a configured
 *    `refreshToken`, or else ONE `grant_type=password` login with
 *    `scope=offline_access`. A refused refresh token is never answered with a
 *    password login.
 * 2. **Refresh ahead of expiry** — a background timer refreshes
 *    {@link REFRESH_SKEW_IN_S} before the token lapses; a failed refresh is
 *    retried with a jittered backoff (5 s doubling to 300 s) and never ends the
 *    loop. The optional `tokenExpirationInS` bounds it.
 * 3. **Serve the current token** — {@link getToken} answers synchronously while
 *    the token is comfortably valid; inside the leeway it returns a promise that
 *    runs one shared refresh, and keeps serving the still-valid token while that
 *    refresh fails. Only an expired token that cannot be refreshed rejects, with
 *    a {@link KeycloakAuthenticationError}.
 *
 * Providers with the same credentials on the same `HttpClient` share one login.
 *
 * Register it through `provideOndewoSipAuth` after supplying a
 * {@link KEYCLOAK_TOKEN_PROVIDER_CONFIG}. The first login is kicked off on
 * construction; call {@link whenReady} to await it explicitly (e.g. in an
 * `APP_INITIALIZER`).
 */
export declare class KeycloakTokenProvider implements TokenProvider, OnDestroy {
  /** Angular HTTP client used for the token-endpoint calls (and the scope of the shared login). */
  private readonly http;
  /** The Angular zone; the background refresh timer is armed outside it. */
  private readonly zone;
  /**
   * The timers of the background refresh, armed outside Angular so the recurring timer does not
   * keep the zone unstable (which would stall `whenStable()`, SSR and hydration) between refreshes.
   */
  private readonly scheduler;
  /**
   * The resolved runtime configuration, or `null` until {@link configure} supplies
   * one. Injected optionally so an application that only learns its credentials at
   * runtime (e.g. an embedded widget reading them from its URL) can register the
   * provider at bootstrap and configure it later.
   */
  private config;
  /**
   * Whether TLS-certificate verification is requested for the token-endpoint
   * call. Defaults to `true`. A NO-OP in this browser client (the browser owns the
   * TLS handshake). See {@link KeycloakTokenProviderConfig.keycloakVerifySsl}.
   */
  private verifySsl;
  /** The started session, or `null` before the first login / without Keycloak. */
  private session;
  /** This provider's hold on the shared session, released on destroy / re-configure. */
  private lease;
  /** The start-up in flight, or `null`. */
  private starting;
  /** Bumped by every start-up, so a superseded start-up drops its session. */
  private generation;
  /** Whether {@link ngOnDestroy} has run. */
  private destroyed;
  /**
   * Promise settled by the *first* login attempt — the one started by the constructor when a
   * config was injected, otherwise the one started by the first {@link configure} call. It
   * resolves when that login succeeds and rejects when it fails; later attempts leave it as-is
   * (a settled promise cannot be re-settled), so callers tracking a re-{@link configure} must
   * await the promise `configure()` returns rather than {@link whenReady}.
   */
  private readonly ready;
  /** Settles {@link ready} on the first successful login. */
  private resolveReady;
  /** Settles {@link ready} when the first login fails. */
  private rejectReady;
  /**
   * The token-endpoint exchange over Angular's `HttpClient`: the raw body is kept as text so the
   * session can judge the status and parse the JSON itself; a status-0 answer, a timeout or any
   * other failure to get an answer becomes a {@link KeycloakTransportError}.
   *
   * @param request the token request.
   * @returns the HTTP answer.
   */
  private readonly transport;
  /**
   * Build the provider and kick off the first login in the background.
   *
   * No network call is awaited here; {@link getToken} returns `null` until the
   * login resolves. Await {@link whenReady} to block until the first token is
   * available.
   */
  constructor();
  /**
   * Supply (or replace) the runtime configuration and log in with it.
   *
   * This is the entry point for credentials that are only known after the
   * application has bootstrapped — an embedded widget that reads a technical
   * user and secret from its own URL, for example. The previous login is
   * released (and stopped when nothing else shares it) before the new one runs,
   * so a provider can be re-pointed at a different technical user without being
   * re-created.
   *
   * When this is the provider's first login attempt it also settles {@link whenReady}; a later
   * re-configure does not, so track those through the promise returned here.
   *
   * @param config the configuration to adopt, replacing any earlier one.
   * @returns a promise that resolves once the login with `config` has completed.
   * @throws KeycloakAuthenticationError when the configuration is invalid or the
   *   login fails (the provider is left unauthenticated; {@link getToken} returns `null`).
   */
  configure(config: KeycloakTokenProviderConfig): Promise<void>;
  /**
   * Return an access token that is safe to send right now, refreshing first when
   * the cached one is within {@link REFRESH_SKEW_IN_S} of lapsing.
   *
   * Concurrent calls share a single refresh, so a burst of requests arriving on
   * an expiring token issues one grant rather than one per request. When the
   * provider holds no session yet (the first login failed), the start-up is run
   * again — with the refresh token when one is configured.
   *
   * @param options renewal options; `force` renews even when the cached token
   *   still looks valid.
   * @returns the usable access token, or `null` when the provider has no
   *   Keycloak config (nothing to renew with).
   * @throws KeycloakAuthenticationError when the token has expired and cannot be
   *   refreshed, or the repeated start-up fails.
   */
  ensureFreshToken(options?: EnsureFreshTokenOptions): Promise<string | null>;
  /**
   * Return the current access token for the auth interceptors.
   *
   * @returns the access token synchronously while it is comfortably valid; a
   *   promise running the shared refresh when it is inside the leeway (rejecting
   *   with a {@link KeycloakAuthenticationError} only when the token has expired
   *   and cannot be refreshed); while the first login is still in flight, a
   *   promise that waits for it and yields its token (`null` when it fails), so
   *   a request issued right after bootstrap is not sent unauthenticated; `null`
   *   without a Keycloak config or after a failed first login.
   */
  getToken(): TokenResult;
  /**
   * The resolved TLS-verification setting from
   * {@link KeycloakTokenProviderConfig.keycloakVerifySsl} (defaults to `true`).
   * A NO-OP in this browser client.
   *
   * @returns `true` when TLS verification is requested (the default), `false`
   *   when the config explicitly opted out (still inert here).
   */
  get keycloakVerifySsl(): boolean;
  /**
   * Await the first login so callers can guarantee a token is present before
   * issuing requests (e.g. from an `APP_INITIALIZER`).
   *
   * @returns a promise that resolves once the first access token is stored, or
   *   rejects with the {@link KeycloakAuthenticationError} from a failed login.
   */
  whenReady(): Promise<void>;
  /**
   * Release this provider's hold on the shared login; the background refresh stops once nothing
   * else shares it. Invoked automatically when the root injector is destroyed. The token stays
   * readable (and is still refreshed on demand) afterwards.
   */
  ngOnDestroy(): void;
  /** @returns the configuration with every non-empty secret rendered as `***REDACTED***`. */
  toJSON(): Record<string, unknown>;
  /** @returns a redacted rendering of the configuration. */
  toString(): string;
  /** Give the shared session back, if held. */
  private releaseLease;
  /**
   * Adopt `config`, drop the previous session and start (or join) the session of `config`.
   *
   * @param config the configuration to adopt.
   * @returns a promise that resolves once the session is started (immediately without Keycloak).
   */
  private start;
  /**
   * Validate `config` and hold the shared session of its credentials.
   *
   * @param config the configuration.
   * @param generation the start-up generation this call belongs to.
   * @returns a promise that resolves once the session is held (or no Keycloak is configured).
   */
  private startSession;
  static ɵfac: i0.ɵɵFactoryDeclaration<KeycloakTokenProvider, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<any>;
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
export declare function provideOndewoSipAuth(tokenProvider: Type<TokenProvider>): EnvironmentProviders;
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
export declare function provideKeycloakTokenProvider(config: KeycloakTokenProviderConfig): EnvironmentProviders;
/**
 * Builds the gRPC-web endpoint URL (`host` setting of `@ngx-grpc/grpc-web-client`) from the
 * same `host` / `port` / `useSecureChannel` fields every ONDEWO SDK takes.
 *
 * In a browser the TLS handshake belongs to the user agent: it verifies the server against
 * its own (OS / browser) trust store and presents a client certificate only from the
 * browser's certificate store. Application code can neither add a CA nor attach a client
 * identity, and a private key must never be shipped to a browser. The certificate fields the
 * other SDKs accept (`grpcCert`, `grpcClientCert`, `grpcClientKey`) are therefore refused
 * here instead of being silently dropped.
 */
/** Connection settings for a gRPC-web endpoint (an Envoy / gRPC-web proxy in front of the ONDEWO server). */
export interface GrpcWebEndpointConfig {
  /**
   * Host name or IP address (`nlu.example.com`, `10.0.0.5`, `::1`, `[::1]`), or a complete base
   * URL with scheme (`https://nlu.example.com:8443/grpc`), which is then used as given.
   */
  host: string;
  /** Port; omit it for the scheme's default port. Must be omitted when `host` is a URL. */
  port?: number | string;
  /** `true` (default): `https://`. `false`: plain `http://`, logged as a warning -- never in production. */
  useSecureChannel?: boolean;
}
/**
 * Certificate / key fields of the other ONDEWO SDKs' configs (camelCase and snake_case) that a
 * browser cannot use. A non-empty value in any of them makes {@link buildGrpcWebHost} throw.
 */
export declare const BROWSER_UNSUPPORTED_TLS_FIELDS: readonly string[];
/** Raised for an unusable {@link GrpcWebEndpointConfig}. The message names fields, never their values. */
export declare class GrpcWebEndpointError extends Error {
  /**
   * @param message a description of the problem that names the offending field.
   */
  constructor(message: string);
}
/**
 * Return the gRPC-web base URL for `config`: `https://host:port` by default, `http://host:port`
 * when `useSecureChannel` is `false` (with a warning naming `host:port`). A bare IPv6 literal is
 * bracketed (`https://[::1]:8443`); a bracketed host or a host that already carries a scheme is
 * left alone.
 *
 * ```ts
 * GrpcWebClientModule.forRoot({ settings: { host: buildGrpcWebHost({ host: "nlu.example.com", port: 443 }) } })
 * ```
 *
 * @param config the endpoint settings.
 * @returns the base URL to pass as the gRPC-web client's `host` setting.
 * @throws GrpcWebEndpointError when a certificate / key field is set, the host is empty or
 *   carries a port, the port is invalid, or an `http://` URL is combined with
 *   `useSecureChannel: true`.
 */
export declare function buildGrpcWebHost(config: GrpcWebEndpointConfig): string;