//
//  CDPhoto.swift
//  PaveModule
//
//  Created by KimDuong on 1/12/21.
//  Copyright © 2021 Discovery Loft. All rights reserved.
//

import Foundation
import SQLite

class CDPhoto: CoreData {
    private let id = Expression<Int>("id")
    private let session_key = Expression<String>("session_key")
    private let photo_code = Expression<Int>("photo_code")
    private let cage_name = Expression<String>("cage_name")
    private let photo_upload_status = Expression<String>("photo_upload_status")
    private let id_photo_inspecting = Expression<String>("id_photo_inspecting")
    private let file_local = Expression<String>("file_local")
    private let photos = Table("Photos")

    override init() {}

    override func createTable() {
        try! db?.run(photos.create(ifNotExists: true) { t in
            t.column(id, primaryKey: .autoincrement)
            t.column(session_key)
            t.column(photo_code)
            t.column(cage_name)
            t.column(photo_upload_status)
            t.column(id_photo_inspecting)
            t.column(file_local)

        })
    }
}

extension CDPhoto: AbstractRepository {
    func update(entity: PhotoDBEnity) {
        let photo = photos.filter(session_key == entity.session_key && photo_code == entity.photo_code)
        try? db?.run(photo.update(
            session_key <- entity.session_key,
            photo_code <- entity.photo_code,
            cage_name <- entity.cage_name,
            photo_upload_status <- entity.photo_upload_status.rawValue,
            id_photo_inspecting <- entity.id_photo_inspecting,
            file_local <- entity.file_local))
    }

    func query() -> [PhotoDBEnity] {
        do {
            let list = try db!.prepare(photos).map { row -> PhotoDBEnity in
                PhotoDBEnity(
                    session_key: row[session_key],
                    photo_code: row[photo_code],
                    cage_name: row[cage_name],
                    photo_upload_status: UploadPhotoStatus(rawValue: row[photo_upload_status])!,
                    id_photo_inspecting: row[id_photo_inspecting],
                    file_local: row[file_local])
            }
            return list
        } catch {
            return []
        }
    }

    func save(entity: PhotoDBEnity) {
        let insert = photos.insert(
            session_key <- entity.session_key,
            photo_code <- entity.photo_code,
            cage_name <- entity.cage_name,
            photo_upload_status <- entity.photo_upload_status.rawValue,
            id_photo_inspecting <- entity.id_photo_inspecting,
            file_local <- entity.file_local)
        _ = try? db!.run(insert)
    }

    func delete(entity: PhotoDBEnity) {
        let photo = photos.filter(photo_code == entity.photo_code && session_key == entity.session_key)
        try? db?.run(photo.delete())
    }
}

struct PhotoDBEnity {
    let session_key: String
    let photo_code: Int
    let cage_name: String
    var photo_upload_status: UploadPhotoStatus
    var id_photo_inspecting: String
    var file_local: String
}

enum UploadPhotoStatus: String {
    case INQUEUE, UPLOADED, FAILED, UPLOADING
}
