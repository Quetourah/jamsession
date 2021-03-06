FROM ubuntu:18.04


ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
	apt-get install -y software-properties-common && \
	apt-key adv --keyserver keyserver.ubuntu.com --recv-keys FABAEF95 && \
	add-apt-repository -y ppa:supercollider/ppa && \
	add-apt-repository -y multiverse && \
	apt-get update && \
    apt-get install -y icecast2 darkice libasound2 libasound2-plugins alsa-utils alsa-oss jack-tools supercollider xvfb && \
    apt-get clean

RUN apt-get install -y git cmake curl python-pip netcat-openbsd build-essential libcap-dev
RUN apt install -y python-tk
RUN apt clean

RUN pip install FoxDot

RUN curl -o forego.tgz https://bin.equinox.io/c/ekMN3bCZFUn/forego-stable-linux-amd64.tgz && \
	tar xvf forego.tgz && \
	rm forego.tgz && \
	mv forego /usr/bin/forego && \
	chmod +x /usr/bin/forego

COPY asoundrc /root/.asoundrc
COPY server.py /server.py
COPY requirements.txt /requirements.txt
COPY start_script.sh /start_script.sh
RUN pip install -r /requirements.txt

COPY icecast.xml /etc/icecast2/icecast.xml
COPY darkice.cfg /etc/darkice.cfg
COPY FoxStart /FoxStart

COPY startup.scd /root/.config/SuperCollider/startup.scd
COPY radio.sc /radio.sc
COPY tmp_Foxdot /tmp_Foxdot

COPY Procfile Procfile
COPY foxsamply.sh /foxsamply.sh
COPY foxdot.scd /foxdot.scd
COPY startup.scd /startup.scd

EXPOSE 8000 10000 5000
#RUN xvfb-run -a sclang /tmp_Foxdot

RUN mv /etc/security/limits.d/audio.conf.disabled /etc/security/limits.d/audio.conf && \
	usermod -a -G audio root

CMD ["sh", "/start_script.sh"]

