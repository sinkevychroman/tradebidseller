
//
//  InspectionResultManagement.swift
//  PAVE
//
//  Created by KimDuong on 6/10/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

typealias GetInspectionResultCompletionHandler = (PaveResult<InspectionResultResponse>?, InspectionResultError?) -> Void

enum InspectionResultError: Equatable, Error {}

protocol InspectionResultProtocol {
    func getInspectionResult(_ request: InspectionResultRequest, completionHandler: @escaping GetInspectionResultCompletionHandler)
}

class InspectionResultWorker: InspectionResultProtocol {
    func getInspectionResult(_ request: InspectionResultRequest, completionHandler: @escaping GetInspectionResultCompletionHandler) {
        let BASEURL = ConfigNetworkDev.APP_PAVE_API_SESSION_REPORT
        let path = "\(request.sessionKey)"

        var requestInspectionResult = URLRequest(url: URL(string: BASEURL + path)!)
        requestInspectionResult.httpMethod = "GET"
        requestInspectionResult.addValue(request.apiKey, forHTTPHeaderField: "API-KEY")
        

      URLSession.shared
            .dataTask(with: requestInspectionResult, completionHandler: { data, response, error -> Void in
           guard error == nil else {
               print("Error: ", error!)
            completionHandler(PaveResult<InspectionResultResponse>.Failure(error: PaveNetworkError.error(statusCode: -1, data: nil)), nil)
               return
           }

            do {
                let response = try JSONDecoder().decode(InspectionResultResponse.self, from: data!)
                completionHandler(PaveResult<InspectionResultResponse>.Success(result: response), nil)

            } catch {
                print("error \(error)")
                completionHandler(PaveResult<InspectionResultResponse>.Failure(error: PaveNetworkError.error(statusCode: -1, data: nil)), nil)
            }
        }).resume()

    }
}
