export const levels = [
  {
    id: 1,
    title: "小兔的胡萝卜",
    subtitle: "100以内加减入门",
    animal: "小兔米米",
    animalMark: "兔",
    mission: "找回 5 根写着两位数密码的胡萝卜",
    scene: "小兔米米的胡萝卜散落在森林小路上，每根都有一个 100 以内的数字谜题。",
    dialog: "每答对一道 100 以内的题，就能找回一根胡萝卜。",
    treasure: "胡萝卜线索卡",
    sticker: "胡萝卜贴纸",
    color: "carrot",
    generator: { mode: "addSub100", count: 5 },
    questions: [
      { id: "l1-q1", type: "choice", prompt: "23 + 15 = ?", options: [36, 38, 40], answer: 38, hint: "先算 20 + 10，再算 3 + 5。" },
      { id: "l1-q2", type: "choice", prompt: "48 - 12 = ?", options: [34, 36, 38], answer: 36, hint: "先减 10，再减 2。" },
      { id: "l1-q3", type: "story", prompt: "小兔有 35 根胡萝卜，又找到 24 根，现在有几根？", options: [57, 59, 61], answer: 59, hint: "把 35 和 24 合在一起。" },
      { id: "l1-q4", type: "choice", prompt: "76 - 30 = ?", options: [46, 56, 66], answer: 46, hint: "十位减 3，个位不变。" },
      { id: "l1-q5", type: "choice", prompt: "41 + 28 = ?", options: [67, 69, 71], answer: 69, hint: "41 加 20 是 61，再加 8。" }
    ]
  },
  {
    id: 2,
    title: "小熊的蜂蜜罐",
    subtitle: "凑100训练",
    animal: "小熊布布",
    animalMark: "熊",
    mission: "把 5 个蜂蜜罐装到正好 100 格",
    scene: "小熊布布正在准备森林下午茶，蜂蜜罐需要凑满 100 格。",
    dialog: "找到能凑成 100 的数字朋友，蜂蜜罐就会亮起来。",
    treasure: "蜂蜜线索卡",
    sticker: "蜂蜜贴纸",
    color: "honey",
    generator: { mode: "compose100", count: 5 },
    questions: [
      { id: "l2-q1", type: "compose", prompt: "选两个数字凑成 100", target: 100, numbers: [25, 30, 45, 55, 70, 75], answer: [25, 75], hint: "25 离 100 还差 75。" },
      { id: "l2-q2", type: "compose", prompt: "选两个数字凑成 100", target: 100, numbers: [42, 58, 36, 64, 27, 73], answer: [42, 58], hint: "42 和 58 是好朋友。" },
      { id: "l2-q3", type: "compose", prompt: "选两个数字凑成 100", target: 100, numbers: [19, 81, 24, 76, 35, 65], answer: [19, 81], hint: "19 离 100 还差 81。" },
      { id: "l2-q4", type: "compose", prompt: "选两个数字凑成 100", target: 100, numbers: [47, 53, 48, 52, 61, 39], answer: [47, 53], hint: "47 加 53 正好是 100。" },
      { id: "l2-q5", type: "choice", prompt: "68 + ? = 100", options: [22, 32, 42], answer: 32, hint: "68 到 100 还差 32。" }
    ]
  },
  {
    id: 3,
    title: "数字桥",
    subtitle: "100以内比较大小",
    animal: "小鹿斑斑",
    animalMark: "鹿",
    mission: "修好 5 块 100 以内的符号桥板",
    scene: "小鹿斑斑要过桥，但桥中间缺少比较符号。",
    dialog: "选出正确的符号，桥板就会稳稳接上。",
    treasure: "小桥线索卡",
    sticker: "小桥贴纸",
    color: "bridge",
    generator: { mode: "compare100", count: 5 },
    questions: [
      { id: "l3-q1", type: "compare", prompt: "47 ○ 59", left: 47, right: 59, answer: "<", hint: "59 比 47 大。" },
      { id: "l3-q2", type: "compare", prompt: "83 ○ 68", left: 83, right: 68, answer: ">", hint: "83 比 68 大。" },
      { id: "l3-q3", type: "compare", prompt: "72 ○ 72", left: 72, right: 72, answer: "=", hint: "两边一样多。" },
      { id: "l3-q4", type: "compare", prompt: "39 ○ 93", left: 39, right: 93, answer: "<", hint: "93 更大。" },
      { id: "l3-q5", type: "compare", prompt: "100 ○ 99", left: 100, right: 99, answer: ">", hint: "100 更大。" }
    ]
  },
  {
    id: 4,
    title: "火车车厢",
    subtitle: "100以内找规律",
    animal: "小松鼠可可",
    animalMark: "松",
    mission: "补齐 5 节 100 以内的数字车厢",
    scene: "森林小火车马上出发，车厢顺序还没排好。",
    dialog: "看清 100 以内的数字规律，帮火车顺利开动。",
    treasure: "火车线索卡",
    sticker: "火车贴纸",
    color: "train",
    generator: { mode: "pattern100", count: 5 },
    questions: [
      { id: "l4-q1", type: "pattern", prompt: "12、24、36、?", sequence: [12, 24, 36], options: [46, 48, 50], answer: 48, hint: "每次多 12。" },
      { id: "l4-q2", type: "pattern", prompt: "15、30、45、?", sequence: [15, 30, 45], options: [55, 60, 65], answer: 60, hint: "每次多 15。" },
      { id: "l4-q3", type: "pattern", prompt: "90、80、70、?", sequence: [90, 80, 70], options: [50, 60, 65], answer: 60, hint: "每次少 10。" },
      { id: "l4-q4", type: "pattern", prompt: "8、16、24、?", sequence: [8, 16, 24], options: [30, 32, 34], answer: 32, hint: "每次多 8。" },
      { id: "l4-q5", type: "pattern", prompt: "100、85、70、?", sequence: [100, 85, 70], options: [45, 55, 65], answer: 55, hint: "每次少 15。" }
    ]
  },
  {
    id: 5,
    title: "海岛宝箱",
    subtitle: "100以内应用题",
    animal: "小狐狸洛洛",
    animalMark: "狐",
    mission: "破解 5 个 100 以内的宝箱密码",
    scene: "小狐狸洛洛发现了森林海岛上的神秘宝箱。",
    dialog: "算出正确密码，宝箱就会打开一层锁。",
    treasure: "宝箱线索卡",
    sticker: "宝箱贴纸",
    color: "treasure",
    generator: { mode: "story100", count: 5 },
    questions: [
      { id: "l5-q1", type: "choice", prompt: "56 + 18 = ?", options: [72, 74, 76], answer: 74, hint: "56 加 10 是 66，再加 8。" },
      { id: "l5-q2", type: "choice", prompt: "91 - 37 = ?", options: [52, 54, 56], answer: 54, hint: "91 先减 30，再减 7。" },
      { id: "l5-q3", type: "choice", prompt: "38 + 47 = ?", options: [83, 85, 87], answer: 85, hint: "38 加 40 是 78，再加 7。" },
      { id: "l5-q4", type: "choice", prompt: "100 - 64 = ?", options: [34, 36, 38], answer: 36, hint: "64 到 100 还差 36。" },
      { id: "l5-q5", type: "story", prompt: "宝箱里有 63 颗糖，又放进 29 颗，现在有几颗？", options: [90, 92, 94], answer: 92, hint: "63 加 29。" }
    ]
  },
  {
    id: 6,
    title: "小侦探挑战",
    subtitle: "100以内混合挑战",
    animal: "猫头鹰老师",
    animalMark: "鹰",
    mission: "集齐 5 枚 100 以内数学侦探徽章碎片",
    scene: "猫头鹰老师带来了最后的森林挑战。",
    dialog: "把 100 以内加减、凑整、比较和规律都用上，完成最终调查。",
    treasure: "森林侦探徽章",
    sticker: "侦探徽章",
    color: "badge",
    generator: { mode: "mixed100", count: 5 },
    questions: [
      { id: "l6-q1", type: "choice", prompt: "47 + 28 = ?", options: [73, 75, 77], answer: 75, hint: "47 加 30 再减 2。" },
      { id: "l6-q2", type: "compose", prompt: "选两个数字凑成 100", target: 100, numbers: [38, 62, 44, 56, 29, 71], answer: [38, 62], hint: "38 离 100 还差 62。" },
      { id: "l6-q3", type: "compare", prompt: "86 ○ 68", left: 86, right: 68, answer: ">", hint: "86 更大。" },
      { id: "l6-q4", type: "pattern", prompt: "20、35、50、?", sequence: [20, 35, 50], options: [60, 65, 70], answer: 65, hint: "每次多 15。" },
      { id: "l6-q5", type: "story", prompt: "小侦探找到 94 个线索，用掉 27 个，还剩几个？", options: [65, 67, 69], answer: 67, hint: "94 减 27。" }
    ]
  }
];
