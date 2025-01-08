# DevLog

1. [Create Repo](#0---create-github-repository)
2. [Scaffold App](#1---scaffolding-a-react-app-with-vite)
3. [Setup S3 Bucket](#3-setup-aws-s3-bucket-to-host)
4. [Connect Domain](#4-connect-cloudflare-domain-to-s3)

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

Find S3 and create a new general purpose bucket. You will need to uncheck "Block Public Access settings for this bucket" (this needs to be publicly accessible)

Under properties for that bucket, enable static website hosting.

Then under permissions, add a bucket policy (note that this only grants GetObject action)

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::adamportalbucket/*"
        }
    ]
}
```

Back in our simple Vite app, run this script (from package.json)

`npm run build`

Once complete, upload the contents of the `/dist` folder to the S3 bucket.

## 4 Connect Cloudflare Domain to S3

- Grab the bucket url from the AWS Console. It will look something like:

`http://adamportalbucket.s3-website-us-east-1.amazonaws.com/`

- Then navigate to your domain in the [CloudFlare Dashboard](https://dash.cloudflare.com)
- Go to DNS Settings
  - Add a CNAME record for the root domain targetting your S3 bucket url