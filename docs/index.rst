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
1. .. image:: https://github.com/mrleongalaxyum/kod-modbus/archive/refs/heads/main.zip
 and unpack it in a convenient location 
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


.. code-block:: bash

  RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y make && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir pipenv

The ``RUN`` instruction allows us to execute any command. These commands are standard Debian commands
to install packages.

.. note:: Without getting into too much detail, no caching is needed in a Docker image and the lighter the
    image the better, so we delete the cache using ``apt-get clean``, ``rm -rf /var/lib/apt/lists/*``, and
    ``no-cache-dir``.

.. note:: The ``RUN`` (as as all ``COPY`` and ``ADD``) instruction also creates `layers <layers_>`_. It's a
   topic in itself but Docker recommends to separate installation instructions from what almost never
   changes, to what changes more often to optimize build times. In your case, we don't need much,
   and these package never change so they come into the initial RUN instruction.

To modify what's installed in this image, you would typically add package names after ``make``.
The rest can stay if you require ``pipenv``.


Setting the work directory
++++++++++++++++++++++++++

Our image doesn't contain any of our files at the moment, only Linux and extra packages.
In the next step, we will copy files from our repository to the image, but now, let's set the working directory
to the name of the repository.

We do this with:

.. code-block:: bash

   WORKDIR /sphinxtechnicalwriting

This folder is now the default path for all the following commands we will run.

Copying files
+++++++++++++

The objective of the image is to install our project dependencies, they are listed in our Pipfile.
We have installed Pipenv, so before we can use it to install our dependencies, we must copy our Pipfile and Pipfile.lock files
to our image. If the image does not contain them, it will not be able to install anything.

We do this with:

.. code-block:: bash

   COPY Pipfile Pipfile.lock /sphinxtechnicalwriting/

Notice that we copy them to our working directory.

Installing the dependencies
+++++++++++++++++++++++++++

We have copied our dependency list to our image, we can now build them in our image.

We do this with:

.. code-block:: bash

   RUN pipenv install --system --deploy

This command is similar to what we used in :ref:`config-env` but slightly modified for Docker use. It
doesn't create a virtual environment but installs everything at system level and also install the packages
from the lock file. See the `Pipenv docs`_.


Building the image
------------------

We have the following Dockerfile:

.. literalinclude:: ../../Dockerfile

To build it, run:

.. code-block:: bash

   docker build -t sphinx_image .

This creates an image named ``sphinx_image``.




Next steps
-----------

There's no real benefit in using Docker if you've already set up a local environment, but if you haven't
you can build the docs in 2 commands, which is great:

.. code-block:: bash

   docker build -t sphinx_image .
   docker run -v $(pwd):/sphinxtechnicalwriting sphinx_image make html


You can also use this image in your CI pipeline to get reproducible builds, and speed them up by using a Docker
image registry.


.. _pipenv docs: https://pipenv.pypa.io/en/latest/advanced/#using-pipenv-for-deployments
.. _layers: https://dzone.com/articles/docker-layers-explained
.. _makefile: https://github.com/ArtFlag/sphinxtechnicalwriting/blob/master/Makefile
.. _pipfile: https://github.com/ArtFlag/sphinxtechnicalwriting/blob/master/Pipfile
.. _docker_container: https://www.docker.com/resources/what-container
.. _images: https://docs.docker.com/engine/reference/commandline/images/
.. _article: https://pythonspeed.com/articles/base-image-python-docker-images/
