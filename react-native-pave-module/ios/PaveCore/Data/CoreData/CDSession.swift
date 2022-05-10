//
//  CDSession.swift
//  PaveModule
//
//  Created by KimDuong on 1/12/21.
//  Copyright © 2021 Discovery Loft. All rights reserved.
//

import Foundation
import SQLite
class CDSession: CoreData {
    private let id = Expression<String>("id")
    private let session_key = Expression<String>("session_key")
    private let inspection_id = Expression<String>("inspection_id")
    private let active = Expression<Int>("active")
    private let theme = Expression<String>("theme")
    private let created_at = Expression<String>("created_at")
    private let inspect_started_at = Expression<String>("inspect_started_at")
    private let inspection_result = Expression<String>("inspection_result")
    private let status = Expression<String>("status")
    
    private let sessions = Table("Session")
    
    override func createTable() {
        try! db?.run(sessions.create(ifNotExists: true) { t in
            t.column(id)
            t.column(session_key)
            t.column(inspection_id)
            t.column(active)
            t.column(theme)
            t.column(created_at)
            t.column(inspect_started_at)
            t.column(inspection_result)
            t.column(status)
            
        })
    }
}

extension CDSession: AbstractRepository {
    func update(entity: SessionDBEntity) {
        
    }
    
    func query() -> [SessionDBEntity] {
        do {
            let list = try db!.prepare(sessions).map { row -> SessionDBEntity in
                SessionDBEntity(
                    id: row[id],
                    session_key: row[session_key],
                    inspection_id: row[inspection_id],
                    active: row[active],
                    theme: row[theme],
                    created_at: row[created_at],
                    inspect_started_at: row[inspect_started_at],
                    inspection_result: row[inspection_result],
                    status: row[status]
                )
            }
            return list
        } catch {
            return []
        }
    }
    
    func save(entity: SessionDBEntity) {
           let insert = sessions.insert(
               id <- entity.id,
               session_key <- entity.session_key,
               inspection_id <- entity.inspection_id,
               active <- entity.active,
               theme <- entity.theme,
               created_at <- entity.created_at,
               inspect_started_at <- entity.inspect_started_at,
               inspection_result <- entity.inspection_result,
               status <- entity.status
           )
        _ = try? db!.run(insert)
        
    }
    
    func delete(entity: SessionDBEntity) {
         let session = sessions.filter(id == entity.id)
        try? db?.run(session.delete())
    }
    
    typealias T = SessionDBEntity
}

public struct SessionDBEntity {
    let id: String
    let session_key: String
    let inspection_id: String
    let active: Int
    let theme: String
    let created_at: String
    let inspect_started_at: String
    let inspection_result: String
    let status: String
}


