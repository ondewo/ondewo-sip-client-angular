import { uint8ArrayToBase64, GrpcMetadata, GrpcCallType } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter } from 'google-protobuf';
import * as googleProtobuf000 from '@ngx-grpc/well-known-types';
import * as i0 from '@angular/core';
import { InjectionToken, Optional, Inject, Injectable, inject, makeEnvironmentProviders } from '@angular/core';
import * as i1 from '@ngx-grpc/core';
import { throwStatusErrors, takeMessages, GRPC_CLIENT_FACTORY, GRPC_INTERCEPTORS } from '@ngx-grpc/core';
import { isObservable, from, Observable, of, switchMap, firstValueFrom } from 'rxjs';
import * as i1$1 from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
var MediaControlSetting;
(function (MediaControlSetting) {
    MediaControlSetting[MediaControlSetting["MEDIA_CONTROL_SETTING_UNCHANGED"] = 0] = "MEDIA_CONTROL_SETTING_UNCHANGED";
    MediaControlSetting[MediaControlSetting["MEDIA_CONTROL_SETTING_ON"] = 1] = "MEDIA_CONTROL_SETTING_ON";
    MediaControlSetting[MediaControlSetting["MEDIA_CONTROL_SETTING_OFF"] = 2] = "MEDIA_CONTROL_SETTING_OFF";
})(MediaControlSetting || (MediaControlSetting = {}));
var MediaControlOwner;
(function (MediaControlOwner) {
    MediaControlOwner[MediaControlOwner["MEDIA_CONTROL_OWNER_UNSPECIFIED"] = 0] = "MEDIA_CONTROL_OWNER_UNSPECIFIED";
    MediaControlOwner[MediaControlOwner["MEDIA_CONTROL_OWNER_OPERATOR"] = 1] = "MEDIA_CONTROL_OWNER_OPERATOR";
    MediaControlOwner[MediaControlOwner["MEDIA_CONTROL_OWNER_PARTICIPANT"] = 2] = "MEDIA_CONTROL_OWNER_PARTICIPANT";
})(MediaControlOwner || (MediaControlOwner = {}));
var SipCallAudioMode;
(function (SipCallAudioMode) {
    SipCallAudioMode[SipCallAudioMode["SIP_CALL_AUDIO_MODE_UNSPECIFIED"] = 0] = "SIP_CALL_AUDIO_MODE_UNSPECIFIED";
    SipCallAudioMode[SipCallAudioMode["SIP_CALL_AUDIO_MODE_LISTEN"] = 1] = "SIP_CALL_AUDIO_MODE_LISTEN";
    SipCallAudioMode[SipCallAudioMode["SIP_CALL_AUDIO_MODE_TALK"] = 2] = "SIP_CALL_AUDIO_MODE_TALK";
})(SipCallAudioMode || (SipCallAudioMode = {}));
var SipCallAudioEndReason;
(function (SipCallAudioEndReason) {
    SipCallAudioEndReason[SipCallAudioEndReason["SIP_CALL_AUDIO_END_REASON_UNSPECIFIED"] = 0] = "SIP_CALL_AUDIO_END_REASON_UNSPECIFIED";
    SipCallAudioEndReason[SipCallAudioEndReason["SIP_CALL_AUDIO_END_REASON_CLIENT_CLOSED"] = 1] = "SIP_CALL_AUDIO_END_REASON_CLIENT_CLOSED";
    SipCallAudioEndReason[SipCallAudioEndReason["SIP_CALL_AUDIO_END_REASON_CALL_ENDED"] = 2] = "SIP_CALL_AUDIO_END_REASON_CALL_ENDED";
    SipCallAudioEndReason[SipCallAudioEndReason["SIP_CALL_AUDIO_END_REASON_CALL_TRANSFERRED"] = 3] = "SIP_CALL_AUDIO_END_REASON_CALL_TRANSFERRED";
    SipCallAudioEndReason[SipCallAudioEndReason["SIP_CALL_AUDIO_END_REASON_MAX_DURATION"] = 4] = "SIP_CALL_AUDIO_END_REASON_MAX_DURATION";
    SipCallAudioEndReason[SipCallAudioEndReason["SIP_CALL_AUDIO_END_REASON_STALLED"] = 5] = "SIP_CALL_AUDIO_END_REASON_STALLED";
    SipCallAudioEndReason[SipCallAudioEndReason["SIP_CALL_AUDIO_END_REASON_INTERNAL"] = 6] = "SIP_CALL_AUDIO_END_REASON_INTERNAL";
})(SipCallAudioEndReason || (SipCallAudioEndReason = {}));
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
        _instance.endReason = _instance.endReason || 0;
        _instance.amdResult = _instance.amdResult || undefined;
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
                case 2:
                    _instance.endReason = _reader.readEnum();
                    break;
                case 3:
                    _instance.amdResult = new AnsweringMachineDetectionResult();
                    _reader.readMessage(_instance.amdResult, AnsweringMachineDetectionResult.deserializeBinaryFromReader);
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
        if (_instance.endReason) {
            _writer.writeEnum(2, _instance.endReason);
        }
        if (_instance.amdResult) {
            _writer.writeMessage(3, _instance.amdResult, AnsweringMachineDetectionResult.serializeBinaryToWriter);
        }
    }
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipEndCallRequest to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.hardHangup = _value.hardHangup;
        this.endReason = _value.endReason;
        this.amdResult = _value.amdResult
            ? new AnsweringMachineDetectionResult(_value.amdResult)
            : undefined;
        SipEndCallRequest.refineValues(this);
    }
    get hardHangup() {
        return this._hardHangup;
    }
    set hardHangup(value) {
        this._hardHangup = value;
    }
    get endReason() {
        return this._endReason;
    }
    set endReason(value) {
        this._endReason = value;
    }
    get amdResult() {
        return this._amdResult;
    }
    set amdResult(value) {
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
    toObject() {
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
    options) {
        return {
            hardHangup: this.hardHangup,
            endReason: SipEndCallRequest.EndCallReason[this.endReason === null || this.endReason === undefined
                ? 0
                : this.endReason],
            amdResult: this.amdResult ? this.amdResult.toProtobufJSON(options) : null
        };
    }
}
(function (SipEndCallRequest) {
    let EndCallReason;
    (function (EndCallReason) {
        EndCallReason[EndCallReason["END_CALL_REASON_UNSPECIFIED"] = 0] = "END_CALL_REASON_UNSPECIFIED";
        EndCallReason[EndCallReason["ANSWERING_MACHINE"] = 1] = "ANSWERING_MACHINE";
        EndCallReason[EndCallReason["ANSWERING_MACHINE_VOICE_MESSAGE_LEFT"] = 2] = "ANSWERING_MACHINE_VOICE_MESSAGE_LEFT";
        EndCallReason[EndCallReason["END_CALL_REASON_TRANSFERRED"] = 3] = "END_CALL_REASON_TRANSFERRED";
    })(EndCallReason = SipEndCallRequest.EndCallReason || (SipEndCallRequest.EndCallReason = {}));
})(SipEndCallRequest || (SipEndCallRequest = {}));
/**
 * Message implementation for ondewo.sip.SipReportAnsweringMachineDetectedRequest
 */
