import requests
import uuid
import os

def download_pdf(url: str) -> str:
    response = requests.get(url)
    response.raise_for_status()

    file_path = f"/tmp/{uuid.uuid4()}.pdf"
    with open(file_path, "wb") as f:
        f.write(response.content)

    return file_path
