/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSongs = `query GetSongs($songid: ID!) {
  getSongs(songid: $songid) {
    songid
    title
    author
  }
}
`;
export const listSongs = `query ListSongs(
  $filter: TableSongsFilterInput
  $limit: Int
  $nextToken: String
) {
  listSongs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      songid
      title
      author
    }
    nextToken
  }
}
`;
