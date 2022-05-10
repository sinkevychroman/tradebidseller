//
//  CDVehicleDetail.swift
//  PaveModule
//
//  Created by KimDuong on 1/12/21.
//  Copyright © 2021 Discovery Loft. All rights reserved.
//

import Foundation
import SQLite
class CDVehicleDetails: CoreData {
    private let id = Expression<String>("id")
    private let vin = Expression<String>("vin")
    private let model_year = Expression<String>("model_year")
    private let vehicle_make = Expression<String>("vehicle_make")
    private let vehicle_model = Expression<String>("vehicle_model")
    private let vehicle_bodystyle = Expression<String>("vehicle_bodystyle")
    private let vehicle_trim = Expression<String>("vehicle_trim")
    private let session_key = Expression<String>("session_key")
    private let vehicle_transmission = Expression<String>("vehicle_transmission")
    private let vehicle_exterior_color = Expression<String>("vehicle_exterior_color")
    private let vehicle_interior_color = Expression<String>("vehicle_interior_color")
    private let odom_reading = Expression<Int>("odom_reading")
    private let odom_unit = Expression<String>("odom_unit")

    private let vehicleDetails = Table("VehicleDetails")

    func craeteTable() {
        try! db?.run(vehicleDetails.create(ifNotExists: true) { t in
            t.column(id, primaryKey: true)
            t.column(vin)
            t.column(model_year)
            t.column(vehicle_model)
            t.column(vehicle_bodystyle)
            t.column(vehicle_trim)
            t.column(session_key)
            t.column(vehicle_transmission)
            t.column(vehicle_exterior_color)
            t.column(vehicle_interior_color)
            t.column(odom_reading)
            t.column(odom_unit)

        })
    }
}

extension CDVehicleDetails: AbstractRepository {
    func update(entity: VehicleDetailsDBEntity) {
        
    }
    
    func query() -> [VehicleDetailsDBEntity] {
        do {
            let list = try db!.prepare(vehicleDetails).map { row -> VehicleDetailsDBEntity in
                VehicleDetailsDBEntity(
                    id: row[id],
                    vin: row[vin],
                    model_year: row[model_year],
                    vehicle_make: row[vehicle_make],
                    vehicle_model: row[vehicle_model],
                    vehicle_bodystyle: row[vehicle_bodystyle],
                    vehicle_trim: row[vehicle_trim],
                    session_key: row[session_key],
                    vehicle_transmission: row[vehicle_transmission],
                    vehicle_exterior_color: row[vehicle_exterior_color],
                    vehicle_interior_color: row[vehicle_interior_color],
                    odom_reading: row[odom_reading],
                    odom_unit: row[odom_unit]
                )
            }
            return list
        } catch {
            return []
        }
    }

    func save(entity: VehicleDetailsDBEntity) {
        let insert = vehicleDetails.insert(
            id <- entity.id,
            vin <- entity.vin,
            model_year <- entity.model_year,
            vehicle_make <- entity.vehicle_make,
            vehicle_model <- entity.vehicle_model,
            vehicle_bodystyle <- entity.vehicle_bodystyle,
            vehicle_trim <- entity.vehicle_trim,
            session_key <- entity.session_key,
            vehicle_transmission <- entity.vehicle_transmission,
            vehicle_exterior_color <- entity.vehicle_exterior_color,
            vehicle_interior_color <- entity.vehicle_interior_color,
            odom_reading <- entity.odom_reading,
            odom_unit <- entity.odom_unit
        )
        _ = try? db!.run(insert)

    }

    func delete(entity: VehicleDetailsDBEntity) {
        let entity = vehicleDetails.filter(id == entity.id)
             try? db?.run(entity.delete())

    }

    typealias T = VehicleDetailsDBEntity
}

struct VehicleDetailsDBEntity {
    let id: String
    let vin: String
    let model_year: String
    let vehicle_make: String
    let vehicle_model: String
    let vehicle_bodystyle: String
    let vehicle_trim: String
    let session_key: String
    let vehicle_transmission: String
    let vehicle_exterior_color: String
    let vehicle_interior_color: String
    let odom_reading: Int
    let odom_unit: String
}
