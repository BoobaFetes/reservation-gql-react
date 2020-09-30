import { Database } from "sqlite3";
import { entity } from "@reservation-gql-react/interfaces-layer";
import { personSql } from "./PersonSql";

export const runCreateDbScript = (connectionString: string) => {
  return new Promise<void>((resolve, reject) => {
    const db = new Database(connectionString);

    db.serialize(function () {
      // create tables if not already done
      db.parallelize(function () {
        db.run(`  
          CREATE TABLE IF NOT EXISTS person (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              authName TEXT NULL,
              authId TEXT NULL,
              email TEXT NOT NULL,
              famillyName TEXT NOT NULL,
              nickName TEXT NOT NULL,
              roleFlag INTEGER DEFAULT 1
          );`);
        db.run(`      
          CREATE TABLE IF NOT EXISTS reservation (
            id INTEGER PRIMARY KEY,
            start TEXT NOT NULL,
            end TEXT NOT NULL,
            type INTEGER NOT NULL
        );`);
        db.run(`  
        CREATE TABLE IF NOT EXISTS relReservationPerson (
          id INTEGER PRIMARY KEY,
          reservationId INTEGER NOT NULL,
          personId INTEGER,
          FOREIGN KEY(reservationId) REFERENCES reservation(id)
          FOREIGN KEY(personId) REFERENCES person(id)
        );`);
      });
      // insert data if not already done
      db.get(personSql.all, { $first: 1, $offset: 0 }, function (
        _,
        person: entity.IPerson
      ) {
        if (person) {
          return;
        }

        db.run(`
          INSERT INTO person (authName, authId, email, famillyName, nickName, roleFlag) 
          VALUES 
            ("facebook", "Customer_a", "c.dupont@facebook.net", "Dupont", "Christian", ${
              entity.RoleEnum.Customer
            }),
            ("facebook", "Customer_Owner_b", "ponpondelatour@facebook.net", "De la Tour", "Ponpon", ${
              entity.RoleEnum.Customer + entity.RoleEnum.Owner
            }),
            ("facebook", "Employee_c", "dolores@Vedettedopera.net", "Vedettedopera", "Dolores", ${
              entity.RoleEnum.Employee
            }),
            ("facebook", "Employee_Owner_d", "duduche@paille.a.son", "Paille à son", "Duduche", ${
              entity.RoleEnum.Employee + entity.RoleEnum.Owner
            }),
            ("facebook", "Administrator_Owner_angie", "angelique.rg@centreequestregabaurias.fr", "Roland-Gosselin", "Angélique", ${
              entity.RoleEnum.Administrator + entity.RoleEnum.Owner
            }),
            ("facebook", "Administrator_axel", "rg_axel@yahoo.fr", "Roland-Gosselin", "Axel", ${
              entity.RoleEnum.Administrator
            });`);
        db.run(`
          INSERT INTO reservation (start, end, type) 
          VALUES 
            ("2020-01-01T08:00:00+01:00", "2020-01-01T09:00:00+01:00", 1),
            ("2020-01-01T10:00:00+01:00", "2020-01-01T11:00:00+01:00", 1),
            ("2020-01-01T10:00:00+01:00", "2020-01-01T11:00:00+01:00", 2),
            ("2020-01-01T14:00:00+01:00", "2020-01-01T15:00:00+01:00", 1),
            ("2020-01-01T16:00:00+01:00", "2020-01-01T17:00:00+01:00", 3);`);
        db.run(`
          INSERT INTO relReservationPerson (reservationId, personId) 
          VALUES 
            (1, 2),
            (2, 2),
            (2, 3),
            (3, 3),
            (3, 4),
            (4, 5);`);
      });
    });
  });
};
