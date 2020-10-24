#include <CAN.h>

// Most cars support 11-bit adddress, others (like Honda),
// require 29-bit (extended) addressing, set the next line
// to true to use extended addressing
const bool useStandardAddressing = true;
void RPM()
{  if (useStandardAddressing) {
    CAN.beginPacket(0x7df, 8);
  } else {
    CAN.beginExtendedPacket(0x18db33f1, 8);
  }
  CAN.write(0x02); // number of additional bytes
  CAN.write(0x01); // show current data
  CAN.write(0x0c); // engine RPM
  CAN.endPacket();

  // wait for response
  while (CAN.parsePacket() == 0 ||
         CAN.read() < 3 ||          // correct length
         CAN.read() != 0x41 ||      // correct mode
         CAN.read() != 0x0c);       // correct PID

  float rpm = ((CAN.read() * 256.0) + CAN.read()) / 4.0;

  Serial.print("Engine RPM = ");
  Serial.print(rpm);
  Serial.print("%t rpm");

  delay(1000);
  }
 
  void vehicleSpeed(){
      if (useStandardAddressing) {
    CAN.beginPacket(0x7df, 8);
  } else {
    CAN.beginExtendedPacket(0x18db33f1, 8);
  }
  CAN.write(0x02); // number of additional bytes
  CAN.write(0x01); // show current data
  CAN.write(0x0d); // vehciule speed
  CAN.endPacket();

  // wait for response
  while (CAN.parsePacket() == 0 ||
         CAN.read() < 3 ||          // correct length
         CAN.read() != 0x41 ||      // correct mode
         CAN.read() != 0x0d);       // correct PID

  float VH = CAN.read();

  Serial.print("vehicle speed = ");
  Serial.print(VH);
  Serial.println("%t km/h");

  delay(1000);
    }

   
  void run_time_since_engine_start()
  {
   if (useStandardAddressing) {
    CAN.beginPacket(0x7df, 8);
  } else {
    CAN.beginExtendedPacket(0x18db33f1, 8);
  }
  CAN.write(0x02); // number of additional bytes
  CAN.write(0x01); // show current data
  CAN.write(0x1f); // run time since engine start
  CAN.endPacket();

  // wait for response
  while (CAN.parsePacket() == 0 ||
         CAN.read() < 3 ||          // correct length
         CAN.read() != 0x41 ||      // correct mode
         CAN.read() != 0x1f);       // correct PID

  float rn = (CAN.read() * 256.0) + CAN.read() ;

  Serial.print("Run time since engine start = ");
  Serial.print(rn);
  Serial.print("%t seconds");

  delay(1000);
  }

  void relative_accelerator_pedal_position()
  {
          if (useStandardAddressing) {
    CAN.beginPacket(0x7df, 8);
  } else {
    CAN.beginExtendedPacket(0x18db33f1, 8);
  }
  CAN.write(0x02); // number of additional bytes
  CAN.write(0x01); // show current data
  CAN.write(0x5a); // Relative accelerator pedal position  
  CAN.endPacket();

  // wait for response
  while (CAN.parsePacket() == 0 ||
         CAN.read() < 3 ||          // correct length
         CAN.read() != 0x41 ||      // correct mode
         CAN.read() != 0x5a);       // correct PID

  float ra = CAN.read()/2.55;

  Serial.print("Relative accelerator pedal position=");
  Serial.print(ra);
  Serial.print("%t %" );
  delay(1000);
   }
   
   
 
void setup() {
  Serial.begin(9600);

  Serial.println("CAN OBD-II ");

  // start the CAN bus at 500 kbps
  if (!CAN.begin(500E3)) {
    Serial.println("Starting CAN failed!");
    while (1);
  }

  // add filter to only receive the CAN bus ID's we care about
  if (useStandardAddressing) {
    CAN.filter(0x7e8);
  } else {
    CAN.filterExtended(0x18daf110);
  }
}

void loop() {

 RPM();
 vehicleSpeed();
 run_time_since_engine_start();
 relative_accelerator_pedal_position();

}
