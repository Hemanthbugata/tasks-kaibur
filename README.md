# **Kaibur Task-1  - Spring Boot & MongoDB Application**

## **Project Overview**

The **Kaibur Tasks** application allows users to manage tasks and execute shell commands within a Kubernetes pod environment. The application provides a REST API that lets users:

- **Create**, **retrieve**, **update**, and **delete** tasks.
- **Search** tasks by name.
- **Execute shell commands** stored in tasks and store the execution results.

All tasks are stored in a **MongoDB** database.

---

## **Technologies Used**

- **Spring Boot**: A Java framework for building RESTful APIs.
- **MongoDB**: A NoSQL database for storing task data.
- **Maven**: A build and dependency management tool.
- **cURL/Postman**: Tools for testing API endpoints.

---

## **Features**

- **Task CRUD Operations**: Create, Read, Update, Delete tasks.
- **Task Execution**: Run shell commands and store the results as task executions.
- **Search Tasks by Name**: Find tasks based on their name.

---

## **Project Structure**


### **1. Controller Directory** (`controller/`)
This directory contains the API controllers for handling requests.

- **TaskController.java**: Handles CRUD operations for tasks.
- **TaskExecutionController.java**: Handles execution-related operations for tasks.

### **2. Model Directory** (`model/`)
This directory contains the data models used by the application.

- **Task.java**: Defines the Task object, with fields like `id`, `name`, `owner`, `command`, and `taskExecutions`.
- **TaskExecution.java**: Defines the TaskExecution object, with fields like `startTime`, `endTime`, and `output`.

### **3. Repository Directory** (`repository/`)
This directory contains MongoDB repositories that handle database operations.

- **TaskRepository.java**: Provides methods to interact with the `tasks` collection in MongoDB, including search functionality.

### **4. Service Directory** (`service/`)
This directory contains the business logic and interactions with the database.

- **TaskService.java**: Contains methods for creating, updating, deleting tasks, and executing shell commands.
- **TaskExecutionService.java**: Contains methods for managing task execution, such as saving output and execution time.

---

## **Setup and Installation**

### **1. Prerequisites**

Before you begin, ensure you have the following installed:

- **Java 17+**: Ensure you have Java 17 or later installed. You can verify by running:
  ```bash
  java -version
MongoDB: Install MongoDB locally or use a remote MongoDB instance. Make sure MongoDB is running on localhost:27017.

Maven: Ensure Maven is installed. You can verify by running:

```
mvn -verion

```

## Clone the Repository
 Clone the repository to your local machine:

  ```
  git clone https://github.com/yourusername/kaibur-tasks.git

  ```
## Build and Run the Application
  After cloning the repository, navigate to the project directory and build the project using Maven:

  ```
  cd kaibur-tasks

  mvn clean install # on successfull build og JAR file

  mvn spring-boot:run

  ```
The application will start running on http://localhost:8080.

##  MongoDB Setup
Ensure MongoDB is running on your local machine or update the connection URI in the application.properties file.

For a local instance, the default configuration will be: in src/resource/application-properties.

```
  spring.data.mongodb.uri=mongodb://localhost:27017/taskdb
```

## output 

  
  ![image](https://github.com/user-attachments/assets/ffb35d09-39e3-4591-8981-30261390f1b4)

  ![image](https://github.com/user-attachments/assets/a733c96d-d21c-412e-90e3-7413558537c4)



## List of end-points 

  1. GET tasks (Fetch All Tasks)
    To fetch all tasks from MongoDB:
```
    curl -X GET http://localhost:8080/tasks
```
![image](https://github.com/user-attachments/assets/ba98321c-cf82-416c-b742-3c1a8b6e3dd6)

  2. GET task by ID (Fetch Task by ID)
```
  curl -X GET http://localhost:8080/tasks/123

