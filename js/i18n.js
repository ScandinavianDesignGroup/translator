/* Author: Rune Botten <rbotten@gmail.com>
Copyright (c) 2011 Scandinavian Design Group

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function(){
  var I18N = {};
  
  function translate(tag, fallback) {
    if(!I18N.translations) {
      return "Missing translations";
    }
    
    if(!I18N.locale) {
      return "Locale not set";
    }

    if(I18N.translations[I18N.locale]) {
      var translated = I18N.translations[I18N.locale][tag];
      if(translated) {
        return translated;
      } else if(fallback) {
        return fallback;
      } else {
        return "Missing translation for '" + tag + "'";
      }
    } else if(fallback){
      return fallback;
    } else {
      return "Missing translations for locale '" + I18N.locale + "'";
    }
  }
  
  function setLocale(locale) {
    I18N.locale = locale;
  }
  
  function translatePage() {
    $(":[data-translation]").each(function(index, element){
      $(element).text(translate($(element).attr('data-translation')));
    });
  }
  
  I18N['setLocale'] = setLocale;
  I18N['translate'] = translate;
  I18N['translatePage'] = translatePage;
  window['I18N'] = I18N;
})();
