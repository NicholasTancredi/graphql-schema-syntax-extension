# graphql-schema-syntax-extension
## Install
```sh
npm i graphql-schema-syntax-extension
```

## Usage
```ts
import graphqlSchemaSyntaxExtension from 'graphql-schema-syntax-extension'

const Schema = /* GraphQL */`
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

console.log(graphqlSchemaSyntaxExtension(TestSchema))
```