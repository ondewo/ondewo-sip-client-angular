import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Optional, Inject } from '@angular/core';
import { uint8ArrayToBase64, GrpcCallType, GrpcMetadata } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter } from 'google-protobuf';
import * as googleProtobuf000 from '@ngx-grpc/well-known-types';
import * as i1 from '@ngx-grpc/core';
import { throwStatusErrors, takeMessages, GRPC_CLIENT_FACTORY } from '@ngx-grpc/core';

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
/**
 * Specific GrpcClientSettings for Sip.
 * Use it only if your default settings are not set or the service requires other settings.
 */
const GRPC_SIP_CLIENT_SETTINGS = new InjectionToken('GRPC_SIP_CLIENT_SETTINGS');

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
/**
 * Message implementation for ondewo.sip.SipEndCallRequest
 */
class SipEndCallRequest {
    static { this.id = 'ondewo.sip.SipEndCallRequest'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipEndCallRequest();
        SipEndCallRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.hardHangup = _instance.hardHangup || false;
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
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
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.hardHangup) {
            _writer.writeBool(1, _instance.hardHangup);
        }
    }
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipEndCallRequest to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.hardHangup = _value.hardHangup;
        SipEndCallRequest.refineValues(this);
    }
    get hardHangup() {
        return this._hardHangup;
    }
    set hardHangup(value) {
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
    toObject() {
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
    options) {
        return {
            hardHangup: this.hardHangup
        };
    }
}
/**
 * Message implementation for ondewo.sip.SipStartCallRequest
 */
