const bcrypt = require("bcrypt");
const { Group, Game, Draw, Round, Play, Bet, User } = require("./models");

const getGame = (gameID) => {
  return Game.findById(gameID)
    .then((game) => {
      return {
        ...game._doc,
        id: game.id,
        gamePlays: getPlays.bind(this, game.gamePlays),
        gameRounds: getRound.bind(this, game.gameRounds),
        gameBets: getBets.bind(this, game.gameBets),
        gameDraw: getDraw.bind(this, game.gameDraw),
      };
    })
    .catch((err) => {
      throw err;
    });
};

const getGroups = (groupIDs) => {
  return Group.findById({ _id: { $in: groupIDs } })
    .then((groups) => {
      return groups.map((group) => {
        return {
          ...group._doc,
          id: group.id,
          groupPlays: getPlays.bind(this, group.groupPlays),
        };
      });
    })
    .catch((err) => {
      throw err;
    });
};

const getDraw = (drawID) => {
  return Draw.findById(drawID)
    .then((draw) => {
      return {
        ...draw._doc,
        id: draw.id,
        drawGame: getGame.bind(this, draw.drawGame),
      };
    })
    .catch((err) => {
      throw err;
    });
};

const getPlays = (playIDs) => {
  return Play.findById({ _id: { $in: playIDs } })
    .then((plays) => {
      return plays.map((play) => {
        return {
          ...play._doc,
          id: play.id,
          playGame: getGame.bind(this, play.playGame),
          playRound: getRound.bind(this, play.playRound),
          playGroup: getGroup.bind(this, play.playGroup),
        };
      });
    })
    .catch((err) => {
      throw err;
    });
};

const getBets = (betIDs) => {
  return Bet.findById({ _id: { $in: betIDs } })
    .then((bets) => {
      return bets.map((bet) => {
        return {
          ...bet._doc,
          id: bet.id,
          betGame: getGame.bind(this, bet.betGame),
          betRound: getRound.bind(this, bet.betRound),
          betGroup: getGroup.bind(this, bet.betGroup),
        };
      });
    })
    .catch((err) => {
      throw err;
    });
};

const getRound = (roundIDs) => {
  return Round.findById({ _id: { $in: roundIDs } })
    .then((rounds) => {
      return rounds.map((round) => {
        return {
          ...round._doc,
          id: round.id,
          roundGame: getGame.bind(this, round.roundGame),
        };
      });
    })
    .catch((err) => {
      throw err;
    });
};

const root = {
  groups: () => {
    return Group.find()
      .then((groups) => {
        return groups.map((group) => {
          return {
            ...group._doc,
            id: group.id,
            groupPlays: getPlays.bind(this, group.groupPlays),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  games: () => {
    console.log("games");
    return Game.find()
      .then((games) => {
        return games.map((game) => {
          console.log(game.id);
          return {
            ...game._doc,
            id: game.id,
            gameDraw: getDraw.bind(this, game.gameDraw),
            gameRounds: getRound.bind(this, game.gameRounds),
            gamePlays: getPlays.bind(this, game.gamePlays),
            gameBets: getBets.bind(this, game.gameBets),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  draws: () => {
    console.log("draws");
    return Draw.find()
      .then((draws) => {
        return draws.map((draw) => {
          return {
            ...draw._doc,
            id: draw.id,
            drawGame: getGame.bind(this, draw.drawGame),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  bets: () => {
    return Bet.find()
      .then((bets) => {
        return bets.map((bet) => {
          return {
            ...bet._doc,
            id: bet.id,
            betGame: getGame.bind(this, bet.betGame),
            betGroup: getGroup.bind(this, bet.betGroup),
            betRound: getRound.bind(this, bet.betRound),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  plays: () => {
    return Play.find()
      .then((plays) => {
        return plays.map((play) => {
          return {
            ...play._doc,
            id: draw.id,
            playGame: getGame.bind(this, play.playGame),
            playGroup: getGroup.bind(this, play.playGroup),
            playRound: getRound.bind(this, play.playRound),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  createUser: (args) => {
    //TODO: add bcrypt to hash password before saving to database
    const user = new User({
      userName: args.userInput.userName,
      userEmail: args.userInput.userEmail,
      userPassword: args.userInput.userPassword,
    });
    return user
      .save()
      .then((result) => {
        return { ...result._doc, id: result._doc._id.toString() };
      })
      .catch((err) => {
        throw err;
      });
  },

  createGame: (args) => {
    const game = new Game({
      gameNumber: args.gameInput.gameNumber,
      gameComplete: args.gameInput.gameComplete,
      gameDraw: null,
    });
    return game
      .save()
      .then((result) => {
        return { ...result._doc, id: result._doc._id.toString() };
      })
      .catch((err) => {
        throw err;
      });
  },

  createRound: (args) => {
    //TODO: Calculate number of rounds based on previous games
    //TODO: Calculate ranks based on previous draw results
    const round = new Round({
      roundNumber: args.roundInput.roundNumber,
      roundRanks: args.roundInput.roundRanks,
      roundGame: args.roundInput.roundGame,
    });
    return round
      .save()
      .then((result) => {
        return { ...result._doc, id: result._doc._id.toString() };
      })
      .catch((err) => {
        throw err;
      });
  },

  createGroup: (args) => {
    const group = new Group({
      groupName: args.groupInput.groupName,
      groupNodes: args.groupInput.groupNodes,
    });
    return group
      .save()
      .then((result) => {
        return { ...result._doc, id: result._doc._id.toString() };
      })
      .catch((err) => {
        throw err;
      });
  },

  createPlay: (args) => {
    const play = new Play({
      playNumber: args.playInput.playNumber,
    });
    return play
      .save()
      .then((result) => {
        return { ...result._doc, id: result._doc._id.toString() };
      })
      .catch((err) => {
        throw err;
      });
  },

  createBet: (args) => {
    const bet = new Bet({
      drawDate: args.betInput.drawDate,
      betTicketd: args.betInput.betTickets,
      betCost: args.betInput.betCost,
    });
    return bet
      .save()
      .then((result) => {
        return { ...result._doc, id: result._doc._id.toString() };
      })
      .catch((err) => {
        throw err;
      });
  },

  createDraw: (args) => {
    const draw = new Draw({
      drawNumber: args.drawInput.drawNumber,
      drawDate: args.drawInput.drawDate,
      drawResults: args.drawInput.drawResults,
      drawGame: args.drawInput.drawGame,
    });
    let savedDraw;
    return draw
      .save()
      .then((result) => {
        savedDraw = { ...result._doc, id: result._doc._id.toString() };
        return Game.findByIdAndUpdate(args.drawInput.drawGame, {
          gameDraw: savedDraw.id,
        });
      })
      .then((result) => {
        return savedDraw;
      })
      .catch((err) => {
        throw err;
      });
  },
};

module.exports = { root };
