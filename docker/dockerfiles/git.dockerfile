FROM alpine/git

WORKDIR /var/www/html

RUN git config --global user.name "Tareq Mahbub"
RUN git config --global user.email "tareqmahbub@gmail.com"

ENTRYPOINT [ "git" ]