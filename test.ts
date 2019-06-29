import main from './index'

const TestSchema = /* GraphQL */`
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
`

console.log(main(TestSchema))