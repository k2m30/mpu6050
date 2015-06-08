require 'fiddle'

class HCSRO4
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

    # extern void pinMode             (int pin, int mode) ;
    @pin_mode = Fiddle::Function.new(wiringpi['pinMode'], [int, int], void)

    # extern int  digitalRead         (int pin) ;
    @digital_read = Fiddle::Function.new(wiringpi['digitalRead'], [int], int)

    # extern void digitalWrite        (int pin, int value) ;
    @digital_write = Fiddle::Function.new(wiringpi['digitalWrite'], [int, int], void)

    @setup.call
    @pin_mode.call TRIG, OUT
    @pin_mode.call ECHO, IN
  end

  def measure
    # @digital_write.call TRIG, LOW
    # sleep DELAY

    @digital_write.call TRIG, HIGH
    sleep 0.00001
    @digital_write.call TRIG, LOW
    start = Time.now
    finish = nil

    while @digital_read.call(ECHO) == 0 do
      finish = Time.now
    end

    (finish - start)/58
  end
end

hc = HCSRO4.new('/home/pi/wiringPi/wiringPi/libwiringPi.so.2.25')

sleep 2

p hc.measure