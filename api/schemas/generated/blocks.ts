export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
}






export interface Block {
  readonly __typename?: 'Block';
  readonly id: Scalars['ID'];
  readonly parentHash: Scalars['String'];
  readonly unclesHash: Scalars['String'];
  readonly author: Scalars['String'];
  readonly stateRoot: Scalars['String'];
  readonly transactionsRoot: Scalars['String'];
  readonly receiptsRoot: Scalars['String'];
  readonly number: Scalars['BigInt'];
  readonly gasUsed: Scalars['BigInt'];
  readonly gasLimit: Scalars['BigInt'];
  readonly timestamp: Scalars['BigInt'];
  readonly difficulty: Scalars['BigInt'];
  readonly totalDifficulty: Scalars['BigInt'];
  readonly size?: Maybe<Scalars['BigInt']>;
}

export interface Block_Filter {
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly parentHash?: Maybe<Scalars['String']>;
  readonly parentHash_not?: Maybe<Scalars['String']>;
  readonly parentHash_gt?: Maybe<Scalars['String']>;
  readonly parentHash_lt?: Maybe<Scalars['String']>;
  readonly parentHash_gte?: Maybe<Scalars['String']>;
  readonly parentHash_lte?: Maybe<Scalars['String']>;
  readonly parentHash_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly parentHash_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly parentHash_contains?: Maybe<Scalars['String']>;
  readonly parentHash_not_contains?: Maybe<Scalars['String']>;
  readonly parentHash_starts_with?: Maybe<Scalars['String']>;
  readonly parentHash_not_starts_with?: Maybe<Scalars['String']>;
  readonly parentHash_ends_with?: Maybe<Scalars['String']>;
  readonly parentHash_not_ends_with?: Maybe<Scalars['String']>;
  readonly unclesHash?: Maybe<Scalars['String']>;
  readonly unclesHash_not?: Maybe<Scalars['String']>;
  readonly unclesHash_gt?: Maybe<Scalars['String']>;
  readonly unclesHash_lt?: Maybe<Scalars['String']>;
  readonly unclesHash_gte?: Maybe<Scalars['String']>;
  readonly unclesHash_lte?: Maybe<Scalars['String']>;
  readonly unclesHash_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly unclesHash_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly unclesHash_contains?: Maybe<Scalars['String']>;
  readonly unclesHash_not_contains?: Maybe<Scalars['String']>;
  readonly unclesHash_starts_with?: Maybe<Scalars['String']>;
  readonly unclesHash_not_starts_with?: Maybe<Scalars['String']>;
  readonly unclesHash_ends_with?: Maybe<Scalars['String']>;
  readonly unclesHash_not_ends_with?: Maybe<Scalars['String']>;
  readonly author?: Maybe<Scalars['String']>;
  readonly author_not?: Maybe<Scalars['String']>;
  readonly author_gt?: Maybe<Scalars['String']>;
  readonly author_lt?: Maybe<Scalars['String']>;
  readonly author_gte?: Maybe<Scalars['String']>;
  readonly author_lte?: Maybe<Scalars['String']>;
  readonly author_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly author_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly author_contains?: Maybe<Scalars['String']>;
  readonly author_not_contains?: Maybe<Scalars['String']>;
  readonly author_starts_with?: Maybe<Scalars['String']>;
  readonly author_not_starts_with?: Maybe<Scalars['String']>;
  readonly author_ends_with?: Maybe<Scalars['String']>;
  readonly author_not_ends_with?: Maybe<Scalars['String']>;
  readonly stateRoot?: Maybe<Scalars['String']>;
  readonly stateRoot_not?: Maybe<Scalars['String']>;
  readonly stateRoot_gt?: Maybe<Scalars['String']>;
  readonly stateRoot_lt?: Maybe<Scalars['String']>;
  readonly stateRoot_gte?: Maybe<Scalars['String']>;
  readonly stateRoot_lte?: Maybe<Scalars['String']>;
  readonly stateRoot_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly stateRoot_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly stateRoot_contains?: Maybe<Scalars['String']>;
  readonly stateRoot_not_contains?: Maybe<Scalars['String']>;
  readonly stateRoot_starts_with?: Maybe<Scalars['String']>;
  readonly stateRoot_not_starts_with?: Maybe<Scalars['String']>;
  readonly stateRoot_ends_with?: Maybe<Scalars['String']>;
  readonly stateRoot_not_ends_with?: Maybe<Scalars['String']>;
  readonly transactionsRoot?: Maybe<Scalars['String']>;
  readonly transactionsRoot_not?: Maybe<Scalars['String']>;
  readonly transactionsRoot_gt?: Maybe<Scalars['String']>;
  readonly transactionsRoot_lt?: Maybe<Scalars['String']>;
  readonly transactionsRoot_gte?: Maybe<Scalars['String']>;
  readonly transactionsRoot_lte?: Maybe<Scalars['String']>;
  readonly transactionsRoot_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly transactionsRoot_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly transactionsRoot_contains?: Maybe<Scalars['String']>;
  readonly transactionsRoot_not_contains?: Maybe<Scalars['String']>;
  readonly transactionsRoot_starts_with?: Maybe<Scalars['String']>;
  readonly transactionsRoot_not_starts_with?: Maybe<Scalars['String']>;
  readonly transactionsRoot_ends_with?: Maybe<Scalars['String']>;
  readonly transactionsRoot_not_ends_with?: Maybe<Scalars['String']>;
  readonly receiptsRoot?: Maybe<Scalars['String']>;
  readonly receiptsRoot_not?: Maybe<Scalars['String']>;
  readonly receiptsRoot_gt?: Maybe<Scalars['String']>;
  readonly receiptsRoot_lt?: Maybe<Scalars['String']>;
  readonly receiptsRoot_gte?: Maybe<Scalars['String']>;
  readonly receiptsRoot_lte?: Maybe<Scalars['String']>;
  readonly receiptsRoot_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly receiptsRoot_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly receiptsRoot_contains?: Maybe<Scalars['String']>;
  readonly receiptsRoot_not_contains?: Maybe<Scalars['String']>;
  readonly receiptsRoot_starts_with?: Maybe<Scalars['String']>;
  readonly receiptsRoot_not_starts_with?: Maybe<Scalars['String']>;
  readonly receiptsRoot_ends_with?: Maybe<Scalars['String']>;
  readonly receiptsRoot_not_ends_with?: Maybe<Scalars['String']>;
  readonly number?: Maybe<Scalars['BigInt']>;
  readonly number_not?: Maybe<Scalars['BigInt']>;
  readonly number_gt?: Maybe<Scalars['BigInt']>;
  readonly number_lt?: Maybe<Scalars['BigInt']>;
  readonly number_gte?: Maybe<Scalars['BigInt']>;
  readonly number_lte?: Maybe<Scalars['BigInt']>;
  readonly number_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly number_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly gasUsed?: Maybe<Scalars['BigInt']>;
  readonly gasUsed_not?: Maybe<Scalars['BigInt']>;
  readonly gasUsed_gt?: Maybe<Scalars['BigInt']>;
  readonly gasUsed_lt?: Maybe<Scalars['BigInt']>;
  readonly gasUsed_gte?: Maybe<Scalars['BigInt']>;
  readonly gasUsed_lte?: Maybe<Scalars['BigInt']>;
  readonly gasUsed_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly gasUsed_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly gasLimit?: Maybe<Scalars['BigInt']>;
  readonly gasLimit_not?: Maybe<Scalars['BigInt']>;
  readonly gasLimit_gt?: Maybe<Scalars['BigInt']>;
  readonly gasLimit_lt?: Maybe<Scalars['BigInt']>;
  readonly gasLimit_gte?: Maybe<Scalars['BigInt']>;
  readonly gasLimit_lte?: Maybe<Scalars['BigInt']>;
  readonly gasLimit_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly gasLimit_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timestamp?: Maybe<Scalars['BigInt']>;
  readonly timestamp_not?: Maybe<Scalars['BigInt']>;
  readonly timestamp_gt?: Maybe<Scalars['BigInt']>;
  readonly timestamp_lt?: Maybe<Scalars['BigInt']>;
  readonly timestamp_gte?: Maybe<Scalars['BigInt']>;
  readonly timestamp_lte?: Maybe<Scalars['BigInt']>;
  readonly timestamp_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timestamp_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly difficulty?: Maybe<Scalars['BigInt']>;
  readonly difficulty_not?: Maybe<Scalars['BigInt']>;
  readonly difficulty_gt?: Maybe<Scalars['BigInt']>;
  readonly difficulty_lt?: Maybe<Scalars['BigInt']>;
  readonly difficulty_gte?: Maybe<Scalars['BigInt']>;
  readonly difficulty_lte?: Maybe<Scalars['BigInt']>;
  readonly difficulty_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly difficulty_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly totalDifficulty?: Maybe<Scalars['BigInt']>;
  readonly totalDifficulty_not?: Maybe<Scalars['BigInt']>;
  readonly totalDifficulty_gt?: Maybe<Scalars['BigInt']>;
  readonly totalDifficulty_lt?: Maybe<Scalars['BigInt']>;
  readonly totalDifficulty_gte?: Maybe<Scalars['BigInt']>;
  readonly totalDifficulty_lte?: Maybe<Scalars['BigInt']>;
  readonly totalDifficulty_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly totalDifficulty_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly size?: Maybe<Scalars['BigInt']>;
  readonly size_not?: Maybe<Scalars['BigInt']>;
  readonly size_gt?: Maybe<Scalars['BigInt']>;
  readonly size_lt?: Maybe<Scalars['BigInt']>;
  readonly size_gte?: Maybe<Scalars['BigInt']>;
  readonly size_lte?: Maybe<Scalars['BigInt']>;
  readonly size_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly size_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
}

