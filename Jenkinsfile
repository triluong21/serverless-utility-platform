@Library('cds-jenkinsfile-shared') _
import groovy.json.JsonSlurper

node ('docker') {
    def gitVars
    def todaysDate = new Date().format( 'yyyyMMdd' )
    echo "Todays Date is ${todaysDate}"
    boolean jobSuccess = true

    def accountId 
    switch(env.AWS_ACCT_ALIAS) {
        case "nonprod": 
            accountId = "590449824367"
            break
        case "prod": 
            accountId = "631739919048"
            break
        default:
            accountId = "Unable_to_determine_accountId"
    }
    try {
        node12Helper()
        stage('Checkout') {
            gitVars = checkout scm
        }
        stage('Install') {
            sh 'yarn install'
        }
        stage('Lint') {
            sh 'yarn lint'
        }
        stage('Deploy') {
            echo "Evaluating whether to deploy ${gitVars.GIT_BRANCH}"
            ansiColor('xterm') {
                sh 'yarn deploy-dev'  // Publish the app to the bucket
            }
        }
    } catch (e) {
        jobSuccess = false
        throw e
    } finally {
        stage('Notify') {
            slackHelper(jobSuccess, gitVars, '#highlander_devops')
        }
    }
}