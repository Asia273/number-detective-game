export const levels = [
  {
    id: 1,
    title: "小兔的胡萝卜",
    subtitle: "10以内加减",
    animal: "小兔米米",
    animalMark: "兔",
    mission: "找回 5 根被风吹走的胡萝卜",
    scene: "小兔米米的胡萝卜散落在森林小路上。",
    dialog: "每答对一道题，就能找回一根胡萝卜。",
    treasure: "胡萝卜线索卡",
    sticker: "胡萝卜贴纸",
    color: "carrot",
    generator: { mode: "addSub10", count: 5 },
    questions: [
      { id: "l1-q1", type: "choice", prompt: "3 + 2 = ?", options: [4, 5, 6], answer: 5, hint: "可以从 3 往后数 2 个。" },
      { id: "l1-q2", type: "choice", prompt: "8 - 3 = ?", options: [4, 5, 6], answer: 5, hint: "先想 8 个，拿走 3 个，还剩几个？" },
      { id: "l1-q3", type: "story", prompt: "小兔有 6 根胡萝卜，又找到 2 根，现在有几根？", options: [7, 8, 9], answer: 8, hint: "把 6 和 2 合在一起。" },
      { id: "l1-q4", type: "choice", prompt: "9 - 4 = ?", options: [3, 5, 6], answer: 5, hint: "可以倒着数 4 步。" },
      { id: "l1-q5", type: "choice", prompt: "1 + 7 = ?", options: [6, 8, 9], answer: 8, hint: "1 再加 7，就是 8。" }
    ]
  },
  {
    id: 2,
    title: "小熊的蜂蜜罐",
    subtitle: "凑10训练",
    animal: "小熊布布",
    animalMark: "熊",
    mission: "把 5 个蜂蜜罐装到正好 10 格",
    scene: "小熊布布正在准备森林下午茶。",
    dialog: "找到能凑成 10 的数字朋友，蜂蜜罐就会亮起来。",
    treasure: "蜂蜜线索卡",
    sticker: "蜂蜜贴纸",
    color: "honey",
    generator: { mode: "compose10", count: 5 },
    questions: [
      { id: "l2-q1", type: "compose", prompt: "选两个数字凑成 10", target: 10, numbers: [1, 3, 4, 6, 7, 9], answer: [1, 9], hint: "想一想，1 离 10 还差几？" },
      { id: "l2-q2", type: "compose", prompt: "选两个数字凑成 10", target: 10, numbers: [2, 5, 8, 9, 1, 4], answer: [2, 8], hint: "2 和 8 是好朋友。" },
      { id: "l2-q3", type: "compose", prompt: "选两个数字凑成 10", target: 10, numbers: [3, 6, 7, 8, 2, 1], answer: [3, 7], hint: "3 离 10 还差 7。" },
      { id: "l2-q4", type: "compose", prompt: "选两个数字凑成 10", target: 10, numbers: [4, 6, 2, 9, 5, 1], answer: [4, 6], hint: "4 加 6 正好是 10。" },
      { id: "l2-q5", type: "choice", prompt: "5 + ? = 10", options: [3, 4, 5], answer: 5, hint: "两个 5 可以凑成 10。" }
    ]
  },
  {
    id: 3,
    title: "数字桥",
    subtitle: "比较大小",
    animal: "小鹿斑斑",
    animalMark: "鹿",
    mission: "修好 5 块符号桥板",
    scene: "小鹿斑斑要过桥，但桥中间缺少比较符号。",
    dialog: "选出正确的符号，桥板就会稳稳接上。",
    treasure: "小桥线索卡",
    sticker: "小桥贴纸",
    color: "bridge",
    generator: { mode: "compare", count: 5 },
    questions: [
      { id: "l3-q1", type: "compare", prompt: "7 ○ 9", left: 7, right: 9, answer: "<", hint: "9 比 7 大。" },
      { id: "l3-q2", type: "compare", prompt: "10 ○ 6", left: 10, right: 6, answer: ">", hint: "10 比 6 大。" },
      { id: "l3-q3", type: "compare", prompt: "8 ○ 8", left: 8, right: 8, answer: "=", hint: "两边一样多。" },
      { id: "l3-q4", type: "compare", prompt: "12 ○ 15", left: 12, right: 15, answer: "<", hint: "15 更大。" },
      { id: "l3-q5", type: "compare", prompt: "18 ○ 13", left: 18, right: 13, answer: ">", hint: "18 更大。" }
    ]
  },
  {
    id: 4,
    title: "火车车厢",
    subtitle: "找规律",
    animal: "小松鼠可可",
    animalMark: "松",
    mission: "补齐 5 节数字车厢",
    scene: "森林小火车马上出发，车厢顺序还没排好。",
    dialog: "看清数字规律，帮火车顺利开动。",
    treasure: "火车线索卡",
    sticker: "火车贴纸",
    color: "train",
    generator: { mode: "pattern", count: 5 },
    questions: [
      { id: "l4-q1", type: "pattern", prompt: "2、4、6、?", sequence: [2, 4, 6], options: [7, 8, 9], answer: 8, hint: "每次多 2。" },
      { id: "l4-q2", type: "pattern", prompt: "1、3、5、?", sequence: [1, 3, 5], options: [6, 7, 8], answer: 7, hint: "这是单数队伍。" },
      { id: "l4-q3", type: "pattern", prompt: "5、10、15、?", sequence: [5, 10, 15], options: [18, 20, 25], answer: 20, hint: "每次多 5。" },
      { id: "l4-q4", type: "pattern", prompt: "9、8、7、?", sequence: [9, 8, 7], options: [5, 6, 10], answer: 6, hint: "每次少 1。" },
      { id: "l4-q5", type: "pattern", prompt: "3、6、9、?", sequence: [3, 6, 9], options: [11, 12, 13], answer: 12, hint: "每次多 3。" }
    ]
  },
  {
    id: 5,
    title: "海岛宝箱",
    subtitle: "20以内加减",
    animal: "小狐狸洛洛",
    animalMark: "狐",
    mission: "破解 5 个宝箱密码",
    scene: "小狐狸洛洛发现了森林海岛上的神秘宝箱。",
    dialog: "算出正确密码，宝箱就会打开一层锁。",
    treasure: "宝箱线索卡",
    sticker: "宝箱贴纸",
    color: "treasure",
    generator: { mode: "addSub20", count: 5 },
    questions: [
      { id: "l5-q1", type: "choice", prompt: "12 + 3 = ?", options: [14, 15, 16], answer: 15, hint: "12 往后数 3 个。" },
      { id: "l5-q2", type: "choice", prompt: "16 - 5 = ?", options: [10, 11, 12], answer: 11, hint: "16 减去 5。" },
      { id: "l5-q3", type: "choice", prompt: "9 + 6 = ?", options: [14, 15, 16], answer: 15, hint: "可以先把 9 凑成 10。" },
      { id: "l5-q4", type: "choice", prompt: "18 - 9 = ?", options: [7, 8, 9], answer: 9, hint: "18 的一半是 9。" },
      { id: "l5-q5", type: "story", prompt: "宝箱里有 13 颗糖，又放进 4 颗，现在有几颗？", options: [16, 17, 18], answer: 17, hint: "13 加 4。" }
    ]
  },
  {
    id: 6,
    title: "小侦探挑战",
    subtitle: "混合挑战",
    animal: "猫头鹰老师",
    animalMark: "鹰",
    mission: "集齐 5 枚森林侦探徽章碎片",
    scene: "猫头鹰老师带来了最后的森林挑战。",
    dialog: "把前面学过的本领都用上，完成最终调查。",
    treasure: "森林侦探徽章",
    sticker: "侦探徽章",
    color: "badge",
    generator: { mode: "mixed", count: 5 },
    questions: [
      { id: "l6-q1", type: "choice", prompt: "7 + 8 = ?", options: [14, 15, 16], answer: 15, hint: "7 可以先和 3 凑 10。" },
      { id: "l6-q2", type: "compose", prompt: "选两个数字凑成 20", target: 20, numbers: [8, 12, 6, 9, 11, 3], answer: [8, 12], hint: "8 离 20 还差 12。" },
      { id: "l6-q3", type: "compare", prompt: "14 ○ 11", left: 14, right: 11, answer: ">", hint: "14 更大。" },
      { id: "l6-q4", type: "pattern", prompt: "4、8、12、?", sequence: [4, 8, 12], options: [14, 16, 18], answer: 16, hint: "每次多 4。" },
      { id: "l6-q5", type: "story", prompt: "小侦探找到 15 个线索，用掉 6 个，还剩几个？", options: [8, 9, 10], answer: 9, hint: "15 减 6。" }
    ]
  }
];
