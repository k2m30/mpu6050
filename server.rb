require 'sinatra'
require_relative 'mpu6050'

configure do
  set :mpu, MPU6050.new('/home/pi/wiringPi/wiringPi/libwiringPi.so.2.25')
end

get '/' do
  settings.mpu.measure
end
