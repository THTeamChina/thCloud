/**
 * Created by jiachenpan on 16/11/18.
 */
const phoneRegex = /^1[3456789]\d{9}$/
const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/

export function idcardValid(code) {
  var city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外 ' }
  var pass = true
  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    console.log('身份证号格式错误')
    pass = false
  } else if (!city[code.substr(0, 2)]) {
    console.log('地址编码错误')
    pass = false
  } else {
    if (code.length === 18) {
      code = code.split('')
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
      var sum = 0
      var ai = 0
      var wi = 0
      for (var i = 0; i < 17; i++) {
        ai = code[i]
        wi = factor[i]
        sum += ai * wi
      }
      var last = parity[sum % 11]
      if (last !== parseInt(code[17])) {
        pass = false
      }
    }
  }
  pass = true
  return pass
}

export function isvalidMemberNo(str) {
  return /^[Mm][0-9]{6,9}$/.test(str.trim())
}

export function isvalidUserNo(str) {
  return /^[Uu][0-9]{6,9}$/.test(str.trim())
}

export function isvalidPhone(str) {
  return phoneRegex.test(str.trim())
}

export function isvalidUsername(str) {
  var result = /^[A-Za-z0-9]+$/.test(str.trim())
  return result
}

/* 合法uri*/
export function validateURL(textval) {
  return urlRegex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

export function validatUserName(rule, value, callback) {
  if (!value && !rule.required) {
    callback()
  } else if (!value && rule.required) {
    callback(new Error('登陆账号不能为空'))
  } else if (!isvalidUsername(value) || (value && value.length < 5)) {
    callback(new Error('登陆账号应为英文字符与数字组合,且长度要大于5位'))
  } else {
    callback()
  }
}

export function validatPassword(rule, value, callback) {
  if (!value && !rule.required) {
    callback()
  } else if (!value && rule.required) {
    callback(new Error('登陆密码不能为空'))
  } else if (value.length < 6) {
    callback(new Error('登陆密码长度应不小于6位'))
  } else {
    callback()
  }
}
export function validatOldPassword(rule, value, callback) {
  if (!value && !rule.required) {
    callback()
  } else if (!value && rule.required) {
    callback(new Error('不能为空'))
  } else if (value.length < 6) {
    callback(new Error('长度应不小于6位'))
  } else {
    callback()
  }
}

export function validatPhone(rule, value, callback) {
  if (!value && !rule.required) {
    callback()
  } else if (!value && rule.required) {
    callback(new Error('手机号码不能为空'))
  } else if (!isvalidPhone(value)) {
    callback(new Error('手机号码格式不正确'))
  } else {
    callback()
  }
}

export function validatMemberNo(rule, value, callback) {
  if (!value && !rule.required) {
    callback()
  } else if (!value && rule.required) {
    callback(new Error('编号不能为空'))
  } else if (!isvalidMemberNo(value)) {
    callback(new Error('编号不正确'))
  } else {
    callback()
  }
}

export function validatUserNo(rule, value, callback) {
  if (!value && !rule.required) {
    callback()
  } else if (!value && rule.required) {
    callback(new Error('编号不能为空'))
  } else if (!isvalidUserNo(value)) {
    callback(new Error('编号不正确'))
  } else {
    callback()
  }
}

export function validatIDCard(rule, value, callback) {
  if (!value && !rule.required) {
    callback()
  } else if (!value && rule.required) {
    callback(new Error('身份证号不能为空'))
  } else if (!idcardValid(value)) {
    callback(new Error('非法身份证号'))
  } else {
    callback()
  }
}

export function validatMemberOrUserNo(rule, value, callback) {
  if (!value && !rule.required) {
    callback()
  } else if (!value && rule.required) {
    callback(new Error('编号不能为空'))
  } else if (!isvalidUserNo(value) && !isvalidMemberNo(value)) {
    callback(new Error('编号不正确'))
  } else {
    callback()
  }
}
