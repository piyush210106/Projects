import requests
import tempfile

def download_pdf(url: str) -> str:
    response = requests.get(url)
    response.raise_for_status()

    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    tmp.write(response.content)
    tmp.close()

    return tmp.name
