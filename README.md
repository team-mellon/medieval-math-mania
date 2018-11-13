# Hit Target Math Game

##### Description: Hit Target - A game for helping children to learn multiplication tables and number sense. A game played between two students where they are given an initial number and are asked to find an answer within a certain range. Each player take turns trying to guess a multiplication table that fits within the given bounds and each player is awarded accolades based on whether they find an answer within the range.

##### Client:  
##### Amanda Katharine Serenevy, Ph.D.</br>Executive Director, Riverbend Community Math Center  

#### Requirements:

    sudo apt-get install git
    sudo apt-get install docker-ce
    git clone git@github.com:cs4560-18-19/belloq.git

#### Build & Run:

    sudo docker build -t hit-target:v1 .
    sudo docker run -d -p 80:80 hit-target:v1

Then visit 'localhost' or '0.0.0.0' in a browser URL bar to see the game build

#### Rerun:

    sudo docker container ls
    sudo docker stop <CONTAINER ID>

#### Team Belloq:  
##### Nathan Estep - Team Leader  
##### Eric Bitikofer - Release Manager  
##### Evan Bradford - Document Manager  
##### Dakota O'Brien - Quality Assurance  

![logo](https://github.com/cs4560-18-19/belloq/blob/master/belloq-door.jpg)
