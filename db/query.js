export const dropQuery = `
    DROP TABLE IF EXISTS urlinfo
`;

export const initialQuery = `
  CREATE TABLE IF NOT EXISTS urlinfo(
    url_id INTEGER PRIMARY KEY AUTOINCREMENT,
    url_original VARCHAR,
    url_short VARCHAR
  )
`;

export const dummyDataQuery = `
  insert into urlinfo(url_original, url_short) values ('https://www.naver.com/', '888888')
`;
