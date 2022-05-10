//
//  CDPhotoInpsecting.swift
//  PaveModule
//
//  Created by KimDuong on 1/12/21.
//  Copyright © 2021 Discovery Loft. All rights reserved.
//

import Foundation
import SQLite

class CDPhotoInspecting : CoreData {
    private let id = Expression<String>("id")
    private let status = Expression<String>("status")
    private let url_original = Expression<String>("url_original")
    
    private let photoInspectingTable = Table("PhotoInspecting")
    
    override func createTable() {
        try! db?.run(photoInspectingTable.create( ifNotExists: true){
            t in
            t.column(id)
            t.column(status)
            t.column(url_original)
            
        })
    }
}
extension CDPhotoInspecting : AbstractRepository {
    func update(entity: PhotoInspectingDBEntity) {
        
    }
    
    func query() -> [PhotoInspectingDBEntity] {
        do {
            let list = try db!.prepare(photoInspectingTable).map { row -> PhotoInspectingDBEntity in
                PhotoInspectingDBEntity(
                 id : row[id],
                 status: row[status],
                 url_original: row[url_original]
                )
            }
            return list
        } catch {
            return []
        }
    }
    
    func save(entity: PhotoInspectingDBEntity) {
        let insert = photoInspectingTable.insert(
            id <- entity.id,
            status <- entity.status,
            url_original <- entity.url_original
        )
        _ = try? db!.run(insert)

    }
    
    func delete(entity: PhotoInspectingDBEntity) {
        let photoInspecting = photoInspectingTable.filter( id == entity.id)
        try? db?.run(photoInspecting.delete())
        
    }
    
    typealias T = PhotoInspectingDBEntity
}

struct PhotoInspectingDBEntity {
    let id : String
    let status : String
    let url_original : String
}
