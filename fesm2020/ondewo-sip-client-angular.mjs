import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Optional, Inject } from '@angular/core';
import { uint8ArrayToBase64, GrpcCallType, GrpcMetadata } from '@ngx-grpc/common';
import * as i1 from '@ngx-grpc/core';
import { throwStatusErrors, takeMessages, GRPC_CLIENT_FACTORY } from '@ngx-grpc/core';
import { BinaryReader, BinaryWriter } from 'google-protobuf';
import * as googleProtobuf000 from '@ngx-grpc/well-known-types';

/* tslint:disable */
/**
 * Message implementation for ondewo.sip.EndCallRequest
 */
class EndCallRequest {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of EndCallRequest to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.hardHangup = _value.hardHangup;
        EndCallRequest.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new EndCallRequest();
        EndCallRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
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
        EndCallRequest.refineValues(_instance);
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
        EndCallRequest.serializeBinaryToWriter(this, writer);
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
EndCallRequest.id = 'ondewo.sip.EndCallRequest';
/**
 * Message implementation for ondewo.sip.StartCallRequest
 */
class StartCallRequest {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of StartCallRequest to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.calleeId = _value.calleeId;
        (this.headers = _value.headers
            ? Object.keys(_value.headers).reduce((r, k) => ({ ...r, [k]: _value.headers[k] }), {})
            : {}),
            StartCallRequest.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new StartCallRequest();
        StartCallRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
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
                    _reader.readMessage(msg_2, StartCallRequest.HeadersEntry.deserializeBinaryFromReader);
                    _instance.headers = _instance.headers || {};
                    _instance.headers[msg_2.key] = msg_2.value;
                    break;
                default:
                    _reader.skipField();
            }
        }
        StartCallRequest.refineValues(_instance);
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
                _writer.writeRepeatedMessage(2, repeated_2, StartCallRequest.HeadersEntry.serializeBinaryToWriter);
            }
        }
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
        StartCallRequest.serializeBinaryToWriter(this, writer);
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
StartCallRequest.id = 'ondewo.sip.StartCallRequest';
(function (StartCallRequest) {
    /**
     * Message implementation for ondewo.sip.HeadersEntry
     */
    class HeadersEntry {
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
    HeadersEntry.id = 'ondewo.sip.HeadersEntry';
    StartCallRequest.HeadersEntry = HeadersEntry;
})(StartCallRequest || (StartCallRequest = {}));
/**
 * Message implementation for ondewo.sip.RegisterAccountRequest
 */
class RegisterAccountRequest {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of RegisterAccountRequest to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.accountName = _value.accountName;
        this.password = _value.password;
        RegisterAccountRequest.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new RegisterAccountRequest();
        RegisterAccountRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.accountName = _instance.accountName || '';
        _instance.password = _instance.password || '';
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
                default:
                    _reader.skipField();
            }
        }
        RegisterAccountRequest.refineValues(_instance);
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
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        RegisterAccountRequest.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            accountName: this.accountName,
            password: this.password
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
            password: this.password
        };
    }
}
RegisterAccountRequest.id = 'ondewo.sip.RegisterAccountRequest';
/**
 * Message implementation for ondewo.sip.StartSessionRequest
 */
