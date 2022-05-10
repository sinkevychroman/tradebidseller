//
//  ConfigNetwork.swift
//  PAVE
//
//  Created by KimDuong on 4/25/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

public class ConfigNetworkDev {
    // Copy here
static let APP_BASE_URL_V1="https://paveapi.com/v1/"
static let APP_BASE_URL="https://session.paveapi.com/api/"
static let APP_AGENT_BASE_URL="https://agent.paveapi.com/api/"
static let APP_PAVE_API_REPORT="https://pass.paveapi.com/v1/sessions/"
    // End Copy 

    static let APP_PAVE_API_SESSION = "https://api-dev.paveapi.com/v1/sessions"

    static let APP_PAVE_API_SESSION_REPORT = APP_PAVE_API_REPORT

    static let API_KEY_GENERATION_SESSION = "81083429-ae98-466d-8fd2-c67014069595"
    static let AUTHORIZATION_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2U3OGI2MDE1NjljNDc5MzIwNmZmYzQiLCJpYXQiOjE1NjcyMTU2Mzd9.HEWpjWAoBekeNuH0VtJTvqJwl4vXuJlF_9J9a6Rrkfo"
    static let SESSION_PATH = "sessions/"
    static let APP_PAVE_API_SESSION_PROGRESS = APP_BASE_URL + SESSION_PATH
}
