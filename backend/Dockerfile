FROM python:3.12-alpine

RUN apk add --no-cache --update --quiet dumb-init gcc g++ musl-dev curl libffi-dev

RUN pip install pipenv --no-cache-dir
RUN curl -sL https://taskfile.dev/install.sh | sh

WORKDIR /app

COPY Pipfile Pipfile.lock ./

RUN pipenv install --dev --system --deploy --clear

COPY . .

EXPOSE 80

CMD ["pipenv", "run", "uvicorn", "app.api.routes:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
