FROM php:7.3-apache-buster

# https://getcomposer.org/doc/faqs/how-to-install-composer-programmatically.md
# https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions
# https://yarnpkg.com/en/docs/install#debian-stable
# https://github.com/docker-library/wordpress/issues/293#issuecomment-557860238

ENV NODE_VERSION=node_12.x
ENV GET_COMPOSER_SHA=76a7060ccb93902cd7576b67264ad91c8a2700e2

# System dependencies
RUN apt-get update && apt-get install -y \
    # node
    build-essential \
    # composer
    git \
    # apt-key
    gnupg2 \
    # php-gd
    libfreetype6-dev \
    # php-intl
    libicu-dev \
    # php-gd
    libjpeg62-turbo-dev \
    # php-gd
    libpng-dev \
    # composer
    zip \
 && true

# PHP extensions
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
 && docker-php-ext-install -j$(nproc) \
    # nette/email
    iconv \
    # nette/email
    intl \
    # nette/email
    gd \
    # slim/slim
    json \
 && true

# Composer
RUN curl -s https://raw.githubusercontent.com/composer/getcomposer.org/${GET_COMPOSER_SHA}/web/installer | php -- --quiet \
 && chmod +x composer.phar \
 && mv composer.phar /usr/local/bin/composer

# Node
RUN curl -sSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - \
 && echo "deb https://deb.nodesource.com/${NODE_VERSION} buster main" | tee /etc/apt/sources.list.d/nodesource.list \
 && echo "deb-src https://deb.nodesource.com/${NODE_VERSION} buster main" | tee -a /etc/apt/sources.list.d/nodesource.list \
 && apt-get update && apt-get install -y nodejs

# Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
 && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
 && apt-get update && apt-get install -y --no-install-recommends yarn

# Cleanup
RUN apt-get autoremove -y \
 && rm -rf /var/lib/apt/lists/*

COPY ./apache-allowoverride.conf /etc/apache2/conf-available/allowoverride.conf
RUN a2enmod rewrite \
 && a2enconf allowoverride

COPY ./composer.* /var/www/
RUN cd /var/www/ \
 && composer install \
 && rm composer.* \
 && chown -Rf www-data:www-data /var/www/vendor


COPY ./run-apache2.sh /usr/local/bin/
CMD [ "run-apache2.sh" ]
