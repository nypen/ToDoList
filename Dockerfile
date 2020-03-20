FROM postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB tododb 
COPY init.sql /docker-entrypoint-initdb.d/
