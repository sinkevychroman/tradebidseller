//
//  CDInspectionDetail.swift
//  PaveModule
//
//  Created by KimDuong on 1/12/21.
//  Copyright © 2021 Discovery Loft. All rights reserved.
//

import Foundation
import SQLite

class CDInspectionDetails: CoreData {
    private let inspection_id = Expression<String>("inspection_id")
    private let is_reported = Expression<Bool>("is_reported")
    private let status = Expression<String>("status")
    private let id_vehicle = Expression<String>("id_vehicle")

    private let inspectionDetails = Table("InspectionDetails")

    override func createTable() {
        try! db?.run(inspectionDetails.create(ifNotExists: true) {
            t in
            t.column(inspection_id)
            t.column(is_reported)
            t.column(status)
            t.column(id_vehicle)

        })
    }
}

struct InspectionDetailsDBEntity {
    let inspection_id: String
    let is_reported: Bool
    let status: String
    let id_vehicle: String
}

extension CDInspectionDetails: AbstractRepository {
    func update(entity: InspectionDetailsDBEntity) {
        
    }
    
    func query() -> [InspectionDetailsDBEntity] {
        do {
            let list = try db!.prepare(inspectionDetails).map { row -> InspectionDetailsDBEntity in
                InspectionDetailsDBEntity(inspection_id: row[inspection_id],
                                          is_reported: row[is_reported],
                                          status: row[status],
                                          id_vehicle: row[id_vehicle])
            }
            return list
        } catch {
            return []
        }
    }

    func save(entity: InspectionDetailsDBEntity) {
        let insert = inspectionDetails.insert(
            inspection_id <- entity.inspection_id,
            is_reported <- entity.is_reported,
            status <- entity.status,
            id_vehicle <- entity.id_vehicle
        )
        _ = try? db!.run(insert)
    }

    func delete(entity: InspectionDetailsDBEntity) {
        let inspectionDetail = inspectionDetails.filter(inspection_id == entity.inspection_id)
        try? db?.run(inspectionDetail.delete())
    }

    typealias T = InspectionDetailsDBEntity
}
