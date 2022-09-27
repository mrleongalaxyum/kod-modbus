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

- ModBus TCP slave that simulates an end device
- A python script that writes simulated data into the slave
- InfluxDB timeseries database for storing states and persistence
- Grafana for drawing interactive and visually pretty graphs from DB queries
- Node-RED for processing data, storing it to InfluxDB and allowing user control from a GUI Dashboard

Aforementioned microservices all run inside their own Docker containers. If interested,
read more about Docker at the `Docker website <https://www.docker.com/>`_
.




Setup
+++++++++++++++++++++++

1. Install Docker Engine. Instructions on how to do this can be found `here <https://docs.docker.com/engine/install/>`_

2. Download the files from `docker-compose-files directory  <https://github.com/mrleongalaxyum/kod-modbus/tree/main/docker-compose-files>`_

All that needs to be done now is to open up a terminal in the downloaded folder and run the following command:


.. code-block:: docker

   docker compose up -d
  

Now the containers should be up running and the app should be ready for use!

After starting the app the UI is available on http://localhost:1880/ui

Services
=================================
All of the used services are open-source and feature their own large forum-based communities where one can find the needed answers and ask other experienced developers for help if needed. 

Node-RED
---------------------------------
`Node-RED <https://nodered.org/>`_ is a programming tool for wiring together hardware devices, APIs and online services in new and interesting ways.

It provides a browser-based editor that makes it easy to wire together flows using the wide range of nodes in the palette that can be deployed to its runtime in a single-click. In this context, Node-RED is used as a central microservice that fetches data from the ModBus slave, periodically stores it into an InfluxDB database, and provides a GUI through which the user can access and interact with Grafana charts and control the ModBus slave (change coil states, read and write registers...). It's main features are the graphical-programming interface and lots of available, community-collaborated plugins and nodes.


InfluxDB
---------------------------------

`InfluxDB <https://www.influxdata.com/>`_ is The Time Series Data Platform where developers build IoT, analytics, and cloud applications. It's used to store data from the ModBus slave for data analytics and persistence purposes. It's admin interface is very powerful and allows easy data exploration, query generations and quick visualizations for easy debugging and management. 

Grafana
---------------------------------

`Grafana <https://grafana.com/>`_
is a multi-platform open source analytics and interactive visualization web application. It provides charts, graphs, and alerts for the web when connected to supported data sources. A licensed Grafana Enterprise version with additional capabilities is also available as a self-hosted installation or an account on the Grafana Labs cloud service. It is expandable through a plug-in system. End users can create complex monitoring dashboards using interactive query builders. Grafana is divided into a front end and back end, written in TypeScript and Go, respectively.

As a visualization tool, Grafana is a popular component in monitoring stacks, often used in combination with time series databases such as InfluxDB, Prometheus and Graphite; monitoring platforms such as Sensu, Icinga, Checkmk, Zabbix, Netdata, and PRTG; SIEMs such as Elasticsearch and Splunk; and other data sources. The Grafana user interface was originally based on version 3 of Kibana.

Python
----------------------------------
`Python <https://www.python.org/>`_ is in this case used for a simple script that generates dummy data and writes it to the ModBus TCP slave, thus emulating a slave collecting data during normal operation. The script was containerized and is available to pull at the `Docker Hub <https://hub.docker.com/repository/docker/mrleongalaxyum/modbus-sim>`_.


