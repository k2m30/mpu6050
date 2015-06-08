require 'fiddle'

class HCSRO4
  attr_accessor :digital_read, :digital_write, :pin_mode
  IN = 0
  OUT = 1

  LOW = 0
  HIGH = 1

  DELAY = 60 # ms

  TRIG = 17
  ECHO = 27

  def initialize(path_to_wiring_pi_so)
    wiringpi = Fiddle.dlopen(path_to_wiring_pi_so)

    int = Fiddle::TYPE_INT
    void = Fiddle::TYPE_VOID

    # extern int  wiringPiSetup       (void) ;
    @setup = Fiddle::Function.new(wiringpi['wiringPiSetup'], [void], int)

    # extern int  wiringPiSetupGpio       (void) ;
    @setup_gpio = Fiddle::Function.new(wiringpi['wiringPiSetupGpio'], [void], int)

    # extern void pinMode             (int pin, int mode) ;
    @pin_mode = Fiddle::Function.new(wiringpi['pinMode'], [int, int], void)

    # extern int  digitalRead         (int pin) ;
    @digital_read = Fiddle::Function.new(wiringpi['digitalRead'], [int], int)

    # extern void digitalWrite        (int pin, int value) ;
    @digital_write = Fiddle::Function.new(wiringpi['digitalWrite'], [int, int], void)

    result = @setup_gpio.call nil
    @pin_mode.call TRIG, OUT
    @pin_mode.call ECHO, IN
    result
  end

  def measure
    # GPIO.output(TRIG, False)                 #Set TRIG as LOW
    # print "Waitng For Sensor To Settle"
    # time.sleep(2)                            #Delay of 2 seconds
    #
    # GPIO.output(TRIG, True)                  #Set TRIG as HIGH
    # time.sleep(0.00001)                      #Delay of 0.00001 seconds
    # GPIO.output(TRIG, False)                 #Set TRIG as LOW
    #
    # while GPIO.input(ECHO)==0:               #Check whether the ECHO is LOW
    #   pulse_start = time.time()              #Saves the last known time of LOW pulse
    #
    #   while GPIO.input(ECHO)==1:               #Check whether the ECHO is HIGH
    #     pulse_end = time.time()                #Saves the last known time of HIGH pulse
    #
    #     pulse_duration = pulse_end - pulse_start #Get pulse duration to a variable
    #
    #     distance = pulse_duration * 17150        #Multiply pulse duration by 17150 to get distance
    #     distance = round(distance, 2)

    require_relative 'hcsro4'


    start = nil
    finish = nil

    # a = HCSRO4.new('/home/pi/wiringPi/wiringPi/libwiringPi.so.2.25')

    pin = 27
    File.open("/sys/class/gpio/export", "w") { |f| f.write("#{pin}") }
    File.open("/sys/class/gpio/gpio#{pin}/direction", "w") { |f| f.write("in") }

    pin = 17
    File.open("/sys/class/gpio/export", "w") { |f| f.write("#{pin}") }
    File.open("/sys/class/gpio/gpio#{pin}/direction", "w") { |f| f.write("out") }


    zero = Time.now.to_f
    pin = 17
    value = 1
    File.open("/sys/class/gpio/gpio#{pin}/value", 'w') {|f| f.write("#{value}") }

    sleep 0.01
    pin = 17
    value = 0
    File.open("/sys/class/gpio/gpio#{pin}/value", 'w') {|f| f.write("#{value}") }


    while File.read("/sys/class/gpio/gpio27/value").to_i == 0 do
      p 0
    end

    while File.read("/sys/class/gpio/gpio27/value").to_i == 1 do
      p 1
    end


    # while a.digital_read.call(27) == 0  && (start - zero) < 100000 && (start - zero) > 0 do
    #   start = Time.now.to_f
    # end
    #
    # p [a.digital_read.call(27), zero - start]
    #
    # while a.digital_read.call(27) == 1 do
    #   finish = Time.now.usec
    #   break if finish - zero > 1000
    # end
    #
    # finish - start

# @digital_write.call TRIG, HIGH
#     sleep 0.00001
#     @digital_write.call TRIG, LOW
#     start = Time.now
#     finish = nil
#
#     while @digital_read.call(ECHO) == 0 do
#       finish = Time.now
#     end

    (finish - start)/58
  end
end