/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import {
  GrpcMessage,
  RecursivePartial,
  ToProtobufJSONOptions,
  uint8ArrayToBase64
} from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
import * as googleProtobuf000 from '@ngx-grpc/well-known-types';
import * as googleProtobuf001 from '@ngx-grpc/well-known-types';
export enum MediaControlSetting {
  MEDIA_CONTROL_SETTING_UNCHANGED = 0,
  MEDIA_CONTROL_SETTING_ON = 1,
  MEDIA_CONTROL_SETTING_OFF = 2
}
export enum MediaControlOwner {
  MEDIA_CONTROL_OWNER_UNSPECIFIED = 0,
  MEDIA_CONTROL_OWNER_OPERATOR = 1,
  MEDIA_CONTROL_OWNER_PARTICIPANT = 2
}
export enum SipCallAudioMode {
  SIP_CALL_AUDIO_MODE_UNSPECIFIED = 0,
  SIP_CALL_AUDIO_MODE_LISTEN = 1,
  SIP_CALL_AUDIO_MODE_TALK = 2
}
export enum SipCallAudioEndReason {
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
export class SipEndCallRequest implements GrpcMessage {
  static id = 'ondewo.sip.SipEndCallRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipEndCallRequest();
    SipEndCallRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipEndCallRequest) {
    _instance.hardHangup = _instance.hardHangup || false;
    _instance.endReason = _instance.endReason || 0;
    _instance.amdResult = _instance.amdResult || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipEndCallRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.hardHangup = _reader.readBool();
          break;
        case 2:
          _instance.endReason = _reader.readEnum();
          break;
        case 3:
          _instance.amdResult = new AnsweringMachineDetectionResult();
          _reader.readMessage(
            _instance.amdResult,
            AnsweringMachineDetectionResult.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    SipEndCallRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipEndCallRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.hardHangup) {
      _writer.writeBool(1, _instance.hardHangup);
    }
    if (_instance.endReason) {
      _writer.writeEnum(2, _instance.endReason);
    }
    if (_instance.amdResult) {
      _writer.writeMessage(
        3,
        _instance.amdResult as any,
        AnsweringMachineDetectionResult.serializeBinaryToWriter
      );
    }
  }

