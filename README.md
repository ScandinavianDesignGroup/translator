Translator
==========

This is a simple library to aid in translating text client side.
As such, the name i18n.min.js is slightly misleading. For now.

### Single-shot translations
You need to specify the translations:

    I18N.translations = {
      'nb' : {
        'title' : 'QUnit Enhetstester',
        'heading' : 'Overskrift',
        'paragraph' : 'Avsnitt'
      },
      'en' : {
        'title' : 'QUnit Tests',
        'heading' : 'Main heading',
        'paragraph' : 'Some body of text'
      }
    };
    
Then you need to set a locale to use:

    I18N.setLocale('nb');

From there you can translate single tags:

    I18N.translate('heading') === "Overskrift"
    
    I18N.setLocale('en');
    
    I18N.translate('heading') === "Main heading"

You can also provide a fallback if the translation was not found:

    I18N.translate('nosuchtag', 'Oh well…') === "Oh well…"


### Translating whole pages

By using the attribute 'data-translation' on your HTML elements, you specify
what tag should be used to translate the text value within them:

    <h1 data-translation="heading">This is urdu</h1>
    
    I18N.setLocale('nb');
    I18N.translatePage();
    
Will manipulate your DOM to
    
    <h1 data-translation="heading">Overskift</h1>
    
See test/tests.js for usage examples.

### Development

This is an early version and will hopefully be developed further. Patches are
welcome. You will find rake tasks for compressing the code with Googles
Closure Compiler Service and running the tests

    rake minify
    rake test
    rake # will minify and then run tests

### TODO

* Provide "full" i18n capabilities, not just text translation
* Remove the (rather unnecessary) jQuery dependency
