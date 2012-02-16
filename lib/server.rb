require "./lib/init"

disable :logging
set :root, File.dirname(__FILE__) + "/../"

get "/" do
  File.readlines("public/index.html")
end

get "/projects" do
  content_type "application/json"
  send_file "public/projects.json"
end

get "/favicon.ico" do
  ""
end

