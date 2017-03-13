module.exports = class Utils {
  static toFirstLetterUpperCase(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
