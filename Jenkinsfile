pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('Dockerhub')  // Updated to match your credentials ID
        IMAGE_NAME = "velmurugan1412/my-docker-image"      // Your Docker Hub image name
    }

    stages {
        stage('Test Credentials') {
            steps {
                script {
                    echo "Using Docker Hub credentials ID: ${DOCKERHUB_CREDENTIALS}"  // Diagnostic step to confirm credentials
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
                    docker.withRegistry('', DOCKERHUB_CREDENTIALS) {
                        docker.image("${IMAGE_NAME}:${env.BUILD_NUMBER}").push()
                    }
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

