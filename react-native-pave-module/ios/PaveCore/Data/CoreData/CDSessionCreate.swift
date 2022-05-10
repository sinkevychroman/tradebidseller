//
//  CDSessionCreate.swift
//  PaveModule
//
//  Created by KimDuong on 1/12/21.
//  Copyright © 2021 Discovery Loft. All rights reserved.
//

import Foundation
import SQLite

class CDSessionCreate: CoreData {
    private let session_key = Expression<String>("session_key")
    private let status = Expression<String>("status")
    private let active = Expression<Bool>("active")
    private let redirect_url = Expression<String>("redirect_url")
    private let start_date = Expression<String>("start_date")

    private let sessionCreateTable = Table("SessionCreate")

    override func createTable() {
        try! db?.run(sessionCreateTable.create(ifNotExists: true) { t
                in
            t.column(session_key)
            t.column(status)
            t.column(active)
            t.column(redirect_url)
            t.column(start_date)
        })
    }
}

extension CDSessionCreate: AbstractRepository {
    func update(entity: SessionCreateDBEnity) {
        
    }
    
    func query() -> [SessionCreateDBEnity] {
         do {
            let list = try db!.prepare(sessionCreateTable).map { row -> SessionCreateDBEnity in
                SessionCreateDBEnity(
                    session_key : row[session_key],
                    status: row[status],
                    active: row[active],
                    redirect_url: row[redirect_url],
                    start_date: row[start_date]
                )
            }
            return list
        } catch {
            return []
        }
        
    }
    
    func save(entity: SessionCreateDBEnity) {
        let insert = sessionCreateTable.insert(
            session_key <- entity.session_key,
            status <- entity.status,
            active <- entity.active, 
            redirect_url <- entity.redirect_url,
            start_date <- entity.start_date
        )

        _ = try? db!.run(insert)
        
    }
    
    func delete(entity: SessionCreateDBEnity) {
        let sessionCreate = sessionCreateTable.filter(session_key == entity.session_key)
        try? db?.run(sessionCreate.delete())
        
    }
    
    typealias T = SessionCreateDBEnity 

}

struct SessionCreateDBEnity {
    let session_key: String
    let status : String
    let active : Bool
    let redirect_url : String
    let start_date : String 

}
