const selenium = require('selenium-webdriver');
const fs = require('fs');
const minimo = require('minimojs/minimojs/minimo');
const httpServer = require('http-server/lib/http-server');
const _ = require('underscore');
const prompt = require('prompt');

let driver;
const destFolder = `${__dirname}/tmp`;

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      let curPath = `${path}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

deleteFolderRecursive(destFolder);
let server;

const closeResources = () => {
  console.log('Stoping selenium driver')
  driver.quit();
  console.log('Removing tmp folder');
  deleteFolderRecursive(destFolder);
  if (server) {
    console.log('Stoping http server')
    server.close();
  }
}

const buffer = new function() {
  let errorCount = 0;
  let groups = [];
  this.newTestGroup = (groupName) => new function() {
    groups.push(this);
    let strBuffer = [];
    let tests = [];
    this.getName = () => groupName;
    this.newTest = (testName) => new function() {
      tests.push(this);
      this.getName = () => testName;
      this.getGroupName = () => groupName;
      this.getUrl = () => `http://localhost:8080/${groupName}/${testName}.html`;
      this.error = (e) => {
        //        `Error in test ${test.getGroupName()}/${test.getName()}: ${e.message}`
        this._error = e;
        errorCount++;
      }
      this.notConfigured = () => this._notConfigured = true;
    }
  }

  this.print = () => {};
}

const runTestGroup = (testGroup, list) => new Promise(resolve => {
  const exec = (testName, rest) => new Promise(r => {
    let test = testGroup.newTest(testName);
    try {
      driver.get(test.getUrl());
      console.log(`Running test: ${test.getUrl()}`);
    } catch (e) {
      console.stackTrace(e);
      test.error(e);
      r();
      return;
    }
    driver.wait(() => driver.isElementPresent(selenium.By.id("instructions")), 5000);

    let instructions;
    try {
      instructions = driver.findElement(selenium.By.id("instructions"));
    } catch (e) {
      console.log(`Test is not configured ${e.message}`);
      test.notConfigured();
      r();
      return;
    }
    let step = 0;
    let text;
    instructions.getText().then(t => {
      text = t;
      console.log("SSSSSS " + text);
      r();
    });
  }).then(() => {
    if (_.isEmpty(rest)) resolve();
    else exec(_.first(rest), _.rest(rest));
  });
  exec(_.first(list), _.rest(list));
});

const execTests = ([testGroupName, testList], remainingTests) => new Promise((resolve, reject) => {
  let testGroup = buffer.newTestGroup(testGroupName);
  runTestGroup(testGroup, testList)
    .then(() => {
      if (_.isEmpty(remainingTests)) resolve()
      else execTests(_.first(remainingTests), _.rest(remainingTests));
    })
});

const getTests = () => {
  const result = {};
  fs.readdirSync(`./pages`).map(testName => {
    let curPath = `${__dirname}/pages/${testName}`;
    if (fs.lstatSync(curPath).isDirectory()) {
      result[testName] = fs.readdirSync(curPath)
        .filter(file => file.endsWith(".htmx"))
        .map(file => file.substring(0, file.length - ".htmx".length))
    }
  });
  return result;
}
const tests = getTests();
const testByIndex = {};

console.log("==========================================");
let count = 1;
for (let k in tests) {
  testByIndex[count] = k;
  console.log(`${count++})${k}`);
}
console.log("==========================================");

console.log("Type the number of the test to run or type 0 to run all or a q to quit");

prompt.start();

prompt.get(['test'], (err, result) => {
  if (result.test == 'q') return;

  const testId = parseInt(result.test);
  let testsToRun;
  if (testId != 0) {
    testsToRun = {};
    testsToRun[testByIndex[testId]] = tests[testByIndex[testId]];
  } else {
    testsToRun = tests;
  }

  new Promise((resolve, reject) => {
    driver = new selenium.Builder()
      .withCapabilities(selenium.Capabilities.chrome())
      .build();

    if (!fs.existsSync(destFolder)) {
      fs.mkdirSync(destFolder);
    }

    console.log('Compiling pages');
    minimo.generateMinimoJs({
      workingFolder: __dirname,
      defaultTemplate: 'tpl.htmx',
      destinationPath: destFolder,
      devMode: true
    }).then(() => {
      console.log('starting server');
      server = httpServer.createServer({
        root: destFolder,
        robots: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true'
        }
      });

      server.listen(8080);

      let pairs = _.pairs(testsToRun);
      execTests(_.first(pairs), _.rest(pairs))
        .then(resolve)
        .catch(reject);
    });

  }).catch(err => {
    console.error('ERROR: ' + err)
    closeResources();
  }).then(() => {
    console.log('SUCCESS');
    closeResources();
  });
});
