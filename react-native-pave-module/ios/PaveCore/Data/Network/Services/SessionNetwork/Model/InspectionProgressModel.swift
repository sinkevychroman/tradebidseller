//
//  InspectionProgressModel.swift
//  PAVE
//
//  Created by KimDuong on 5/31/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

struct InspectionProgressRequest {
    let sessionKey: String!
    let authorization: String!
}


public struct InspectionProgressResponse: Codable {
    let inspectionID: String?
    let sessionID: String?
    let status: String?
    let ttw: Int?
    let isReported: Bool?
    let photos: Photos?
    let userPhotos: JSONAny?
    let passQC : Bool?

    enum CodingKeys: String, CodingKey {
        case inspectionID = "inspectionID"
        case sessionID = "sessionID"
        case status = "status"
        case ttw = "ttw"
        case isReported = "isReported"
        case photos = "photos"
        case userPhotos = "user_photos"
        case passQC = "passQC"
    }
}


// MARK: - Photos
struct Photos: Codable {
    let url: JSONAny?
    let missing: [String]?
//    let qc: [Qc]?
    let rejected: [RejectedInformation]?
    let inspect: [PhotoCodeInformation]?
    let finished: [FinishedInformation]?

    enum CodingKeys: String, CodingKey {
        case url = "url"
        case missing = "missing"
//        case qc = "qc"
        case rejected = "rejected"
        case inspect = "inspect"
        case finished = "finished"
    }
}

struct PhotoCodeInformation: Codable {
    let photoCode: String?
    let status: String?
    let message: Message?
    let rejectedCount: Int?

    enum CodingKeys: String, CodingKey {
        case photoCode = "photoCode"
        case status = "status"
        case message = "message"
        case rejectedCount = "rejectedCount"
    }
}

struct FinishedInformation: Codable {
    let photoCode: String?
    let status: String?
    let message: JSONAny?
    let rejectedCount: Int?

    enum CodingKeys: String, CodingKey {
        case photoCode = "photoCode"
        case status = "status"
        case message = "message"
        case rejectedCount = "rejectedCount"
    }
}

// MARK: - RejectedMessage
struct Message: Codable {
    let retake: String?
    let waitSunny: String?
    let waitDark: String?
    let accepted: String?

    enum CodingKeys: String, CodingKey {
        case retake = "retake"
        case waitSunny = "wait_sunny"
        case waitDark = "wait_dark"
        case accepted = "accepted"

    }
}


struct RejectedInformation: Codable {
    let photoCode: String?
    let status: String?
    let message: Dictionary<String, String>?
    
    let rejectedCount: Int?

    enum CodingKeys: String, CodingKey {
        case photoCode = "photoCode"
        case status = "status"
        case message = "message"
        case rejectedCount = "rejectedCount"
    }
}
