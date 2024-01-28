
import PIL.Image
import gradio as gr
import base64
import time
import os
import google.generativeai as genai

# Set Google API key 
os.environ['GOOGLE_API_KEY'] = "AIzaSyDiTTQcEtzi-QeksbGYJCJAL5Fsq9j1pVU"
genai.configure(api_key = os.environ['GOOGLE_API_KEY'])

# Create the Model
txt_model = genai.GenerativeModel('gemini-pro')
vis_model = genai.GenerativeModel('gemini-pro-vision')

# Image to Base 64 Converter
def image_to_base64(image_path):
    with open(image_path, 'rb') as img:
        encoded_string = base64.b64encode(img.read())
    return encoded_string.decode('utf-8')

# Function that takes User Inputs and displays it on ChatUI
def query_message(history,txt,img):
    if not img:
        history += [(txt,None)]
        return history
    base64 = image_to_base64(img)
    data_url = f"data:image/jpeg;base64,{base64}"
    history += [(f"{txt} ![]({data_url})", None)]
    return history

# Function that takes User Inputs, generates Response and displays on Chat UI
def llm_response(history,text,img):
    if not img:
        response = txt_model.generate_content(text)
        history += [(None,response.text)]
        return history

    else:
        img = PIL.Image.open(img)
        response = vis_model.generate_content([text,img])
        history += [(None,response.text)]
        return history

# Interface Code
with gr.Blocks() as app:
    with gr.Row():
        image_box = gr.Image(type="filepath")
    
        chatbot = gr.Chatbot(
            scale = 2,
            height=750
        )
    text_box = gr.Textbox(
            placeholder="Enter text and press enter, or upload an image",
            container=False,
        )

    btn = gr.Button("Submit")
    clicked = btn.click(query_message,
                        [chatbot,text_box,image_box],
                        chatbot
                        ).then(llm_response,
                                [chatbot,text_box,image_box],
                                chatbot
                                )
app.queue()
app.launch(debug=True)