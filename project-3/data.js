// 输入
// {
//     "type": "当开始运行",
//     "next": {
//       "type": "永远循环",
//       "statements": {
//         "DO": {
//           "type": "如果",
//           "inputs": {
//             "IF0": {
//               "type": "判断角色碰撞",
//               "fields": {
//                 "sprite": "自己",
//                 "sprite1": "鼠标"
//               },
//               "is_output": true
//             }
//           },
//           "statements": {
//             "DO0": {
//               "type": "移动步数",
//               "inputs": {
//                 "steps": {
//                   "type": "math_number",
//                   "fields": {
//                     "NUM": 10
//                   },
//                   "is_output": true
//                 }
//               }
//             },
//             "ELSE": {
//               "type": "移到位置",
//               "inputs": {
//                 "x": {
//                   "type": "math_number",
//                   "fields": {
//                     "NUM": 0
//                   },
//                   "is_output": true
//                 },
//                 "y": {
//                   "type": "math_number",
//                   "fields": {
//                     "NUM": -100
//                   },
//                   "is_output": true
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// 输出
// 当开始运行(() => {
//     永远循环(() => {
//       if (判断角色碰撞("自己", "鼠标")) {
//         移动步数(10);
//       } else {
//         移到位置(0, -100);
//       }
//     });
//   });