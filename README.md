# Healthera Fullstack

This app will help in managing Patients, to keep track of their daily health reports
and address their medical emergencies.

# Dependencies for running the app
This app is developed in MEAN and MERN stacks and following softwares
are prerequisites to run the app.

    MongoDB     3+
    Node.JS     8
    AngularCli  6.x.x
    Git

# Instructions for Running app
Post cloning the repsitory, install dependencies for Backend and Frontends,
Run following commands in project root directory to install dependencies,

    npm install
    npm install --prefix backend
    npm install --prefix angular-frontend
    npm install --prefix react-frontend

After installing dependencies "start mongodb" and start frontend and backend apps
Run following command in project root directory to start frontend and backend apps
    npm run start

On succeful start,
    Angular app can be accessed on http://localhost:4200
    React app can be accessed on http://localhost:3000

# Instructions to deploy on cloud (AWS)
There are several ways of deploying a End-End web application on cloud infrastructure
Following is a non standard and cost effective method of deployment end-end web application,
as the intention is only to demo the MEAN and MERN stack applications.

The plan is to run MongoDB, backend exprss-node application and react-frontend application on a single EC2 instance, while hosting angular-frontend application to S3 bucket.
Note: React and angular applications will be consuming the same backend apis.

1. Create a security group which allows TCP traffic over ports 3000, 4000 and 4200 from all IPs.
2. Launch a EC2 instance with Amazon Linux AMI, with above security group. (Use instance type       T2.micro for lesser cost).
3. Note the public and private IPs of above instance.
4. Create a S3 bucket and enable static web hosting and enable public reads using following policy.
    {
    "Version": "2012-10-17",
    "Statement": [
            {
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::healthera/*"
            }
        ]
    }
5. Create a git repository and import code from "healthera-fullstackapp" into it.
6. Clone the code from your newly created repo and update the following files,
    Update "process.env.API_URL" in "react-frontend/webpack.config.dev.js" with the public IP       of above EC2 instance.
    Update the "apiUrl" in "angular-frontend\src\environments\environment.ts" with public IP
        of above EC2 instance.
    Push the changes to your git repo.
7. Build the angular code inside "angular-frontend" dirctory using "ng build" command.
8. SSH into above EC2 instance and install dependant softwares, clone repo and start apps,
    8.1 Change to superuser
            sudo su
    8.2 Update repos
            yum update -y
    8.3 Install and start mongo
            echo "[mongodb-org-4.0]
            name=MongoDB Repository
            baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/4.0/x86_64/
            gpgcheck=1
            enabled=1
            gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc" > /etc/yum.repos.d/mongodb-org-4.0.repo
            yum install -y mongodb-org
            service mongod start
    8.4 Install NodeJS
            curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
            yum -y install nodejs
    8.5 Install Git
            sudo yum -y install git
    8.6 Clone your repo,
            Eg: cd /home/ec2-user/
                git clone https://github.com/Madhavraob/healthera-fullstackapp.git
                cd /home/ec2-user/healthera-fullstackapp/
    8.7 Start backend and react apps
            npm i
            npm i --prefix backend
            npm i --prefix react-frontend
            npm start
9. Upload the locally built angular code to prevously created S3 bucket.
10. Now React app can be reached on port 3000 over publicIP of EC2 instance
    and Angular app can be reached over the Endpoint url of S3 bucket.