  private _hardHangup: boolean;
  private _endReason: SipEndCallRequest.EndCallReason;
  private _amdResult?: AnsweringMachineDetectionResult;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipEndCallRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipEndCallRequest.AsObject>) {
    _value = _value || {};
    this.hardHangup = _value.hardHangup;
    this.endReason = _value.endReason;
    this.amdResult = _value.amdResult
      ? new AnsweringMachineDetectionResult(_value.amdResult)
      : undefined;
    SipEndCallRequest.refineValues(this);
  }
  get hardHangup(): boolean {
    return this._hardHangup;
  }
  set hardHangup(value: boolean) {
    this._hardHangup = value;
  }
  get endReason(): SipEndCallRequest.EndCallReason {
    return this._endReason;
  }
  set endReason(value: SipEndCallRequest.EndCallReason) {
    this._endReason = value;
  }
  get amdResult(): AnsweringMachineDetectionResult | undefined {
    return this._amdResult;
  }
  set amdResult(value: AnsweringMachineDetectionResult | undefined) {
    this._amdResult = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipEndCallRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipEndCallRequest.AsObject {
    return {
      hardHangup: this.hardHangup,
      endReason: this.endReason,
      amdResult: this.amdResult ? this.amdResult.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipEndCallRequest.AsProtobufJSON {
    return {
      hardHangup: this.hardHangup,
      endReason:
        SipEndCallRequest.EndCallReason[
          this.endReason === null || this.endReason === undefined
            ? 0
            : this.endReason
        ],
      amdResult: this.amdResult ? this.amdResult.toProtobufJSON(options) : null
    };
  }
}
export module SipEndCallRequest {
  /**
   * Standard JavaScript object representation for SipEndCallRequest
   */
  export interface AsObject {
    hardHangup: boolean;
    endReason: SipEndCallRequest.EndCallReason;
    amdResult?: AnsweringMachineDetectionResult.AsObject;
  }

  /**
   * Protobuf JSON representation for SipEndCallRequest
   */
  export interface AsProtobufJSON {
    hardHangup: boolean;
    endReason: string;
    amdResult: AnsweringMachineDetectionResult.AsProtobufJSON | null;
  }
  export enum EndCallReason {
    END_CALL_REASON_UNSPECIFIED = 0,
    ANSWERING_MACHINE = 1,
    ANSWERING_MACHINE_VOICE_MESSAGE_LEFT = 2,
    END_CALL_REASON_TRANSFERRED = 3
  }
}

/**
 * Message implementation for ondewo.sip.SipReportAnsweringMachineDetectedRequest
 */
export class SipReportAnsweringMachineDetectedRequest implements GrpcMessage {
  static id = 'ondewo.sip.SipReportAnsweringMachineDetectedRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipReportAnsweringMachineDetectedRequest();
    SipReportAnsweringMachineDetectedRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipReportAnsweringMachineDetectedRequest) {
    _instance.amdResult = _instance.amdResult || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipReportAnsweringMachineDetectedRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.amdResult = new AnsweringMachineDetectionResult();
          _reader.readMessage(
            _instance.amdResult,
            AnsweringMachineDetectionResult.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    SipReportAnsweringMachineDetectedRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipReportAnsweringMachineDetectedRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.amdResult) {
      _writer.writeMessage(
        1,
        _instance.amdResult as any,
        AnsweringMachineDetectionResult.serializeBinaryToWriter
      );
    }
  }

  private _amdResult?: AnsweringMachineDetectionResult;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipReportAnsweringMachineDetectedRequest to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<SipReportAnsweringMachineDetectedRequest.AsObject>
  ) {
    _value = _value || {};
    this.amdResult = _value.amdResult
      ? new AnsweringMachineDetectionResult(_value.amdResult)
      : undefined;
    SipReportAnsweringMachineDetectedRequest.refineValues(this);
  }
  get amdResult(): AnsweringMachineDetectionResult | undefined {
    return this._amdResult;
  }
  set amdResult(value: AnsweringMachineDetectionResult | undefined) {
    this._amdResult = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipReportAnsweringMachineDetectedRequest.serializeBinaryToWriter(
      this,
      writer
    );
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipReportAnsweringMachineDetectedRequest.AsObject {
    return {
      amdResult: this.amdResult ? this.amdResult.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipReportAnsweringMachineDetectedRequest.AsProtobufJSON {
    return {
      amdResult: this.amdResult ? this.amdResult.toProtobufJSON(options) : null
    };
  }
}
export module SipReportAnsweringMachineDetectedRequest {
  /**
   * Standard JavaScript object representation for SipReportAnsweringMachineDetectedRequest
   */
  export interface AsObject {
    amdResult?: AnsweringMachineDetectionResult.AsObject;
  }

  /**
   * Protobuf JSON representation for SipReportAnsweringMachineDetectedRequest
   */
  export interface AsProtobufJSON {
    amdResult: AnsweringMachineDetectionResult.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for ondewo.sip.AnsweringMachineDetectionResult
 */
export class AnsweringMachineDetectionResult implements GrpcMessage {
  static id = 'ondewo.sip.AnsweringMachineDetectionResult';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AnsweringMachineDetectionResult();
    AnsweringMachineDetectionResult.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AnsweringMachineDetectionResult) {
    _instance.verdict = _instance.verdict || 0;
    _instance.cause = _instance.cause || 0;
    _instance.confidence = _instance.confidence || 0;
    _instance.decisionMs = _instance.decisionMs || 0;
    _instance.ruleId = _instance.ruleId || '';
    _instance.matchedCueIds = _instance.matchedCueIds || [];
    _instance.actionTaken = _instance.actionTaken || 0;
    _instance.callId = _instance.callId || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AnsweringMachineDetectionResult,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.verdict = _reader.readEnum();
          break;
        case 2:
          _instance.cause = _reader.readEnum();
          break;
        case 3:
          _instance.confidence = _reader.readFloat();
          break;
        case 4:
          _instance.decisionMs = _reader.readInt32();
          break;
        case 5:
          _instance.ruleId = _reader.readString();
          break;
        case 6:
          (_instance.matchedCueIds = _instance.matchedCueIds || []).push(
            _reader.readString()
          );
          break;
        case 7:
          _instance.actionTaken = _reader.readEnum();
          break;
        case 8:
          _instance.callId = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    AnsweringMachineDetectionResult.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AnsweringMachineDetectionResult,
    _writer: BinaryWriter
  ) {
    if (_instance.verdict) {
      _writer.writeEnum(1, _instance.verdict);
    }
    if (_instance.cause) {
      _writer.writeEnum(2, _instance.cause);
    }
    if (_instance.confidence) {
      _writer.writeFloat(3, _instance.confidence);
    }
    if (_instance.decisionMs) {
      _writer.writeInt32(4, _instance.decisionMs);
    }
    if (_instance.ruleId) {
      _writer.writeString(5, _instance.ruleId);
    }
    if (_instance.matchedCueIds && _instance.matchedCueIds.length) {
      _writer.writeRepeatedString(6, _instance.matchedCueIds);
    }
    if (_instance.actionTaken) {
      _writer.writeEnum(7, _instance.actionTaken);
    }
    if (_instance.callId) {
      _writer.writeString(8, _instance.callId);
    }
  }

  private _verdict: AnsweringMachineDetectionResult.Verdict;
  private _cause: AnsweringMachineDetectionResult.Cause;
  private _confidence: number;
  private _decisionMs: number;
  private _ruleId: string;
  private _matchedCueIds: string[];
  private _actionTaken: AnsweringMachineDetectionResult.ActionTaken;
  private _callId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AnsweringMachineDetectionResult to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<AnsweringMachineDetectionResult.AsObject>
  ) {
    _value = _value || {};
    this.verdict = _value.verdict;
    this.cause = _value.cause;
    this.confidence = _value.confidence;
    this.decisionMs = _value.decisionMs;
    this.ruleId = _value.ruleId;
    this.matchedCueIds = (_value.matchedCueIds || []).slice();
    this.actionTaken = _value.actionTaken;
    this.callId = _value.callId;
    AnsweringMachineDetectionResult.refineValues(this);
  }
  get verdict(): AnsweringMachineDetectionResult.Verdict {
    return this._verdict;
  }
  set verdict(value: AnsweringMachineDetectionResult.Verdict) {
    this._verdict = value;
  }
  get cause(): AnsweringMachineDetectionResult.Cause {
    return this._cause;
  }
  set cause(value: AnsweringMachineDetectionResult.Cause) {
    this._cause = value;
  }
  get confidence(): number {
    return this._confidence;
  }
  set confidence(value: number) {
    this._confidence = value;
  }
  get decisionMs(): number {
    return this._decisionMs;
  }
  set decisionMs(value: number) {
    this._decisionMs = value;
  }
  get ruleId(): string {
    return this._ruleId;
  }
  set ruleId(value: string) {
    this._ruleId = value;
  }
  get matchedCueIds(): string[] {
    return this._matchedCueIds;
  }
  set matchedCueIds(value: string[]) {
    this._matchedCueIds = value;
  }
  get actionTaken(): AnsweringMachineDetectionResult.ActionTaken {
    return this._actionTaken;
  }
  set actionTaken(value: AnsweringMachineDetectionResult.ActionTaken) {
    this._actionTaken = value;
  }
  get callId(): string {
    return this._callId;
  }
  set callId(value: string) {
    this._callId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AnsweringMachineDetectionResult.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AnsweringMachineDetectionResult.AsObject {
    return {
      verdict: this.verdict,
      cause: this.cause,
      confidence: this.confidence,
      decisionMs: this.decisionMs,
      ruleId: this.ruleId,
      matchedCueIds: (this.matchedCueIds || []).slice(),
      actionTaken: this.actionTaken,
      callId: this.callId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AnsweringMachineDetectionResult.AsProtobufJSON {
    return {
      verdict:
        AnsweringMachineDetectionResult.Verdict[
          this.verdict === null || this.verdict === undefined ? 0 : this.verdict
        ],
      cause:
        AnsweringMachineDetectionResult.Cause[
          this.cause === null || this.cause === undefined ? 0 : this.cause
        ],
      confidence: this.confidence,
      decisionMs: this.decisionMs,
      ruleId: this.ruleId,
      matchedCueIds: (this.matchedCueIds || []).slice(),
      actionTaken:
        AnsweringMachineDetectionResult.ActionTaken[
          this.actionTaken === null || this.actionTaken === undefined
            ? 0
            : this.actionTaken
        ],
      callId: this.callId
    };
  }
}
export module AnsweringMachineDetectionResult {
  /**
   * Standard JavaScript object representation for AnsweringMachineDetectionResult
   */
  export interface AsObject {
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
  export interface AsProtobufJSON {
    verdict: string;
    cause: string;
    confidence: number;
    decisionMs: number;
    ruleId: string;
    matchedCueIds: string[];
    actionTaken: string;
    callId: string;
  }
  export enum Verdict {
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
  export enum Cause {
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
  export enum ActionTaken {
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
export class SipStartCallRequest implements GrpcMessage {
  static id = 'ondewo.sip.SipStartCallRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipStartCallRequest();
    SipStartCallRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipStartCallRequest) {
    _instance.calleeId = _instance.calleeId || '';
    _instance.headers = _instance.headers || {};
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipStartCallRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.calleeId = _reader.readString();
          break;
        case 2:
          const msg_2 = {} as any;
          _reader.readMessage(
            msg_2,
            SipStartCallRequest.HeadersEntry.deserializeBinaryFromReader
          );
          _instance.headers = _instance.headers || {};
          _instance.headers[msg_2.key] = msg_2.value;
          break;
        default:
          _reader.skipField();
      }
    }

    SipStartCallRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipStartCallRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.calleeId) {
      _writer.writeString(1, _instance.calleeId);
    }
    if (!!_instance.headers) {
      const keys_2 = Object.keys(_instance.headers as any);

      if (keys_2.length) {
        const repeated_2 = keys_2
          .map(key => ({ key: key, value: (_instance.headers as any)[key] }))
          .reduce((r, v) => [...r, v], [] as any[]);

        _writer.writeRepeatedMessage(
          2,
          repeated_2,
          SipStartCallRequest.HeadersEntry.serializeBinaryToWriter
        );
      }
    }
  }

  private _calleeId: string;
  private _headers: { [prop: string]: string };

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipStartCallRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipStartCallRequest.AsObject>) {
    _value = _value || {};
    this.calleeId = _value.calleeId;
    (this.headers = _value!.headers
      ? Object.keys(_value!.headers).reduce(
          (r, k) => ({ ...r, [k]: _value!.headers![k] }),
          {}
        )
      : {}),
      SipStartCallRequest.refineValues(this);
  }
  get calleeId(): string {
    return this._calleeId;
  }
  set calleeId(value: string) {
    this._calleeId = value;
  }
  get headers(): { [prop: string]: string } {
    return this._headers;
  }
  set headers(value: { [prop: string]: string }) {
    this._headers = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipStartCallRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipStartCallRequest.AsObject {
    return {
      calleeId: this.calleeId,
      headers: this.headers
        ? Object.keys(this.headers).reduce(
            (r, k) => ({ ...r, [k]: this.headers![k] }),
            {}
          )
        : {}
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipStartCallRequest.AsProtobufJSON {
    return {
      calleeId: this.calleeId,
      headers: this.headers
        ? Object.keys(this.headers).reduce(
            (r, k) => ({ ...r, [k]: this.headers![k] }),
            {}
          )
        : {}
    };
  }
}
export module SipStartCallRequest {
  /**
   * Standard JavaScript object representation for SipStartCallRequest
   */
  export interface AsObject {
    calleeId: string;
    headers: { [prop: string]: string };
  }

  /**
   * Protobuf JSON representation for SipStartCallRequest
   */
  export interface AsProtobufJSON {
    calleeId: string;
    headers: { [prop: string]: string };
  }

  /**
   * Message implementation for ondewo.sip.SipStartCallRequest.HeadersEntry
   */
  export class HeadersEntry implements GrpcMessage {
    static id = 'ondewo.sip.SipStartCallRequest.HeadersEntry';

    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource) {
      const instance = new HeadersEntry();
      HeadersEntry.deserializeBinaryFromReader(
        instance,
        new BinaryReader(bytes)
      );
      return instance;
    }

    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: HeadersEntry) {
      _instance.key = _instance.key || '';
      _instance.value = _instance.value || '';
    }

    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(
      _instance: HeadersEntry,
      _reader: BinaryReader
    ) {
      while (_reader.nextField()) {
        if (_reader.isEndGroup()) break;

        switch (_reader.getFieldNumber()) {
          case 1:
            _instance.key = _reader.readString();
            break;
          case 2:
            _instance.value = _reader.readString();
            break;
          default:
            _reader.skipField();
        }
      }

      HeadersEntry.refineValues(_instance);
    }

    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(
      _instance: HeadersEntry,
      _writer: BinaryWriter
    ) {
      if (_instance.key) {
        _writer.writeString(1, _instance.key);
      }
      if (_instance.value) {
        _writer.writeString(2, _instance.value);
      }
    }

    private _key: string;
    private _value: string;

    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of HeadersEntry to deeply clone from
     */
    constructor(_value?: RecursivePartial<HeadersEntry.AsObject>) {
      _value = _value || {};
      this.key = _value.key;
      this.value = _value.value;
      HeadersEntry.refineValues(this);
    }
    get key(): string {
      return this._key;
    }
    set key(value: string) {
      this._key = value;
    }
    get value(): string {
      return this._value;
    }
    set value(value: string) {
      this._value = value;
    }

    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
      const writer = new BinaryWriter();
      HeadersEntry.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    }

    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): HeadersEntry.AsObject {
      return {
        key: this.key,
        value: this.value
      };
    }

    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
      return this.toObject();
    }

    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
      // @ts-ignore
      options?: ToProtobufJSONOptions
    ): HeadersEntry.AsProtobufJSON {
      return {
        key: this.key,
        value: this.value
      };
    }
  }
  export module HeadersEntry {
    /**
     * Standard JavaScript object representation for HeadersEntry
     */
    export interface AsObject {
      key: string;
      value: string;
    }

    /**
     * Protobuf JSON representation for HeadersEntry
     */
    export interface AsProtobufJSON {
      key: string;
      value: string;
    }
  }
}

/**
 * Message implementation for ondewo.sip.SipRegisterAccountRequest
 */
export class SipRegisterAccountRequest implements GrpcMessage {
  static id = 'ondewo.sip.SipRegisterAccountRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipRegisterAccountRequest();
    SipRegisterAccountRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipRegisterAccountRequest) {
    _instance.accountName = _instance.accountName || '';
    _instance.password = _instance.password || '';
    _instance.authUsername = _instance.authUsername || '';
    _instance.outboundProxy = _instance.outboundProxy || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipRegisterAccountRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.accountName = _reader.readString();
          break;
        case 2:
          _instance.password = _reader.readString();
          break;
        case 3:
          _instance.authUsername = _reader.readString();
          break;
        case 4:
          _instance.outboundProxy = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    SipRegisterAccountRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipRegisterAccountRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.accountName) {
      _writer.writeString(1, _instance.accountName);
    }
    if (_instance.password) {
      _writer.writeString(2, _instance.password);
    }
    if (_instance.authUsername) {
      _writer.writeString(3, _instance.authUsername);
    }
    if (_instance.outboundProxy) {
      _writer.writeString(4, _instance.outboundProxy);
    }
  }

  private _accountName: string;
  private _password: string;
  private _authUsername: string;
  private _outboundProxy: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipRegisterAccountRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipRegisterAccountRequest.AsObject>) {
    _value = _value || {};
    this.accountName = _value.accountName;
    this.password = _value.password;
    this.authUsername = _value.authUsername;
    this.outboundProxy = _value.outboundProxy;
    SipRegisterAccountRequest.refineValues(this);
  }
  get accountName(): string {
    return this._accountName;
  }
  set accountName(value: string) {
    this._accountName = value;
  }
  get password(): string {
    return this._password;
  }
  set password(value: string) {
    this._password = value;
  }
  get authUsername(): string {
    return this._authUsername;
  }
  set authUsername(value: string) {
    this._authUsername = value;
  }
  get outboundProxy(): string {
    return this._outboundProxy;
  }
  set outboundProxy(value: string) {
    this._outboundProxy = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipRegisterAccountRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipRegisterAccountRequest.AsObject {
    return {
      accountName: this.accountName,
      password: this.password,
      authUsername: this.authUsername,
      outboundProxy: this.outboundProxy
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipRegisterAccountRequest.AsProtobufJSON {
    return {
      accountName: this.accountName,
      password: this.password,
      authUsername: this.authUsername,
      outboundProxy: this.outboundProxy
    };
  }
}
export module SipRegisterAccountRequest {
  /**
   * Standard JavaScript object representation for SipRegisterAccountRequest
   */
  export interface AsObject {
    accountName: string;
    password: string;
    authUsername: string;
    outboundProxy: string;
  }

  /**
   * Protobuf JSON representation for SipRegisterAccountRequest
   */
  export interface AsProtobufJSON {
    accountName: string;
    password: string;
    authUsername: string;
    outboundProxy: string;
  }
}

/**
 * Message implementation for ondewo.sip.SipStartSessionRequest
 */
export class SipStartSessionRequest implements GrpcMessage {
  static id = 'ondewo.sip.SipStartSessionRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipStartSessionRequest();
    SipStartSessionRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipStartSessionRequest) {
    _instance.accountName = _instance.accountName || '';
    _instance.autoAnswerInterval = _instance.autoAnswerInterval || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipStartSessionRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.accountName = _reader.readString();
          break;
        case 2:
          _instance.autoAnswerInterval = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    SipStartSessionRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipStartSessionRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.accountName) {
      _writer.writeString(1, _instance.accountName);
    }
    if (_instance.autoAnswerInterval) {
      _writer.writeInt32(2, _instance.autoAnswerInterval);
    }
  }

  private _accountName: string;
  private _autoAnswerInterval: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipStartSessionRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipStartSessionRequest.AsObject>) {
    _value = _value || {};
    this.accountName = _value.accountName;
    this.autoAnswerInterval = _value.autoAnswerInterval;
    SipStartSessionRequest.refineValues(this);
  }
  get accountName(): string {
    return this._accountName;
  }
  set accountName(value: string) {
    this._accountName = value;
  }
  get autoAnswerInterval(): number {
    return this._autoAnswerInterval;
  }
  set autoAnswerInterval(value: number) {
    this._autoAnswerInterval = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipStartSessionRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipStartSessionRequest.AsObject {
    return {
      accountName: this.accountName,
      autoAnswerInterval: this.autoAnswerInterval
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipStartSessionRequest.AsProtobufJSON {
    return {
      accountName: this.accountName,
      autoAnswerInterval: this.autoAnswerInterval
    };
  }
}
export module SipStartSessionRequest {
  /**
   * Standard JavaScript object representation for SipStartSessionRequest
   */
  export interface AsObject {
    accountName: string;
    autoAnswerInterval: number;
  }

  /**
   * Protobuf JSON representation for SipStartSessionRequest
   */
  export interface AsProtobufJSON {
    accountName: string;
    autoAnswerInterval: number;
  }
}

/**
 * Message implementation for ondewo.sip.SipTransferCallRequest
 */
export class SipTransferCallRequest implements GrpcMessage {
  static id = 'ondewo.sip.SipTransferCallRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipTransferCallRequest();
    SipTransferCallRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipTransferCallRequest) {
    _instance.transferId = _instance.transferId || '';
    _instance.headers = _instance.headers || {};
    _instance.outcomeTimeoutMs = _instance.outcomeTimeoutMs || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipTransferCallRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.transferId = _reader.readString();
          break;
        case 2:
          const msg_2 = {} as any;
          _reader.readMessage(
            msg_2,
            SipTransferCallRequest.HeadersEntry.deserializeBinaryFromReader
          );
          _instance.headers = _instance.headers || {};
          _instance.headers[msg_2.key] = msg_2.value;
          break;
        case 3:
          _instance.outcomeTimeoutMs = _reader.readUint32();
          break;
        default:
          _reader.skipField();
      }
    }

    SipTransferCallRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipTransferCallRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.transferId) {
      _writer.writeString(1, _instance.transferId);
    }
    if (!!_instance.headers) {
      const keys_2 = Object.keys(_instance.headers as any);

      if (keys_2.length) {
        const repeated_2 = keys_2
          .map(key => ({ key: key, value: (_instance.headers as any)[key] }))
          .reduce((r, v) => [...r, v], [] as any[]);

        _writer.writeRepeatedMessage(
          2,
          repeated_2,
          SipTransferCallRequest.HeadersEntry.serializeBinaryToWriter
        );
      }
    }
    if (_instance.outcomeTimeoutMs) {
      _writer.writeUint32(3, _instance.outcomeTimeoutMs);
    }
  }

  private _transferId: string;
  private _headers: { [prop: string]: string };
  private _outcomeTimeoutMs: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipTransferCallRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipTransferCallRequest.AsObject>) {
    _value = _value || {};
    this.transferId = _value.transferId;
    (this.headers = _value!.headers
      ? Object.keys(_value!.headers).reduce(
          (r, k) => ({ ...r, [k]: _value!.headers![k] }),
          {}
        )
      : {}),
      (this.outcomeTimeoutMs = _value.outcomeTimeoutMs);
    SipTransferCallRequest.refineValues(this);
  }
  get transferId(): string {
    return this._transferId;
  }
  set transferId(value: string) {
    this._transferId = value;
  }
  get headers(): { [prop: string]: string } {
    return this._headers;
  }
  set headers(value: { [prop: string]: string }) {
    this._headers = value;
  }
  get outcomeTimeoutMs(): number {
    return this._outcomeTimeoutMs;
  }
  set outcomeTimeoutMs(value: number) {
    this._outcomeTimeoutMs = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipTransferCallRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipTransferCallRequest.AsObject {
    return {
      transferId: this.transferId,
      headers: this.headers
        ? Object.keys(this.headers).reduce(
            (r, k) => ({ ...r, [k]: this.headers![k] }),
            {}
          )
        : {},
      outcomeTimeoutMs: this.outcomeTimeoutMs
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipTransferCallRequest.AsProtobufJSON {
    return {
      transferId: this.transferId,
      headers: this.headers
        ? Object.keys(this.headers).reduce(
            (r, k) => ({ ...r, [k]: this.headers![k] }),
            {}
          )
        : {},
      outcomeTimeoutMs: this.outcomeTimeoutMs
    };
  }
}
export module SipTransferCallRequest {
  /**
   * Standard JavaScript object representation for SipTransferCallRequest
   */
  export interface AsObject {
    transferId: string;
    headers: { [prop: string]: string };
    outcomeTimeoutMs: number;
  }

  /**
   * Protobuf JSON representation for SipTransferCallRequest
   */
  export interface AsProtobufJSON {
    transferId: string;
    headers: { [prop: string]: string };
    outcomeTimeoutMs: number;
  }

  /**
   * Message implementation for ondewo.sip.SipTransferCallRequest.HeadersEntry
   */
  export class HeadersEntry implements GrpcMessage {
    static id = 'ondewo.sip.SipTransferCallRequest.HeadersEntry';

    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource) {
      const instance = new HeadersEntry();
      HeadersEntry.deserializeBinaryFromReader(
        instance,
        new BinaryReader(bytes)
      );
      return instance;
    }

    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: HeadersEntry) {
      _instance.key = _instance.key || '';
      _instance.value = _instance.value || '';
    }

    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(
      _instance: HeadersEntry,
      _reader: BinaryReader
    ) {
      while (_reader.nextField()) {
        if (_reader.isEndGroup()) break;

        switch (_reader.getFieldNumber()) {
          case 1:
            _instance.key = _reader.readString();
            break;
          case 2:
            _instance.value = _reader.readString();
            break;
          default:
            _reader.skipField();
        }
      }

      HeadersEntry.refineValues(_instance);
    }

    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(
      _instance: HeadersEntry,
      _writer: BinaryWriter
    ) {
      if (_instance.key) {
        _writer.writeString(1, _instance.key);
      }
      if (_instance.value) {
        _writer.writeString(2, _instance.value);
      }
    }

    private _key: string;
    private _value: string;

    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of HeadersEntry to deeply clone from
     */
    constructor(_value?: RecursivePartial<HeadersEntry.AsObject>) {
      _value = _value || {};
      this.key = _value.key;
      this.value = _value.value;
      HeadersEntry.refineValues(this);
    }
    get key(): string {
      return this._key;
    }
    set key(value: string) {
      this._key = value;
    }
    get value(): string {
      return this._value;
    }
    set value(value: string) {
      this._value = value;
    }

    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
      const writer = new BinaryWriter();
      HeadersEntry.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    }

    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): HeadersEntry.AsObject {
      return {
        key: this.key,
        value: this.value
      };
    }

    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
      return this.toObject();
    }

    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
      // @ts-ignore
      options?: ToProtobufJSONOptions
    ): HeadersEntry.AsProtobufJSON {
      return {
        key: this.key,
        value: this.value
      };
    }
  }
  export module HeadersEntry {
    /**
     * Standard JavaScript object representation for HeadersEntry
     */
    export interface AsObject {
      key: string;
      value: string;
    }

    /**
     * Protobuf JSON representation for HeadersEntry
     */
    export interface AsProtobufJSON {
      key: string;
      value: string;
    }
  }
}

