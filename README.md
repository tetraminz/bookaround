enc# Booking System Example

The example in this starter is an Appointment Booking System with both a user facing part (finding and booking appointments) and a admin part (setting availability and managing scheduled appointments). 

When a new appointment is booked, the backend sends a confirmation email to the user (utilizing the [Sendgrid Encore Bit integration](https://github.com/encoredev/examples/tree/main/bits/sendgrid)).

It has a React frontend with both a user facing part and an admin dashboard. Authentication is required for accessing admin dashboard.

## Prerequisites 

**Install Encore:**
- **macOS:** `brew install encoredev/tap/encore`
- **Linux:** `curl -L https://encore.dev/install.sh | bash`
- **Windows:** `iwr https://encore.dev/install.ps1 | iex`
  
**Docker:**
1. [Install Docker](https://docker.com)
2. Start Docker

## Create app

Create a local app from this template:

```bash
encore app create my-app-name --example=booking-system
```

## Run app locally

Before running your application, make sure you have Docker installed and running. Then run this command from your application's root folder:

```bash
encore run
```

## View the frontend

While `encore run` is running, head over to [http://localhost:4000/frontend/](http://localhost:4000/frontend/) to view the frontend for your booking system monitor.


## Local Development Dashboard

While `encore run` is running, open [http://localhost:9400/](http://localhost:9400/) to access Encore's [local developer dashboard](https://encore.dev/docs/go/observability/dev-dash).

Here you can see traces for all the request that were generated when you used your app from the frontend, view your architecture diagram, and see API docs in the Service Catalog.


## Deployment

### Self-hosting

See the [self-hosting instructions](https://encore.dev/docs/go/self-host/docker-build) for how to use `encore build docker` to create a Docker image and configure it.

### Encore Cloud Platform

Deploy your application to a free staging environment in Encore's development cloud using `git push encore`:

```bash
git add -A .
git commit -m 'Commit message'
git push encore
```

You can also open your app in the [Cloud Dashboard](https://app.encore.dev) to integrate with GitHub, or connect your AWS/GCP account, enabling Encore to automatically handle cloud deployments for you.

## Link to GitHub

Follow these steps to link your app to GitHub:

1. Create a GitHub repo, commit and push the app.
2. Open your app in the [Cloud Dashboard](https://app.encore.dev).
3. Go to **Settings ➔ GitHub** and click on **Link app to GitHub** to link your app to GitHub and select the repo you just created.
4. To configure Encore to automatically trigger deploys when you push to a specific branch name, go to the **Overview** page for your intended environment. Click on **Settings** and then in the section **Branch Push** configure the **Branch name** and hit **Save**.
5. Commit and push a change to GitHub to trigger a deploy.

[Learn more in the docs](https://encore.dev/docs/platform/integrations/github)
