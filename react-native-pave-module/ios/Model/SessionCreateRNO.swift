//
//  SessionCreateRNO.swift
//  PaveModule
//
//  Created by KimDuong on 1/26/21.
//

import Foundation


struct SessionCreateRNO: Codable {
    let sessionKey: String!
    let status: String!
    let active: Bool!
    let redirect_url: String!
    let start_date: String!
    
    enum CodingKeys: String, CodingKey {
        case sessionKey
        case status
        case active
        case redirect_url
        case start_date
    }
}


