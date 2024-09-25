 <!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Yash's ChatGPT</h3>

  <p align="center">
    My attempt at replicating ChatGPT's website
    <br />
    <a href="https://chatgpt-messenger-five.vercel.app/">View Demo</a>
    <p>
     Readme template from <a href="https://github.com/othneildrew/Best-README-Template/tree/main">here</a>
    </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://chatgpt-messenger-five.vercel.app/)

I made this Web App because of the whole AI craze. Since I've been spending a lot of time using modern web development techonologies I wanted to know whether I could truly make something that was state of the art. So I put myself to the test and ended up learning a lot and refining skills which I was weak in. 

This Web app is supposed to replicate the functionality of openAI's ChatGPT website. The user can log in with a google account and instantly start chatting with the AI. The chat history is saved and multiple chats can be created and saved. The user can switch be the chats. The AI text is streamed through. 

As a developer this project helped me expand my Nextjs knowledge as well as taught me how to learn things on my own and figure out how to integrate the frontend with the backend. The project uses nextjs 14 with app router and typescript. I use Authjs v5 to handle authentication. Firebase is the backend where the chat messages are saved and are tied to the user's google account. I used vercel's AI sdk to connect to openai's chagpt and stream messages from the AI. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
* ![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)
* ![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Dependencies
@heroicons/react,
ai,
firebase,
firebase-admin,
framer-motion,
next,
next-auth,
openai,
react,
react-dom,
react-firebase-hooks,
react-hot-toast,
react-responsive,
react-select, and
zustand



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Make sure you have node package manager installed.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at openAI, google cloud services, and firebase
2. Clone the repo
   ```sh
   git clone https://github.com/tigeryash/chatgpt-messenger.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `.env`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```
To run this project you'd need these variable inside of your .env file.
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
NEXT_AUTH_URL=http://localhost:3000
AUTH_SECRET=
OPENAI_API_KEY=
FIREBASE_SERVICE_ACCOUNT_KEY

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.
To use this app it's exactly like how you'd use the real ChatGPT website. You need to log in with a google account first. After you should see the home page where you can start a new chat 
When in a new chat you should see an input at the bottom of the screen where you should be able to talk to the AI. 
Switching or starting more chats is available on the sidebar or by opening it up on the menu button on mobile.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [x] Add Auth
- [x] Add Login Page
- [x] Add protected routes
- [x] Add page layout
- [x] Add Chat box
- [x] Add firebase backend
- [x] Add multiple chats
- [x] Add chatgpt integration
- [x] Complete design

See the [open issues](https://github.com/tigeryash/chatgpt-messenger/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Yashwanth Venkatesan - yashwanth.venkatesan@gmail.com

Project Link: [https://github.com/tigeryash/chatgpt-messenger](https://github.com/tigeryash/chatgpt-messenger)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
