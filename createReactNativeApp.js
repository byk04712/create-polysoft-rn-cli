/**
 * Copyright (c) 2019-present, Andy.Q(739694218@qq.com), Inc.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

const program = require('commander');
const shell = require('shelljs');
const logUpdate = require('log-update');
const package = require('./package.json');

program
  .version('1.0.0')
  .usage(`${package.name} <project-name>`)
  .description('快速构建 React Native 项目目录结构和基本功能')
  .parse(process.argv);

 if (!program.args.length) {
   program.help();
 }

if (program.args.length === 1) {
  // 1. 创建目录
  console.log(shell.mkdir('-p', program.args[0]));
  // 2. 进入创建的目录
  shell.cd(program.args[0]);
  // 3. 执行 git init 命令
  shell.exec('git init');

  let i = 0;
  const frames = ['-', '\\', '|', '/'];
  const interval = setInterval(() => {
    const frame = frames[i = ++i % frames.length];
    logUpdate(`👉 👉 ${frame} initializing ${frame} 👈 👈`);
  }, 50)

  // 4. 执行 git pull 拉取代码
  shell.exec('git pull https://github.com/byk04712/react-native-skeleton.git', (code) => {
    clearInterval(interval);
    if (code !== 0) {
      console.log('Error! Try again');
      shell.exit(1);
    }
    console.log('👏 👏 Congratulation! Create ReactNativeApp Success! 👏 👏');
  })
}