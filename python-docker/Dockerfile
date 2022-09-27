
FROM python:3.10
COPY . /app
RUN dir -s    
WORKDIR /app
RUN dir -s    
RUN pip3 install -r requirements.txt
RUN dir -s    
CMD ["python3", "./main.py"]
