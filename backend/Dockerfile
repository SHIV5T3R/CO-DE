FROM python:3.11-slim-buster

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV FLASK_ENV=PRODUCTION
ENV FLASK_APP=app.py
ENV DEBUG=False
ENV RATELIMIT_GLOBAL=10000/hour
ENV CACHE_TYPE=SimpleCache
ENV CACHE_DEFAULT_TIMEOUT=300

COPY Pipfile Pipfile.lock .env ./
RUN python -m pip install --upgrade pip
RUN pip install pipenv && pipenv install --system --deploy


COPY . .

RUN chmod +x start.sh
RUN chmod +x start-daphne.sh