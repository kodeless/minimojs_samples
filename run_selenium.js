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

const getElements = (idOrName) => {
  let el = driver.findElement(selenium.By.id(idOrName));
  if (!el) {
    el = driver.findElement(selenium.By.className(idOrName));
  }
  return el;
}

const execInstruction = ({
  command,
  elementIdOrParam,
  paramList
}, step) => new Promise((resolve, reject) => {
  console.log(`Executing step: ${step}, command ${command}, with elementId or first param ${elementIdOrParam}, and ${paramList.join(',')}`);
  const firstParam = elementIdOrParam;
  const elementId = elementIdOrParam;
  if (command == "wait") {
    setTimeout(resolve, parseInt(firstParam));
  } else if (command == "type") {
    let el = getElements(elementId);
    el.sendKeys(paramList[0]);
    setTimeout(resolve, 500);
  } else if (command == "text") {
    let el = getElements(elementId);
    el.getText().then(text => {
      if (text.replace(" ", "") != paramList[0]) {
        reject({
          step: step,
          message: `InnerText of element ${elementId} = '${text}' and should be '${paramList[0]}'`
        });
      } else {
        resolve();
      }
    });
  } else if (command == "value") {
    let el = getElements(elementId);
    el.getAttribute("value").then(value => {
      let paramValue = paramList[0];
      if (paramValue && paramValue != value) {
        reject({
          step: step,
          message: `Value of element ${elementId} = '${value}' and should be '${paramValue}'`
        });
      } else {
        resolve();
      }
    });
  } else if (command == "notfound") {
    let found = true;
    try {
      driver.findElement(selenium.By.id(elementId));
    } catch (e) {
      found = false;
    }
    if (found) {
      reject({
        step: step,
        message: `Should be notfound ${elementId}`
      });
    } else {
      resolve();
    }
  } else if (command == "found") {
    let found = true;
    try {
      driver.findElement(selenium.By.id(elementId));
    } catch (e) {
      found = false;
    }
    if (!found) {
      reject({
        step: step,
        message: `Should be found ${elementId}`
      });
    } else {
      resolve();
    }
  } else if (command == "click") {
    setTimeout(() => {
      let el = getElements(elementId);
      el.click();
      setTimeout(resolve, 500);
    }, 300);
  } else if (command == "select") {
    let el = getElements(elementId);
    driver.executeScript(`
      document.getElementById('${elementId}').options[${paramList[0]}].selected = 'selected';
      document.getElementById('${elementId}').dispatchEvent(new Event('change'))
      `)
      .then(() => {
        setTimeout(resolve, 500);
      });
  } else if (command == "attr") {
    let el = getElements(elementId);
    el.getAttribute(paramList[0]).then(attr => {
      let value = paramList.length > 1 ? paramList[1] : "";
      if (value != attr) {
        reject({
          step: step,
          message: `Attribute ${paramList[0]} of element ${elementId} is '${attr}' but should be '${value}'`
        });
      } else {
        resolve();
      }
    });
  } else if (command == "del") {
    let el = getElements(elementId);
    _.range(parseInt(paramList[0])).forEach(() => el.sendKeys(selenium.Keys.BACK_SPACE));
    setTimeout(resolve, 500);
  } else if (command == "down") {
    let el = getElements(elementId);
    _.range(parseInt(paramList[0])).forEach(() => el.sendKeys(selenium.Keys.ARROW_DOWN));
    setTimeout(resolve, 500);
  } else if (command == "enter") {
    let el = getElements(elementId);
    el.sendKeys(Keys.ENTER);
    setTimeout(resolve, 500);
  } else if (command == "eq") {
    let el = getElements(elementId);
    let el2 = getElements(paramList[0]);
    Promise.all([el.getText(), el2.getText()])
      .then(text1, text2 => {
        if (text1.replace(" ", "") != text2.replace(" ", "")) {
          reject({
            step: step,
            message: `InnerText of element ${elementId} = ${text1} is different of innerText of element ${paramList[0]} = ${text2}`
          });
        } else {
          resolve();
        }
      });
  } else if (command == "neq") {
    let el = getElements(elementId);
    let el2 = getElements(paramList[0]);
    Promise.all([el.getText(), el2.getText()])
      .then(text1, text2 => {
        if (text1.replace(" ", "") == text2.replace(" ", "")) {
          reject({
            step: step,
            message: `InnerText of element ${elementId} = ${text1} is equals to innerText of element ${paramList[0]} = ${text2}`
          });
        } else {
          resolve();
        }
      });
  }
});

