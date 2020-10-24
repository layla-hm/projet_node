#include <SoftwareSerial.h>
SoftwareSerial gprsSerial(2,3);
 
#include <String.h>

 
#define DHTPIN A0
 
 
void setup()
{
  gprsSerial.begin(9600);               // the GPRS baud rate   
  Serial.begin(9600);    // the GPRS baud rate 
  Serial.println("Starting Arduino.");
  delay(1000);
}
 
void loop()
{
      int refBoitier = 101;    
      int RPM = 2462;     
      int KM = 106;        
      int Speed = 52;      
      int ABS = 17;       
      int Knock = 2;     
    
      
      delay(100);   

      Serial.print("ID Carte = ");
      Serial.println(refBoitier);
      
      Serial.print("Vitesse = ");
      Serial.print(Speed);
      Serial.println("Km/h");    

     
      
   
  if (gprsSerial.available())
    Serial.write(gprsSerial.read());
 
  gprsSerial.println("AT");
  delay(1000);
 
  gprsSerial.println("AT+CPIN?");
  delay(1000);
 
  gprsSerial.println("AT+CREG?");
  delay(1000);
 
  gprsSerial.println("AT+CGATT?");
  delay(1000);
 
  gprsSerial.println("AT+CIPSHUT");
  delay(1000);
 
  gprsSerial.println("AT+CIPSTATUS");
  delay(2000);
 
  gprsSerial.println("AT+CIPMUX=0");
  delay(2000);
 
  ShowSerialData();
 
  gprsSerial.println("AT+CSTT=\"internet.ooredoo.tn\"");//start task and setting the APN,
  delay(1000);
 
  ShowSerialData();
 
  gprsSerial.println("AT+CIICR");//bring up wireless connection
  delay(3000);
 
  ShowSerialData();
 
  gprsSerial.println("AT+CIFSR");//get local IP adress
  delay(2000);
 
  ShowSerialData();
 
  gprsSerial.println("AT+CIPSPRT=0");
  delay(3000);
 
  ShowSerialData();
  
  gprsSerial.println("AT+CIPSTART=\"TCP\",\"217.182.206.185\",\"4000\"");//start up the connection
  delay(6000);
 
  ShowSerialData();
 
  gprsSerial.println("AT+CIPSEND");//begin send data to remote server
  delay(6000);
  ShowSerialData();
  
  String str="GET http://217.182.206.185:4000/newValues/"+String(refBoitier)+"/"+String(Speed)+"/"+String(RPM)+"/"+String(ABS) +"/"+String(KM) +"/"+String(Knock);


  Serial.println(str);
  gprsSerial.println(str);//begin send data to remote server
  
  delay(12000);
  ShowSerialData();
 
  gprsSerial.println((char)26);//sending
  delay(23000);//waitting for reply, important! the time is base on the condition of internet 
  gprsSerial.println();
 
  ShowSerialData();
 
  gprsSerial.println("AT+CIPSHUT");//close the connection
  delay(100);
  ShowSerialData();
} 
void ShowSerialData()
{
  while(gprsSerial.available()!=0)
  Serial.write(gprsSerial.read());
  delay(5000); 
  
}
