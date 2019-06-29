"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const TestSchema = /* GraphQL */ `
interface Node {
    id: ID! @id
    createdAt: DateTime! @createdAt
    updatedAt: DateTime! @updatedAt
}

interface DataArray {
    labels: [[String!]]!
    typedArray: TypedArray!
    shape: [Number!]!
    dtype: DType!
}

type User implements Node {
    type: UserType!
    name: String!
}

type Simple {
    type: UserType!
    name: String!
}

type DataUser implements Node & DataArray {
    type: UserType!
    name: String!
}

type Spread {
    ...Simple
    gg: Number!
    l: String!
}
`;
console.log(index_1.default(TestSchema));