const parseInstructions = (text) => text.trim().split(";")
  .filter(line => line.trim() != "")
  .map(line => {
    const split = line.trim().split(" ");
    const i = {
      paramList: []
    };
    i.command = split[0];
    if (split.length > 1) {
      i.elementIdOrParam = split[1];
    }
    split.slice(2, split.length).forEach(s => i.paramList.push(s));
    if (i.paramList.length == 0) {
      i.paramList.push("");
    }
    return i;
  });

const buffer = new function () {
  let errorCount = 0;
  let groups = [];
  this.newTestGroup = (groupName) => new function () {
    groups.push(this);
    let strBuffer = [];
    let tests = [];
    this.getTests = () => tests;
    this.getName = () => groupName;
    this.newTest = (testName) => new function () {
      tests.push(this);
      this.getName = () => testName;
      this.getGroupName = () => groupName;
      this.getUrl = () => `http://localhost:8080/${groupName}/${testName}.html`;
      this.error = (e) => {
        //        `Error in test ${test.getGroupName()}/${test.getName()}: ${e.message}`
        this._error = {
          message: e.message,
          step: e.step || 0
        }
        errorCount++;
      }
      this.notConfigured = () => this._notConfigured = true;
    }
  }

  this.print = () => {
    console.log(`
==========================================================
${errorCount == 0 ? 'Tests succeded' : `Error count: ${errorCount}`}
${groups.map(group => `
Group name: ${group.getName()}
${group.getTests().map(test => `
----------------------------------------------------------
-${test.getName()}: ${test._error ? 'Erro' : 'Sucess'}
${test._error ? `
  Error on step: ${test._error.step}
  Error message: ${test._error.message}
` : ''}
`).join('\n')}
`).join('\n')}
==========================================================
      `)
  };
}

const runTestGroup = (testGroup, list) => new Promise(resolve => {
  const exec = (testName, rest) => new Promise(resolve => {
      let test = testGroup.newTest(testName);
      try {
        driver.get(test.getUrl());
        console.log(`Running test: ${test.getUrl()}`);
      } catch (e) {
        console.stackTrace(e);
        test.error(e);
        resolve();
        return;
      }
      driver.wait(() => driver.isElementPresent(selenium.By.id("instructions")), 1000)
        .catch(e => {
          console.log(`Test is not configured ${e.message}`);
          test.notConfigured();
          resolve();
        })
        .then(() => {
          console.log("getting instructions");
          driver.findElement(selenium.By.id("instructions")).getText().then(t => {
            driver.executeScript(`document.getElementById('instructions').remove();`)
              .then(() => {
                let step = 0;
                const instructions = parseInstructions(t);
                console.log(`Running ${instructions.length} intructions`);
                const exec = (list) => {
                  if (_.isEmpty(list)) {
                    resolve();
                  } else {
                    execInstruction(_.first(list), step++)
                      .then(() => {
                        exec(_.rest(list));
                      })
                      .catch((e) => {
                        test.error(e);
                        resolve();
                      });
                  }
                }
                exec(instructions);
              });
          });
        })
    })
    .then(() => {
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

const run = (param) => {
  if (param == 'q') return;

  const testId = parseInt(param);
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
    driver.getWindowHandle();
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
        .then(() => {
          buffer.print();
          resolve();
        })
        .catch(reject);
    });

  }).catch(err => {
    console.error('ERROR: ' + err)
    closeResources();
  }).then(() => {
    console.log('SUCCESS');
    closeResources();
  });
}

if (process.argv.length > 2) {
  run(process.argv[2]);
} else {
  prompt.start();
  prompt.get(['test'], (err, result) => run(result.test));
}