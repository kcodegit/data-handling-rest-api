/**
 * Written by Kohei 2018
 */
'use strict';

var p = console.log;

/**
 * Date class extension
 */
class DateTime extends Date {
  constructor(...args){
    // minus 1 from the int val represents the month
    if (arguments.length > 1) args[1] = args[1]-1;
    super(...args);
    // default language setting
    this.lang = LANG.en;
  }

  /*
    custom functions
  */
  /**
   * set lang
   * @param { object } lang (enum LANG)
   * @throws { TypeError }
   */
  setLang(lang){
    if(!_isLANG(lang)) throw new TypeError('Invalid Arguments. Choose from DateTime.LANG.*');
    this.lang = lang;
  }

   /**
   * returns true if it's the same time
   * checks to the milliseconds
   * @param { object } date 
   * @returns { boolean }
   * @throws { TypeError }
   */
  equals(date) {
    if(arguments.length !== 1) throw new TypeError('Invalid Arguments.');
    return !(date instanceof Date) ? false : this.getTime() === date.getTime();
  }

  /**
   * checks if the date is valid
   * @returns { boolean }
   */
  isValid(){
    return this.toDateString() !== 'Invalid Date';
  }
  
  /**
   * returns true if it's before the date given in the argument
   * if it's the same time this returns false
   * @param { Date } date 
   * @returns { boolean }
   * @throws { TypeError }
   */
  isBefore(date) {
    if (!(date instanceof Date)) throw new TypeError('Invalid Arguments. Must be a Date instance.');
    return this.getTime() - date.getTime() < 0;
  }
  
  /**
   * returns true if it's after the date given in the argument
   * if it's the same time this returns false
   * @param { Date } date 
   * @returns { boolean }
   * @throws { TypeError }
   */
  isAfter(date) {
    if (!(date instanceof Date)) throw new TypeError('Invalid Arguments. Must be a Date instance.');
    return this.getTime() - date.getTime() > 0;
  }

  /**
   * returns true if it's a past time
   * if it's a present time this returns false
   * @returns { boolean }
   * @throws { TypeError }
   */
  isPast() {
    if(arguments.length !== 0) throw new TypeError('Invalid Arguments.');
    return this.isBefore(new DateTime());
  }
  
  /**
   * returns true if it's a future time
   * if it's a present time this returns false
   * @returns { boolean }
   * @throws { TypeError }
   */
  isFuture() {
    if(arguments.length !== 0) throw new TypeError('Invalid Arguments.');
    return this.isAfter(new DateTime());
  }


  /**
   * if digits are given, it returns in the specified format
   * default is one
   * only takes 1 or 2
   * @param { number } digits_minimum
   * @returns { string }
   * @throws { TypeError } 
   */
  getSecondsString(digits_minimum = 1){
    var s = this.getSeconds();
    if(digits_minimum === 2){
      return (s < 10 ? '0' : '').concat(s.toString());
    }
    if(digits_minimum === 1 ) return s.toString();
    throw new TypeError('Invalid Arguments. Only takes 1 or 2.');
  }

  /**
   * if digits are given, it returns in the specified format
   * default is one
   * only takes 1 or 2
   * @param { number } digits_minimum
   * @returns { string }
   * @throws { TypeError } 
   */
  getMinutesString(digits_minimum = 1){
    var m = this.getMinutes();
    if(digits_minimum === 2){
      return (m < 10 ? '0' : '').concat(m.toString());
    }
    if(digits_minimum === 1 ) return m.toString();
    throw new TypeError('Invalid Arguments. Only takes 1 or 2.');
  }
  /**
   * if digits are given, it returns in the specified format
   * default is one
   * only takes 1 or 2
   * @param { number } digits_minimum
   * @returns { string }
   * @throws { TypeError } 
   */
  getHoursString(digits_minimum = 1){
    var h = this.getHours();
    if(digits_minimum === 2){
      return (h < 10 ? '0' : '').concat(h.toString());
    }
    if(digits_minimum === 1 ) return h.toString();
    throw new TypeError('Invalid Arguments. Only takes 1 or 2.');
  }

  /**
   * if digits are given, it returns in the specified format
   * default is one
   * only takes 1 or 2
   * @param { number } digits_minimum
   * @returns { string }
   * @throws { TypeError } 
   */
  getDateString(digits_minimum = 1){
    var d = this.getDate();
    if(digits_minimum === 2){
      return (d < 10 ? '0' : '').concat(d.toString());
    }
    if(digits_minimum === 1 ) return d.toString();
    throw new TypeError('Invalid Arguments. Only takes 1 or 2.');
  }

  /**
   * get the day string of target language given in the argument
   * if no target is specified, returns the default lang of the instance
   * @param { object } target_lang (enum LANG) optional
   * @returns { string }
   * @throws { TypeError }
   */
  getDayString(target_lang = this.lang) {
    if(!_isLANG(target_lang)) throw new TypeError('Invalid Arguments. Must be LANG.');
    return target_lang.weekdays[super.getDay()];
  }

  /**
   * get the month string of target language given in the argument
   * if no target is specified, returns the default lang of the instance
   * @param { object } target_lang (enum LANG) optional
   * @returns { string }
   * @throws { TypeError }
   */
  getMonthString(target_lang = this.lang) {
    if(!_isLANG(target_lang)) throw new TypeError('Invalid Arguments. Must be LANG.');
    return target_lang.months[super.getMonth()];
  }

  /*
    override
  */
  /**
   * returns an actual number representing the month
   * 1 ~ 12
   * @returns { number }
   */
  getMonth() {
    return super.getMonth()+1;
  }

  /**
   * takes an actual number representing the month and sets it
   * 1 ~ 12
   * @param { number } month_int
   * @throws { TypeError }
   */
  setMonth(month_int) {
    if(typeof month_int !== 'number') throw new TypeError('Invalid Arguments. Must be a number.')
    return super.setMonth(month_int-1);
  }

  /**
   * if any format is given, returns in it
   * else just returns the original Date.toString()
   * @param { string } format_str 
   * @returns { string }
   * @throws { TypeError }
   */
  toString(format_str){
    if(!arguments.length) return super.toString();
    if(new RegExp(/[^yMdHmsl/"'`:;,.\-\s\[\]\{\}\(\)@\~\|#]/).test(format_str)) throw new TypeError('Invalid Argument. The format is not supported.');
    return format_str.replace('yyyy', this.getFullYear())
      .replace('yy', this.getYear())
      .replace('MM', this.getMonth())
      .replace('dd', this.getDate())
      .replace('HH', this.getHoursString(2))
      .replace('mm', this.getMinutesString(2))
      .replace('ss', this.getSecondsString(2))
      .replace('lll', this.getMilliseconds().toString())
  }
}

// non-exported functions
var _isLANG = l => Object.keys(LANG).some(k => LANG[k] === l);

// enum
const LANG = Object.freeze({
  en : {
    toString: _ => 'English',
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  },
  jp : {
    toString: _ => '日本語',
    weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  }
})

module.exports = { DateTime: DateTime, LANG: LANG };