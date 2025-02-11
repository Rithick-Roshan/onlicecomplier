export const LANGUAGE_VERSION = {
    javascript: "18.15.0",  // Node.js
    python: "3.10.0",        // Updated Python version in Piston
    java: "11.0.19",         // Piston Java version
    c: "10.2.0",             // Piston C version
    cpp: "10.2.0"            // Piston C++ version
};
export const LANGUAGE_SNIPPETS = {
    javascript: `// JavaScript Hello World
  console.log("Hello, World!");`,
  
    python: `# Python Hello World
  print("Hello, World!")`,
  
    java: `// Java Hello World
  public class Main {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }`,
  
    c: `// C Hello World
  #include <stdio.h>
  int main() {
      printf("Hello, World!\\n");
      return 0;
  }`,
  
    cpp: `// C++ Hello World
  #include <iostream>
  using namespace std;
  int main() {
      cout << "Hello, World!" << endl;
      return 0;
  }`
  };
  