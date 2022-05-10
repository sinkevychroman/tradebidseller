//
//  InspectionReportUseCase.swift
//  PAVE
//
//  Created by KimDuong on 6/10/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

public protocol InspectionReportProtocol {
    func getReportDamage(sessionProcessing: SessionProcessing, complete: @escaping (Bool) -> ())
        
    func getReportDamage(sessionKey: String,apiKey : String , _ complete: @escaping (InspectionResult) -> ())
}

open class InspectionReportInteractor: InspectionReportProtocol {

    
    lazy var worker: InspectionResultProtocol = {
        InspectionResultWorker()
    }()
    
    public func getReportDamage(sessionKey: String,apiKey : String , _ complete: @escaping (InspectionResult) -> ()) {
        var inspectionResult: InspectionResult?
        
        worker.getInspectionResult(InspectionResultRequest(sessionKey: sessionKey,apiKey: apiKey)) { result, error in
            guard let response = result else { return }
            debugPrint(response)
            switch response {
            case .Success(result: let result):

                print("========getInspectionResult SUCCESS=====")
                inspectionResult = self.parserData(response: result)
                guard let inspection_Result = inspectionResult else { return }
                complete(inspection_Result)
            case .Failure(error: let error):
                print("========getInspectionResult FAIL=====")
                inspectionResult = nil
                print(error)
            }
        }
    }
    
    public func getReportDamage(sessionProcessing: SessionProcessing, complete: @escaping (Bool) -> ()) {}
    
    private func parserData(response: InspectionResultResponse) -> InspectionResult? {
        
        print("parserData : InspectionResultResponse ->  InspectionResult ")
        guard let _vehicle = response.vehicle,
            let detected_damages = response.inspection?.detectedDamages,
            let anonotated_images = response.images?.annotatedImages,
            let original_images = response.images?.originalImages
        else {
            return nil
        }
        
        var inspectionResult = InspectionResult(vehicle: _vehicle, photoStatus: [PhotoStatus]())
        inspectionResult.vehicle = _vehicle
        inspectionResult.vehicleThumnailUrl = original_images.the04?.first.valueOrEmpty as! String
        inspectionResult.photoStatus = response.photoStatus ?? [PhotoStatus]()
        inspectionResult.license  = response.license.valueOrEmpty
        inspectionResult.sessionKey = response.sessionKey.valueOrEmpty
        inspectionResult.inspectionId = response.inspectionid.valueOrEmpty
        
        inspectionResult.sellerDisclosures = response.sellerDisclosures
        
        inspectionResult.sellerAnnouncements = response.sellerAnnouncements
        
        inspectionResult.grading = response.inspection?.grading
        
        inspectionResult.response = response.response
        
        detected_damages.forEach { DetectedDamage in
            let photoCode = DetectedDamage.photo?.code
            
            let cage = Cage(rawValue: Int(photoCode!) ?? -1)
            
            let keyExists = inspectionResult.damageAreas[cage!] != nil
            
            if keyExists {
            } else {
                inspectionResult.damageAreas[cage!] = DamageArea(cage: cage!)
            }
            
            inspectionResult.damageAreas[cage!]?.detectedDamages.append(DetectedDamage)
            
            if DetectedDamage.damageGroup == "TIRE" {
                let keyExists = inspectionResult.damageAreas[.TIRE] != nil
                
                if !keyExists {
                    let damageArea = DamageArea(cage: .TIRE)
                    
                    inspectionResult.damageAreas[.TIRE] = damageArea
                    inspectionResult.damageAreas[.TIRE]!.photoUrl = original_images.the06?.first
                }
                
                inspectionResult.damageAreas[.TIRE]!.detectedDamages.append(DetectedDamage)
            }
        }
        
        
        let anonotated_images_dictionary: [String: [String]] =
            (Dictionary(uniqueKeysWithValues: Mirror(reflecting: anonotated_images).children.map { ($0.label!, $0.value) }) as! [String: [String]])
            
            anonotated_images_dictionary.filter { (key, _) -> Bool in
                let tire_code = Int("\(key)".replacingOccurrences(of: "_", with: ""))
                return tire_code != Cage.TIRE.rawValue
            }.forEach { key, value in
                print("Key : \(key) , value : \(value)")
                if let code = Int("\(key)".replacingOccurrences(of: "the", with: "")) {
                    let cage: Cage! = Cage(rawValue: code)
                    print("Key \(key) Cage : \(cage.getName())")
                    if let photoUrl = value.first {
                        inspectionResult.damageAreas[cage!]?.photoUrl = photoUrl
                        
                    } else {
                        switch cage {
                        case .FRONT_VIEW:
                            inspectionResult.damageAreas[cage!]?.photoUrl = original_images.the05?.first
                            break
                            
                        case .BACK_VIEW:
                            inspectionResult.damageAreas[cage!]?.photoUrl = original_images.the08?.first
                            break
                        case .LEFT_VIEW:
                            inspectionResult.damageAreas[cage!]?.photoUrl = original_images.the04?.first
                            break
                            
                        case .RIGHT_VIEW:
                            inspectionResult.damageAreas[cage!]?.photoUrl = original_images.the07?.first
                            break
                            
                        case .CAR_INTERIOR_LEFT_VIEW :
                            inspectionResult.damageAreas[cage!]?.photoUrl = original_images.the02?.first
                            
                        case .WIND_SHIELD :
                            inspectionResult.damageAreas[cage!]?.photoUrl = original_images.the09?.first

                        default:
                            break
                        }
                    }
                }
            }
                
        return inspectionResult
    }
    
}
