# Use Python base image
FROM python:3.12-slim

# Set environment vars
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONNUNBUFFERED 1

# Install depen
RUN apt-get update && apt-get install -y build-essential libpq-dev

WORKDIR /code

COPY requirements.txt .
RUN pip install --no-chache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "taskfy.wsgi:application", "--bind", "0.0.0.0:8000"]