
//
//  File.swift
//  PAVE
//
//  Created by KimDuong on 4/28/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

typealias GenerateSessionCompletionHandler = (PaveResult<GenerateSessionResponse>?, SessionManagementError?) -> Void

typealias StartSessionCompletionHandler = (PaveResult<StartSessionResponse>?, SessionManagementError?) -> Void

typealias StoptSessionCompletionHandler = (PaveResult<StopSessionResponse>?, SessionManagementError?) -> Void

typealias InspectionDetailsCompletionHandler = (PaveResult<InspectionDetailsResponse>?, SessionManagementError?) -> Void

typealias InspectionProgressCompletionHandler = (PaveResult<InspectionProgressResponse>?, SessionManagementError?) -> Void

typealias InputVinCodeCompletionHandler = (PaveResult<InputVinCodeResponse>?, SessionManagementError?) -> Void

typealias InputOdometerCompletionHandler = (PaveResult<Bool>?, SessionManagementError?) -> Void

typealias CreateNewSessionWithVehicle = (PaveResult<CreateSessionVehicleResponse>?, SessionManagementError?) -> Void

typealias GetSessionProgressCCompletionHandler = (PaveResult<GetSessionProgressResponse>?, SessionManagementError?) -> Void

enum SessionManagementError: Equatable, Error {
    case SessionKeyDoesNotExist(sesionKey: String)
    
    case SessionAlreadyStarted(sessionKey: String)
    
    case CannotCreateNewSession(String)
    
    case CannotStopSession(String)
}

protocol SessionManagementProtocol {
    func generateSession(_ request: GenerateSessionRequest, completionHandler: @escaping GenerateSessionCompletionHandler) -> Void
    
    func startSession(_ request: StartSessionRequest, completionHandler: @escaping StartSessionCompletionHandler) -> Void
    
    func stopSession(_ request: StopSessionRequest, completionHandler: @escaping StoptSessionCompletionHandler) -> Void
    
    func getInspectionDetails(_ request: InspectionDetailsRequest, completionHandler: @escaping InspectionDetailsCompletionHandler) -> Void
    
    func getInspectionProgress(_ request: InspectionProgressRequest, completionHandler: @escaping InspectionProgressCompletionHandler) -> Void
    
    func setVincodeForSession(_ request: InputVinCodeRequest, completionHandler: @escaping InputVinCodeCompletionHandler) -> Void
    
    func setOdometerForSession(_ request: InputOdoMeterRequest, completionHandler: @escaping InputOdometerCompletionHandler) -> Void
    
    func createNewSessionWithVehicle(apiKey: String, _ request: CreateSessionVehicleRequest, completionHandler: @escaping CreateNewSessionWithVehicle) -> Void
    
    func getSessionProgress(_ request: GetSessionProgressRequest, completionHandler: @escaping GetSessionProgressCCompletionHandler) -> Void
    
}

class SessionManagementWorker: SessionManagementProtocol {
    func getSessionProgress(_ request: GetSessionProgressRequest, completionHandler: @escaping GetSessionProgressCCompletionHandler) {
        let url = ConfigNetworkDev.APP_PAVE_API_SESSION_PROGRESS + request.sessionKey
        
        var request = URLRequest(url: URL(string: url)!)
        request.httpMethod = "GET"
        URLSession.shared.dataTask(with: request, completionHandler: { data, response, error -> Void in
            
            guard error == nil else {
                print("Error: ", error!)
                completionHandler(PaveResult<GetSessionProgressResponse>.Failure(error: PaveNetworkError.error(statusCode: -1, data: nil)), nil)
                return
            }
            print(response!)
            
            do {
                let response = try JSONDecoder().decode(GetSessionProgressResponse.self, from: data!)
                completionHandler(PaveResult<GetSessionProgressResponse>.Success(result: response), nil)
                
            } catch {
                print("error \(error)")
                completionHandler(PaveResult<GetSessionProgressResponse>.Failure(error: PaveNetworkError.error(statusCode: -1, data: nil)), nil)
            }
                }).resume()
    }
    
