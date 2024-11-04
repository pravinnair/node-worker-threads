# Node: How to Use Worker Threads to Avoid Blocking I/O Operations

This example demonstrates how to use Node's `worker_threads` library to prevent blocking I/O operations from interfering with the main thread’s execution.

### Problem
The main thread can become blocked when a GET I/O operation is executed, causing all other endpoints to wait until it completes.

### Solution
#### Naive Solution
To prevent blocking, we can create a worker thread using Node’s `worker_threads` library to isolate the execution of the I/O operation.

#### Optimized Solution
To further improve performance, we can split worker threads across available CPU cores. This allows the I/O operation to be executed faster by leveraging the system's full processing capability.

### Step 1: Finding the Number of Cores
To determine the number of processor cores on your server or local instance:

- **On Windows**: Run the following command in Command Prompt:
  ```cmd
  echo %NUMBER_OF_PROCESSORS%
  4
### Step 2: Utilizing Cores Efficiently
Since my instance has 4 cores, we can optimize CPU usage by assigning 2 cores for worker threads, leaving the other cores free for other activities. This approach speeds up processing and reduces time.

### Step 3: Tracking Performance
To compare the naive vs. optimized solutions, use the following commands:

- **On Windows**
  ```cmd
  Measure-Command { curl.exe --get http://localhost:8080/blocking }
- **On MacOs**
  ```macOS
  $ time curl --get http://localhost:8080/blocking

### Results
- **Naive solution**
``` 
    TotalSeconds : 22.652617
    TotalMilliseconds : 22652.617
````
- **Optimized solution**
``` 
    TotalSeconds : 11.6464641
    TotalMilliseconds : 11646.4641
````
By assigning worker threads to specific cores, the optimized solution significantly reduces execution time.
