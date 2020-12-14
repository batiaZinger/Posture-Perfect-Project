from flask import Flask

UPLOAD_FOLDER = 'uploadsVideos'
# UPLOAD_FOLDER = r"C:\Users\henri\Documents\Batia Zinger\uploads"

# app = Flask(__name__)
app = Flask(__name__, static_url_path="", static_folder="processedVideos")
# app = Flask(__name__, static_url_path = "", static_folder = "workDetection\images")
app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 1000 * 1024 * 1024