/**
 * Message implementation for ondewo.sip.SipStatus
 */
export class SipStatus implements GrpcMessage {
  static id = 'ondewo.sip.SipStatus';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipStatus();
    SipStatus.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipStatus) {
    _instance.accountName = _instance.accountName || '';
    _instance.timestamp = _instance.timestamp || undefined;
    _instance.statusType = _instance.statusType || 0;
    _instance.calleeId = _instance.calleeId || '';
    _instance.transferCallId = _instance.transferCallId || '';
    _instance.headers = _instance.headers || {};
    _instance.description = _instance.description || '';
    _instance.exceptionName = _instance.exceptionName || '';
    _instance.exceptionTraceback = _instance.exceptionTraceback || '';
    _instance.nluSessionName = _instance.nluSessionName || '';
    _instance.amdResult = _instance.amdResult || undefined;
    _instance.callId = _instance.callId || '';
    _instance.botMuted = _instance.botMuted || false;
    _instance.listeningPaused = _instance.listeningPaused || false;
    _instance.callAudioStreams = _instance.callAudioStreams || 0;
    _instance.sipResponseCode = _instance.sipResponseCode || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipStatus,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.accountName = _reader.readString();
          break;
        case 2:
          _instance.timestamp = new googleProtobuf001.Timestamp();
          _reader.readMessage(
            _instance.timestamp,
            googleProtobuf001.Timestamp.deserializeBinaryFromReader
          );
          break;
        case 3:
          _instance.statusType = _reader.readEnum();
          break;
        case 4:
          _instance.calleeId = _reader.readString();
          break;
        case 5:
          _instance.transferCallId = _reader.readString();
          break;
        case 6:
          const msg_6 = {} as any;
          _reader.readMessage(
            msg_6,
            SipStatus.HeadersEntry.deserializeBinaryFromReader
          );
          _instance.headers = _instance.headers || {};
          _instance.headers[msg_6.key] = msg_6.value;
          break;
        case 7:
          _instance.description = _reader.readString();
          break;
        case 8:
          _instance.exceptionName = _reader.readString();
          break;
        case 9:
          _instance.exceptionTraceback = _reader.readString();
          break;
        case 10:
          _instance.nluSessionName = _reader.readString();
          break;
        case 11:
          _instance.amdResult = new AnsweringMachineDetectionResult();
          _reader.readMessage(
            _instance.amdResult,
            AnsweringMachineDetectionResult.deserializeBinaryFromReader
          );
          break;
        case 12:
          _instance.callId = _reader.readString();
          break;
        case 13:
          _instance.botMuted = _reader.readBool();
          break;
        case 14:
          _instance.listeningPaused = _reader.readBool();
          break;
        case 15:
          _instance.callAudioStreams = _reader.readInt32();
          break;
        case 16:
          _instance.sipResponseCode = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    SipStatus.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: SipStatus, _writer: BinaryWriter) {
    if (_instance.accountName) {
      _writer.writeString(1, _instance.accountName);
    }
    if (_instance.timestamp) {
      _writer.writeMessage(
        2,
        _instance.timestamp as any,
        googleProtobuf001.Timestamp.serializeBinaryToWriter
      );
    }
    if (_instance.statusType) {
      _writer.writeEnum(3, _instance.statusType);
    }
    if (_instance.calleeId) {
      _writer.writeString(4, _instance.calleeId);
    }
    if (_instance.transferCallId) {
      _writer.writeString(5, _instance.transferCallId);
    }
    if (!!_instance.headers) {
      const keys_6 = Object.keys(_instance.headers as any);

      if (keys_6.length) {
        const repeated_6 = keys_6
          .map(key => ({ key: key, value: (_instance.headers as any)[key] }))
          .reduce((r, v) => [...r, v], [] as any[]);

        _writer.writeRepeatedMessage(
          6,
          repeated_6,
          SipStatus.HeadersEntry.serializeBinaryToWriter
        );
      }
    }
    if (_instance.description) {
      _writer.writeString(7, _instance.description);
    }
    if (_instance.exceptionName) {
      _writer.writeString(8, _instance.exceptionName);
    }
    if (_instance.exceptionTraceback) {
      _writer.writeString(9, _instance.exceptionTraceback);
    }
    if (_instance.nluSessionName) {
      _writer.writeString(10, _instance.nluSessionName);
    }
    if (_instance.amdResult) {
      _writer.writeMessage(
        11,
        _instance.amdResult as any,
        AnsweringMachineDetectionResult.serializeBinaryToWriter
      );
    }
    if (_instance.callId) {
      _writer.writeString(12, _instance.callId);
    }
    if (_instance.botMuted) {
      _writer.writeBool(13, _instance.botMuted);
    }
    if (_instance.listeningPaused) {
      _writer.writeBool(14, _instance.listeningPaused);
    }
    if (_instance.callAudioStreams) {
      _writer.writeInt32(15, _instance.callAudioStreams);
    }
    if (_instance.sipResponseCode) {
      _writer.writeInt32(16, _instance.sipResponseCode);
    }
  }

  private _accountName: string;
  private _timestamp?: googleProtobuf001.Timestamp;
  private _statusType: SipStatus.StatusType;
  private _calleeId: string;
  private _transferCallId: string;
  private _headers: { [prop: string]: string };
  private _description: string;
  private _exceptionName: string;
  private _exceptionTraceback: string;
  private _nluSessionName: string;
  private _amdResult?: AnsweringMachineDetectionResult;
  private _callId: string;
  private _botMuted: boolean;
  private _listeningPaused: boolean;
  private _callAudioStreams: number;
  private _sipResponseCode: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipStatus to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipStatus.AsObject>) {
    _value = _value || {};
    this.accountName = _value.accountName;
    this.timestamp = _value.timestamp
      ? new googleProtobuf001.Timestamp(_value.timestamp)
      : undefined;
    this.statusType = _value.statusType;
    this.calleeId = _value.calleeId;
    this.transferCallId = _value.transferCallId;
    (this.headers = _value!.headers
      ? Object.keys(_value!.headers).reduce(
          (r, k) => ({ ...r, [k]: _value!.headers![k] }),
          {}
        )
      : {}),
      (this.description = _value.description);
    this.exceptionName = _value.exceptionName;
    this.exceptionTraceback = _value.exceptionTraceback;
    this.nluSessionName = _value.nluSessionName;
    this.amdResult = _value.amdResult
      ? new AnsweringMachineDetectionResult(_value.amdResult)
      : undefined;
    this.callId = _value.callId;
    this.botMuted = _value.botMuted;
    this.listeningPaused = _value.listeningPaused;
    this.callAudioStreams = _value.callAudioStreams;
    this.sipResponseCode = _value.sipResponseCode;
    SipStatus.refineValues(this);
  }
  get accountName(): string {
    return this._accountName;
  }
  set accountName(value: string) {
    this._accountName = value;
  }
  get timestamp(): googleProtobuf001.Timestamp | undefined {
    return this._timestamp;
  }
  set timestamp(value: googleProtobuf001.Timestamp | undefined) {
    this._timestamp = value;
  }
  get statusType(): SipStatus.StatusType {
    return this._statusType;
  }
  set statusType(value: SipStatus.StatusType) {
    this._statusType = value;
  }
  get calleeId(): string {
    return this._calleeId;
  }
  set calleeId(value: string) {
    this._calleeId = value;
  }
  get transferCallId(): string {
    return this._transferCallId;
  }
  set transferCallId(value: string) {
    this._transferCallId = value;
  }
  get headers(): { [prop: string]: string } {
    return this._headers;
  }
  set headers(value: { [prop: string]: string }) {
    this._headers = value;
  }
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }
  get exceptionName(): string {
    return this._exceptionName;
  }
  set exceptionName(value: string) {
    this._exceptionName = value;
  }
  get exceptionTraceback(): string {
    return this._exceptionTraceback;
  }
  set exceptionTraceback(value: string) {
    this._exceptionTraceback = value;
  }
  get nluSessionName(): string {
    return this._nluSessionName;
  }
  set nluSessionName(value: string) {
    this._nluSessionName = value;
  }
  get amdResult(): AnsweringMachineDetectionResult | undefined {
    return this._amdResult;
  }
  set amdResult(value: AnsweringMachineDetectionResult | undefined) {
    this._amdResult = value;
  }
  get callId(): string {
    return this._callId;
  }
  set callId(value: string) {
    this._callId = value;
  }
  get botMuted(): boolean {
    return this._botMuted;
  }
  set botMuted(value: boolean) {
    this._botMuted = value;
  }
  get listeningPaused(): boolean {
    return this._listeningPaused;
  }
  set listeningPaused(value: boolean) {
    this._listeningPaused = value;
  }
  get callAudioStreams(): number {
    return this._callAudioStreams;
  }
  set callAudioStreams(value: number) {
    this._callAudioStreams = value;
  }
  get sipResponseCode(): number {
    return this._sipResponseCode;
  }
  set sipResponseCode(value: number) {
    this._sipResponseCode = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipStatus.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipStatus.AsObject {
    return {
      accountName: this.accountName,
      timestamp: this.timestamp ? this.timestamp.toObject() : undefined,
      statusType: this.statusType,
      calleeId: this.calleeId,
      transferCallId: this.transferCallId,
      headers: this.headers
        ? Object.keys(this.headers).reduce(
            (r, k) => ({ ...r, [k]: this.headers![k] }),
            {}
          )
        : {},
      description: this.description,
      exceptionName: this.exceptionName,
      exceptionTraceback: this.exceptionTraceback,
      nluSessionName: this.nluSessionName,
      amdResult: this.amdResult ? this.amdResult.toObject() : undefined,
      callId: this.callId,
      botMuted: this.botMuted,
      listeningPaused: this.listeningPaused,
      callAudioStreams: this.callAudioStreams,
      sipResponseCode: this.sipResponseCode
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipStatus.AsProtobufJSON {
    return {
      accountName: this.accountName,
      timestamp: this.timestamp ? this.timestamp.toProtobufJSON(options) : null,
      statusType:
        SipStatus.StatusType[
          this.statusType === null || this.statusType === undefined
            ? 0
            : this.statusType
        ],
      calleeId: this.calleeId,
      transferCallId: this.transferCallId,
      headers: this.headers
        ? Object.keys(this.headers).reduce(
            (r, k) => ({ ...r, [k]: this.headers![k] }),
            {}
          )
        : {},
      description: this.description,
      exceptionName: this.exceptionName,
      exceptionTraceback: this.exceptionTraceback,
      nluSessionName: this.nluSessionName,
      amdResult: this.amdResult ? this.amdResult.toProtobufJSON(options) : null,
      callId: this.callId,
      botMuted: this.botMuted,
      listeningPaused: this.listeningPaused,
      callAudioStreams: this.callAudioStreams,
      sipResponseCode: this.sipResponseCode
    };
  }
}
export module SipStatus {
  /**
   * Standard JavaScript object representation for SipStatus
   */
  export interface AsObject {
    accountName: string;
    timestamp?: googleProtobuf001.Timestamp.AsObject;
    statusType: SipStatus.StatusType;
    calleeId: string;
    transferCallId: string;
    headers: { [prop: string]: string };
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
  }

  /**
   * Protobuf JSON representation for SipStatus
   */
  export interface AsProtobufJSON {
    accountName: string;
    timestamp: googleProtobuf001.Timestamp.AsProtobufJSON | null;
    statusType: string;
    calleeId: string;
    transferCallId: string;
    headers: { [prop: string]: string };
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
  }
  export enum StatusType {
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
  export class HeadersEntry implements GrpcMessage {
    static id = 'ondewo.sip.SipStatus.HeadersEntry';

    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource) {
      const instance = new HeadersEntry();
      HeadersEntry.deserializeBinaryFromReader(
        instance,
        new BinaryReader(bytes)
      );
      return instance;
    }

    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: HeadersEntry) {
      _instance.key = _instance.key || '';
      _instance.value = _instance.value || '';
    }

    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(
      _instance: HeadersEntry,
      _reader: BinaryReader
    ) {
      while (_reader.nextField()) {
        if (_reader.isEndGroup()) break;

        switch (_reader.getFieldNumber()) {
          case 1:
            _instance.key = _reader.readString();
            break;
          case 2:
            _instance.value = _reader.readString();
            break;
          default:
            _reader.skipField();
        }
      }

      HeadersEntry.refineValues(_instance);
    }

    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(
      _instance: HeadersEntry,
      _writer: BinaryWriter
    ) {
      if (_instance.key) {
        _writer.writeString(1, _instance.key);
      }
      if (_instance.value) {
        _writer.writeString(2, _instance.value);
      }
    }

    private _key: string;
    private _value: string;

    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of HeadersEntry to deeply clone from
     */
    constructor(_value?: RecursivePartial<HeadersEntry.AsObject>) {
      _value = _value || {};
      this.key = _value.key;
      this.value = _value.value;
      HeadersEntry.refineValues(this);
    }
    get key(): string {
      return this._key;
    }
    set key(value: string) {
      this._key = value;
    }
    get value(): string {
      return this._value;
    }
    set value(value: string) {
      this._value = value;
    }

    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
      const writer = new BinaryWriter();
      HeadersEntry.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    }

    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): HeadersEntry.AsObject {
      return {
        key: this.key,
        value: this.value
      };
    }

    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
      return this.toObject();
    }

    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
      // @ts-ignore
      options?: ToProtobufJSONOptions
    ): HeadersEntry.AsProtobufJSON {
      return {
        key: this.key,
        value: this.value
      };
    }
  }
  export module HeadersEntry {
    /**
     * Standard JavaScript object representation for HeadersEntry
     */
    export interface AsObject {
      key: string;
      value: string;
    }

    /**
     * Protobuf JSON representation for HeadersEntry
     */
    export interface AsProtobufJSON {
      key: string;
      value: string;
    }
  }
}

