//
//  StartSessionRequest.swift
//  PAVE
//
//  Created by KimDuong on 4/28/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

struct StartSessionRequest {
    let sessionKey: String!

//    func getParameter() -> Parameters {
//        return ["session_key": sessionKey ?? ""]
//    }
}

struct StartSessionResponse: Codable {
    let id: Int?
    let theme: String?
    let sessionKey: String?
    let inspectionid: String?
    let active: Int?
    let stage: Int?
    let status: String?
    let redirecturl: String?
    let responseCode: JSONNull?
    let inspectionResult: JSONNull?
    let inspectStartedAt: String?
    let inspectEndedAt: JSONNull?
    let createdAt: String?
    let updatedAt: String?
    let deletedAt: JSONNull?
    let photos: [JSONAny]?
    let vehicle: [JSONAny]?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case theme = "theme"
        case sessionKey = "session_key"
        case inspectionid = "inspection_id"
        case active = "active"
        case stage = "stage"
        case status = "status"
        case redirecturl = "redirect_url"
        case responseCode = "response_code"
        case inspectionResult = "inspection_result"
        case inspectStartedAt = "inspect_started_at"
        case inspectEndedAt = "inspect_ended_at"
        case createdAt = "created_at"
        case updatedAt = "updated_at"
        case deletedAt = "deleted_at"
        case photos = "photos"
        case vehicle = "vehicle"
    }
}


struct StopSessionRequest {
    let sessionKey: String!

//    func getParameter() -> Parameters {
//        return ["session_key": sessionKey ?? ""]
//    }

}

struct StopSessionResponse: Codable{
    
}


struct GenerateSessionResponse: Codable {
    let sessionKey, status: String?
    let active: Bool?
    let redirectURL: String?
    let startDate: String?

    enum CodingKeys: String, CodingKey {
        case sessionKey = "session_key"
        case status, active
        case redirectURL = "redirect_url"
        case startDate = "start_date"
    }

    init(sessionKey: String?, status: String?, active: Bool?, redirectURL: String?, startDate: String?) {
        self.sessionKey = sessionKey
        self.status = status
        self.active = active
        self.redirectURL = redirectURL
        self.startDate = startDate
    }
}

struct GenerateSessionRequest {
    let redirect_url: String!
    
    let apiKey : String!
//
//    func getParameter() -> Parameters {
//        return ["redirect_url": redirect_url ?? ""]
//    }
}