    func createNewSessionWithVehicle(apiKey: String, _ request: CreateSessionVehicleRequest, completionHandler: @escaping CreateNewSessionWithVehicle) {
        let baseURL = ConfigNetworkDev.APP_PAVE_API_SESSION
        
        let jsonData = try! JSONEncoder().encode(request)
        let jsonString = String(data: jsonData, encoding: .utf8)!
        let data = (jsonString.data(using: .utf8))! as Data
        
        var request = URLRequest(url: URL(string: baseURL)!)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue(apiKey, forHTTPHeaderField: "API-KEY")
        
        request.httpBody = data
        
        URLSession.shared.dataTask(with: request, completionHandler: { data, response, error in
            
            guard error == nil else {
                print("Error: ", error!)
                completionHandler(PaveResult<CreateSessionVehicleResponse>.Failure(error: PaveNetworkError.error(statusCode: -1, data: nil)), nil)
                return
            }
            
            do {
                let response = try JSONDecoder().decode(CreateSessionVehicleResponse.self, from: data!)
                completionHandler(PaveResult<CreateSessionVehicleResponse>.Success(result: response), nil)
                
            } catch {
                print("error \(error)")
                completionHandler(PaveResult<CreateSessionVehicleResponse>.Failure(error: PaveNetworkError.error(statusCode: -1, data: nil)), nil)
            }
            
        })
    }
    
    func setVincodeForSession(_ request: InputVinCodeRequest, completionHandler: @escaping InputVinCodeCompletionHandler) {

    }
    
    func setOdometerForSession(_ request: InputOdoMeterRequest, completionHandler: @escaping InputOdometerCompletionHandler) {

    }
    
    func getInspectionProgress(_ request: InspectionProgressRequest, completionHandler: @escaping InspectionProgressCompletionHandler) {
        let baseURL = ConfigNetworkDev.APP_AGENT_BASE_URL
        
        let path = "inspections/progress/" + request.sessionKey
        
        var urlRequest = URLRequest(url: URL(string: baseURL + path)!)
        urlRequest.httpMethod = "GET"
        urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
        urlRequest.addValue("Bearer " + request.authorization, forHTTPHeaderField: "Authorization")
                
        URLSession.shared.dataTask(with: urlRequest, completionHandler: { data, _, error in
            
            guard error == nil else {
                print("Error: ", error!)
                completionHandler(PaveResult<InspectionProgressResponse>.Failure(error: PaveNetworkError.error(statusCode: -1, data: nil)), nil)
                return
            }
            
            do {
                let inspectionProgressResponse = try JSONDecoder().decode(InspectionProgressResponse.self, from: data!)
                completionHandler(PaveResult<InspectionProgressResponse>.Success(result: inspectionProgressResponse), nil)
                
            } catch {
                print("error: \(error)")
                completionHandler(PaveResult<InspectionProgressResponse>.Failure(error: PaveNetworkError.error(statusCode: -1, data: nil)), nil)
            }
            
            }).resume()
    }
    
    func getInspectionDetails(_ request: InspectionDetailsRequest, completionHandler: @escaping InspectionDetailsCompletionHandler) {
        
        let baseURL = ConfigNetworkDev.APP_AGENT_BASE_URL
        
        let path = "inspections/details/" + request.sessionKey
        let url = baseURL + path
        
        var urlRequest = URLRequest(url: URL(string: url)!)
        urlRequest.httpMethod = "GET"
        urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
        urlRequest.addValue("Bearer " + request.authorization, forHTTPHeaderField: "Authorization")
        
        URLSession.shared.dataTask(with: urlRequest, completionHandler: { data, _, error in
            guard error == nil else {
                print("Error: ", error!)
                completionHandler(PaveResult<InspectionDetailsResponse>.Failure(error: PaveNetworkError.error(statusCode: -1, data: nil)), nil)
                return
            }
            
            do {
                let inspectionDetailsResponse = try JSONDecoder().decode(InspectionDetailsResponse.self, from: data!)
                
                completionHandler(PaveResult<InspectionDetailsResponse>.Success(result: inspectionDetailsResponse), nil)
            } catch {
                print("error: \(error)")
                completionHandler(PaveResult<InspectionDetailsResponse>.Failure(error: PaveNetworkError.error(statusCode: -1, data: nil)), nil)
            }
            
          }).resume()
    }
    
