FROM grafana/grafana:9.0.9
COPY . .
WORKDIR .
RUN dir -s
USER Admin
ENTRYPOINT [ "/run.sh" ]