/**
 * Message implementation for ondewo.sip.SipStatusHistoryResponse
 */
export class SipStatusHistoryResponse implements GrpcMessage {
  static id = 'ondewo.sip.SipStatusHistoryResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipStatusHistoryResponse();
    SipStatusHistoryResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipStatusHistoryResponse) {
    _instance.statusHistory = _instance.statusHistory || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipStatusHistoryResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new SipStatus();
          _reader.readMessage(
            messageInitializer1,
            SipStatus.deserializeBinaryFromReader
          );
          (_instance.statusHistory = _instance.statusHistory || []).push(
            messageInitializer1
          );
          break;
        default:
          _reader.skipField();
      }
    }

    SipStatusHistoryResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipStatusHistoryResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.statusHistory && _instance.statusHistory.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.statusHistory as any,
        SipStatus.serializeBinaryToWriter
      );
    }
  }

  private _statusHistory?: SipStatus[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipStatusHistoryResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipStatusHistoryResponse.AsObject>) {
    _value = _value || {};
    this.statusHistory = (_value.statusHistory || []).map(
      m => new SipStatus(m)
    );
    SipStatusHistoryResponse.refineValues(this);
  }
  get statusHistory(): SipStatus[] | undefined {
    return this._statusHistory;
  }
  set statusHistory(value: SipStatus[] | undefined) {
    this._statusHistory = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipStatusHistoryResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipStatusHistoryResponse.AsObject {
    return {
      statusHistory: (this.statusHistory || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipStatusHistoryResponse.AsProtobufJSON {
    return {
      statusHistory: (this.statusHistory || []).map(m =>
        m.toProtobufJSON(options)
      )
    };
  }
}
export module SipStatusHistoryResponse {
  /**
   * Standard JavaScript object representation for SipStatusHistoryResponse
   */
  export interface AsObject {
    statusHistory?: SipStatus.AsObject[];
  }

  /**
   * Protobuf JSON representation for SipStatusHistoryResponse
   */
  export interface AsProtobufJSON {
    statusHistory: SipStatus.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for ondewo.sip.SipSetCallMediaControlRequest
 */
export class SipSetCallMediaControlRequest implements GrpcMessage {
  static id = 'ondewo.sip.SipSetCallMediaControlRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipSetCallMediaControlRequest();
    SipSetCallMediaControlRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipSetCallMediaControlRequest) {
    _instance.botVoice = _instance.botVoice || 0;
    _instance.botListening = _instance.botListening || 0;
    _instance.owner = _instance.owner || 0;
    _instance.participantsPresent = _instance.participantsPresent || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipSetCallMediaControlRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.botVoice = _reader.readEnum();
          break;
        case 2:
          _instance.botListening = _reader.readEnum();
          break;
        case 3:
          _instance.owner = _reader.readEnum();
          break;
        case 4:
          _instance.participantsPresent = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    SipSetCallMediaControlRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipSetCallMediaControlRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.botVoice) {
      _writer.writeEnum(1, _instance.botVoice);
    }
    if (_instance.botListening) {
      _writer.writeEnum(2, _instance.botListening);
    }
    if (_instance.owner) {
      _writer.writeEnum(3, _instance.owner);
    }
    if (_instance.participantsPresent) {
      _writer.writeBool(4, _instance.participantsPresent);
    }
  }

  private _botVoice: MediaControlSetting;
  private _botListening: MediaControlSetting;
  private _owner: MediaControlOwner;
  private _participantsPresent: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipSetCallMediaControlRequest to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<SipSetCallMediaControlRequest.AsObject>
  ) {
    _value = _value || {};
    this.botVoice = _value.botVoice;
    this.botListening = _value.botListening;
    this.owner = _value.owner;
    this.participantsPresent = _value.participantsPresent;
    SipSetCallMediaControlRequest.refineValues(this);
  }
  get botVoice(): MediaControlSetting {
    return this._botVoice;
  }
  set botVoice(value: MediaControlSetting) {
    this._botVoice = value;
  }
  get botListening(): MediaControlSetting {
    return this._botListening;
  }
  set botListening(value: MediaControlSetting) {
    this._botListening = value;
  }
  get owner(): MediaControlOwner {
    return this._owner;
  }
  set owner(value: MediaControlOwner) {
    this._owner = value;
  }
  get participantsPresent(): boolean {
    return this._participantsPresent;
  }
  set participantsPresent(value: boolean) {
    this._participantsPresent = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipSetCallMediaControlRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipSetCallMediaControlRequest.AsObject {
    return {
      botVoice: this.botVoice,
      botListening: this.botListening,
      owner: this.owner,
      participantsPresent: this.participantsPresent
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipSetCallMediaControlRequest.AsProtobufJSON {
    return {
      botVoice:
        MediaControlSetting[
          this.botVoice === null || this.botVoice === undefined
            ? 0
            : this.botVoice
        ],
      botListening:
        MediaControlSetting[
          this.botListening === null || this.botListening === undefined
            ? 0
            : this.botListening
        ],
      owner:
        MediaControlOwner[
          this.owner === null || this.owner === undefined ? 0 : this.owner
        ],
      participantsPresent: this.participantsPresent
    };
  }
}
export module SipSetCallMediaControlRequest {
  /**
   * Standard JavaScript object representation for SipSetCallMediaControlRequest
   */
  export interface AsObject {
    botVoice: MediaControlSetting;
    botListening: MediaControlSetting;
    owner: MediaControlOwner;
    participantsPresent: boolean;
  }

  /**
   * Protobuf JSON representation for SipSetCallMediaControlRequest
   */
  export interface AsProtobufJSON {
    botVoice: string;
    botListening: string;
    owner: string;
    participantsPresent: boolean;
  }
}

/**
 * Message implementation for ondewo.sip.SipCallAudioConfig
 */
export class SipCallAudioConfig implements GrpcMessage {
  static id = 'ondewo.sip.SipCallAudioConfig';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipCallAudioConfig();
    SipCallAudioConfig.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipCallAudioConfig) {
    _instance.mode = _instance.mode || 0;
    _instance.sampleRateHz = _instance.sampleRateHz || 0;
    _instance.frameMs = _instance.frameMs || 0;
    _instance.takeOver = _instance.takeOver || false;
    _instance.streamId = _instance.streamId || '';
    _instance.maxDurationS = _instance.maxDurationS || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipCallAudioConfig,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.mode = _reader.readEnum();
          break;
        case 2:
          _instance.sampleRateHz = _reader.readInt32();
          break;
        case 3:
          _instance.frameMs = _reader.readInt32();
          break;
        case 4:
          _instance.takeOver = _reader.readBool();
          break;
        case 5:
          _instance.streamId = _reader.readString();
          break;
        case 6:
          _instance.maxDurationS = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    SipCallAudioConfig.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipCallAudioConfig,
    _writer: BinaryWriter
  ) {
    if (_instance.mode) {
      _writer.writeEnum(1, _instance.mode);
    }
    if (_instance.sampleRateHz) {
      _writer.writeInt32(2, _instance.sampleRateHz);
    }
    if (_instance.frameMs) {
      _writer.writeInt32(3, _instance.frameMs);
    }
    if (_instance.takeOver) {
      _writer.writeBool(4, _instance.takeOver);
    }
    if (_instance.streamId) {
      _writer.writeString(5, _instance.streamId);
    }
    if (_instance.maxDurationS) {
      _writer.writeInt32(6, _instance.maxDurationS);
    }
  }

  private _mode: SipCallAudioMode;
  private _sampleRateHz: number;
  private _frameMs: number;
  private _takeOver: boolean;
  private _streamId: string;
  private _maxDurationS: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipCallAudioConfig to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipCallAudioConfig.AsObject>) {
    _value = _value || {};
    this.mode = _value.mode;
    this.sampleRateHz = _value.sampleRateHz;
    this.frameMs = _value.frameMs;
    this.takeOver = _value.takeOver;
    this.streamId = _value.streamId;
    this.maxDurationS = _value.maxDurationS;
    SipCallAudioConfig.refineValues(this);
  }
  get mode(): SipCallAudioMode {
    return this._mode;
  }
  set mode(value: SipCallAudioMode) {
    this._mode = value;
  }
  get sampleRateHz(): number {
    return this._sampleRateHz;
  }
  set sampleRateHz(value: number) {
    this._sampleRateHz = value;
  }
  get frameMs(): number {
    return this._frameMs;
  }
  set frameMs(value: number) {
    this._frameMs = value;
  }
  get takeOver(): boolean {
    return this._takeOver;
  }
  set takeOver(value: boolean) {
    this._takeOver = value;
  }
  get streamId(): string {
    return this._streamId;
  }
  set streamId(value: string) {
    this._streamId = value;
  }
  get maxDurationS(): number {
    return this._maxDurationS;
  }
  set maxDurationS(value: number) {
    this._maxDurationS = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipCallAudioConfig.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipCallAudioConfig.AsObject {
    return {
      mode: this.mode,
      sampleRateHz: this.sampleRateHz,
      frameMs: this.frameMs,
      takeOver: this.takeOver,
      streamId: this.streamId,
      maxDurationS: this.maxDurationS
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipCallAudioConfig.AsProtobufJSON {
    return {
      mode:
        SipCallAudioMode[
          this.mode === null || this.mode === undefined ? 0 : this.mode
        ],
      sampleRateHz: this.sampleRateHz,
      frameMs: this.frameMs,
      takeOver: this.takeOver,
      streamId: this.streamId,
      maxDurationS: this.maxDurationS
    };
  }
}
export module SipCallAudioConfig {
  /**
   * Standard JavaScript object representation for SipCallAudioConfig
   */
  export interface AsObject {
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
  export interface AsProtobufJSON {
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
export class SipCallAudioFrame implements GrpcMessage {
  static id = 'ondewo.sip.SipCallAudioFrame';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipCallAudioFrame();
    SipCallAudioFrame.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipCallAudioFrame) {
    _instance.pcmS16le = _instance.pcmS16le || new Uint8Array();
    _instance.sequence = _instance.sequence || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipCallAudioFrame,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.pcmS16le = _reader.readBytes();
          break;
        case 2:
          _instance.sequence = _reader.readUint64String();
          break;
        default:
          _reader.skipField();
      }
    }

    SipCallAudioFrame.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipCallAudioFrame,
    _writer: BinaryWriter
  ) {
    if (_instance.pcmS16le && _instance.pcmS16le.length) {
      _writer.writeBytes(1, _instance.pcmS16le);
    }
    if (_instance.sequence) {
      _writer.writeUint64String(2, _instance.sequence);
    }
  }

  private _pcmS16le: Uint8Array;
  private _sequence: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipCallAudioFrame to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipCallAudioFrame.AsObject>) {
    _value = _value || {};
    this.pcmS16le = _value.pcmS16le;
    this.sequence = _value.sequence;
    SipCallAudioFrame.refineValues(this);
  }
  get pcmS16le(): Uint8Array {
    return this._pcmS16le;
  }
  set pcmS16le(value: Uint8Array) {
    this._pcmS16le = value;
  }
  get sequence(): string {
    return this._sequence;
  }
  set sequence(value: string) {
    this._sequence = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipCallAudioFrame.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipCallAudioFrame.AsObject {
    return {
      pcmS16le: this.pcmS16le ? this.pcmS16le.subarray(0) : new Uint8Array(),
      sequence: this.sequence
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipCallAudioFrame.AsProtobufJSON {
    return {
      pcmS16le: this.pcmS16le ? uint8ArrayToBase64(this.pcmS16le) : '',
      sequence: this.sequence
    };
  }
}
export module SipCallAudioFrame {
  /**
   * Standard JavaScript object representation for SipCallAudioFrame
   */
  export interface AsObject {
    pcmS16le: Uint8Array;
    sequence: string;
  }

  /**
   * Protobuf JSON representation for SipCallAudioFrame
   */
  export interface AsProtobufJSON {
    pcmS16le: string;
    sequence: string;
  }
}

/**
 * Message implementation for ondewo.sip.SipCallAudioRequest
 */
export class SipCallAudioRequest implements GrpcMessage {
  static id = 'ondewo.sip.SipCallAudioRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipCallAudioRequest();
    SipCallAudioRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipCallAudioRequest) {}

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipCallAudioRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.config = new SipCallAudioConfig();
          _reader.readMessage(
            _instance.config,
            SipCallAudioConfig.deserializeBinaryFromReader
          );
          break;
        case 2:
          _instance.audio = new SipCallAudioFrame();
          _reader.readMessage(
            _instance.audio,
            SipCallAudioFrame.deserializeBinaryFromReader
          );
          break;
        case 3:
          _instance.agentMuted = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    SipCallAudioRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipCallAudioRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.config) {
      _writer.writeMessage(
        1,
        _instance.config as any,
        SipCallAudioConfig.serializeBinaryToWriter
      );
    }
    if (_instance.audio) {
      _writer.writeMessage(
        2,
        _instance.audio as any,
        SipCallAudioFrame.serializeBinaryToWriter
      );
    }
    if (_instance.agentMuted || _instance.agentMuted === false) {
      _writer.writeBool(3, _instance.agentMuted);
    }
  }

  private _config?: SipCallAudioConfig;
  private _audio?: SipCallAudioFrame;
  private _agentMuted: boolean;

  private _request: SipCallAudioRequest.RequestCase =
    SipCallAudioRequest.RequestCase.none;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipCallAudioRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipCallAudioRequest.AsObject>) {
    _value = _value || {};
    this.config = _value.config
      ? new SipCallAudioConfig(_value.config)
      : undefined;
    this.audio = _value.audio ? new SipCallAudioFrame(_value.audio) : undefined;
    this.agentMuted = _value.agentMuted;
    SipCallAudioRequest.refineValues(this);
  }
  get config(): SipCallAudioConfig | undefined {
    return this._config;
  }
  set config(value: SipCallAudioConfig | undefined) {
    if (value !== undefined && value !== null) {
      this._audio = this._agentMuted = undefined;
      this._request = SipCallAudioRequest.RequestCase.config;
    }
    this._config = value;
  }
  get audio(): SipCallAudioFrame | undefined {
    return this._audio;
  }
  set audio(value: SipCallAudioFrame | undefined) {
    if (value !== undefined && value !== null) {
      this._config = this._agentMuted = undefined;
      this._request = SipCallAudioRequest.RequestCase.audio;
    }
    this._audio = value;
  }
  get agentMuted(): boolean {
    return this._agentMuted;
  }
  set agentMuted(value: boolean) {
    if (value !== undefined && value !== null) {
      this._config = this._audio = undefined;
      this._request = SipCallAudioRequest.RequestCase.agentMuted;
    }
    this._agentMuted = value;
  }
  get request() {
    return this._request;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipCallAudioRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipCallAudioRequest.AsObject {
    return {
      config: this.config ? this.config.toObject() : undefined,
      audio: this.audio ? this.audio.toObject() : undefined,
      agentMuted: this.agentMuted
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipCallAudioRequest.AsProtobufJSON {
    return {
      config: this.config ? this.config.toProtobufJSON(options) : null,
      audio: this.audio ? this.audio.toProtobufJSON(options) : null,
      agentMuted: this.agentMuted
    };
  }
}
export module SipCallAudioRequest {
  /**
   * Standard JavaScript object representation for SipCallAudioRequest
   */
  export interface AsObject {
    config?: SipCallAudioConfig.AsObject;
    audio?: SipCallAudioFrame.AsObject;
    agentMuted: boolean;
  }

  /**
   * Protobuf JSON representation for SipCallAudioRequest
   */
  export interface AsProtobufJSON {
    config: SipCallAudioConfig.AsProtobufJSON | null;
    audio: SipCallAudioFrame.AsProtobufJSON | null;
    agentMuted: boolean;
  }
  export enum RequestCase {
    none = 0,
    config = 1,
    audio = 2,
    agentMuted = 3
  }
}

/**
 * Message implementation for ondewo.sip.SipCallAudioStarted
 */
export class SipCallAudioStarted implements GrpcMessage {
  static id = 'ondewo.sip.SipCallAudioStarted';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipCallAudioStarted();
    SipCallAudioStarted.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipCallAudioStarted) {
    _instance.streamId = _instance.streamId || '';
    _instance.sampleRateHz = _instance.sampleRateHz || 0;
    _instance.frameMs = _instance.frameMs || 0;
    _instance.mode = _instance.mode || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipCallAudioStarted,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.streamId = _reader.readString();
          break;
        case 2:
          _instance.sampleRateHz = _reader.readInt32();
          break;
        case 3:
          _instance.frameMs = _reader.readInt32();
          break;
        case 4:
          _instance.mode = _reader.readEnum();
          break;
        default:
          _reader.skipField();
      }
    }

    SipCallAudioStarted.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipCallAudioStarted,
    _writer: BinaryWriter
  ) {
    if (_instance.streamId) {
      _writer.writeString(1, _instance.streamId);
    }
    if (_instance.sampleRateHz) {
      _writer.writeInt32(2, _instance.sampleRateHz);
    }
    if (_instance.frameMs) {
      _writer.writeInt32(3, _instance.frameMs);
    }
    if (_instance.mode) {
      _writer.writeEnum(4, _instance.mode);
    }
  }

  private _streamId: string;
  private _sampleRateHz: number;
  private _frameMs: number;
  private _mode: SipCallAudioMode;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipCallAudioStarted to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipCallAudioStarted.AsObject>) {
    _value = _value || {};
    this.streamId = _value.streamId;
    this.sampleRateHz = _value.sampleRateHz;
    this.frameMs = _value.frameMs;
    this.mode = _value.mode;
    SipCallAudioStarted.refineValues(this);
  }
  get streamId(): string {
    return this._streamId;
  }
  set streamId(value: string) {
    this._streamId = value;
  }
  get sampleRateHz(): number {
    return this._sampleRateHz;
  }
  set sampleRateHz(value: number) {
    this._sampleRateHz = value;
  }
  get frameMs(): number {
    return this._frameMs;
  }
  set frameMs(value: number) {
    this._frameMs = value;
  }
  get mode(): SipCallAudioMode {
    return this._mode;
  }
  set mode(value: SipCallAudioMode) {
    this._mode = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipCallAudioStarted.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipCallAudioStarted.AsObject {
    return {
      streamId: this.streamId,
      sampleRateHz: this.sampleRateHz,
      frameMs: this.frameMs,
      mode: this.mode
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipCallAudioStarted.AsProtobufJSON {
    return {
      streamId: this.streamId,
      sampleRateHz: this.sampleRateHz,
      frameMs: this.frameMs,
      mode:
        SipCallAudioMode[
          this.mode === null || this.mode === undefined ? 0 : this.mode
        ]
    };
  }
}
export module SipCallAudioStarted {
  /**
   * Standard JavaScript object representation for SipCallAudioStarted
   */
  export interface AsObject {
    streamId: string;
    sampleRateHz: number;
    frameMs: number;
    mode: SipCallAudioMode;
  }

  /**
   * Protobuf JSON representation for SipCallAudioStarted
   */
  export interface AsProtobufJSON {
    streamId: string;
    sampleRateHz: number;
    frameMs: number;
    mode: string;
  }
}

/**
 * Message implementation for ondewo.sip.SipCallAudioStats
 */
export class SipCallAudioStats implements GrpcMessage {
  static id = 'ondewo.sip.SipCallAudioStats';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipCallAudioStats();
    SipCallAudioStats.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipCallAudioStats) {
    _instance.framesSent = _instance.framesSent || '0';
    _instance.framesDropped = _instance.framesDropped || '0';
    _instance.framesReceived = _instance.framesReceived || '0';
    _instance.underruns = _instance.underruns || '0';
    _instance.framesDiscarded = _instance.framesDiscarded || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipCallAudioStats,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.framesSent = _reader.readUint64String();
          break;
        case 2:
          _instance.framesDropped = _reader.readUint64String();
          break;
        case 3:
          _instance.framesReceived = _reader.readUint64String();
          break;
        case 4:
          _instance.underruns = _reader.readUint64String();
          break;
        case 5:
          _instance.framesDiscarded = _reader.readUint64String();
          break;
        default:
          _reader.skipField();
      }
    }

    SipCallAudioStats.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipCallAudioStats,
    _writer: BinaryWriter
  ) {
    if (_instance.framesSent) {
      _writer.writeUint64String(1, _instance.framesSent);
    }
    if (_instance.framesDropped) {
      _writer.writeUint64String(2, _instance.framesDropped);
    }
    if (_instance.framesReceived) {
      _writer.writeUint64String(3, _instance.framesReceived);
    }
    if (_instance.underruns) {
      _writer.writeUint64String(4, _instance.underruns);
    }
    if (_instance.framesDiscarded) {
      _writer.writeUint64String(5, _instance.framesDiscarded);
    }
  }

  private _framesSent: string;
  private _framesDropped: string;
  private _framesReceived: string;
  private _underruns: string;
  private _framesDiscarded: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipCallAudioStats to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipCallAudioStats.AsObject>) {
    _value = _value || {};
    this.framesSent = _value.framesSent;
    this.framesDropped = _value.framesDropped;
    this.framesReceived = _value.framesReceived;
    this.underruns = _value.underruns;
    this.framesDiscarded = _value.framesDiscarded;
    SipCallAudioStats.refineValues(this);
  }
  get framesSent(): string {
    return this._framesSent;
  }
  set framesSent(value: string) {
    this._framesSent = value;
  }
  get framesDropped(): string {
    return this._framesDropped;
  }
  set framesDropped(value: string) {
    this._framesDropped = value;
  }
  get framesReceived(): string {
    return this._framesReceived;
  }
  set framesReceived(value: string) {
    this._framesReceived = value;
  }
  get underruns(): string {
    return this._underruns;
  }
  set underruns(value: string) {
    this._underruns = value;
  }
  get framesDiscarded(): string {
    return this._framesDiscarded;
  }
  set framesDiscarded(value: string) {
    this._framesDiscarded = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipCallAudioStats.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipCallAudioStats.AsObject {
    return {
      framesSent: this.framesSent,
      framesDropped: this.framesDropped,
      framesReceived: this.framesReceived,
      underruns: this.underruns,
      framesDiscarded: this.framesDiscarded
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipCallAudioStats.AsProtobufJSON {
    return {
      framesSent: this.framesSent,
      framesDropped: this.framesDropped,
      framesReceived: this.framesReceived,
      underruns: this.underruns,
      framesDiscarded: this.framesDiscarded
    };
  }
}
export module SipCallAudioStats {
  /**
   * Standard JavaScript object representation for SipCallAudioStats
   */
  export interface AsObject {
    framesSent: string;
    framesDropped: string;
    framesReceived: string;
    underruns: string;
    framesDiscarded: string;
  }

  /**
   * Protobuf JSON representation for SipCallAudioStats
   */
  export interface AsProtobufJSON {
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
export class SipCallAudioEnded implements GrpcMessage {
  static id = 'ondewo.sip.SipCallAudioEnded';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipCallAudioEnded();
    SipCallAudioEnded.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipCallAudioEnded) {
    _instance.reason = _instance.reason || 0;
    _instance.detail = _instance.detail || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipCallAudioEnded,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.reason = _reader.readEnum();
          break;
        case 2:
          _instance.detail = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    SipCallAudioEnded.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipCallAudioEnded,
    _writer: BinaryWriter
  ) {
    if (_instance.reason) {
      _writer.writeEnum(1, _instance.reason);
    }
    if (_instance.detail) {
      _writer.writeString(2, _instance.detail);
    }
  }

  private _reason: SipCallAudioEndReason;
  private _detail: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipCallAudioEnded to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipCallAudioEnded.AsObject>) {
    _value = _value || {};
    this.reason = _value.reason;
    this.detail = _value.detail;
    SipCallAudioEnded.refineValues(this);
  }
  get reason(): SipCallAudioEndReason {
    return this._reason;
  }
  set reason(value: SipCallAudioEndReason) {
    this._reason = value;
  }
  get detail(): string {
    return this._detail;
  }
  set detail(value: string) {
    this._detail = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipCallAudioEnded.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipCallAudioEnded.AsObject {
    return {
      reason: this.reason,
      detail: this.detail
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipCallAudioEnded.AsProtobufJSON {
    return {
      reason:
        SipCallAudioEndReason[
          this.reason === null || this.reason === undefined ? 0 : this.reason
        ],
      detail: this.detail
    };
  }
}
export module SipCallAudioEnded {
  /**
   * Standard JavaScript object representation for SipCallAudioEnded
   */
  export interface AsObject {
    reason: SipCallAudioEndReason;
    detail: string;
  }

  /**
   * Protobuf JSON representation for SipCallAudioEnded
   */
  export interface AsProtobufJSON {
    reason: string;
    detail: string;
  }
}

/**
 * Message implementation for ondewo.sip.SipCallAudioResponse
 */
export class SipCallAudioResponse implements GrpcMessage {
  static id = 'ondewo.sip.SipCallAudioResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipCallAudioResponse();
    SipCallAudioResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipCallAudioResponse) {}

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipCallAudioResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.started = new SipCallAudioStarted();
          _reader.readMessage(
            _instance.started,
            SipCallAudioStarted.deserializeBinaryFromReader
          );
          break;
        case 2:
          _instance.audio = new SipCallAudioFrame();
          _reader.readMessage(
            _instance.audio,
            SipCallAudioFrame.deserializeBinaryFromReader
          );
          break;
        case 3:
          _instance.stats = new SipCallAudioStats();
          _reader.readMessage(
            _instance.stats,
            SipCallAudioStats.deserializeBinaryFromReader
          );
          break;
        case 4:
          _instance.ended = new SipCallAudioEnded();
          _reader.readMessage(
            _instance.ended,
            SipCallAudioEnded.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    SipCallAudioResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipCallAudioResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.started) {
      _writer.writeMessage(
        1,
        _instance.started as any,
        SipCallAudioStarted.serializeBinaryToWriter
      );
    }
    if (_instance.audio) {
      _writer.writeMessage(
        2,
        _instance.audio as any,
        SipCallAudioFrame.serializeBinaryToWriter
      );
    }
    if (_instance.stats) {
      _writer.writeMessage(
        3,
        _instance.stats as any,
        SipCallAudioStats.serializeBinaryToWriter
      );
    }
    if (_instance.ended) {
      _writer.writeMessage(
        4,
        _instance.ended as any,
        SipCallAudioEnded.serializeBinaryToWriter
      );
    }
  }

  private _started?: SipCallAudioStarted;
  private _audio?: SipCallAudioFrame;
  private _stats?: SipCallAudioStats;
  private _ended?: SipCallAudioEnded;

  private _response: SipCallAudioResponse.ResponseCase =
    SipCallAudioResponse.ResponseCase.none;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipCallAudioResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipCallAudioResponse.AsObject>) {
    _value = _value || {};
    this.started = _value.started
      ? new SipCallAudioStarted(_value.started)
      : undefined;
    this.audio = _value.audio ? new SipCallAudioFrame(_value.audio) : undefined;
    this.stats = _value.stats ? new SipCallAudioStats(_value.stats) : undefined;
    this.ended = _value.ended ? new SipCallAudioEnded(_value.ended) : undefined;
    SipCallAudioResponse.refineValues(this);
  }
  get started(): SipCallAudioStarted | undefined {
    return this._started;
  }
  set started(value: SipCallAudioStarted | undefined) {
    if (value !== undefined && value !== null) {
      this._audio = this._stats = this._ended = undefined;
      this._response = SipCallAudioResponse.ResponseCase.started;
    }
    this._started = value;
  }
  get audio(): SipCallAudioFrame | undefined {
    return this._audio;
  }
  set audio(value: SipCallAudioFrame | undefined) {
    if (value !== undefined && value !== null) {
      this._started = this._stats = this._ended = undefined;
      this._response = SipCallAudioResponse.ResponseCase.audio;
    }
    this._audio = value;
  }
  get stats(): SipCallAudioStats | undefined {
    return this._stats;
  }
  set stats(value: SipCallAudioStats | undefined) {
    if (value !== undefined && value !== null) {
      this._started = this._audio = this._ended = undefined;
      this._response = SipCallAudioResponse.ResponseCase.stats;
    }
    this._stats = value;
  }
  get ended(): SipCallAudioEnded | undefined {
    return this._ended;
  }
  set ended(value: SipCallAudioEnded | undefined) {
    if (value !== undefined && value !== null) {
      this._started = this._audio = this._stats = undefined;
      this._response = SipCallAudioResponse.ResponseCase.ended;
    }
    this._ended = value;
  }
  get response() {
    return this._response;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipCallAudioResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipCallAudioResponse.AsObject {
    return {
      started: this.started ? this.started.toObject() : undefined,
      audio: this.audio ? this.audio.toObject() : undefined,
      stats: this.stats ? this.stats.toObject() : undefined,
      ended: this.ended ? this.ended.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipCallAudioResponse.AsProtobufJSON {
    return {
      started: this.started ? this.started.toProtobufJSON(options) : null,
      audio: this.audio ? this.audio.toProtobufJSON(options) : null,
      stats: this.stats ? this.stats.toProtobufJSON(options) : null,
      ended: this.ended ? this.ended.toProtobufJSON(options) : null
    };
  }
}
export module SipCallAudioResponse {
  /**
   * Standard JavaScript object representation for SipCallAudioResponse
   */
  export interface AsObject {
    started?: SipCallAudioStarted.AsObject;
    audio?: SipCallAudioFrame.AsObject;
    stats?: SipCallAudioStats.AsObject;
    ended?: SipCallAudioEnded.AsObject;
  }

  /**
   * Protobuf JSON representation for SipCallAudioResponse
   */
  export interface AsProtobufJSON {
    started: SipCallAudioStarted.AsProtobufJSON | null;
    audio: SipCallAudioFrame.AsProtobufJSON | null;
    stats: SipCallAudioStats.AsProtobufJSON | null;
    ended: SipCallAudioEnded.AsProtobufJSON | null;
  }
  export enum ResponseCase {
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
export class SipPlayWavFilesRequest implements GrpcMessage {
  static id = 'ondewo.sip.SipPlayWavFilesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SipPlayWavFilesRequest();
    SipPlayWavFilesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SipPlayWavFilesRequest) {
    _instance.wavFiles = _instance.wavFiles || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SipPlayWavFilesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          (_instance.wavFiles = _instance.wavFiles || []).push(
            _reader.readBytes()
          );
          break;
        default:
          _reader.skipField();
      }
    }

    SipPlayWavFilesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SipPlayWavFilesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.wavFiles && _instance.wavFiles.length) {
      _writer.writeRepeatedBytes(1, _instance.wavFiles);
    }
  }

  private _wavFiles: Uint8Array[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipPlayWavFilesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipPlayWavFilesRequest.AsObject>) {
    _value = _value || {};
    this.wavFiles = (_value.wavFiles || []).map(b =>
      b ? b.subarray(0) : new Uint8Array()
    );
    SipPlayWavFilesRequest.refineValues(this);
  }
  get wavFiles(): Uint8Array[] {
    return this._wavFiles;
  }
  set wavFiles(value: Uint8Array[]) {
    this._wavFiles = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SipPlayWavFilesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SipPlayWavFilesRequest.AsObject {
    return {
      wavFiles: (this.wavFiles || []).map(b =>
        b ? b.subarray(0) : new Uint8Array()
      )
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SipPlayWavFilesRequest.AsProtobufJSON {
    return {
      wavFiles: (this.wavFiles || []).map(b => (b ? uint8ArrayToBase64(b) : ''))
    };
  }
}
export module SipPlayWavFilesRequest {
  /**
   * Standard JavaScript object representation for SipPlayWavFilesRequest
   */
  export interface AsObject {
    wavFiles: Uint8Array[];
  }

  /**
   * Protobuf JSON representation for SipPlayWavFilesRequest
   */
  export interface AsProtobufJSON {
    wavFiles: string[];
  }
}
