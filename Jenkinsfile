pipeline {
    agent any

    environment {
        DOCKER_USERNAME = 'velmurugan1412'  // Your Docker Hub username
        DOCKER_PASSWORD = '9095597567@Vel'  // Your Docker Hub password (make sure this is correct)
        IMAGE_NAME = "velmurugan1412/my-docker-image"
    }

    stages {
        stage('Test Hardcoded Credentials') {
            steps {
                script {
                    echo "Using Docker Hub credentials..."
                    echo "Docker Hub Username: ${DOCKER_USERNAME}"
                    // Do not log the password directly for security reasons
                    echo "Docker Hub Password is set: ****"
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Docker Login and Push Image') {
            steps {
                script {
                    sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                    docker.image("${IMAGE_NAME}:${env.BUILD_NUMBER}").push()
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Add deployment commands here if necessary
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}
