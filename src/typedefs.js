const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Group {
        id: ID!
        groupName: String!
        groupNodes: [Int!]!
        groupPlays: [Play]
    }

    type Bet {
        id: ID!
        drawDate: String!
        betGame: Game!
        betRound: Round!
        betGroup: Group!
        betTickets: [Int!]!
        betCost: Float
    }

    type Game {
        id: ID!
        gameNumber: Int!
        gamePlays: [Play]
        gameRounds: [Round]
        gameBets: [Bet]
        gameDraw: Draw!
        gameComplete: Boolean!
    }

    type Draw {
        id: ID!
        drawNumber: Int!
        drawDate: String!
        drawResults: [Int!]!
        drawGame: Game!
    }

    type Play {
        id: ID!
        playNumber: Int!
        playGame: Game!
        playRound: Round!
        playGroup: Group!
        playNumbers: [Int]!
        playResults: [Int]
    }

    type Round {
        id: ID!
        roundNumber: Int!
        roundGame: Game!
        roundRanks: [Int!]!
    }

    type User {
        id: ID!
        userName: String!
        userEmail: String!
        userPassword: String!
    }

    input UserInput {
        userName: String!
        userEmail: String!
        userPassword: String!
    }

    input GameInput {
        gameNumber: Int!
        gameComplete: Boolean!
        gameDraw: String
    }

    input RoundInput {
        roundNumber: Int!
        roundRanks: [Int!]!
    }

    input PlayInput {
        playNumber: Int!
    }

    input DrawInput {
        drawNumber: Int!
        drawDate: String!
        drawResults: [Int!]!
        drawGame: String!
    }

    input BetInput {
        betNumber: Int!
    }

    input GroupInput {
        groupName: String!
        groupNodes: [Int!]!
    }

    type RootQuery {
        groups: [Group!]!
        users: [User!]!
        draws: [Draw!]!
        games: [Game!]!
        rounds: [Round!]!
        plays: [Play!]!
        bets: [Bet!]!
    }

    type RootMutation {
        createGroup(groupInput: GroupInput): Group
        createUser(userInput: UserInput): User
        createGame(gameInput: GameInput): Game
        createRound(roundInput: RoundInput): Round
        createPlay(playInput: PlayInput): Play
        createDraw(drawInput: DrawInput): Draw
        createBet(betInput: BetInput): Bet
    }

    schema {
        query: RootQuery,
        mutation: RootMutation
    }
`);

module.exports = { schema };
