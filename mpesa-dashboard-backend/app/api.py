import re
from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException
import fitz  # PyMuPDF
import io
from app.kafka_producer import send_statement

router = APIRouter()

ALLOWED_EXTENSIONS = {".csv", ".docx", ".pdf"}

def extract_customer_details(text):
    """Extract customer name and mobile number from the MPESA statement."""
    name_pattern = re.search(r"Customer Name:\s*(.+)", text)
    number_pattern = re.search(r"Mobile Number:\s*(\d+)", text)
    
    return {
        "name": name_pattern.group(1).strip() if name_pattern else "Unknown",
        "mobile_number": number_pattern.group(1).strip() if number_pattern else "Unknown"
    }

def extract_statement_period(text):
    """Extract statement period and statement date from the MPESA statement."""
    
    # Updated regex to match "14th 2 2025" format
    date_pattern = re.search(r"Date of Statement:\s*(\d{1,2}(?:st|nd|rd|th)?\s+\d{1,2}\s+\d{4})", text)
    
    # Updated regex to match "01st 1 2025 - 31st 1 2025" format
    period_pattern = re.search(r"Statement Period:\s*(\d{1,2}(?:st|nd|rd|th)?\s+\d{1,2}\s+\d{4})\s*-\s*(\d{1,2}(?:st|nd|rd|th)?\s+\d{1,2}\s+\d{4})", text)

    return {
        "date": date_pattern.group(1) if date_pattern else "Unknown",
        "period": {
            "start": period_pattern.group(1) if period_pattern else "Unknown",
            "end": period_pattern.group(2) if period_pattern else "Unknown"
        }
    }

def parse_mpesa_statement(text):
    """Extract transactions from MPESA statements into structured JSON format"""
    transactions = []
    
    pattern = re.compile(
        r"(?P<receipt_no>\w{10,})\s+"
        r"(?P<completion_time>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\s+"
        r"(?P<details>.+?)\s+"
        r"(?P<transaction_status>COMPLETED|FAILED|PENDING)\s+"
        r"(?P<paid_in>\d+\.\d{2}|0\.00)\s+"
        r"(?P<withdraw>\d+\.\d{2}|0\.00)\s+"
        r"(?P<balance>\d{1,3}(?:,\d{3})*\.\d{2})"
    )

    for match in pattern.finditer(text):
        transactions.append(match.groupdict())
    
    return transactions

@router.post("/upload-file/")
async def upload_file(file: UploadFile = File(...)):
    file_ext = file.filename.split(".")[-1].lower()

    if f".{file_ext}" not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Unsupported file format")

    contents = await file.read()

    if file_ext == "pdf":
        doc = fitz.open(stream=contents, filetype="pdf")
        text = "\n".join([page.get_text("text") for page in doc if page.get_text("text").strip()])
        
        customer_details = extract_customer_details(text)
        statement_period = extract_statement_period(text)
        transactions = parse_mpesa_statement(text)
        
        statement_data =  {
            "filename": file.filename,
            "customer": customer_details,
            "statement": statement_period,
            "transactions": transactions,
            "disclaimer": "This data is extracted from the MPESA statement and may not be 100% accurate."
        }
        
        send_statement(statement_data)
        
        return {
            "message": "Statement uploaded and sent to Kafka successfully.",
            "filename": file.filename
        }

    return {"filename": file.filename, "message": "File uploaded but not processed"}