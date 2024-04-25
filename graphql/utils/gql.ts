/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment User on User {\n    id\n    email\n    role\n    fullName\n    profile {\n      firstName\n      lastName\n    }\n  }\n": types.UserFragmentDoc,
    "\n      query UserCurrent {\n        userCurrent {\n          ...User\n        }\n      }\n    ": types.UserCurrentDocument,
    "\n      query UserFindMany($filters: UserFiltersInput!, $sort: UserSortInput!, $pagination: PaginationInput!) {\n        userFindMany(filters: $filters, sort: $sort, pagination: $pagination) {\n          total\n          users {\n            ...User\n          }\n        }\n      }\n    ": types.UserFindManyDocument,
    "\n      mutation UserCreate($data: UserCreateInput!) {\n        userCreate(data: $data) {\n          ...User\n        }\n      }\n    ": types.UserCreateDocument,
    "\n      mutation UserUpdate($userId: String!, $data: UserUpdateInput!) {\n        userUpdate(userId: $userId, data: $data) {\n          ...User\n        }\n      }\n    ": types.UserUpdateDocument,
    "\n      mutation UsersDeleteMany($userIds: [String!]!) {\n        userDeleteMany(userIds: $userIds)\n      }\n    ": types.UsersDeleteManyDocument,
    "\n      mutation HealthcheckTrigger {\n        healthcheck\n      }\n    ": types.HealthcheckTriggerDocument,
    "\n        subscription HealthcheckListen {\n          healthcheck\n        }\n      ": types.HealthcheckListenDocument,
    "\n      query Version {\n        version\n      }\n    ": types.VersionDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment User on User {\n    id\n    email\n    role\n    fullName\n    profile {\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  fragment User on User {\n    id\n    email\n    role\n    fullName\n    profile {\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query UserCurrent {\n        userCurrent {\n          ...User\n        }\n      }\n    "): (typeof documents)["\n      query UserCurrent {\n        userCurrent {\n          ...User\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query UserFindMany($filters: UserFiltersInput!, $sort: UserSortInput!, $pagination: PaginationInput!) {\n        userFindMany(filters: $filters, sort: $sort, pagination: $pagination) {\n          total\n          users {\n            ...User\n          }\n        }\n      }\n    "): (typeof documents)["\n      query UserFindMany($filters: UserFiltersInput!, $sort: UserSortInput!, $pagination: PaginationInput!) {\n        userFindMany(filters: $filters, sort: $sort, pagination: $pagination) {\n          total\n          users {\n            ...User\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UserCreate($data: UserCreateInput!) {\n        userCreate(data: $data) {\n          ...User\n        }\n      }\n    "): (typeof documents)["\n      mutation UserCreate($data: UserCreateInput!) {\n        userCreate(data: $data) {\n          ...User\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UserUpdate($userId: String!, $data: UserUpdateInput!) {\n        userUpdate(userId: $userId, data: $data) {\n          ...User\n        }\n      }\n    "): (typeof documents)["\n      mutation UserUpdate($userId: String!, $data: UserUpdateInput!) {\n        userUpdate(userId: $userId, data: $data) {\n          ...User\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UsersDeleteMany($userIds: [String!]!) {\n        userDeleteMany(userIds: $userIds)\n      }\n    "): (typeof documents)["\n      mutation UsersDeleteMany($userIds: [String!]!) {\n        userDeleteMany(userIds: $userIds)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation HealthcheckTrigger {\n        healthcheck\n      }\n    "): (typeof documents)["\n      mutation HealthcheckTrigger {\n        healthcheck\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        subscription HealthcheckListen {\n          healthcheck\n        }\n      "): (typeof documents)["\n        subscription HealthcheckListen {\n          healthcheck\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query Version {\n        version\n      }\n    "): (typeof documents)["\n      query Version {\n        version\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;