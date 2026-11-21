import { GrpcCallType, GrpcMetadata, uint8ArrayToBase64 } from "@ngx-grpc/common";
import { BinaryReader, BinaryWriter } from "google-protobuf";
import * as googleProtobuf001 from "@ngx-grpc/well-known-types";
import * as i0 from "@angular/core";
import { Inject, Injectable, InjectionToken, NgZone, Optional, inject, makeEnvironmentProviders } from "@angular/core";
import * as i1 from "@ngx-grpc/core";
import { GRPC_CLIENT_FACTORY, GRPC_INTERCEPTORS, takeMessages, throwStatusErrors } from "@ngx-grpc/core";
import { Observable, catchError, firstValueFrom, from, isObservable, map, of, switchMap, throwError, timeout } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
var SipTransferDelegation;
(function(SipTransferDelegation) {
	SipTransferDelegation[SipTransferDelegation["SIP_TRANSFER_DELEGATION_UNSPECIFIED"] = 0] = "SIP_TRANSFER_DELEGATION_UNSPECIFIED";
	SipTransferDelegation[SipTransferDelegation["SIP_TRANSFER_DELEGATION_CLAIM"] = 1] = "SIP_TRANSFER_DELEGATION_CLAIM";
	SipTransferDelegation[SipTransferDelegation["SIP_TRANSFER_DELEGATION_EXECUTE"] = 2] = "SIP_TRANSFER_DELEGATION_EXECUTE";
	SipTransferDelegation[SipTransferDelegation["SIP_TRANSFER_DELEGATION_DISCARD"] = 3] = "SIP_TRANSFER_DELEGATION_DISCARD";
})(SipTransferDelegation || (SipTransferDelegation = {}));
var MediaControlSetting;
(function(MediaControlSetting) {
	MediaControlSetting[MediaControlSetting["MEDIA_CONTROL_SETTING_UNCHANGED"] = 0] = "MEDIA_CONTROL_SETTING_UNCHANGED";
	MediaControlSetting[MediaControlSetting["MEDIA_CONTROL_SETTING_ON"] = 1] = "MEDIA_CONTROL_SETTING_ON";
	MediaControlSetting[MediaControlSetting["MEDIA_CONTROL_SETTING_OFF"] = 2] = "MEDIA_CONTROL_SETTING_OFF";
})(MediaControlSetting || (MediaControlSetting = {}));
var MediaControlOwner;
(function(MediaControlOwner) {
	MediaControlOwner[MediaControlOwner["MEDIA_CONTROL_OWNER_UNSPECIFIED"] = 0] = "MEDIA_CONTROL_OWNER_UNSPECIFIED";
	MediaControlOwner[MediaControlOwner["MEDIA_CONTROL_OWNER_OPERATOR"] = 1] = "MEDIA_CONTROL_OWNER_OPERATOR";
	MediaControlOwner[MediaControlOwner["MEDIA_CONTROL_OWNER_PARTICIPANT"] = 2] = "MEDIA_CONTROL_OWNER_PARTICIPANT";
})(MediaControlOwner || (MediaControlOwner = {}));
var SipWarmTransferOutcome;
(function(SipWarmTransferOutcome) {
	SipWarmTransferOutcome[SipWarmTransferOutcome["SIP_WARM_TRANSFER_OUTCOME_UNSPECIFIED"] = 0] = "SIP_WARM_TRANSFER_OUTCOME_UNSPECIFIED";
	SipWarmTransferOutcome[SipWarmTransferOutcome["SIP_WARM_TRANSFER_OUTCOME_DECLINED"] = 1] = "SIP_WARM_TRANSFER_OUTCOME_DECLINED";
	SipWarmTransferOutcome[SipWarmTransferOutcome["SIP_WARM_TRANSFER_OUTCOME_UNREACHABLE"] = 2] = "SIP_WARM_TRANSFER_OUTCOME_UNREACHABLE";
	SipWarmTransferOutcome[SipWarmTransferOutcome["SIP_WARM_TRANSFER_OUTCOME_DELEGATION_EXPIRED"] = 3] = "SIP_WARM_TRANSFER_OUTCOME_DELEGATION_EXPIRED";
})(SipWarmTransferOutcome || (SipWarmTransferOutcome = {}));
var SipWarmTransferOutcomeNoticeStatus;
(function(SipWarmTransferOutcomeNoticeStatus) {
	SipWarmTransferOutcomeNoticeStatus[SipWarmTransferOutcomeNoticeStatus["SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_UNSPECIFIED"] = 0] = "SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_UNSPECIFIED";
	SipWarmTransferOutcomeNoticeStatus[SipWarmTransferOutcomeNoticeStatus["SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_QUEUED"] = 1] = "SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_QUEUED";
	SipWarmTransferOutcomeNoticeStatus[SipWarmTransferOutcomeNoticeStatus["SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_DUPLICATE"] = 2] = "SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_DUPLICATE";
	SipWarmTransferOutcomeNoticeStatus[SipWarmTransferOutcomeNoticeStatus["SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_DISABLED"] = 3] = "SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_DISABLED";
	SipWarmTransferOutcomeNoticeStatus[SipWarmTransferOutcomeNoticeStatus["SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_INVALID"] = 4] = "SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_INVALID";
	SipWarmTransferOutcomeNoticeStatus[SipWarmTransferOutcomeNoticeStatus["SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_PENDING"] = 5] = "SIP_WARM_TRANSFER_OUTCOME_NOTICE_STATUS_PENDING";
})(SipWarmTransferOutcomeNoticeStatus || (SipWarmTransferOutcomeNoticeStatus = {}));
var SipCallAudioMode;
(function(SipCallAudioMode) {
	SipCallAudioMode[SipCallAudioMode["SIP_CALL_AUDIO_MODE_UNSPECIFIED"] = 0] = "SIP_CALL_AUDIO_MODE_UNSPECIFIED";
	SipCallAudioMode[SipCallAudioMode["SIP_CALL_AUDIO_MODE_LISTEN"] = 1] = "SIP_CALL_AUDIO_MODE_LISTEN";
	SipCallAudioMode[SipCallAudioMode["SIP_CALL_AUDIO_MODE_TALK"] = 2] = "SIP_CALL_AUDIO_MODE_TALK";
})(SipCallAudioMode || (SipCallAudioMode = {}));
var SipCallAudioEndReason;
(function(SipCallAudioEndReason) {
	SipCallAudioEndReason[SipCallAudioEndReason["SIP_CALL_AUDIO_END_REASON_UNSPECIFIED"] = 0] = "SIP_CALL_AUDIO_END_REASON_UNSPECIFIED";
	SipCallAudioEndReason[SipCallAudioEndReason["SIP_CALL_AUDIO_END_REASON_CLIENT_CLOSED"] = 1] = "SIP_CALL_AUDIO_END_REASON_CLIENT_CLOSED";
	SipCallAudioEndReason[SipCallAudioEndReason["SIP_CALL_AUDIO_END_REASON_CALL_ENDED"] = 2] = "SIP_CALL_AUDIO_END_REASON_CALL_ENDED";
	SipCallAudioEndReason[SipCallAudioEndReason["SIP_CALL_AUDIO_END_REASON_CALL_TRANSFERRED"] = 3] = "SIP_CALL_AUDIO_END_REASON_CALL_TRANSFERRED";
	SipCallAudioEndReason[SipCallAudioEndReason["SIP_CALL_AUDIO_END_REASON_MAX_DURATION"] = 4] = "SIP_CALL_AUDIO_END_REASON_MAX_DURATION";
	SipCallAudioEndReason[SipCallAudioEndReason["SIP_CALL_AUDIO_END_REASON_STALLED"] = 5] = "SIP_CALL_AUDIO_END_REASON_STALLED";
	SipCallAudioEndReason[SipCallAudioEndReason["SIP_CALL_AUDIO_END_REASON_INTERNAL"] = 6] = "SIP_CALL_AUDIO_END_REASON_INTERNAL";
})(SipCallAudioEndReason || (SipCallAudioEndReason = {}));
var SipEndCallRequest = class SipEndCallRequest {
	static {
		this.id = "ondewo.sip.SipEndCallRequest";
	}
	static deserializeBinary(bytes) {
		const instance = new SipEndCallRequest();
		SipEndCallRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.hardHangup = _instance.hardHangup || false;
		_instance.endReason = _instance.endReason || 0;
		_instance.amdResult = _instance.amdResult || void 0;
	}
	static deserializeBinaryFromReader(_instance, _reader) {
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
					_reader.readMessage(_instance.amdResult, AnsweringMachineDetectionResult.deserializeBinaryFromReader);
					break;
				default: _reader.skipField();
			}
		}
		SipEndCallRequest.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.hardHangup) _writer.writeBool(1, _instance.hardHangup);
		if (_instance.endReason) _writer.writeEnum(2, _instance.endReason);
		if (_instance.amdResult) _writer.writeMessage(3, _instance.amdResult, AnsweringMachineDetectionResult.serializeBinaryToWriter);
	}
	constructor(_value) {
		_value = _value || {};
		this.hardHangup = _value.hardHangup;
		this.endReason = _value.endReason;
		this.amdResult = _value.amdResult ? new AnsweringMachineDetectionResult(_value.amdResult) : void 0;
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
	serializeBinary() {
		const writer = new BinaryWriter();
		SipEndCallRequest.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return {
			hardHangup: this.hardHangup,
			endReason: this.endReason,
			amdResult: this.amdResult ? this.amdResult.toObject() : void 0
		};
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			hardHangup: this.hardHangup,
			endReason: SipEndCallRequest.EndCallReason[this.endReason === null || this.endReason === void 0 ? 0 : this.endReason],
			amdResult: this.amdResult ? this.amdResult.toProtobufJSON(options) : null
		};
	}
};
(function(SipEndCallRequest) {
	(function(EndCallReason) {
		EndCallReason[EndCallReason["END_CALL_REASON_UNSPECIFIED"] = 0] = "END_CALL_REASON_UNSPECIFIED";
		EndCallReason[EndCallReason["ANSWERING_MACHINE"] = 1] = "ANSWERING_MACHINE";
		EndCallReason[EndCallReason["ANSWERING_MACHINE_VOICE_MESSAGE_LEFT"] = 2] = "ANSWERING_MACHINE_VOICE_MESSAGE_LEFT";
		EndCallReason[EndCallReason["END_CALL_REASON_TRANSFERRED"] = 3] = "END_CALL_REASON_TRANSFERRED";
	})(SipEndCallRequest.EndCallReason || (SipEndCallRequest.EndCallReason = {}));
})(SipEndCallRequest || (SipEndCallRequest = {}));
var SipReportAnsweringMachineDetectedRequest = class SipReportAnsweringMachineDetectedRequest {
	static {
		this.id = "ondewo.sip.SipReportAnsweringMachineDetectedRequest";
	}
	static deserializeBinary(bytes) {
		const instance = new SipReportAnsweringMachineDetectedRequest();
		SipReportAnsweringMachineDetectedRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.amdResult = _instance.amdResult || void 0;
	}
	static deserializeBinaryFromReader(_instance, _reader) {
		while (_reader.nextField()) {
			if (_reader.isEndGroup()) break;
			switch (_reader.getFieldNumber()) {
				case 1:
					_instance.amdResult = new AnsweringMachineDetectionResult();
					_reader.readMessage(_instance.amdResult, AnsweringMachineDetectionResult.deserializeBinaryFromReader);
					break;
				default: _reader.skipField();
			}
		}
		SipReportAnsweringMachineDetectedRequest.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.amdResult) _writer.writeMessage(1, _instance.amdResult, AnsweringMachineDetectionResult.serializeBinaryToWriter);
	}
	constructor(_value) {
		_value = _value || {};
		this.amdResult = _value.amdResult ? new AnsweringMachineDetectionResult(_value.amdResult) : void 0;
		SipReportAnsweringMachineDetectedRequest.refineValues(this);
	}
	get amdResult() {
		return this._amdResult;
	}
	set amdResult(value) {
		this._amdResult = value;
	}
	serializeBinary() {
		const writer = new BinaryWriter();
		SipReportAnsweringMachineDetectedRequest.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return { amdResult: this.amdResult ? this.amdResult.toObject() : void 0 };
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return { amdResult: this.amdResult ? this.amdResult.toProtobufJSON(options) : null };
	}
};
var AnsweringMachineDetectionResult = class AnsweringMachineDetectionResult {
	static {
		this.id = "ondewo.sip.AnsweringMachineDetectionResult";
	}
	static deserializeBinary(bytes) {
		const instance = new AnsweringMachineDetectionResult();
		AnsweringMachineDetectionResult.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.verdict = _instance.verdict || 0;
		_instance.cause = _instance.cause || 0;
		_instance.confidence = _instance.confidence || 0;
		_instance.decisionMs = _instance.decisionMs || 0;
		_instance.ruleId = _instance.ruleId || "";
		_instance.matchedCueIds = _instance.matchedCueIds || [];
		_instance.actionTaken = _instance.actionTaken || 0;
		_instance.callId = _instance.callId || "";
	}
	static deserializeBinaryFromReader(_instance, _reader) {
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
					(_instance.matchedCueIds = _instance.matchedCueIds || []).push(_reader.readString());
					break;
				case 7:
					_instance.actionTaken = _reader.readEnum();
					break;
				case 8:
					_instance.callId = _reader.readString();
					break;
				default: _reader.skipField();
			}
		}
		AnsweringMachineDetectionResult.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.verdict) _writer.writeEnum(1, _instance.verdict);
		if (_instance.cause) _writer.writeEnum(2, _instance.cause);
		if (_instance.confidence) _writer.writeFloat(3, _instance.confidence);
		if (_instance.decisionMs) _writer.writeInt32(4, _instance.decisionMs);
		if (_instance.ruleId) _writer.writeString(5, _instance.ruleId);
		if (_instance.matchedCueIds && _instance.matchedCueIds.length) _writer.writeRepeatedString(6, _instance.matchedCueIds);
		if (_instance.actionTaken) _writer.writeEnum(7, _instance.actionTaken);
		if (_instance.callId) _writer.writeString(8, _instance.callId);
	}
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
	serializeBinary() {
		const writer = new BinaryWriter();
		AnsweringMachineDetectionResult.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
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
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			verdict: AnsweringMachineDetectionResult.Verdict[this.verdict === null || this.verdict === void 0 ? 0 : this.verdict],
			cause: AnsweringMachineDetectionResult.Cause[this.cause === null || this.cause === void 0 ? 0 : this.cause],
			confidence: this.confidence,
			decisionMs: this.decisionMs,
			ruleId: this.ruleId,
			matchedCueIds: (this.matchedCueIds || []).slice(),
			actionTaken: AnsweringMachineDetectionResult.ActionTaken[this.actionTaken === null || this.actionTaken === void 0 ? 0 : this.actionTaken],
			callId: this.callId
		};
	}
};
(function(AnsweringMachineDetectionResult) {
	(function(Verdict) {
		Verdict[Verdict["VERDICT_UNSPECIFIED"] = 0] = "VERDICT_UNSPECIFIED";
		Verdict[Verdict["HUMAN"] = 1] = "HUMAN";
		Verdict[Verdict["MACHINE"] = 2] = "MACHINE";
		Verdict[Verdict["IVR"] = 3] = "IVR";
		Verdict[Verdict["FAX"] = 4] = "FAX";
		Verdict[Verdict["NETWORK_ANNOUNCEMENT"] = 5] = "NETWORK_ANNOUNCEMENT";
		Verdict[Verdict["CALL_SCREENING"] = 6] = "CALL_SCREENING";
		Verdict[Verdict["NO_SPEECH"] = 7] = "NO_SPEECH";
		Verdict[Verdict["UNKNOWN"] = 8] = "UNKNOWN";
	})(AnsweringMachineDetectionResult.Verdict || (AnsweringMachineDetectionResult.Verdict = {}));
	(function(Cause) {
		Cause[Cause["CAUSE_UNSPECIFIED"] = 0] = "CAUSE_UNSPECIFIED";
		Cause[Cause["CADENCE"] = 1] = "CADENCE";
		Cause[Cause["KEYWORD"] = 2] = "KEYWORD";
		Cause[Cause["BEEP"] = 3] = "BEEP";
		Cause[Cause["TONE"] = 4] = "TONE";
		Cause[Cause["CADENCE_AND_KEYWORD"] = 5] = "CADENCE_AND_KEYWORD";
		Cause[Cause["CADENCE_AND_BEEP"] = 6] = "CADENCE_AND_BEEP";
		Cause[Cause["TIMEOUT"] = 7] = "TIMEOUT";
		Cause[Cause["SILENCE"] = 8] = "SILENCE";
	})(AnsweringMachineDetectionResult.Cause || (AnsweringMachineDetectionResult.Cause = {}));
	(function(ActionTaken) {
		ActionTaken[ActionTaken["ACTION_TAKEN_UNSPECIFIED"] = 0] = "ACTION_TAKEN_UNSPECIFIED";
		ActionTaken[ActionTaken["HUNG_UP"] = 1] = "HUNG_UP";
		ActionTaken[ActionTaken["CONTINUED"] = 2] = "CONTINUED";
		ActionTaken[ActionTaken["DETECT_ONLY"] = 3] = "DETECT_ONLY";
		ActionTaken[ActionTaken["LEFT_VOICE_MESSAGE"] = 4] = "LEFT_VOICE_MESSAGE";
	})(AnsweringMachineDetectionResult.ActionTaken || (AnsweringMachineDetectionResult.ActionTaken = {}));
})(AnsweringMachineDetectionResult || (AnsweringMachineDetectionResult = {}));
var SipStartCallRequest = class SipStartCallRequest {
	static {
		this.id = "ondewo.sip.SipStartCallRequest";
	}
	static deserializeBinary(bytes) {
		const instance = new SipStartCallRequest();
		SipStartCallRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.calleeId = _instance.calleeId || "";
		_instance.headers = _instance.headers || {};
	}
	static deserializeBinaryFromReader(_instance, _reader) {
		while (_reader.nextField()) {
			if (_reader.isEndGroup()) break;
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
				default: _reader.skipField();
			}
		}
		SipStartCallRequest.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.calleeId) _writer.writeString(1, _instance.calleeId);
		if (!!_instance.headers) {
			const keys_2 = Object.keys(_instance.headers);
			if (keys_2.length) {
				const repeated_2 = keys_2.map((key) => ({
					key,
					value: _instance.headers[key]
				})).reduce((r, v) => [...r, v], []);
				_writer.writeRepeatedMessage(2, repeated_2, SipStartCallRequest.HeadersEntry.serializeBinaryToWriter);
			}
		}
	}
	constructor(_value) {
		_value = _value || {};
		this.calleeId = _value.calleeId;
		this.headers = _value.headers ? Object.keys(_value.headers).reduce((r, k) => ({
			...r,
			[k]: _value.headers[k]
		}), {}) : {}, SipStartCallRequest.refineValues(this);
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
	serializeBinary() {
		const writer = new BinaryWriter();
		SipStartCallRequest.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return {
			calleeId: this.calleeId,
			headers: this.headers ? Object.keys(this.headers).reduce((r, k) => ({
				...r,
				[k]: this.headers[k]
			}), {}) : {}
		};
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			calleeId: this.calleeId,
			headers: this.headers ? Object.keys(this.headers).reduce((r, k) => ({
				...r,
				[k]: this.headers[k]
			}), {}) : {}
		};
	}
};
(function(SipStartCallRequest) {
	class HeadersEntry {
		static {
			this.id = "ondewo.sip.SipStartCallRequest.HeadersEntry";
		}
		static deserializeBinary(bytes) {
			const instance = new HeadersEntry();
			HeadersEntry.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
			return instance;
		}
		static refineValues(_instance) {
			_instance.key = _instance.key || "";
			_instance.value = _instance.value || "";
		}
		static deserializeBinaryFromReader(_instance, _reader) {
			while (_reader.nextField()) {
				if (_reader.isEndGroup()) break;
				switch (_reader.getFieldNumber()) {
					case 1:
						_instance.key = _reader.readString();
						break;
					case 2:
						_instance.value = _reader.readString();
						break;
					default: _reader.skipField();
				}
			}
			HeadersEntry.refineValues(_instance);
		}
		static serializeBinaryToWriter(_instance, _writer) {
			if (_instance.key) _writer.writeString(1, _instance.key);
			if (_instance.value) _writer.writeString(2, _instance.value);
		}
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
		serializeBinary() {
			const writer = new BinaryWriter();
			HeadersEntry.serializeBinaryToWriter(this, writer);
			return writer.getResultBuffer();
		}
		toObject() {
			return {
				key: this.key,
				value: this.value
			};
		}
		toJSON() {
			return this.toObject();
		}
		toProtobufJSON(options) {
			return {
				key: this.key,
				value: this.value
			};
		}
	}
	SipStartCallRequest.HeadersEntry = HeadersEntry;
})(SipStartCallRequest || (SipStartCallRequest = {}));
var SipRegisterAccountRequest = class SipRegisterAccountRequest {
	static {
		this.id = "ondewo.sip.SipRegisterAccountRequest";
	}
	static deserializeBinary(bytes) {
		const instance = new SipRegisterAccountRequest();
		SipRegisterAccountRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.accountName = _instance.accountName || "";
		_instance.password = _instance.password || "";
		_instance.authUsername = _instance.authUsername || "";
		_instance.outboundProxy = _instance.outboundProxy || "";
	}
	static deserializeBinaryFromReader(_instance, _reader) {
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
				default: _reader.skipField();
			}
		}
		SipRegisterAccountRequest.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.accountName) _writer.writeString(1, _instance.accountName);
		if (_instance.password) _writer.writeString(2, _instance.password);
		if (_instance.authUsername) _writer.writeString(3, _instance.authUsername);
		if (_instance.outboundProxy) _writer.writeString(4, _instance.outboundProxy);
	}
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
	serializeBinary() {
		const writer = new BinaryWriter();
		SipRegisterAccountRequest.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return {
			accountName: this.accountName,
			password: this.password,
			authUsername: this.authUsername,
			outboundProxy: this.outboundProxy
		};
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			accountName: this.accountName,
			password: this.password,
			authUsername: this.authUsername,
			outboundProxy: this.outboundProxy
		};
	}
};
var SipStartSessionRequest = class SipStartSessionRequest {
	static {
		this.id = "ondewo.sip.SipStartSessionRequest";
	}
	static deserializeBinary(bytes) {
		const instance = new SipStartSessionRequest();
		SipStartSessionRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.accountName = _instance.accountName || "";
		_instance.autoAnswerInterval = _instance.autoAnswerInterval || 0;
	}
	static deserializeBinaryFromReader(_instance, _reader) {
		while (_reader.nextField()) {
			if (_reader.isEndGroup()) break;
			switch (_reader.getFieldNumber()) {
				case 1:
					_instance.accountName = _reader.readString();
					break;
				case 2:
					_instance.autoAnswerInterval = _reader.readInt32();
					break;
				default: _reader.skipField();
			}
		}
		SipStartSessionRequest.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.accountName) _writer.writeString(1, _instance.accountName);
		if (_instance.autoAnswerInterval) _writer.writeInt32(2, _instance.autoAnswerInterval);
	}
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
	serializeBinary() {
		const writer = new BinaryWriter();
		SipStartSessionRequest.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return {
			accountName: this.accountName,
			autoAnswerInterval: this.autoAnswerInterval
		};
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			accountName: this.accountName,
			autoAnswerInterval: this.autoAnswerInterval
		};
	}
};
var SipTransferCallRequest = class SipTransferCallRequest {
	static {
		this.id = "ondewo.sip.SipTransferCallRequest";
	}
	static deserializeBinary(bytes) {
		const instance = new SipTransferCallRequest();
		SipTransferCallRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.transferId = _instance.transferId || "";
		_instance.headers = _instance.headers || {};
		_instance.outcomeTimeoutMs = _instance.outcomeTimeoutMs || 0;
		_instance.delegation = _instance.delegation || 0;
		_instance.delegatedRequestId = _instance.delegatedRequestId || "";
	}
	static deserializeBinaryFromReader(_instance, _reader) {
		while (_reader.nextField()) {
			if (_reader.isEndGroup()) break;
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
				case 4:
					_instance.delegation = _reader.readEnum();
					break;
				case 5:
					_instance.delegatedRequestId = _reader.readString();
					break;
				default: _reader.skipField();
			}
		}
		SipTransferCallRequest.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.transferId) _writer.writeString(1, _instance.transferId);
		if (!!_instance.headers) {
			const keys_2 = Object.keys(_instance.headers);
			if (keys_2.length) {
				const repeated_2 = keys_2.map((key) => ({
					key,
					value: _instance.headers[key]
				})).reduce((r, v) => [...r, v], []);
				_writer.writeRepeatedMessage(2, repeated_2, SipTransferCallRequest.HeadersEntry.serializeBinaryToWriter);
			}
		}
		if (_instance.outcomeTimeoutMs) _writer.writeUint32(3, _instance.outcomeTimeoutMs);
		if (_instance.delegation) _writer.writeEnum(4, _instance.delegation);
		if (_instance.delegatedRequestId) _writer.writeString(5, _instance.delegatedRequestId);
	}
	constructor(_value) {
		_value = _value || {};
		this.transferId = _value.transferId;
		this.headers = _value.headers ? Object.keys(_value.headers).reduce((r, k) => ({
			...r,
			[k]: _value.headers[k]
		}), {}) : {}, this.outcomeTimeoutMs = _value.outcomeTimeoutMs;
		this.delegation = _value.delegation;
		this.delegatedRequestId = _value.delegatedRequestId;
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
	get delegation() {
		return this._delegation;
	}
	set delegation(value) {
		this._delegation = value;
	}
	get delegatedRequestId() {
		return this._delegatedRequestId;
	}
	set delegatedRequestId(value) {
		this._delegatedRequestId = value;
	}
	serializeBinary() {
		const writer = new BinaryWriter();
		SipTransferCallRequest.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return {
			transferId: this.transferId,
			headers: this.headers ? Object.keys(this.headers).reduce((r, k) => ({
				...r,
				[k]: this.headers[k]
			}), {}) : {},
			outcomeTimeoutMs: this.outcomeTimeoutMs,
			delegation: this.delegation,
			delegatedRequestId: this.delegatedRequestId
		};
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			transferId: this.transferId,
			headers: this.headers ? Object.keys(this.headers).reduce((r, k) => ({
				...r,
				[k]: this.headers[k]
			}), {}) : {},
			outcomeTimeoutMs: this.outcomeTimeoutMs,
			delegation: SipTransferDelegation[this.delegation === null || this.delegation === void 0 ? 0 : this.delegation],
			delegatedRequestId: this.delegatedRequestId
		};
	}
};
(function(SipTransferCallRequest) {
	class HeadersEntry {
		static {
			this.id = "ondewo.sip.SipTransferCallRequest.HeadersEntry";
		}
		static deserializeBinary(bytes) {
			const instance = new HeadersEntry();
			HeadersEntry.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
			return instance;
		}
		static refineValues(_instance) {
			_instance.key = _instance.key || "";
			_instance.value = _instance.value || "";
		}
		static deserializeBinaryFromReader(_instance, _reader) {
			while (_reader.nextField()) {
				if (_reader.isEndGroup()) break;
				switch (_reader.getFieldNumber()) {
					case 1:
						_instance.key = _reader.readString();
						break;
					case 2:
						_instance.value = _reader.readString();
						break;
					default: _reader.skipField();
				}
			}
			HeadersEntry.refineValues(_instance);
		}
		static serializeBinaryToWriter(_instance, _writer) {
			if (_instance.key) _writer.writeString(1, _instance.key);
			if (_instance.value) _writer.writeString(2, _instance.value);
		}
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
		serializeBinary() {
			const writer = new BinaryWriter();
			HeadersEntry.serializeBinaryToWriter(this, writer);
			return writer.getResultBuffer();
		}
		toObject() {
			return {
				key: this.key,
				value: this.value
			};
		}
		toJSON() {
			return this.toObject();
		}
		toProtobufJSON(options) {
			return {
				key: this.key,
				value: this.value
			};
		}
	}
	SipTransferCallRequest.HeadersEntry = HeadersEntry;
})(SipTransferCallRequest || (SipTransferCallRequest = {}));
var SipDelegatedTransfer = class SipDelegatedTransfer {
	static {
		this.id = "ondewo.sip.SipDelegatedTransfer";
	}
	static deserializeBinary(bytes) {
		const instance = new SipDelegatedTransfer();
		SipDelegatedTransfer.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.requestId = _instance.requestId || "";
		_instance.requestedAt = _instance.requestedAt || void 0;
		_instance.targetIsPhoneNumber = _instance.targetIsPhoneNumber || false;
		_instance.transferId = _instance.transferId || "";
		_instance.headers = _instance.headers || {};
	}
	static deserializeBinaryFromReader(_instance, _reader) {
		while (_reader.nextField()) {
			if (_reader.isEndGroup()) break;
			switch (_reader.getFieldNumber()) {
				case 1:
					_instance.requestId = _reader.readString();
					break;
				case 2:
					_instance.requestedAt = new googleProtobuf001.Timestamp();
					_reader.readMessage(_instance.requestedAt, googleProtobuf001.Timestamp.deserializeBinaryFromReader);
					break;
				case 3:
					_instance.targetIsPhoneNumber = _reader.readBool();
					break;
				case 4:
					_instance.transferId = _reader.readString();
					break;
				case 5:
					const msg_5 = {};
					_reader.readMessage(msg_5, SipDelegatedTransfer.HeadersEntry.deserializeBinaryFromReader);
					_instance.headers = _instance.headers || {};
					_instance.headers[msg_5.key] = msg_5.value;
					break;
				default: _reader.skipField();
			}
		}
		SipDelegatedTransfer.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.requestId) _writer.writeString(1, _instance.requestId);
		if (_instance.requestedAt) _writer.writeMessage(2, _instance.requestedAt, googleProtobuf001.Timestamp.serializeBinaryToWriter);
		if (_instance.targetIsPhoneNumber) _writer.writeBool(3, _instance.targetIsPhoneNumber);
		if (_instance.transferId) _writer.writeString(4, _instance.transferId);
		if (!!_instance.headers) {
			const keys_5 = Object.keys(_instance.headers);
			if (keys_5.length) {
				const repeated_5 = keys_5.map((key) => ({
					key,
					value: _instance.headers[key]
				})).reduce((r, v) => [...r, v], []);
				_writer.writeRepeatedMessage(5, repeated_5, SipDelegatedTransfer.HeadersEntry.serializeBinaryToWriter);
			}
		}
	}
	constructor(_value) {
		_value = _value || {};
		this.requestId = _value.requestId;
		this.requestedAt = _value.requestedAt ? new googleProtobuf001.Timestamp(_value.requestedAt) : void 0;
		this.targetIsPhoneNumber = _value.targetIsPhoneNumber;
		this.transferId = _value.transferId;
		this.headers = _value.headers ? Object.keys(_value.headers).reduce((r, k) => ({
			...r,
			[k]: _value.headers[k]
		}), {}) : {}, SipDelegatedTransfer.refineValues(this);
	}
	get requestId() {
		return this._requestId;
	}
	set requestId(value) {
		this._requestId = value;
	}
	get requestedAt() {
		return this._requestedAt;
	}
	set requestedAt(value) {
		this._requestedAt = value;
	}
	get targetIsPhoneNumber() {
		return this._targetIsPhoneNumber;
	}
	set targetIsPhoneNumber(value) {
		this._targetIsPhoneNumber = value;
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
	serializeBinary() {
		const writer = new BinaryWriter();
		SipDelegatedTransfer.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return {
			requestId: this.requestId,
			requestedAt: this.requestedAt ? this.requestedAt.toObject() : void 0,
			targetIsPhoneNumber: this.targetIsPhoneNumber,
			transferId: this.transferId,
			headers: this.headers ? Object.keys(this.headers).reduce((r, k) => ({
				...r,
				[k]: this.headers[k]
			}), {}) : {}
		};
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			requestId: this.requestId,
			requestedAt: this.requestedAt ? this.requestedAt.toProtobufJSON(options) : null,
			targetIsPhoneNumber: this.targetIsPhoneNumber,
			transferId: this.transferId,
			headers: this.headers ? Object.keys(this.headers).reduce((r, k) => ({
				...r,
				[k]: this.headers[k]
			}), {}) : {}
		};
	}
};
(function(SipDelegatedTransfer) {
	class HeadersEntry {
		static {
			this.id = "ondewo.sip.SipDelegatedTransfer.HeadersEntry";
		}
		static deserializeBinary(bytes) {
			const instance = new HeadersEntry();
			HeadersEntry.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
			return instance;
		}
		static refineValues(_instance) {
			_instance.key = _instance.key || "";
			_instance.value = _instance.value || "";
		}
		static deserializeBinaryFromReader(_instance, _reader) {
			while (_reader.nextField()) {
				if (_reader.isEndGroup()) break;
				switch (_reader.getFieldNumber()) {
					case 1:
						_instance.key = _reader.readString();
						break;
					case 2:
						_instance.value = _reader.readString();
						break;
					default: _reader.skipField();
				}
			}
			HeadersEntry.refineValues(_instance);
		}
		static serializeBinaryToWriter(_instance, _writer) {
			if (_instance.key) _writer.writeString(1, _instance.key);
			if (_instance.value) _writer.writeString(2, _instance.value);
		}
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
		serializeBinary() {
			const writer = new BinaryWriter();
			HeadersEntry.serializeBinaryToWriter(this, writer);
			return writer.getResultBuffer();
		}
		toObject() {
			return {
				key: this.key,
				value: this.value
			};
		}
		toJSON() {
			return this.toObject();
		}
		toProtobufJSON(options) {
			return {
				key: this.key,
				value: this.value
			};
		}
	}
	SipDelegatedTransfer.HeadersEntry = HeadersEntry;
})(SipDelegatedTransfer || (SipDelegatedTransfer = {}));
var SipStatus = class SipStatus {
	static {
		this.id = "ondewo.sip.SipStatus";
	}
	static deserializeBinary(bytes) {
		const instance = new SipStatus();
		SipStatus.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.accountName = _instance.accountName || "";
		_instance.timestamp = _instance.timestamp || void 0;
		_instance.statusType = _instance.statusType || 0;
		_instance.calleeId = _instance.calleeId || "";
		_instance.transferCallId = _instance.transferCallId || "";
		_instance.headers = _instance.headers || {};
		_instance.description = _instance.description || "";
		_instance.exceptionName = _instance.exceptionName || "";
		_instance.exceptionTraceback = _instance.exceptionTraceback || "";
		_instance.nluSessionName = _instance.nluSessionName || "";
		_instance.amdResult = _instance.amdResult || void 0;
		_instance.callId = _instance.callId || "";
		_instance.botMuted = _instance.botMuted || false;
		_instance.listeningPaused = _instance.listeningPaused || false;
		_instance.callAudioStreams = _instance.callAudioStreams || 0;
		_instance.sipResponseCode = _instance.sipResponseCode || 0;
		_instance.delegatedTransfer = _instance.delegatedTransfer || void 0;
		_instance.capabilities = _instance.capabilities || [];
		_instance.warmTransferOutcomeNoticeStatus = _instance.warmTransferOutcomeNoticeStatus || 0;
	}
	static deserializeBinaryFromReader(_instance, _reader) {
		while (_reader.nextField()) {
			if (_reader.isEndGroup()) break;
			switch (_reader.getFieldNumber()) {
				case 1:
					_instance.accountName = _reader.readString();
					break;
				case 2:
					_instance.timestamp = new googleProtobuf001.Timestamp();
					_reader.readMessage(_instance.timestamp, googleProtobuf001.Timestamp.deserializeBinaryFromReader);
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
				case 17:
					_instance.delegatedTransfer = new SipDelegatedTransfer();
					_reader.readMessage(_instance.delegatedTransfer, SipDelegatedTransfer.deserializeBinaryFromReader);
					break;
				case 18:
					(_instance.capabilities = _instance.capabilities || []).push(_reader.readString());
					break;
				case 19:
					_instance.warmTransferOutcomeNoticeStatus = _reader.readEnum();
					break;
				default: _reader.skipField();
			}
		}
		SipStatus.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.accountName) _writer.writeString(1, _instance.accountName);
		if (_instance.timestamp) _writer.writeMessage(2, _instance.timestamp, googleProtobuf001.Timestamp.serializeBinaryToWriter);
		if (_instance.statusType) _writer.writeEnum(3, _instance.statusType);
		if (_instance.calleeId) _writer.writeString(4, _instance.calleeId);
		if (_instance.transferCallId) _writer.writeString(5, _instance.transferCallId);
		if (!!_instance.headers) {
			const keys_6 = Object.keys(_instance.headers);
			if (keys_6.length) {
				const repeated_6 = keys_6.map((key) => ({
					key,
					value: _instance.headers[key]
				})).reduce((r, v) => [...r, v], []);
				_writer.writeRepeatedMessage(6, repeated_6, SipStatus.HeadersEntry.serializeBinaryToWriter);
			}
		}
		if (_instance.description) _writer.writeString(7, _instance.description);
		if (_instance.exceptionName) _writer.writeString(8, _instance.exceptionName);
		if (_instance.exceptionTraceback) _writer.writeString(9, _instance.exceptionTraceback);
		if (_instance.nluSessionName) _writer.writeString(10, _instance.nluSessionName);
		if (_instance.amdResult) _writer.writeMessage(11, _instance.amdResult, AnsweringMachineDetectionResult.serializeBinaryToWriter);
		if (_instance.callId) _writer.writeString(12, _instance.callId);
		if (_instance.botMuted) _writer.writeBool(13, _instance.botMuted);
		if (_instance.listeningPaused) _writer.writeBool(14, _instance.listeningPaused);
		if (_instance.callAudioStreams) _writer.writeInt32(15, _instance.callAudioStreams);
		if (_instance.sipResponseCode) _writer.writeInt32(16, _instance.sipResponseCode);
		if (_instance.delegatedTransfer) _writer.writeMessage(17, _instance.delegatedTransfer, SipDelegatedTransfer.serializeBinaryToWriter);
		if (_instance.capabilities && _instance.capabilities.length) _writer.writeRepeatedString(18, _instance.capabilities);
		if (_instance.warmTransferOutcomeNoticeStatus) _writer.writeEnum(19, _instance.warmTransferOutcomeNoticeStatus);
	}
	constructor(_value) {
		_value = _value || {};
		this.accountName = _value.accountName;
		this.timestamp = _value.timestamp ? new googleProtobuf001.Timestamp(_value.timestamp) : void 0;
		this.statusType = _value.statusType;
		this.calleeId = _value.calleeId;
		this.transferCallId = _value.transferCallId;
		this.headers = _value.headers ? Object.keys(_value.headers).reduce((r, k) => ({
			...r,
			[k]: _value.headers[k]
		}), {}) : {}, this.description = _value.description;
		this.exceptionName = _value.exceptionName;
		this.exceptionTraceback = _value.exceptionTraceback;
		this.nluSessionName = _value.nluSessionName;
		this.amdResult = _value.amdResult ? new AnsweringMachineDetectionResult(_value.amdResult) : void 0;
		this.callId = _value.callId;
		this.botMuted = _value.botMuted;
		this.listeningPaused = _value.listeningPaused;
		this.callAudioStreams = _value.callAudioStreams;
		this.sipResponseCode = _value.sipResponseCode;
		this.delegatedTransfer = _value.delegatedTransfer ? new SipDelegatedTransfer(_value.delegatedTransfer) : void 0;
		this.capabilities = (_value.capabilities || []).slice();
		this.warmTransferOutcomeNoticeStatus = _value.warmTransferOutcomeNoticeStatus;
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
	get delegatedTransfer() {
		return this._delegatedTransfer;
	}
	set delegatedTransfer(value) {
		this._delegatedTransfer = value;
	}
	get capabilities() {
		return this._capabilities;
	}
	set capabilities(value) {
		this._capabilities = value;
	}
	get warmTransferOutcomeNoticeStatus() {
		return this._warmTransferOutcomeNoticeStatus;
	}
	set warmTransferOutcomeNoticeStatus(value) {
		this._warmTransferOutcomeNoticeStatus = value;
	}
	serializeBinary() {
		const writer = new BinaryWriter();
		SipStatus.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return {
			accountName: this.accountName,
			timestamp: this.timestamp ? this.timestamp.toObject() : void 0,
			statusType: this.statusType,
			calleeId: this.calleeId,
			transferCallId: this.transferCallId,
			headers: this.headers ? Object.keys(this.headers).reduce((r, k) => ({
				...r,
				[k]: this.headers[k]
			}), {}) : {},
			description: this.description,
			exceptionName: this.exceptionName,
			exceptionTraceback: this.exceptionTraceback,
			nluSessionName: this.nluSessionName,
			amdResult: this.amdResult ? this.amdResult.toObject() : void 0,
			callId: this.callId,
			botMuted: this.botMuted,
			listeningPaused: this.listeningPaused,
			callAudioStreams: this.callAudioStreams,
			sipResponseCode: this.sipResponseCode,
			delegatedTransfer: this.delegatedTransfer ? this.delegatedTransfer.toObject() : void 0,
			capabilities: (this.capabilities || []).slice(),
			warmTransferOutcomeNoticeStatus: this.warmTransferOutcomeNoticeStatus
		};
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			accountName: this.accountName,
			timestamp: this.timestamp ? this.timestamp.toProtobufJSON(options) : null,
			statusType: SipStatus.StatusType[this.statusType === null || this.statusType === void 0 ? 0 : this.statusType],
			calleeId: this.calleeId,
			transferCallId: this.transferCallId,
			headers: this.headers ? Object.keys(this.headers).reduce((r, k) => ({
				...r,
				[k]: this.headers[k]
			}), {}) : {},
			description: this.description,
			exceptionName: this.exceptionName,
			exceptionTraceback: this.exceptionTraceback,
			nluSessionName: this.nluSessionName,
			amdResult: this.amdResult ? this.amdResult.toProtobufJSON(options) : null,
			callId: this.callId,
			botMuted: this.botMuted,
			listeningPaused: this.listeningPaused,
			callAudioStreams: this.callAudioStreams,
			sipResponseCode: this.sipResponseCode,
			delegatedTransfer: this.delegatedTransfer ? this.delegatedTransfer.toProtobufJSON(options) : null,
			capabilities: (this.capabilities || []).slice(),
			warmTransferOutcomeNoticeStatus: SipWarmTransferOutcomeNoticeStatus[this.warmTransferOutcomeNoticeStatus === null || this.warmTransferOutcomeNoticeStatus === void 0 ? 0 : this.warmTransferOutcomeNoticeStatus]
		};
	}
};
(function(SipStatus) {
	(function(StatusType) {
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
	})(SipStatus.StatusType || (SipStatus.StatusType = {}));
	class HeadersEntry {
		static {
			this.id = "ondewo.sip.SipStatus.HeadersEntry";
		}
		static deserializeBinary(bytes) {
			const instance = new HeadersEntry();
			HeadersEntry.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
			return instance;
		}
		static refineValues(_instance) {
			_instance.key = _instance.key || "";
			_instance.value = _instance.value || "";
		}
		static deserializeBinaryFromReader(_instance, _reader) {
			while (_reader.nextField()) {
				if (_reader.isEndGroup()) break;
				switch (_reader.getFieldNumber()) {
					case 1:
						_instance.key = _reader.readString();
						break;
					case 2:
						_instance.value = _reader.readString();
						break;
					default: _reader.skipField();
				}
			}
			HeadersEntry.refineValues(_instance);
		}
		static serializeBinaryToWriter(_instance, _writer) {
			if (_instance.key) _writer.writeString(1, _instance.key);
			if (_instance.value) _writer.writeString(2, _instance.value);
		}
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
		serializeBinary() {
			const writer = new BinaryWriter();
			HeadersEntry.serializeBinaryToWriter(this, writer);
			return writer.getResultBuffer();
		}
		toObject() {
			return {
				key: this.key,
				value: this.value
			};
		}
		toJSON() {
			return this.toObject();
		}
		toProtobufJSON(options) {
			return {
				key: this.key,
				value: this.value
			};
		}
	}
	SipStatus.HeadersEntry = HeadersEntry;
})(SipStatus || (SipStatus = {}));
var SipStatusHistoryResponse = class SipStatusHistoryResponse {
	static {
		this.id = "ondewo.sip.SipStatusHistoryResponse";
	}
	static deserializeBinary(bytes) {
		const instance = new SipStatusHistoryResponse();
		SipStatusHistoryResponse.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.statusHistory = _instance.statusHistory || [];
	}
	static deserializeBinaryFromReader(_instance, _reader) {
		while (_reader.nextField()) {
			if (_reader.isEndGroup()) break;
			switch (_reader.getFieldNumber()) {
				case 1:
					const messageInitializer1 = new SipStatus();
					_reader.readMessage(messageInitializer1, SipStatus.deserializeBinaryFromReader);
					(_instance.statusHistory = _instance.statusHistory || []).push(messageInitializer1);
					break;
				default: _reader.skipField();
			}
		}
		SipStatusHistoryResponse.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.statusHistory && _instance.statusHistory.length) _writer.writeRepeatedMessage(1, _instance.statusHistory, SipStatus.serializeBinaryToWriter);
	}
	constructor(_value) {
		_value = _value || {};
		this.statusHistory = (_value.statusHistory || []).map((m) => new SipStatus(m));
		SipStatusHistoryResponse.refineValues(this);
	}
	get statusHistory() {
		return this._statusHistory;
	}
	set statusHistory(value) {
		this._statusHistory = value;
	}
	serializeBinary() {
		const writer = new BinaryWriter();
		SipStatusHistoryResponse.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return { statusHistory: (this.statusHistory || []).map((m) => m.toObject()) };
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return { statusHistory: (this.statusHistory || []).map((m) => m.toProtobufJSON(options)) };
	}
};
var SipSetCallMediaControlRequest = class SipSetCallMediaControlRequest {
	static {
		this.id = "ondewo.sip.SipSetCallMediaControlRequest";
	}
	static deserializeBinary(bytes) {
		const instance = new SipSetCallMediaControlRequest();
		SipSetCallMediaControlRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.botVoice = _instance.botVoice || 0;
		_instance.botListening = _instance.botListening || 0;
		_instance.owner = _instance.owner || 0;
		_instance.participantsPresent = _instance.participantsPresent || false;
		_instance.warmTransferOutcome = _instance.warmTransferOutcome || void 0;
	}
	static deserializeBinaryFromReader(_instance, _reader) {
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
				case 5:
					_instance.warmTransferOutcome = new SipWarmTransferOutcomeNotice();
					_reader.readMessage(_instance.warmTransferOutcome, SipWarmTransferOutcomeNotice.deserializeBinaryFromReader);
					break;
				default: _reader.skipField();
			}
		}
		SipSetCallMediaControlRequest.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.botVoice) _writer.writeEnum(1, _instance.botVoice);
		if (_instance.botListening) _writer.writeEnum(2, _instance.botListening);
		if (_instance.owner) _writer.writeEnum(3, _instance.owner);
		if (_instance.participantsPresent) _writer.writeBool(4, _instance.participantsPresent);
		if (_instance.warmTransferOutcome) _writer.writeMessage(5, _instance.warmTransferOutcome, SipWarmTransferOutcomeNotice.serializeBinaryToWriter);
	}
	constructor(_value) {
		_value = _value || {};
		this.botVoice = _value.botVoice;
		this.botListening = _value.botListening;
		this.owner = _value.owner;
		this.participantsPresent = _value.participantsPresent;
		this.warmTransferOutcome = _value.warmTransferOutcome ? new SipWarmTransferOutcomeNotice(_value.warmTransferOutcome) : void 0;
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
	get warmTransferOutcome() {
		return this._warmTransferOutcome;
	}
	set warmTransferOutcome(value) {
		this._warmTransferOutcome = value;
	}
	serializeBinary() {
		const writer = new BinaryWriter();
		SipSetCallMediaControlRequest.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return {
			botVoice: this.botVoice,
			botListening: this.botListening,
			owner: this.owner,
			participantsPresent: this.participantsPresent,
			warmTransferOutcome: this.warmTransferOutcome ? this.warmTransferOutcome.toObject() : void 0
		};
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			botVoice: MediaControlSetting[this.botVoice === null || this.botVoice === void 0 ? 0 : this.botVoice],
			botListening: MediaControlSetting[this.botListening === null || this.botListening === void 0 ? 0 : this.botListening],
			owner: MediaControlOwner[this.owner === null || this.owner === void 0 ? 0 : this.owner],
			participantsPresent: this.participantsPresent,
			warmTransferOutcome: this.warmTransferOutcome ? this.warmTransferOutcome.toProtobufJSON(options) : null
		};
	}
};
var SipWarmTransferOutcomeNotice = class SipWarmTransferOutcomeNotice {
	static {
		this.id = "ondewo.sip.SipWarmTransferOutcomeNotice";
	}
	static deserializeBinary(bytes) {
		const instance = new SipWarmTransferOutcomeNotice();
		SipWarmTransferOutcomeNotice.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.requestId = _instance.requestId || "";
		_instance.outcome = _instance.outcome || 0;
		_instance.introSession = _instance.introSession || "";
		_instance.calleeDisplayName = _instance.calleeDisplayName || "";
		_instance.cause = _instance.cause || "";
		_instance.fallbackText = _instance.fallbackText || "";
	}
	static deserializeBinaryFromReader(_instance, _reader) {
		while (_reader.nextField()) {
			if (_reader.isEndGroup()) break;
			switch (_reader.getFieldNumber()) {
				case 1:
					_instance.requestId = _reader.readString();
					break;
				case 2:
					_instance.outcome = _reader.readEnum();
					break;
				case 3:
					_instance.introSession = _reader.readString();
					break;
				case 4:
					_instance.calleeDisplayName = _reader.readString();
					break;
				case 5:
					_instance.cause = _reader.readString();
					break;
				case 6:
					_instance.fallbackText = _reader.readString();
					break;
				default: _reader.skipField();
			}
		}
		SipWarmTransferOutcomeNotice.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.requestId) _writer.writeString(1, _instance.requestId);
		if (_instance.outcome) _writer.writeEnum(2, _instance.outcome);
		if (_instance.introSession) _writer.writeString(3, _instance.introSession);
		if (_instance.calleeDisplayName) _writer.writeString(4, _instance.calleeDisplayName);
		if (_instance.cause) _writer.writeString(5, _instance.cause);
		if (_instance.fallbackText) _writer.writeString(6, _instance.fallbackText);
	}
	constructor(_value) {
		_value = _value || {};
		this.requestId = _value.requestId;
		this.outcome = _value.outcome;
		this.introSession = _value.introSession;
		this.calleeDisplayName = _value.calleeDisplayName;
		this.cause = _value.cause;
		this.fallbackText = _value.fallbackText;
		SipWarmTransferOutcomeNotice.refineValues(this);
	}
	get requestId() {
		return this._requestId;
	}
	set requestId(value) {
		this._requestId = value;
	}
	get outcome() {
		return this._outcome;
	}
	set outcome(value) {
		this._outcome = value;
	}
	get introSession() {
		return this._introSession;
	}
	set introSession(value) {
		this._introSession = value;
	}
	get calleeDisplayName() {
		return this._calleeDisplayName;
	}
	set calleeDisplayName(value) {
		this._calleeDisplayName = value;
	}
	get cause() {
		return this._cause;
	}
	set cause(value) {
		this._cause = value;
	}
	get fallbackText() {
		return this._fallbackText;
	}
	set fallbackText(value) {
		this._fallbackText = value;
	}
	serializeBinary() {
		const writer = new BinaryWriter();
		SipWarmTransferOutcomeNotice.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return {
			requestId: this.requestId,
			outcome: this.outcome,
			introSession: this.introSession,
			calleeDisplayName: this.calleeDisplayName,
			cause: this.cause,
			fallbackText: this.fallbackText
		};
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			requestId: this.requestId,
			outcome: SipWarmTransferOutcome[this.outcome === null || this.outcome === void 0 ? 0 : this.outcome],
			introSession: this.introSession,
			calleeDisplayName: this.calleeDisplayName,
			cause: this.cause,
			fallbackText: this.fallbackText
		};
	}
};
var SipSendDtmfRequest = class SipSendDtmfRequest {
	static {
		this.id = "ondewo.sip.SipSendDtmfRequest";
	}
	static deserializeBinary(bytes) {
		const instance = new SipSendDtmfRequest();
		SipSendDtmfRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.digits = _instance.digits || "";
	}
	static deserializeBinaryFromReader(_instance, _reader) {
		while (_reader.nextField()) {
			if (_reader.isEndGroup()) break;
			switch (_reader.getFieldNumber()) {
				case 1:
					_instance.digits = _reader.readString();
					break;
				default: _reader.skipField();
			}
		}
		SipSendDtmfRequest.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.digits) _writer.writeString(1, _instance.digits);
	}
	constructor(_value) {
		_value = _value || {};
		this.digits = _value.digits;
		SipSendDtmfRequest.refineValues(this);
	}
	get digits() {
		return this._digits;
	}
	set digits(value) {
		this._digits = value;
	}
	serializeBinary() {
		const writer = new BinaryWriter();
		SipSendDtmfRequest.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return { digits: this.digits };
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return { digits: this.digits };
	}
};
var SipCallAudioConfig = class SipCallAudioConfig {
	static {
		this.id = "ondewo.sip.SipCallAudioConfig";
	}
	static deserializeBinary(bytes) {
		const instance = new SipCallAudioConfig();
		SipCallAudioConfig.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.mode = _instance.mode || 0;
		_instance.sampleRateHz = _instance.sampleRateHz || 0;
		_instance.frameMs = _instance.frameMs || 0;
		_instance.takeOver = _instance.takeOver || false;
		_instance.streamId = _instance.streamId || "";
		_instance.maxDurationS = _instance.maxDurationS || 0;
	}
	static deserializeBinaryFromReader(_instance, _reader) {
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
				default: _reader.skipField();
			}
		}
		SipCallAudioConfig.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.mode) _writer.writeEnum(1, _instance.mode);
		if (_instance.sampleRateHz) _writer.writeInt32(2, _instance.sampleRateHz);
		if (_instance.frameMs) _writer.writeInt32(3, _instance.frameMs);
		if (_instance.takeOver) _writer.writeBool(4, _instance.takeOver);
		if (_instance.streamId) _writer.writeString(5, _instance.streamId);
		if (_instance.maxDurationS) _writer.writeInt32(6, _instance.maxDurationS);
	}
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
	serializeBinary() {
		const writer = new BinaryWriter();
		SipCallAudioConfig.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
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
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			mode: SipCallAudioMode[this.mode === null || this.mode === void 0 ? 0 : this.mode],
			sampleRateHz: this.sampleRateHz,
			frameMs: this.frameMs,
			takeOver: this.takeOver,
			streamId: this.streamId,
			maxDurationS: this.maxDurationS
		};
	}
};
var SipCallAudioFrame = class SipCallAudioFrame {
	static {
		this.id = "ondewo.sip.SipCallAudioFrame";
	}
	static deserializeBinary(bytes) {
		const instance = new SipCallAudioFrame();
		SipCallAudioFrame.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.pcmS16le = _instance.pcmS16le || /* @__PURE__ */ new Uint8Array();
		_instance.sequence = _instance.sequence || "0";
	}
	static deserializeBinaryFromReader(_instance, _reader) {
		while (_reader.nextField()) {
			if (_reader.isEndGroup()) break;
			switch (_reader.getFieldNumber()) {
				case 1:
					_instance.pcmS16le = _reader.readBytes();
					break;
				case 2:
					_instance.sequence = _reader.readUint64String();
					break;
				default: _reader.skipField();
			}
		}
		SipCallAudioFrame.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.pcmS16le && _instance.pcmS16le.length) _writer.writeBytes(1, _instance.pcmS16le);
		if (_instance.sequence) _writer.writeUint64String(2, _instance.sequence);
	}
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
	serializeBinary() {
		const writer = new BinaryWriter();
		SipCallAudioFrame.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return {
			pcmS16le: this.pcmS16le ? this.pcmS16le.subarray(0) : /* @__PURE__ */ new Uint8Array(),
			sequence: this.sequence
		};
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			pcmS16le: this.pcmS16le ? uint8ArrayToBase64(this.pcmS16le) : "",
			sequence: this.sequence
		};
	}
};
var SipCallAudioRequest = class SipCallAudioRequest {
	static {
		this.id = "ondewo.sip.SipCallAudioRequest";
	}
	static deserializeBinary(bytes) {
		const instance = new SipCallAudioRequest();
		SipCallAudioRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {}
	static deserializeBinaryFromReader(_instance, _reader) {
		while (_reader.nextField()) {
			if (_reader.isEndGroup()) break;
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
				default: _reader.skipField();
			}
		}
		SipCallAudioRequest.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.config) _writer.writeMessage(1, _instance.config, SipCallAudioConfig.serializeBinaryToWriter);
		if (_instance.audio) _writer.writeMessage(2, _instance.audio, SipCallAudioFrame.serializeBinaryToWriter);
		if (_instance.agentMuted || _instance.agentMuted === false) _writer.writeBool(3, _instance.agentMuted);
	}
	constructor(_value) {
		this._request = SipCallAudioRequest.RequestCase.none;
		_value = _value || {};
		this.config = _value.config ? new SipCallAudioConfig(_value.config) : void 0;
		this.audio = _value.audio ? new SipCallAudioFrame(_value.audio) : void 0;
		this.agentMuted = _value.agentMuted;
		SipCallAudioRequest.refineValues(this);
	}
	get config() {
		return this._config;
	}
	set config(value) {
		if (value !== void 0 && value !== null) {
			this._audio = this._agentMuted = void 0;
			this._request = SipCallAudioRequest.RequestCase.config;
		}
		this._config = value;
	}
	get audio() {
		return this._audio;
	}
	set audio(value) {
		if (value !== void 0 && value !== null) {
			this._config = this._agentMuted = void 0;
			this._request = SipCallAudioRequest.RequestCase.audio;
		}
		this._audio = value;
	}
	get agentMuted() {
		return this._agentMuted;
	}
	set agentMuted(value) {
		if (value !== void 0 && value !== null) {
			this._config = this._audio = void 0;
			this._request = SipCallAudioRequest.RequestCase.agentMuted;
		}
		this._agentMuted = value;
	}
	get request() {
		return this._request;
	}
	serializeBinary() {
		const writer = new BinaryWriter();
		SipCallAudioRequest.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return {
			config: this.config ? this.config.toObject() : void 0,
			audio: this.audio ? this.audio.toObject() : void 0,
			agentMuted: this.agentMuted
		};
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			config: this.config ? this.config.toProtobufJSON(options) : null,
			audio: this.audio ? this.audio.toProtobufJSON(options) : null,
			agentMuted: this.agentMuted
		};
	}
};
(function(SipCallAudioRequest) {
	(function(RequestCase) {
		RequestCase[RequestCase["none"] = 0] = "none";
		RequestCase[RequestCase["config"] = 1] = "config";
		RequestCase[RequestCase["audio"] = 2] = "audio";
		RequestCase[RequestCase["agentMuted"] = 3] = "agentMuted";
	})(SipCallAudioRequest.RequestCase || (SipCallAudioRequest.RequestCase = {}));
})(SipCallAudioRequest || (SipCallAudioRequest = {}));
var SipCallAudioStarted = class SipCallAudioStarted {
	static {
		this.id = "ondewo.sip.SipCallAudioStarted";
	}
	static deserializeBinary(bytes) {
		const instance = new SipCallAudioStarted();
		SipCallAudioStarted.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.streamId = _instance.streamId || "";
		_instance.sampleRateHz = _instance.sampleRateHz || 0;
		_instance.frameMs = _instance.frameMs || 0;
		_instance.mode = _instance.mode || 0;
	}
	static deserializeBinaryFromReader(_instance, _reader) {
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
				default: _reader.skipField();
			}
		}
		SipCallAudioStarted.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.streamId) _writer.writeString(1, _instance.streamId);
		if (_instance.sampleRateHz) _writer.writeInt32(2, _instance.sampleRateHz);
		if (_instance.frameMs) _writer.writeInt32(3, _instance.frameMs);
		if (_instance.mode) _writer.writeEnum(4, _instance.mode);
	}
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
	serializeBinary() {
		const writer = new BinaryWriter();
		SipCallAudioStarted.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return {
			streamId: this.streamId,
			sampleRateHz: this.sampleRateHz,
			frameMs: this.frameMs,
			mode: this.mode
		};
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			streamId: this.streamId,
			sampleRateHz: this.sampleRateHz,
			frameMs: this.frameMs,
			mode: SipCallAudioMode[this.mode === null || this.mode === void 0 ? 0 : this.mode]
		};
	}
};
var SipCallAudioStats = class SipCallAudioStats {
	static {
		this.id = "ondewo.sip.SipCallAudioStats";
	}
	static deserializeBinary(bytes) {
		const instance = new SipCallAudioStats();
		SipCallAudioStats.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.framesSent = _instance.framesSent || "0";
		_instance.framesDropped = _instance.framesDropped || "0";
		_instance.framesReceived = _instance.framesReceived || "0";
		_instance.underruns = _instance.underruns || "0";
		_instance.framesDiscarded = _instance.framesDiscarded || "0";
	}
	static deserializeBinaryFromReader(_instance, _reader) {
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
				default: _reader.skipField();
			}
		}
		SipCallAudioStats.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.framesSent) _writer.writeUint64String(1, _instance.framesSent);
		if (_instance.framesDropped) _writer.writeUint64String(2, _instance.framesDropped);
		if (_instance.framesReceived) _writer.writeUint64String(3, _instance.framesReceived);
		if (_instance.underruns) _writer.writeUint64String(4, _instance.underruns);
		if (_instance.framesDiscarded) _writer.writeUint64String(5, _instance.framesDiscarded);
	}
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
	serializeBinary() {
		const writer = new BinaryWriter();
		SipCallAudioStats.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return {
			framesSent: this.framesSent,
			framesDropped: this.framesDropped,
			framesReceived: this.framesReceived,
			underruns: this.underruns,
			framesDiscarded: this.framesDiscarded
		};
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			framesSent: this.framesSent,
			framesDropped: this.framesDropped,
			framesReceived: this.framesReceived,
			underruns: this.underruns,
			framesDiscarded: this.framesDiscarded
		};
	}
};
var SipCallAudioEnded = class SipCallAudioEnded {
	static {
		this.id = "ondewo.sip.SipCallAudioEnded";
	}
	static deserializeBinary(bytes) {
		const instance = new SipCallAudioEnded();
		SipCallAudioEnded.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.reason = _instance.reason || 0;
		_instance.detail = _instance.detail || "";
	}
	static deserializeBinaryFromReader(_instance, _reader) {
		while (_reader.nextField()) {
			if (_reader.isEndGroup()) break;
			switch (_reader.getFieldNumber()) {
				case 1:
					_instance.reason = _reader.readEnum();
					break;
				case 2:
					_instance.detail = _reader.readString();
					break;
				default: _reader.skipField();
			}
		}
		SipCallAudioEnded.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.reason) _writer.writeEnum(1, _instance.reason);
		if (_instance.detail) _writer.writeString(2, _instance.detail);
	}
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
	serializeBinary() {
		const writer = new BinaryWriter();
		SipCallAudioEnded.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return {
			reason: this.reason,
			detail: this.detail
		};
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			reason: SipCallAudioEndReason[this.reason === null || this.reason === void 0 ? 0 : this.reason],
			detail: this.detail
		};
	}
};
var SipCallAudioResponse = class SipCallAudioResponse {
	static {
		this.id = "ondewo.sip.SipCallAudioResponse";
	}
	static deserializeBinary(bytes) {
		const instance = new SipCallAudioResponse();
		SipCallAudioResponse.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {}
	static deserializeBinaryFromReader(_instance, _reader) {
		while (_reader.nextField()) {
			if (_reader.isEndGroup()) break;
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
				default: _reader.skipField();
			}
		}
		SipCallAudioResponse.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.started) _writer.writeMessage(1, _instance.started, SipCallAudioStarted.serializeBinaryToWriter);
		if (_instance.audio) _writer.writeMessage(2, _instance.audio, SipCallAudioFrame.serializeBinaryToWriter);
		if (_instance.stats) _writer.writeMessage(3, _instance.stats, SipCallAudioStats.serializeBinaryToWriter);
		if (_instance.ended) _writer.writeMessage(4, _instance.ended, SipCallAudioEnded.serializeBinaryToWriter);
	}
	constructor(_value) {
		this._response = SipCallAudioResponse.ResponseCase.none;
		_value = _value || {};
		this.started = _value.started ? new SipCallAudioStarted(_value.started) : void 0;
		this.audio = _value.audio ? new SipCallAudioFrame(_value.audio) : void 0;
		this.stats = _value.stats ? new SipCallAudioStats(_value.stats) : void 0;
		this.ended = _value.ended ? new SipCallAudioEnded(_value.ended) : void 0;
		SipCallAudioResponse.refineValues(this);
	}
	get started() {
		return this._started;
	}
	set started(value) {
		if (value !== void 0 && value !== null) {
			this._audio = this._stats = this._ended = void 0;
			this._response = SipCallAudioResponse.ResponseCase.started;
		}
		this._started = value;
	}
	get audio() {
		return this._audio;
	}
	set audio(value) {
		if (value !== void 0 && value !== null) {
			this._started = this._stats = this._ended = void 0;
			this._response = SipCallAudioResponse.ResponseCase.audio;
		}
		this._audio = value;
	}
	get stats() {
		return this._stats;
	}
	set stats(value) {
		if (value !== void 0 && value !== null) {
			this._started = this._audio = this._ended = void 0;
			this._response = SipCallAudioResponse.ResponseCase.stats;
		}
		this._stats = value;
	}
	get ended() {
		return this._ended;
	}
	set ended(value) {
		if (value !== void 0 && value !== null) {
			this._started = this._audio = this._stats = void 0;
			this._response = SipCallAudioResponse.ResponseCase.ended;
		}
		this._ended = value;
	}
	get response() {
		return this._response;
	}
	serializeBinary() {
		const writer = new BinaryWriter();
		SipCallAudioResponse.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return {
			started: this.started ? this.started.toObject() : void 0,
			audio: this.audio ? this.audio.toObject() : void 0,
			stats: this.stats ? this.stats.toObject() : void 0,
			ended: this.ended ? this.ended.toObject() : void 0
		};
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return {
			started: this.started ? this.started.toProtobufJSON(options) : null,
			audio: this.audio ? this.audio.toProtobufJSON(options) : null,
			stats: this.stats ? this.stats.toProtobufJSON(options) : null,
			ended: this.ended ? this.ended.toProtobufJSON(options) : null
		};
	}
};
(function(SipCallAudioResponse) {
	(function(ResponseCase) {
		ResponseCase[ResponseCase["none"] = 0] = "none";
		ResponseCase[ResponseCase["started"] = 1] = "started";
		ResponseCase[ResponseCase["audio"] = 2] = "audio";
		ResponseCase[ResponseCase["stats"] = 3] = "stats";
		ResponseCase[ResponseCase["ended"] = 4] = "ended";
	})(SipCallAudioResponse.ResponseCase || (SipCallAudioResponse.ResponseCase = {}));
})(SipCallAudioResponse || (SipCallAudioResponse = {}));
var SipPlayWavFilesRequest = class SipPlayWavFilesRequest {
	static {
		this.id = "ondewo.sip.SipPlayWavFilesRequest";
	}
	static deserializeBinary(bytes) {
		const instance = new SipPlayWavFilesRequest();
		SipPlayWavFilesRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
		return instance;
	}
	static refineValues(_instance) {
		_instance.wavFiles = _instance.wavFiles || [];
	}
	static deserializeBinaryFromReader(_instance, _reader) {
		while (_reader.nextField()) {
			if (_reader.isEndGroup()) break;
			switch (_reader.getFieldNumber()) {
				case 1:
					(_instance.wavFiles = _instance.wavFiles || []).push(_reader.readBytes());
					break;
				default: _reader.skipField();
			}
		}
		SipPlayWavFilesRequest.refineValues(_instance);
	}
	static serializeBinaryToWriter(_instance, _writer) {
		if (_instance.wavFiles && _instance.wavFiles.length) _writer.writeRepeatedBytes(1, _instance.wavFiles);
	}
	constructor(_value) {
		_value = _value || {};
		this.wavFiles = (_value.wavFiles || []).map((b) => b ? b.subarray(0) : /* @__PURE__ */ new Uint8Array());
		SipPlayWavFilesRequest.refineValues(this);
	}
	get wavFiles() {
		return this._wavFiles;
	}
	set wavFiles(value) {
		this._wavFiles = value;
	}
	serializeBinary() {
		const writer = new BinaryWriter();
		SipPlayWavFilesRequest.serializeBinaryToWriter(this, writer);
		return writer.getResultBuffer();
	}
	toObject() {
		return { wavFiles: (this.wavFiles || []).map((b) => b ? b.subarray(0) : /* @__PURE__ */ new Uint8Array()) };
	}
	toJSON() {
		return this.toObject();
	}
	toProtobufJSON(options) {
		return { wavFiles: (this.wavFiles || []).map((b) => b ? uint8ArrayToBase64(b) : "") };
	}
};
const GRPC_SIP_CLIENT_SETTINGS = new InjectionToken("GRPC_SIP_CLIENT_SETTINGS");
var SipClient = class SipClient {
	constructor(settings, clientFactory, handler) {
		this.handler = handler;
		this.$raw = {
			sipStartSession: (requestData, requestMetadata = new GrpcMetadata()) => {
				return this.handler.handle({
					type: GrpcCallType.unary,
					client: this.client,
					path: "/ondewo.sip.Sip/SipStartSession",
					requestData,
					requestMetadata,
					requestClass: SipStartSessionRequest,
					responseClass: SipStatus
				});
			},
			sipEndSession: (requestData, requestMetadata = new GrpcMetadata()) => {
				return this.handler.handle({
					type: GrpcCallType.unary,
					client: this.client,
					path: "/ondewo.sip.Sip/SipEndSession",
					requestData,
					requestMetadata,
					requestClass: googleProtobuf001.Empty,
					responseClass: SipStatus
				});
			},
			sipStartCall: (requestData, requestMetadata = new GrpcMetadata()) => {
				return this.handler.handle({
					type: GrpcCallType.unary,
					client: this.client,
					path: "/ondewo.sip.Sip/SipStartCall",
					requestData,
					requestMetadata,
					requestClass: SipStartCallRequest,
					responseClass: SipStatus
				});
			},
			sipEndCall: (requestData, requestMetadata = new GrpcMetadata()) => {
				return this.handler.handle({
					type: GrpcCallType.unary,
					client: this.client,
					path: "/ondewo.sip.Sip/SipEndCall",
					requestData,
					requestMetadata,
					requestClass: SipEndCallRequest,
					responseClass: SipStatus
				});
			},
			sipTransferCall: (requestData, requestMetadata = new GrpcMetadata()) => {
				return this.handler.handle({
					type: GrpcCallType.unary,
					client: this.client,
					path: "/ondewo.sip.Sip/SipTransferCall",
					requestData,
					requestMetadata,
					requestClass: SipTransferCallRequest,
					responseClass: SipStatus
				});
			},
			sipRegisterAccount: (requestData, requestMetadata = new GrpcMetadata()) => {
				return this.handler.handle({
					type: GrpcCallType.unary,
					client: this.client,
					path: "/ondewo.sip.Sip/SipRegisterAccount",
					requestData,
					requestMetadata,
					requestClass: SipRegisterAccountRequest,
					responseClass: SipStatus
				});
			},
			sipGetSipStatus: (requestData, requestMetadata = new GrpcMetadata()) => {
				return this.handler.handle({
					type: GrpcCallType.unary,
					client: this.client,
					path: "/ondewo.sip.Sip/SipGetSipStatus",
					requestData,
					requestMetadata,
					requestClass: googleProtobuf001.Empty,
					responseClass: SipStatus
				});
			},
			sipGetSipStatusHistory: (requestData, requestMetadata = new GrpcMetadata()) => {
				return this.handler.handle({
					type: GrpcCallType.unary,
					client: this.client,
					path: "/ondewo.sip.Sip/SipGetSipStatusHistory",
					requestData,
					requestMetadata,
					requestClass: googleProtobuf001.Empty,
					responseClass: SipStatusHistoryResponse
				});
			},
			sipPlayWavFiles: (requestData, requestMetadata = new GrpcMetadata()) => {
				return this.handler.handle({
					type: GrpcCallType.unary,
					client: this.client,
					path: "/ondewo.sip.Sip/SipPlayWavFiles",
					requestData,
					requestMetadata,
					requestClass: SipPlayWavFilesRequest,
					responseClass: SipStatus
				});
			},
			sipMute: (requestData, requestMetadata = new GrpcMetadata()) => {
				return this.handler.handle({
					type: GrpcCallType.unary,
					client: this.client,
					path: "/ondewo.sip.Sip/SipMute",
					requestData,
					requestMetadata,
					requestClass: googleProtobuf001.Empty,
					responseClass: SipStatus
				});
			},
			sipUnMute: (requestData, requestMetadata = new GrpcMetadata()) => {
				return this.handler.handle({
					type: GrpcCallType.unary,
					client: this.client,
					path: "/ondewo.sip.Sip/SipUnMute",
					requestData,
					requestMetadata,
					requestClass: googleProtobuf001.Empty,
					responseClass: SipStatus
				});
			},
			sipReportAnsweringMachineDetected: (requestData, requestMetadata = new GrpcMetadata()) => {
				return this.handler.handle({
					type: GrpcCallType.unary,
					client: this.client,
					path: "/ondewo.sip.Sip/SipReportAnsweringMachineDetected",
					requestData,
					requestMetadata,
					requestClass: SipReportAnsweringMachineDetectedRequest,
					responseClass: SipStatus
				});
			},
			sipSetCallMediaControl: (requestData, requestMetadata = new GrpcMetadata()) => {
				return this.handler.handle({
					type: GrpcCallType.unary,
					client: this.client,
					path: "/ondewo.sip.Sip/SipSetCallMediaControl",
					requestData,
					requestMetadata,
					requestClass: SipSetCallMediaControlRequest,
					responseClass: SipStatus
				});
			},
			sipSendDtmf: (requestData, requestMetadata = new GrpcMetadata()) => {
				return this.handler.handle({
					type: GrpcCallType.unary,
					client: this.client,
					path: "/ondewo.sip.Sip/SipSendDtmf",
					requestData,
					requestMetadata,
					requestClass: SipSendDtmfRequest,
					responseClass: SipStatus
				});
			}
		};
		this.client = clientFactory.createClient("ondewo.sip.Sip", settings);
	}
	sipStartSession(requestData, requestMetadata = new GrpcMetadata()) {
		return this.$raw.sipStartSession(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
	}
	sipEndSession(requestData, requestMetadata = new GrpcMetadata()) {
		return this.$raw.sipEndSession(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
	}
	sipStartCall(requestData, requestMetadata = new GrpcMetadata()) {
		return this.$raw.sipStartCall(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
	}
	sipEndCall(requestData, requestMetadata = new GrpcMetadata()) {
		return this.$raw.sipEndCall(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
	}
	sipTransferCall(requestData, requestMetadata = new GrpcMetadata()) {
		return this.$raw.sipTransferCall(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
	}
	sipRegisterAccount(requestData, requestMetadata = new GrpcMetadata()) {
		return this.$raw.sipRegisterAccount(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
	}
	sipGetSipStatus(requestData, requestMetadata = new GrpcMetadata()) {
		return this.$raw.sipGetSipStatus(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
	}
	sipGetSipStatusHistory(requestData, requestMetadata = new GrpcMetadata()) {
		return this.$raw.sipGetSipStatusHistory(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
	}
	sipPlayWavFiles(requestData, requestMetadata = new GrpcMetadata()) {
		return this.$raw.sipPlayWavFiles(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
	}
	sipMute(requestData, requestMetadata = new GrpcMetadata()) {
		return this.$raw.sipMute(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
	}
	sipUnMute(requestData, requestMetadata = new GrpcMetadata()) {
		return this.$raw.sipUnMute(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
	}
	sipReportAnsweringMachineDetected(requestData, requestMetadata = new GrpcMetadata()) {
		return this.$raw.sipReportAnsweringMachineDetected(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
	}
	sipSetCallMediaControl(requestData, requestMetadata = new GrpcMetadata()) {
		return this.$raw.sipSetCallMediaControl(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
	}
	sipSendDtmf(requestData, requestMetadata = new GrpcMetadata()) {
		return this.$raw.sipSendDtmf(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.3.0",
			ngImport: i0,
			type: SipClient,
			deps: [
				{
					token: GRPC_SIP_CLIENT_SETTINGS,
					optional: true
				},
				{ token: GRPC_CLIENT_FACTORY },
				{ token: i1.GrpcHandler }
			],
			target: i0.ɵɵFactoryTarget.Injectable
		});
	}
	static {
		this.ɵprov = i0.ɵɵngDeclareInjectable({
			minVersion: "12.0.0",
			version: "22.3.0",
			ngImport: i0,
			type: SipClient,
			providedIn: "any"
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.3.0",
	ngImport: i0,
	type: SipClient,
	decorators: [{
		type: Injectable,
		args: [{ providedIn: "any" }]
	}],
	ctorParameters: () => [
		{
			type: void 0,
			decorators: [{ type: Optional }, {
				type: Inject,
				args: [GRPC_SIP_CLIENT_SETTINGS]
			}]
		},
		{
			type: void 0,
			decorators: [{
				type: Inject,
				args: [GRPC_CLIENT_FACTORY]
			}]
		},
		{ type: i1.GrpcHandler }
	]
});
const TOKEN_PROVIDER = new InjectionToken("ONDEWO_SIP_TOKEN_PROVIDER");
const AUTHORIZATION_HEADER = "Authorization";
const BEARER_PREFIX = "Bearer ";
function resolveToken(result) {
	const source = isObservable(result) ? result : from(Promise.resolve(result));
	return new Observable((subscriber) => {
		const subscription = source.subscribe({
			next: (token) => subscriber.next(normalizeToken(token)),
			error: (caughtError) => subscriber.error(caughtError),
			complete: () => subscriber.complete()
		});
		return () => subscription.unsubscribe();
	});
}
function buildBearerValue(token) {
	return token === null ? null : `${BEARER_PREFIX}${token}`;
}
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
function normalizeToken(token) {
	if (token === null || token === void 0) return null;
	const trimmed = token.trim();
	return trimmed.length === 0 ? null : trimmed;
}
function authHttpInterceptor(req, next) {
	if (req.headers.has("Authorization")) return next(req);
	return resolveBearerValue(inject(TOKEN_PROVIDER).getToken()).pipe(switchMap((bearerValue) => {
		if (bearerValue === null) return next(req);
		return next(req.clone({ setHeaders: { [AUTHORIZATION_HEADER]: bearerValue } }));
	}));
}
var AuthGrpcInterceptor = class AuthGrpcInterceptor {
	constructor(tokenProvider) {
		this.tokenProvider = tokenProvider;
	}
	intercept(request, next) {
		if (request.requestMetadata.has("Authorization")) return next.handle(request);
		return resolveBearerValue(this.tokenProvider.getToken()).pipe(switchMap((bearerValue) => {
			if (bearerValue !== null) request.requestMetadata.set(AUTHORIZATION_HEADER, bearerValue);
			return next.handle(request);
		}));
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.3.0",
			ngImport: i0,
			type: AuthGrpcInterceptor,
			deps: [{ token: TOKEN_PROVIDER }],
			target: i0.ɵɵFactoryTarget.Injectable
		});
	}
	static {
		this.ɵprov = i0.ɵɵngDeclareInjectable({
			minVersion: "12.0.0",
			version: "22.3.0",
			ngImport: i0,
			type: AuthGrpcInterceptor
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.3.0",
	ngImport: i0,
	type: AuthGrpcInterceptor,
	decorators: [{ type: Injectable }],
	ctorParameters: () => [{
		type: void 0,
		decorators: [{
			type: Inject,
			args: [TOKEN_PROVIDER]
		}]
	}]
});
const ROUND_CONSTANTS = [
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
];
const INITIAL_HASH = [
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
];
function rotateRight(word, bits) {
	return word >>> bits | word << 32 - bits;
}
function utf8Bytes(text) {
	const bytes = [];
	for (const character of text) {
		let codePoint = Number(character.codePointAt(0));
		if (codePoint >= 55296 && codePoint <= 57343) codePoint = 65533;
		if (codePoint < 128) bytes.push(codePoint);
		else if (codePoint < 2048) bytes.push(192 | codePoint >> 6, 128 | codePoint & 63);
		else if (codePoint < 65536) bytes.push(224 | codePoint >> 12, 128 | codePoint >> 6 & 63, 128 | codePoint & 63);
		else bytes.push(240 | codePoint >> 18, 128 | codePoint >> 12 & 63, 128 | codePoint >> 6 & 63, 128 | codePoint & 63);
	}
	return bytes;
}
function sha256Hex(text) {
	const bytes = utf8Bytes(text);
	const bitLength = bytes.length * 8;
	bytes.push(128);
	while (bytes.length % 64 !== 56) bytes.push(0);
	const highBits = Math.floor(bitLength / 4294967296);
	for (const word of [highBits, bitLength >>> 0]) bytes.push(word >>> 24 & 255, word >>> 16 & 255, word >>> 8 & 255, word & 255);
	const hash = INITIAL_HASH.slice();
	const schedule = new Array(64);
	for (let offset = 0; offset < bytes.length; offset += 64) {
		for (let index = 0; index < 16; index++) {
			const at = offset + index * 4;
			schedule[index] = bytes[at] << 24 | bytes[at + 1] << 16 | bytes[at + 2] << 8 | bytes[at + 3];
		}
		for (let index = 16; index < 64; index++) {
			const before15 = schedule[index - 15];
			const before2 = schedule[index - 2];
			const sigma0 = rotateRight(before15, 7) ^ rotateRight(before15, 18) ^ before15 >>> 3;
			const sigma1 = rotateRight(before2, 17) ^ rotateRight(before2, 19) ^ before2 >>> 10;
			schedule[index] = schedule[index - 16] + sigma0 + schedule[index - 7] + sigma1 | 0;
		}
		let [a, b, c, d, e, f, g, h] = hash;
		for (let index = 0; index < 64; index++) {
			const sum1 = rotateRight(e, 6) ^ rotateRight(e, 11) ^ rotateRight(e, 25);
			const choice = e & f ^ ~e & g;
			const temp1 = h + sum1 + choice + ROUND_CONSTANTS[index] + schedule[index] | 0;
			const temp2 = (rotateRight(a, 2) ^ rotateRight(a, 13) ^ rotateRight(a, 22)) + (a & b ^ a & c ^ b & c) | 0;
			h = g;
			g = f;
			f = e;
			e = d + temp1 | 0;
			d = c;
			c = b;
			b = a;
			a = temp1 + temp2 | 0;
		}
		const working = [
			a,
			b,
			c,
			d,
			e,
			f,
			g,
			h
		];
		for (let index = 0; index < 8; index++) hash[index] = hash[index] + working[index] | 0;
	}
	return hash.map((word) => (word >>> 0).toString(16).padStart(8, "0")).join("");
}
const REFRESH_SKEW_IN_S = 30;
const MIN_REFRESH_DELAY_IN_S = 1;
const REFRESH_RETRY_BASE_DELAY_IN_S = 5;
const REFRESH_RETRY_MAX_DELAY_IN_S = 300;
const MAX_REFRESH_RETRY_EXPONENT = 6;
const HTTP_TIMEOUT_IN_S = 10;
const MAX_ERROR_BODY_CHARS = 500;
const REDACTED = "***REDACTED***";
const DEFAULT_KEYCLOAK_TIMINGS = Object.freeze({
	expiryLeewayInS: 30,
	minRefreshDelayInS: 1,
	retryBaseDelayInS: 5,
	retryMaxDelayInS: 300,
	maxRetryExponent: 6,
	httpTimeoutInS: 10,
	maxErrorBodyChars: 500
});
var KeycloakAuthenticationError = class extends Error {
	constructor(message, options = {}) {
		super(message, options);
		this.name = "KeycloakAuthenticationError";
	}
};
var KeycloakTransportError = class extends Error {
	constructor(message, options = {}) {
		super(message, options);
		this.name = "KeycloakTransportError";
	}
};
const CONSOLE_KEYCLOAK_LOGGER = {
	warn: (message) => console.warn(message),
	info: (message) => console.info(message),
	debug: (message) => console.debug(message)
};
const GLOBAL_KEYCLOAK_SCHEDULER = {
	setTimeout: (fn, delayInMs) => setTimeout(fn, delayInMs),
	clearTimeout: (handle) => clearTimeout(handle)
};
function backoffDelayInS(consecutiveFailures, randomFn, timings = DEFAULT_KEYCLOAK_TIMINGS) {
	const exponent = Math.min(Math.max(consecutiveFailures, 1) - 1, timings.maxRetryExponent);
	const ceilingInS = Math.min(timings.retryBaseDelayInS * 2 ** exponent, timings.retryMaxDelayInS);
	const fraction = Math.min(Math.max(randomFn(), 0), 1);
	return timings.retryBaseDelayInS + fraction * (ceilingInS - timings.retryBaseDelayInS);
}
function describeError(error) {
	if (typeof error === "object" && error !== null && typeof error.message === "string") {
		const errorLike = error;
		return `${errorLike.name ?? "Error"}: ${errorLike.message}`;
	}
	return `${typeof error}: ${String(error)}`;
}
function jsonTypeName(value) {
	if (Array.isArray(value)) return "array";
	if (value === null) return "null";
	return typeof value;
}
function asAuthenticationError(error, action) {
	if (error instanceof KeycloakAuthenticationError) return error;
	return new KeycloakAuthenticationError(`Keycloak token ${action} failed (${describeError(error)})`, { cause: error });
}
function redactSecret(value) {
	if (value === void 0 || value === null || value.length === 0) return "";
	return REDACTED;
}
function keycloakSessionRegistryKey(fields) {
	let tokenExpiration = "";
	if (fields.tokenExpirationInS !== void 0 && fields.tokenExpirationInS !== null) tokenExpiration = String(fields.tokenExpirationInS);
	let verifySsl = "True";
	if (fields.verifySsl === false) verifySsl = "False";
	return sha256Hex([
		fields.keycloakUrl,
		fields.realm,
		fields.clientId,
		fields.username ?? "",
		fields.password ?? "",
		tokenExpiration,
		verifySsl,
		fields.refreshToken ?? ""
	].join("\0"));
}
var KeycloakTokenSession = class KeycloakTokenSession {
	constructor(options) {
		this.currentAccessToken = "";
		this.expiresAt = 0;
		this.loginDeadline = null;
		this.failures = 0;
		this.nextAttemptAt = 0;
		this.inFlight = null;
		this.timer = null;
		this.timerArmed = false;
		this.backgroundStopped = true;
		this.stopCalled = false;
		this.keycloakUrl = options.keycloakUrl.replace(/\/+$/, "");
		this.realm = options.realm;
		this.clientId = options.clientId;
		this.username = options.username ?? "";
		this.password = options.password ?? "";
		this.tokenExpirationInS = options.tokenExpirationInS ?? null;
		this.verifySsl = options.verifySsl ?? true;
		this.transport = options.transport;
		this.timeFn = options.timeFn ?? (() => performance.now() / 1e3);
		this.randomFn = options.randomFn ?? Math.random;
		this.scheduler = options.scheduler ?? GLOBAL_KEYCLOAK_SCHEDULER;
		this.logger = options.logger ?? CONSOLE_KEYCLOAK_LOGGER;
		this.timings = {
			...DEFAULT_KEYCLOAK_TIMINGS,
			...options.timings ?? {}
		};
		this.configuredRefreshToken = options.refreshToken ?? "";
		this.currentRefreshToken = this.configuredRefreshToken;
		this.tokenEndpoint = `${this.keycloakUrl}/realms/${encodeURIComponent(this.realm)}/protocol/openid-connect/token`;
	}
	static async create(options) {
		const session = new KeycloakTokenSession(options);
		await session.acquireInitialToken();
		if (options.startBackgroundRefresh ?? true) {
			session.backgroundStopped = false;
			session.scheduleNextBackgroundRefresh();
		}
		return session;
	}
	get accessToken() {
		return this.currentAccessToken;
	}
	get accessTokenExpiresAt() {
		return this.expiresAt;
	}
	get autoRefreshDeadline() {
		return this.loginDeadline;
	}
	get consecutiveFailures() {
		return this.failures;
	}
	get nextRefreshAttemptAt() {
		return this.nextAttemptAt;
	}
	get backgroundRefreshActive() {
		return !this.backgroundStopped;
	}
	get closed() {
		return this.stopCalled;
	}
	peekAccessToken() {
		const now = this.timeFn();
		if (this.loginDeadline !== null && now >= this.loginDeadline) return this.currentAccessToken;
		if (now < this.expiresAt - this.timings.expiryLeewayInS) return this.currentAccessToken;
		return null;
	}
	async getAccessToken(options = {}) {
		await this.refreshIfWithinWindow(options.force ?? false);
		return this.currentAccessToken;
	}
	async authorizationMetadata() {
		return ["authorization", `Bearer ${await this.getAccessToken()}`];
	}
	stop() {
		this.stopCalled = true;
		this.backgroundStopped = true;
		this.disarmTimer();
	}
	close() {
		this.stop();
	}
	toJSON() {
		return {
			keycloakUrl: this.keycloakUrl,
			realm: this.realm,
			clientId: this.clientId,
			username: this.username,
			password: redactSecret(this.password),
			tokenExpirationInS: this.tokenExpirationInS,
			verifySsl: this.verifySsl,
			refreshToken: redactSecret(this.configuredRefreshToken)
		};
	}
	toString() {
		return `KeycloakTokenSession(${JSON.stringify(this.toJSON())})`;
	}
	async acquireInitialToken() {
		const useRefreshToken = this.configuredRefreshToken.length > 0;
		let action = "login";
		if (useRefreshToken) action = "refresh";
		try {
			if (useRefreshToken) await this.refreshGrant();
			else await this.passwordGrant();
		} catch (error) {
			throw asAuthenticationError(error, action);
		}
		if (this.tokenExpirationInS !== null) this.loginDeadline = this.timeFn() + this.tokenExpirationInS;
	}
	async refreshIfWithinWindow(force) {
		let skipValidityShortcut = force;
		for (;;) {
			if (this.inFlight !== null) {
				await this.inFlight;
				skipValidityShortcut = false;
				continue;
			}
			const now = this.timeFn();
			if (this.loginDeadline !== null && now >= this.loginDeadline) return;
			if (!skipValidityShortcut && now < this.expiresAt - this.timings.expiryLeewayInS) return;
			if (now < this.nextAttemptAt) {
				if (now < this.expiresAt) return;
				throw new KeycloakAuthenticationError(`The Keycloak access token has expired and the refresh is backing off after ${this.failures} consecutive failure(s); the next attempt is due in ${(this.nextAttemptAt - now).toFixed(1)}s`);
			}
			const attempt = this.refreshGrant().then(() => {
				this.recordSuccess();
				return {
					failed: false,
					error: null
				};
			}, (error) => {
				this.recordFailure(error);
				return {
					failed: true,
					error
				};
			});
			this.inFlight = attempt;
			let outcome;
			try {
				outcome = await attempt;
			} finally {
				this.inFlight = null;
			}
			if (!outcome.failed) return;
			if (this.timeFn() < this.expiresAt) return;
			throw asAuthenticationError(outcome.error, "refresh");
		}
	}
	recordFailure(error) {
		const now = this.timeFn();
		this.failures += 1;
		const delayInS = backoffDelayInS(this.failures, this.randomFn, this.timings);
		this.nextAttemptAt = now + delayInS;
		const remainingInS = this.expiresAt - now;
		let validity = "the current access token has expired";
		if (remainingInS > 0) validity = `the current access token stays valid for ${remainingInS.toFixed(1)}s`;
		this.logger.warn(`Keycloak token refresh failed (attempt ${this.failures}); retrying in ${delayInS.toFixed(1)}s, ${validity} (${describeError(error)})`);
	}
	recordSuccess() {
		if (this.failures > 0) this.logger.info(`Keycloak token refresh recovered after ${this.failures} failed attempt(s)`);
		this.failures = 0;
		this.nextAttemptAt = 0;
	}
	scheduleNextBackgroundRefresh() {
		if (this.backgroundStopped) return;
		const now = this.timeFn();
		const deadline = this.loginDeadline;
		if (deadline !== null && now >= deadline) {
			this.backgroundStopped = true;
			return;
		}
		let delayInS = this.expiresAt - this.timings.expiryLeewayInS - now;
		if (this.failures > 0) delayInS = this.nextAttemptAt - now;
		delayInS = Math.max(delayInS, this.timings.minRefreshDelayInS);
		if (deadline !== null) delayInS = Math.min(delayInS, deadline - now);
		this.timerArmed = true;
		this.timer = this.scheduler.setTimeout(() => {
			this.timerArmed = false;
			this.timer = null;
			if (this.backgroundStopped) return;
			this.refreshIfWithinWindow(false).catch((error) => {
				this.logger.debug(`Keycloak background refresh will be retried (${describeError(error)})`);
			}).finally(() => this.scheduleNextBackgroundRefresh());
		}, delayInS * 1e3);
	}
	disarmTimer() {
		if (this.timerArmed) {
			this.scheduler.clearTimeout(this.timer);
			this.timerArmed = false;
			this.timer = null;
		}
	}
	async passwordGrant() {
		const payload = await this.postTokenRequest({
			grant_type: "password",
			client_id: this.clientId,
			username: this.username,
			password: this.password,
			scope: "offline_access"
		}, "login");
		this.storeTokens(payload);
	}
	async refreshGrant() {
		const payload = await this.postTokenRequest({
			grant_type: "refresh_token",
			client_id: this.clientId,
			refresh_token: this.currentRefreshToken
		}, "refresh");
		this.storeTokens(payload);
	}
	async postTokenRequest(form, action) {
		let response;
		try {
			response = await this.transport({
				url: this.tokenEndpoint,
				form,
				timeoutInS: this.timings.httpTimeoutInS,
				verifySsl: this.verifySsl
			});
		} catch (error) {
			if (error instanceof KeycloakTransportError) {
				let reason = error;
				if (error.cause !== void 0) reason = error.cause;
				throw new KeycloakAuthenticationError(`Keycloak token ${action} could not reach the token endpoint (${describeError(reason)})`, { cause: error });
			}
			throw error;
		}
		if (response.status < 200 || response.status >= 300) throw new KeycloakAuthenticationError(`Keycloak token ${action} failed with status ${response.status}: ${response.body.slice(0, this.timings.maxErrorBodyChars)}`);
		let body;
		try {
			body = JSON.parse(response.body);
		} catch (error) {
			throw new KeycloakAuthenticationError(`Keycloak token ${action} returned status ${response.status} with a body that is not JSON`, { cause: error });
		}
		if (typeof body !== "object" || body === null || Array.isArray(body)) throw new KeycloakAuthenticationError(`Keycloak token ${action} returned a JSON ${jsonTypeName(body)} instead of an object`);
		return body;
	}
	storeTokens(payload) {
		const accessToken = payload["access_token"];
		if (typeof accessToken !== "string" || accessToken.length === 0) throw new KeycloakAuthenticationError(`Keycloak token response did not contain an access_token; the response carried the fields [${Object.keys(payload).sort().map((name) => `'${name}'`).join(", ")}] (values withheld: a token response is credential material)`);
		let expiresInRaw = 0;
		if ("expires_in" in payload) expiresInRaw = payload["expires_in"];
		let expiresIn = NaN;
		if (typeof expiresInRaw === "number") expiresIn = expiresInRaw;
		else if (typeof expiresInRaw === "string" && expiresInRaw.trim().length > 0) expiresIn = Number(expiresInRaw);
		if (Number.isNaN(expiresIn)) throw new KeycloakAuthenticationError("Keycloak token response carried a non-numeric expires_in (value withheld)");
		this.currentAccessToken = accessToken;
		const refreshToken = payload["refresh_token"];
		if (typeof refreshToken === "string" && refreshToken.length > 0) this.currentRefreshToken = refreshToken;
		this.expiresAt = this.timeFn() + Math.max(expiresIn, 0);
	}
};
const SESSION_REGISTRY = /* @__PURE__ */ new WeakMap();
async function acquireKeycloakTokenSession(options, scope = options.transport) {
	const key = keycloakSessionRegistryKey(options);
	let sessions = SESSION_REGISTRY.get(scope);
	if (sessions === void 0) {
		sessions = /* @__PURE__ */ new Map();
		SESSION_REGISTRY.set(scope, sessions);
	}
	const scoped = sessions;
	let entry = scoped.get(key);
	if (entry === void 0 || entry.session !== null && entry.session.closed) {
		const created = {
			promise: KeycloakTokenSession.create(options),
			session: null,
			holders: 0
		};
		created.promise.then((started) => {
			created.session = started;
		}, () => {
			scoped.delete(key);
		});
		scoped.set(key, created);
		entry = created;
	}
	const held = entry;
	held.holders += 1;
	let session;
	try {
		session = await held.promise;
	} catch (error) {
		held.holders -= 1;
		throw error;
	}
	let released = false;
	return {
		session,
		release: () => {
			if (released) return;
			released = true;
			held.holders -= 1;
			if (held.holders === 0) {
				session.stop();
				if (scoped.get(key) === held) scoped.delete(key);
			}
		}
	};
}
const KEYCLOAK_TOKEN_PROVIDER_CONFIG = new InjectionToken("ONDEWO_SIP_KEYCLOAK_TOKEN_PROVIDER_CONFIG");
function resolveCredentials(config) {
	const keycloakUrl = config.keycloakUrl ?? "";
	const realm = config.realm ?? "";
	const clientId = config.clientId ?? "";
	const configured = [
		keycloakUrl,
		realm,
		clientId
	].filter((value) => value.length > 0).length;
	if (configured === 0) return null;
	if (configured < 3) throw new KeycloakAuthenticationError("The Keycloak fields `keycloakUrl`, `realm`, and `clientId` must be provided together in KeycloakTokenProviderConfig.");
	const refreshToken = config.refreshToken || config.offlineToken || "";
	const password = config.password ?? "";
	const username = config.username ?? "";
	if (refreshToken.length === 0 && password.length === 0) throw new KeycloakAuthenticationError("Either the field `password` or the field `refreshToken` (refresh_token; deprecated alias `offlineToken`) is mandatory in KeycloakTokenProviderConfig.");
	if (refreshToken.length === 0 && username.length === 0) throw new KeycloakAuthenticationError("KeycloakTokenProvider requires either an offlineToken or a username + password pair");
	return {
		keycloakUrl,
		realm,
		clientId,
		username,
		password,
		tokenExpirationInS: config.tokenExpirationInS ?? null,
		verifySsl: config.keycloakVerifySsl ?? true,
		refreshToken
	};
}
var KeycloakTokenProvider = class KeycloakTokenProvider {
	constructor() {
		this.http = inject(HttpClient);
		this.zone = inject(NgZone);
		this.scheduler = {
			setTimeout: (fn, delayInMs) => this.zone.runOutsideAngular(() => GLOBAL_KEYCLOAK_SCHEDULER.setTimeout(fn, delayInMs)),
			clearTimeout: (handle) => GLOBAL_KEYCLOAK_SCHEDULER.clearTimeout(handle)
		};
		this.config = inject(KEYCLOAK_TOKEN_PROVIDER_CONFIG, { optional: true });
		this.verifySsl = true;
		this.session = null;
		this.lease = null;
		this.starting = null;
		this.generation = 0;
		this.destroyed = false;
		this.transport = (request) => {
			const headers = new HttpHeaders({
				"Content-Type": "application/x-www-form-urlencoded",
				Accept: "application/json"
			});
			const response$ = this.http.post(request.url, new URLSearchParams(request.form).toString(), {
				headers,
				observe: "response",
				responseType: "text"
			}).pipe(timeout({ first: request.timeoutInS * 1e3 }), map((response) => ({
				status: response.status,
				body: response.body ?? ""
			})), catchError((error) => {
				if (error instanceof HttpErrorResponse && error.status !== 0) {
					let body = "";
					if (typeof error.error === "string") body = error.error;
					return of({
						status: error.status,
						body
					});
				}
				return throwError(() => new KeycloakTransportError("the token endpoint gave no HTTP answer", { cause: error }));
			}));
			return firstValueFrom(response$);
		};
		this.ready = new Promise((resolve, reject) => {
			this.resolveReady = resolve;
			this.rejectReady = reject;
		});
		this.ready.catch(() => void 0);
		if (this.config === null) return;
		this.start(this.config).then(() => this.resolveReady(), (error) => this.rejectReady(error));
	}
	async configure(config) {
		this.destroyed = false;
		try {
			await this.start(config);
		} catch (error) {
			this.rejectReady(error);
			throw error;
		}
		this.resolveReady();
	}
	async ensureFreshToken(options = {}) {
		if (this.config === null) return null;
		if (this.session === null) await (this.starting ?? this.start(this.config));
		if (this.session === null) return null;
		return this.session.getAccessToken({ force: options.force ?? false });
	}
	getToken() {
		if (this.session === null) {
			if (this.starting === null) return null;
			return this.starting.then(() => {
				if (this.session === null) return null;
				return this.session.getAccessToken();
			}, () => null);
		}
		const token = this.session.peekAccessToken();
		if (token !== null) return token;
		return this.session.getAccessToken();
	}
	get keycloakVerifySsl() {
		return this.verifySsl;
	}
	whenReady() {
		return this.ready;
	}
	ngOnDestroy() {
		this.destroyed = true;
		this.releaseLease();
	}
	toJSON() {
		if (this.config === null) return {};
		return {
			...this.config,
			password: redactSecret(this.config.password),
			offlineToken: redactSecret(this.config.offlineToken),
			refreshToken: redactSecret(this.config.refreshToken)
		};
	}
	toString() {
		return `KeycloakTokenProvider(${JSON.stringify(this.toJSON())})`;
	}
	releaseLease() {
		if (this.lease !== null) {
			this.lease.release();
			this.lease = null;
		}
	}
	start(config) {
		this.generation += 1;
		const generation = this.generation;
		this.releaseLease();
		this.session = null;
		this.config = config;
		this.verifySsl = config.keycloakVerifySsl ?? true;
		const starting = this.startSession(config, generation).finally(() => {
			if (this.starting === starting) this.starting = null;
		});
		this.starting = starting;
		return starting;
	}
	async startSession(config, generation) {
		const credentials = resolveCredentials(config);
		if (credentials === null) return;
		const lease = await acquireKeycloakTokenSession({
			...credentials,
			transport: this.transport,
			randomFn: config.randomFraction,
			logger: config.logger,
			scheduler: this.scheduler
		}, this.http);
		if (generation !== this.generation) {
			lease.release();
			return;
		}
		this.session = lease.session;
		if (this.destroyed) {
			lease.release();
			return;
		}
		this.lease = lease;
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.3.0",
			ngImport: i0,
			type: KeycloakTokenProvider,
			deps: [],
			target: i0.ɵɵFactoryTarget.Injectable
		});
	}
	static {
		this.ɵprov = i0.ɵɵngDeclareInjectable({
			minVersion: "12.0.0",
			version: "22.3.0",
			ngImport: i0,
			type: KeycloakTokenProvider,
			providedIn: "root"
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.3.0",
	ngImport: i0,
	type: KeycloakTokenProvider,
	decorators: [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}],
	ctorParameters: () => []
});
function provideOndewoSipAuth(tokenProvider) {
	return makeEnvironmentProviders([
		tokenProvider,
		{
			provide: TOKEN_PROVIDER,
			useExisting: tokenProvider
		},
		{
			provide: GRPC_INTERCEPTORS,
			useClass: AuthGrpcInterceptor,
			multi: true
		}
	]);
}
function provideKeycloakTokenProvider(config) {
	return makeEnvironmentProviders([{
		provide: KEYCLOAK_TOKEN_PROVIDER_CONFIG,
		useValue: config
	}]);
}
const BROWSER_UNSUPPORTED_TLS_FIELDS = [
	"grpcCert",
	"grpcClientCert",
	"grpcClientKey",
	"grpc_cert",
	"grpc_client_cert",
	"grpc_client_key"
];
var GrpcWebEndpointError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "GrpcWebEndpointError";
	}
};
const SCHEME_PATTERN = /^[a-z][a-z0-9+.-]*:\/\//i;
const BARE_IPV6_PATTERN = /^(?=(?:[^:]*:){2})[0-9a-f:.]+$/i;
function buildGrpcWebHost(config) {
	const fields = config;
	for (const field of BROWSER_UNSUPPORTED_TLS_FIELDS) {
		const value = fields[field];
		if (value !== void 0 && value !== null && value !== "") throw new GrpcWebEndpointError(`GrpcWebEndpointConfig.${field} is not supported by a browser gRPC-web client: the browser owns the TLS handshake, trusts its own certificate store and presents a client certificate only from the browser/OS store. Remove the field (never ship a private key to a browser); see the README section 'TLS, mutual TLS and certificates'.`);
	}
	const host = config.host;
	if (typeof host !== "string" || host.trim() === "") throw new GrpcWebEndpointError("GrpcWebEndpointConfig.host must be a non-empty string");
	const secure = config.useSecureChannel !== false;
	if (SCHEME_PATTERN.test(host)) {
		if (config.port !== void 0) throw new GrpcWebEndpointError("GrpcWebEndpointConfig.port must be omitted when GrpcWebEndpointConfig.host is a URL; put the port in the URL");
		let url;
		try {
			url = new URL(host);
		} catch {
			throw new GrpcWebEndpointError("GrpcWebEndpointConfig.host is not a valid URL");
		}
		if (url.protocol !== "https:" && url.protocol !== "http:") throw new GrpcWebEndpointError("GrpcWebEndpointConfig.host must use the http:// or https:// scheme");
		if (url.protocol === "http:") {
			if (secure) throw new GrpcWebEndpointError("GrpcWebEndpointConfig.host uses http:// but useSecureChannel is true; use an https:// URL or set useSecureChannel: false");
			warnInsecure(url.host);
		}
		return host;
	}
	let bareHost = host;
	if (!host.startsWith("[") && host.includes(":")) {
		if (!BARE_IPV6_PATTERN.test(host)) throw new GrpcWebEndpointError("GrpcWebEndpointConfig.host must not contain a port; set GrpcWebEndpointConfig.port instead");
		bareHost = `[${host}]`;
	}
	let authority = bareHost;
	if (config.port !== void 0) {
		const port = Number(config.port);
		if (String(config.port).trim() === "" || !Number.isInteger(port) || port < 1 || port > 65535) throw new GrpcWebEndpointError("GrpcWebEndpointConfig.port must be an integer between 1 and 65535");
		authority = `${bareHost}:${port}`;
	}
	if (secure) return `https://${authority}`;
	warnInsecure(authority);
	return `http://${authority}`;
}
function warnInsecure(authority) {
	console.warn(`ONDEWO gRPC-web: insecure http:// endpoint ${authority}; requests and bearer tokens are sent unencrypted. Use useSecureChannel: true (https://) outside local development.`);
}
export { AUTHORIZATION_HEADER, AnsweringMachineDetectionResult, AuthGrpcInterceptor, BEARER_PREFIX, BROWSER_UNSUPPORTED_TLS_FIELDS, CONSOLE_KEYCLOAK_LOGGER, DEFAULT_KEYCLOAK_TIMINGS, GLOBAL_KEYCLOAK_SCHEDULER, GRPC_SIP_CLIENT_SETTINGS, GrpcWebEndpointError, HTTP_TIMEOUT_IN_S, KEYCLOAK_TOKEN_PROVIDER_CONFIG, KeycloakAuthenticationError, KeycloakTokenProvider, KeycloakTokenSession, KeycloakTransportError, MAX_ERROR_BODY_CHARS, MAX_REFRESH_RETRY_EXPONENT, MIN_REFRESH_DELAY_IN_S, MediaControlOwner, MediaControlSetting, REDACTED, REFRESH_RETRY_BASE_DELAY_IN_S, REFRESH_RETRY_MAX_DELAY_IN_S, REFRESH_SKEW_IN_S, SipCallAudioConfig, SipCallAudioEndReason, SipCallAudioEnded, SipCallAudioFrame, SipCallAudioMode, SipCallAudioRequest, SipCallAudioResponse, SipCallAudioStarted, SipCallAudioStats, SipClient, SipDelegatedTransfer, SipEndCallRequest, SipPlayWavFilesRequest, SipRegisterAccountRequest, SipReportAnsweringMachineDetectedRequest, SipSendDtmfRequest, SipSetCallMediaControlRequest, SipStartCallRequest, SipStartSessionRequest, SipStatus, SipStatusHistoryResponse, SipTransferCallRequest, SipTransferDelegation, SipWarmTransferOutcome, SipWarmTransferOutcomeNotice, SipWarmTransferOutcomeNoticeStatus, TOKEN_PROVIDER, acquireKeycloakTokenSession, authHttpInterceptor, backoffDelayInS, buildBearerValue, buildGrpcWebHost, keycloakSessionRegistryKey, provideKeycloakTokenProvider, provideOndewoSipAuth, redactSecret, resolveBearerValue, resolveToken };

//# sourceMappingURL=ondewo-sip-client-angular.mjs.map