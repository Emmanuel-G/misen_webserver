const { Group, Game } = require("./models");

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
          return { ...game._doc, id: game.id };
        });
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

  createGroup: (args) => {
    const group = new Group({
      groupName: args.groupInput.groupName,
      groupNodes: args.groupInput.groupNodes,
      groupActive: args.groupInput.groupActive,
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
};

module.exports = { root };