class SipReportAnsweringMachineDetectedRequest {
    static { this.id = 'ondewo.sip.SipReportAnsweringMachineDetectedRequest'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipReportAnsweringMachineDetectedRequest();
        SipReportAnsweringMachineDetectedRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.amdResult = _instance.amdResult || undefined;
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
                    _instance.amdResult = new AnsweringMachineDetectionResult();
                    _reader.readMessage(_instance.amdResult, AnsweringMachineDetectionResult.deserializeBinaryFromReader);
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
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.amdResult) {
            _writer.writeMessage(1, _instance.amdResult, AnsweringMachineDetectionResult.serializeBinaryToWriter);
        }
    }
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipReportAnsweringMachineDetectedRequest to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.amdResult = _value.amdResult
            ? new AnsweringMachineDetectionResult(_value.amdResult)
            : undefined;
        SipReportAnsweringMachineDetectedRequest.refineValues(this);
    }
    get amdResult() {
        return this._amdResult;
    }
    set amdResult(value) {
        this._amdResult = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        SipReportAnsweringMachineDetectedRequest.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
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
    options) {
        return {
            amdResult: this.amdResult ? this.amdResult.toProtobufJSON(options) : null
        };
    }
}
/**
 * Message implementation for ondewo.sip.AnsweringMachineDetectionResult
 */
