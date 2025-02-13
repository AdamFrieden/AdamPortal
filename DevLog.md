# DevLog

1. [Create Repo](#0---create-github-repository)
2. [Scaffold App](#1---scaffolding-a-react-app-with-vite)
3. [Setup S3 Bucket](#3-setup-aws-s3-bucket-to-host)
4. [Connect Domain](#4-connect-cloudflare-domain-to-s3)
5. [GitHub Actions Deploy Script](.github/workflows/main_deploy.yml)
6. [Adding Material UI](#6-adding-materialui)
7. [Host Setup for React Routes](#7-host-setup-for-react-routes)

## 0 - Create GitHub Repository

- Create a new repo
- Make sure you have [SSH keys setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys)
    - Recommend configuring [ssh-agent to launch automatically](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/working-with-ssh-key-passphrases)

- Clone it locally

## 1 - Scaffolding a React App with Vite

Navigate to the Project Directory:

`cd your-repository-folder`

Initialize the React App with Vite:

`npm create vite@latest`

Navigate into the new project folder and install dependencies:

`cd your-project-name`

`npm install`

Run the Development Server: To verify everything is set up correctly, start the dev server:

`npm run dev`

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## 3 Setup AWS S3 Bucket to Host

Navigated to the [AWS Console](https://us-east-1.console.aws.amazon.com/console/home?region=us-east-1)

* Find S3 and create a new general purpose bucket
  * Note that the bucket name needs to match the expected url (quirk of S3 as static site host?)
* Uncheck "Block Public Access settings for this bucket" - bucket needs to be publicly accessible.
* Enable static website hosting (under properties)
* Add a bucket policy to grant GetObject permission
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::examplebucket/*"
        }
    ]
}
```

#### Build Production App

Back in our simple Vite app, run this script (from package.json)

`npm run build`

Once complete, upload the contents of the `/dist` folder to the S3 bucket.


## 4 Connect Cloudflare Domain to S3


> Note that you will not be able to CNAME the top-level / root / apex domain (example.com) and instead need to settle for www.example.com

The final setup:
- www.adamportal.com serves up the app (without showing s3 bucket in url)
- adamportal.com redirects to www.adamportal.com

This requires setting up two S3 buckets, one for each url. My two bucket names:
* adamportal.com
* www.adamportal.com

Configuration for both buckets:
* block all public access is OFF
* bucket policy granting GetObject (see above)
* static website hosting enabled

On the [CloudFlare Dashboard](https://dash.cloudflare.com) we add a pair of CNAME records and a new redirect rule:

* Go to DNS Settings
* Add a new record
  * Type = `CNAME`
  * Name = `adamportal.com` (root)
  * Target = `www.adamportal.com` (not sure if this matters)
  * Proxy = ON
* Add a new record
  * Type = `CNAME`
  * Name = `www`
  * Target = `www.adamportal.com.s3-website-us-east-1.amazonaws.com`
  * Proxy = ON
* Go to Rules
* Add a 'Redirect from Root to WWW' rule

## 5 GitHub Actions Deploy Script

ChatGPT helped create a [simple deploy script](.github/workflows/main_deploy.yml) using GitHub Actions to push the latest `main` build to S3.

## 6 Adding MaterialUI

First, install the libraries:

`npm install @mui/material @emotion/react @emotion/styled`

Found a MaterialUI theme building tool to come up with something simple:

`https://bareynol.github.io/mui-theme-creator/`

Used React's [useContext](https://react.dev/reference/react/useContext) to provide a theme to the rest of the app

## 7 Host Setup for React Routes

A user could put `https://www.adamportal.com` in their browser and click a link inside our React SPA to correctly navigate to `https://www.adamportal.com/somepage`. However, if a user put that `/somepage` url directly in their browser they would see an ungraceful S3 404 error.

We need navigating to any adamportal.com/* url to serve up index.html so that our react SPA can handle it: 

* In Cloudflare add a new page rule
  * `https://www.adamportal.com/*`
  * `Cache Level: Bypass` 
  * `Origin Cache Control: On`
* In S3 update static website hosting
  * Error document: `index.html`

## Scratch Space

And MUI timeline component - see Travel page!

Check out this sweet draggable list:
https://stackblitz.com/edit/draggable-mui-list?file=components%2FDraggableList.tsx

Consider zustand for simple state management

sweet drag n drop - maybe for a roster page?
https://github.com/atlassian/react-beautiful-dnd
https://react-beautiful-dnd.netlify.app

Update DevLog with yml updates for deploy date and commit hash

Update DevLog with usage of vite rollup plugin visualizer
  looks like leaflet is using up all the space
  figure out how to either:
    use the minified version
    lazy load the module
    use a CDN rather than bundle it


Things to add:

Search trips
See all visits in popup(?) 


Update devlog with starclans demo project / POC