export interface Block_Height {
  readonly hash?: Maybe<Scalars['Bytes']>;
  readonly number?: Maybe<Scalars['Int']>;
}

export enum Block_OrderBy {
  Id = 'id',
  ParentHash = 'parentHash',
  UnclesHash = 'unclesHash',
  Author = 'author',
  StateRoot = 'stateRoot',
  TransactionsRoot = 'transactionsRoot',
  ReceiptsRoot = 'receiptsRoot',
  Number = 'number',
  GasUsed = 'gasUsed',
  GasLimit = 'gasLimit',
  Timestamp = 'timestamp',
  Difficulty = 'difficulty',
  TotalDifficulty = 'totalDifficulty',
  Size = 'size'
}


export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export interface Query {
  readonly __typename?: 'Query';
  readonly block?: Maybe<Block>;
  readonly blocks: ReadonlyArray<Block>;
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
}


export interface QueryBlockArgs {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
}


export interface QueryBlocksArgs {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Block_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Block_Filter>;
  block?: Maybe<Block_Height>;
}


export interface Query_MetaArgs {
  block?: Maybe<Block_Height>;
}

export interface Subscription {
  readonly __typename?: 'Subscription';
  readonly block?: Maybe<Block>;
  readonly blocks: ReadonlyArray<Block>;
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
}


export interface SubscriptionBlockArgs {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
}


export interface SubscriptionBlocksArgs {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Block_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Block_Filter>;
  block?: Maybe<Block_Height>;
}


export interface Subscription_MetaArgs {
  block?: Maybe<Block_Height>;
}

export interface _Block_ {
  readonly __typename?: '_Block_';
  /** The hash of the block */
  readonly hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  readonly number: Scalars['Int'];
}

/** The type for the top-level _meta field */
export interface _Meta_ {
  readonly __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  readonly block: _Block_;
  /** The deployment ID */
  readonly deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  readonly hasIndexingErrors: Scalars['Boolean'];
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type BlocksQueryVariables = Exact<{
  timestamp: Scalars['BigInt'];
}>;


export type BlocksQuery = (
  { readonly __typename?: 'Query' }
  & { readonly blocks: ReadonlyArray<(
    { readonly __typename?: 'Block' }
    & Pick<Block, 'id' | 'number' | 'timestamp'>
  )> }
);
