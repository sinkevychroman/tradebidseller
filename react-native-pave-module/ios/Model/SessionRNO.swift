//
//  SessionRNO.swift
//  PaveModule
//
//  Created by KimDuong on 2/1/21.
//

import Foundation


struct SessionRNO : Codable {
    let id: String
    let session_key: String
    let inspection_id: String
    let status: String
    
    enum CodingKeys  : String, CodingKey{
        case id,session_key = "sessionKey",inspection_id = "inspectionId",status
    }
}


struct SessionListRNO : Codable {
    let value : [SessionRNO]
    enum CodingKeys : String,CodingKey  {
        case value
    }
}

