from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException
import pandas as pd
from docx import Document
import fitz  # PyMuPDF
import io

router = APIRouter()

ALLOWED_EXTENSIONS = {".csv", ".docx", ".pdf"}

@router.post("/upload-file/")
async def upload_file(file: UploadFile = File(...)):
    file_ext = file.filename.split(".")[-1].lower()

    if f".{file_ext}" not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Unsupported file format")

    contents = await file.read()

    # ✅ CSV Handling
    if file_ext == "csv":
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
        return {"filename": file.filename, "rows": len(df), "content": df.to_dict(orient="records")}

    # ✅ DOCX Handling
    elif file_ext == "docx":
        doc = Document(io.BytesIO(contents))
        text = "\n".join([para.text for para in doc.paragraphs])
        print("filename", file.filename)
        print( "content", text)
        return {"filename": file.filename, "content": text}  # No truncation

    # ✅ PDF Handling (FIXED!)
    elif file_ext == "pdf":
        doc = fitz.open(stream=contents, filetype="pdf")
        text = "\n".join([page.get_text("text") for page in doc])  # Read ALL pages
        return {"filename": file.filename, "content": text}  # No truncation

    return {"filename": file.filename, "message": "File uploaded but not processed"}