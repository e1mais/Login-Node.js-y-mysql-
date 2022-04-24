
const bcrypt = require('bcryptjs');

const helper = {}

  helper.encriptarContras = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    return hash;
  }

  helper.compararContras = async (password, saved) => {
      try {
        return await bcrypt.compare(password,saved)
      } catch (error) {
        console.error(error)
      }
  }

  module.exports = helper;