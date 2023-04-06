const express = require("express");

const { exec } = require("child_process");
const app = express();

app.get("/runform", (req, res) => {
  res.sendFile(__dirname + "/new3.html");
});

app.get("/run", (req, res) => {
  const cname = req.query.cname;
  const cimage = req.query.cimage;

  //res.send(cimage);

  exec(
    "docker run -dit --name " + cname + " " + cimage,
    (err, stdout, stderr) => {
      console.log(stdout);
      res.send(
        "<center>" +
          "<pre>" +
          stdout +
          "</pre> <a href='/ps'>click here to see all containers ststus</a>" +
          "</center>"
      );
    }
  );
});

app.get("/ps", (req, res) => {
  exec("docker ps -a", (err, stdout, stderr) => {
    res.send("<center>" + "<pre>" + stdout + "</pre>" + "</center>");
  });
});

app.get("/del", (req, res) => {
  const cimagedel = req.query.cimagedel;

  exec("docker rm -f " + cimagedel, (x, y, z) => {
    res.send(
      "instance deleted is " +
        cimagedel +
        "</br>" +
        "<a href='/ps'>click here to see containers status</a>"
    );
  });
});

app.get("/delall", (req, res) => {
  const del = req.query.del;
  exec("docker rm -f " + "$" + "(docker ps -a -q)", (x, y, z) => {
    res.send(
      "<pre>" +
        y +
        "</pre>" +
        "<a href='/ps'>click here to see running container</a>"
    );
  });
});

app.get("/push", (req, res) => {
  const push1 = req.query.push;
  let imname = req.query.imname;

  exec(
    "docker tag " +
      push1 +
      " " +
      "adinarayan25/" +
      imname +
      " ;" +
      " " +
      "docker push adinarayan25/" +
      imname,
    (x, y, z) => {
      res.send("<pre>" + y + "</pre>");
    }
  );
});

app.get("/see", (req, res) => {
  exec("docker ps -a", (x, y, z) => {
    res.send("<center>" + "<pre>" + y + "</pre>" + "</center>");
  });
});

app.listen(3008, () => {
  console.log("Container app running...");
});
