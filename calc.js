const getStockOptionsArray = () => {
  return {
    front3: 1120,
    middle6: 3020,
    back9: 5120,
  };
};

const getUserStockOptions = () => {
  // get user stock options
  return 2880;
};

const calcPercentBest = (userStockOptions, golfCourse) => {
  const stockOptions = getStockOptionsArray();
  return Math.abs(1 - userStockOptions / stockOptions[golfCourse]);
};

const getNextBest = (uso) => {
  // uso = userStockOptions
  const c = calcPercentBest;
  const obj = {
    front3: c(uso, "front3"),
    middle6: c(uso, "middle6"),
    back9: c(uso, "back9"),
  };
  const values = Object.values(obj);
  const lowest = Math.min.apply(null, values);

  const keys = Object.keys(obj);
  const indexOfLowest = values.findIndex((v) => {
    return v === lowest;
  });

  return keys[indexOfLowest];
};

const minCourses = (stockOptions, userStockOptions, bestOption) => {
  // prioritize back 9s
  while (userStockOptions >= stockOptions["back9"]) {
    bestOption.push(9);
    userStockOptions -= stockOptions["back9"];
  }

  // choose the next best course
  while (userStockOptions > 0) {
    const nextBest = getNextBest(userStockOptions);
    const courseNum = nextBest[nextBest.length - 1];
    bestOption.push(parseInt(courseNum));
    userStockOptions -= stockOptions[nextBest];
  }
};

const getResult = (bestOption) => {
  const counts = {};
  for (const val of bestOption) {
    counts[val] = counts[val] ? counts[val] + 1 : 1;
  }
  return counts;
};

const update = (result) => {
  const element = document.getElementById("output");
  element.innerText = result;
};

const bossbot = () => {
  const stockOptions = getStockOptionsArray();
  const userStockOptions = document.getElementById("stockOptions").value;
  console.log(userStockOptions);
  const bestOption = [];
  minCourses(stockOptions, userStockOptions, bestOption);
  const result = getResult(bestOption);
  update(result);
};
