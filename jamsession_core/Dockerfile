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

RUN apt-get install -y git cmake curl python-pip

RUN pip install FoxDot

RUN curl -o forego.tgz https://bin.equinox.io/c/ekMN3bCZFUn/forego-stable-linux-amd64.tgz && \
	tar xvf forego.tgz && \
	rm forego.tgz && \
	mv forego /usr/bin/forego && \
	chmod +x /usr/bin/forego

ENV DISPLAY :0

COPY asoundrc /root/.asoundrc

COPY icecast.xml /etc/icecast2/icecast.xml
COPY darkice.cfg /etc/darkice.cfg

COPY startup.scd /root/.config/SuperCollider/startup.scd
COPY radio.sc /radio.sc

COPY Procfile Procfile
COPY foxsamply.sh /foxsamply.sh
COPY foxdot.scd /foxdot.scd

# RUN xvfb-run -a sclang /foxdot.scd

#RUN sclang FoxDot.start

## Bypassing video output for sclang
#RUN export DISPLAY=:0.0
#COPY supercolliderStandaloneRPI2 /supercolliderStandaloneRPI2
#RUN cd /supercolliderStandaloneRPI2
#RUN sclang -a -l /supercolliderStandaloneRPI2/sclang.yaml

RUN Xvfb :0 -ac -screen 0 1280x1024x16 &

RUN echo FoxDot.start >/tmp/g && sclang /tmp/g &

EXPOSE 8000
RUN mv /etc/security/limits.d/audio.conf.disabled /etc/security/limits.d/audio.conf && \
	usermod -a -G audio root

CMD ["forego", "start"]
# CMD ["sh", "foxsamply.sh"]
