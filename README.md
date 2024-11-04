<!-- @format -->

Node how to use worker thread to avoid blocking I/O ops to interfere the main threads execution.
The code sample will show how the main thread is blocked by a get I/O op which when executed blocks all other endpoints until it is completed.

(naive) Solution is to utilize node woker_thread lib to create a worker thread to isolate the execution.
To further optimize, based on the system type(# of processors) we will try to split the worker threads so that the I/O op can be performed with much higher speed.

Find number of cores of your server or local instance:
Since I am using a windows, will run this in cmd prompt:
echo %NUMBER_OF_PROCESSORS%
4

(optimized)Solution will make use of cores.
Since my instance has only 4 cores, so to better utilize my cpu's i will plan to run the threads in
2 cores so that there is always extra cores in buffer for any other activity.
Optimized-Solution will have the new approach of utilizing and assigning cores for worker threads and speed up their processing efficiently and reduce time.

Track the performance between both naive vs optimized solutions:
for windows=>
Measure-Command {curl.exe --get http://localhost:8080/blocking}
for mac =>
$ time curl --get http://localhost:8080/blocking

naive
$ time curl --get http://localhost:8080/blocking
TotalSeconds : 22.652617
TotalMilliseconds : 22652.617

optimized
$ time curl --get http://localhost:8080/blocking
TotalSeconds : 11.6464641
TotalMilliseconds : 11646.4641
