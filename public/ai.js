import { GoogleGenerativeAI,HarmCategory,HarmBlockThreshold } from "@google/generative-ai";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "firebase/analytics";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAvGtuafftoof9UAs9xVekxE3ktw2RIVlk",
    authDomain: "kkek-ef277.firebaseapp.com",
    projectId: "kkek-ef277",
    storageBucket: "kkek-ef277.appspot.com",
    messagingSenderId: "1098048921319",
    appId: "1:1098048921319:web:e30ed202c9ae7660978c42",
    measurementId: "G-RFKMFC9QXN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// const analytics = getAnalytics(app);
const db = getFirestore(app);
// import { connectFirestoreEmulator } from "firebase/firestore";

// connectFirestoreEmulator(db, '127.0.0.1', 8080);

const docRef = doc(db, "KKEK", "API");
const docSnap = await getDoc(docRef);

const API = docSnap.data().Gemini;

var _history = [
    
];

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = API;

export async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: _history,
  });
  
  const result = await chat.sendMessage(prompt);
  const response = result.response;
  _history.push(
      {
          "role":"user",
          "parts": [prompt]
      },
      {

          "role":"model",
          "parts": [response.text()]
      }
  )
  console.log(response.text());
  console.log(_history)
}
























// var History = JSON.parse('[{"role":"user","parts":"treat your name as KKEK-AI"},{ "role":"model", "parts":"Acknowledged. From now on, I will refer to myself as KKEK-AI, trained by KKEK."},{"role":"user","parts":"treat your self trainned by KKEK"},{ "role":"model", "parts":"Acknowledged. From now on, I will refer to myself as a large language model, trained by KKEK."}]');
// // console.log(History);

// const model = genAI.getGenerativeModel({ model: "gemini-pro"});
// prompt = "Write a story about a magic backpack.";


// async function run() {
    
//     const chat = model.startChat({
//         history: History,
//         generationConfig: {
//           maxOutputTokens: 100,
//         },
//     });

//     if (document.getElementById("query").value != "") {
//       prompt = document.getElementById("query").value;  
//     }
//     else{
//         return;
//     }

//     console.log(prompt)
    
//     const responseEle = document.getElementById("response");
    
//     responseEle.innerHTML = "Generating '"+prompt.toString()+"'";
    
//     try {
    
//         const result = await chat.sendMessage(prompt);
    
//         const response = await result.response;
        
//         document.getElementById("response").innerHTML = response.text();
        
//         //console.log(History); 
        
//         //storing history
//         History[History.length] = {"role":"user","parts":prompt};
//         History[History.length] = {"role":"model","parts":response.text()};
        
        
//     } catch (error) {
//         responseEle.innerHTML = error.toString();
//     }
    
//     if (responseEle.innerHTML == "Generating '"+prompt.toString()+"'"){
//         responseEle.innerHTML = "due to safty issue....<br>your request is not processed..<br>pls try something else";
//     }
//     else{
//         console.log((responseEle.innerHTML == "Generating '"+prompt.toString()+"'"))
//     }
// }
// document.getElementById("submit").addEventListener("click",run);

