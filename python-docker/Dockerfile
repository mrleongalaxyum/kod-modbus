
FROM python:3.10
WORKDIR .
ADD . .
RUN pip freeze > requirements.txt
RUN pip3 install -r "requirements.txt"
CMD ["python3", "./main.py"]
