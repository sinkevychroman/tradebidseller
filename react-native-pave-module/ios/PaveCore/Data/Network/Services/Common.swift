//
//  Common.swift
//  PAVE
//
//  Created by KimDuong on 4/28/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

public struct PaveResultMessage: Codable {
    let status: String
    let message: String

    enum CodingKeys: String, CodingKey {
        case status
        case message
    }
}

public enum PaveNetworkError: Error {
    case error(statusCode: Int, data: Data?)
    case notConnected
    case cancelled
    case generic(Error)
    case urlGeneration
    case withResult(resultMsg: PaveResultMessage)
    case withContent(content: String)
}

enum PaveResult<U> {
    case Success(result: U)
    case Failure(error: PaveNetworkError)
}

