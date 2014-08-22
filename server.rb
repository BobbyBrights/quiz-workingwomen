#!/usr/bin/env ruby

# thanks to jim weirich
# run ./servefiles from the root directory

require 'webrick'
include WEBrick

dir = Dir::pwd
port = 8000


s = HTTPServer.new(
  :Port            => port,
  :DocumentRoot    => dir
)

trap("INT"){ s.shutdown }
s.start