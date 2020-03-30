import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Country = {
   __typename?: 'Country';
  name?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Result>>>;
  mostRecent?: Maybe<Result>;
};

export type DateInput = {
  eq?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  results?: Maybe<Array<Maybe<Result>>>;
  result?: Maybe<Result>;
  countries?: Maybe<Array<Maybe<Country>>>;
  country?: Maybe<Country>;
};


export type QueryResultsArgs = {
  countries?: Maybe<Array<Maybe<Scalars['String']>>>;
  date?: Maybe<DateInput>;
};


export type QueryResultArgs = {
  country: Scalars['String'];
  date?: Maybe<Scalars['String']>;
};


export type QueryCountriesArgs = {
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryCountryArgs = {
  name?: Maybe<Scalars['String']>;
};

export type Result = {
   __typename?: 'Result';
  country?: Maybe<Country>;
  date?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Int']>;
  deaths?: Maybe<Scalars['Int']>;
  recovered?: Maybe<Scalars['Int']>;
  growthRate?: Maybe<Scalars['Float']>;
};


export type ResultDateArgs = {
  format?: Maybe<Scalars['String']>;
};

export type GetStuffQueryVariables = {};


export type GetStuffQuery = (
  { __typename?: 'Query' }
  & { results?: Maybe<Array<Maybe<(
    { __typename?: 'Result' }
    & Pick<Result, 'date' | 'deaths'>
    & { country?: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, 'name'>
    )> }
  )>>> }
);


export const GetStuffDocument = gql`
    query GetStuff {
  results(countries: ["Italy", "Spain", "US"], date: {gt: "1/1/2020"}) {
    country {
      name
    }
    date
    deaths
  }
}
    `;
export type GetStuffComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetStuffQuery, GetStuffQueryVariables>, 'query'>;

    export const GetStuffComponent = (props: GetStuffComponentProps) => (
      <ApolloReactComponents.Query<GetStuffQuery, GetStuffQueryVariables> query={GetStuffDocument} {...props} />
    );
    
export type GetStuffProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetStuffQuery, GetStuffQueryVariables> & TChildProps;
export function withGetStuff<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetStuffQuery,
  GetStuffQueryVariables,
  GetStuffProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetStuffQuery, GetStuffQueryVariables, GetStuffProps<TChildProps>>(GetStuffDocument, {
      alias: 'getStuff',
      ...operationOptions
    });
};
export type GetStuffQueryResult = ApolloReactCommon.QueryResult<GetStuffQuery, GetStuffQueryVariables>;