//
//  PhotoNetwork.swift
//  PAVE
//
//  Created by KimDuong on 5/4/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation



struct UploadPhotoSessionRequest {
    let photoCode : String!        
    let sessionKey : String!
    let photoData : String!
//    func getParameter() -> Parameters {
//        return ["session_key": sessionKey ?? ""]
//    }
}

struct UploadPhotoResponse : Codable {
    let status: String
      let message: String

      enum CodingKeys: String, CodingKey {
          case status
          case message
      }
}
