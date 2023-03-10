#include <Arduino.h>

const int threshold = 35;

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("ESP32 Touch Test");
}

void loop() {
  delay(50);

  if(touchRead(12) >= 10 && touchRead(12) < 100) {
    Serial.print("id12[");
    Serial.print(touchRead(12));
    Serial.print("]");
  }

  if(touchRead(13) >= 10 && touchRead(13) < 100) {
    Serial.print("id13[");
    Serial.print(touchRead(13));
    Serial.print("]");
  }

  if(touchRead(14) >= 10 && touchRead(14) < 100) {
    Serial.print("id14[");
    Serial.print(touchRead(14));
    Serial.print("]");
  }

  if(touchRead(27) >= 10 && touchRead(27) < 100) {
    Serial.print("id27[");
    Serial.print(touchRead(27));
    Serial.print("]");
  }

  if(touchRead(32) >= 10 && touchRead(32) < 100) {
    Serial.print("id32[");
    Serial.print(touchRead(32));
    Serial.print("]");
  }

  if(touchRead(33) >= 10 && touchRead(33) < 100) {
    Serial.print("id33[");
    Serial.print(touchRead(33));
    Serial.print("]");
  }

  // if(touchRead(12) < 45) { 
  //   Serial.println("id12");
  // }

  // if(touchRead(13) < threshold) { 
  //   Serial.println("id13");
  // }

  // if(touchRead(14) < threshold) { 
  //   Serial.println("id14");
  // }

  // if(touchRead(27) < threshold) { 
  //   Serial.println("id27");
  // }

  // if(touchRead(33) < threshold) { 
  //   Serial.println("id33");
  // }

  // if(touchRead(32) < threshold) { 
  //   Serial.println("id32");
  // }
}

