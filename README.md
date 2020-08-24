# Large-number-operation-plug-in
#What is my project?
My project includes addition, subtraction, multiplication division and remainder, 
big positive integer operation(Operations greater than 16 digits).
#Why create it?
When I write algorithm in javascript, I encounter the problem of explosion accuracy 
(when the number of digits is greater than 16, the calculation result is inaccurate).
#How to use it?
let Cal=require('calculate.js'); 
let cal=new Cal(); 
cal.add('611321546465123564545','465121231651513216516512135');