class StartSessionRequest {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of StartSessionRequest to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.accountName = _value.accountName;
        this.autoAnswerInterval = _value.autoAnswerInterval;
        StartSessionRequest.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new StartSessionRequest();
        StartSessionRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
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
        StartSessionRequest.refineValues(_instance);
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
        StartSessionRequest.serializeBinaryToWriter(this, writer);
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
StartSessionRequest.id = 'ondewo.sip.StartSessionRequest';
/**
 * Message implementation for ondewo.sip.TransferCallRequest
 */
class TransferCallRequest {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of TransferCallRequest to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.transferId = _value.transferId;
        (this.headers = _value.headers
            ? Object.keys(_value.headers).reduce((r, k) => ({ ...r, [k]: _value.headers[k] }), {})
            : {}),
            TransferCallRequest.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new TransferCallRequest();
        TransferCallRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
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
                    _reader.readMessage(msg_2, TransferCallRequest.HeadersEntry.deserializeBinaryFromReader);
                    _instance.headers = _instance.headers || {};
                    _instance.headers[msg_2.key] = msg_2.value;
                    break;
                default:
                    _reader.skipField();
            }
        }
        TransferCallRequest.refineValues(_instance);
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
                _writer.writeRepeatedMessage(2, repeated_2, TransferCallRequest.HeadersEntry.serializeBinaryToWriter);
            }
        }
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
        TransferCallRequest.serializeBinaryToWriter(this, writer);
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
TransferCallRequest.id = 'ondewo.sip.TransferCallRequest';
(function (TransferCallRequest) {
    /**
     * Message implementation for ondewo.sip.HeadersEntry
     */
    class HeadersEntry {
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
    HeadersEntry.id = 'ondewo.sip.HeadersEntry';
    TransferCallRequest.HeadersEntry = HeadersEntry;
})(TransferCallRequest || (TransferCallRequest = {}));
/**
 * Message implementation for ondewo.sip.SipStatus
 */
class SipStatus {
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
            SipStatus.refineValues(this);
    }
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
            accountName: this.accountName,
            timestamp: this.timestamp ? this.timestamp.toProtobufJSON(options) : null,
            statusType: SipStatus.StatusType[this.statusType === null || this.statusType === undefined
                ? 0
                : this.statusType],
            calleeId: this.calleeId,
            transferCallId: this.transferCallId,
            headers: this.headers
                ? Object.keys(this.headers).reduce((r, k) => ({ ...r, [k]: this.headers[k] }), {})
                : {}
        };
    }
}
SipStatus.id = 'ondewo.sip.SipStatus';
(function (SipStatus) {
    let StatusType;
    (function (StatusType) {
        StatusType[StatusType["no_session"] = 0] = "no_session";
        StatusType[StatusType["registered"] = 1] = "registered";
        StatusType[StatusType["ready"] = 2] = "ready";
        StatusType[StatusType["incoming_call_initiated"] = 3] = "incoming_call_initiated";
        StatusType[StatusType["outgoing_call_initiated"] = 4] = "outgoing_call_initiated";
        StatusType[StatusType["outgoing_call_connected"] = 5] = "outgoing_call_connected";
        StatusType[StatusType["incoming_call_connected"] = 6] = "incoming_call_connected";
        StatusType[StatusType["transfer_call_initiated"] = 7] = "transfer_call_initiated";
        StatusType[StatusType["soft_hangup_initiated"] = 8] = "soft_hangup_initiated";
        StatusType[StatusType["hard_hangup_initiated"] = 9] = "hard_hangup_initiated";
        StatusType[StatusType["incoming_call_failed"] = 10] = "incoming_call_failed";
        StatusType[StatusType["outgoing_call_failed"] = 11] = "outgoing_call_failed";
        StatusType[StatusType["incoming_call_finished"] = 12] = "incoming_call_finished";
        StatusType[StatusType["outgoing_call_finished"] = 13] = "outgoing_call_finished";
    })(StatusType = SipStatus.StatusType || (SipStatus.StatusType = {}));
    /**
     * Message implementation for ondewo.sip.HeadersEntry
     */
    class HeadersEntry {
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
    HeadersEntry.id = 'ondewo.sip.HeadersEntry';
    SipStatus.HeadersEntry = HeadersEntry;
})(SipStatus || (SipStatus = {}));
/**
 * Message implementation for ondewo.sip.SipStatusHistoryResponse
 */
class SipStatusHistoryResponse {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipStatusHistoryResponse to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.statusHistory = (_value.statusHistory || []).map(m => new SipStatus(m));
        SipStatusHistoryResponse.refineValues(this);
    }
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
SipStatusHistoryResponse.id = 'ondewo.sip.SipStatusHistoryResponse';
/**
 * Message implementation for ondewo.sip.PlayWavFilesRequest
 */
class PlayWavFilesRequest {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of PlayWavFilesRequest to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.wavFiles = (_value.wavFiles || []).map(b => b ? b.subarray(0) : new Uint8Array());
        PlayWavFilesRequest.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new PlayWavFilesRequest();
        PlayWavFilesRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
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
        PlayWavFilesRequest.refineValues(_instance);
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
        PlayWavFilesRequest.serializeBinaryToWriter(this, writer);
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
PlayWavFilesRequest.id = 'ondewo.sip.PlayWavFilesRequest';

/* tslint:disable */
/**
 * Specific GrpcClientSettings for Sip.
 * Use it only if your default settings are not set or the service requires other settings.
 */
const GRPC_SIP_CLIENT_SETTINGS = new InjectionToken('GRPC_SIP_CLIENT_SETTINGS');

/* tslint:disable */
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
             * Unary call: /ondewo.sip.Sip/StartSession
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<googleProtobuf000.Empty>>
             */
            startSession: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/StartSession',
                    requestData,
                    requestMetadata,
                    requestClass: StartSessionRequest,
                    responseClass: googleProtobuf000.Empty
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/EndSession
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<googleProtobuf000.Empty>>
             */
            endSession: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/EndSession',
                    requestData,
                    requestMetadata,
                    requestClass: googleProtobuf000.Empty,
                    responseClass: googleProtobuf000.Empty
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/StartCall
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<googleProtobuf000.Empty>>
             */
            startCall: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/StartCall',
                    requestData,
                    requestMetadata,
                    requestClass: StartCallRequest,
                    responseClass: googleProtobuf000.Empty
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/EndCall
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<googleProtobuf000.Empty>>
             */
            endCall: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/EndCall',
                    requestData,
                    requestMetadata,
                    requestClass: EndCallRequest,
                    responseClass: googleProtobuf000.Empty
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/TransferCall
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<googleProtobuf000.Empty>>
             */
            transferCall: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/TransferCall',
                    requestData,
                    requestMetadata,
                    requestClass: TransferCallRequest,
                    responseClass: googleProtobuf000.Empty
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/RegisterAccount
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<googleProtobuf000.Empty>>
             */
            registerAccount: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/RegisterAccount',
                    requestData,
                    requestMetadata,
                    requestClass: RegisterAccountRequest,
                    responseClass: googleProtobuf000.Empty
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/GetSipStatus
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<thisProto.SipStatus>>
             */
            getSipStatus: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/GetSipStatus',
                    requestData,
                    requestMetadata,
                    requestClass: googleProtobuf000.Empty,
                    responseClass: SipStatus
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/GetSipStatusHistory
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<thisProto.SipStatusHistoryResponse>>
             */
            getSipStatusHistory: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/GetSipStatusHistory',
                    requestData,
                    requestMetadata,
                    requestClass: googleProtobuf000.Empty,
                    responseClass: SipStatusHistoryResponse
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/PlayWavFiles
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<googleProtobuf000.Empty>>
             */
            playWavFiles: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/PlayWavFiles',
                    requestData,
                    requestMetadata,
                    requestClass: PlayWavFilesRequest,
                    responseClass: googleProtobuf000.Empty
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/Mute
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<googleProtobuf000.Empty>>
             */
            mute: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/Mute',
                    requestData,
                    requestMetadata,
                    requestClass: googleProtobuf000.Empty,
                    responseClass: googleProtobuf000.Empty
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/UnMute
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<googleProtobuf000.Empty>>
             */
            unMute: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/UnMute',
                    requestData,
                    requestMetadata,
                    requestClass: googleProtobuf000.Empty,
                    responseClass: googleProtobuf000.Empty
                });
            }
        };
        this.client = clientFactory.createClient('ondewo.sip.Sip', settings);
    }
    /**
     * Unary call @/ondewo.sip.Sip/StartSession
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<googleProtobuf000.Empty>
     */
    startSession(requestData, requestMetadata = new GrpcMetadata()) {
        return this.$raw
            .startSession(requestData, requestMetadata)
            .pipe(throwStatusErrors(), takeMessages());
    }
    /**
     * Unary call @/ondewo.sip.Sip/EndSession
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<googleProtobuf000.Empty>
     */
    endSession(requestData, requestMetadata = new GrpcMetadata()) {
        return this.$raw
            .endSession(requestData, requestMetadata)
            .pipe(throwStatusErrors(), takeMessages());
    }
    /**
     * Unary call @/ondewo.sip.Sip/StartCall
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<googleProtobuf000.Empty>
     */
    startCall(requestData, requestMetadata = new GrpcMetadata()) {
        return this.$raw
            .startCall(requestData, requestMetadata)
            .pipe(throwStatusErrors(), takeMessages());
    }
    /**
     * Unary call @/ondewo.sip.Sip/EndCall
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<googleProtobuf000.Empty>
     */
    endCall(requestData, requestMetadata = new GrpcMetadata()) {
        return this.$raw
            .endCall(requestData, requestMetadata)
            .pipe(throwStatusErrors(), takeMessages());
    }
    /**
     * Unary call @/ondewo.sip.Sip/TransferCall
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<googleProtobuf000.Empty>
     */
    transferCall(requestData, requestMetadata = new GrpcMetadata()) {
        return this.$raw
            .transferCall(requestData, requestMetadata)
            .pipe(throwStatusErrors(), takeMessages());
    }
    /**
     * Unary call @/ondewo.sip.Sip/RegisterAccount
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<googleProtobuf000.Empty>
     */
    registerAccount(requestData, requestMetadata = new GrpcMetadata()) {
        return this.$raw
            .registerAccount(requestData, requestMetadata)
            .pipe(throwStatusErrors(), takeMessages());
    }
    /**
     * Unary call @/ondewo.sip.Sip/GetSipStatus
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatus>
     */
    getSipStatus(requestData, requestMetadata = new GrpcMetadata()) {
        return this.$raw
            .getSipStatus(requestData, requestMetadata)
            .pipe(throwStatusErrors(), takeMessages());
    }
    /**
     * Unary call @/ondewo.sip.Sip/GetSipStatusHistory
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatusHistoryResponse>
     */
    getSipStatusHistory(requestData, requestMetadata = new GrpcMetadata()) {
        return this.$raw
            .getSipStatusHistory(requestData, requestMetadata)
            .pipe(throwStatusErrors(), takeMessages());
    }
    /**
     * Unary call @/ondewo.sip.Sip/PlayWavFiles
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<googleProtobuf000.Empty>
     */
    playWavFiles(requestData, requestMetadata = new GrpcMetadata()) {
        return this.$raw
            .playWavFiles(requestData, requestMetadata)
            .pipe(throwStatusErrors(), takeMessages());
    }
    /**
     * Unary call @/ondewo.sip.Sip/Mute
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<googleProtobuf000.Empty>
     */
    mute(requestData, requestMetadata = new GrpcMetadata()) {
        return this.$raw
            .mute(requestData, requestMetadata)
            .pipe(throwStatusErrors(), takeMessages());
    }
    /**
     * Unary call @/ondewo.sip.Sip/UnMute
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<googleProtobuf000.Empty>
     */
    unMute(requestData, requestMetadata = new GrpcMetadata()) {
        return this.$raw
            .unMute(requestData, requestMetadata)
            .pipe(throwStatusErrors(), takeMessages());
    }
}
SipClient.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: SipClient, deps: [{ token: GRPC_SIP_CLIENT_SETTINGS, optional: true }, { token: GRPC_CLIENT_FACTORY }, { token: i1.GrpcHandler }], target: i0.ɵɵFactoryTarget.Injectable });
SipClient.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: SipClient, providedIn: 'any' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: SipClient, decorators: [{
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

export { EndCallRequest, GRPC_SIP_CLIENT_SETTINGS, PlayWavFilesRequest, RegisterAccountRequest, SipClient, SipStatus, SipStatusHistoryResponse, StartCallRequest, StartSessionRequest, TransferCallRequest };
//# sourceMappingURL=ondewo-sip-client-angular.mjs.map