class AnsweringMachineDetectionResult {
    static { this.id = 'ondewo.sip.AnsweringMachineDetectionResult'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new AnsweringMachineDetectionResult();
        AnsweringMachineDetectionResult.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
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
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
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
                    (_instance.matchedCueIds = _instance.matchedCueIds || []).push(_reader.readString());
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
    static serializeBinaryToWriter(_instance, _writer) {
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
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of AnsweringMachineDetectionResult to deeply clone from
     */
    constructor(_value) {
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
    get verdict() {
        return this._verdict;
    }
    set verdict(value) {
        this._verdict = value;
    }
    get cause() {
        return this._cause;
    }
    set cause(value) {
        this._cause = value;
    }
    get confidence() {
        return this._confidence;
    }
    set confidence(value) {
        this._confidence = value;
    }
    get decisionMs() {
        return this._decisionMs;
    }
    set decisionMs(value) {
        this._decisionMs = value;
    }
    get ruleId() {
        return this._ruleId;
    }
    set ruleId(value) {
        this._ruleId = value;
    }
    get matchedCueIds() {
        return this._matchedCueIds;
    }
    set matchedCueIds(value) {
        this._matchedCueIds = value;
    }
    get actionTaken() {
        return this._actionTaken;
    }
    set actionTaken(value) {
        this._actionTaken = value;
    }
    get callId() {
        return this._callId;
    }
    set callId(value) {
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
    toObject() {
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
    options) {
        return {
            verdict: AnsweringMachineDetectionResult.Verdict[this.verdict === null || this.verdict === undefined ? 0 : this.verdict],
            cause: AnsweringMachineDetectionResult.Cause[this.cause === null || this.cause === undefined ? 0 : this.cause],
            confidence: this.confidence,
            decisionMs: this.decisionMs,
            ruleId: this.ruleId,
            matchedCueIds: (this.matchedCueIds || []).slice(),
            actionTaken: AnsweringMachineDetectionResult.ActionTaken[this.actionTaken === null || this.actionTaken === undefined
                ? 0
                : this.actionTaken],
            callId: this.callId
        };
    }
}
(function (AnsweringMachineDetectionResult) {
    let Verdict;
    (function (Verdict) {
        Verdict[Verdict["VERDICT_UNSPECIFIED"] = 0] = "VERDICT_UNSPECIFIED";
        Verdict[Verdict["HUMAN"] = 1] = "HUMAN";
        Verdict[Verdict["MACHINE"] = 2] = "MACHINE";
        Verdict[Verdict["IVR"] = 3] = "IVR";
        Verdict[Verdict["FAX"] = 4] = "FAX";
        Verdict[Verdict["NETWORK_ANNOUNCEMENT"] = 5] = "NETWORK_ANNOUNCEMENT";
        Verdict[Verdict["CALL_SCREENING"] = 6] = "CALL_SCREENING";
        Verdict[Verdict["NO_SPEECH"] = 7] = "NO_SPEECH";
        Verdict[Verdict["UNKNOWN"] = 8] = "UNKNOWN";
    })(Verdict = AnsweringMachineDetectionResult.Verdict || (AnsweringMachineDetectionResult.Verdict = {}));
    let Cause;
    (function (Cause) {
        Cause[Cause["CAUSE_UNSPECIFIED"] = 0] = "CAUSE_UNSPECIFIED";
        Cause[Cause["CADENCE"] = 1] = "CADENCE";
        Cause[Cause["KEYWORD"] = 2] = "KEYWORD";
        Cause[Cause["BEEP"] = 3] = "BEEP";
        Cause[Cause["TONE"] = 4] = "TONE";
        Cause[Cause["CADENCE_AND_KEYWORD"] = 5] = "CADENCE_AND_KEYWORD";
        Cause[Cause["CADENCE_AND_BEEP"] = 6] = "CADENCE_AND_BEEP";
        Cause[Cause["TIMEOUT"] = 7] = "TIMEOUT";
        Cause[Cause["SILENCE"] = 8] = "SILENCE";
    })(Cause = AnsweringMachineDetectionResult.Cause || (AnsweringMachineDetectionResult.Cause = {}));
    let ActionTaken;
    (function (ActionTaken) {
        ActionTaken[ActionTaken["ACTION_TAKEN_UNSPECIFIED"] = 0] = "ACTION_TAKEN_UNSPECIFIED";
        ActionTaken[ActionTaken["HUNG_UP"] = 1] = "HUNG_UP";
        ActionTaken[ActionTaken["CONTINUED"] = 2] = "CONTINUED";
        ActionTaken[ActionTaken["DETECT_ONLY"] = 3] = "DETECT_ONLY";
        ActionTaken[ActionTaken["LEFT_VOICE_MESSAGE"] = 4] = "LEFT_VOICE_MESSAGE";
    })(ActionTaken = AnsweringMachineDetectionResult.ActionTaken || (AnsweringMachineDetectionResult.ActionTaken = {}));
})(AnsweringMachineDetectionResult || (AnsweringMachineDetectionResult = {}));
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
        _instance.outcomeTimeoutMs = _instance.outcomeTimeoutMs || 0;
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
        if (_instance.outcomeTimeoutMs) {
            _writer.writeUint32(3, _instance.outcomeTimeoutMs);
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
            (this.outcomeTimeoutMs = _value.outcomeTimeoutMs);
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
    get outcomeTimeoutMs() {
        return this._outcomeTimeoutMs;
    }
    set outcomeTimeoutMs(value) {
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
    toObject() {
        return {
            transferId: this.transferId,
            headers: this.headers
                ? Object.keys(this.headers).reduce((r, k) => ({ ...r, [k]: this.headers[k] }), {})
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
    options) {
        return {
            transferId: this.transferId,
            headers: this.headers
                ? Object.keys(this.headers).reduce((r, k) => ({ ...r, [k]: this.headers[k] }), {})
                : {},
            outcomeTimeoutMs: this.outcomeTimeoutMs
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
                case 11:
                    _instance.amdResult = new AnsweringMachineDetectionResult();
                    _reader.readMessage(_instance.amdResult, AnsweringMachineDetectionResult.deserializeBinaryFromReader);
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
        if (_instance.amdResult) {
            _writer.writeMessage(11, _instance.amdResult, AnsweringMachineDetectionResult.serializeBinaryToWriter);
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
    get amdResult() {
        return this._amdResult;
    }
    set amdResult(value) {
        this._amdResult = value;
    }
    get callId() {
        return this._callId;
    }
    set callId(value) {
        this._callId = value;
    }
    get botMuted() {
        return this._botMuted;
    }
    set botMuted(value) {
        this._botMuted = value;
    }
    get listeningPaused() {
        return this._listeningPaused;
    }
    set listeningPaused(value) {
        this._listeningPaused = value;
    }
    get callAudioStreams() {
        return this._callAudioStreams;
    }
    set callAudioStreams(value) {
        this._callAudioStreams = value;
    }
    get sipResponseCode() {
        return this._sipResponseCode;
    }
    set sipResponseCode(value) {
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
        StatusType[StatusType["OUTGOING_CALL_ANSWERING_MACHINE_DETECTED"] = 22] = "OUTGOING_CALL_ANSWERING_MACHINE_DETECTED";
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
 * Message implementation for ondewo.sip.SipSetCallMediaControlRequest
 */
class SipSetCallMediaControlRequest {
    static { this.id = 'ondewo.sip.SipSetCallMediaControlRequest'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipSetCallMediaControlRequest();
        SipSetCallMediaControlRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
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
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
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
    static serializeBinaryToWriter(_instance, _writer) {
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
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipSetCallMediaControlRequest to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.botVoice = _value.botVoice;
        this.botListening = _value.botListening;
        this.owner = _value.owner;
        this.participantsPresent = _value.participantsPresent;
        SipSetCallMediaControlRequest.refineValues(this);
    }
    get botVoice() {
        return this._botVoice;
    }
    set botVoice(value) {
        this._botVoice = value;
    }
    get botListening() {
        return this._botListening;
    }
    set botListening(value) {
        this._botListening = value;
    }
    get owner() {
        return this._owner;
    }
    set owner(value) {
        this._owner = value;
    }
    get participantsPresent() {
        return this._participantsPresent;
    }
    set participantsPresent(value) {
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
    toObject() {
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
    options) {
        return {
            botVoice: MediaControlSetting[this.botVoice === null || this.botVoice === undefined
                ? 0
                : this.botVoice],
            botListening: MediaControlSetting[this.botListening === null || this.botListening === undefined
                ? 0
                : this.botListening],
            owner: MediaControlOwner[this.owner === null || this.owner === undefined ? 0 : this.owner],
            participantsPresent: this.participantsPresent
        };
    }
}
/**
 * Message implementation for ondewo.sip.SipCallAudioConfig
 */
class SipCallAudioConfig {
    static { this.id = 'ondewo.sip.SipCallAudioConfig'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipCallAudioConfig();
        SipCallAudioConfig.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
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
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
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
    static serializeBinaryToWriter(_instance, _writer) {
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
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipCallAudioConfig to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.mode = _value.mode;
        this.sampleRateHz = _value.sampleRateHz;
        this.frameMs = _value.frameMs;
        this.takeOver = _value.takeOver;
        this.streamId = _value.streamId;
        this.maxDurationS = _value.maxDurationS;
        SipCallAudioConfig.refineValues(this);
    }
    get mode() {
        return this._mode;
    }
    set mode(value) {
        this._mode = value;
    }
    get sampleRateHz() {
        return this._sampleRateHz;
    }
    set sampleRateHz(value) {
        this._sampleRateHz = value;
    }
    get frameMs() {
        return this._frameMs;
    }
    set frameMs(value) {
        this._frameMs = value;
    }
    get takeOver() {
        return this._takeOver;
    }
    set takeOver(value) {
        this._takeOver = value;
    }
    get streamId() {
        return this._streamId;
    }
    set streamId(value) {
        this._streamId = value;
    }
    get maxDurationS() {
        return this._maxDurationS;
    }
    set maxDurationS(value) {
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
    toObject() {
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
    options) {
        return {
            mode: SipCallAudioMode[this.mode === null || this.mode === undefined ? 0 : this.mode],
            sampleRateHz: this.sampleRateHz,
            frameMs: this.frameMs,
            takeOver: this.takeOver,
            streamId: this.streamId,
            maxDurationS: this.maxDurationS
        };
    }
}
/**
 * Message implementation for ondewo.sip.SipCallAudioFrame
 */
class SipCallAudioFrame {
    static { this.id = 'ondewo.sip.SipCallAudioFrame'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipCallAudioFrame();
        SipCallAudioFrame.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.pcmS16le = _instance.pcmS16le || new Uint8Array();
        _instance.sequence = _instance.sequence || '0';
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
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.pcmS16le && _instance.pcmS16le.length) {
            _writer.writeBytes(1, _instance.pcmS16le);
        }
        if (_instance.sequence) {
            _writer.writeUint64String(2, _instance.sequence);
        }
    }
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipCallAudioFrame to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.pcmS16le = _value.pcmS16le;
        this.sequence = _value.sequence;
        SipCallAudioFrame.refineValues(this);
    }
    get pcmS16le() {
        return this._pcmS16le;
    }
    set pcmS16le(value) {
        this._pcmS16le = value;
    }
    get sequence() {
        return this._sequence;
    }
    set sequence(value) {
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
    toObject() {
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
    options) {
        return {
            pcmS16le: this.pcmS16le ? uint8ArrayToBase64(this.pcmS16le) : '',
            sequence: this.sequence
        };
    }
}
/**
 * Message implementation for ondewo.sip.SipCallAudioRequest
 */
class SipCallAudioRequest {
    static { this.id = 'ondewo.sip.SipCallAudioRequest'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipCallAudioRequest();
        SipCallAudioRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) { }
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
                    _instance.config = new SipCallAudioConfig();
                    _reader.readMessage(_instance.config, SipCallAudioConfig.deserializeBinaryFromReader);
                    break;
                case 2:
                    _instance.audio = new SipCallAudioFrame();
                    _reader.readMessage(_instance.audio, SipCallAudioFrame.deserializeBinaryFromReader);
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
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.config) {
            _writer.writeMessage(1, _instance.config, SipCallAudioConfig.serializeBinaryToWriter);
        }
        if (_instance.audio) {
            _writer.writeMessage(2, _instance.audio, SipCallAudioFrame.serializeBinaryToWriter);
        }
        if (_instance.agentMuted || _instance.agentMuted === false) {
            _writer.writeBool(3, _instance.agentMuted);
        }
    }
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipCallAudioRequest to deeply clone from
     */
    constructor(_value) {
        this._request = SipCallAudioRequest.RequestCase.none;
        _value = _value || {};
        this.config = _value.config
            ? new SipCallAudioConfig(_value.config)
            : undefined;
        this.audio = _value.audio ? new SipCallAudioFrame(_value.audio) : undefined;
        this.agentMuted = _value.agentMuted;
        SipCallAudioRequest.refineValues(this);
    }
    get config() {
        return this._config;
    }
    set config(value) {
        if (value !== undefined && value !== null) {
            this._audio = this._agentMuted = undefined;
            this._request = SipCallAudioRequest.RequestCase.config;
        }
        this._config = value;
    }
    get audio() {
        return this._audio;
    }
    set audio(value) {
        if (value !== undefined && value !== null) {
            this._config = this._agentMuted = undefined;
            this._request = SipCallAudioRequest.RequestCase.audio;
        }
        this._audio = value;
    }
    get agentMuted() {
        return this._agentMuted;
    }
    set agentMuted(value) {
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
    toObject() {
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
    options) {
        return {
            config: this.config ? this.config.toProtobufJSON(options) : null,
            audio: this.audio ? this.audio.toProtobufJSON(options) : null,
            agentMuted: this.agentMuted
        };
    }
}
(function (SipCallAudioRequest) {
    let RequestCase;
    (function (RequestCase) {
        RequestCase[RequestCase["none"] = 0] = "none";
        RequestCase[RequestCase["config"] = 1] = "config";
        RequestCase[RequestCase["audio"] = 2] = "audio";
        RequestCase[RequestCase["agentMuted"] = 3] = "agentMuted";
    })(RequestCase = SipCallAudioRequest.RequestCase || (SipCallAudioRequest.RequestCase = {}));
})(SipCallAudioRequest || (SipCallAudioRequest = {}));
/**
 * Message implementation for ondewo.sip.SipCallAudioStarted
 */
class SipCallAudioStarted {
    static { this.id = 'ondewo.sip.SipCallAudioStarted'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipCallAudioStarted();
        SipCallAudioStarted.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
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
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
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
    static serializeBinaryToWriter(_instance, _writer) {
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
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipCallAudioStarted to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.streamId = _value.streamId;
        this.sampleRateHz = _value.sampleRateHz;
        this.frameMs = _value.frameMs;
        this.mode = _value.mode;
        SipCallAudioStarted.refineValues(this);
    }
    get streamId() {
        return this._streamId;
    }
    set streamId(value) {
        this._streamId = value;
    }
    get sampleRateHz() {
        return this._sampleRateHz;
    }
    set sampleRateHz(value) {
        this._sampleRateHz = value;
    }
    get frameMs() {
        return this._frameMs;
    }
    set frameMs(value) {
        this._frameMs = value;
    }
    get mode() {
        return this._mode;
    }
    set mode(value) {
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
    toObject() {
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
    options) {
        return {
            streamId: this.streamId,
            sampleRateHz: this.sampleRateHz,
            frameMs: this.frameMs,
            mode: SipCallAudioMode[this.mode === null || this.mode === undefined ? 0 : this.mode]
        };
    }
}
/**
 * Message implementation for ondewo.sip.SipCallAudioStats
 */
class SipCallAudioStats {
    static { this.id = 'ondewo.sip.SipCallAudioStats'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipCallAudioStats();
        SipCallAudioStats.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
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
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
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
    static serializeBinaryToWriter(_instance, _writer) {
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
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipCallAudioStats to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.framesSent = _value.framesSent;
        this.framesDropped = _value.framesDropped;
        this.framesReceived = _value.framesReceived;
        this.underruns = _value.underruns;
        this.framesDiscarded = _value.framesDiscarded;
        SipCallAudioStats.refineValues(this);
    }
    get framesSent() {
        return this._framesSent;
    }
    set framesSent(value) {
        this._framesSent = value;
    }
    get framesDropped() {
        return this._framesDropped;
    }
    set framesDropped(value) {
        this._framesDropped = value;
    }
    get framesReceived() {
        return this._framesReceived;
    }
    set framesReceived(value) {
        this._framesReceived = value;
    }
    get underruns() {
        return this._underruns;
    }
    set underruns(value) {
        this._underruns = value;
    }
    get framesDiscarded() {
        return this._framesDiscarded;
    }
    set framesDiscarded(value) {
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
    toObject() {
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
    options) {
        return {
            framesSent: this.framesSent,
            framesDropped: this.framesDropped,
            framesReceived: this.framesReceived,
            underruns: this.underruns,
            framesDiscarded: this.framesDiscarded
        };
    }
}
/**
 * Message implementation for ondewo.sip.SipCallAudioEnded
 */
class SipCallAudioEnded {
    static { this.id = 'ondewo.sip.SipCallAudioEnded'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipCallAudioEnded();
        SipCallAudioEnded.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.reason = _instance.reason || 0;
        _instance.detail = _instance.detail || '';
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
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.reason) {
            _writer.writeEnum(1, _instance.reason);
        }
        if (_instance.detail) {
            _writer.writeString(2, _instance.detail);
        }
    }
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipCallAudioEnded to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.reason = _value.reason;
        this.detail = _value.detail;
        SipCallAudioEnded.refineValues(this);
    }
    get reason() {
        return this._reason;
    }
    set reason(value) {
        this._reason = value;
    }
    get detail() {
        return this._detail;
    }
    set detail(value) {
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
    toObject() {
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
    options) {
        return {
            reason: SipCallAudioEndReason[this.reason === null || this.reason === undefined ? 0 : this.reason],
            detail: this.detail
        };
    }
}
/**
 * Message implementation for ondewo.sip.SipCallAudioResponse
 */
class SipCallAudioResponse {
    static { this.id = 'ondewo.sip.SipCallAudioResponse'; }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SipCallAudioResponse();
        SipCallAudioResponse.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) { }
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
                    _instance.started = new SipCallAudioStarted();
                    _reader.readMessage(_instance.started, SipCallAudioStarted.deserializeBinaryFromReader);
                    break;
                case 2:
                    _instance.audio = new SipCallAudioFrame();
                    _reader.readMessage(_instance.audio, SipCallAudioFrame.deserializeBinaryFromReader);
                    break;
                case 3:
                    _instance.stats = new SipCallAudioStats();
                    _reader.readMessage(_instance.stats, SipCallAudioStats.deserializeBinaryFromReader);
                    break;
                case 4:
                    _instance.ended = new SipCallAudioEnded();
                    _reader.readMessage(_instance.ended, SipCallAudioEnded.deserializeBinaryFromReader);
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
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.started) {
            _writer.writeMessage(1, _instance.started, SipCallAudioStarted.serializeBinaryToWriter);
        }
        if (_instance.audio) {
            _writer.writeMessage(2, _instance.audio, SipCallAudioFrame.serializeBinaryToWriter);
        }
        if (_instance.stats) {
            _writer.writeMessage(3, _instance.stats, SipCallAudioStats.serializeBinaryToWriter);
        }
        if (_instance.ended) {
            _writer.writeMessage(4, _instance.ended, SipCallAudioEnded.serializeBinaryToWriter);
        }
    }
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SipCallAudioResponse to deeply clone from
     */
    constructor(_value) {
        this._response = SipCallAudioResponse.ResponseCase.none;
        _value = _value || {};
        this.started = _value.started
            ? new SipCallAudioStarted(_value.started)
            : undefined;
        this.audio = _value.audio ? new SipCallAudioFrame(_value.audio) : undefined;
        this.stats = _value.stats ? new SipCallAudioStats(_value.stats) : undefined;
        this.ended = _value.ended ? new SipCallAudioEnded(_value.ended) : undefined;
        SipCallAudioResponse.refineValues(this);
    }
    get started() {
        return this._started;
    }
    set started(value) {
        if (value !== undefined && value !== null) {
            this._audio = this._stats = this._ended = undefined;
            this._response = SipCallAudioResponse.ResponseCase.started;
        }
        this._started = value;
    }
    get audio() {
        return this._audio;
    }
    set audio(value) {
        if (value !== undefined && value !== null) {
            this._started = this._stats = this._ended = undefined;
            this._response = SipCallAudioResponse.ResponseCase.audio;
        }
        this._audio = value;
    }
    get stats() {
        return this._stats;
    }
    set stats(value) {
        if (value !== undefined && value !== null) {
            this._started = this._audio = this._ended = undefined;
            this._response = SipCallAudioResponse.ResponseCase.stats;
        }
        this._stats = value;
    }
    get ended() {
        return this._ended;
    }
    set ended(value) {
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
    toObject() {
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
    options) {
        return {
            started: this.started ? this.started.toProtobufJSON(options) : null,
            audio: this.audio ? this.audio.toProtobufJSON(options) : null,
            stats: this.stats ? this.stats.toProtobufJSON(options) : null,
            ended: this.ended ? this.ended.toProtobufJSON(options) : null
        };
    }
}
(function (SipCallAudioResponse) {
    let ResponseCase;
    (function (ResponseCase) {
        ResponseCase[ResponseCase["none"] = 0] = "none";
        ResponseCase[ResponseCase["started"] = 1] = "started";
        ResponseCase[ResponseCase["audio"] = 2] = "audio";
        ResponseCase[ResponseCase["stats"] = 3] = "stats";
        ResponseCase[ResponseCase["ended"] = 4] = "ended";
    })(ResponseCase = SipCallAudioResponse.ResponseCase || (SipCallAudioResponse.ResponseCase = {}));
})(SipCallAudioResponse || (SipCallAudioResponse = {}));
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
            },
            /**
             * Unary call: /ondewo.sip.Sip/SipReportAnsweringMachineDetected
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<thisProto.SipStatus>>
             */
            sipReportAnsweringMachineDetected: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/SipReportAnsweringMachineDetected',
                    requestData,
                    requestMetadata,
                    requestClass: SipReportAnsweringMachineDetectedRequest,
                    responseClass: SipStatus
                });
            },
            /**
             * Unary call: /ondewo.sip.Sip/SipSetCallMediaControl
             *
             * @param requestMessage Request message
             * @param requestMetadata Request metadata
             * @returns Observable<GrpcEvent<thisProto.SipStatus>>
             */
            sipSetCallMediaControl: (requestData, requestMetadata = new GrpcMetadata()) => {
                return this.handler.handle({
                    type: GrpcCallType.unary,
                    client: this.client,
                    path: '/ondewo.sip.Sip/SipSetCallMediaControl',
                    requestData,
                    requestMetadata,
                    requestClass: SipSetCallMediaControlRequest,
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
    /**
     * Unary call @/ondewo.sip.Sip/SipReportAnsweringMachineDetected
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatus>
     */
    sipReportAnsweringMachineDetected(requestData, requestMetadata = new GrpcMetadata()) {
        return this.$raw
            .sipReportAnsweringMachineDetected(requestData, requestMetadata)
            .pipe(throwStatusErrors(), takeMessages());
    }
    /**
     * Unary call @/ondewo.sip.Sip/SipSetCallMediaControl
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<thisProto.SipStatus>
     */
    sipSetCallMediaControl(requestData, requestMetadata = new GrpcMetadata()) {
        return this.$raw
            .sipSetCallMediaControl(requestData, requestMetadata)
            .pipe(throwStatusErrors(), takeMessages());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.33", ngImport: i0, type: SipClient, deps: [{ token: GRPC_SIP_CLIENT_SETTINGS, optional: true }, { token: GRPC_CLIENT_FACTORY }, { token: i1.GrpcHandler }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.33", ngImport: i0, type: SipClient, providedIn: 'any' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.33", ngImport: i0, type: SipClient, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'any' }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [GRPC_SIP_CLIENT_SETTINGS]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [GRPC_CLIENT_FACTORY]
                }] }, { type: i1.GrpcHandler }] });

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
const TOKEN_PROVIDER = new InjectionToken("ONDEWO_SIP_TOKEN_PROVIDER");

/**
 * The HTTP / gRPC header under which the bearer credential is attached.
 *
 * Canonical `Authorization` casing: gRPC-web metadata keys are case-insensitive
 * and the HTTP/2 transport lower-cases header names on the wire, but the ONDEWO
 * SDKs standardize on the capitalized `Authorization` key in source.
 */
const AUTHORIZATION_HEADER = "Authorization";
/** The credential scheme prefix prepended to the raw access token. */
const BEARER_PREFIX = "Bearer ";
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
function resolveToken(result) {
    const source = isObservable(result)
        ? result
        : from(Promise.resolve(result));
    return new Observable((subscriber) => {
        const subscription = source.subscribe({
            next: (token) => subscriber.next(normalizeToken(token)),
            error: (caughtError) => subscriber.error(caughtError),
            complete: () => subscriber.complete()
        });
        return () => subscription.unsubscribe();
    });
}
/**
 * Build the `Authorization` header value for a resolved token, or `null` when
 * the token is absent.
 *
 * @param token a usable token, or `null`.
 * @returns the `"Bearer <token>"` string, or `null` when there is no token.
 */
function buildBearerValue(token) {
    return token === null ? null : `${BEARER_PREFIX}${token}`;
}
/**
 * Convenience wrapper: emit the ready-to-use `Authorization` header value, or
 * `null` when no token is available.
 *
 * @param result the raw value returned by `TokenProvider.getToken()`.
 * @returns an observable emitting the bearer header value, or `null`.
 */
function resolveBearerValue(result) {
    return new Observable((subscriber) => {
        const subscription = resolveToken(result).subscribe({
            next: (token) => subscriber.next(buildBearerValue(token)),
            error: (caughtError) => subscriber.error(caughtError),
            complete: () => subscriber.complete()
        });
        return () => subscription.unsubscribe();
    });
}
/**
 * Collapse every "no usable token" value to `null` and trim a real token.
 *
 * @param token the raw token emitted by the source.
 * @returns the trimmed token, or `null` when empty / whitespace-only / absent.
 */
function normalizeToken(token) {
    if (token === null || token === undefined) {
        return null;
    }
    const trimmed = token.trim();
    return trimmed.length === 0 ? null : trimmed;
}
/**
 * Wrap a synchronous value as a single-emission observable. Used by callers that
 * want to stay in the observable world without importing `rxjs` `of` directly.
 *
 * @param value the value to emit.
 * @returns an observable emitting `value` once and completing.
 */
function once(value) {
    return of(value);
}

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
function authHttpInterceptor(req, next) {
    if (req.headers.has(AUTHORIZATION_HEADER)) {
        return next(req);
    }
    const tokenProvider = inject(TOKEN_PROVIDER);
    return resolveBearerValue(tokenProvider.getToken()).pipe(switchMap((bearerValue) => {
        if (bearerValue === null) {
            return next(req);
        }
        const authorizedRequest = req.clone({
            setHeaders: { [AUTHORIZATION_HEADER]: bearerValue }
        });
        return next(authorizedRequest);
    }));
}

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
class AuthGrpcInterceptor {
    /**
     * @param tokenProvider the application-supplied {@link TokenProvider}, injected
     *   under the {@link TOKEN_PROVIDER} DI token, that yields the current access
     *   token.
     */
    constructor(tokenProvider) {
        this.tokenProvider = tokenProvider;
    }
    /**
     * Attach the bearer credential (when available) to the request metadata, then
     * delegate to the next handler in the chain.
     *
     * @param request the intercepted gRPC request.
     * @param next the next handler to pass the request through.
     * @returns the stream of gRPC events for the (possibly authorized) request.
     */
    intercept(request, next) {
        if (request.requestMetadata.has(AUTHORIZATION_HEADER)) {
            return next.handle(request);
        }
        return resolveBearerValue(this.tokenProvider.getToken()).pipe(switchMap((bearerValue) => {
            if (bearerValue !== null) {
                request.requestMetadata.set(AUTHORIZATION_HEADER, bearerValue);
            }
            return next.handle(request);
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.33", ngImport: i0, type: AuthGrpcInterceptor, deps: [{ token: TOKEN_PROVIDER }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.33", ngImport: i0, type: AuthGrpcInterceptor }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.33", ngImport: i0, type: AuthGrpcInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [TOKEN_PROVIDER]
                }] }] });

/**
 * Seconds of head-room subtracted from a token's `expires_in` so the background
 * refresh fires *before* the access token actually lapses (covers clock skew and
 * the round-trip to Keycloak). Mirrors the nodejs `REFRESH_SKEW_IN_S` and the
 * python `_EXPIRY_LEEWAY_S` references.
 */
const REFRESH_SKEW_IN_S = 30;
/**
 * Lower bound (in seconds) on the scheduled refresh delay, so a tiny or zero
 * `expires_in` cannot spin a hot refresh loop.
 */
const MIN_REFRESH_DELAY_IN_S = 1;
/**
 * DI token under which {@link KeycloakTokenProvider} reads its
 * {@link KeycloakTokenProviderConfig}. The consuming application provides a value
 * for it (see {@link provideKeycloakTokenProvider}).
 */
const KEYCLOAK_TOKEN_PROVIDER_CONFIG = new InjectionToken("ONDEWO_SIP_KEYCLOAK_TOKEN_PROVIDER_CONFIG");
/** Error raised on a missing/invalid configuration or any token-endpoint failure. */
class KeycloakAuthenticationError extends Error {
    /**
     * @param message a human-readable description of the configuration or token failure.
     */
    constructor(message) {
        super(message);
        this.name = "KeycloakAuthenticationError";
    }
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
class KeycloakTokenProvider {
    /**
     * @param http the Angular {@link HttpClient} used for the token-endpoint calls.
     * @param zone the {@link NgZone}; the background timer is armed outside Angular so it
     *   does not keep change detection / zone stability churning between refreshes.
     * @param config the {@link KeycloakTokenProviderConfig}, injected under
     *   {@link KEYCLOAK_TOKEN_PROVIDER_CONFIG}.
     */
    constructor(http, zone, config) {
        this.http = http;
        this.zone = zone;
        /** The current access token, or `null` before the first login / after the bounded loop lapses. */
        this.accessToken = null;
        /** The current refresh token, or `null` before any login completes. */
        this.refreshToken = null;
        /** Handle of the armed refresh timer, or `null` when no refresh is scheduled. */
        this.timer = null;
        /** Whether {@link ngOnDestroy} has run; suppresses any further (re-)scheduling. */
        this.stopped = false;
        /** Absolute epoch-ms deadline for the bounded loop, or `null` when unbounded. */
        this.deadlineInMs = null;
        /** The in-flight (or settled) one-time login promise; ensures login happens exactly once. */
        this.loginPromise = null;
        if (config === null) {
            throw new KeycloakAuthenticationError("KeycloakTokenProvider requires a KEYCLOAK_TOKEN_PROVIDER_CONFIG value; " +
                "register it with provideKeycloakTokenProvider({ ... })");
        }
        this.loginRequest = this.validateAndBuildLoginRequest(config);
        this.tokenEndpoint = KeycloakTokenProvider.buildTokenEndpoint(config.keycloakUrl, config.realm);
        this.clientId = config.clientId;
        this.tokenExpirationInS = config.tokenExpirationInS;
        // Stored for cross-SDK config parity; a no-op on the browser transport (see field doc).
        this.verifySsl = config.keycloakVerifySsl ?? true;
        if (config.refreshToken !== undefined) {
            this.refreshToken = config.refreshToken;
        }
    }
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
    getToken() {
        if (this.loginPromise === null) {
            this.loginPromise = this.bootstrap();
        }
        if (this.accessToken !== null) {
            return this.accessToken;
        }
        return this.loginPromise.then(() => this.accessToken);
    }
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
    get keycloakVerifySsl() {
        return this.verifySsl;
    }
    /** Stop the background refresh loop when the provider is torn down. Idempotent. */
    ngOnDestroy() {
        this.stopped = true;
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    /**
     * Perform the one-time login (offline-token or ROPC) and arm the first refresh.
     *
     * @returns a promise that resolves once the first token is stored and the refresh is armed.
     * @throws {@link KeycloakAuthenticationError} if the token endpoint fails or returns no
     *   `access_token` / `refresh_token`.
     */
    async bootstrap() {
        const response = await this.postTokenRequest(this.loginRequest);
        this.storeTokens(response);
        if (this.refreshToken === null) {
            throw new KeycloakAuthenticationError("Keycloak token response did not contain a refresh_token; the SDK client must have " +
                "directAccessGrants + the offline_access scope (e.g. ondewo-nlu-cai-sdk-public)");
        }
        if (this.tokenExpirationInS !== undefined) {
            this.deadlineInMs = Date.now() + (this.tokenExpirationInS * 1000);
        }
        this.scheduleRefresh(response.expires_in);
    }
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
    async refresh() {
        if (this.deadlineInMs !== null && Date.now() >= this.deadlineInMs) {
            this.ngOnDestroy();
            return;
        }
        const response = await this.postTokenRequest({
            grant_type: "refresh_token",
            client_id: this.clientId,
            // refreshToken is non-null here (bootstrap stored it before arming any refresh), but TS keeps
            // the field's `string | null` type across the async boundary, so the assertion is required.
            /* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- required under the build tsconfig */
            refresh_token: this.refreshToken
        });
        this.storeTokens(response);
        this.scheduleRefresh(response.expires_in);
    }
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
    scheduleRefresh(expiresInRaw) {
        if (this.stopped) {
            return;
        }
        const expiresInS = typeof expiresInRaw === "number" && expiresInRaw > 0 ? expiresInRaw : MIN_REFRESH_DELAY_IN_S;
        let delayInS = Math.max(expiresInS - REFRESH_SKEW_IN_S, MIN_REFRESH_DELAY_IN_S);
        if (this.deadlineInMs !== null) {
            const remainingInMs = this.deadlineInMs - Date.now();
            if (remainingInMs <= 0) {
                this.ngOnDestroy();
                return;
            }
            delayInS = Math.min(delayInS, remainingInMs / 1000);
        }
        // Arm outside Angular so the recurring timer does not keep the zone unstable.
        this.zone.runOutsideAngular(() => {
            this.timer = setTimeout(() => {
                void this.refresh();
            }, delayInS * 1000);
        });
    }
    /**
     * POST a form-encoded body to the token endpoint and return the parsed JSON.
     *
     * @param params the form fields to URL-encode (grant type, client id, credentials).
     * @returns the parsed {@link KeycloakTokenResponse}.
     * @throws {@link KeycloakAuthenticationError} on a transport error.
     */
    async postTokenRequest(params) {
        const body = new URLSearchParams(params).toString();
        const headers = new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
        });
        try {
            return await firstValueFrom(this.http.post(this.tokenEndpoint, body, { headers }));
        }
        catch (caughtError) {
            throw new KeycloakAuthenticationError(`Keycloak token endpoint request failed: ${KeycloakTokenProvider.describeError(caughtError)}`);
        }
    }
    /**
     * Store the access token (and any rotated refresh token) from a token response.
     *
     * Keycloak may omit the refresh token on a same-token refresh; the previous one is
     * kept in that case so it is never blanked out.
     *
     * @param response the parsed token-endpoint response.
     * @throws {@link KeycloakAuthenticationError} if the response carries no `access_token`.
     */
    storeTokens(response) {
        if (typeof response.access_token !== "string" || response.access_token.length === 0) {
            throw new KeycloakAuthenticationError("Keycloak token response did not contain an access_token");
        }
        this.accessToken = response.access_token;
        if (typeof response.refresh_token === "string" && response.refresh_token.length > 0) {
            this.refreshToken = response.refresh_token;
        }
    }
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
    validateAndBuildLoginRequest(config) {
        for (const key of ["keycloakUrl", "realm", "clientId"]) {
            if (typeof config[key] !== "string" || config[key].length === 0) {
                throw new KeycloakAuthenticationError(`KeycloakTokenProviderConfig.${key} is required and must be a non-empty string`);
            }
        }
        const refreshToken = config.refreshToken;
        const username = config.username;
        const password = config.password;
        const hasRefreshToken = typeof refreshToken === "string" && refreshToken.length > 0;
        const hasCredentials = typeof username === "string" && username.length > 0 && typeof password === "string" && password.length > 0;
        if (hasRefreshToken === hasCredentials) {
            throw new KeycloakAuthenticationError("KeycloakTokenProviderConfig requires exactly one of: a non-empty refreshToken, " +
                "or a non-empty username + password pair");
        }
        if (refreshToken !== undefined && refreshToken.length > 0) {
            return {
                grant_type: "refresh_token",
                client_id: config.clientId,
                refresh_token: refreshToken
            };
        }
        // hasCredentials === !hasRefreshToken here guarantees both are non-empty strings, but TS does
        // not propagate that from the boolean above; the assertions narrow them for the request shape.
        return {
            grant_type: "password",
            client_id: config.clientId,
            /* eslint-disable @typescript-eslint/no-unnecessary-type-assertion -- required under the build tsconfig */
            username: username,
            password: password,
            /* eslint-enable @typescript-eslint/no-unnecessary-type-assertion */
            scope: "offline_access"
        };
    }
    /**
     * Build the OIDC token endpoint URL for a realm, tolerating a trailing slash.
     *
     * @param keycloakUrl the base Keycloak URL (trailing slashes are stripped).
     * @param realm the realm name; URL-encoded into the path.
     * @returns the fully-qualified `.../protocol/openid-connect/token` endpoint URL.
     */
    static buildTokenEndpoint(keycloakUrl, realm) {
        const base = keycloakUrl.replace(/\/+$/, "");
        return `${base}/realms/${encodeURIComponent(realm)}/protocol/openid-connect/token`;
    }
    /**
     * Render an arbitrary thrown value into a short message for error wrapping.
     *
     * @param caughtError the value thrown by the failing token call.
     * @returns the error's `message` when it is an `Error`, otherwise its string form.
     */
    static describeError(caughtError) {
        if (caughtError instanceof Error) {
            return caughtError.message;
        }
        return typeof caughtError === "string" ? caughtError : JSON.stringify(caughtError);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.33", ngImport: i0, type: KeycloakTokenProvider, deps: [{ token: i1$1.HttpClient }, { token: i0.NgZone }, { token: KEYCLOAK_TOKEN_PROVIDER_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.33", ngImport: i0, type: KeycloakTokenProvider, providedIn: "root" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.33", ngImport: i0, type: KeycloakTokenProvider, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: i1$1.HttpClient }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [KEYCLOAK_TOKEN_PROVIDER_CONFIG]
                }] }] });

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
function provideOndewoSipAuth(tokenProvider) {
    const providers = [
        tokenProvider,
        { provide: TOKEN_PROVIDER, useExisting: tokenProvider },
        { provide: GRPC_INTERCEPTORS, useClass: AuthGrpcInterceptor, multi: true }
    ];
    return makeEnvironmentProviders(providers);
}
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
function provideKeycloakTokenProvider(config) {
    return makeEnvironmentProviders([{ provide: KEYCLOAK_TOKEN_PROVIDER_CONFIG, useValue: config }]);
}

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
/**
 * Certificate / key fields of the other ONDEWO SDKs' configs (camelCase and snake_case) that a
 * browser cannot use. A non-empty value in any of them makes {@link buildGrpcWebHost} throw.
 */
const BROWSER_UNSUPPORTED_TLS_FIELDS = [
    "grpcCert",
    "grpcClientCert",
    "grpcClientKey",
    "grpc_cert",
    "grpc_client_cert",
    "grpc_client_key"
];
/** Raised for an unusable {@link GrpcWebEndpointConfig}. The message names fields, never their values. */
class GrpcWebEndpointError extends Error {
    /**
     * @param message a description of the problem that names the offending field.
     */
    constructor(message) {
        super(message);
        this.name = "GrpcWebEndpointError";
    }
}
/** A URL scheme at the start of `host` (`https://…`). */
const SCHEME_PATTERN = /^[a-z][a-z0-9+.-]*:\/\//i;
/** A bare IPv6 literal: hex digits, dots (embedded IPv4) and at least two colons. */
const BARE_IPV6_PATTERN = /^(?=(?:[^:]*:){2})[0-9a-f:.]+$/i;
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
function buildGrpcWebHost(config) {
    const fields = config;
    for (const field of BROWSER_UNSUPPORTED_TLS_FIELDS) {
        const value = fields[field];
        if (value !== undefined && value !== null && value !== "") {
            throw new GrpcWebEndpointError(`GrpcWebEndpointConfig.${field} is not supported by a browser gRPC-web client: the browser owns the TLS ` +
                "handshake, trusts its own certificate store and presents a client certificate only from the browser/OS " +
                "store. Remove the field (never ship a private key to a browser); see the README section " +
                "'TLS, mutual TLS and certificates'.");
        }
    }
    const host = config.host;
    if (typeof host !== "string" || host.trim() === "") {
        throw new GrpcWebEndpointError("GrpcWebEndpointConfig.host must be a non-empty string");
    }
    const secure = config.useSecureChannel !== false;
    if (SCHEME_PATTERN.test(host)) {
        if (config.port !== undefined) {
            throw new GrpcWebEndpointError("GrpcWebEndpointConfig.port must be omitted when GrpcWebEndpointConfig.host is a URL; put the port in the URL");
        }
        let url;
        try {
            url = new URL(host);
        }
        catch {
            throw new GrpcWebEndpointError("GrpcWebEndpointConfig.host is not a valid URL");
        }
        if (url.protocol !== "https:" && url.protocol !== "http:") {
            throw new GrpcWebEndpointError("GrpcWebEndpointConfig.host must use the http:// or https:// scheme");
        }
        if (url.protocol === "http:") {
            if (secure) {
                throw new GrpcWebEndpointError("GrpcWebEndpointConfig.host uses http:// but useSecureChannel is true; use an https:// URL " +
                    "or set useSecureChannel: false");
            }
            // URL.host leaves out any user:password@ part, so the warning cannot leak credentials
            warnInsecure(url.host);
        }
        return host;
    }
    let bareHost = host;
    if (!host.startsWith("[") && host.includes(":")) {
        if (!BARE_IPV6_PATTERN.test(host)) {
            throw new GrpcWebEndpointError("GrpcWebEndpointConfig.host must not contain a port; set GrpcWebEndpointConfig.port instead");
        }
        bareHost = `[${host}]`;
    }
    let authority = bareHost;
    if (config.port !== undefined) {
        const port = Number(config.port);
        if (String(config.port).trim() === "" || !Number.isInteger(port) || port < 1 || port > 65535) {
            throw new GrpcWebEndpointError("GrpcWebEndpointConfig.port must be an integer between 1 and 65535");
        }
        authority = `${bareHost}:${port}`;
    }
    if (secure) {
        return `https://${authority}`;
    }
    warnInsecure(authority);
    return `http://${authority}`;
}
/**
 * Warn, through the console the host application already uses, that requests (and bearer
 * tokens) to `authority` travel unencrypted.
 *
 * @param authority the `host:port` the insecure channel targets.
 */
function warnInsecure(authority) {
    console.warn(`ONDEWO gRPC-web: insecure http:// endpoint ${authority}; requests and bearer tokens are sent unencrypted. ` +
        "Use useSecureChannel: true (https://) outside local development.");
}

/**
 * Public auth surface for `@ondewo/sip-client-angular`.
 *
 * The consuming application supplies the current Keycloak access token through a
 * {@link TokenProvider} (fed from `keycloak-js` / `keycloak-angular`); this
 * library attaches it as an `Authorization: Bearer <token>` credential to
 * outgoing gRPC-web and HTTP requests. No OAuth/OIDC flow is performed here.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AUTHORIZATION_HEADER, AnsweringMachineDetectionResult, AuthGrpcInterceptor, BEARER_PREFIX, BROWSER_UNSUPPORTED_TLS_FIELDS, GRPC_SIP_CLIENT_SETTINGS, GrpcWebEndpointError, KEYCLOAK_TOKEN_PROVIDER_CONFIG, KeycloakAuthenticationError, KeycloakTokenProvider, MIN_REFRESH_DELAY_IN_S, MediaControlOwner, MediaControlSetting, REFRESH_SKEW_IN_S, SipCallAudioConfig, SipCallAudioEndReason, SipCallAudioEnded, SipCallAudioFrame, SipCallAudioMode, SipCallAudioRequest, SipCallAudioResponse, SipCallAudioStarted, SipCallAudioStats, SipClient, SipEndCallRequest, SipPlayWavFilesRequest, SipRegisterAccountRequest, SipReportAnsweringMachineDetectedRequest, SipSetCallMediaControlRequest, SipStartCallRequest, SipStartSessionRequest, SipStatus, SipStatusHistoryResponse, SipTransferCallRequest, TOKEN_PROVIDER, authHttpInterceptor, buildBearerValue, buildGrpcWebHost, provideKeycloakTokenProvider, provideOndewoSipAuth, resolveBearerValue, resolveToken };
//# sourceMappingURL=ondewo-sip-client-angular.mjs.map
