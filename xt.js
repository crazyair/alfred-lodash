"use strict";
const alfy = require("alfy");
const map = require("lodash.map");
const fs = require("fs");
const path = require("path");

const dataPath = `${path.resolve(__dirname, ".")}/data.json`;
const app = async () => {
  try {
    let list = [];
    if (fs.existsSync(dataPath)) {
      list = JSON.parse(await fs.readFileSync(dataPath, "utf8"));
    } else {
      const data = await alfy.fetch("http://lodash.think2011.net/pages.json");
      map(data, (item, index) => {
        if (index > 2) {
          const title = `${item.href}`.slice(1);
          list.push({ title, subtitle: "打开网页看说明", arg: title });
        }
      });
      try {
        await fs.writeFileSync(
          `${path.resolve(__dirname, ".")}/data.json`,
          JSON.stringify(list, null, 2)
        );
      } catch (error) {
        console.log("err", error);
      }
    }
    alfy.output(list);
  } catch (error) {
    console.log("err", error);
  }
};
app();
