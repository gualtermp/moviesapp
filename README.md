# Movies app
Movies info web application.

This app was built with React using TypeScript and RTK Query + Java with Spring + MongoDB

## How to setup

### **Get the code**

First, clone this repo by running:

`git clone https://github.com/gualtermp/moviesapp.git`

It's split in 2 folders: client and server.

For ease of access, I've left .env files available. But I know these should be .gitignored :)

### **Server**

I used VS Code. To run the server the extensions mentioned here should be installed https://code.visualstudio.com/docs/java/java-spring-boot.
After they're installed, open VS Code and press CTRL+F5. Another option is from the terminal, on the root of the server project, running `mvn spring-boot:run`. 

After this is done, the server will be running on `localhost:8080`.

### **Client**

Also used VS Code. After opening the project, `cd` to `client` and run `yarn`. This will install the needed dependencies.
After the command finishes, run `ỳarn run dev`. 

The client will be running on `localhost:5173`.
