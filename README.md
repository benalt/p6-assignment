# Technical Interview Assignment

## Senior Software Engineer

Your task is to create a simple application that provides a user with the ability to create and view a “supplier” entity. For the sake of efficiency, the application and some important dependencies have already been bootstrapped using Next.JS and a Postgres Docker container. Your responsibility will be to implement a basic CRUD resource, using whatever additional tools and methods you see fit for the task.

The MVP for this project consists of only the create and view features. If you have time and a desire to keep going, the edit and delete features can be completed as bonus requirements.

There are no specific requirements for the design, and the final application doesn't need to be pretty. You're free to use any UI library you're proficient with, or keep it simple with basic styles.

There are also no requirements for any user authentication, as that feature is out of scope for this project.

**Note**: we do not use Next.JS for our product, but since it's a commonly used framework and includes API routes that can be used for communication with the database, we have decided that it is the best tool for the purposes of this assessment.

---

## Getting started

Before you begin, [create a fork of this repository](https://github.com/p6technologies/technical-assessment/fork) in your own GitHub account, and clone the forked repository to your local workspace.

### Running the application

To run the application, first download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/) if you don't already have it installed. With Docker Desktop running, the application can be started by running the following command:

```bash
docker-compose up
```

This command will pull the `postgres:alpine` Docker image, build the application container from the included Dockerfile, and run both services. The application will be available on port `3000`, and can be access in your browser at `http://localhost:3000`. If you already have an application running on port `3000` or `5432`, make sure the process is terminated before starting this application.

The following environment variables are available within the running application, which can be used to configure your ORM of choice:

- `process.env.DATABASE_URL`: the complete connection string for the postgres database
- `process.env.POSTGRES_DB`: the name of the postgres database for this application,
- `process.env.POSTGRES_USER`: the username of the postgres user
- `process.env.POSTGRES_PASSWORD`: the password for the postgres user
- `process.env.POSTGRES_PORT`: the port of the postgres database
- `process.env.POSTGRES_HOSTNAME`: the hostname of the postgres database

### Installing dependencies

In order to maximize portability of this project and reduce additional tools that you might need to install, it manages dependencies with Node's default package manager: `npm`. To install a new dependency, run `npm install [package]` in your local workspace and restart the Docker container (`Ctrl-C`, then run `docker-compose up` again). This will update the `package-lock.json` and trigger the Docker container to rebuild and install the new dependency. If you fail to rebuild the Docker container, the dependency will not be available in the running application.

### Submitting your work

When you have completed the assignment, you can submit your fork [by scheduling a follow-up interview](https://app.usemotion.com/meet/andyhite/technical-interview). The final step of the booking process will include a prompt to enter URL of your fork. During the follow-up interview we will review your submission and dig deeper into your implementation of the project.

Schedule your follow-up interview here: [https://app.usemotion.com/meet/andyhite/technical-interview](https://app.usemotion.com/meet/andyhite/technical-interview)

---

## Minimum Requirements

As a user of the technical interview assignment application, I need the ability to create and list suppliers.

### Viewing the supplier list

Given the application development server has been started\
When I navigate to the homepage of the application in my browser\
Then I should see a a heading with the text “Suppliers”\
And there should be an empty table with the headings “Name”, “Category”, and “Delete”\
And there should be an empty-slate message that reads “You haven’t created any suppliers yet”\
And there should be a button above the table with the text “Create Supplier”

### Creating suppliers

Given that I am viewing the suppliers list screen\
When I click the “Create Supplier” button\
Then I should be presented with a modal window that contains a form\
And the form should include the following fields:

- A required text input labeled “Name”
- A required text input labeled “Email Address”
- A required select input labeled “Category”, with the options “Services”, “Sub-contractors, “Manufacturers”, “Distributors” and “Importers”
- An optional text area labeled “Description”

And there should be a “Save Supplier” button below the form

#### Success scenario

When all fields are valid and I click the “Save Supplier” button below the form\
Then the modal dialog should close\
And a message with the text “{supplier_name} has been created” should be displayed\
And a row containing the newly created supplier’s “Name” and “Category” should be added to the table

When I refresh the page\
Then the row containing the newly created supplier should still be visible in the table

#### Failure scenario

When any field is invalid and I click the “Save Supplier” button below the form\
Then the modal dialog should not close\
And I should see an error indicating that the missing field is required

---

## Bonus requirements

As a user of the technical interview assignment application, the ability to edit and delete suppliers would be a nice bonus.

### Editing suppliers

Given that I am viewing the suppliers list screen\
And I have previously created a supplier\
When I click the supplier’s name in the table\
Then I should be presented with a modal window that contains the same form used for creating the supplier\
And the fields should be pre-populated with the relevant supplier data

#### Success scenario

When I change the value of a field and press the “Save Supplier” button\
Then the modal dialog should close\
And a message with the text “{supplier_name} has been created” should be displayed\
And the row containing the updated supplier should be updated to reflect the changes

#### Failure scenario

When I remove the value of a field and press the “Save Supplier” button\
Then the modal dialog should not close\
And I should see an error indicating that the missing field is required

### Deleting suppliers

Given that I am viewing the suppliers list screen\
And I have previously created a supplier\
When I click the “Delete” button in the row of the given supplier\
Then a message with the text “{supplier_name} has been deleted” should be displayed\
And the supplier should be removed from the table
