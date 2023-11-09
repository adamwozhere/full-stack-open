# Exercise 11.1 (part 11 exercise 1)

## Think about a hypothetical situation where we have an application being worked on by a team of about 6 people. The application is in active development and will be released soon -- discuss points areound CI/CD.

### CI/CD

CI (Continuous Integration) in general terms refers to merging developer changes to the Main brach often; generally several times a day. CD refers to both Continuous Delivery and Continuous Deployment is generally referred to the practice of keeping where the Main branch is always deployable. Some aspects are blurred across the CI and CD boundaries therefore, generally the whole process is defined together as CI/CD. In short, it is the set of processes that allow for code to be kept always in an up-to-date, always deployable state that is the single source of truth.

### CD/CD process

With the question above, a CI/CD setup for a Golang project with around 6 people could be as follows:

As it is a small team, it would probably be best to go with a cloud based solution. However, if the project were to increase in developer size, or scope needing specialist computing, then a bespoke solution might be better with a self-hosted automation server that can be fully customised such as Jenkins. For building a project with GO, we could use a cloud based service such as Harness. As with other services such as those from AWS, it can be configured to run deployements and tests when merging a pull request to the Main branch.

### Automation script

Generally a short script file is used with a Cron syntax that provides a set of instructions to the automation server (sometimes called a Cronjob.) to execute command-line processes. We could use the following:

1. Linting - to ensure code is formatted correctly and to a consistant standard, use a library such as `golangci-lint`
2. Testing - tests are scripts in the Go project that ensure that functions / features are working correctly. A library such as `shoenig/test` could be used to provide assertion functions to write tests. If these tests pass, then the next stage can continue, otherwise the process should be aborted with an error and a log of the errors.
3. Build - now that the tests have passed, we know that that the updated code will not break the Main branch / deployed app, so we would compile the code to an executable using the Go compiler
4. Deploy - the app can now be deployed to a cloud app provider such as Heroku

This is quite a brief overview of the process, and there may be other steps involved depending on the programming language and project complexity, but this serves to provide a general explation of CI/CD; the main strategy being to always keep the Main code branch as a single source of truth which is always tested and in a fully-deployable state at all times.

