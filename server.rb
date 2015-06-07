require 'sinatra'
require_relative 'mpu6050'

configure do
  set :mpu, MPU6050.new('/home/pi/wiringPi/wiringPi/libwiringPi.so.2.25')
end

get '/' do
  response['Access-Control-Allow-Origin'] = '*'
  settings.mpu.measure.to_s
end
