import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dropQuery, dummyDataQuery, initialQuery } from "./db/query.js";

const ENDPOINT = "http://localhost:3000";

//-------- DB 설정
let db;
(async () => {
  // open the database
  db = await open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });

  await db.exec(dropQuery);
  await db.exec(initialQuery);
  await db.exec(dummyDataQuery);
})();

const app = express();

//-------- 서버 설정
app.use(express.static("public"));
app.use(express.json());

//-------- 서버 라우팅
// id params를 통해 DB내부에 해당 id가 이미 있는지 판별하는 API
app.get("/url/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await db.get(
    `SELECT url_short FROM urlinfo WHERE url_short = ?`,
    id
  );

  console.log(result);
  if (result !== undefined) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

app.post("/url/short", async (req, res) => {
  console.log("body", req.body);
  const { short, original } = req.body;
  const result = await db.run(
    `INSERT INTO urlinfo(url_original, url_short) values (?, ?)`,
    original,
    short
  );

  res.send({ success: true });
});

app.get("/:uid", async (req, res) => {
  const { uid } = req.params;
  const result = await db.get(
    `SELECT url_original FROM urlinfo WHERE url_short = ?`,
    uid
  );

  console.log(result);
  if (result !== undefined) {
    res.redirect(result["url_original"]);
  } else {
    res.send(`존재하지 않는 페이지입니다.`);
  }
});

// 메인 화면
app.get("/", (req, res) => {
  res.render(__dirname + "/public/index.html");
});

//-------- 서버 실행
app.listen(process.env.PORT || 3000, () => {
  console.log(`server open by port 3000`);
});
