
//
//  File.swift
//  PAVE
//
//  Created by KimDuong on 6/15/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

public class InspectionDetailTask {
    static let shared = InspectionDetailTask()
    
    var sessionInfo: SessionInfo?
    
    let sessionManagement: SessionManagementProtocol?
    var timer: Timer?
    var timeRepeat: Double = 10
    
    private init() {
        sessionManagement = SessionManagementWorker()
        
        sessionInfo = PaveManager.shared.sessionInfoInstance
    }
    
    func run() {
        if timer != nil {
            return
        }
        
        if #available(iOS 10.0, *) {
            DispatchQueue.main.async {
                Timer.scheduledTimer(
                    timeInterval: self.timeRepeat,
                    target: self,
                    selector: #selector(self.getInspectionDetail),
                    userInfo: nil,
                    repeats: true)
            }
            
//            timer = Timer.scheduledTimer(withTimeInterval: timeRepeat, repeats: true,selector: #selector(self.getInspectionDetail)
            
//           Timer.scheduledTimer(timeInterval: timeRepeat, target: self, selector: #selector(self.getInspectionDetail), userInfo: nil, repeats: true)
        } else {
            // Fallback on earlier versions
        }
    }
    
    func killTask() {
        timer?.invalidate()
        timer = nil
    }
    
    @objc func getInspectionDetail() {
        print("===========getInspectionDetail Task ()===============")
        var sessionKey: String = sessionInfo!.sessionKey
        
        sessionManagement?.getInspectionDetails(InspectionDetailsRequest(sessionKey: sessionKey, authorization: ConfigNetworkDev.AUTHORIZATION_TOKEN)) { result, error in
            guard let response = result,
                let inspecting = self.sessionInfo?.sessionProcessing?.inspecting else { return }
            
            switch response {
            case .Success(result: let result):
                
                guard let inspectionID = result.inspectionID,
                    let status = result.status,
                    sessionKey == result.sessionID
                else { return
//                    complete(false)
                }
//                self.sessionInfo?.sessionProcessing?.process = Process.INSPECTING
                inspecting.status = InspectionStatus(rawValue: status)
                inspecting.inspectionID = inspectionID
                
                if let vihicleDecode = result.vinDecode {
                    inspecting.vinDecode = vihicleDecode
                } else {
                    // case nill
                    inspecting.vinDecode = false
                }
                
                if let rejectOdom = result.rejectOdom {
                    inspecting.rejectOdom = rejectOdom
                }
                
//                if let vehile = result.vehicle,
//                    let _ = result.vehicle?.bodyType {
//                    inspecting.vehicleNotNil = true
//
//                    if let cages = result.cages, let sessionProcessing = self.sessionInfo?.sessionProcessing {
//                        let isExist: Bool = (sessionProcessing.dynamicCage[.LEFT_VIEW] != nil)
//                            ||
//                            (sessionProcessing.dynamicCage[.RIGHT_VIEW] != nil)
//
//                        if !isExist {
//                            self.parserCages(data: cages, fillData: sessionProcessing)
//                        }
//                    }
//                    self.sessionInfo?.sessionProcessing?.inspecting.vehicleName = vehile.getVehicleName()
//                }
                
            case .Failure(error: let error): break
            }
        }
    }
    
    func parserCages(data: Cages, fillData: SessionProcessing) {
        var cagesMap = [Cage: String]()
        // 01 -> 4 LEFT VIew
        //  02 -> 5 FONT VIEW
        //  03 -> 7 RIGHT_VIEW
        //  04 -> 8 BACK_VIEW
        
        guard let leftCage = data._01,
            let fontCage = data._02,
            let rightCage = data._03,
            let rearCage = data._04 else { return }
        
//        generatePngPhoto(idFolder: leftCage.photo.folder) {
//            cagesMap[.LEFT_VIEW] = leftCage.outline.url.replacingOccurrences(of: "svg", with: "png")
//            cagesMap[.FRONT_VIEW] = fontCage.outline.url.replacingOccurrences(of: "svg", with: "png")
//            cagesMap[.RIGHT_VIEW] = rightCage.outline.url.replacingOccurrences(of: "svg", with: "png")
//            cagesMap[.BACK_VIEW] = rearCage.outline.url.replacingOccurrences(of: "svg", with: "png")
//            fillData.dynamicCage = cagesMap
//            print(cagesMap)
//        }
    }
    
    func generatePngPhoto(idFolder: String, complete: @escaping () -> ()) {
        let sUrl = "https://server-api-dev.paveapi.com/api/cages/\(idFolder)/generate-png"
        
//        let headers: HTTPHeaders = [
//            "Content-Type": "application/json",
//            "Authorization": "Bearer " + ConfigNetworkDev.AUTHORIZATION_TOKEN
//        ]
//        Alamofire.request(URL(string: sUrl)!, method: .get, parameters: nil, headers: headers)
//            .validate().response { _ in
//                complete()
//            }
    }
}
