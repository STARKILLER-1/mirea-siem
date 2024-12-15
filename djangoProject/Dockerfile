FROM python:latest

WORKDIR /app
ENV DJANGO_SUPERUSER_PASSWORD="django_admin"

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN python manage.py migrate
RUN yes yes | python manage.py collectstatic
#RUN python manage.py createsuperuser --noinput --username django_admin --email django_admin@localhost.ru
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]