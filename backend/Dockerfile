FROM python:3.11.6-slim

WORKDIR /instagram

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .

CMD ["python", "instagram/manage.py", "runserver", "0.0.0.0:8000"]