pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('Dockerhub')  // Ensure this matches the exact ID from the credentials store
        IMAGE_NAME = "velmurugan1412/my-docker-image"      // Your Docker Hub image name
    }

    stages {
        stage('Test Credentials') {
            steps {
                script {
                    echo "Checking Docker Hub credentials..."
                    withCredentials([usernamePassword(credentialsId: 'Dockerhub', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        echo "Docker Hub Username: ${DOCKER_USER}"  // Should print your Docker Hub username (velmurugan1412)
                        // Confirm the password variable (masked in logs)
                        echo "Docker Hub Password is set: ****"
                    }
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
                        sh "docker login -u ${env.DOCKERHUB_CREDENTIALS_USR} -p ${env.DOCKERHUB_CREDENTIALS_PSW}"
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
