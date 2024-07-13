import minimist from "minimist";
import prompts from "prompts";
import {
  blue,
  cyan,
  green,
  lightBlue,
  lightGreen,
  lightRed,
  magenta,
  red,
  reset,
  yellow,
} from "kolorist";

// 参数解析器 方便解析我们需要的
const argv = minimist(process.argv.slice(2), {});

console.log(argv);

//  获取项目路径
const cwd = process.cwd();

console.log(cwd);

// prettier-ignore
const helpMessage = `\
Usage: create-vite [OPTION]... [DIRECTORY]

Create a new Vite project in JavaScript or TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template

Available templates:
${yellow   ('vanilla-ts     vanilla'  )}
${green    ('vue-ts         vue'      )}
${cyan     ('react-ts       react'    )}
${cyan     ('react-swc-ts   react-swc')}
${magenta  ('preact-ts      preact'   )}
${lightRed ('lit-ts         lit'      )}
${red      ('svelte-ts      svelte'   )}
${blue     ('solid-ts       solid'    )}
${lightBlue('qwik-ts        qwik'     )}`


const FRAMEWORKS = [
  {
    name: "vanilla",
    display: "Vanilla",
    color: yellow,
    variants: [
      {
        name: "vanilla-ts",
        display: "TypeScript",
        color: blue,
      },
      {
        name: "vanilla",
        display: "JavaScript",
        color: yellow,
      },
    ],
  },
  {
    name: "solid",
    display: "Solid",
    color: blue,
    variants: [
      {
        name: "solid-ts",
        display: "TypeScript",
        color: blue,
      },
      {
        name: "solid",
        display: "JavaScript",
        color: yellow,
      },
    ],
  },
];

// 将 FRAMEWORKS 中存在的variants转换成一维数组 并转换成一维数组
const TEMPLATES = FRAMEWORKS.map(
  (item) => (item.variants && item.variants.map((v) => v.name)) || [item.name]
).flat(Infinity);

// 默认文件名
const defaultTargetDir = "cre-Project";

// 初始化函数
const init = async () => {
  try {
    // prompts
    const result = await prompts([
      {
        type: "text",
        name: "projectName",
        message: "Project name:",
        initial: defaultTargetDir,
      },
      {
        type: "select",
        name: "overwrite",
        message: "Current directory",
        initial: 0,
        choices: [
          {
            title: 'Remove existing files and continue',
            value: 'yes',
          },
          {
            title: 'Cancel operation',
            value: 'no',
          },
          {
            title: 'Ignore files and continue',
            value: 'ignore',
          },
        ],
      }
    ]);

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

init();
