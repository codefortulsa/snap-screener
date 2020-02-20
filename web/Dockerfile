FROM travismillerdev/snap-screener-web-base:latest

ENV REACT_APP_API_FORM_SUBMIT '/api/form-submit'

# Copy app files
COPY ./ /var/www/src/
RUN cd /var/www/src/ \
 && make build \
 && rm -rf /var/www/html/ \
 && cp -a /var/www/src/build/ /var/www/html/ \
 && cp -a /var/www/src/api/ /var/www/api/ \
 && chown -Rf www-data:www-data /var/www/*
