//
//  Session.swift
//  PAVE
//
//  Created by KimDuong on 4/27/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation



open class Session {
    var active: Int
    var additionalProperties: AdditionalProperties?
    var createdAt: String
    var id: Int
    var inspectStartedAt: String
    var inspectionID: String
    var redirectURL: String
    var sessionKey: String
    var stage: Int
    var status: String
    var theme: String?
    var updatedAt: String

    init(active: Int, additionalProperties: AdditionalProperties? = nil , createdAt: String, id: Int, inspectStartedAt: String, inspectionID: String, redirectURL: String, sessionKey: String, stage: Int, status: String, theme: String, updatedAt: String) {
        self.active = active
        self.additionalProperties = additionalProperties
        self.createdAt = createdAt
        self.id = id
        self.inspectStartedAt = inspectStartedAt
        self.inspectionID = inspectionID
        self.redirectURL = redirectURL
        self.sessionKey = sessionKey
        self.stage = stage
        self.status = status
        self.theme = theme
        self.updatedAt = updatedAt
    }
}

// MARK: - AdditionalProperties
class AdditionalProperties {

    init() {
    }
}
