## 🧠 Shape Identifier & Text Prediction App

This project includes a React frontend and multiple FastAPI backends for shape and text prediction using deep learning models.

---

### 🚀 Frontend Setup

# 1. Navigate to the frontend project directory:
```bash
   cd Shape-Identifier-CNN-main/Frontend/my-project
  ```
# 2. Install required packages:

``` bash
  npm install
  npm install react-router-dom @mui/material @emotion/react @emotion/styled
  ```
# 3. Start the frontend:
```bash
  npm run dev
```
or
```bash
   npm start
```
# ⚠️ Make sure the frontend runs on port 5173 or 5174.
# If it's different, add your frontend port to the CORS origins in app.py of the backend.

### 🧩 Backend Setup (Main Backend)

# 1. Navigate to the backend directory:

```bash
cd Shape-Identifier-CNN-main/Backend
```

# 2. Ensure Python 3.11 is installed and selected as the interpreter.
# 3. Create and activate virtual environment:

```bash
py -3.11 -m venv venv311
.\venv311\Scripts\activate
```
# 4. Install dependencies:
```bash
pip install -r Backend_requirements.txt
```
# 5. Start the backend server:
```bash
uvicorn app:app --reload
```

##  Prediction Backend (Shape Prediction)

# 1.Navigate to the prediction backend:
```bash
cd Shape-Identifier-CNN-main/Prediction_Backend
```

# 2.Create and activate virtual environment
```bash
py -3.11 -m venv venv_pred
.\venv_pred\Scripts\activate
```

# 3.Install dependencies:
```bash
pip install -r Prediction_Backend_Requirements.txt
```

# 4.Run the shape prediction API:
```bash
uvicorn App:app --reload --port 8001
```

## Text Prediction Backend

# 1.Navigate to the text prediction backend:
```bash
cd Shape-Identifier-CNN-main/TextPrediction_Backend
```

# 2.Create and activate virtual environment:
```bash
py -3.11 -m venv venv
.\venv\Scripts\activate
```
# 3.Install dependencies:
```bash
pip install -r TextPrediction_Requirements.txt
```
# 4.Run the text prediction API:
```bash
uvicorn app:app --reload --port 8002
```
## ☁️ MongoDB Atlas Setup

Add your public IP address to the MongoDB Atlas cluster's IP whitelist for successful database connectivity.
The logging endpoint depends on this configuration.

This app uses React Router, MUI, and FastAPI with separate services for modularity.
