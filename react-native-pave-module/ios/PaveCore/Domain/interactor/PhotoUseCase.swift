//
//  PhotoUseCase.swift
//  PAVE
//
//  Created by KimDuong on 4/27/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

public protocol PhotoUseCaseProtocol {
    func uploadPhoto(photoUpload: PhotoUpload, sessionProcessing: SessionProcessing?, completion: @escaping complete) -> ()

    func uploadPhoto(photoUpload: PhotoUpload, completion: @escaping complete) -> ()

    func getPhotoInDiskCache(keyPhoto: String) -> Data?

    func getPhotoInMemoryCache(keyPhoto: String) -> Data?
}

class PhotoInteractor: PhotoUseCaseProtocol {
    var photoManagement: PhotoManagementProtocol

    var photoCoreData: CDPhoto

    init() {
        photoManagement = PhotoManagementWorker()
        photoCoreData = CDPhoto()
    }

    func getPhotoInDiskCache(keyPhoto: String) -> Data? {
        return nil
    }

    func getPhotoInMemoryCache(keyPhoto: String) -> Data? {
        return nil
    }

    func uploadPhoto(photoUpload: PhotoUpload, completion: @escaping complete) {
        let photoCode = Int(photoUpload.photoCode)

        var photoEntity = PhotoDBEnity(
            session_key: photoUpload.sessionKey,
            photo_code: photoUpload.photoCode,
            cage_name: Cage(rawValue: photoCode)?.getName() ?? "UNKNOW_CAGE",
            photo_upload_status: UploadPhotoStatus.INQUEUE,
            id_photo_inspecting: photoUpload.inspectionID,
            file_local: photoUpload.image)
        photoCoreData.save(entity: photoEntity)

        photoManagement.uploadPhotoForSession(UploadPhotoSessionRequest(photoCode: "\(photoUpload.photoCode)", sessionKey: photoUpload.sessionKey, photoData: photoUpload.image)) { result, error in

            do {
                if let response = result {
                    switch response {
                    case .Success(result: let result):
                        photoEntity.photo_upload_status = UploadPhotoStatus.UPLOADED
                        completion(true)
                        break

                    case .Failure(error: let error):
                        completion(false)
                        photoEntity.photo_upload_status = UploadPhotoStatus.FAILED
                        break
                    }
                }

                self.photoCoreData.update(entity: photoEntity)
            } catch {
                photoEntity.photo_upload_status = UploadPhotoStatus.FAILED
                self.photoCoreData.update(entity: photoEntity)
                completion(false)
            }
        }
        photoEntity.photo_upload_status = .UPLOADING
        photoCoreData.update(entity: photoEntity)
    }

    func uploadPhoto(photoUpload: PhotoUpload, sessionProcessing: SessionProcessing?, completion: @escaping complete) {
        photoManagement.uploadPhotoForSession(UploadPhotoSessionRequest(photoCode: "\(photoUpload.photoCode)", sessionKey: photoUpload.sessionKey, photoData: photoUpload.image), completionHandler: { result, error in

            let sessionProcessingCasted: SessionProcessing
            do {
                if let response = result {
                    switch response {
                    case .Success(result: let result):
                        completion(true)
                        guard let objectNotNil = sessionProcessing else {
                            if PaveManager.shared.sessionInfoInstance?.sessionProcessing?.sesion?.sessionKey == photoUpload.sessionKey {
                                sessionProcessingCasted = try PaveManager.shared.sessionInfoInstance?.sessionProcessing as! SessionProcessing
                            } else { return }
                            return
                        }
                        sessionProcessingCasted = objectNotNil
                        sessionProcessingCasted.uploadPhotoDone?.listPhotoUploadDone.append(photoUpload.photoCode)
                    case .Failure(error: let error):
                        completion(false)
                    }
                }

                completion(true)

            } catch {
                completion(false)
            }

                  })
    }
}

public struct PhotoUpload {
    let sessionKey: String
    let image: String
    let photoCode: Int
    let inspectionID: String = "UNKNOW"
}
