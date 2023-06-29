const ResponseUtil = {
  generate: (code, message, data) => {
    return {
      code,
      message,
      data
    }
  },
  generateSuccess: (data, msg) => {
    return {
      code: '0',
      message: msg ? msg : '成功',
      data: data
    }
  },
  generateError: (data, msg) => {
    return {
      code: '-1',
      message: msg ? msg : '失败',
      data: data
    }
  }
}

module.exports = ResponseUtil