//
//  ManagementPhoto.swift
//  PAVE
//
//  Created by KimDuong on 5/4/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

typealias UploadPhotoCompletionHandler = (PaveResult<UploadPhotoResponse>?, PhotoManagementError?) -> Void

enum PhotoManagementError: Equatable, Error {
    case PhotoTaken(photoCode: String)
    
    case SessionKeyDoesNotExist(sesionKey: String)
    
    case UploadUnsuccessfuly(data: Data)
}

protocol PhotoManagementProtocol {
    func uploadPhotoForSession(_ request: UploadPhotoSessionRequest, completionHandler: @escaping UploadPhotoCompletionHandler) -> Void
}

class PhotoManagementWorker: NSObject, PhotoManagementProtocol, URLSessionDelegate, URLSessionDataDelegate {
    let uploadPhotoPath = "photos"
    
    lazy var uploadPhotoURL = ConfigNetworkDev.APP_BASE_URL + uploadPhotoPath
    
    let imageKey = "image"
    let sessionKey = "session_key"
    let photoCodeKey = "photo_code"
    
    func uploadPhotoForSession(_ request: UploadPhotoSessionRequest, completionHandler: @escaping UploadPhotoCompletionHandler) {
        let photoCode = request.photoCode
        
        let data = request.photoData
        
        let session_Key = request.sessionKey
        
        let uploadPhotoTask = UploadPhotoTask()
        
        uploadPhotoTask.upLoadPhotoWithCode(sessionKey: session_Key, photoCode: photoCode, filePath: data, completionHandler: completionHandler)
    }
}

class UploadPhotoTask: NSObject, URLSessionDelegate, URLSessionDataDelegate {
    let uploadPhotoPath = "photos"
    
    lazy var uploadPhotoURL = ConfigNetworkDev.APP_BASE_URL + uploadPhotoPath
    
    let imageKey = "image"
    let session_Key = "session_key"
    let photoCodeKey = "photo_code"
    
    var sessionKeyValue: String?
    var photoCodeValue: String?
    
    func upLoadPhotoWithCode(sessionKey: String!, photoCode: String!, filePath: String!, completionHandler: @escaping UploadPhotoCompletionHandler) {
        autoreleasepool { photoCodeValue = photoCode
            
            let semaphore = DispatchSemaphore(value: 3) // counter Semaphore
            semaphore.signal()
            
            sessionKeyValue = sessionKey
            
            guard let image = UIImage(contentsOfFile: filePath) else  {
                return
            }
            
            let resized_image = resizeImage(image: image, targetSize: CGSize(width: 1920, height: 1080 ))
      
            var fileData: Data! = resized_image?.jpegData(compressionQuality:1)

            let boundary = "Boundary-\(UUID().uuidString)"
            
            var request = URLRequest(url: URL(string: uploadPhotoURL)!, timeoutInterval: Double.infinity)
          
            request.httpMethod = "POST"
          
            request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
            
            let formFields = [session_Key: sessionKey!,
                              photoCodeKey: photoCode ?? "112"]
            
            let httpBody = NSMutableData()
            
            for (key, value) in formFields {
                httpBody.appendString(convertFormField(named: key, value: value, using: boundary))
            }
            
            httpBody.append(convertFileData(fieldName: imageKey,
                                            fileName: "\(sessionKey + "_" + photoCode).png",
                                            mimeType: "image/png",
                                            fileData: fileData,
                                            using: boundary))
            
            httpBody.appendString("--\(boundary)--")
            
            request.httpBody = httpBody as Data
            
            let config = URLSessionConfiguration.default
            let session = URLSession(configuration: config, delegate: self, delegateQueue: OperationQueue.main)
                        
            session.dataTask(with: request) { data, response, error in
                
                
                // handle the response here
                fileData = nil
                
                guard error == nil else {
                    print("Error: ", error!)
                    
                    DispatchQueue.main.async { () -> Void in
                        completionHandler(PaveResult<UploadPhotoResponse>.Failure(error: PaveNetworkError.error(statusCode: -1, data: nil)), nil)
                    }
                    return
                }
                
                guard let data = data else {
                    print(String(describing: error))
                    DispatchQueue.main.async { () -> Void in
                        completionHandler(PaveResult<UploadPhotoResponse>.Failure(error: PaveNetworkError.error(statusCode: -1, data: nil)), nil)
                    }
                    return
                }
                
                do {
                    let response = try JSONDecoder().decode(UploadPhotoResponse.self, from: data)
                    
                    DispatchQueue.main.async { () -> Void in
                        completionHandler(PaveResult<UploadPhotoResponse>.Success(result: response ?? UploadPhotoResponse(status: "", message: "")), nil)
                    }
                    return
                        
                } catch {
                    if let httpResponse = response as? HTTPURLResponse {
                        if httpResponse.statusCode > 300 {
                            DispatchQueue.main.async { () -> Void in
                                completionHandler(PaveResult<UploadPhotoResponse>.Failure(error: PaveNetworkError.error(statusCode: -1, data: nil)), nil)
                            }
                        }
                    }
                    
                    return
                }
                
            }.resume()
            semaphore.wait()
        }
    }
    
