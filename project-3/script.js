/**
 * 思路：根据JSON的type字段处理不同类型的case，对于嵌套的块，递归调用函数。
 * @param {*} jsonblock 
 * @returns 
 */
function generateCodeFromJson(block) {
  let code = '';

  switch (block.type) {
    case '当开始运行':
      // 处理 "当开始运行" 类型
      code += `当开始运行(() => {\n`;
      if (block.next) {
        code += generateCodeFromJson(block.next);
      }
      code += '});\n';
      break;

    case '永远循环':
      // 处理 "永远循环" 类型
      code += `永远循环(() => {\n`;
      if (block.statements.DO) {
          code += generateCodeFromJson(block.statements.DO);
        }
      code += '});\n';
      break;

    case '如果':
      code += `if (${generateCodeFromJson(block.inputs.IF0)}) {\n`;
      if (block.statements && block.statements.DO0) {
        code += generateCodeFromJson(block.statements.DO0);
      }
      if (block.statements && block.statements.ELSE) {
        code += `} else {\n`;
        code += generateCodeFromJson(block.statements.ELSE);
      }
      code += '\n}\n';
      break;

    case '判断角色碰撞':
      // 处理 "判断角色碰撞" 类型
      code += `判断角色碰撞("${block.fields.sprite}", "${block.fields.sprite1}")`;
      break;

    case '移动步数':
      // 处理 "移动步数" 类型
      code += `移动步数(${generateCodeFromJson(block.inputs.steps)})\n`;
      break;

    case '移到位置':
      // 处理 "移到位置" 类型
      code += `移到位置(${generateCodeFromJson(block.inputs.x)}, ${generateCodeFromJson(block.inputs.y)})`;
      break;

    case 'math_number':
      // 处理 "math_number" 类型
      code += block.fields.NUM;
      break;

    default:
      console.warn(`Unknown block type: ${block.type}`);
      break;
  }

  return code;
}

// 示例输入数据
const input = {
  "type": "当开始运行",
  "next": {
    "type": "永远循环",
    "statements": {
      "DO": {
        "type": "如果",
        "inputs": {
          "IF0": {
            "type": "判断角色碰撞",
            "fields": {
              "sprite": "自己",
              "sprite1": "鼠标"
            },
            "is_output": true
          }
        },
        "statements": {
          "DO0": {
            "type": "移动步数",
            "inputs": {
              "steps": {
                "type": "math_number",
                "fields": {
                  "NUM": 10
                },
                "is_output": true
              }
            }
          },
          "ELSE": {
            "type": "移到位置",
            "inputs": {
              "x": {
                "type": "math_number",
                "fields": {
                  "NUM": 0
                },
                "is_output": true
              },
              "y": {
                "type": "math_number",
                "fields": {
                  "NUM": -100
                },
                "is_output": true
              }
            }
          }
        }
      }
    }
  }
};
const generatedCode = generateCodeFromJson(input);
console.log(generatedCode);
