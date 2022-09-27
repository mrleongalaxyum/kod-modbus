
FROM python:3.10
COPY . .
WORKDIR .
RUN dir -s        
RUN pip3 install -r requirements.txt
RUN dir -s    
CMD ["python3", "./main.py"]