    func urlSession(_ session: URLSession, task: URLSessionTask, didSendBodyData bytesSent: Int64, totalBytesSent: Int64, totalBytesExpectedToSend: Int64) {
        let uploadProgress: Float = Float(totalBytesSent) / Float(totalBytesExpectedToSend)
//        print(" progress 1.0 \(sessionKeyValue ?? "SESSION_KEY_NIL" + "_") \(photoCodeValue)uploadProgress \(Int(uploadProgress * 100)) %")
        
        let progress = Int(uploadProgress * 100)
        
        if ( progress % 5 == 0){
            RNEventEmitter().notifiyRN("UPLOAD_PROGRESS_EVENT", parameters: ["session_id": sessionKeyValue,
                                                                             "upload_progress" :Int(uploadProgress * 100),
                                                                             "photo_code" : photoCodeValue  ])
        }

        if uploadProgress == 1 {
            RNEventEmitter().notifiyRN("UPLOAD_PROGRESS_EVENT", parameters: ["session_id": sessionKeyValue,
                                                                             "upload_progress" :Int(uploadProgress * 100),
                                                                             "photo_code" : photoCodeValue  ])
        }
    }
}

func currentQueueName() -> String? {
    let name = __dispatch_queue_get_label(nil)
    return String(cString: name, encoding: .utf8)
}

func convertFormField(named name: String, value: String, using boundary: String) -> String {
    var fieldString = "--\(boundary)\r\n"
    fieldString += "Content-Disposition: form-data; name=\"\(name)\"\r\n"
    fieldString += "\r\n"
    fieldString += "\(value)\r\n"
    
    return fieldString
}

func convertFileData(fieldName: String, fileName: String, mimeType: String, fileData: Data, using boundary: String) -> Data {
    let data = NSMutableData()
    
    data.appendString("--\(boundary)\r\n")
    data.appendString("Content-Disposition: form-data; name=\"\(fieldName)\"; filename=\"\(fileName)\"\r\n")
    data.appendString("Content-Type: \(mimeType)\r\n\r\n")
    data.append(fileData)
    data.appendString("\r\n")
    
    return data as Data
}

extension NSMutableData {
    func appendString(_ string: String) {
        if let data = string.data(using: .utf8) {
            append(data)
        }
    }
}

func resizeImage(image: UIImage, targetSize: CGSize) -> UIImage? {
    let size = image.size
    
    let widthRatio  = targetSize.width  / size.width
    let heightRatio = targetSize.height / size.height
    
    // Figure out what our orientation is, and use that to form the rectangle
    var newSize: CGSize
    if(widthRatio > heightRatio) {
        newSize = CGSize(width: size.width * heightRatio, height: size.height * heightRatio)
    } else {
        newSize = CGSize(width: size.width * widthRatio, height: size.height * widthRatio)
    }
    
    // This is the rect that we've calculated out and this is what is actually used below
    let rect = CGRect(origin: .zero, size: newSize)
    
    // Actually do the resizing to the rect using the ImageContext stuff
    UIGraphicsBeginImageContextWithOptions(newSize, false, 1.0)
    image.draw(in: rect)
    let newImage = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()
    
    return newImage
}
