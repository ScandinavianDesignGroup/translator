
// documentation on writing tests here: http://docs.jquery.com/QUnit
// example tests: https://github.com/jquery/qunit/blob/master/test/same.js

// below are some general tests but feel free to delete them.

module('Env');
test('Environment is good',function(){
  ok( !!window.I18N, 'I18N not present');
});

module('General');
test('It needs a locale', function(){
  I18N.translations = {};
  equals(I18N.translate('tag'), "Locale not set", "Did not complain about missing translations");
});
test('It needs translations', function(){
  delete(I18N.translations);
  equals(I18N.translate('tag'), "Missing translations", "Did not complain about missing translations");
});

module('Single-Shot translation of text');
test('It translates a single tag', function(){
  expect(2);
  I18N.translations = {
    'nb' : {
      'test' : 'Dette er en test'
    },
    'en' : {
      'test' : 'This is a test'
    }
  };
  
  I18N.setLocale('nb');
  equals(I18N.translate('test'), 'Dette er en test', 'Did not translate text');
  I18N.setLocale('en');
  equals(I18N.translate('test'), 'This is a test', 'Did not translate text');
});

test('It complains when tag not found', function(){
  I18N.translations = {
    'nb' : {
      'test' : 'Dette er en test'
    }
  };
  
  I18N.setLocale('nb');
  equals(I18N.translate('notfound'), "Missing translation for 'notfound'", 'Did not complain about missing translations');
});

test('It complains when locale not found', function(){
  I18N.translations = {
    'nb' : {
      'test' : 'Dette er en test'
    }
  };
  
  I18N.setLocale('en');
  equals(I18N.translate('notfound'), "Missing translations for locale 'en'", 'Did not complain about missing translations');
});

test('You can provide a default fallback for missing translations', function(){
  expect(2);
  I18N.translations = {};
  
  I18N.setLocale('zeta');
  equals(I18N.translate('localenotfound', 'Fallback to this'), "Fallback to this", 'Did not return fallback translation');
  
  I18N.translations = {
    'nb' : {
      'test' : 'Dette er en test'
    }
  };
  
  I18N.setLocale('nb');
  equals(I18N.translate('tagnotfound', 'Fallback to this'), "Fallback to this", 'Did not return fallback translation');
});

module('Translation of whole document');
test('You can translate the whole page in one swoop', function(){
    expect(3);
    
    I18N.translations = {
      'nb' : {
        'title' : 'QUnit Enhetstester',
        'heading' : 'Overskrift',
        'paragraph' : 'Avsnitt'
      }
    };
    
    I18N.setLocale('nb');
    I18N.translatePage();
    equals($('#heading').text(), 'Overskrift', 'Did not translate h1');
    equals($('#paragraph').text(), 'Avsnitt', 'Did not translate p');
    equals(document.title, 'QUnit Enhetstester', 'Did not change page title');
});
