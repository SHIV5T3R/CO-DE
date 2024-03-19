FROM python:3.11-slim-buster

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV FLASK_APP=app.py

COPY Pipfile Pipfile.lock .env ./
RUN python -m pip install --upgrade pip
RUN pip install pipenv && pipenv install --system --deploy --ignore-pipfile

COPY . .

RUN chmod +x start.sh