let groupList = [];

class Group {
  constructor(name, pivots) {
    this.name = name;
    this.pivots = pivots;
  }
}

const groupInit = () => {
  const groupText = "misen";
  let groupPivots = [];
  let ballList = [];

  for (let i = 1; i < 53; i++) {
    ballList.push(i);
  }

  for (let p = 0; p < ballList.length; p = p + 4) {
    for (let p2 = p + 4; p2 < ballList.length; p2 = p2 + 4) {
      groupPivots.push(
        ballList.slice(p, p + 4).concat(ballList.slice(p2, p2 + 4))
      );
    }
  }

  for (let i = 1; i < 79; i++) {
    if (i < 10) {
      groupList.push(new Group(groupText + "0" + i, groupPivots[i - 1]));
    } else {
      groupList.push(new Group(groupText + i, groupPivots[i - 1]));
    }
  }
};

groupInit();
console.log(groupList);
