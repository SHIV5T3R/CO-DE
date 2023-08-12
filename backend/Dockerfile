FROM python:3.11-slim-buster

WORKDIR /app

# == Set environment variables ==
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV FLASK_ENV=PRODUCTION
ENV FLASK_APP=app.py
ENV DEBUG=False
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=postgres
ENV DB_HOST=postgres
ENV DB_NAME=postgres
ENV DB_PORT=5432
ENV RATELIMIT_GLOBAL=10000/hour
ENV CACHE_TYPE=SimpleCache
ENV CACHE_DEFAULT_TIMEOUT=300


# == Install dependencies ==
COPY Pipfile Pipfile.lock ./
RUN python -m pip install --upgrade pip
RUN pip install pipenv && pipenv install --system --deploy


COPY . /app
EXPOSE 5000

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=5000"]