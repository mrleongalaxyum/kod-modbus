.. kod-modbus-app documentation master file, created by
   sphinx-quickstart on Tue Sep 20 14:55:50 2022.

Welcome to kod-modbus-app's documentation!
==========================================

.. toctree::
   :maxdepth: 2
   :caption: Contents:


.. _docker:

About The App
-------------

This app is an integrated, all-in-one, a containerized simple SCADA system over ModBus TCP. It was developed during my student internship at `KONČAR Digital <https://www.koncar.hr/en/business-segments/digital-solutions/koncar-digital/>`_


As it stands, it's comprised of 4 separate, but integrated, microservices. Everything needed to get this app up and running is located on the project's `GitHub repo <https://github.com/mrleongalaxyum/kod-modbus>`_

Those services are:

- ModBus TCP slave that simulates and end device
- A python script that writes simulated data into the slave
- InfluxDB timeseries database for storing states and persistence
- Grafana for drawing interactive and visually pretty graphs from DB queries
- Node-RED for processing data, storing it to InfluxDB and allowing user control from a GUI Dashboard

Aforementioned microservices all run inside their own Docker containers. If interested,
read more about Docker at the `Docker website <docker_container_>`_.




Setup
+++++++++++++++++++++++
1. Download the repo zip and unpack it in a convenient location 
2. A few slight modifications are needed in the docker-compose.yaml:

at line 20:

.. code-block:: docker
     
  volumes:
        - /home/leon/dockeri/kod-modbus/modbus-server/server_config.json:/server_config.json:ro

at lines 46 & 47:

.. code-block:: docker

  volumes:
      - /home/leon/dockeri/kod-modbus/grafana/storage:/var/lib/grafana
      - /home/leon/dockeri/kod-modbus/grafana/provisioning/:/etc/grafana/provisioning

and at line 69:

.. code-block:: docker

    volumes:
        - /home/leon/dockeri/kod-modbus/node-red:/data

Edit those parts to match the path of your downloaded root folder. 

Install Docker Engine
+++++++++++++++++++++++++++

After editing the docker-compose file, if not already installed, Docker Engine shall be installed. Instructions on how to do this can be found `here <https://docs.docker.com/engine/install/>`_


Spooling up the containers
+++++++++++++++++++++++++++

If needed, user can change credentials for accessing Grafana and InfluxDB admin interfaces. this can be done by editing the .env file inside `docker-compose-files folder <https://github.com/mrleongalaxyum/kod-modbus/tree/main/docker-compose-files>`_

All that needs to be done now is to open up a terminal, and run the following command:


.. code-block:: linux

   docker compose up
  

Now the containers should be running and the app should be ready for use!