class SipStartCallRequest {
    static { this.id = 'ondewo.sip.SipStartCallRequest'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipStartCallRequest();
        SipStartCallRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.calleeId = _instance.calleeId || '';
        _instance.headers = _instance.headers || {};
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.calleeId = _reader.readString();
                    break;
                case 2:
                    const msg_2 = {};
                    _reader.readMessage(msg_2, SipStartCallRequest.HeadersEntry.deserializeBinaryFromReader);
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
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.calleeId) {
            _writer.writeString(1, _instance.calleeId);
        }
        if (!!_instance.headers) {
            const keys_2 = Object.keys(_instance.headers);
            if (keys_2.length) {
                const repeated_2 = keys_2
                    .map(key => ({ key: key, value: _instance.headers[key] }))
                    .reduce((r, v) => [...r, v], []);
                _writer.writeRepeatedMessage(2, repeated_2, SipStartCallRequest.HeadersEntry.serializeBinaryToWriter);
            }
        }
    }
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipStartCallRequest to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.calleeId = _value.calleeId;
        (this.headers = _value.headers
            ? Object.keys(_value.headers).reduce((r, k) => ({ ...r, [k]: _value.headers[k] }), {})
            : {}),
            SipStartCallRequest.refineValues(this);
    }
    get calleeId() {
        return this._calleeId;
    }
    set calleeId(value) {
        this._calleeId = value;
    }
    get headers() {
        return this._headers;
    }
    set headers(value) {
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
    toObject() {
        return {
            calleeId: this.calleeId,
            headers: this.headers
                ? Object.keys(this.headers).reduce((r, k) => ({ ...r, [k]: this.headers[k] }), {})
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
    options) {
        return {
            calleeId: this.calleeId,
            headers: this.headers
                ? Object.keys(this.headers).reduce((r, k) => ({ ...r, [k]: this.headers[k] }), {})
                : {}
        };
    }
}
(function (SipStartCallRequest) {
    /**
     * Message implementation for ondewo.sip.SipStartCallRequest.HeadersEntry
     */
    class HeadersEntry {
        static { this.id = 'ondewo.sip.SipStartCallRequest.HeadersEntry'; }
        /**
         * Deserialize binary data to message
         * @param instance message instance
         */
        static deserializeBinary(bytes) {
            const instance = new HeadersEntry();
            HeadersEntry.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
            return instance;
        }
        /**
         * Check all the properties and set default protobuf values if necessary
         * @param _instance message instance
         */
        static refineValues(_instance) {
            _instance.key = _instance.key || '';
            _instance.value = _instance.value || '';
        }
        /**
         * Deserializes / reads binary message into message instance using provided binary reader
         * @param _instance message instance
         * @param _reader binary reader instance
         */
        static deserializeBinaryFromReader(_instance, _reader) {
            while (_reader.nextField()) {
                if (_reader.isEndGroup())
                    break;
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
        static serializeBinaryToWriter(_instance, _writer) {
            if (_instance.key) {
                _writer.writeString(1, _instance.key);
            }
            if (_instance.value) {
                _writer.writeString(2, _instance.value);
            }
        }
        /**
         * Message constructor. Initializes the properties and applies default Protobuf values if necessary
         * @param _value initial values object or instance of HeadersEntry to deeply clone from
         */
        constructor(_value) {
            _value = _value || {};
            this.key = _value.key;
            this.value = _value.value;
            HeadersEntry.refineValues(this);
        }
        get key() {
            return this._key;
        }
        set key(value) {
            this._key = value;
        }
        get value() {
            return this._value;
        }
        set value(value) {
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
        toObject() {
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
        options) {
            return {
                key: this.key,
                value: this.value
            };
        }
    }
    SipStartCallRequest.HeadersEntry = HeadersEntry;
})(SipStartCallRequest || (SipStartCallRequest = {}));
/**
 * Message implementation for ondewo.sip.SipRegisterAccountRequest
 */
class SipRegisterAccountRequest {
    static { this.id = 'ondewo.sip.SipRegisterAccountRequest'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipRegisterAccountRequest();
        SipRegisterAccountRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
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
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
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
    static serializeBinaryToWriter(_instance, _writer) {
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
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipRegisterAccountRequest to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.accountName = _value.accountName;
        this.password = _value.password;
        this.authUsername = _value.authUsername;
        this.outboundProxy = _value.outboundProxy;
        SipRegisterAccountRequest.refineValues(this);
    }
    get accountName() {
        return this._accountName;
    }
    set accountName(value) {
        this._accountName = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    get authUsername() {
        return this._authUsername;
    }
    set authUsername(value) {
        this._authUsername = value;
    }
    get outboundProxy() {
        return this._outboundProxy;
    }
    set outboundProxy(value) {
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
    toObject() {
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
    options) {
        return {
            accountName: this.accountName,
            password: this.password,
            authUsername: this.authUsername,
            outboundProxy: this.outboundProxy
        };
    }
}
/**
 * Message implementation for ondewo.sip.SipStartSessionRequest
 */
class SipStartSessionRequest {
    static { this.id = 'ondewo.sip.SipStartSessionRequest'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipStartSessionRequest();
        SipStartSessionRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.accountName = _instance.accountName || '';
        _instance.autoAnswerInterval = _instance.autoAnswerInterval || 0;
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
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
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.accountName) {
            _writer.writeString(1, _instance.accountName);
        }
        if (_instance.autoAnswerInterval) {
            _writer.writeInt32(2, _instance.autoAnswerInterval);
        }
    }
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipStartSessionRequest to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.accountName = _value.accountName;
        this.autoAnswerInterval = _value.autoAnswerInterval;
        SipStartSessionRequest.refineValues(this);
    }
    get accountName() {
        return this._accountName;
    }
    set accountName(value) {
        this._accountName = value;
    }
    get autoAnswerInterval() {
        return this._autoAnswerInterval;
    }
    set autoAnswerInterval(value) {
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
    toObject() {
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
    options) {
        return {
            accountName: this.accountName,
            autoAnswerInterval: this.autoAnswerInterval
        };
    }
}
/**
 * Message implementation for ondewo.sip.SipTransferCallRequest
 */
class SipTransferCallRequest {
    static { this.id = 'ondewo.sip.SipTransferCallRequest'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipTransferCallRequest();
        SipTransferCallRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.transferId = _instance.transferId || '';
        _instance.headers = _instance.headers || {};
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.transferId = _reader.readString();
                    break;
                case 2:
                    const msg_2 = {};
                    _reader.readMessage(msg_2, SipTransferCallRequest.HeadersEntry.deserializeBinaryFromReader);
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
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.transferId) {
            _writer.writeString(1, _instance.transferId);
        }
        if (!!_instance.headers) {
            const keys_2 = Object.keys(_instance.headers);
            if (keys_2.length) {
                const repeated_2 = keys_2
                    .map(key => ({ key: key, value: _instance.headers[key] }))
                    .reduce((r, v) => [...r, v], []);
                _writer.writeRepeatedMessage(2, repeated_2, SipTransferCallRequest.HeadersEntry.serializeBinaryToWriter);
            }
        }
    }
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipTransferCallRequest to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.transferId = _value.transferId;
        (this.headers = _value.headers
            ? Object.keys(_value.headers).reduce((r, k) => ({ ...r, [k]: _value.headers[k] }), {})
            : {}),
            SipTransferCallRequest.refineValues(this);
    }
    get transferId() {
        return this._transferId;
    }
    set transferId(value) {
        this._transferId = value;
    }
    get headers() {
        return this._headers;
    }
    set headers(value) {
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
    toObject() {
        return {
            transferId: this.transferId,
            headers: this.headers
                ? Object.keys(this.headers).reduce((r, k) => ({ ...r, [k]: this.headers[k] }), {})
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
    options) {
        return {
            transferId: this.transferId,
            headers: this.headers
                ? Object.keys(this.headers).reduce((r, k) => ({ ...r, [k]: this.headers[k] }), {})
                : {}
        };
    }
}
(function (SipTransferCallRequest) {
    /**
     * Message implementation for ondewo.sip.SipTransferCallRequest.HeadersEntry
     */
    class HeadersEntry {
        static { this.id = 'ondewo.sip.SipTransferCallRequest.HeadersEntry'; }
        /**
         * Deserialize binary data to message
         * @param instance message instance
         */
        static deserializeBinary(bytes) {
            const instance = new HeadersEntry();
            HeadersEntry.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
            return instance;
        }
        /**
         * Check all the properties and set default protobuf values if necessary
         * @param _instance message instance
         */
        static refineValues(_instance) {
            _instance.key = _instance.key || '';
            _instance.value = _instance.value || '';
        }
        /**
         * Deserializes / reads binary message into message instance using provided binary reader
         * @param _instance message instance
         * @param _reader binary reader instance
         */
        static deserializeBinaryFromReader(_instance, _reader) {
            while (_reader.nextField()) {
                if (_reader.isEndGroup())
                    break;
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
        static serializeBinaryToWriter(_instance, _writer) {
            if (_instance.key) {
                _writer.writeString(1, _instance.key);
            }
            if (_instance.value) {
                _writer.writeString(2, _instance.value);
            }
        }
        /**
         * Message constructor. Initializes the properties and applies default Protobuf values if necessary
         * @param _value initial values object or instance of HeadersEntry to deeply clone from
         */
        constructor(_value) {
            _value = _value || {};
            this.key = _value.key;
            this.value = _value.value;
            HeadersEntry.refineValues(this);
        }
        get key() {
            return this._key;
        }
        set key(value) {
            this._key = value;
        }
        get value() {
            return this._value;
        }
        set value(value) {
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
        toObject() {
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
        options) {
            return {
                key: this.key,
                value: this.value
            };
        }
    }
    SipTransferCallRequest.HeadersEntry = HeadersEntry;
})(SipTransferCallRequest || (SipTransferCallRequest = {}));
/**
 * Message implementation for ondewo.sip.SipStatus
 */
class SipStatus {
    static { this.id = 'ondewo.sip.SipStatus'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipStatus();
        SipStatus.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
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
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.accountName = _reader.readString();
                    break;
                case 2:
                    _instance.timestamp = new googleProtobuf000.Timestamp();
                    _reader.readMessage(_instance.timestamp, googleProtobuf000.Timestamp.deserializeBinaryFromReader);
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
                    const msg_6 = {};
                    _reader.readMessage(msg_6, SipStatus.HeadersEntry.deserializeBinaryFromReader);
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
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.accountName) {
            _writer.writeString(1, _instance.accountName);
        }
        if (_instance.timestamp) {
            _writer.writeMessage(2, _instance.timestamp, googleProtobuf000.Timestamp.serializeBinaryToWriter);
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
            const keys_6 = Object.keys(_instance.headers);
            if (keys_6.length) {
                const repeated_6 = keys_6
                    .map(key => ({ key: key, value: _instance.headers[key] }))
                    .reduce((r, v) => [...r, v], []);
                _writer.writeRepeatedMessage(6, repeated_6, SipStatus.HeadersEntry.serializeBinaryToWriter);
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
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipStatus to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.accountName = _value.accountName;
        this.timestamp = _value.timestamp
            ? new googleProtobuf000.Timestamp(_value.timestamp)
            : undefined;
        this.statusType = _value.statusType;
        this.calleeId = _value.calleeId;
        this.transferCallId = _value.transferCallId;
        (this.headers = _value.headers
            ? Object.keys(_value.headers).reduce((r, k) => ({ ...r, [k]: _value.headers[k] }), {})
            : {}),
            (this.description = _value.description);
        this.exceptionName = _value.exceptionName;
        this.exceptionTraceback = _value.exceptionTraceback;
        this.nluSessionName = _value.nluSessionName;
        SipStatus.refineValues(this);
    }
    get accountName() {
        return this._accountName;
    }
    set accountName(value) {
        this._accountName = value;
    }
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
    get statusType() {
        return this._statusType;
    }
    set statusType(value) {
        this._statusType = value;
    }
    get calleeId() {
        return this._calleeId;
    }
    set calleeId(value) {
        this._calleeId = value;
    }
    get transferCallId() {
        return this._transferCallId;
    }
    set transferCallId(value) {
        this._transferCallId = value;
    }
    get headers() {
        return this._headers;
    }
    set headers(value) {
        this._headers = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get exceptionName() {
        return this._exceptionName;
    }
    set exceptionName(value) {
        this._exceptionName = value;
    }
    get exceptionTraceback() {
        return this._exceptionTraceback;
    }
    set exceptionTraceback(value) {
        this._exceptionTraceback = value;
    }
    get nluSessionName() {
        return this._nluSessionName;
    }
    set nluSessionName(value) {
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
    toObject() {
        return {
            accountName: this.accountName,
            timestamp: this.timestamp ? this.timestamp.toObject() : undefined,
            statusType: this.statusType,
            calleeId: this.calleeId,
            transferCallId: this.transferCallId,
            headers: this.headers
                ? Object.keys(this.headers).reduce((r, k) => ({ ...r, [k]: this.headers[k] }), {})
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
    options) {
        return {
            accountName: this.accountName,
            timestamp: this.timestamp ? this.timestamp.toProtobufJSON(options) : null,
            statusType: SipStatus.StatusType[this.statusType === null || this.statusType === undefined
                ? 0
                : this.statusType],
            calleeId: this.calleeId,
            transferCallId: this.transferCallId,
            headers: this.headers
                ? Object.keys(this.headers).reduce((r, k) => ({ ...r, [k]: this.headers[k] }), {})
                : {},
            description: this.description,
            exceptionName: this.exceptionName,
            exceptionTraceback: this.exceptionTraceback,
            nluSessionName: this.nluSessionName
        };
    }
}
(function (SipStatus) {
    let StatusType;
    (function (StatusType) {
        StatusType[StatusType["NO_SESSION"] = 0] = "NO_SESSION";
        StatusType[StatusType["REGISTERED"] = 1] = "REGISTERED";
        StatusType[StatusType["READY"] = 2] = "READY";
        StatusType[StatusType["INCOMING_CALL_INITIATED"] = 3] = "INCOMING_CALL_INITIATED";
        StatusType[StatusType["OUTGOING_CALL_INITIATED"] = 4] = "OUTGOING_CALL_INITIATED";
        StatusType[StatusType["OUTGOING_CALL_CONNECTED"] = 5] = "OUTGOING_CALL_CONNECTED";
        StatusType[StatusType["INCOMING_CALL_CONNECTED"] = 6] = "INCOMING_CALL_CONNECTED";
        StatusType[StatusType["TRANSFER_CALL_INITIATED"] = 7] = "TRANSFER_CALL_INITIATED";
        StatusType[StatusType["SOFT_HANGUP_INITIATED"] = 8] = "SOFT_HANGUP_INITIATED";
        StatusType[StatusType["HARD_HANGUP_INITIATED"] = 9] = "HARD_HANGUP_INITIATED";
        StatusType[StatusType["INCOMING_CALL_FAILED"] = 10] = "INCOMING_CALL_FAILED";
        StatusType[StatusType["OUTGOING_CALL_FAILED"] = 11] = "OUTGOING_CALL_FAILED";
        StatusType[StatusType["INCOMING_CALL_FINISHED"] = 12] = "INCOMING_CALL_FINISHED";
        StatusType[StatusType["OUTGOING_CALL_FINISHED"] = 13] = "OUTGOING_CALL_FINISHED";
        StatusType[StatusType["SESSION_REGISTRATION_FAILED"] = 14] = "SESSION_REGISTRATION_FAILED";
        StatusType[StatusType["SESSION_STARTED"] = 15] = "SESSION_STARTED";
        StatusType[StatusType["SESSION_ENDED"] = 16] = "SESSION_ENDED";
        StatusType[StatusType["TRANSFER_CALL_FAILED"] = 17] = "TRANSFER_CALL_FAILED";
        StatusType[StatusType["MICROPHONE_MUTED"] = 18] = "MICROPHONE_MUTED";
        StatusType[StatusType["MICROPHONE_UNMUTED"] = 19] = "MICROPHONE_UNMUTED";
        StatusType[StatusType["MICROPHONE_WAV_FILES_PLAYED"] = 20] = "MICROPHONE_WAV_FILES_PLAYED";
        StatusType[StatusType["NO_ONGOING_CALL"] = 21] = "NO_ONGOING_CALL";
    })(StatusType = SipStatus.StatusType || (SipStatus.StatusType = {}));
    /**
     * Message implementation for ondewo.sip.SipStatus.HeadersEntry
     */
    class HeadersEntry {
        static { this.id = 'ondewo.sip.SipStatus.HeadersEntry'; }
        /**
         * Deserialize binary data to message
         * @param instance message instance
         */
        static deserializeBinary(bytes) {
            const instance = new HeadersEntry();
            HeadersEntry.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
            return instance;
        }
        /**
         * Check all the properties and set default protobuf values if necessary
         * @param _instance message instance
         */
        static refineValues(_instance) {
            _instance.key = _instance.key || '';
            _instance.value = _instance.value || '';
        }
        /**
         * Deserializes / reads binary message into message instance using provided binary reader
         * @param _instance message instance
         * @param _reader binary reader instance
         */
        static deserializeBinaryFromReader(_instance, _reader) {
            while (_reader.nextField()) {
                if (_reader.isEndGroup())
                    break;
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
        static serializeBinaryToWriter(_instance, _writer) {
            if (_instance.key) {
                _writer.writeString(1, _instance.key);
            }
            if (_instance.value) {
                _writer.writeString(2, _instance.value);
            }
        }
        /**
         * Message constructor. Initializes the properties and applies default Protobuf values if necessary
         * @param _value initial values object or instance of HeadersEntry to deeply clone from
         */
        constructor(_value) {
            _value = _value || {};
            this.key = _value.key;
            this.value = _value.value;
            HeadersEntry.refineValues(this);
        }
        get key() {
            return this._key;
        }
        set key(value) {
            this._key = value;
        }
        get value() {
            return this._value;
        }
        set value(value) {
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
        toObject() {
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
        options) {
            return {
                key: this.key,
                value: this.value
            };
        }
    }
    SipStatus.HeadersEntry = HeadersEntry;
})(SipStatus || (SipStatus = {}));
/**
 * Message implementation for ondewo.sip.SipStatusHistoryResponse
 */
class SipStatusHistoryResponse {
    static { this.id = 'ondewo.sip.SipStatusHistoryResponse'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipStatusHistoryResponse();
        SipStatusHistoryResponse.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.statusHistory = _instance.statusHistory || [];
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    const messageInitializer1 = new SipStatus();
                    _reader.readMessage(messageInitializer1, SipStatus.deserializeBinaryFromReader);
                    (_instance.statusHistory = _instance.statusHistory || []).push(messageInitializer1);
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
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.statusHistory && _instance.statusHistory.length) {
            _writer.writeRepeatedMessage(1, _instance.statusHistory, SipStatus.serializeBinaryToWriter);
        }
    }
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipStatusHistoryResponse to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.statusHistory = (_value.statusHistory || []).map(m => new SipStatus(m));
        SipStatusHistoryResponse.refineValues(this);
    }
    get statusHistory() {
        return this._statusHistory;
    }
    set statusHistory(value) {
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
    toObject() {
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
    options) {
        return {
            statusHistory: (this.statusHistory || []).map(m => m.toProtobufJSON(options))
        };
    }
}
/**
 * Message implementation for ondewo.sip.SipPlayWavFilesRequest
 */
class SipPlayWavFilesRequest {
    static { this.id = 'ondewo.sip.SipPlayWavFilesRequest'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipPlayWavFilesRequest();
        SipPlayWavFilesRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.wavFiles = _instance.wavFiles || [];
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    (_instance.wavFiles = _instance.wavFiles || []).push(_reader.readBytes());
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
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.wavFiles && _instance.wavFiles.length) {
            _writer.writeRepeatedBytes(1, _instance.wavFiles);
        }
    }
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipPlayWavFilesRequest to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.wavFiles = (_value.wavFiles || []).map(b => b ? b.subarray(0) : new Uint8Array());
        SipPlayWavFilesRequest.refineValues(this);
    }
    get wavFiles() {
        return this._wavFiles;
    }
    set wavFiles(value) {
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
    toObject() {
        return {
            wavFiles: (this.wavFiles || []).map(b => b ? b.subarray(0) : new Uint8Array())
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
    options) {
        return {
            wavFiles: (this.wavFiles || []).map(b => (b ? uint8ArrayToBase64(b) : ''))
        };
    }
}

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
/**
 * Service client implementation for ondewo.sip.Sip
 */
class SipClient {
    constructor(settings, clientFactory, handler) {
        this.handler = handler;
        /**
         * Raw RPC implementation for each service client method.
         * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
         * Attention: these methods do not throw errors when non-zero status codes are received.
         */
        this.$raw = {
            /**
             * Unary call: /ondewo.sip.Sip/SipStartSession
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<thisProto.SipStatus>>
             */
            sipStartSession: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/SipStartSession',
                    requestData,
                    requestMetadata,
                    requestClass: SipStartSessionRequest,
                    responseClass: SipStatus
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/SipEndSession
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<thisProto.SipStatus>>
             */
            sipEndSession: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/SipEndSession',
                    requestData,
                    requestMetadata,
                    requestClass: googleProtobuf000.Empty,
                    responseClass: SipStatus
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/SipStartCall
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<thisProto.SipStatus>>
             */
            sipStartCall: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/SipStartCall',
                    requestData,
                    requestMetadata,
                    requestClass: SipStartCallRequest,
                    responseClass: SipStatus
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/SipEndCall
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<thisProto.SipStatus>>
             */
            sipEndCall: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/SipEndCall',
                    requestData,
                    requestMetadata,
                    requestClass: SipEndCallRequest,
                    responseClass: SipStatus
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/SipTransferCall
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<thisProto.SipStatus>>
             */
            sipTransferCall: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/SipTransferCall',
                    requestData,
                    requestMetadata,
                    requestClass: SipTransferCallRequest,
                    responseClass: SipStatus
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/SipRegisterAccount
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<thisProto.SipStatus>>
             */
            sipRegisterAccount: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/SipRegisterAccount',
                    requestData,
                    requestMetadata,
                    requestClass: SipRegisterAccountRequest,
                    responseClass: SipStatus
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/SipGetSipStatus
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<thisProto.SipStatus>>
             */
            sipGetSipStatus: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/SipGetSipStatus',
                    requestData,
                    requestMetadata,
                    requestClass: googleProtobuf000.Empty,
                    responseClass: SipStatus
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/SipGetSipStatusHistory
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<thisProto.SipStatusHistoryResponse>>
             */
            sipGetSipStatusHistory: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/SipGetSipStatusHistory',
                    requestData,
                    requestMetadata,
                    requestClass: googleProtobuf000.Empty,
                    responseClass: SipStatusHistoryResponse
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/SipPlayWavFiles
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<thisProto.SipStatus>>
             */
            sipPlayWavFiles: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/SipPlayWavFiles',
                    requestData,
                    requestMetadata,
                    requestClass: SipPlayWavFilesRequest,
                    responseClass: SipStatus
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/SipMute
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<thisProto.SipStatus>>
             */
            sipMute: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/SipMute',
                    requestData,
                    requestMetadata,
                    requestClass: googleProtobuf000.Empty,
                    responseClass: SipStatus
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/SipUnMute
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<thisProto.SipStatus>>
             */
            sipUnMute: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/SipUnMute',
                    requestData,
                    requestMetadata,
                    requestClass: googleProtobuf000.Empty,
                    responseClass: SipStatus
                });
            }
        };
        this.client = clientFactory.createClient('ondewo.sip.Sip', settings);
    }
    /**
     * Unary call @/ondewo.sip.Sip/SipStartSession
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatus>
     */
    sipStartSession(requestData, requestMetadata = new GrpcMetadata()) {
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
    sipEndSession(requestData, requestMetadata = new GrpcMetadata()) {
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
    sipStartCall(requestData, requestMetadata = new GrpcMetadata()) {
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
    sipEndCall(requestData, requestMetadata = new GrpcMetadata()) {
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
    sipTransferCall(requestData, requestMetadata = new GrpcMetadata()) {
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
    sipRegisterAccount(requestData, requestMetadata = new GrpcMetadata()) {
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
    sipGetSipStatus(requestData, requestMetadata = new GrpcMetadata()) {
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
    sipGetSipStatusHistory(requestData, requestMetadata = new GrpcMetadata()) {
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
    sipPlayWavFiles(requestData, requestMetadata = new GrpcMetadata()) {
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
    sipMute(requestData, requestMetadata = new GrpcMetadata()) {
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
    sipUnMute(requestData, requestMetadata = new GrpcMetadata()) {
        return this.$raw
            .sipUnMute(requestData, requestMetadata)
            .pipe(throwStatusErrors(), takeMessages());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: SipClient, deps: [{ token: GRPC_SIP_CLIENT_SETTINGS, optional: true }, { token: GRPC_CLIENT_FACTORY }, { token: i1.GrpcHandler }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: SipClient, providedIn: 'any' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: SipClient, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'any' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [GRPC_SIP_CLIENT_SETTINGS]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [GRPC_CLIENT_FACTORY]
                }] }, { type: i1.GrpcHandler }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { GRPC_SIP_CLIENT_SETTINGS, SipClient, SipEndCallRequest, SipPlayWavFilesRequest, SipRegisterAccountRequest, SipStartCallRequest, SipStartSessionRequest, SipStatus, SipStatusHistoryResponse, SipTransferCallRequest };
//# sourceMappingURL=ondewo-sip-client-angular.mjs.map
