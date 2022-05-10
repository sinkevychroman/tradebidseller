//
//  CoreData.swift
//  PaveModule
//
//  Created by KimDuong on 1/12/21.
//

import Foundation
import SQLite

class CoreData {
    let dbPath: String = "myDb.sqlite3"
    let path = NSSearchPathForDirectoriesInDomains(
        .documentDirectory, .userDomainMask, true
    ).first!
    var db: Connection? {
        return try! Connection("\(path)/\(dbPath)")
    }
    func createTable(){}

    
    init() {
        createTable()
        print(path)
    }

}



