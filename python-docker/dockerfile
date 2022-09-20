#!/bin/bash
FROM python:3.10
WORKDIR .
COPY requirements.txt /
RUN pip3 install -r requirements.txt
COPY main.py /
CMD ["python3", "./main.py"]
