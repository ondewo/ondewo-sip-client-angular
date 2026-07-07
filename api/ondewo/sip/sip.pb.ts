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
  }

  private _hardHangup: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SipEndCallRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SipEndCallRequest.AsObject>) {
    _value = _value || {};
    this.hardHangup = _value.hardHangup;
    SipEndCallRequest.refineValues(this);
  }
  get hardHangup(): boolean {
    return this._hardHangup;
  }
  set hardHangup(value: boolean) {
    this._hardHangup = value;
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
      hardHangup: this.hardHangup
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
      hardHangup: this.hardHangup
    };
  }
}
export module SipEndCallRequest {
  /**
   * Standard JavaScript object representation for SipEndCallRequest
   */
  export interface AsObject {
    hardHangup: boolean;
  }

  /**
   * Protobuf JSON representation for SipEndCallRequest
   */
  export interface AsProtobufJSON {
    hardHangup: boolean;
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
  }

  private _transferId: string;
  private _headers: { [prop: string]: string };

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
  ): SipTransferCallRequest.AsProtobufJSON {
    return {
      transferId: this.transferId,
      headers: this.headers
        ? Object.keys(this.headers).reduce(
            (r, k) => ({ ...r, [k]: this.headers![k] }),
            {}
          )
        : {}
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
  }

  /**
   * Protobuf JSON representation for SipTransferCallRequest
   */
  export interface AsProtobufJSON {
    transferId: string;
    headers: { [prop: string]: string };
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
      nluSessionName: this.nluSessionName
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
      nluSessionName: this.nluSessionName
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
    NO_ONGOING_CALL = 21
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
