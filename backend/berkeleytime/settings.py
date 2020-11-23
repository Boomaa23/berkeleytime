"""
Django settings for berkeleytime project.

Generated by 'django-admin startproject' using Django 3.1.1.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/

See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/
"""

import os
import sys
from pathlib import Path
from datetime import timedelta
from urllib.parse import urlparse

from berkeleytime.config.general import *
from berkeleytime.config.semesters.spring2021 import *

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

ENV_NAME = os.getenv('ENVIRONMENT_NAME')
IS_LOCALHOST = ENV_NAME == 'LOCALHOST'
IS_STAGING = ENV_NAME == 'staging'
IS_PRODUCTION = ENV_NAME == 'prod'
assert IS_LOCALHOST or IS_STAGING or IS_PRODUCTION, f'ENV not set properly: {ENV_NAME}'


SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

# Admins/managers receive 500s and 404s
ADMINS = MANAGERS = (
    ('ASUC OCTO Berkeleytime Team', 'octo.berkeleytime@asuc.org'),
    ('Grace Luo', 'graceluo@berkeley.edu'),
)

# Debug - show tracebacks in browser
DEBUG = True

# Allowed hosts
ALLOWED_HOSTS = ['*'] # Wildcard '*' allow is not a security issue because back-end is closed to private Kubernetes traffic

# Database
pg_instance = urlparse(os.getenv('DATABASE_URL'))
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': pg_instance.hostname,
        'PORT': pg_instance.port,
        'USER': pg_instance.username,
        'PASSWORD': pg_instance.password,
        'NAME': pg_instance.path.strip('/'),
    }
}

# Cache
if IS_PRODUCTION or IS_STAGING:
    redis_instance = urlparse(os.getenv('REDIS_URL'))
    CACHES = {
        'default': {
            'BACKEND': 'redis_cache.RedisCache',
            'LOCATION': '{0}:{1}'.format(redis_instance.hostname, redis_instance.port),
            'OPTIONS': {
                'PASSWORD': redis_instance.password,
                'DB': 0,
            }
        }
    }
elif IS_LOCALHOST:
    CACHES = {
        'default': {
            'BACKEND': 'redis_cache.RedisCache',
            'LOCATION': 'redis:6379',
        }
    }

# Email config
if IS_LOCALHOST:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
    EMAIL_HOST = 'localhost'
    EMAIL_PORT = 1025
    EMAIL_HOST_USER = ''
    EMAIL_HOST_PASSWORD = ''
    EMAIL_USE_TLS = False
    DEFAULT_FROM_EMAIL = os.getenv('GOOGLE_EMAIL')
else:
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = 'smtp.sendgrid.net'
    EMAIL_PORT = 587
    EMAIL_HOST_USER = os.getenv('SENDGRID_USERNAME')
    EMAIL_HOST_PASSWORD = os.getenv('SENDGRID_PASSWORD')
    EMAIL_USE_TLS = True
    DEFAULT_FROM_EMAIL = os.getenv('GOOGLE_EMAIL')

# Apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'berkeleytime',
    'catalog',
    'enrollment',
    'grades',
    'playlist',
    'forms',
    'user',
    'graphene_django',
]

# Middlewares
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Root URLconf file
ROOT_URLCONF = 'berkeleytime.urls'

# WSGI app object to use with runserver
WSGI_APPLICATION = 'berkeleytime.wsgi.application'

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}

# List of template engines (we need this for admin panel)
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    }
]

# Course/Class API credentials
SIS_COURSE_APP_ID = os.getenv('SIS_COURSE_APP_ID')
SIS_COURSE_APP_KEY = os.getenv('SIS_COURSE_APP_KEY')
SIS_CLASS_APP_ID = os.getenv('SIS_CLASS_APP_ID')
SIS_CLASS_APP_KEY = os.getenv('SIS_CLASS_APP_KEY')

# Graphene Config
GRAPHENE = {
    'SCHEMA': 'berkeleytime.schema.schema',
    'MIDDLEWARE': [
        'graphql_jwt.middleware.JSONWebTokenMiddleware',
    ],
    'RELAY_CONNECTION_MAX_LIMIT': 100000,
}

# Graphene jwt
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',  # for admin panel
    'graphql_jwt.backends.JSONWebTokenBackend',
]

GRAPHQL_JWT = {
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_EXPIRATION_DELTA': timedelta(days=1),
    'JWT_REFRESH_EXPIRATION_DELTA': timedelta(days=7),
    'JWT_HIDE_TOKEN_FIELDS': True  # if we want to prevent sending the token back in response
}

# Password validation - we intend to use Google sign-in, but we may add in-house auth in the future
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators
# AUTH_PASSWORD_VALIDATORS = [
#     {
#         'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
#     },
# ]

# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = False

STATIC_URL = '/static/'


