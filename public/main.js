const shortURLinput = document.getElementById("shorturl_input");
const shortURLbtn = document.getElementById("shorturl_btn");
const shortURLresult = document.getElementById("shorturl_result");

const ENDPOINT = "http://localhost:3000";
let input = "";

shortURLinput.addEventListener("change", (e) => {
  input = e.target.value;
});

shortURLinput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    console.log(input);
  }
});

shortURLbtn.addEventListener("click", async (e) => {
  const urlReg = /^http[s]?\:\/\//i;
  if (urlReg.test(input)) {
    console.log("유효한 url");
    let uid;
    while (true) {
      // 유효하지 않은 uid이면 다시 재발급 받아 사용한다.
      uid = make8id();
      const response = await fetch(`${ENDPOINT}/url/${uid}`);
      const data = await response.json();
      if (!data.success) {
        break;
      }
      console.log(data);
    }

    const postResponse = await fetch(`${ENDPOINT}/url/short`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ original: input, short: uid }),
    });
    const postData = await postResponse.json();
    shortURLresult.innerText = `${ENDPOINT}/${uid}`;
  } else {
    console.log("유효하지 않은 url");
  }
});

function make8id() {
  const candidateChar = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let char = [];
  for (let i = 0; i < 8; i++) {
    char.push(candidateChar[Math.floor(Math.random() * 61)]);
  }
  return char.join("");
}
