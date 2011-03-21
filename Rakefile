license = <<EOS
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
EOS

require "net/http"
task :default => [:minify, :test]

task :release do
  version = ENV['VERSION']
  if version
    puts "Writing version #{version} from current state"
    Rake::Task[:minify].invoke()
    FileUtils.cp('js/i18n.min.js', 'release/i18n-' + version + '.min.js')
    `git tag "#{version}"`
  else
    puts "Specify VERSION with an env variable"
  end
end

task :minify do
  puts "Minifying JavaScript with Google Closure Compiler Service..."
  http = Net::HTTP.new("closure-compiler.appspot.com")

  request = Net::HTTP::Post.new("/compile")
  request.set_form_data({
    "js_code" => File.read('js/i18n.js'),
    'compilation_level' => 'SIMPLE_OPTIMIZATIONS',
    'output_format' => 'text',
    'output_info' => 'compiled_code'
    })
  response = http.request(request)
  
  File.open('js/i18n.min.js', 'w') do |f|
    f.puts license
    f.puts response.body
  end
end

task :test do
  puts "Running tests in browser..."
  `open test/index.html`
end
