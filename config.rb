class CssSplitter
 
def self.split(infile, outdir = File.dirname(infile), max_selectors = 4095)
 
raise "infile could not be found" unless File.exists? infile
 
rules = IO.readlines(infile, "}")
return if rules.first.nil?
 
charset_statement, rules[0] = rules.first.partition(/^\@charset[^;]+;/)[1,2]
return if rules.nil?
 
# The infile remains the first file
file_id = 1
selectors_count = 0
output = nil
 
rules.each do |rule|
rule_selectors_count = count_selectors_of_rule rule
selectors_count += rule_selectors_count
 
# Nothing happens until the selectors limit is reached for the first time
if selectors_count > max_selectors
# Close current file if there is already one
output.close if output
 
# Prepare next file
file_id += 1
filename = File.join(outdir, File.basename(infile, File.extname(infile)) + "_#{file_id.to_s}" + File.extname(infile))
output = File.new(filename, "w")
output.write charset_statement
 
# Reset count with current rule count
selectors_count = rule_selectors_count
end
 
output.write rule if output
end
end
 
def self.count_selectors(css_file)
raise "file could not be found" unless File.exists? css_file
 
rules = IO.readlines(css_file, '}')
return if rules.first.nil?
 
charset_statement, rules[0] = rules.first.partition(/^\@charset[^;]+;/)[1,2]
return if rules.first.nil?
 
rules.inject(0) {|count, rule| count + count_selectors_of_rule(rule)}.tap do |result|
puts File.basename(css_file) + " contains #{result} selectors."
end
end
 
def self.count_selectors_of_rule(rule)
rule.partition(/\{/).first.scan(/,/).count.to_i + 1
end
end



#require 'compass-notify'
puts "default project_path (working directory) is: #{Dir.pwd}"

sass_dir = "src/styles"

output_sass_path = sass_dir.empty? ? sass_path : "#{Dir.pwd}/#{sass_dir}"
puts "full sass path should be #{output_sass_path}"

css_dir = ""

css_path = "dist/assets/css"
#example of how to target a directory that isn't a direct child of the working directory
#css_dir is ignored if css_path is used
#css_path = "css/css_subdir"

output_css_path = css_dir.empty? ? css_path : Dir.pwd/css_dir
puts "full css path should be #{output_css_path}"

images_dir = "images"

output_images_path = images_dir.empty? ? images_path : "#{Dir.pwd}/#{images_dir}"
puts "output_images_path should be #{output_images_path}"

generated_images_path = "#{Dir.pwd}/../../../cvaccplusstorefront/web/webroot/_ui/desktop/theme-black/images"
puts "generated_images_path should be #{generated_images_path}"

http_generated_images_path = "/cvaccplusstorefront/_ui/desktop/theme-black/images"
puts "http_generated_images_path should be #{http_generated_images_path}"

relative_assets = true

javascripts_dir = ""

output_javascripts_path = javascripts_dir.empty? ? javascripts_path : "#{Dir.pwd}/#{javascripts_dir}"
puts "full javascripts path should be #{output_javascripts_path}"

output_style = (environment == :production) ? :compressed : :nested
output_style = (environment == :production) ? :compressed : :expanded
# if environment != :production
#     enable_sourcemaps = true
#     sass_options = {:sourcemap => true, :debug_info => true}
# end

on_stylesheet_saved do |path|
CssSplitter.split(path) unless path[/\d+$/]
end