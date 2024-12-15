FROM ubuntu:latest

ENV SSH_USERNAME=user
ENV PASSWORD=user


RUN apt-get update \
    && apt-get install -y openssh-server iputils-ping telnet iproute2 sudo dos2unix\
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN mkdir -p /run/sshd \
    && chmod 755 /run/sshd

# Expose SSH port
EXPOSE 22

# Create the non-root user with the ability to set a password and authorized keys using environment variables


RUN echo 'root:root' | chpasswd
RUN useradd -ms /bin/bash user
RUN echo 'user:user' | chpasswd


RUN mkdir -p /home/$SSH_USERNAME/.ssh && chown $SSH_USERNAME:$SSH_USERNAME /home/$SSH_USERNAME/.ssh \
    && echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config \
    && echo "PermitRootLogin no" >> /etc/ssh/sshd_config


# Copy the script to configure the user's password and authorized keys
COPY configure-ssh-user.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/configure-ssh-user.sh


USER user
WORKDIR /home/user

COPY scripts scripts
COPY start.sh start.sh


USER root
RUN dos2unix scripts/*

RUN adduser root sudo
RUN adduser user sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
# Start SSH server
CMD ["/usr/local/bin/configure-ssh-user.sh"]
