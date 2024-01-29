import { GoogleGenerativeAI } from "@google/generative-ai";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
// const analytics = getAnalytics(app);
const db = getFirestore(app);
// import { connectFirestoreEmulator } from "firebase/firestore";

// connectFirestoreEmulator(db, '127.0.0.1', 8080);

const docRef = doc(db, "KKEK", "API");
const docSnap = await getDoc(docRef);

const API = docSnap.data().Gemini;
// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API);

var History = JSON.parse('[
                         {
                                "role":"user",
                                 "parts":"treat your name as KKEK-AI and trainned by KKEK",
                         },
                        {
                            "role":"model",
                             "parts":"",
                        }
]');
console.log(History);


async function run() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    prompt = "Write a story about a magic backpack.";

    if (document.getElementById("query").value != "") {
      prompt = document.getElementById("query").value;    
      
    }
    else{return;}

    console.log(prompt)
    const responseEle = document.getElementById("response");
    
    const chat = model.startChat({
        history: History,
        generationConfig: {
          maxOutputTokens: 100,
        },
      });
    
    responseEle.innerHTML = "Generating '"+prompt.toString()+"'";
    
    try {
        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        
        document.getElementById("response").innerHTML = response.text();
        History[History.length] = {"role":"user","parts":prompt};
        History[History.length] = {"role":"model","parts":response.text()};
        console.log(History);       
        
    } catch (error) {
        responseEle.innerHTML = error.toString();
    }

    if (responseEle.innerHTML == "Generating '"+prompt.toString()+"'"){
        responseEle.innerHTML = "due to safty issue....<br>your request is not processed..<br>pls try something else";
    }
    else{
        console.log((responseEle.innerHTML == "Generating '"+prompt.toString()+"'"))
    }
}
document.getElementById("submit").addEventListener("click",run);
  