```
  ![image](https://github.com/user-attachments/assets/e3b95fe7-3390-40ab-a0b8-20fdd98532f9)

  3. PUT a new Task (Create or Update a Task)
    To create or update a task, pass a JSON object with task details.
```
curl -X PUT http://localhost:8080/tasks -H "Content-Type: application/json" -d '{
    "id": "129",
    "name": "Print Hello",
    "owner": "Hemanth Naidu Bugatha",
    "command": "echo Hello World!"
}'
```
![image](https://github.com/user-attachments/assets/3979da0f-3dea-4618-a12a-5e5a42e2c2c7)

4. Delete a task by its id:
  ```
  curl -X DELETE http://localhost:8080/tasks/123

  ```
   ![image](https://github.com/user-attachments/assets/d79c6da6-ba7d-4ec1-a23d-5e3f1c0ce5e2)

5. GET tasks by name (Search Tasks by Name)
    To find tasks that contain the string "Print" in their name:

   ```
   curl -X GET "http://localhost:8080/tasks/search?name=Print"
   ```

6.PUT a TaskExecution (Execute a Shell Command)
    To execute a shell command stored in the task with ID "123" and store the execution result in the taskExecutions list:

```
curl -X PUT http://localhost:8080/tasks/123/execute
```

  ![image](https://github.com/user-attachments/assets/020fc626-4aa3-4d0d-ad86-a60dce1533c8)

# **Kaibur Task-2 Docker and Kubernetes Deployment with MongoDB Integration
  # Overview
  
 In this task, we will:

Build a Docker image for the Spring Boot application.
Use Kubernetes YAML manifests to deploy the application and MongoDB in separate pods.
Ensure the application takes MongoDB connection details from environment variables.
Expose the app endpoints to be accessible from the host machine.
Set up a persistent volume for MongoDB so that data is retained even if the MongoDB pod is deleted.

# 1. Dockerfile for Spring Boot Application
We start by creating a Dockerfile for the Spring Boot application. This will build the application image, which can then be used in the Kubernetes deployment.

```
 FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/Kaibur-tasks-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

  Build docker image with docker file 

    
      docker build -t kaibur-tasks:latest .
    
  Now run the docker image and pull the mongo image and run them both under a docker network named spring-network.

  ```
    docker create network spring-network

    docker run -d --name mongo --network spring-network -p 27018:27017 mongo:latest

    docker run --name kaibur-tasks --rm --network spring-network -p 8080:8080 -e MONGO_URL=mongodb://mongo:27018/taskdb kaibur-tasks:latest
```
we have a docker network and let the local host connect with the mongo so we make this connection to fetch data from mongo and data flow to container with port 8080