    func startSession(_ request: StartSessionRequest, completionHandler: @escaping StartSessionCompletionHandler) {
        let path: String = "start"
        
        let url = ConfigNetworkDev.APP_BASE_URL + path
        
        let boundary = "Boundary-\(UUID().uuidString)"
        
        var urlRequest = URLRequest(url: URL(string: url)!)
       
        urlRequest.httpMethod = "POST"
            
        urlRequest.addValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        
        let formFields = ["session_key": request.sessionKey]
        
        let httpBody = NSMutableData()
        
        for (key, value) in formFields {
            httpBody.appendString(convertFormField(named: key, value: value ?? "", using: boundary))
        }
        
        httpBody.appendString("--\(boundary)--")
        
        urlRequest.httpBody = httpBody as Data
        
        URLSession.shared.dataTask(with: urlRequest, completionHandler: { data, response, error in
            
            guard error == nil else {
                print("Error: ", error!)
                completionHandler(PaveResult<StartSessionResponse>.Failure(error: .withContent(content: "error")), nil)
                return
            }
            do {                
                
                let res = try JSONDecoder().decode(StartSessionResponse.self, from: data!)
                
                completionHandler(PaveResult<StartSessionResponse>.Success(result: res), nil)
                
            } catch {
                print("error: \(error)")
                completionHandler(PaveResult<StartSessionResponse>.Failure(error: .withContent(content: "This session is inactive")), nil)
            }
            
            }).resume()
    }
    
    func stopSession(_ request: StopSessionRequest, completionHandler: @escaping StoptSessionCompletionHandler) {
        let pathStopSession: String = "stop"
        
        let url = ConfigNetworkDev.APP_BASE_URL + pathStopSession
        
        let boundary = "Boundary-\(UUID().uuidString)"
        
        var urlRequest = URLRequest(url: URL(string: url)!)
       
        urlRequest.httpMethod = "POST"
            
        urlRequest.addValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        
        let formFields = ["session_key": request.sessionKey]
        
        let httpBody = NSMutableData()
        
        for (key, value) in formFields {
            httpBody.appendString(convertFormField(named: key, value: value ?? "", using: boundary))
        }
        
        httpBody.appendString("--\(boundary)--")
        
        urlRequest.httpBody = httpBody as Data
        
        URLSession.shared.dataTask(with: urlRequest, completionHandler: { _, _, error in
            guard error == nil else {
                print("Error: ", error!)
                completionHandler(PaveResult<StopSessionResponse>.Failure(error: .withContent(content: "error")), nil)
                return
            }
            do {
                completionHandler(PaveResult<StopSessionResponse>.Success(result: StopSessionResponse()), nil)
                
            } catch {
                print("error: \(error)")
                completionHandler(PaveResult<StopSessionResponse>.Failure(error: .withContent(content: "This session is inactive")), nil)
            }
            
          }).resume()
    }
    
    func generateSession(_ request: GenerateSessionRequest, completionHandler: @escaping GenerateSessionCompletionHandler) {
        let generatePath = "generate-session-id/"
        let generateSessionURL = ConfigNetworkDev.APP_BASE_URL_V1 + generatePath + request.apiKey
        
        var urlRequest = URLRequest(url: URL(string: generateSessionURL)!)
        urlRequest.httpMethod = "POST"
        urlRequest.addValue(request.redirect_url, forHTTPHeaderField: "redirect_url")
        
        URLSession.shared.dataTask(with: urlRequest, completionHandler: { data, _, error in
            guard error == nil else {
                print("Error: ", error!)
                completionHandler(PaveResult<GenerateSessionResponse>.Failure(error: PaveNetworkError.error(statusCode: -1, data: nil)), nil)
                return
            }
            
            do {
                let generateSessionResponse = try JSONDecoder().decode(GenerateSessionResponse.self, from: data!)
                completionHandler(PaveResult<GenerateSessionResponse>.Success(result: generateSessionResponse), nil)
            } catch {
                print("error \(error)")
                completionHandler(PaveResult<GenerateSessionResponse>.Failure(error: PaveNetworkError.error(statusCode: -1, data: nil)), nil)
            }
            
            }).resume()
    }
}
