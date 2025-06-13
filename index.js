#!/usr/bin/env node

import fs from 'fs';
import chalk from 'chalk';
import { Command } from 'commander';
const program = new Command();
program
    .name('cli')
    .description('A CLI built with Commander.js')
    .version('1.0.0')
    .option('-d , --debug','output extra debugging information')
    .option('-f,--file<path>','specify the file to process')
    .option('-t , --timeout <seconds>', 'specify the timeout in seconds','60')
    .option('-v, --verbose','enable verbose output');

const options = program.opts();

program.command('count-words <file>')
    .description('Count words in a file')
    .action((fileArg) => {
        fs.readFile(fileArg,'utf-8',(err,data) => {
            if(err){
                console.log(chalk.red.bold(`Error: Could not open file "${fileArg}"`));
            }
            else{
                const text = data.trim();
                const words = text ? text.split(/\s+/) : [];
                console.log(chalk.green(`✔ ${words.length} words in ${chalk.cyan(fileArg)}`));

            }
            //console.log('fileArg:', fileArg);

        });

    });

program.command('count-lines <file>')
    .description('Count lines in a file')
    .action((fileArg) => {
        fs.readFile(fileArg,'utf-8',(err,data) => {
            if(err){console.log(chalk.red.bold(`Error: Could not open file "${fileArg}"`));console.log(err);
            }
            else{
                const lines = data.split('\n').length;
                console.log(chalk.green(`✔ ${lines} lines in ${chalk.cyan(fileArg)}`));
            }
            //console.log('fileArg:', fileArg);

        });

    });

program.command('summary <file>')
    .description('Show lines,words and sentences')
    .action((fileArg)=>{
        fs.readFile(fileArg,'utf-8',(err,data) => {
            if(err){
                console.log(chalk.red.bold(`Error: Could not open file "${fileArg}"` ));
                console.log(err);
            }
            else{
                const lines = data.split('\n').length;
                const words = data.trim().split(/\s+/).length;
                const sentences = data.split(/[.!?]+/).filter(Boolean).length;
                console.log(
                chalk.green(`✔ ${lines} lines`) + ' • ' +
                chalk.blue(`${words} words`) + ' • ' +
                chalk.yellow(`${sentences} sentences`));
            }
        });
    });

program
  .command('search <word> <file>')
  .description('Search for <word> in <file> and show how many times it occurs')
  .option('-i, --ignore-case', 'case‑insensitive search')
  .action((wordArg, fileArg, cmdObj) => {
    fs.readFile(fileArg, 'utf-8', (err, data) => {
      if (err) {
        console.log(chalk.red.bold(`Error: Could not open file "${fileArg}"`));
        return;
      }

      // Escape regex specials and build pattern
      const escaped = wordArg.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); 
      const flags = cmdObj.ignoreCase ? 'gi' : 'g';
      const pattern = new RegExp(escaped, flags);

      const matches = data.match(pattern);
      const count = matches ? matches.length : 0;

      if (count > 0) {
        console.log(
          chalk.green(
            `✔ "${chalk.cyan(wordArg)}" found ${count} time${count > 1 ? 's' : ''} in ${chalk.cyan(fileArg)}`
          )
        );
      } else {
        console.log(
          chalk.yellow(
            ` No occurrences of "${chalk.cyan(wordArg)}" in ${chalk.cyan(fileArg)}`
          )
        );
      }
    });
  });

program
    .command('stat <file>')
    .description('Show file metadata: type,size ,timestamps')
    .action((fileArg) => {
        fs.stat(fileArg, (err, stats) => {
            if (err) {
                console.log(chalk.red.bold(`Error: Cannot access "${fileArg}"`));
                console.log(err);
            }
            const type = stats.isFile()
                ? 'File'
                : stats.isDirectory()
                    ? 'Directory'
                    : 'Other';

            const sizeKB = (stats.size / 1024).toFixed(2);

            console.log(
                chalk.green('Stats for ') +
                `${chalk.cyan(fileArg)}:`
            );
            console.log(
                `  Type: ${chalk.cyan(type)}`
            );
            console.log(
                `  Size: ${chalk.blue(sizeKB + ' KB')}`
            );
            console.log(
                `  Created: ${stats.birthtime.toLocaleString()}`
            );
            console.log(
                `  Modified: ${stats.mtime.toLocaleString()}`
            );

        });
    });

program.parse();