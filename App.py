
import google.generativeai as genai


genai.configure(api_key="AIzaSyDiTTQcEtzi-QeksbGYJCJAL5Fsq9j1pVU")
model = genai.GenerativeModel('gemini-pro')

prompt = input("Enter the prompt ")
response = model.generate_content(prompt)

print(response.image)