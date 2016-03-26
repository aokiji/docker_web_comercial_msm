FROM  php:5.5-apache
RUN apt-get update -y
RUN apt-get install -y ssmtp
RUN apt-get clean
RUN echo 'sendmail_path = "/usr/sbin/ssmtp -t"' > /usr/local/etc/php/conf.d/mail.ini
COPY ssmtp.conf /etc/ssmtp/ssmtp.conf
RUN a2enmod rewrite
