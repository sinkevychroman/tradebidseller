//
//  SessionProgressModel.swift
//  PaveModule
//
//  Created by KimDuong on 7/12/20.
//

import Foundation


struct GetSessionProgressRequest {
    let sessionKey : String
}


public struct GetSessionProgressResponse: Codable {
    let id: Int?
    let theme: String?
    let sessionKey: String?
    let inspectionid: String?
    let active: Int?
    let stage: Int?
    let status: String?
    let redirecturl: String?
    let inspectionResult: String?
    let inspectStartedAt: String?
    let inspectEndedAt: String?
    let createdAt: String?
    let updatedAt: String?
    let photos: [PhotoProgress]?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case theme = "theme"
        case sessionKey = "session_key"
        case inspectionid = "inspection_id"
        case active = "active"
        case stage = "stage"
        case status = "status"
        case redirecturl = "redirect_url"
        case inspectionResult = "inspection_result"
        case inspectStartedAt = "inspect_started_at"
        case inspectEndedAt = "inspect_ended_at"
        case createdAt = "created_at"
        case updatedAt = "updated_at"
        case photos = "photos"
    }
}

// MARK: - Photo
struct PhotoProgress: Codable {
    let photoCode: Int?
    let cdnurl: String?
    let approved: Bool?
    let reason: String?

    enum CodingKeys: String, CodingKey {
        case photoCode = "photo_code"
        case cdnurl = "cdn_url"
        case approved = "approved"
        case reason = "reason"
    }
}