Output Files :

  ![image](https://github.com/user-attachments/assets/deb26d0e-c3bd-470f-8b79-76132df0b411)

  ![image](https://github.com/user-attachments/assets/9dbff2dd-e2c0-455c-85b0-46b664212ca9)



# 2. Kubernetes YAML Manifests for Deploy 

  Now, we will create Kubernetes manifests to deploy the application and MongoDB in separate pods. The manifests will ensure the app takes MongoDB connection details from the environment variables and expose the app      endpoints to the host machine.ent and Services.

  * deployment.yaml
    
```
     apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: kaibur-tasks-deployment
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: kaibur-tasks
      template:
        metadata:
          labels:
            app: kaibur-tasks
        spec:
          containers:
            - name: kaibur-tasks
              image: kaibur-tasks:latest   # Replace with your Docker image name
              ports:
                - containerPort: 8080
          env:
            - name: SPRING_DATA_MONGODB_URI
              value: "mongodb://mongodb-service:27017/taskdb"  # MongoDB URI (Service name used in Kubernetes)
```
* mongo-deployment.yaml

```
  # mongo-deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
      - name: mongo
        image: mongo:latest
        ports:
        - containerPort: 27017
        volumeMounts:
        - name: mongo-data
          mountPath: /data/db
     volumes:
      - name: mongo-data
        persistentVolumeClaim:
          claimName: mongo-pvc
```

MongoDB Deployment: The MongoDB pod is deployed with a persistent volume to store data. It ensures that data persists even if the pod is restarted or deleted.

Spring Boot Deployment: The Spring Boot application is configured to use the MongoDB service (mongodb://mongo:27017/taskdb) via an environment variable.


# 3.MongoDB Running in a Separate Pod
  Persistent Volume for MongoDB Data:
  
  To ensure MongoDB data is persistent and remains intact even if the MongoDB pod is deleted or      recreated, we use a PersistentVolumeClaim (PVC). This is defined in the mongo-deployment.yaml      as follows:
  
  The PersistentVolumeClaim (PVC) ensures that the MongoDB data is persistent across pod restarts.

  mongodb-pvc.yaml

  ```
   #mongo-pvc.yaml

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongo-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
  ```  
  
# 4.Expose Application Endpoints from the Host Machine

  * Service.yaml
```
# mongo-service.yaml

apiVersion: v1
kind: Service
metadata:
  name: mongo
spec:
  selector:
    app: mongo
  ports:
    - protocol: TCP
      port: 27017
      targetPort: 27017
  clusterIP: None  # Headless service, to be used for communication with the app

---
# app-service.yaml

apiVersion: v1
kind: Service
metadata:
  name: kaibur-tasks
spec:
  selector:
    app: kaibur-tasks
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 8080
  type: LoadBalancer  # You can also use NodePort or ClusterIP depending on your Kubernetes setup
```
  Service: The Spring Boot application is exposed via a LoadBalancer service, which will allow you to access it on port 8080.

  # Deployment Steps
  
  Apply the YAML Manifests: To deploy the application and MongoDB, apply the YAML manifests to your Kubernetes cluster:

  ```
    minikube start 
    kubectl apply -f deployment.yaml
    kubectl apply -f mongo-deployment.yaml
    kubectl apply -f mongo-pvc.yaml
    kubectl apply -f service.yaml 
```
Verify Pods and services are running :

  ```
    kubectl get pods
    kubectl get services
```

output files :

  ![image](https://github.com/user-attachments/assets/49ee492a-7651-4bc2-a734-fb06e1ef780b)

  ![image](https://github.com/user-attachments/assets/3af12910-b7ff-438f-b78f-1286ec432042)



# Kaibur Task3 : Create React App to Spring-boot / Mongo Application .

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

output :
    ![image](https://github.com/user-attachments/assets/5b8ea05a-1407-4754-a407-1e2229aef7e4)

# Kaibur Task4 : Springboot deployment to AWS and CI/CD Pipeline to build docker image and push to docker registry. 

<h3>Key Components:</h3>

Jenkins: Automation server for building, testing, and deploying the application, incorporating CI/CD best practices.

SonarQube: Static code analysis tool to identify code quality issues and security vulnerabilities early in the development process.

Trivy: Vulnerability scanner to ensure container images are free from known security issues before deployment.

AWS instance : An EC2 instance for installing jenkins and sonarqube on it .

CI/CD Pipeline: Configure Jenkins to automate the build, test, and deployment processes, integrating SonarQube for static code analysis.

Security Scanning: Implement Trivy to scan container images for vulnerabilities before they are pushed to the container registry.

1. Create a AWS instance without key and go to root (sudo -i) , now install dependencies of jenkins, sonarqube and docker. 

 2. install.sh 

    ```
      sudo apt update -y
    wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | tee /etc/apt/keyrings/adoptium.asc
    echo "deb [signed-by=/etc/apt/keyrings/adoptium.asc] https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | tee /etc/apt/sources.list.d/adoptium.list
    sudo apt update -y
    sudo apt install temurin-17-jdk -y
    /usr/bin/java --version
    curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
    echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
    sudo apt-get update -y
    sudo apt-get install jenkins -y
    sudo systemctl start jenkins
    sudo systemctl status jenkins
    
    #install docker
    sudo apt-get update
    sudo apt-get install docker.io -y
    sudo usermod -aG docker ubuntu  
    newgrp docker
    sudo chmod 777 /var/run/docker.sock
    docker run -d --name sonar -p 9000:9000 sonarqube:lts-community
    
    #install trivy
    sudo apt-get install wget apt-transport-https gnupg lsb-release -y
    wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null
    echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
    sudo apt-get update
    sudo apt-get install trivy -y
    ```
  
  Now take the Public ip of new instance generated by terraform scripts with 8080 to access jenkins.
      
  With same publicip:9000 access the sonarqube for code analysis and quality gates.(login:admin password : admin)

3.Jenkins setup :

Install plugins : 

1. Eclipse Temurin Installer (Install without restart)
2. SonarQube Scanner (Install without restart)
3. NodeJs Plugin (Install without restart)
4. Sonar Quality Gates (Install without restart)
5. Docker (Install without restart)
6. Docker Commons (Install without restart)
7. Docker Pipeline (Install without restart)
8. Docker API (Install without restart)
9. docker-build-step (Install without restart)
10. stage-view pipeline  (Install without restart)
  Step 4:

4. Goto Manage Jenkins → Tools → Install JDK (17) and Maven 3. Click on Apply and Save

  configuration of java and nodejs (Manage jenkins --> Tools)


5. Configure Sonar Server in Manage Jenkins ⚙️

Grab the public IP address of your EC2 instance.

    public IP>:9000.

Sonarqube works on Port 9000, 

Go to your Sonarqube server.

Click on Administration → Security → Users → Click on Tokens and Update Token, → Give it a name, and click on Generate Token


click on update Token


Create a token with a name and generate

copy Token

Goto Jenkins Dashboard → Manage Jenkins → Credentials → Add secret text. It should look like this


You will see this page once you click on create


Now, go to Dashboard → Manage Jenkins → System and add like the below image.


Click on Apply and Save.

The Configure System option is used in Jenkins to configure different server

Global Tool Configuration is used to configure different tools that we install using Plugins

6. We will install a sonar scanner in the tools.


In the Sonarqube Dashboard, add a quality gate as well.

In the sonar interface, create the quality gate as shown below:

Click on the quality gate, then create.


Click on the save option.

In the Sonarqube Dashboard, Create Webhook option as shown in below:

Administration → Configuration →Webhooks


Click on Create

Add details:

<http://jenkins-private-ip:8080>/sonarqube-webhook/
        
7. Docker Image Build and Push 🐳
   
We need to install the Docker tool on our system.

Go to Dashboard → Manage Plugins → Available plugins → Search for Docker and install these plugins.

Now, goto Dashboard → Manage Jenkins → Tools →

Now go to the Dockerhub repository to generate a token and integrate with Jenkins to push the image to the specific repository.

If you observe, there is no repository related to Swiggy.

There is an icon with the first letter of your name.

Click on that My Account, → Settings → Create a new token and copy the token.

Goto Jenkins Dashboard → Manage Jenkins → Credentials → Add secret text. It should look like this:

After Pipeline running successfully the docker image is successfully pushed to Dockerhub .

output:


  1. AWS EC2 Instance
   ![image](https://github.com/user-attachments/assets/3c055240-4aef-4f0a-a43b-2efc0d22803b)

  2. Jenkins (EC2PubicIP:8080) 
   ![image](https://github.com/user-attachments/assets/ea6dca69-6034-4b4d-bc9d-e47d1c07d19a)

  3. Sonarqube (Ec2PublicIP:9000)
  ![image](https://github.com/user-attachments/assets/44f3d0a2-ba83-4522-8386-6ba1d0c89520)

  4. Docker registry after Image is Pushed :
  ![image](https://github.com/user-attachments/assets/7fa61975-ff9c-4fa1-867a-6e35861bada3)

  

