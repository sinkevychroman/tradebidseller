import {Logger} from '../utils/AppLogger';
export default class SessionUploadManager {
  static getInstance() {
    if (typeof SessionUploadManager.instance === 'object') {
      return SessionUploadManager.instance;
    }
    return new SessionUploadManager();
  }
  constructor(sessionID) {
    if (typeof SessionUploadManager.instance === 'object') {
      return SessionUploadManager.instance;
    }
    SessionUploadManager.instance = this;

    this.sessionID = sessionID;
    this.listCage = new Array();
    this.listSession = new Map();
  }

  getSessionUpload(sessionID) {
    if (this.listSession.get(sessionID) == null) {
      this.listSession.set(sessionID, new SessionUpload(sessionID));
    }
    return this.listSession.get(sessionID);
  }
}

class SessionUpload {
  constructor(sessionID) {
    this.sessionID = sessionID;
    this.listCage = [];
    this.listPhotoUploads = new Map();
    this.isAllDoneUpload = false;
    this.isCheckDeclare = true;
    this.doneCheckList = [];
  }

  setCheckDeclare(boolean) {
    this.isCheckDeclare = boolean;
    this.isAllDoneUpload =
      this._checkDonePhoto() &&
      this._checkListCageUploadSuccess() &&
      this.isCheckDeclare;

    this.onAllDoneUpload(this.isAllDoneUpload);
  }

  setListCage(cages) {
    this.listCage = [...cages];
  }

  setPhotoUploadStatus(status) {
    this.listPhotoUploads.set(status.cageID, status);

    if (status.status.isSuccess) {
      this.doneCheckList.push(status.cageID);
    }

    this.isAllDoneUpload =
      this._checkDonePhoto() &&
      this._checkListCageUploadSuccess() &&
      this.isCheckDeclare;

    Logger('_checkDonePhoto', this._checkDonePhoto());

    Logger('_checkListCageUploadSuccess', this._checkListCageUploadSuccess());

    Logger('isCheckDeclare', this.isCheckDeclare);

    this.onAllDoneUpload(this.isAllDoneUpload);
  }

  _checkDonePhoto() {
    this.listPhotoUploads.forEach((value, key, map) => {
      if (!value.status.isSuccess) {
        return false;
      }
    });
    return true;
  }

  _checkListCageUploadSuccess() {
    if (this.listCage.length === 0) {
      return true;
    } else {
      return this.listCage.length === this.doneCheckList.length;
    }
  }

  onAllDoneUpload(isDone) {
    Logger(' Session Upload isDone', isDone);
    if (isDone) {
      this.listCage = [];
      this.listPhotoUploads.clear();
      // this.isAllDoneUpload = false;
      this.doneCheckList = [];
    }
  }
}
