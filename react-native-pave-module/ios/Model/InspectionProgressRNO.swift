//
//  InspectionDeitalsRNO.swift
//  PaveModule
//
//  Created by KimDuong on 7/16/20.
//

import Foundation

struct InspectionProgressRNO: Codable {
    let inspectionID: String!
    let sessionID: String!
    let status: String!
    var ttw: Int! = 108
    var isReported: Bool! = false
    var photos: PhotoProgressRNO! = PhotoProgressRNO()
    var userPhotos: JSONAny?
    var passQC: Bool! = false

    init(response: InspectionProgressResponse) {
        self.inspectionID = response.inspectionID ?? ""
        self.sessionID = response.sessionID ?? ""
        self.status = response.status ?? ""
        self.ttw = response.ttw ?? 108
        self.isReported = response.isReported ?? false
        self.userPhotos = response.userPhotos
        self.passQC = response.passQC ?? false

        // Missing

        response.photos?.missing?.forEach { value in
            if let cage = Cage(rawValue: Int(value) ?? -1) {
                self.photos.missing.append(cage.getName())
            }
        }

        // QC

//        response.photos?.qc?.forEach { photoInfor in
//            if let cage = Cage(rawValue: Int(photoInfor.photoCode.valueOrEmpty)!) {
//                let photoInfor = PhotoInforRNO(nameCage: cage.getName(),
//                                               photoCode: photoInfor.photoCode.valueOrEmpty,
//                                               status: photoInfor.status.valueOrEmpty,
//                                               message: "")
//                self.photos.qc.append(photoInfor)
//            }
//        }

        // Finished

        response.photos?.finished?.forEach { photoInfor in
            if let cage = Cage(rawValue: Int(photoInfor.photoCode.valueOrEmpty)!) {
                let photoInfor = PhotoInforRNO(nameCage: cage.getName(),
                                               photoCode: photoInfor.photoCode.valueOrEmpty,
                                               status: photoInfor.status.valueOrEmpty,
                                               message: "")
                self.photos.finished.append(photoInfor)
            }
        }

        // Inspect

        response.photos?.inspect?.forEach { photoInfor in
            if let cage = Cage(rawValue: Int(photoInfor.photoCode.valueOrEmpty)!) {
                let photoInfor = PhotoInforRNO(nameCage: cage.getName(),
                                               photoCode: photoInfor.photoCode.valueOrEmpty,
                                               status: photoInfor.status.valueOrEmpty,
                                               message: "")
                self.photos.inspect.append(photoInfor)
            }
        }

        // Rejected
        response.photos?.rejected?.forEach { photoInfor in

            let photoCode = photoInfor.photoCode.valueOrEmpty

            let status = photoInfor.status.valueOrEmpty

            let rejectedCount = photoInfor.rejectedCount.valueOrEmpty

            var message = ""

            if let rejectedMessage = photoInfor.message {
                for (key, value) in rejectedMessage {
                    message = value
                }
            }

            if let cage = Cage(rawValue: Int(photoCode)!) {
                let photoInfo = PhotoInforRNO(nameCage: cage.getName(),
                                              photoCode: photoCode,
                                              status: status,
                                              message: message,
                                              rejectedCount: rejectedCount)

                self.photos.rejected.append(photoInfo)
            }
        }
    }

    enum CodingKeys: String, CodingKey {
        case inspectionID
        case sessionID
        case status
        case ttw
        case isReported
        case photos
        case userPhotos
        case passQC
    }
}

// MARK: - Photos

struct PhotoProgressRNO: Codable {
    var missing: [String]! = [String]()
    var inspect: [PhotoInforRNO]! = [PhotoInforRNO]()
    var qc: [PhotoInforRNO]! = [PhotoInforRNO]()
    var rejected: [PhotoInforRNO]! = [PhotoInforRNO]()
    var finished: [PhotoInforRNO]! = [PhotoInforRNO]()

    enum CodingKeys: String, CodingKey {
        case missing
        case inspect
        case qc
        case rejected
        case finished
    }
}

struct PhotoInforRNO: Codable {
    let nameCage: String!
    let photoCode: String!
    let status: String!
    let message: String!
    var rejectedCount: Int! = 0

    enum CodingKeys: String, CodingKey {
        case nameCage
        case photoCode
        case status
        case message
        case rejectedCount
    }
}
