import { buildSchema } from "graphql";

export const schema = buildSchema(`
input ReservationEntity {
    id: ID
    start: String!
    end: String!
    type: Int!
    persons: [Int]
}
type ReservationDto {
    id: ID!
    start: String!
    end: String!
    type: Int!
    persons: [PersonDto]
}

input PersonEntity {
    id: ID
    email: String!
    authId: String!
    authName: String!
    roleFlag: Int!
    famillyName: String!
    nickName: String!
}
type PersonDto {
    id: ID!
    email: String!
    authId: String!
    authName: String!
    roleFlag: Int!
    famillyName: String!
    nickName: String!
}

type Query {
    allReservation(offset: Int, first: Int): [ReservationDto]
    findReservation(start: String!, end: String, offset: Int, first: Int): [ReservationDto]
    getReservation(id: Int!): ReservationDto
    delReservation(id: Int!): ReservationDto

    allPerson(offset: Int, first: Int): [PersonDto]
    getPerson(id: Int!): PersonDto
    delPerson(id: Int!): PersonDto
}

type Mutation {
    setReservation(entry: ReservationEntity): ReservationDto
    setPerson(entry: PersonEntity): PersonDto
}
`);
