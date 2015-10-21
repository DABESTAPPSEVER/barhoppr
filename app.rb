require 'sinatra'

# [
# 	'models/classes',
# 	'helpers/methods'
# ].each{|rb|
# 	require_relative rb+'.rb'
# }

get '/' do 
	erb :index
end

get '/bar' do 
	return 'Coords: '+params[:lat]+', '+params[:lng]
end