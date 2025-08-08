from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
ROOT_URLCONF = 'config.urls'
INSTALLED_APPS = [
    # Core
    'django.contrib.auth',
    'django.contrib.contenttypes',
    # 'django.contrib.sessions',
    
    # 'django.contrib.admin',
    # 'django.contrib.messages',
    # 'django.contrib.staticfiles',
    
    # Apps
    'apps.users.infrastructure',
    
    # Third-party
    'rest_framework',
    # 'corsheaders',
]


# MIDDLEWARE = [
#     'corsheaders.middleware.CorsMiddleware',
#     'django.middleware.security.SecurityMiddleware',
#     'django.contrib.sessions.middleware.SessionMiddleware',
#     'django.middleware.common.CommonMiddleware',
#     'django.middleware.csrf.CsrfViewMiddleware',
#     'django.contrib.auth.middleware.AuthenticationMiddleware',
#     'django.contrib.messages.middleware.MessageMiddleware',
# ]


ROOT_URLCONF = 'config.urls'
WSGI_APPLICATION = 'config.wsgi.application'

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'taskfy',
#         'USER': 'postgres',
#         'PASSWORD': 'postgres',
#         'HOST': 'db',
#         'PORT': '5432',
#     }
# }

# AUTH_PASSWORD_VALIDATORS = [
#     {
#         'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
#     },
# ]

# STATIC_URL = '/static/'

DEBUG = True
