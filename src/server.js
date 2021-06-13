class MisenServer {
  constructor({ express }) {
    this.misen = express();
  }

  init() {
    this.misen.listen(5500, () => {
      console.log("server started");
    });
  }
}

module.exports = { MisenServer };
