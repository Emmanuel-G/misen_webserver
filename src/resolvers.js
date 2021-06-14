const bcrypt = require("bcrypt");
const { Group, Game, Draw, Round, Play, Bet, User } = require("./models");

const getGame = (gameID) => {
  return Game.findById(gameID)
    .then((game) => {
      return { ...game._doc, id: game.id };
    })
    .catch((err) => {
      throw err;
    });
};

const getGroup = (groupID) => {
  return Group.findById(groupID)
    .then((group) => {
      return { ...group._doc, id: group.id };
    })
    .catch((err) => {
      throw err;
    });
};

const getDraw = (drawID) => {
  return Draw.findById(gameID)
    .then((draw) => {
      return { ...draw._doc, id: draw.id };
    })
    .catch((err) => {
      throw err;
    });
};

const getRound = (roundIDs) => {
  return Round.findById({ _id: { $in: roundIDs } })
    .the((rounds) => {
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
          return { ...group._doc, id: group.id };
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  games: () => {
    return Game.find()
      .then((games) => {
        return games.map((game) => {
          return {
            ...game._doc,
            id: game.id,
            gameDraw: getDraw.bind(this, game.gameDraw),
            gameRounds: getRound.bind(this, game.gameRounds),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  draws: () => {
    return Draw.find()
      .then((draws) => {
        return draws.map((draw) => {
          return { ...draw._doc, id: draw.id };
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
    });
    return draw
      .save()
      .then((result) => {
        return { ...result._doc, id: result._doc._id.toString() };
      })
      .catch((err) => {
        throw err;
      });
  },
};

module.exports = { root };
